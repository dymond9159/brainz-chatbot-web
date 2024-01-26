import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import {
    JSONValue,
    Message,
    OpenAIStream,
    StreamingTextResponse,
    experimental_StreamData,
} from "ai";

// psychometric test
import get_answers from "@/libs/tools/get_answers.json";
import get_score from "@/libs/tools/get_score.json";

// import { AstraDB } from "@datastax/astra-db-ts";

import _libs from "@/libs";
import _utils from "@/utils";
import {
    generateSuggestAnswersInstruction,
    psychometricInstruction,
} from "@/utils/constants";
import { ProgramDataType } from "@/components/widgets";

// import { AstraDB } from "@datastax/astra-db-ts";
const GPT_DEFAULT_MODEL = "gpt-3.5-turbo-1106"; //"gpt-3.5-turbo-0613"
const TEMPERATURE = 0.1;
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// const astraDb = new AstraDB(
//     process.env.ASTRA_DB_APPLICATION_TOKEN,
//     process.env.ASTRA_DB_ID,
//     process.env.ASTRA_DB_REGION,
//     process.env.ASTRA_DB_NAMESPACE,
// );

// export const runtime = "edge";

const getRAGContext = async (latestMessage: string) => {
    // const { data } = await openai.embeddings.create({
    //               input: latestMessage,
    //               model: "text-embedding-ada-002",
    //           });
    //           const collection = await astraDb.collection(
    //               `chat_${similarityMetric}`,
    //           );
    //           const cursor = collection.find(null, {
    //               sort: {
    //                   $vector: data[0]?.embedding,
    //               },
    //               limit: 5,
    //           });
    //           const documents = await cursor.toArray();
    //           docContext = `
    //       START CONTEXT
    //       ${documents?.map((doc) => doc.content).join("\n")}
    //       END CONTEXT
    //     `;
    return "";
};

const TOOLS = `
The psychometric tester prepared are as follows.
#Mood Tracker: Survey based on MFQ questionnaires,
#PTSD Tracker: Survey based on DSM-5(PCL-5) questionnaires,
#Anxiety Tracker: Survey based on GAD-7 questionnaires,
#Depression Tracker: Survey base on PHQ-9 questionnaires,
#Suide risk assessment: Survey based on C-SSRS questionnaires 
`;

export const runtime = "edge";

const getAnswers = async (
    llm: string,
    system: string,
    messages: any[],
    completion: string,
    program: ProgramDataType,
) => {
    const systemPrompt = {
        role: "system",
        content: generateSuggestAnswersInstruction(program),
    };

    // remove the last user input message.
    messages.pop();

    const inputMessages = [
        systemPrompt,
        ...messages,
        {
            role: "user",
            content: completion,
        },
    ];
    const params: OpenAI.Chat.ChatCompletionCreateParams = {
        model: llm,
        messages: inputMessages,
        response_format: { type: "json_object" },
        temperature: 0,
    };

    const response = await openai.chat.completions.create(params);
    return response.choices[0].message.content;
};

export async function POST(req: NextRequest) {
    try {
        const {
            messages,
            useRag,
            llm = GPT_DEFAULT_MODEL,
            similarityMetric,
            progStrId,
        } = await req.json();

        const latestMessage = messages[messages?.length - 1]?.content;

        const docContext: string = useRag
            ? await getRAGContext(latestMessage)
            : "";

        const program = _utils.functions.getProgram(progStrId);
        const systemPrompt =
            program?.instruction ?? psychometricInstruction(program);

        const ragPrompt = [
            {
                role: "system",
                content: systemPrompt + docContext,
            },
        ];

        // Instantiate the StreamData. It works with all API providers.
        const data = new experimental_StreamData();

        const params: OpenAI.Chat.ChatCompletionCreateParams = {
            model: llm,
            stream: true,
            messages: [...ragPrompt, ...messages],
            functions: [get_score],
            temperature: TEMPERATURE,
        };

        const streamResponse = await openai.chat.completions.create(params);

        const stream = OpenAIStream(streamResponse, {
            experimental_onFunctionCall: async (
                { name, arguments: args },

                createFunctionCallMessages,
            ) => {
                if (name === "get_score") {
                    data.append({
                        type: "score",
                        result: args as JSONValue,
                    });

                    const answerData = args as JSONValue;
                    const newMessages = createFunctionCallMessages(answerData);

                    return openai.chat.completions.create({
                        messages: [...messages, ...newMessages],
                        stream: true,
                        model: llm,
                        functions: [get_answers, get_score],
                        temperature: TEMPERATURE,
                    });
                }
            },
            async onCompletion(completion) {
                if (!completion.includes(`"function_call":`)) {
                    const answers = await getAnswers(
                        llm,
                        systemPrompt,
                        messages,
                        completion,
                        program,
                    );
                    if (answers !== null) {
                        const parseData = JSON.parse(answers);
                        console.log(parseData);
                        data.append({
                            type: "answer",
                            result: parseData.answers,
                        });
                    }
                }
            },
            onFinal(completion) {
                // IMPORTANT! you must close StreamData manually or the response will never finish.
                data.close();
            },
            // IMPORTANT! until this is stable, you must explicitly opt in to supporting streamData.
            experimental_streamData: true,
        });

        return new StreamingTextResponse(
            stream,
            {
                headers: {},
            },
            data,
        );
    } catch (err) {
        console.error(err);
    }
}

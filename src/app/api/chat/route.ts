import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import {
    OpenAIStream,
    StreamingTextResponse,
    experimental_StreamData,
} from "ai";

// functions
import get_answers from "@/libs/tools/get_answers.json";
import get_all_tools from "@/libs/tools/get_all_tools.json";

// import { AstraDB } from "@datastax/astra-db-ts";

import _libs from "@/libs";
import _utils from "@/utils";
import { get } from "http";
import { PSYCHOMETRIC_INSTRUCTION } from "@/utils/constants";

// import { AstraDB } from "@datastax/astra-db-ts";
const GPT_DEFAULT_MODEL = "gpt-3.5-turbo-1106"; //"gpt-3.5-turbo-0613"
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
            program?.instruction ??
            PSYCHOMETRIC_INSTRUCTION.replace("[testitem]", progStrId).replace(
                "[questionnaires]",
                program?.questionnaires ?? "the best popular",
            );

        console.log(systemPrompt);

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
            // functions: [get_answers, get_all_tools],
        };

        const streamResponse = await openai.chat.completions.create(params);

        const stream = OpenAIStream(streamResponse, {
            experimental_onFunctionCall: async (
                { name, arguments: args },
                createFunctionCallMessages,
            ) => {
                if (name === "get_answers") {
                    // Call a weather API here
                    const answerData = {
                        answer: "?",
                    };

                    data.append({
                        text: "Some custom data",
                    });

                    const newMessages = createFunctionCallMessages(answerData);
                    console.log(newMessages);
                    return openai.chat.completions.create({
                        messages: [...messages, ...newMessages],
                        stream: true,
                        model: llm,
                    });
                }

                if (name === "get_all_tools") {
                    // Call a weather API here
                    console.log(name, args);
                    const toolData = {
                        role: "function",
                        content: "list all suggest answers to above question",
                    };

                    data.append({
                        text: "Some custom data",
                    });

                    const newMessages = createFunctionCallMessages(toolData);
                    console.log(newMessages);
                    return openai.chat.completions.create({
                        messages: [
                            { role: "system", content: TOOLS },
                            ...messages,
                            ...newMessages,
                        ],
                        stream: true,
                        model: llm,
                    });
                }
            },
            onCompletion(completion) {
                console.log(completion);
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
                headers: { "X-RATE-LIMIT": "lol" },
            },
            data,
        );
    } catch (err) {
        console.error(err);
    }
}

import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
// import { AstraDB } from "@datastax/astra-db-ts";

import _libs from "@/libs";

// import { AstraDB } from "@datastax/astra-db-ts";
const GPT_DEFAULT_MODEL = "gpt-3.5-turbo-1106";
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

// Suggest Answers Function definition:
const functions = [
    {
        name: "suggest_answers",
        description: "Get all of the suggest answers against above question",
        parameters: {
            type: "object",
            properties: {
                question: {
                    type: "string",
                    description:
                        "This is a question that suggest you according above context.",
                },
                answers: {
                    type: "array",
                    description:
                        "Here, list answer items(suggested answer regarding above question)",
                    items: {
                        type: "object",
                        item: {
                            answer: {
                                type: "string",
                                description: "this is one of that answers.",
                            },
                            score: {
                                type: "number",
                                description:
                                    "score is number score of that answer",
                            },
                            color: {
                                type: "string",
                                description: "color represent in css color",
                            },
                        },
                    },
                },
            },
            required: ["question", "answers"],
        },
    },
];

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

// export const runtime = "edge";

export async function POST(req: NextRequest) {
    try {
        const {
            messages,
            useRag,
            llm = GPT_DEFAULT_MODEL,
            similarityMetric,
        } = await req.json();

        const latestMessage = messages[messages?.length - 1]?.content;

        const docContext: string = useRag
            ? await getRAGContext(latestMessage)
            : "";

        const ragPrompt = [
            {
                role: "system",
                content: _libs.prompts.SYSTEM_PROMPT + docContext,
            },
        ];

        const params: OpenAI.Chat.ChatCompletionCreateParams = {
            model: llm,
            stream: true,
            messages: [...ragPrompt, ...messages],
            // functions,
        };

        const streamResponse = await openai.chat.completions
            .create(params)
            .asResponse();

        const stream = OpenAIStream(streamResponse);
        return new StreamingTextResponse(stream);
    } catch (err) {
        console.error(err);
    }
}

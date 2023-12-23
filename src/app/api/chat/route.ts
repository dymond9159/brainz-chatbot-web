import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

import _libs from "@/libs";

// import { AstraDB } from "@datastax/astra-db-ts";
const GPT_DEFAULT_MODEL = "gpt3.5-turbo-1106";
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// const astraDb = new AstraDB(
//     process.env.ASTRA_DB_APPLICATION_TOKEN,
//     process.env.ASTRA_DB_ID,
//     process.env.ASTRA_DB_REGION,
//     process.env.ASTRA_DB_NAMESPACE,
// );

export const runtime = "edge";

// Suggest Answers Function definition:
const functions = [
    {
        name: "get_current_weather",
        description: "Get the current weather",
        parameters: {
            type: "object",
            properties: {
                location: {
                    type: "string",
                    description: "The city and state, e.g. San Francisco, CA",
                },
                format: {
                    type: "string",
                    enum: ["celsius", "fahrenheit"],
                    description:
                        "The temperature unit to use. Infer this from the users location.",
                },
            },
            required: ["location", "format"],
        },
    },
    {
        name: "get_suggest_answers",
        description: "Get the suggest answers",
        parameters: {
            type: "object",
            properties: {
                question: {
                    type: "string",
                },
                answers: {
                    type: "array",
                    items: {
                        type: "object",
                        item: {
                            answer: {
                                type: "string",
                            },
                            score: {
                                type: "number",
                            },
                            color: {
                                type: "string",
                            },
                        },
                    },
                    description: "The city and state, e.g. San Francisco, CA",
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

export async function POST(req: Request) {
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

        const response = await openai.chat.completions.create({
            model: llm,
            messages: [...ragPrompt, ...messages],
            stream: true,
            functions,
        });

        const stream = OpenAIStream(response, {
            experimental_onFunctionCall: async (
                { name, arguments: args },
                createFunctionCallMessages,
            ) => {
                // if you skip the function call and return nothing, the `function_call`
                // message will be sent to the client for it to handle
                if (name === "get_current_weather") {
                    // Call a weather API here
                    const weatherData = {
                        temperature: 20,
                        unit: args.format === "celsius" ? "C" : "F",
                    };

                    // `createFunctionCallMessages` constructs the relevant "assistant" and "function" messages for you
                    const newMessages = createFunctionCallMessages(weatherData);
                    return openai.chat.completions.create({
                        model: llm,
                        messages: [...messages, ...newMessages],
                        stream: true,
                        // see "Recursive Function Calls" below
                        functions,
                    });
                }

                if (name === "get_suggest_answers") {
                    const answerData = {
                        question: "",
                        answers: {
                            items: [
                                {
                                    answer: "",
                                    score: 0,
                                    color: "#333",
                                },
                                {
                                    answer: "",
                                    score: 0,
                                    color: "#333",
                                },
                            ],
                        },
                    };

                    // `createFunctionCallMessages` constructs the relevant "assistant" and "function" messages for you
                    const newMessages = createFunctionCallMessages(answerData);
                    return openai.chat.completions.create({
                        model: llm,
                        messages: [...messages, ...newMessages],
                        stream: true,
                        // see "Recursive Function Calls" below
                        functions,
                    });
                }
            },
        });

        // send to client stream of assistant includes function
        return new StreamingTextResponse(stream);
    } catch (err) {
        console.error(err);
    }
}

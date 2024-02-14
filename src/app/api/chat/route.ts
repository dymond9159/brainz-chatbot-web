import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import {
    OpenAIStream,
    StreamingTextResponse,
    experimental_StreamData,
} from "ai";

import _libs from "@/libs";
import _utils from "@/utils";
import { functions, runFunction } from "./function";
import { getSystemInstruction, nanoId } from "@/utils/functions";

const GPT_DEFAULT_MODEL = "gpt-3.5-turbo-1106"; //"gpt-3.5-turbo-0613"
const TEMPERATURE = 0.7;
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

export async function POST(req: NextRequest) {
    try {
        const requestData = await req.json();
        const {
            messages,
            useRag,
            llm = GPT_DEFAULT_MODEL,
            similarityMetric,
            instructionId,
            profile,
        } = requestData;

        const systemInstruction = getSystemInstruction(instructionId, profile);

        const systemPrompt = [
            {
                role: "system",
                content: systemInstruction,
            },
        ];

        // check if the conversation requires a function call to be made
        const openAIChatParams: OpenAI.Chat.ChatCompletionCreateParams = {
            model: llm,
            messages: [...systemPrompt, ...messages],
            stream: true,
            temperature: TEMPERATURE,
            top_p: 1,
            frequency_penalty: 1,
            presence_penalty: 1,
            functions,
            function_call: "auto",
        };

        const initialResponse = await openai.chat.completions.create(
            openAIChatParams,
        );

        const data = new experimental_StreamData();

        // function handler
        const stream = OpenAIStream(initialResponse, {
            experimental_onFunctionCall: async (
                { name, arguments: args },
                createFunctionCallMessages,
            ) => {
                const result = await runFunction(name, args, profile);
                console.log(name, args, result);
                const newMessages = result
                    ? createFunctionCallMessages(result)
                    : [];

                return openai.chat.completions.create({
                    model: llm,
                    stream: true,
                    temperature: 0.7,
                    messages: [...systemPrompt, ...messages, ...newMessages],
                });
            },

            async onCompletion(completion) {   
            },
            onFinal(completion) {
                data.close();
            },
            experimental_streamData: true,
        });

        // Respond with the stream
        return new StreamingTextResponse(stream, {}, data);
    } catch (err) {
        console.error(err);
    }
}

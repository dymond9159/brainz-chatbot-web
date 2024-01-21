"use client";

import React, { useEffect, useRef, useState } from "react";
import { useChat, Message } from "ai/react";

import {
    Flex,
    Container,
    Section,
    Content,
    Wrapper,
    Box,
} from "@/components/container";
import { Button, ButtonGroup, Textarea } from "@/components/ui";
import {
    BrainzAvatar,
    ChatScrollAnchor,
    Conversation,
    Navbar,
    PromptSuggestionRow,
    Sidebar,
    WelcomeMessage,
} from "@/components/widgets";
import { ChatRequest, FunctionCallHandler } from "ai";
import _utils from "@/utils";
import { useEnterSubmit } from "@/hooks";

import { useAppDispatch, useTypedSelector } from "@/store";
import { updateRecentProgram } from "@/store/reducers";
import { switchProgram } from "@/store/actions";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";

const useRag = false;
const llm = "gpt-4-1106-preview";
const similarityMetric = "";

export interface ChatPageProps {
    params: {
        id: string;
    };
}

const handlerFunctionCall: FunctionCallHandler = async (
    chatMessages,
    functionCall,
) => {
    if (functionCall.name === "suggest_answers") {
        let parsedFunctionCallArguments = {};
        if (functionCall.arguments) {
            parsedFunctionCallArguments = JSON.parse(functionCall.arguments);
            // You now have access to the parsed arguments here (assuming the JSON was valid)
            // If JSON is invalid, return an appropriate message to the model so that it may retry?
            console.log(parsedFunctionCallArguments);
        }

        const functionResponse: ChatRequest = {
            messages: [
                ...chatMessages,
                {
                    id: crypto.randomUUID(),
                    name: "MFQ_survey",
                    role: "function" as const,
                    content: JSON.stringify(parsedFunctionCallArguments),
                },
            ],
        };
        return functionResponse;
    }
};

const ChatPage: React.FC<ChatPageProps> = (props) => {
    const dispatch = useAppDispatch();

    const progStrId = props.params.id;

    const { initMessages } = useTypedSelector((state) => state.chat);
    const {
        append,
        messages,
        input,
        handleInputChange,
        handleSubmit,
        stop,
        isLoading,
        error,
        data,
    } = useChat({
        initialInput: "",
        initialMessages: initMessages,
        onResponse: (res) => {
            console.log(res);
        },
        onError: (err: Error) => {
            console.log(err);
        },
        onFinish: (message) => {
            dispatch(
                updateRecentProgram({
                    progStrId: progStrId,
                    lastMessage: promptText,
                    lastAt: new Date(Date.now()).toISOString(),
                    messages: [
                        ...messages,
                        {
                            id: nanoid(),
                            role: "user",
                            content: promptText,
                            createAt: new Date(Date.now()).toISOString(),
                        },
                        {
                            id: message.id,
                            role: message.role,
                            content: message.content,
                            createAt: message.createdAt?.toISOString(),
                        },
                    ],
                }),
            );
        },
    });

    const [promptText, setPromptText] = useState<string>("");
    const { formRef, onKeyDown } = useEnterSubmit();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    // const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    }, []);

    useEffect(() => {
        console.log([data]);
    }, [data]);

    useEffect(() => {
        // switch message history
        switchProgram(progStrId);

        // if (!isLoading) {
        //     handlePrompt("hey, there", false);
        // }
    }, [progStrId]);

    // textarea auto rows
    useEffect(() => {
        if (textareaRef && textareaRef.current) {
            textareaRef.current.style.height = "inherit";
            textareaRef.current.style.height = `${textareaRef.current?.scrollHeight}px`;
            textareaRef.current.style.overflow = `${
                textareaRef?.current?.scrollHeight > 120 ? "auto" : "hidden"
            }`;
        }
        setPromptText(input);
    }, [input]);

    const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
        handleSubmit(e, {
            options: { body: { useRag, llm, similarityMetric, progStrId } },
        });
    };

    const handlePrompt = (promptText: string, userResponse: boolean = true) => {
        const msg: Message = {
            id: nanoid(),
            content: promptText,
            role: "user",
        };
        setPromptText(userResponse ? promptText : "");
        append(msg, {
            options: { body: { useRag, llm, similarityMetric, progStrId } },
        });
    };

    return (
        <Container className="main-container">
            <Flex>
                <Sidebar
                    className="left-side"
                    progId={progStrId}
                />
                <Flex className="main-section col">
                    <Navbar className="main-nav">
                        <Flex className="row gap-10">
                            <BrainzAvatar
                                className="program-avatar"
                                src={
                                    _utils.functions.getProgram(progStrId)?.src
                                }
                                size={"40"}
                            />
                            {_utils.functions.getProgram(progStrId)?.name}
                        </Flex>
                    </Navbar>
                    <Content className="chat-content full">
                        <Flex className="col items-center justify-center full h-full">
                            <Content className="chat-area">
                                <Wrapper>
                                    {messages.length === 0 && (
                                        <WelcomeMessage
                                            program={_utils.functions.getProgram(
                                                progStrId,
                                            )}
                                        />
                                    )}
                                    {messages.length > 0 && (
                                        <Box className="conversations">
                                            {messages.length > 0 &&
                                                messages.map(
                                                    (message, index) => (
                                                        <Conversation
                                                            ref={messagesEndRef}
                                                            key={index}
                                                            content={message}
                                                            onAnswerClick={
                                                                handlePrompt
                                                            }
                                                        />
                                                    ),
                                                )}
                                        </Box>
                                    )}
                                    <ChatScrollAnchor
                                        trackVisibility={isLoading}
                                    />
                                </Wrapper>
                            </Content>
                            <Flex className="chat-prompts row items-end full">
                                <Wrapper className="full">
                                    {!messages.length && (
                                        <PromptSuggestionRow
                                            onPromptClick={handlePrompt}
                                            suggests={
                                                _utils.functions.getProgram(
                                                    progStrId,
                                                )?.suggests
                                            }
                                        />
                                    )}
                                    <form
                                        ref={formRef}
                                        onSubmit={handleSend}
                                    >
                                        <Textarea
                                            type="textarea"
                                            placeholder="Say here ..."
                                            className="full"
                                            rows={1}
                                            tabIndex={0}
                                            textareaRef={textareaRef}
                                            onChange={handleInputChange}
                                            onKeyDown={onKeyDown}
                                            value={input}
                                            spellCheck={false}
                                        >
                                            <ButtonGroup className="prompt-buttons gap-2 items-end">
                                                {/* <Button icon="mic-fill" /> */}
                                                {!isLoading ? (
                                                    <Button
                                                        icon="arrow-up"
                                                        type="submit"
                                                        disabled={
                                                            isLoading ||
                                                            input === ""
                                                        }
                                                    />
                                                ) : (
                                                    <Button
                                                        icon="stop-fill"
                                                        type="button"
                                                        onClick={stop}
                                                    />
                                                )}
                                            </ButtonGroup>
                                        </Textarea>
                                    </form>
                                </Wrapper>
                            </Flex>
                        </Flex>
                    </Content>
                </Flex>
            </Flex>
        </Container>
    );
};

export default ChatPage;

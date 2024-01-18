"use client";

import React, { useEffect, useRef } from "react";
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

import { useAppDispatch } from "@/store";
import { updateRecentProgram } from "@/store/reducers";

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
                    name: "survey",
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
    const {
        append,
        messages,
        input,
        handleInputChange,
        handleSubmit,
        stop,
        isLoading,
        error,
    } = useChat({
        onFinish: (message) => {
            dispatch(
                updateRecentProgram({
                    progStrId: props.params.id,
                    lastMessage: input,
                }),
            );
        },
    });

    const { formRef, onKeyDown } = useEnterSubmit();

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    // const formRef = useRef<HTMLFormElement>(null);

    React.useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    }, []);

    // textarea auto rows
    useEffect(() => {
        if (textareaRef && textareaRef.current) {
            textareaRef.current.style.height = "inherit";
            textareaRef.current.style.height = `${textareaRef.current?.scrollHeight}px`;
            textareaRef.current.style.overflow = `${
                textareaRef?.current?.scrollHeight > 120 ? "auto" : "hidden"
            }`;
        }
    }, [input]);

    const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
        handleSubmit(e, {
            options: { body: { useRag, llm, similarityMetric } },
        });
    };

    const handlePrompt = (promptText: string) => {
        const msg: Message = {
            id: crypto.randomUUID(),
            content: promptText,
            role: "user",
        };
        append(msg, { options: { body: { useRag, llm, similarityMetric } } });
    };

    return (
        <Container className="main-container">
            <Flex>
                <Sidebar className="left-side" />
                <Section className="main-section">
                    <Navbar className="main-nav">
                        <Flex className="row gap-10">
                            <BrainzAvatar
                                className="program-avatar"
                                src={
                                    _utils.functions.getProgram(props.params.id)
                                        .src
                                }
                                size={"40"}
                            />
                            {_utils.functions.getProgram(props.params.id).name}
                        </Flex>
                    </Navbar>
                    <Content className="chat-content">
                        <Flex className="col items-center justify-center full">
                            <Content className="chat-area">
                                <Wrapper>
                                    {messages.length === 0 && (
                                        <WelcomeMessage
                                            program={_utils.functions.getProgram(
                                                props.params.id,
                                            )}
                                        />
                                    )}
                                    <Box className="conversations">
                                        {messages.length > 0 &&
                                            messages.map((message, index) => (
                                                <Conversation
                                                    ref={messagesEndRef}
                                                    key={index}
                                                    content={message}
                                                    onAnswerClick={handlePrompt}
                                                />
                                            ))}
                                    </Box>
                                    <ChatScrollAnchor
                                        trackVisibility={isLoading}
                                    />
                                </Wrapper>
                            </Content>
                            <Flex className="chat-prompts row items-end full">
                                <Wrapper className="full">
                                    {!messages ||
                                        (messages.length === 0 && (
                                            <PromptSuggestionRow
                                                onPromptClick={handlePrompt}
                                                suggests={
                                                    _utils.constants.PROGRAMS[0]
                                                        .suggests
                                                }
                                            />
                                        ))}
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
                </Section>
            </Flex>
        </Container>
    );
};

export default ChatPage;

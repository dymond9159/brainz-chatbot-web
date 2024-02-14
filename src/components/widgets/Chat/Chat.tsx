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
    ChatScrollAnchor,
    Conversation,
    Navbar,
    Sidebar,
    WelcomeMessage,
} from "@/components/widgets";
import _utils from "@/utils";
import { useEnterSubmit } from "@/hooks";

import { useAppDispatch, useTypedSelector } from "@/store";
import { getChat, setChat } from "@/store/actions";
import { nanoid } from "nanoid";
import { redirect, usePathname, useRouter } from "next/navigation";
import { MessageType, ProfileForMetric } from "@/types";
import { NONE, START_PROMPTS } from "@/utils/constants";
import routes from "@/utils/routes";
import { nanoId } from "@/utils/functions";

const useRag = false;
const llm = "gpt-4-1106-preview";
const similarityMetric = "";

export interface ChatPageProps {
    id?: string;
}

export const Chat: React.FC<ChatPageProps> = (props) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const path = usePathname();
    const instructionId = "trauma";

    // const [chatId, setChatId] = useState<string | undefined>(props.id);
    const [promptMessage, setPromptMessage] = useState<Message>();
    const { formRef, onKeyDown } = useEnterSubmit();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const scores = useTypedSelector((state) => state.metric.scores);

    const {
        append,
        setMessages,
        messages,
        input,
        setInput,
        handleInputChange,
        stop,
        isLoading,
        data,
        error,
    } = useChat({
        // api: "api/chat",
        id: props.id,
        onError: (err: Error) => {
            console.log(err);
        },
        onFinish: async (message) => {
            // update message
            if (promptMessage) {
                // update new message

                if (!props.id) {
                    const newChatId = nanoId();
                    setChat(newChatId, [
                        ...(messages as MessageType[]),
                        promptMessage as MessageType,
                        {
                            id: message.id,
                            role: message.role,
                            content: message.content,
                            createdAt: message.createdAt?.toISOString(),
                        },
                    ]);
                    router.push(`${routes.CHAT}/${newChatId}`);
                } else {
                    setChat(props.id, [
                        ...(messages as MessageType[]),
                        promptMessage as MessageType,
                        {
                            id: message.id,
                            role: message.role,
                            content: message.content,
                            createdAt: message.createdAt?.toISOString(),
                        },
                    ]);
                }
            }
        },
    });

    useEffect(() => {
        const loadChats = async () => {
            if (props.id) {
                const chats = await getChat(props.id);
                if (chats) {
                    const _msg = JSON.parse(chats.messages) ?? [];
                    setMessages(_msg);
                }
            } else {
                setMessages([
                    {
                        id: nanoId(),
                        role: "assistant",
                        content: "How can Brainz help you today?",
                    },
                ]);
            }
        };

        // if (messages.length === 0) {
        //     handlePrompt("Hi, there", false);
        // }
        loadChats();
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

    useEffect(() => {
        if (promptMessage) {
            const healthState: any = Object.entries(scores).reduce(
                (acc, [key, value]) => ({
                    ...acc,
                    ...{
                        [key]: {
                            score: value.score,
                            maxScore: value.maxScore,
                            severity: value.severity,
                            updatedDate: _utils.functions.formatDate(
                                value.updatedDate,
                            ),
                        },
                    },
                }),
                {},
            );
            const profile: ProfileForMetric = {
                username: "Dong",
                age: 35,
                locale: "Hong Kong",
                healthState,
            };

            append(promptMessage, {
                options: {
                    body: {
                        useRag,
                        llm,
                        similarityMetric,
                        instructionId,
                        profile,
                    },
                },
            });
        }
    }, [promptMessage]);

    // Handle prompt selection
    const handlePrompt = async (
        promptText: string,
        userResponse: boolean = true,
    ) => {
        const msg: Message = {
            id: userResponse ? "" : NONE + nanoid(),
            role: "user",
            content: promptText,
            createdAt: new Date(Date.now()),
            // name: "", // TO DO
        };

        setPromptMessage(msg);
    };

    const handleReset = () => {
        setMessages([]);
        // handlePrompt("Hi, there!", false);
    };

    return (
        <Container className="main-container">
            <Flex>
                <Sidebar
                    className="left-side"
                    chatId={props.id}
                />
                <Flex className="main-section col">
                    <Navbar className="main-nav"></Navbar>
                    <Content className="chat-content full">
                        <Flex className="col items-center justify-center full h-full">
                            <Content className="chat-area">
                                <Wrapper>
                                    {messages.length > 0 && (
                                        <Box className="conversations">
                                            {messages.length > 0 &&
                                                messages.map(
                                                    (message, index) => (
                                                        <Conversation
                                                            ref={messagesEndRef}
                                                            key={index}
                                                            last={
                                                                index ===
                                                                messages.length -
                                                                    1
                                                            }
                                                            content={message}
                                                            onAnswerClick={
                                                                handlePrompt
                                                            }
                                                        />
                                                    ),
                                                )}
                                        </Box>
                                    )}
                                    {messages.length === 1 && (
                                        <ButtonGroup className="wrap start-message gap-15">
                                            {START_PROMPTS &&
                                                START_PROMPTS.map(
                                                    (item, key) => (
                                                        <Button
                                                            onClick={() =>
                                                                handlePrompt(
                                                                    item,
                                                                )
                                                            }
                                                            key={key}
                                                        >
                                                            {item}
                                                        </Button>
                                                    ),
                                                )}
                                        </ButtonGroup>
                                    )}
                                    <ChatScrollAnchor
                                        trackVisibility={isLoading}
                                    />
                                </Wrapper>
                            </Content>
                            <Flex className="chat-prompts row items-end full">
                                <Wrapper className="full">
                                    <Flex className="row justify-center items-center gap-10">
                                        {/* <Button>Psychometric Test</Button> */}
                                        {/* <Button icon="radio-grid">Explore</Button> */}
                                        {/* <Button
                                            icon="arrow-clockwise"
                                            onClick={handleReset}
                                        >
                                            Reset
                                        </Button> */}
                                    </Flex>
                                    <form
                                        ref={formRef}
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            if (!input?.trim()) {
                                                return;
                                            }
                                            handlePrompt(input);
                                            setInput("");
                                        }}
                                    >
                                        <Textarea
                                            type="textarea"
                                            placeholder="Start chatting..."
                                            className="full"
                                            rows={1}
                                            tabIndex={0}
                                            disabled={isLoading}
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

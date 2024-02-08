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
    Sidebar,
    WelcomeMessage,
} from "@/components/widgets";
import _utils from "@/utils";
import { useEnterSubmit } from "@/hooks";

import { useAppDispatch, useTypedSelector } from "@/store";
import { setPsychometricScore, updateRecentProgram } from "@/store/reducers";
import { switchProgram } from "@/store/actions";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import {
    IDataProps,
    MessageType,
    MetricCharactersType,
    ProgramType,
} from "@/types";
import { NONE } from "@/utils/constants";

const useRag = false;
const llm = "gpt-4-1106-preview";
const similarityMetric = "";

export interface ChatPageProps {
    params: {
        id: string;
    };
}

const ChatPage: React.FC<ChatPageProps> = (props) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const progStrId = props.params.id;
    const { currentProgram } = useTypedSelector((state) => state.chat);

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
        id: progStrId,
        initialInput: "",
        initialMessages:
            (currentProgram?.recentData?.messages as Message[]) ?? [],
        onError: (err: Error) => {
            console.log(err);
        },
        onFinish: async (message) => {
            // update message
            if (promptMessage) {
                // update new message
                dispatch(
                    updateRecentProgram({
                        progStrId: progStrId as ProgramType,
                        lastMessage: promptMessage.content,
                        lastAt: new Date(Date.now()).toISOString(),
                        messages: [
                            promptMessage as MessageType,
                            {
                                id: message.id,
                                role: message.role,
                                content: message.content,
                                createdAt: message.createdAt?.toISOString(),
                            },
                        ],
                    }),
                );
            }
        },
    });

    const [promptMessage, setPromptMessage] = useState<Message>();
    const { formRef, onKeyDown } = useEnterSubmit();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        switchProgram(progStrId);
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    }, [progStrId]);

    useEffect(() => {
        const curId = currentProgram?.data?.strid;

        // when actually switched.
        const isEmptyMessage =
            currentProgram?.recentData?.messages?.length === 0 ||
            messages.length === 0;
        if (progStrId === curId && isEmptyMessage) {
            setMessages(
                (currentProgram?.recentData?.messages as Message[]) ?? [],
            );
            handlePrompt("Hi, there", false);
        }
    }, [currentProgram?.data?.strid]);

    useEffect(() => {
        if (data && data.length > 0) {
            const last = data?.at(data.length - 1) as IDataProps;
            if (last && last !== null) {
                switch (last.type) {
                    case "score":
                        console.log(last);
                        dispatch(
                            setPsychometricScore(
                                last.result as MetricCharactersType,
                            ),
                        );
                        break;
                    default:
                }
            }
        }
    }, [data]);

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
        if (promptMessage && progStrId && append) {
            append(promptMessage, {
                options: { body: { useRag, llm, similarityMetric, progStrId } },
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
        handlePrompt("Hi, there!", false);
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
                                src={currentProgram?.data?.src ?? ""}
                                size={"40"}
                            />
                            {currentProgram?.data?.name}
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
                                        <Button
                                            icon="arrow-clockwise"
                                            onClick={handleReset}
                                        >
                                            Reset
                                        </Button>
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
                                            placeholder="Say here ..."
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

export default ChatPage;

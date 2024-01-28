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
    ProgramDataType,
    PromptSuggestionRow,
    Sidebar,
    WelcomeMessage,
} from "@/components/widgets";
import { ChatRequest, FunctionCallHandler, JSONValue } from "ai";
import _utils from "@/utils";
import { useEnterSubmit } from "@/hooks";

import { useAppDispatch, useTypedSelector } from "@/store";
import { setPsychometricScore, updateRecentProgram } from "@/store/reducers";
import { switchProgram } from "@/store/actions";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { fetchData } from "@/helpers/fetch";
import {
    IDataProps,
    MessageType,
    MetricCharactersType,
    ProgramType,
} from "@/types";

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

    const progStrId = props.params.id;
    const [suggestAnswers, setSuggestAnswers] = useState<string[]>();
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
        initialMessages: (currentProgram?.initMessages as Message[]) ?? [],
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

    const [program, setProgram] = useState<ProgramDataType>();
    const [promptMessage, setPromptMessage] = useState<Message>();
    const { formRef, onKeyDown } = useEnterSubmit();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    }, []);

    useEffect(() => {
        switchProgram(progStrId);
        const _currentProgram = _utils.functions.getProgram(progStrId);
        setProgram(_currentProgram);
    }, [progStrId]);

    useEffect(() => {
        setMessages((currentProgram?.initMessages as Message[]) ?? []);
        setSuggestAnswers(currentProgram?.data?.lastAnswers);
    }, [currentProgram]);

    useEffect(() => {
        if (suggestAnswers) {
            dispatch(
                updateRecentProgram({
                    progStrId: progStrId as ProgramType,
                    lastAnswers: suggestAnswers,
                }),
            );
        }
    }, [suggestAnswers]);

    useEffect(() => {
        if (data && data.length > 0) {
            const last = data?.at(data.length - 1) as IDataProps;
            if (last && last !== null) {
                switch (last.type) {
                    case "answer":
                        setSuggestAnswers(last.result as string[]);
                        break;
                    case "score":
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
            id: nanoid(),
            role: "user",
            content: promptText,
            createdAt: new Date(Date.now()),
            // name: "", // TO DO
        };

        setPromptMessage(msg);
        setSuggestAnswers(undefined);
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
                                src={program?.src ?? ""}
                                size={"40"}
                            />
                            {program?.name}
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

                                            {suggestAnswers && !isLoading && (
                                                <ButtonGroup className="wrap justify-start gap-10 mt-10 pl-20">
                                                    {suggestAnswers.map(
                                                        (item, idx) => (
                                                            <Button
                                                                key={idx}
                                                                onClick={() =>
                                                                    handlePrompt(
                                                                        item as string,
                                                                    )
                                                                }
                                                            >
                                                                {item as string}
                                                            </Button>
                                                        ),
                                                    )}
                                                </ButtonGroup>
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

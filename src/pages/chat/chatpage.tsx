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
} from "@/components/default";
import { Navbar, Sidebar } from "@/components/widgets";
import { Button, ButtonGroup, Textarea } from "@/components/ui-components";
import {
    Conversation,
    Logo,
    ProgramBoard,
    PromptSuggestionRow,
    RecentBoard,
    ShortcutBoard,
    SocialBoard,
    UserProfile,
    WelcomeMessage,
} from "@/components/feature";

const useRag = false;
const llm = "gpt3.5-turbo";
const similarityMetric = "";

const messages0: Message[] = [
    {
        id: "1",
        role: "user",
        content: "I felt down-hearted and blue",
    },
    {
        id: "2",
        role: "assistant",
        content:
            "Your feelings of being down-hearted and blue suggest a possible mood issue.\n\n - Not at all\n - Several Days\n\n Let's explore this further. <button>AAA</button>'\n" +
            "Over the last two weeks, have you been bothered by little interest or pleasure in doing things?' <a href='https://www.tiktok.com/@brainz.health' target='_blank'>Here</a>",
    },
];

const ChatPage: React.FC = () => {
    const { append, messages, input, handleInputChange, handleSubmit } =
        useChat();

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const scrollToBottom = () => {
        if (messagesEndRef.current)
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

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

    const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();

            if (!e.shiftKey) {
                // submit
                if (formRef && formRef.current) {
                }
            } else {
                if (textareaRef && textareaRef.current) {
                }
            }
        }
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
        <Container className="chat-container">
            <Flex>
                <Sidebar className="left-side">
                    <Wrapper>
                        <Navbar className="logo-nav">
                            <Flex className="row items-center justify-between full">
                                <Logo />
                            </Flex>
                        </Navbar>
                        <Flex className="flex-board col items-start justify-start">
                            <Section className="feature-board">
                                <ProgramBoard />
                            </Section>
                            <Section className="recent-board">
                                <RecentBoard />
                            </Section>
                            <Section className="shortcut-board">
                                <ShortcutBoard />
                            </Section>
                            <Section className="follow-us">
                                <SocialBoard />
                            </Section>
                            <Section className="user-profile">
                                <UserProfile />
                            </Section>
                        </Flex>
                    </Wrapper>
                </Sidebar>
                <Section className="chat-section">
                    <Navbar className="chat-nav">
                        <Flex className="row items-center justify-between full">
                            <Wrapper>
                                <h4>Mental Health Assistant</h4>
                            </Wrapper>
                        </Flex>
                    </Navbar>
                    <Content className="chat-content">
                        <Flex className="col items-center justify-center full">
                            <Content className="chat-area">
                                <Wrapper>
                                    {messages.length === 0 && (
                                        <WelcomeMessage />
                                    )}
                                    <Box className="conversations">
                                        {messages0.length > 0 &&
                                            messages0.map((message, index) => (
                                                <Conversation
                                                    ref={messagesEndRef}
                                                    key={index}
                                                    content={message}
                                                    onAnswerClick={handlePrompt}
                                                />
                                            ))}
                                    </Box>
                                </Wrapper>
                            </Content>
                            <Flex className="chat-prompts row items-end full">
                                <Wrapper className="full">
                                    {!messages ||
                                        (messages.length === 0 && (
                                            <PromptSuggestionRow
                                                onPromptClick={handlePrompt}
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
                                            textareaRef={textareaRef}
                                            onChange={handleInputChange}
                                            onKeyUp={handleKeyUp}
                                            value={input}
                                        >
                                            <ButtonGroup className="prompt-buttons gap-2 items-end">
                                                {/* <Button icon="mic-fill" /> */}
                                                <Button
                                                    icon="arrow-up"
                                                    type="submit"
                                                />
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

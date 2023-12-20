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
import { Logo, Navbar, Sidebar } from "@/components/widgets";
import { Textarea } from "@/components/ui-components";
import { Conversation } from "@/components/widgets/Conversation";

const useRag = false;
const llm = "gpt3.5-turbo-1106";
const similarityMetric = "";

const ChatPage: React.FC = () => {
    const { append, messages, input, handleInputChange, handleSubmit } =
        useChat();

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (messagesEndRef.current)
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
        console.log(messages);
    }, [messages]);

    const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
        handleSubmit(e, {
            options: { body: { useRag, llm, similarityMetric } },
        });
    };

    // const handlePrompt = (promptText: string) => {
    //     const msg: Message = {
    //         id: crypto.randomUUID(),
    //         content: promptText,
    //         role: "user",
    //     };
    //     append(msg, { options: { body: { useRag, llm, similarityMetric } } });
    // };

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
                        <Section className="shortcut-board"></Section>
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
                                    <Box className="conversations">
                                        {messages.length > 0 &&
                                            messages.map((message, index) => (
                                                <Conversation
                                                    ref={messagesEndRef}
                                                    key={index}
                                                    content={message}
                                                />
                                            ))}
                                    </Box>
                                </Wrapper>
                            </Content>
                            <Flex className="chat-prompts row items-center full">
                                <Wrapper className="full">
                                    <form onSubmit={handleSend}>
                                        <Textarea
                                            type="textarea"
                                            placeholder="Say here ..."
                                            className="full"
                                            onChange={handleInputChange}
                                            value={input}
                                        ></Textarea>
                                        <button
                                            type="submit"
                                            className="chatbot-send-button flex rounded-md items-center justify-center px-2.5 origin:px-3"
                                        >
                                            <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M2.925 5.025L9.18333 7.70833L2.91667 6.875L2.925 5.025ZM9.175 12.2917L2.91667 14.975V13.125L9.175 12.2917ZM1.25833 2.5L1.25 8.33333L13.75 10L1.25 11.6667L1.25833 17.5L18.75 10L1.25833 2.5Z" />
                                            </svg>
                                            <span className="hidden origin:block font-semibold text-sm ml-2">
                                                Send
                                            </span>
                                        </button>
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

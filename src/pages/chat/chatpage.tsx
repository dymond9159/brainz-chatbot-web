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
import {
    Button,
    ButtonGroup,
    Icon,
    Textarea,
} from "@/components/ui-components";
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
                                        >
                                            <ButtonGroup className="prompt-buttons gap-2">
                                                <Button icon="mic-fill" />
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

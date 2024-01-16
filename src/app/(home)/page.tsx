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
    Conversation,
    Logo,
    Navbar,
    ProgramBoard,
    PromptSuggestionRow,
    RecentBoard,
    ShortcutBoard,
    Sidebar,
    SocialBoard,
    ThemeToggle,
    UserProfile,
    WelcomeMessage,
} from "@/components/feature";
import { ChatRequest, FunctionCallHandler } from "ai";

const useRag = false;
const llm = "gpt-4-1106-preview";
const similarityMetric = "";

const HomePage: React.FC = () => {
    const {
        append,
        messages,
        input,
        handleInputChange,
        handleSubmit,
        isLoading,
        error,
    } = useChat();

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
        <Container className="main-container">
            <Flex>
                <Sidebar className="left-side" />
                <Section className="main-section">
                    <Navbar className="main-nav">Home</Navbar>
                    <Content className="home-content">
                        <Wrapper>
                            <Flex className="col items-center justify-center full">
                                <h3>
                                    {
                                        "Hey, you're finding strength in adversity today!"
                                    }
                                </h3>
                                <Box className="mood-scale"></Box>
                            </Flex>
                        </Wrapper>
                    </Content>
                </Section>
            </Flex>
        </Container>
    );
};

export default HomePage;

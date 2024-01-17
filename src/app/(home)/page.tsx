"use client";

import React from "react";

import {
    Flex,
    Container,
    Section,
    Content,
    Wrapper,
    Box,
} from "@/components/container";
import { Button } from "@/components/ui";
import { MoodScale, Navbar, Sidebar } from "@/components/widgets";
import { useRouter } from "next/navigation";
import routes from "@/utils/routes";

const HomePage: React.FC = () => {
    const router = useRouter();

    const handleTest = () => {
        alert("Coming soon!");
    };

    const handleGoProgram = () => {
        router.push(routes.PROGRAMS);
    };

    return (
        <Container className="main-container">
            <Flex>
                <Sidebar className="left-side" />
                <Section className="main-section">
                    <Navbar className="main-nav">Home</Navbar>
                    <Content className="home-content">
                        <Wrapper>
                            <Flex className="col items-center justify-center full gap-15">
                                <h2>
                                    Hey, you are finding strength in adversity
                                    today!
                                </h2>
                                <Box className="">
                                    <MoodScale />
                                </Box>
                                <Flex className="row items-center justify-center gap-15 mt-10">
                                    <Button onClick={handleTest}>
                                        Psychometric Test
                                    </Button>
                                    <Button onClick={handleGoProgram}>
                                        Programs
                                    </Button>
                                </Flex>
                            </Flex>
                        </Wrapper>
                    </Content>
                </Section>
            </Flex>
        </Container>
    );
};

export default HomePage;

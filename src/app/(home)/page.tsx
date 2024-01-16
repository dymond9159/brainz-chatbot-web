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

const HomePage: React.FC = () => {
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
                                    <Button>Psychometric Test</Button>
                                    <Button>Programs</Button>
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

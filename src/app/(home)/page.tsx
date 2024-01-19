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
import {
    MobileNavigator,
    MoodScale,
    Navbar,
    Sidebar,
} from "@/components/widgets";
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
                <Flex className="main-section col">
                    <Navbar className="main-nav">Home</Navbar>
                    <Content className="home-content">
                        <Wrapper>
                            <Flex className="col items-center justify-center full gap-15">
                                <MoodScale />
                                <br></br>
                                <h3>Anytime, Access our system!</h3>
                                <Flex className="row items-center justify-center full gap-15 mt-10">
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
                    <MobileNavigator />
                </Flex>
            </Flex>
        </Container>
    );
};

export default HomePage;

"use client";

import React from "react";

import {
    Flex,
    Container,
    Section,
    Content,
    Wrapper,
} from "@/components/container";
import {
    HomeShortcutItem,
    MobileNavigator,
    Navbar,
    Sidebar,
} from "@/components/widgets";
import { useRouter } from "next/navigation";
import routes from "@/utils/routes";

export const Home: React.FC = () => {
    const router = useRouter();

    return (
        <Container className="main-container">
            <Flex>
                <Sidebar className="left-side" />
                <Flex className="main-section col">
                    <Navbar className="main-nav"></Navbar>
                    <Content className="home-content">
                        <Wrapper className="flex col items-center justify-center">
                            <Section className="home-header">
                                <h2 className="page-title">
                                    Welcome to Brainz Health, <br />
                                    Mental Health Simplified
                                </h2>
                            </Section>
                            <Section>
                                <h3 className="sub-title">
                                    How can we help you?
                                </h3>
                                <Flex className="wrap w-full gap-15 items-start">
                                    <HomeShortcutItem
                                        title={"Mind Test"}
                                        url={routes.EXPLORE}
                                        description={
                                            "I would like to take psychological tests"
                                        }
                                    />
                                    <HomeShortcutItem
                                        title={"Mind Support"}
                                        url={routes.CHAT}
                                        description={
                                            "I would like to Speak to Brainz AI"
                                        }
                                    />
                                    <HomeShortcutItem
                                        title={"Mind Check"}
                                        url={routes.DASHBOARD}
                                        description={
                                            "I would like to see my profile insights"
                                        }
                                    />
                                </Flex>
                            </Section>
                        </Wrapper>
                    </Content>
                    <MobileNavigator />
                </Flex>
            </Flex>
        </Container>
    );
};

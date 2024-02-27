"use client";

import React from "react";

import {
    Flex,
    Container,
    Section,
    Content,
    Wrapper,
} from "@/components/container";
import { Footer, MobileNavigator, Navbar, Sidebar } from "@/components/widgets";
import _utils from "@/utils";
import { MonitorBox, Psychometric } from "@/components/widgets/Dashboard";
import { useTypedSelector } from "@/store";

export const Dashboard: React.FC = () => {
    const psycometricScores = useTypedSelector((state) => state.metric.scores);

    return (
        <Container className="main-container">
            <Flex>
                <Sidebar className="left-side" />
                <Flex className="main-section col">
                    <Navbar className="main-nav"></Navbar>
                    <Content className="dashboard-content">
                        <Wrapper>
                            <Section>
                                <h2 className="page-title">Mind Insights</h2>
                                <p className="page-description">
                                    Learn in depth about your psychological
                                    state, see results of the evidence-based
                                    tests
                                </p>
                            </Section>
                            {/* <MonitorBox title="Calendar"></MonitorBox> */}
                            <Section>
                                <MonitorBox title="">
                                    <Flex className="wrap w-full gap-15 items-start">
                                        <Psychometric
                                            title="Trauma"
                                            scores={psycometricScores?.trauma}
                                        />
                                        <Psychometric
                                            title="Anxiety"
                                            scores={psycometricScores?.anxiety}
                                        />
                                        <Psychometric
                                            title="Depression"
                                            scores={
                                                psycometricScores?.depression
                                            }
                                        />
                                        <Psychometric
                                            title="Mood"
                                            scores={psycometricScores?.mood}
                                        />
                                    </Flex>
                                </MonitorBox>
                            </Section>
                        </Wrapper>
                    </Content>
                    <MobileNavigator />
                </Flex>
            </Flex>
        </Container>
    );
};

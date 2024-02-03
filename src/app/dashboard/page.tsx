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

const DashboardPage: React.FC = () => {
    const psycometricScores = useTypedSelector((state) => state.metric.scores);

    return (
        <Container className="main-container">
            <Flex>
                <Sidebar
                    progId=""
                    className="left-side"
                />
                <Flex className="main-section col">
                    <Navbar className="main-nav">Dashboard</Navbar>
                    <Content className="dashboard-content">
                        <Wrapper>
                            <Flex className="wrap items-center justify-center full gap-15">
                                <MonitorBox title="Calendar"></MonitorBox>
                                <MonitorBox title="Psychometrics">
                                    <Flex className="wrap full gap-15 items-start">
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
                                            title="PTSD"
                                            scores={psycometricScores?.ptsd}
                                        />
                                        <Psychometric
                                            title="Suicidal"
                                            scores={psycometricScores?.suicide}
                                        />
                                    </Flex>
                                </MonitorBox>
                            </Flex>
                        </Wrapper>
                    </Content>
                    <MobileNavigator />
                </Flex>
            </Flex>
        </Container>
    );
};

export default DashboardPage;

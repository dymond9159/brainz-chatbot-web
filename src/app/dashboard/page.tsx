"use client";

import React from "react";

import {
    Flex,
    Container,
    Section,
    Content,
    Wrapper,
} from "@/components/container";
import { Navbar, Sidebar } from "@/components/widgets";
import _utils from "@/utils";
import { MonitorBox, Psychometric } from "@/components/widgets/Dashboard";

const DashboardPage: React.FC = () => {
    return (
        <Container className="main-container">
            <Flex>
                <Sidebar className="left-side" />
                <Section className="main-section">
                    <Navbar className="main-nav">Dashboard</Navbar>
                    <Content className="dashboard-content">
                        <Wrapper>
                            <Flex className="wrap items-center justify-center full gap-15">
                                <MonitorBox title="Calendar"></MonitorBox>
                                <MonitorBox title="Psychometrics">
                                    <Flex className="wrap full gap-15">
                                        <Psychometric
                                            title="Anxiety"
                                            value={3}
                                        />
                                        <Psychometric
                                            title="Depression"
                                            value={1}
                                        />
                                        <Psychometric
                                            title="PTSD"
                                            value={3}
                                        />
                                        <Psychometric
                                            title="Suicidal"
                                            value={1}
                                        />
                                    </Flex>
                                </MonitorBox>
                            </Flex>
                        </Wrapper>
                    </Content>
                </Section>
            </Flex>
        </Container>
    );
};

export default DashboardPage;

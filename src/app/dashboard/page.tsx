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

const DashboardPage: React.FC = () => {
    return (
        <Container className="main-container">
            <Flex>
                <Sidebar className="left-side" />
                <Section className="main-section">
                    <Navbar className="main-nav">Dashboard</Navbar>
                    <Content className="home-content">
                        <Wrapper>
                            <Flex className="wrap items-center justify-center full gap-15"></Flex>
                        </Wrapper>
                    </Content>
                </Section>
            </Flex>
        </Container>
    );
};

export default DashboardPage;

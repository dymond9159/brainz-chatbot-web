"use client";

import React from "react";

import {
    Flex,
    Container,
    Content,
    Wrapper,
    Section,
} from "@/components/container";
import {
    MobileNavigator,
    Navbar,
    ProgramBox,
    Sidebar,
} from "@/components/widgets";
import _utils from "@/utils";
import { PSYCHOMETRICS } from "@/utils/constants";

export const Explore: React.FC = () => {
    return (
        <Container className="main-container">
            <Flex>
                <Sidebar className="left-side" />
                <Flex className="main-section col">
                    <Navbar className="main-nav"></Navbar>
                    <Content className="home-content">
                        <Wrapper>
                            <Section className="">
                                <h2 className="page-title">Mind Tests</h2>
                                <p className="page-description">
                                    Learn in depth about your psychological
                                    state, see results of the evidence-based
                                    tests
                                </p>
                            </Section>
                            <Section>
                                <ProgramBox
                                    id="psychometric"
                                    title=""
                                    description=""
                                    programs={PSYCHOMETRICS}
                                />
                            </Section>
                        </Wrapper>
                    </Content>
                    <MobileNavigator />
                </Flex>
            </Flex>
        </Container>
    );
};

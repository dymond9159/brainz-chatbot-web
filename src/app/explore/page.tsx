"use client";

import React from "react";

import { Flex, Container, Content, Wrapper } from "@/components/container";
import {
    MobileNavigator,
    Navbar,
    Program,
    ProgramBox,
    Sidebar,
} from "@/components/widgets";
import _utils from "@/utils";
import { PROGRAMS, PSYCHOMETRICS } from "@/utils/constants";

const ExplorePage: React.FC = () => {
    return (
        <Container className="main-container">
            <Flex>
                <Sidebar className="left-side" />
                <Flex className="main-section col">
                    <Navbar className="main-nav">Explore</Navbar>
                    <Content className="home-content">
                        <Wrapper>
                            <ProgramBox
                                id="programs"
                                title="Programs"
                                description="Discover your own mental health tools to care your health."
                                programs={PROGRAMS}
                            />
                            <br></br>
                            <br></br>
                            <ProgramBox
                                id="psychometric"
                                title="Psychometric Tools"
                                description="Use a psychometric tools to track your mental health scale."
                                programs={PSYCHOMETRICS}
                            />
                        </Wrapper>
                    </Content>
                    <MobileNavigator />
                </Flex>
            </Flex>
        </Container>
    );
};

export default ExplorePage;

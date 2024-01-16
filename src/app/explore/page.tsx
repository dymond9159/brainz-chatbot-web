"use client";

import React from "react";

import {
    Flex,
    Container,
    Section,
    Content,
    Wrapper,
} from "@/components/container";
import { Navbar, Program, Sidebar } from "@/components/widgets";
import _utils from "@/utils";

const ExplorePage: React.FC = () => {
    return (
        <Container className="main-container">
            <Flex>
                <Sidebar className="left-side" />
                <Section className="main-section">
                    <Navbar className="main-nav"></Navbar>
                    <Content className="home-content">
                        <Wrapper>
                            <Flex className="col items-center justify-center full gap-15">
                                <h1>Programs</h1>
                                <p>
                                    Discover your own mental health tools to
                                    care your health.
                                </p>
                                <Flex className="wrap justify-between gap-10 mt-10">
                                    <Program
                                        program={_utils.constants.PROGRAMS[0]}
                                    />
                                </Flex>
                            </Flex>
                        </Wrapper>
                    </Content>
                </Section>
            </Flex>
        </Container>
    );
};

export default ExplorePage;

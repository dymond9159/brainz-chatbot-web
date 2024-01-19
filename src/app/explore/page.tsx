"use client";

import React from "react";

import { Flex, Container, Content, Wrapper } from "@/components/container";
import {
    MobileNavigator,
    Navbar,
    Program,
    Sidebar,
} from "@/components/widgets";
import _utils from "@/utils";

const ExplorePage: React.FC = () => {
    return (
        <Container className="main-container">
            <Flex>
                <Sidebar className="left-side" />
                <Flex className="main-section col">
                    <Navbar className="main-nav">Explore</Navbar>
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
                                        program={_utils.functions.getProgram(
                                            "trauma",
                                        )}
                                    />
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

export default ExplorePage;

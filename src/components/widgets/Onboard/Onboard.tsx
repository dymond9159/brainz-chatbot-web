"use client";

import React, { useEffect } from "react";

import { Flex, Container, Content, Wrapper } from "@/components/container";
import _utils from "@/utils";
import { Wizard } from "react-use-wizard";
import { Splash, StepA, StepB } from ".";

export const Onboard: React.FC = () => {
    return (
        <Container className="main-container">
            <Flex>
                <Flex className="main-section col">
                    <Wrapper>
                        <Content className="onboard-content flex justify-center items-center h-full">
                            <Wizard startIndex={0}>
                                <Splash />
                                <StepA />
                                <StepB />
                            </Wizard>
                        </Content>
                    </Wrapper>
                </Flex>
            </Flex>
        </Container>
    );
};

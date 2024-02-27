"use client";

import {
    Container,
    Content,
    Flex,
    Section,
    Wrapper,
} from "@/components/container";
import { Icon } from "@/components/ui";

export const VerifyOK = () => {
    return (
        <Container className="main-container">
            <Flex className="main-section">
                <Wrapper className="">
                    <Content className="auth-content">
                        <Section className="flex col items-center justify-center h-full">
                            <Icon
                                name="email-verify"
                                color="green"
                                size="130px"
                            />
                            <br />
                            <h2 className="page-title">Awesome! Thank you.</h2>
                            <p className="page-description"></p>
                        </Section>
                    </Content>
                </Wrapper>
            </Flex>
        </Container>
    );
};

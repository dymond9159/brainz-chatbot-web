"use client";

import { useSearchParams } from "next/navigation";

import {
    Container,
    Content,
    Flex,
    Section,
    Wrapper,
} from "@/components/container";
import { Button, Icon } from "@/components/ui";
import authAction from "@/store/actions";

export const EmailSend = () => {
    const params = useSearchParams();
    const email = params.get("email");

    const handleResend = async () => {
        if (email) await authAction.sendTokenWithEmail(email);
    };

    return (
        <Container className="main-container">
            <Flex className="main-section">
                <Wrapper className="">
                    <Content className="auth-content">
                        <Section className="flex col items-center justify-center h-full">
                            <Icon
                                name="email-verify"
                                color="#333"
                                size="130px"
                            />
                            <br />
                            <h2 className="page-title">
                                Please verify your email
                            </h2>
                            <p className="page-description">
                                We have sent a confirmation link to your email
                                to verify your email. If you did not receive the
                                email, please send it again.
                            </p>
                            <br />
                            <br />
                            <br />
                            <Button
                                className="ghost black"
                                onClick={() => handleResend()}
                            >
                                RESEND
                            </Button>
                        </Section>
                    </Content>
                </Wrapper>
            </Flex>
        </Container>
    );
};

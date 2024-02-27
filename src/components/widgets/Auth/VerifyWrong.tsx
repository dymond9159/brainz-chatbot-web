"use client";

import {
    Container,
    Content,
    Flex,
    Section,
    Wrapper,
} from "@/components/container";
import { Button, Icon } from "@/components/ui";
import authAction from "@/store/actions";

interface IProps {
    email: string;
}

export const VerifyWrong: React.FC<IProps> = (props) => {
    const handleResend = async () => {
        if (props.email) await authAction.sendTokenWithEmail(props.email);
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
                                Ooop! Something went error
                            </h2>
                            <p className="page-description">
                                The token is invalid or has expired. Tokens are
                                valid only within 30 minutes. Would you like to
                                send it again?
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

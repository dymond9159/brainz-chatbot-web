"use client";

import React from "react";
import {
    Flex,
    Container,
    Section,
    Content,
    Wrapper,
} from "@/components/container";
import { Button, ButtonGroup, Input } from "@/components/ui";
import { Logo } from "@/components/widgets";
import routes from "@/utils/routes";
import Link from "next/link";
import authAction from "@/store/actions";

export const SignIn: React.FC = () => {
    const handleSignIn = async (provider: string) => {
        await authAction.signin(provider);
    };
    return (
        <Container className="main-container">
            <Flex className="main-section">
                <Wrapper className="">
                    <Content className="auth-content">
                        <Section className="flex col items-center justify-center">
                            <Logo dir="col" />
                            <br />
                            <br />
                            <br />
                            <h1 className="page-title">Sign in</h1>
                            <ButtonGroup className="col gap-15">
                                <Button
                                    className="full ghost p-10"
                                    onClick={() => handleSignIn("facebook")}
                                >
                                    Sign in With Facebook
                                </Button>
                                <Button
                                    className="full ghost p-10"
                                    onClick={() => handleSignIn("google")}
                                >
                                    Sign in With Google
                                </Button>
                                <OrElement />
                                <Input
                                    type="text"
                                    name="username"
                                    placeholder="email"
                                    className="full"
                                />
                                <Input
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    className="full"
                                />
                                <Button className="full ghost black p-10">
                                    SIGN IN
                                </Button>
                                <br></br>
                                <p>
                                    {"Don't have an account?"}{" "}
                                    <Link href={routes.SIGNUP}>Sign up</Link>
                                </p>
                            </ButtonGroup>
                        </Section>
                    </Content>
                </Wrapper>
            </Flex>
        </Container>
    );
};

export const OrElement = () => {
    return (
        <div className="or-separator">
            <span className="or-text">or</span>
        </div>
    );
};

"use client";

import React from "react";
import { signIn } from "next-auth/react";
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
import { OrElement } from ".";

export const SignUp: React.FC = () => {
    const handleSignUp = async (provider: string) => {
        await signIn(provider);
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
                            <h1 className="page-title">Sign up</h1>
                            <ButtonGroup className="col gap-15">
                                <Button
                                    className="full ghost p-10"
                                    onClick={() => handleSignUp("facebook")}
                                >
                                    Sign up With Facebook
                                </Button>
                                <Button
                                    className="full ghost p-10"
                                    onClick={() => handleSignUp("google")}
                                >
                                    Sign up With Google
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
                                    SIGN UP
                                </Button>
                                <br></br>
                                <p>
                                    {"Do you have an account?"}{" "}
                                    <Link href={routes.SIGNIN}>Sign in</Link>
                                </p>
                            </ButtonGroup>
                        </Section>
                    </Content>
                </Wrapper>
            </Flex>
        </Container>
    );
};

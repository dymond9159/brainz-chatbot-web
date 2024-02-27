"use client";

import React, { useState } from "react";
import { useFormStatus } from "react-dom";
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

import { UserCreateParams } from "@/types";
import { cn } from "@/utils/functions";

export const SignIn: React.FC = () => {
    const initialState: UserCreateParams = {
        email: "",
        password: "",
    };

    const status = useFormStatus();
    const [formState, setFormState] = useState<UserCreateParams>(initialState);
    const [errorMessage, setErrorMessage] = useState<string>();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        setErrorMessage(undefined);
    };

    const handleSignIn = async (provider: string) => {
        let signInResult;
        if (provider === "credentials") {
            if (!formState.password || formState.password.trim() === "") {
                return;
            }
            signInResult = await authAction
                .signinWithEmail(formState)
                .catch((reason) => {
                    setErrorMessage("Your password is invalid.");
                });
            if (typeof signInResult === "string") {
                setErrorMessage(signInResult);
            }
        } else {
            signInResult = await authAction.signinWithProvider(provider);
        }
    };

    return (
        <Container className="main-container">
            <Flex className="main-section">
                <Wrapper className="">
                    <Content className="auth-content">
                        <Section className="flex col items-center justify-center h-full">
                            <Logo dir="col" />
                            <br />
                            <br />
                            <br />
                            <h1 className="page-title">Sign in</h1>
                            <ButtonGroup
                                className={cn(
                                    "col gap-15",
                                    errorMessage ? "error" : "",
                                )}
                            >
                                <Button
                                    className="w-full ghost p-10"
                                    onClick={() => handleSignIn("facebook")}
                                >
                                    Sign in With Facebook
                                </Button>
                                <Button
                                    className="w-full ghost p-10"
                                    onClick={() => handleSignIn("google")}
                                >
                                    Sign in With Google
                                </Button>
                                <OrElement />
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="email"
                                    className="w-full"
                                    value={formState.email}
                                    onChange={handleChange}
                                />
                                <Input
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    className="w-full"
                                    value={formState.password}
                                    onChange={handleChange}
                                />
                                {errorMessage && (
                                    <span className="error">
                                        {errorMessage}
                                    </span>
                                )}
                                <Button
                                    className="w-full ghost black p-10"
                                    disabled={status.pending}
                                    onClick={() => handleSignIn("credentials")}
                                >
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

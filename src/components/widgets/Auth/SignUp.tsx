"use client";

import React, { useState } from "react";
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
import authAction from "@/store/actions";
import { OrElement } from ".";
import { UserCreateParams } from "@/types";
import { useRouter } from "next/navigation";
import { cn } from "@/utils/functions";

export const SignUp: React.FC = () => {
    const router = useRouter();

    const initialState: UserCreateParams = {
        email: "",
    };
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

    const handleSignUp = async (provider: string) => {
        if (provider === "credentials") {
            if (formState.email.trim() === "") {
                return;
            }
            const response = await authAction
                .signupWithEmail(formState)
                .catch((reason) => {
                    setErrorMessage("Your email and password is invalid.");
                    return;
                });
            if (typeof response === "string") {
                if (response.includes("verification_sent")) {
                    router.push(response);
                } else {
                    setErrorMessage(response);
                }
            }
        } else {
            await authAction.signinWithProvider(provider);
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
                            <h1 className="page-title">Sign up</h1>
                            <form
                                className={cn(
                                    "flex col gap-15",
                                    errorMessage ? "error" : "",
                                )}
                            >
                                <Button
                                    className="w-full ghost p-10"
                                    onClick={() => handleSignUp("facebook")}
                                >
                                    Sign up With Facebook
                                </Button>
                                <Button
                                    className="w-full ghost p-10"
                                    onClick={() => handleSignUp("google")}
                                >
                                    Sign up With Google
                                </Button>
                                <OrElement />
                                <Input
                                    type="text"
                                    name="email"
                                    placeholder="email"
                                    className="w-full"
                                    required
                                    value={formState.email}
                                    onChange={handleChange}
                                />
                                {errorMessage && (
                                    <span className="error">
                                        {errorMessage}
                                    </span>
                                )}
                                <Button
                                    className="w-full ghost black p-10"
                                    onClick={() => handleSignUp("credentials")}
                                >
                                    SIGN UP
                                </Button>
                                <br></br>
                                <p>
                                    {"Do you have an account?"}{" "}
                                    <Link href={routes.SIGNIN}>Sign in</Link>
                                </p>
                            </form>
                        </Section>
                    </Content>
                </Wrapper>
            </Flex>
        </Container>
    );
};

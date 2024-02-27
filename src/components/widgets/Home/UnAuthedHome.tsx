"use client";

import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import {
    Flex,
    Container,
    Section,
    Content,
    Wrapper,
} from "@/components/container";
import { Button, ButtonGroup } from "@/components/ui";
import { Logo } from "@/components/widgets";
import { useRouter } from "next/navigation";
import routes from "@/utils/routes";

export const UnAuthedHome: React.FC = () => {
    const router = useRouter();

    const handleSignUp = () => {
        router.push(routes.SIGNUP);
    };

    const handleSignIn = () => {
        router.push(routes.SIGNIN);
    };

    return (
        <Container className="main-container">
            <Flex className="main-section">
                <Wrapper className="">
                    <Content className="home-content">
                        <Section className="unauthedhome flex col items-center justify-center">
                            <Logo dir="col" />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <ButtonGroup className="col gap-15">
                                <Button
                                    onClick={handleSignUp}
                                    className="w-full black"
                                >
                                    SIGN UP FREE
                                </Button>
                                <Button
                                    onClick={handleSignIn}
                                    className="w-full"
                                >
                                    LOG IN
                                </Button>
                                <Button className="w-full">
                                    EXPLORE ANONYMOUSLY
                                </Button>
                            </ButtonGroup>
                        </Section>
                    </Content>
                </Wrapper>
            </Flex>
        </Container>
    );
};

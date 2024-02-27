"use client";

import {
    Flex,
    Container,
    Section,
    Content,
    Wrapper,
} from "@/components/container";
import { Button, ButtonGroup, Input } from "@/components/ui";
import { Logo } from "@/components/widgets";
import { UserCreateParams } from "@/types";
import { cn } from "@/utils/functions";
import routes from "@/utils/routes";
import Link from "next/link";
import { useState } from "react";
import { useFormStatus } from "react-dom";

import authAction from "@/store/actions";
import { useRouter, useSearchParams } from "next/navigation";
import _utils from "@/utils";

export const Register = () => {
    const router = useRouter();
    const params = useSearchParams();
    const email = params.get("email");
    const token = params.get("verified");

    const decode = _utils.functions.jwtDecodeToken(token ?? "");
    if (!decode || decode?.email !== email) {
        // const verifyUrl = `${process.env.NEXT_PUBLIC_API_URL}${routes.VERIFY}?email=${email}&token=${token}`;
        router.push(routes.SIGNUP);
    }

    const initialState: UserCreateParams = {
        email: decode?.email ?? "",
        password: "",
        name: decode?.name ?? "",
        firstname: decode?.firstname,
        lastname: decode?.lastname,
        birthdate: decode?.birthdate,
        phone: decode?.phone,
        locale: decode?.locale,
        address: decode?.address,
        image: decode?.image,
        emailVerified: true,
    };
    const status = useFormStatus();
    const [formState, setFormState] = useState<UserCreateParams>(initialState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        // setErrorMessage(undefined);
    };

    const handleRegister = async () => {
        if (formState.name && formState.password) {
            const user = await authAction.register(formState);
            if (!!user) {
                await authAction.signinWithEmail(
                    user as UserCreateParams,
                    routes.CHATHOME,
                );
            }
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
                            <h2 className="page-title">Create your account</h2>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleRegister();
                                }}
                                className={cn("flex col gap-15")}
                            >
                                <Input
                                    type="text"
                                    name="name"
                                    label="Name"
                                    className="w-full"
                                    value={formState.name}
                                    onChange={handleChange}
                                    required
                                />
                                <Input
                                    type="email"
                                    name="email"
                                    disabled={true}
                                    label="Email"
                                    className="w-full"
                                    value={formState.email}
                                    verified={formState.emailVerified}
                                    onChange={handleChange}
                                />
                                <Input
                                    type="password"
                                    visibility={true}
                                    name="password"
                                    label="Password"
                                    className="w-full"
                                    value={formState.password}
                                    autoComplete="off"
                                    onChange={handleChange}
                                    required
                                />

                                <Button
                                    type="submit"
                                    className="w-full ghost black p-10"
                                    disabled={status.pending || !email}
                                    onClick={() => handleRegister()}
                                >
                                    CONTINUE
                                </Button>
                                <p>
                                    {`By continuing, you accept our company's `}
                                    <Link
                                        href={routes.TERMS}
                                        target="_blank"
                                    >
                                        Terms of Service
                                    </Link>
                                    {` and `}
                                    <Link
                                        href={routes.PRIVACY}
                                        target="_blank"
                                    >
                                        Privacy Policy
                                    </Link>
                                    {`.`}
                                </p>
                                <p className="w-full">
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

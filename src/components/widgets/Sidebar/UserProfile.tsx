"use client";

import React from "react";
import { Flex } from "../../container";
import { Button, Dropdown } from "../../ui";
import { IDivProps } from "@/types";
import { BrainzAvatar } from "..";
import { useSession } from "next-auth/react";
import authAction from "@/store/actions";

export const UserProfile: React.FC<IDivProps> = (props) => {
    const { data: session } = useSession();

    const handleSignOut = async () => {
        await authAction.signout();
    };

    return (
        <Flex className={`${props.className} row gap-10`}>
            <BrainzAvatar
                src={""}
                className="user-avatar"
                name="Dong Ying"
                color="#356735"
                size="30"
            />
            <Flex className="username col items-start">
                <h5>{session?.user?.name ?? "..."}</h5>
                <span>{session?.user?.email ?? ""}</span>
            </Flex>
            <Button
                onClick={() => handleSignOut()}
                icon="box-arrow-right"
            ></Button>
            {/* <Dropdown label="...">
                <Dropdown.Item onClick={() => router.push(routes.DASHBOARD)}>
                    Mind Insights
                </Dropdown.Item>
                <Dropdown.Item
                    disabled
                    onClick={() => alert("Ooop! Coming Soon!")}
                >
                    Account Settings
                </Dropdown.Item>
                <Dropdown.Item
                    disabled
                    onClick={() => alert("Ooop! Coming Soon!")}
                >
                    Billing & Subscription
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => alert("Ooop! Coming Soon!")}>
                    Sign out
                </Dropdown.Item>
            </Dropdown> */}
        </Flex>
    );
};

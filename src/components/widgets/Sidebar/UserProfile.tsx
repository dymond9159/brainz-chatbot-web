import React from "react";
import { Flex } from "../../container";
import { Dropdown } from "../../ui";
import { IDivProps } from "@/types";
import { BrainzAvatar } from "..";
import { useRouter } from "next/navigation";
import routes from "@/utils/routes";

export const UserProfile: React.FC<IDivProps> = (props) => {
    const router = useRouter();
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
                <h5>Dong</h5>
                <span>panda.dev1115@gmail.com</span>
            </Flex>
            <Dropdown label="...">
                <Dropdown.Item onClick={() => router.push(routes.DASHBOARD)}>
                    Dashboard
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
            </Dropdown>
        </Flex>
    );
};

import React from "react";
import { Flex } from "../container";
import Avatar from "react-avatar";
import { Button } from "../ui";
import { DivProps } from "@/types";

export const UserProfile: React.FC<DivProps> = (props) => {
    return (
        <Flex className={`${props.className} row gap-5`}>
            <Avatar
                className="user-avatar"
                name="dong ying"
                size="33"
                round={true}
            />
            <Flex className="username col items-start">
                <h5>Dong</h5>
                <span>panda.dev1115@gmail.com</span>
            </Flex>
            <Button
                className="logout"
                icon="box-arrow-right"
            />
        </Flex>
    );
};

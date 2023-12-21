import React from "react";
import { Flex } from "../default";
import Avatar from "react-avatar";
import { Button } from "../ui-components";

export const UserProfile: React.FC = (props) => {
    return (
        <Flex className="row gap-5">
            <Avatar
                className="user-avatar"
                name="dong ying"
                size="33"
                round={true}
            />
            <Flex className="username col items-start">
                <h4>Dong</h4>
                <span>panda.dev1115@gmail.com</span>
            </Flex>
            <Button
                className="logout"
                icon="box-arrow-right"
            />
        </Flex>
    );
};

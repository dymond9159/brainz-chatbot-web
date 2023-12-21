import React from "react";
import { Flex } from "../default";
import { Button, ButtonGroup, Icon } from "../ui-components";
import Link from "next/link";

export const SocialBoard: React.FC = (props) => {
    return (
        <ButtonGroup
            groupname="Follow us"
            className="full row gap-10 justify-start"
        >
            <Button icon="facebook"></Button>
            <Button icon="instagram"></Button>
            <Button icon="tiktok"></Button>
            <Button icon="snapchat"></Button>
        </ButtonGroup>
    );
};

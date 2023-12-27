import React from "react";
import { Flex } from "../default";
import { Button, ButtonGroup, Icon } from "../ui";
import Link from "next/link";

export const RecentBoard: React.FC = (props) => {
    return (
        <ButtonGroup
            groupname="Recently Program"
            className="full col gap-10 justify-start items-start"
        >
            <Flex className="shortcut row gap-15 full">
                <Icon name="arrow-up" />
                <Link href="#">Trauma Assistant</Link>
            </Flex>
            <Flex className="shortcut row gap-15 full">
                <Icon name="arrow-up" />
                <Link href="#">Self-Care Advisor</Link>
            </Flex>
        </ButtonGroup>
    );
};

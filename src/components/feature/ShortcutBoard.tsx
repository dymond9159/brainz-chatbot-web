import React from "react";
import { Flex } from "../default";
import { ButtonGroup, Icon } from "../ui-components";
import Link from "next/link";

export const ShortcutBoard: React.FC = (props) => {
    return (
        <ButtonGroup
            groupname="Shortcut"
            className="shortcut-button full col gap-10 justify-start"
        >
            <Flex className="shortcut row gap-15 full">
                <Icon name="currency-dollar" />
                <Link href="#">Pricing</Link>
            </Flex>
            <Flex className="shortcut row gap-15 full">
                <Icon name="list-ul" />
                <Link href="#">How To Use</Link>
            </Flex>
            <Flex className="shortcut row gap-15 full">
                <Icon name="question-circle" />
                <Link href="#">FAQ</Link>
            </Flex>
            <Flex className="shortcut row gap-15 full">
                <Icon name="chat-right-dot" />
                <Link href="#">Feedback</Link>
            </Flex>
            {/* <Flex className="shortcut row gap-15 full">
                <Icon name="arrow-up" />
                <Link href="#">Blog</Link>
            </Flex> */}
            <Flex className="shortcut row gap-15 full">
                <Icon name="send" />
                <Link href="#">Contact Us</Link>
            </Flex>
        </ButtonGroup>
    );
};

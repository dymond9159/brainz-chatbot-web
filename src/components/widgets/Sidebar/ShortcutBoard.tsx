import React from "react";
import { Flex } from "../../container";
import { ButtonGroup, Icon } from "../../ui";
import Link from "next/link";
import _utils from "@/utils";

export const ShortcutBoard: React.FC = (props) => {
    return (
        <ButtonGroup
            groupname=""
            className="shortcut-button full col gap-10 justify-start"
        >
            <Flex className="shortcut row gap-15 full">
                <Icon name="speedometer" />
                <Link href={_utils.routes.DASHBOARD}>Dashboard</Link>
            </Flex>
            <Flex className="shortcut row gap-15 full">
                <Icon name="house" />
                <Link
                    href={_utils.routes.HOME}
                    target="_blank"
                >
                    Home
                </Link>
            </Flex>
            <Flex className="shortcut row gap-15 full">
                <Icon name="currency-dollar" />
                <Link
                    href={_utils.routes.PRICING}
                    target="_blank"
                >
                    Pricing
                </Link>
            </Flex>
            <Flex className="shortcut row gap-15 full">
                <Icon name="question-circle" />
                <Link href={_utils.routes.FAQ}>FAQ</Link>
            </Flex>
            <Flex className="shortcut row gap-15 full">
                <Icon name="chat-right-dot" />
                <Link
                    href="#"
                    target="_blank"
                >
                    Feedback
                </Link>
            </Flex>
            <Flex className="shortcut row gap-15 full">
                <Icon name="send" />
                <Link
                    href={_utils.routes.CONTACT}
                    target="_blank"
                >
                    Contact Us
                </Link>
            </Flex>
        </ButtonGroup>
    );
};

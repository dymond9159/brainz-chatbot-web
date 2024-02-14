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
                <Link href={_utils.routes.DASHBOARD}>Mind Insights</Link>
            </Flex>
            <Flex className="shortcut row gap-15 full">
                <Icon name="radio-grid" />
                <Link href={_utils.routes.EXPLORE}>Mind Tests</Link>
            </Flex>
            <Flex className="shortcut row gap-15 full">
                <Icon name="chat" />
                <Link href={_utils.routes.CHAT}>Mind Chat</Link>
            </Flex>
        </ButtonGroup>
    );
};

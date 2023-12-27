import React from "react";
import { Flex } from "../basic";
import { Button, ButtonGroup, Icon } from "../ui";
import Link from "next/link";

export const ProgramBoard: React.FC = (props) => {
    return (
        <ButtonGroup
            groupname="Program"
            className="full col gap-10 justify-start items-start"
        >
            <Flex className="shortcut row gap-15 full">
                <Icon name="diamond" />
                <Link href="#">Explore</Link>
            </Flex>
        </ButtonGroup>
    );
};

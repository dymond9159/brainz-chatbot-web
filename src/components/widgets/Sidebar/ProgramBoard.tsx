import React from "react";
import { Flex } from "../../container";
import { ButtonGroup, Icon } from "../../ui";
import Link from "next/link";
import routes from "@/utils/routes";

export const ProgramBoard: React.FC = (props) => {
    return (
        <ButtonGroup
            groupname="Programs"
            className="full col gap-10 justify-start items-start"
        >
            <Flex className="shortcut row gap-15 full">
                <Icon name="radio-grid" />
                <Link href={`${routes.PROGRAMS}#programs`}>Explore</Link>
            </Flex>
        </ButtonGroup>
    );
};

import React from "react";

import { Flex } from "../default";
import { IButtonGroupProps } from "@/types";

export const ButtonGroup: React.FC<IButtonGroupProps> = (props) => {
    return (
        <Flex className={`${props.direction ?? "row"} ${props.className}`}>
            {props.children}
        </Flex>
    );
};

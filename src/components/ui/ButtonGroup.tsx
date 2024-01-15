import React from "react";

import { Box, Flex } from "../container";
import { IButtonGroupProps } from "@/types";

export const ButtonGroup: React.FC<IButtonGroupProps> = (props) => {
    return (
        <Box className="button-group">
            {props.groupname && (
                <div className="group-name">
                    <label>{props.groupname}</label>
                </div>
            )}
            <Flex
                className={`button-list ${props.direction ?? "row"} ${
                    props.className
                }`}
            >
                {props.children}
            </Flex>
        </Box>
    );
};

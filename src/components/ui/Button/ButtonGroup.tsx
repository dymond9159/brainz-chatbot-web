import React from "react";

import { Box, Content, Flex } from "../../container";
import { IDivProps } from "@/types";

type TFlexDirection = "row" | "col";

export interface IButtonGroupProps extends IDivProps {
    direction?: TFlexDirection;
    gap?: number;
    groupname?: string;
}

export const ButtonGroup: React.FC<IButtonGroupProps> = (props) => {
    return (
        <Content className="button-group">
            {props.groupname && (
                <div className="group-name">
                    <label>{props.groupname}</label>
                </div>
            )}
            <Box className="scroll-content">
                <Flex
                    className={`button-list ${props.direction ?? "row"} ${
                        props.className
                    }`}
                >
                    {props.children}
                </Flex>
            </Box>
        </Content>
    );
};

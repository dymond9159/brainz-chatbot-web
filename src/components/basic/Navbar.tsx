import React from "react";
import { Content, Flex } from ".";
import { ChildrenProps } from "@/types";

export const Navbar: React.FC<ChildrenProps> = (props) => {
    return (
        <Content className={`header ${props.className}`}>
            <Flex className="row items-center justify-between full">
                {props.children}
            </Flex>
        </Content>
    );
};

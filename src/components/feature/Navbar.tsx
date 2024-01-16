import React from "react";
import { Content, Flex, Wrapper } from "../container";
import { ChildrenProps } from "@/types";
import { ThemeToggle } from ".";

export const Navbar: React.FC<ChildrenProps> = (props) => {
    return (
        <Content className={`header nav ${props.className}`}>
            <Flex className="row items-center justify-between full">
                <Flex className="row items-center justify-between full">
                    <Wrapper>
                        <Flex className="row items-center justify-between full">
                            <h4>{props.children}</h4>
                            <ThemeToggle />
                        </Flex>
                    </Wrapper>
                </Flex>
            </Flex>
        </Content>
    );
};

import React from "react";
import { Content, Flex, Wrapper } from "../container";
import { IDivProps } from "@/types";
import { ThemeToggle } from ".";
import { Button } from "../ui";
import { useSidebar } from "@/hooks";

export const Navbar: React.FC<IDivProps> = (props) => {
    const { toggleSidebar } = useSidebar();
    return (
        <Content className={`header nav ${props.className}`}>
            <Flex className="row items-center justify-between full">
                <Flex className="row items-center justify-between full">
                    <Wrapper>
                        <Flex className="row items-center justify-between full">
                            <Flex className="row gap-10">
                                <Button
                                    className="side-toggle"
                                    icon="list"
                                    onClick={() => {
                                        toggleSidebar();
                                    }}
                                />
                                <h4>{props.children}</h4>
                            </Flex>
                            {/* <ThemeToggle /> */}
                        </Flex>
                    </Wrapper>
                </Flex>
            </Flex>
        </Content>
    );
};

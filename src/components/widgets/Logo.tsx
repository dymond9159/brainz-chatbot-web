import React from "react";
import { Content, Flex } from "../container";
import { Button, Icon } from "../ui";
import Link from "next/link";
import { useSidebar } from "@/hooks";

const LOGO_TEXT = "Brainz Health";
export const Logo = () => {
    const { toggleSidebar } = useSidebar();
    return (
        <Content className="logo-nav">
            <Flex className="row items-center justify-between full">
                <Link href="/">
                    <Flex className="logo row items-center">
                        <Icon
                            name="brainz-logo"
                            size={30}
                        />
                        <h2 className="logo-text">{LOGO_TEXT}</h2>
                    </Flex>
                </Link>
                <Button
                    className="sidebar-close"
                    icon="close"
                    onClick={() => {
                        toggleSidebar();
                    }}
                />
            </Flex>
        </Content>
    );
};

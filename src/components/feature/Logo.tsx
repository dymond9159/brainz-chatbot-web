import React from "react";
import { Content, Flex } from "../container";
import { Icon } from "../ui";

const LOGO_TEXT = "Brainz Health";
export const Logo = () => {
    return (
        <Content className="logo-nav">
            <Flex className="row items-center justify-between full">
                <Flex className="logo row items-center">
                    <Icon
                        name="brainz-logo"
                        size={30}
                    />
                    <h2 className="logo-text">{LOGO_TEXT}</h2>
                </Flex>
            </Flex>
        </Content>
    );
};

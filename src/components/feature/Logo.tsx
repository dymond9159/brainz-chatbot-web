import React from "react";
import { Flex } from "../default";
import { Icon } from "../ui";

const LOGO_TEXT = "Brainz Health";
export const Logo = () => {
    return (
        <Flex className="logo row items-center">
            <Icon
                name="brainz-logo"
                size={30}
            />
            <h2 className="logo-text">{LOGO_TEXT}</h2>
        </Flex>
    );
};

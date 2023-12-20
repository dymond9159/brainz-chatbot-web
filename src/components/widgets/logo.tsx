import React from "react";
import { Box, Flex } from "../default";

const LOGO_TEXT = "Brainz Health";
export const Logo = () => {
    return (
        <Flex className="row items-center">
            <Box className="logo-icon"></Box>
            <h2 className="logo-text">{LOGO_TEXT}</h2>
        </Flex>
    );
};

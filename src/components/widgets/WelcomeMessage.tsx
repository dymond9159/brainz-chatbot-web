import React from "react";
import { Box, Flex } from "../default";
import { Icon } from "../ui-components";

export const WelcomeMessage: React.FC = () => {
    return (
        <Flex className="welcome-body col justify-center">
            <Box>
                <Icon
                    name="brainz-logo"
                    size={32}
                />
            </Box>
            <div>
                <p>
                    {`Are you struggling with the emotional aftermath of a
                    distressing event? You're not alone, and we're here to help.`}
                </p>
                <p>
                    {`Our Personal Mental Health Assistant is designed to guide
                    you through the complexities of trauma, providing you with
                    the tools to protect yourself and heal.`}
                </p>
                <p>
                    {`We're committed to helping you navigate the challenging path
                    of posttraumatic stress disorder (PTSD) and other
                    trauma-related disorders such as depression, anxiety, etc.`}
                </p>
                <p>
                    {`Our assistant prioritizes your mental well-being, helping
                    you regulate your emotions and maintain healthy
                    relationships. With our Personal Mental Health Assistant,
                    you're not just surviving, you're thriving.`}
                </p>
                <p>
                    {`Take the first step towards healing today. Your journey to
                    recovery starts here.`}
                </p>
            </div>
        </Flex>
    );
};

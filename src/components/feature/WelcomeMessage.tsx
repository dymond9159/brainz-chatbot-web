import React from "react";
import { Box, Flex } from "../default";
import { Icon } from "../ui";

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
                    {`Are you struggling with the emotional aftermath of a distressing event? '\n\You're not alone, and we're here to help.`}
                </p>
                <p>
                    {`We're committed to helping you navigate the challenging path of posttraumatic stress disorder (PTSD) and other trauma-related disorders such as depression, anxiety, etc. Our assistant prioritizes your mental well-being, helping you regulate your emotions and maintain healthy relationships. With our Personal Mental Health Assistant, you're not just surviving, you're thriving.`}
                </p>
                <p>
                    {`Take the first step towards healing today. Your journey to recovery starts here.`}
                </p>
                <p>
                    {`How are you feeling today? Could you share any challenges or difficult situations you are currently facing?`}
                </p>
            </div>
        </Flex>
    );
};

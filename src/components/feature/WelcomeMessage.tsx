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
                    {`Are you struggling with the emotional aftermath of a distressing event?`}
                </p>
                <p>
                    {`We're committed to helping you navigate the challenging path of posttraumatic stress disorder (PTSD) and other trauma-related disorders such as depression, anxiety, etc.`}
                </p>
                <p>
                    {`How are you feeling today? Could you share any challenges or difficult situations you are currently facing?`}
                </p>
            </div>
        </Flex>
    );
};

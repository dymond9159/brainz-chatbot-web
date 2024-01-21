import React from "react";
import { BrainzAvatar, IProgramProps } from "..";
import { Flex } from "../../container";

export const WelcomeMessage: React.FC<IProgramProps> = (props) => {
    return (
        <Flex className="welcome-body col justify-center">
            <BrainzAvatar
                className="program-avatar"
                src={props.program?.src}
            />
            <p style={{ paddingTop: "15px" }}>
                {props.program?.description_long}
            </p>
        </Flex>
    );
};

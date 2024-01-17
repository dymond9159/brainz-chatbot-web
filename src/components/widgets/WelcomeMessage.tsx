import React from "react";
import { BrainzAvatar } from ".";
import _utils from "@/utils";
import { Flex } from "../container";
import { IProgramProps } from "@/types";

export const WelcomeMessage: React.FC<IProgramProps> = (props) => {
    return (
        <Flex className="welcome-body col justify-center">
            <BrainzAvatar src={props.program.src} />
            <div>{props.program.description1}</div>
        </Flex>
    );
};

import React from "react";
import { Button } from "../../ui";
import { Flex } from "../../container";
import { IDivProps } from "@/types";

interface IProps extends IDivProps {}

export const ChatTools: React.FC<IProps> = (props) => {
    return (
        <Flex className="row justify-center items-center gap-10">
            {/* <Button>Psychometric Test</Button> */}
            {/* <Button icon="radio-grid">Explore</Button> */}
            <Button
                icon="arrow-clockwise"
                onClick={() => props.onClick}
            >
                Reset
            </Button>
        </Flex>
    );
};

export default ChatTools;

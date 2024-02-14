import React from "react";
import { useRouter } from "next/navigation";
import { Flex } from "../../container";
import { Button, type ButtonProps } from "@/components/ui";
import { cn } from "@/utils/functions";
import { BrainzAvatar } from "..";
import { QuestionnaireType } from "@/types";
import { CALLBACKURL } from "@/utils/constants";
import { useAppDispatch } from "@/store";
import { setMetricCallBackUrl } from "@/store/reducers";
import Markdown from "react-markdown";

export type ProgramDataType = {
    numid: number;
    strid: string;
    name: string;
    type: string;
    src: string;
    url: string;
    description_short: string;
    description_long: string;
    suggests?: string[];
    instruction?: string;
    questionnaires?: QuestionnaireType;
};

export interface IProgramProps {
    program: ProgramDataType;
}

export const Program: React.FC<IProgramProps> = (props) => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handlerClick = (url: string) => {
        const callbackUrl = url.includes("test")
            ? `../explore#psychometric`
            : null;

        dispatch(setMetricCallBackUrl(callbackUrl));

        router.push(`${url}`);
    };

    return (
        <Button
            className={cn("program")}
            onClick={() => handlerClick(props.program.url)}
        >
            <Flex className="row items-center justify-between">
                <Flex className="col items-center gap-15">
                    <Flex className="col items-start justify-start">
                        <h3 className="program-text">{props.program.name}</h3>
                        <Flex className="row gap-5">
                            <h4 className="timespan">
                                Time: ~{props.program.questionnaires?.times}{" "}
                                mins
                            </h4>
                            <h4 className="questionspan">
                                Questions:{" "}
                                {props.program.questionnaires?.questionCounts}
                            </h4>
                        </Flex>
                        <Markdown className="program-desc">
                            {props.program.description_short}
                        </Markdown>
                        {/* <span className="program-desc">
                            {props.program.description_short}
                        </span> */}
                    </Flex>
                </Flex>
            </Flex>
        </Button>
    );
};

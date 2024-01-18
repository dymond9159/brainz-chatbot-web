import React from "react";
import { useRouter } from "next/navigation";
import { Flex } from "../../container";
import { Button, type ButtonProps } from "@/components/ui";
import { cn } from "@/utils/functions";
import { BrainzAvatar } from "..";
import _utils from "@/utils";

export type ProgramDataType = {
    numid: number;
    strid: string;
    name: string;
    description: string;
    description1: string;
    src: string;
    suggests: string[];
};

export interface IProgramProps extends ButtonProps {
    program: ProgramDataType;
}

export const Program: React.FC<IProgramProps> = (props) => {
    const router = useRouter();

    const handlerClick = (id: string) => {
        router.push(`/chat/${id}`);
        router.refresh();
    };

    return (
        <Button
            className={cn("program")}
            onClick={() => handlerClick(props.program.strid)}
        >
            <Flex className="row items-center justify-between full">
                <Flex className="row items-center gap-15">
                    <BrainzAvatar
                        className="program-avatar"
                        src={props.program.src}
                        name={props.program.name}
                    />
                    <Flex className="col items-start justify-start">
                        <h3 className="program-text">{props.program.name}</h3>
                        <span className="program-desc">
                            {props.program.description}
                        </span>
                    </Flex>
                </Flex>
            </Flex>
        </Button>
    );
};

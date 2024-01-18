import React from "react";
import { Flex } from "../container";
import { Button } from "../ui";
import { cn } from "@/utils/functions";
import { IProgramProps } from "@/types";
import { useRouter } from "next/navigation";
import { BrainzAvatar } from ".";
import _utils from "@/utils";

export const Program: React.FC<IProgramProps> = (props) => {
    const router = useRouter();

    const handlerClick = (id: string) => {
        router.push(`/chat/${id}`);
        router.refresh();
    };

    return (
        <Button
            className={cn(props.className, "program")}
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

import React from "react";
import { Flex } from "../container";
import { Button } from "../ui";
import { cn } from "@/utils/functions";
import { IButtonProps, ProgramDataType } from "@/types";
import Avatar from "react-avatar";
import { useRouter } from "next/navigation";

interface IProgramProps extends IButtonProps {
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
            className={cn(props.className, "program")}
            onClick={() => handlerClick(props.program.strid)}
        >
            <Flex className="row items-center justify-between full">
                <Flex className="row items-center gap-15">
                    <Avatar
                        className="program-avatar"
                        src={props.program.src}
                        name={props.program.strid}
                        size="80"
                        color="gray"
                        round={true}
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

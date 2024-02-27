import React from "react";
import { Flex, Section } from "../../container";
import { Program } from "..";
import _utils from "@/utils";
import { IDivProps, ProgramDataType } from "@/types";

interface IProps extends IDivProps {
    title: string;
    description: string;
    programs: ProgramDataType[];
}

export const ProgramBox: React.FC<IProps> = (props) => {
    return (
        <Flex className="wrap items-center justify-center w-full gap-15">
            <h2 id={props.id}>{props.title}</h2>
            <p>{props.description}</p>
            <Flex className="wrap justify-between gap-10 mt-10">
                {props.programs.length &&
                    props.programs.map((item, idx) => (
                        <Program
                            key={idx}
                            program={item}
                        />
                    ))}
            </Flex>
        </Flex>
    );
};

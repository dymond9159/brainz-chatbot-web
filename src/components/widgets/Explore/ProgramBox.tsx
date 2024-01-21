import React from "react";
import { Flex, Section } from "../../container";
import { Program, ProgramDataType } from "..";
import _utils from "@/utils";
import { IDivProps } from "@/types";

interface IProps extends IDivProps {
    title: string;
    description: string;
    programs: ProgramDataType[];
}

export const ProgramBox: React.FC<IProps> = (props) => {
    return (
        <Section>
            <Flex className="col items-center justify-center full gap-15">
                <h2>{props.title}</h2>
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
        </Section>
    );
};

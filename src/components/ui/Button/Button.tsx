import React from "react";
import { Icon } from "..";
import { Flex } from "@/components/container";
import { cn } from "@/utils/functions";

type ButtonType = "button" | "submit" | "reset" | undefined;

export interface ButtonProps extends React.ComponentProps<"button"> {
    type?: ButtonType;
    icon?: string;
    vertical?: boolean;
}

export const Button: React.FC<ButtonProps> = (props) => {
    const vertical = props.vertical ? "col" : "row";
    return (
        <button
            className={`button ${props.className}`}
            type={props.type ?? "button"}
            ref={props.ref}
            onClick={(e) => props.onClick && props.onClick(e)}
            {...props}
        >
            <Flex className={cn("gap-10", vertical)}>
                <Icon name={`${props.icon}`} />
                {props.children && (
                    <span className="button-text full">{props.children}</span>
                )}
            </Flex>
        </button>
    );
};

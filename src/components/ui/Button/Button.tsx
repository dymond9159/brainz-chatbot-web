import React from "react";
import { Icon } from "..";

type ButtonType = "button" | "submit" | "reset" | undefined;

export interface ButtonProps extends React.ComponentProps<"button"> {
    type?: ButtonType;
    icon?: string;
}

export const Button: React.FC<ButtonProps> = (props) => {
    return (
        <button
            className={`button ${props.className}`}
            type={props.type ?? "button"}
            ref={props.ref}
            onClick={(e) => props.onClick && props.onClick(e)}
            {...props}
        >
            <Icon name={`${props.icon}`} />
            {props.children && (
                <span className="button-text">{props.children}</span>
            )}
        </button>
    );
};

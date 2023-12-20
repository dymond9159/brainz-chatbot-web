import React from "react";
import { Icon } from ".";
import { IButtonProps } from "@/types";

export const Button: React.FC<IButtonProps> = (props) => {
    return (
        <button
            type={props.type ?? "button"}
            className={`button ${props.className}`}
        >
            <Icon name={`${props.icon}`} />
            {props.children && (
                <span className="button-text">{props.children}</span>
            )}
        </button>
    );
};

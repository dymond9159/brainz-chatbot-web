"use client";

import { cn } from "@/utils/functions";
import React, { HTMLInputTypeAttribute } from "react";
import { Icon } from "..";

export interface IInputProps extends React.ComponentProps<"input"> {
    type: HTMLInputTypeAttribute;
    placeholder?: string;
    ref?: React.LegacyRef<HTMLInputElement>;
    disabled?: boolean;
    label?: string;
    verified?: boolean;
    visibility?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<IInputProps> = (props) => {
    return (
        <div className={cn("input-area", props.className)}>
            {props.label && <label htmlFor="">{props.label}</label>}
            <input
                // className={props.className}
                // type={props.type}
                // name={props.name}
                // disabled={props.disabled}
                // ref={props.ref}
                // placeholder={props.placeholder}
                // value={props.value}
                // onChange={props.onChange && props.onChange}
                // onKeyUp={props.onKeyUp}
                {...props}
            />
            {props.verified && (
                <Icon
                    name="check"
                    color="green"
                />
            )}
            {props.type === "password" && props.visibility && <></>}
        </div>
    );
};

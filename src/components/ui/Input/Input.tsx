"use client";

import { cn } from "@/utils/functions";
import React, { HTMLInputTypeAttribute, useEffect, useState } from "react";

export interface IInputProps extends React.ComponentProps<"input"> {
    type: HTMLInputTypeAttribute;
    placeholder?: string;
    inputRef?: React.LegacyRef<HTMLInputElement>;
    disabled?: boolean;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<IInputProps> = (props) => {
    return (
        <div className={cn("input-area", props.className)}>
            <input
                className={props.className}
                type={props.type}
                disabled={props.disabled}
                ref={props.inputRef}
                placeholder={props.placeholder}
                autoComplete="off"
                value={props.value}
                onChange={props.onChange && props.onChange}
                onKeyUp={props.onKeyUp}
            />
        </div>
    );
};

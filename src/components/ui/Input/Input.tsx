"use client";

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
    const [state, setState] = useState<{
        value?: string | number;
    }>({
        value: "",
    });

    const _onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        let value = event.target.value;

        setState({ ...state, value: value });
        props.onChange && props.onChange(event);
    };

    useEffect(() => {
        setState({ ...state, value: props.value });
    }, [props.value]);

    return (
        <div className="input-area">
            <input
                className={props.className}
                type={props.type}
                disabled={props.disabled}
                ref={props.inputRef}
                placeholder={props.placeholder}
                autoComplete="off"
                value={state.value}
                onChange={_onChange}
                onKeyUp={props.onKeyUp}
            />
        </div>
    );
};

import React, { useEffect, useState } from "react";

import { IInputProps } from "@/types";

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

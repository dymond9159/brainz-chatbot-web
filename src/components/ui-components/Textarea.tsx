import React, { useEffect, useState } from "react";

import { IInputProps } from "@/types";

export const Textarea: React.FC<IInputProps> = (props) => {
    const [state, setState] = useState<{
        value?: string | number;
    }>({
        value: "",
    });

    const _onChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        let value = event.target.value;

        setState({ ...state, value: value });
        props.onChange && props.onChange(event);
    };

    useEffect(() => {
        setState({ ...state, value: props.value });
    }, [props.value]);

    return (
        <div className="input-area">
            <textarea
                className={props.className}
                disabled={props.disabled}
                ref={props.textareaRef}
                placeholder={props.placeholder}
                rows={props.rows ?? 3}
                autoComplete="off"
                value={state.value}
                onChange={_onChange}
                onKeyUp={props.onKeyUp}
            />
            {props.children}
        </div>
    );
};

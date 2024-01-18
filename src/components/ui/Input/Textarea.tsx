import React, { HTMLInputTypeAttribute, useEffect, useState } from "react";

export interface ITextareaProps extends React.ComponentProps<"textarea"> {
    type: HTMLInputTypeAttribute;
    placeholder?: string;
    textareaRef?: React.LegacyRef<HTMLTextAreaElement>;
    disabled?: boolean;
    rows?: number;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onKeyUp?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

export const Textarea: React.FC<ITextareaProps> = (props) => {
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
                onKeyDown={props.onKeyDown}
                spellCheck={props.spellCheck}
                tabIndex={props.tabIndex}
            />
            {props.children}
        </div>
    );
};

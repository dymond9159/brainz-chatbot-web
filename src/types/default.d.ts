import React from "react";

// Basic types

export type ChildrenProps = {
    children?: React.ReactNode;
    className?: string;
};

// UI-Component types

export type IconType = {
    color?: string;
    size?: string | number;
    //For rest props
    [x: string]: any;
};

// Input
export interface IInputProps extends ChildrenProps {
    type: HTMLInputTypeAttribute;
    placeholder?: string;
    inputRef?: React.LegacyRef<HTMLInputElement>;
    textareaRef?: React.LegacyRef<HTMLTextAreaElement>;
    disabled?: boolean;
    rows?: number;
    value?: string;
    onChange?: (
        event:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>,
    ) => void;
    onKeyUp?: (
        event:
            | React.KeyboardEvent<HTMLInputElement>
            | React.KeyboardEvent<HTMLTextAreaElement>,
    ) => void;
}

// Button
type ButtonType = "button" | "submit" | "reset" | undefined;
type TFlexDirection = "row" | "col";

export interface IButtonProps extends ChildrenProps {
    type?: ButtonType;
    icon?: string;
}

export interface IButtonGroupProps extends ChildrenProps {
    direction?: TFlexDirection;
    gap?: number;
}

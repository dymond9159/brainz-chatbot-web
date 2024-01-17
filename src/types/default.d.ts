import React from "react";

export interface LayoutProps {
    children?: React.ReactNode;

    params?: any;
}

// Basic types

export interface DivProps extends React.ComponentProps<"div"> {}

// UI-Component types

export interface IIconProps {
    name?: string;
    color?: string;
    size?: string | number;
    //For rest props
    [x: string]: any;
}

// Input
export interface IInputProps extends React.ComponentProps<"input"> {
    type: HTMLInputTypeAttribute;
    placeholder?: string;
    inputRef?: React.LegacyRef<HTMLInputElement>;
    disabled?: boolean;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

// Textarea
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

// Button
type ButtonType = "button" | "submit" | "reset" | undefined;
type TFlexDirection = "row" | "col";

export interface IButtonProps extends React.ComponentProps<"button"> {
    type?: ButtonType;
    icon?: string;
    onClick?: (
        event: React.MouseEventHandler<HTMLButtonElement, MouseEvent>,
    ) => void;
}

export interface IButtonGroupProps extends DivProps {
    direction?: TFlexDirection;
    gap?: number;
    groupname?: string;
}

// Program
export type ProgramDataType = {
    numid: number;
    strid: string;
    name: string;
    description: string;
    description1: string;
    src: string;
    suggests: string[];
};

export interface IProgramProps extends IButtonProps {
    program: ProgramDataType;
}

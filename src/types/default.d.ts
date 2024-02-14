import { JSONValue, Message } from "ai";
import { JSONSchema } from "openai/lib/jsonschema.mjs";
import React from "react";
import { RecentProgramType } from ".";

export interface LayoutProps {
    children?: React.ReactNode;
    params?: any;
}

export type IDataProps = {
    type: "answer" | "score";
    result: JSONValue[] | JSONValue;
};

// Basic types

export interface IDivProps extends React.ComponentProps<"div"> {}

export interface ProfileForMetric {
    [key: string]: MetricBasicItemType | string | number | undefined;
    username?: string;
    age?: number;
    locale?: string;
    mood?: MetricBasicItemType;
    ptsd?: MetricBasicItemType;
    anxiety?: MetricBasicItemType;
    depression?: MetricBasicItemType;
    suicidal?: MetricBasicItemType;
}

// UI-Component types

export interface IIconProps {
    name?: string;
    color?: string;
    size?: string | number;
    //For rest props
    [x: string]: any;
}

// UI - color
export interface FlowbiteStateColors {
    info: string;
    failure: string;
    success: string;
    warning: string;
}

export interface FlowbiteColors extends FlowbiteStateColors {
    [key: string]: string;
    blue: string;
    cyan: string;
    dark: string;
    gray: string;
    green: string;
    indigo: string;
    light: string;
    lime: string;
    pink: string;
    purple: string;
    red: string;
    teal: string;
    yellow: string;
}

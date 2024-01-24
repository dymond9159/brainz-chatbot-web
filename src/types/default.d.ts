import { JSONValue, Message } from "ai";
import { JSONSchema } from "openai/lib/jsonschema.mjs";
import React from "react";

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

// UI-Component types

export interface IIconProps {
    name?: string;
    color?: string;
    size?: string | number;
    //For rest props
    [x: string]: any;
}

// Psychometric

export type MetricCharactersType = {
    name?: string;
    value: number;
    maxValue: number;
    title?: string;
    strValue?: string;
    description?: string;
    updatedDate?: string;
};

export type PsychometricScoreType = {
    Mood?: MetricCharactersType;
    PTSD?: MetricCharactersType;
    Anxiety?: MetricCharactersType;
    Depression?: MetricCharactersType;
    Suicidal?: MetricCharactersType;
};

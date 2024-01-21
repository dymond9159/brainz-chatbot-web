import { Message } from "ai";
import React from "react";

export interface LayoutProps {
    children?: React.ReactNode;
    params?: any;
}

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
    value: number;
    maxValue: number;
    strValue?: string;
    description?: string;
};

export type PsychometricScoreType = {
    Mood?: MetricCharactersType;
    PTSD?: MetricCharactersType;
    Anxiety?: MetricCharactersType;
    Depression?: MetricCharactersType;
    Suicidal?: MetricCharactersType;
};

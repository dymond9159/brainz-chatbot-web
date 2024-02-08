import { clsx, type ClassValue } from "clsx";
import moment from "moment";
import { customAlphabet } from "nanoid";
import { INSTRUCTIONS, PROGRAMS, PSYCHOMETRICS } from "./constants";
import { ProgramDataType } from "@/components/widgets";
import { InstructionType, MetricCharactersType } from "@/types";
import _utils from ".";

export function cn(...inputs: ClassValue[]) {
    return clsx(inputs);
}

export const nanoid = (size: number = 16) =>
    customAlphabet(
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
        size,
    ); // 16-character random string

export function formatDate(
    input: string | number | Date,
    locale?: string,
): string {
    if (!input || input === "") return "";
    const date = new Date(input);

    return date.toLocaleDateString(locale, {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

export function compareDate(oldDate?: string, newDate?: string): number {
    const date1 = new Date(oldDate ?? "");
    const date2 = new Date(newDate ?? "");

    if (date1 > date2) {
        return -1; // Date1 is greater thant Date2
    } else if (date1 < date2) {
        return 1; // Date1 is less thant Date2
    } else {
        return 0; // Date1 is same with Date2
    }
}

export const getProgram = (id: string | undefined): ProgramDataType => {
    return (
        (PROGRAMS.filter((item) => item.strid === id)[0] ||
            PSYCHOMETRICS.filter((item) => item.strid === id)[0]) ??
        []
    );
};

export const getMetric = (id: string | undefined): ProgramDataType => {
    return PSYCHOMETRICS.filter((item) => item.strid === id)[0] ?? [];
};

export const findLastIndex = <T>(arr: Array<T>, filter: T) => {
    return arr.findLast((_) => _ === filter);
};

export const actualArray = (arr: number[]) => {
    return arr.filter((value) => value !== -1) ?? [];
};

export const calculateFinalScore = (
    metric: string,
    scoreArray: number[],
): number => {
    // get acutal array, thus value is not -1
    const _arr = actualArray(scoreArray);

    // calculate score
    const _score =
        metric !== "suicide"
            ? _arr?.reduce((sum, v) => sum + v, 0)
            : Math.max(..._arr);

    return _score;
};

// Using an async function to await the import if you're dealing with dynamic imports
export async function loadMarkdown(filename: string) {
    const anxietyIntro = await require("!raw-loader!@/libs/questionnaires" +
        "/anxiety/intro.md");
    return anxietyIntro.default as string; // Accessing the default export
}

// Chat

export const getSystemInstruction = (
    name: InstructionType,
    profile: any = undefined,
) => {
    let instruction = INSTRUCTIONS[name];

    if (name === "trauma" && profile) {
        Object.keys(profile).map((_key) => {
            if (profile[_key]) {
                instruction = instruction?.replaceAll(
                    `[${_key}]`,
                    profile[_key],
                );
            }
        });
        instruction = instruction?.replaceAll(
            `[today]`,
            formatDate(new Date()),
        );
    }
    return instruction;
};

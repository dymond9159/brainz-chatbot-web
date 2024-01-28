import { clsx, type ClassValue } from "clsx";
import { customAlphabet } from "nanoid";
import { PROGRAMS, PSYCHOMETRICS } from "./constants";
import { ProgramDataType } from "@/components/widgets";

export function cn(...inputs: ClassValue[]) {
    return clsx(inputs);
}

export const nanoid = (size: number = 16) =>
    customAlphabet(
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
        size,
    ); // 16-character random string

export function formatDate(input: string | number | Date): string {
    if (!input || input === "") return "";
    const date = new Date(input);
    return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
}

export const getProgram = (id: string | undefined): ProgramDataType => {
    return (
        (PROGRAMS.filter((item) => item.strid === id)[0] ||
            PSYCHOMETRICS.filter((item) => item.strid === id)[0]) ??
        []
    );
};

export const findLastIndex = <T>(arr: Array<T>, filter: T) => {
    return arr.findLast((_) => _ === filter);
};

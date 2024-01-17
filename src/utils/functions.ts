import { ProgramDataType } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { customAlphabet } from "nanoid";
import { PROGRAMS } from "./constants";

export function cn(...inputs: ClassValue[]) {
    return clsx(inputs);
}

export const nanoid = customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    12,
); // 7-character random string

export function formatDate(input: string | number | Date): string {
    const date = new Date(input);
    return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
}

export const getProgram = (id: string): ProgramDataType => {
    return PROGRAMS.filter((item) => item.strid === id)[0];
};

import { AnswerOptionType } from "@/types";

export type AnswersCollectType = {
    [key: string]: AnswerOptionType[] | undefined;
    type1?: AnswerOptionType[];
    type2?: AnswerOptionType[];
    type3?: AnswerOptionType[];
    type4?: AnswerOptionType[];
    type5?: AnswerOptionType[];
    type6?: AnswerOptionType[];
    type7?: AnswerOptionType[];
};

export const ANSWER_COLLECT: AnswersCollectType = {
    type1: [
        {
            value: 0,
            strValue: "Not true",
        },
        {
            value: 1,
            strValue: "Sometimes",
        },
        {
            value: 2,
            strValue: "True",
        },
    ],
    type2: [
        {
            value: 0,
            strValue: "Not at all",
        },
        {
            value: 1,
            strValue: "A little bit",
        },
        {
            value: 2,
            strValue: "Moderately",
        },
        {
            value: 3,
            strValue: "Quite a bit",
        },
        {
            value: 4,
            strValue: "Extremely",
        },
    ],
    type3: [
        {
            value: 0,
            strValue: "Not at all",
        },
        {
            value: 1,
            strValue: "Several days",
        },
        {
            value: 2,
            strValue: "More than half the days",
        },
        {
            value: 3,
            strValue: "Nearly every day",
        },
    ],
    type4: [
        { value: 0, strValue: "No" },
        { value: 1, strValue: "Yes" },
    ],
    type5: [
        { value: 0, strValue: "No" },
        { value: 2, strValue: "Yes" },
    ],
    type6: [
        { value: 0, strValue: "No" },
        { value: 3, strValue: "Yes" },
    ],
    type7: [
        { value: 2, strValue: "No" },
        { value: 3, strValue: "Yes" },
    ],
};

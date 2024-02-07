import { ProgramDataType } from "@/components/widgets";
import { Message } from "ai/react";

type RoleType = "function" | "user" | "assistant" | "data" | "system" | "tool";
type ProgramType =
    | "trauma"
    | "mood"
    | "ptsd"
    | "anxiety"
    | "depression"
    | "suicide";

export type MetricColor = {
    [key: string]: string;
    default: string;
    minimal: string;
    mild: string;
    moderate: string;
    moderate_severe: string;
    severe: string;
    low_risk: string;
    moderate_risk: string;
    high_risk: string;
};

export interface IConversationProps extends IDivProps {
    last: boolean;
    content: Message;
    ref: React.RefObject<HTMLDivElement>;
    onAnswerClick: (answer: string) => void;
}

export interface MessageType {
    id: string;
    createdAt?: string;
    role: RoleType;
    content: string;
    name?: string;
}

export interface IConversation extends MessageType {
    conversationId: string;
    progHistoryId: string;
}

export type RecentProgramType = {
    progStrId?: ProgramType;
    messages?: MessageType[]; // drafts
    lastMessage?: string;
    lastAnswers?: string[];
    lastAt?: string;
};

export type CurrentProgramType = {
    data?: ProgramDataType;
    recentData?: RecentProgramType;
};

// Psychometric

export type MetricCharactersType = {
    score: number;
    maxScore?: number;
    title?: string;
    severity?: string;
    color?: string;
    description?: string;
    updatedDate?: string;
    activeStep: number;
    itemsScore?: number[];
};

export type PsychometricScoreType = {
    [key: string]: MetricCharactersType;
    trauma?: MetricCharactersType;
    mood?: MetricCharactersType;
    ptsd?: MetricCharactersType;
    anxiety?: MetricCharactersType;
    depression?: MetricCharactersType;
    suicide?: MetricCharactersType;
};

export type RecommendedOptionType = {
    options?: string[];
};

export type AnswerOptionType = {
    value: number;
    strValue: string;
};

export type QuestionType = {
    question: string;
    description: string;
    instruction: string;
    answerType: string;
};

export type SeverityType = {
    scoreRange: number[];
    severity: string;
    color: string;
    description: string;
};

export type MetricReportType = {
    title?: string;
    description?: string;
    severities?: SeverityType[];
};

export type QuestionnaireType = {
    name: string;
    maxScore: number;
    introduce: string;
    buttonOptions: string[];
    questionCounts: number;
    answerOptions?: AnswerOptionType[];
    times: number; // min unit
    questions: QuestionType[];
    report: MetricReportType;
};

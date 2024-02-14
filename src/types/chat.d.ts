import { ProgramDataType } from "@/components/widgets";
import { Message } from "ai/react";

type RoleType = "function" | "user" | "assistant" | "data" | "system" | "tool";
type ProgramType = "trauma" | "mood" | "anxiety" | "depression";

type InstructionType = "trauma" | "metric_tools";

export interface ChatType {
    id: string;
    userId: string;
    lastMessage: string;
    lastedAt: string;
    messages: string;
    path: string;
    sharePath?: string;
}

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
    very_unpleasant: string;
    unpleasant: string;
    pleasant: string;
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

// Psychometric

export type MetricBasicItemType = {
    score?: number;
    maxScore?: number;
    severity?: string;
    description?: string;
    updatedDate?: string;
};

export interface MetricCharactersType extends MetricBasicItemType {
    title?: string;
    color?: string;
    activeStep: number;
    itemsScore: number[];
    prevStep: number[];
}

export type PsychometricScoreType = {
    [key: string]: MetricCharactersType;
    mood?: MetricCharactersType;
    trauma?: MetricCharactersType;
    anxiety?: MetricCharactersType;
    depression?: MetricCharactersType;
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
    follow_question?: {
        question: string;
        description: string;
        instruction: string;
        answerType: string;
    };
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

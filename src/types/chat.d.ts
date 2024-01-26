import { Message } from "ai/react";

type RoleType = "function" | "user" | "assistant" | "data" | "system" | "tool";
type ProgramType =
    | "trauma"
    | "mood"
    | "ptsd"
    | "anxiety"
    | "depression"
    | "suicide";

export interface IConversationProps extends IDivProps {
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
    data?: RecentProgramType;
    initMessages: MessageType[];
};

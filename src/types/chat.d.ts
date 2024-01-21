import { Message } from "ai/react";

type RoleType = "function" | "user" | "assistant" | "data" | "system" | "tool";

export interface IConversationProps extends IDivProps {
    content: Message;
    ref: React.RefObject<HTMLDivElement>;
    onAnswerClick: (answer: string) => void;
}

export interface MessageType {
    id: string;
    createAt?: string;
    role: RoleType;
    content: string;
    name?: string;
}

export interface IConversation extends MessageType {
    conversationId: string;
    progHistoryId: string;
}

export type RecentProgramType = {
    progStrId: string;
    messages?: MessageType[]; // drafts
    lastMessage?: string;
    lastAt?: string;
};

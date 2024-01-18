import { Message } from "ai/react";

type RoleType = "user" | "assistant";

export interface IConversationProps extends IDivProps {
    content: Message;
    ref: React.RefObject<HTMLDivElement>;
    onAnswerClick: (answer: string) => void;
}

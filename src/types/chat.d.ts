import { Message } from "ai/react";

type RoleType = "user" | "assistant";

export interface IConversationProps extends DivProps {
    content: Message;
    ref: React.RefObject<HTMLDivElement>;
    onAnswerClick: (answer: string) => void;
}

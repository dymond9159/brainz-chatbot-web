import { Message } from "ai/react";

type RoleType = "user" | "assistant";

export interface IConversationProps extends ChildrenProps {
    content: Message;
    ref: React.RefObject<HTMLDivElement>;
    onAnswerClick: (answer: string) => void;
}

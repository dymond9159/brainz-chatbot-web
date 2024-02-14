"use client";

import { Chat } from "@/components/widgets";
import { getChat } from "@/store/actions";
import { Message } from "ai";

export interface ChatPageProps {
    params: {
        id: string;
    };
}

const ChatPage = (props: ChatPageProps) => {
    const id = props.params.id;

    const chats = getChat(id);
    let initialMessage;
    if (chats) {
        initialMessage = JSON.parse(chats.messages) ?? [];
    }

    return (
        <Chat
            id={id}
            initialMessage={initialMessage as Message[]}     />
    );
};

export default ChatPage;

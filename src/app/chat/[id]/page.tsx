"use client";

import { Chat } from "@/components/widgets";
import { getChat } from "@/store/actions";
import { nanoId } from "@/utils/functions";
import { Message } from "ai";

export interface ChatPageProps {
    params: {
        id: string;
    };
}

const ChatPage = (props: ChatPageProps) => {
    const id = props.params.id;

    const chats = getChat(id);
    let initialMessage: Message[] = [];
    if (chats) {
        initialMessage = JSON.parse(chats.messages)?.messages ?? [];
        if (initialMessage.length === 0)
            initialMessage = [
                {
                    id: nanoId(),
                    role: "assistant",
                    content: "How can Brainz help you today?",
                },
            ];
    }

    return (
        <Chat
            id={id}
            initialMessage={initialMessage}
        />
    );
};

export default ChatPage;

"use client";

import { Chat } from "@/components/widgets";
import { nanoId } from "@/utils/functions";
import { Message } from "ai";

const ChatPage = () => {
    const initialMessages: Message[] = [
        {
            id: nanoId(),
            role: "assistant",
            content: "How can Brainz help you today?",
        },
    ];
    return <Chat initialMessage={initialMessages} />;
};

export default ChatPage;

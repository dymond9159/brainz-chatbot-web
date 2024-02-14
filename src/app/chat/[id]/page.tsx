"use client";

import { Chat } from "@/components/widgets";

export interface ChatPageProps {
    params: {
        id: string;
    };
}

const ChatPage = (props: ChatPageProps) => {
    const id = props.params.id;

    return <Chat id={id} />;
};

export default ChatPage;

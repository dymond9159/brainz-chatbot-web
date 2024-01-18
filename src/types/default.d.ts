import { Message } from "ai";
import React from "react";

export interface LayoutProps {
    children?: React.ReactNode;
    params?: any;
}

// Basic types

export interface IDivProps extends React.ComponentProps<"div"> {}

// UI-Component types

export interface IIconProps {
    name?: string;
    color?: string;
    size?: string | number;
    //For rest props
    [x: string]: any;
}

// Conversations Types

export type MessageType = {
    messageId: string;
    createAt: string;
    role: "user" | "assistant";
    content: string;
};

export interface IConversation extends MessageType {
    conversationId: string;
    progHistoryId: string;
}

export type RecentProgramType = {
    progStrId: string;
    lastMessage: string;
};

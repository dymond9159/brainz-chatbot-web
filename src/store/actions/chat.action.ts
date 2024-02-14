"use client";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// import { type Chat } from '@/lib/types'

import { store } from "..";
import { ChatType, MessageType } from "@/types";
import { setChats } from "../reducers";
import _utils from "@/utils";
import { nanoId } from "@/utils/functions";

export const setChat = async (chatid: string, messages: MessageType[]) => {
    const userId = "";
    const lastMessage = messages[messages.length - 2].content.substring(0, 100);
    const id = chatid ?? nanoId();
    const lastedAt = new Date(Date.now()).toISOString();
    const path = `/chat/${id}`;
    const strMessages = JSON.stringify(messages);
    const payload: ChatType = {
        id,
        userId,
        lastMessage,
        lastedAt,
        path,
        messages: strMessages,
    };
    store.dispatch(setChats(payload));
};

export const getChats = (userId?: string) => {
    try {
        return store.getState().chat.chats ?? [];
    } catch (error) {
        return [];
    }
};

export const getChat = (id: string) => {
    const chats = getChats();
    if (chats) {
        return chats.filter((item) => item.id === id)[0];
    }
};

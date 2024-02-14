"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ChatType } from "@/types";

export type ChatStateProps = {
    chats?: ChatType[];
};

const initialState: ChatStateProps = {
    chats: [],
};

export const chatReducer = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setChats: (state, action: PayloadAction<ChatType>) => {
            const payload = action.payload;
            const _chats = state.chats ?? [];

            if (_chats) {
                // find a element
                const findOne = _chats?.findIndex(
                    (item) => item.id === payload.id,
                );

                // update
                if (findOne === -1) {
                    state.chats = [payload, ..._chats];
                } else {
                    state.chats = [
                        payload,
                        ..._chats.filter((item) => item.id !== payload.id),
                    ];
                }
            }
        },
        deleteChat: (state, action: PayloadAction<string>) => {
            state.chats = state.chats?.filter(
                (item) => item.id !== action.payload,
            );
        },
    },
});

export const { setChats, deleteChat } = chatReducer.actions;

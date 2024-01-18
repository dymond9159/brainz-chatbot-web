import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { MessageType, RecentProgramType } from "@/types";

export type ChatStateProps = {
    recentPrograms: RecentProgramType[];
    initMessages: MessageType[];
};

const initialState: ChatStateProps = {
    recentPrograms: [],
    initMessages: [],
};

export const chatReducer = createSlice({
    name: "chat",
    initialState,
    reducers: {
        updateRecentProgram: (
            state,
            action: PayloadAction<RecentProgramType>,
        ) => {
            const recentProgram = action.payload;

            const findOne = state.recentPrograms.findLastIndex(
                (_) => _.progStrId === recentProgram.progStrId,
            );

            if (findOne === -1) {
                state.recentPrograms = [...state.recentPrograms, recentProgram];
            } else {
                state.recentPrograms = state.recentPrograms.map((_item) => {
                    if (_item.progStrId === recentProgram.progStrId) {
                        return {
                            ..._item,
                            lastMessage: recentProgram.lastMessage,
                        };
                    } else {
                        return _item;
                    }
                });
            }
        },
        updateMessages: (state, action: PayloadAction<MessageType[]>) => {
            state.initMessages = action.payload;
        },
    },
});

export const { updateRecentProgram, updateMessages } = chatReducer.actions;

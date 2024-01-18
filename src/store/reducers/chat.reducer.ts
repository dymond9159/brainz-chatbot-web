import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RecentProgramType } from "@/types";

export type ChatStateProps = {
    recentPrograms: RecentProgramType[];
};

const initialState: ChatStateProps = {
    recentPrograms: [],
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
    },
});

export const { updateRecentProgram } = chatReducer.actions;

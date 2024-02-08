import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CurrentProgramType, RecentProgramType } from "@/types";

export type ChatStateProps = {
    recentPrograms: RecentProgramType[];
    currentProgram?: CurrentProgramType;
};

const initialState: ChatStateProps = {
    recentPrograms: [],
    currentProgram: undefined,
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
                if (recentProgram.messages) {
                    state.recentPrograms = [
                        ...state.recentPrograms,
                        recentProgram,
                    ];
                }
            } else {
                state.recentPrograms = state.recentPrograms.map((_item) => {
                    if (_item.progStrId === recentProgram.progStrId) {
                        return {
                            ..._item,
                            lastMessage:
                                recentProgram.lastMessage ?? _item.lastMessage,
                            lastAnswers: recentProgram.lastAnswers ?? [],
                            lastAt: recentProgram.lastAt ?? _item.lastAt,
                            messages: [
                                ...(_item.messages ?? []),
                                ...(recentProgram.messages ?? []),
                            ],
                        };
                    } else {
                        return _item;
                    }
                });
                // .sort((a, b) => a.lastAt.getTime() - b.lastAt.getTime());
            }
        },
        removeRecentProgram: (state, action: PayloadAction<string>) => {
            const progStrId = action.payload;
            state.recentPrograms = state.recentPrograms.filter(
                (item) => item.progStrId !== progStrId,
            );
            state.currentProgram = undefined;
        },
        setCurrentProgram: (
            state,
            action: PayloadAction<CurrentProgramType>,
        ) => {
            const current = action.payload;
            if (current) {
                state.currentProgram = current;
            }
        },
    },
});

export const { setCurrentProgram, updateRecentProgram, removeRecentProgram } =
    chatReducer.actions;

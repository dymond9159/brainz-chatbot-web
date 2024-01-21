import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { MessageType, PsychometricScoreType, RecentProgramType } from "@/types";

export type ChatStateProps = {
    recentPrograms: RecentProgramType[];
    initMessages: MessageType[];
    scores?: PsychometricScoreType;
};

const initialState: ChatStateProps = {
    recentPrograms: [],
    initMessages: [],
    scores: {
        Mood: {
            value: 0,
            strValue: "Hey, Unlock Your Mood, Embrace Your Score!",
            maxValue: 10,
            description: "Not measured yet",
        },
    },
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
            console.log(recentProgram)
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
                            lastMessage:
                                recentProgram.lastMessage ?? _item.lastMessage,
                            lastAt: recentProgram.lastAt ?? _item.lastAt,
                            messages: recentProgram.messages ?? _item.messages,
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
            state.initMessages = [];
        },
        updateInitMessages: (state, action: PayloadAction<MessageType[]>) => {
            state.initMessages = action.payload;
        },
        /*
         **  Psychometric Scoring
         */
    },
});

export const { updateRecentProgram, updateInitMessages, removeRecentProgram } =
    chatReducer.actions;

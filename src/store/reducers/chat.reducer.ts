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
        removeRecentProgram: (state, action: PayloadAction<string>) => {
            const progStrId = action.payload;
            state.recentPrograms = state.recentPrograms.filter(
                (item) => item.progStrId !== progStrId,
            );
            state.initMessages = [];
        },
        updateMessages: (state, action: PayloadAction<MessageType[]>) => {
            state.initMessages = action.payload;
        },
        /*
         **  Psychometric Scoring
         */
    },
});

export const { updateRecentProgram, updateMessages, removeRecentProgram } =
    chatReducer.actions;

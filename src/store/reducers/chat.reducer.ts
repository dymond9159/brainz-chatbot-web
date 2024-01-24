import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
    MessageType,
    MetricCharactersType,
    PsychometricScoreType,
    RecentProgramType,
} from "@/types";

export type ChatStateProps = {
    recentPrograms: RecentProgramType[];
    initMessages: MessageType[];
    scores: PsychometricScoreType;
};

const initialState: ChatStateProps = {
    recentPrograms: [],
    initMessages: [],
    scores: {
        Mood: {
            value: 0,
            title: "Hey, Unlock Your Mood, Embrace Your Score!",
            maxValue: 10,
            strValue: "Not measured yet",
            description: "",
            updatedDate: "",
        },
        Anxiety: {
            value: 0,
            title: "",
            maxValue: 10,
            strValue: "Not measured yet",
            description: "",
            updatedDate: "",
        },
        Depression: {
            value: 0,
            title: "",
            maxValue: 10,
            strValue: "Not measured yet",
            description: "",
            updatedDate: "",
        },
        PTSD: {
            value: 0,
            title: "",
            maxValue: 10,
            strValue: "Not measured yet",
            description: "",
            updatedDate: "",
        },
        Suicidal: {
            value: 0,
            title: "",
            maxValue: 10,
            strValue: "Not measured yet",
            description: "",
            updatedDate: "",
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
            console.log(recentProgram);
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
        setPsychometricScore: (
            state,
            action: PayloadAction<MetricCharactersType>,
        ) => {
            const score = action.payload;
            score.updatedDate = new Date(Date.now()).toISOString();
            if (score?.name) {
                switch (score?.name?.toLowerCase()) {
                    case "mood":
                        state.scores.Mood = score;
                        break;
                    case "anxiety":
                        state.scores.Anxiety = score;
                        break;
                    case "depression":
                        state.scores.Depression = score;
                        break;
                    case "ptsd":
                        state.scores.PTSD = score;
                        break;
                    case "suicidal":
                        state.scores.Suicidal = score;
                        break;
                    default:
                }
            }
        },
    },
});

export const {
    updateRecentProgram,
    updateInitMessages,
    removeRecentProgram,
    setPsychometricScore,
} = chatReducer.actions;

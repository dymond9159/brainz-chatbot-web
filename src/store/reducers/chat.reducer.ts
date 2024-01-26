import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
    CurrentProgramType,
    MessageType,
    MetricCharactersType,
    PsychometricScoreType,
    RecentProgramType,
} from "@/types";

export type ChatStateProps = {
    recentPrograms: RecentProgramType[];
    scores: PsychometricScoreType;
    currentProgram?: CurrentProgramType;
};

const initialState: ChatStateProps = {
    recentPrograms: [],
    currentProgram: undefined,
    scores: {
        mood: {
            value: 0,
            title: "Hey, Unlock Your Mood, Embrace Your Score!",
            maxValue: 10,
            strValue: "Not measured yet",
            description: "",
            updatedDate: "",
        },
        anxiety: {
            value: 0,
            title: "",
            maxValue: 10,
            strValue: "Not measured yet",
            description: "",
            updatedDate: "",
        },
        depression: {
            value: 0,
            title: "",
            maxValue: 10,
            strValue: "Not measured yet",
            description: "",
            updatedDate: "",
        },
        ptsd: {
            value: 0,
            title: "",
            maxValue: 10,
            strValue: "Not measured yet",
            description: "",
            updatedDate: "",
        },
        suicide: {
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
        /*
         **  Psychometric Scoring
         */
        setPsychometricScore: (
            state,
            action: PayloadAction<MetricCharactersType>,
        ) => {
            const score = action.payload;
            score.updatedDate = new Date(Date.now()).toISOString();
            if (state.currentProgram?.data?.progStrId) {
                switch (score?.name?.toLowerCase()) {
                    case "mood":
                        state.scores.mood = score;
                        break;
                    case "anxiety":
                        state.scores.anxiety = score;
                        break;
                    case "depression":
                        state.scores.depression = score;
                        break;
                    case "ptsd":
                        state.scores.ptsd = score;
                        break;
                    case "suicide":
                        state.scores.suicide = score;
                        break;
                    default:
                }
            }
        },
    },
});

export const {
    setCurrentProgram,
    updateRecentProgram,
    removeRecentProgram,
    setPsychometricScore,
} = chatReducer.actions;

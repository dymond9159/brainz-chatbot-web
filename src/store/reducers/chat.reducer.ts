import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
    CurrentProgramType,
    MetricCharactersType,
    ProgramType,
    PsychometricScoreType,
    RecentProgramType,
} from "@/types";
import { compareDate } from "@/utils/functions";

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
            score: 0,
            title: "Hey, Unlock Your Mood, Embrace Your Score!",
            strValue: "Not measured yet",
            description: "",
            updatedDate: "",
        },
        anxiety: {
            score: 0,
            title: "",
            strValue: "Not measured yet",
            description: "",
            updatedDate: "",
        },
        depression: {
            score: 0,
            title: "",
            strValue: "Not measured yet",
            description: "",
            updatedDate: "",
        },
        ptsd: {
            score: 0,
            title: "",
            strValue: "Not measured yet",
            description: "",
            updatedDate: "",
        },
        suicide: {
            score: 0,
            title: "",
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
            const updatedScore = {
                ...score,
                updatedDate: new Date().toISOString(),
            };

            const psychoName = score.name as ProgramType;
            if (psychoName) {
                // const date1 = new Date(
                //     state.scores[psychoName]?.updatedDate ?? "",
                // );
                // const date2 = new Date(updatedScore.updatedDate);

                // const compResult = compareDate(date1, date2);

                state.scores[psychoName] = updatedScore;
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

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
    MetricCharactersType,
    ProgramType,
    PsychometricScoreType,
} from "@/types";
import { compareDate } from "@/utils/functions";

const MAX_COUNT = 30;
const NOT_METRIC_VALUE = -1;

export type ActiveScoreType = {
    scoreIndex: number;
    score: number;
};

export type MetricStateProps = {
    scores?: PsychometricScoreType;
    activeScore?: number[];
    activeMetric?: string;
    activeStep?: number;
};

const initialState: MetricStateProps = {
    activeMetric: undefined,
    activeScore: new Array(MAX_COUNT).fill(NOT_METRIC_VALUE),
    activeStep: 0,
    scores: {
        mood: {
            score: 0,
            title: "Hey, Unlock Your Mood, Embrace Your Score!",
            severity: "Not measured yet",
            description: "",
            updatedDate: "",
        },
        anxiety: {
            score: 0,
            title: "",
            severity: "Not measured yet",
            description: "",
            updatedDate: "",
        },
        depression: {
            score: 0,
            title: "",
            severity: "Not measured yet",
            description: "",
            updatedDate: "",
        },
        ptsd: {
            score: 0,
            title: "",
            severity: "Not measured yet",
            description: "",
            updatedDate: "",
        },
        suicide: {
            score: 0,
            title: "",
            severity: "Not measured yet",
            description: "",
            updatedDate: "",
        },
    },
};

export const metricReducer = createSlice({
    name: "metric",
    initialState,
    reducers: {
        setActiveMetric: (state, action: PayloadAction<string | undefined>) => {
            state.activeMetric = action.payload;
        },
        setActiveScore: (state, action: PayloadAction<ActiveScoreType>) => {
            const _updatedScore =
                state.activeScore ??
                new Array(MAX_COUNT).fill(NOT_METRIC_VALUE);

            if (_updatedScore) {
                _updatedScore[action.payload.scoreIndex] = action.payload.score;
                state.activeScore = _updatedScore;
            }
        },
        setActiveStep: (state, action: PayloadAction<number>) => {
            state.activeStep = action.payload;
        },
        clearActiveScore: (state) => {
            state.activeScore = undefined;
        },
        clearMetricInfo: (state) => {
            state.activeScore = undefined;
            state.activeStep = 0;
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
            const metricName = state.activeMetric;
            if (metricName && state.scores)
                state.scores[metricName] = updatedScore;
        },
    },
});

export const {
    setActiveMetric,
    setActiveScore,
    setActiveStep,
    clearActiveScore,
    clearMetricInfo,
    setPsychometricScore,
} = metricReducer.actions;

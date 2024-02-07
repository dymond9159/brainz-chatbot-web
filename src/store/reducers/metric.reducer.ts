import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { MetricCharactersType, PsychometricScoreType } from "@/types";

const MAX_COUNT = 30;
const NOT_METRIC_VALUE = -1;

export type ActiveScoreType = {
    scoreIndex: number;
    score: number;
    activeStep: number;
};

export type MetricStateProps = {
    scores: PsychometricScoreType;
    activeMetric?: string;
};

const initialState: MetricStateProps = {
    activeMetric: undefined,
    scores: {
        mood: {
            score: 0,
            title: "Hey, Unlock Your Mood, Embrace Your Score!",
            severity: "Not measured yet",
            description: "",
            updatedDate: "",
            activeStep: 0,
            itemsScore: new Array(MAX_COUNT).fill(NOT_METRIC_VALUE),
        },
        anxiety: {
            score: 0,
            title: "",
            severity: "Not measured yet",
            description: "",
            updatedDate: "",
            activeStep: 0,
            itemsScore: new Array(MAX_COUNT).fill(NOT_METRIC_VALUE),
        },
        depression: {
            score: 0,
            title: "",
            severity: "Not measured yet",
            description: "",
            updatedDate: "",
            activeStep: 0,
            itemsScore: new Array(MAX_COUNT).fill(NOT_METRIC_VALUE),
        },
        ptsd: {
            score: 0,
            title: "",
            severity: "Not measured yet",
            description: "",
            updatedDate: "",
            activeStep: 0,
            itemsScore: new Array(MAX_COUNT).fill(NOT_METRIC_VALUE),
        },
        suicide: {
            score: 0,
            title: "",
            severity: "Not measured yet",
            description: "",
            updatedDate: "",
            activeStep: 0,
            itemsScore: new Array(MAX_COUNT).fill(NOT_METRIC_VALUE),
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
            if (!state.activeMetric || !state.scores) return;

            const _updatedScore =
                state.scores[state.activeMetric].itemsScore ??
                new Array(MAX_COUNT).fill(NOT_METRIC_VALUE);

            if (_updatedScore) {
                _updatedScore[action.payload.scoreIndex] = action.payload.score;
                state.scores[state.activeMetric].itemsScore = _updatedScore;
                state.scores[state.activeMetric].activeStep =
                    action.payload.activeStep;
            }
        },
        clearMetricInfo: (state) => {
            if (!state.activeMetric || !state.scores) return;

            state.scores[state.activeMetric].itemsScore = undefined;
            state.scores[state.activeMetric].activeStep = 0;
        },
        setPsychometricScore: (
            state,
            action: PayloadAction<MetricCharactersType>,
        ) => {
            if (!state.activeMetric || !state.scores) return;

            const score = action.payload;
            const updatedScore = {
                ...score,
                updatedDate: new Date().toISOString(),
            };
            const metricName = state.activeMetric;
            state.scores[metricName] = updatedScore;
        },
    },
});

export const {
    setActiveMetric,
    setActiveScore,
    clearMetricInfo,
    setPsychometricScore,
} = metricReducer.actions;

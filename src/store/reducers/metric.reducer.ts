import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { MetricCharactersType, PsychometricScoreType } from "@/types";

const MAX_COUNT = 30;
const NOT_METRIC_VALUE = -1;

export type ActiveScoreType = {
    scoreIndex: number;
    score: number;
    activeStep: number;
    prevStep: number;
};

export type MetricStateProps = {
    scores: PsychometricScoreType;
    activeMetric?: string;
};

const initialState: MetricStateProps = {
    activeMetric: undefined,
    scores: {
        mood: {
            score: undefined,
            maxScore: 10,
            title: "Hey, Unlock Your Mood, Embrace Your Score!",
            severity: "Not measured yet",
            description: "",
            updatedDate: "",
            activeStep: 0,
            prevStep: new Array(MAX_COUNT).fill(0),
            itemsScore: new Array(MAX_COUNT).fill(NOT_METRIC_VALUE),
        },
        anxiety: {
            score: undefined,
            maxScore: 21,
            title: "",
            severity: "Not measured yet",
            description: "",
            updatedDate: "",
            activeStep: 0,
            prevStep: new Array(MAX_COUNT).fill(0),
            itemsScore: new Array(MAX_COUNT).fill(NOT_METRIC_VALUE),
        },
        depression: {
            score: undefined,
            maxScore: 27,
            title: "",
            severity: "Not measured yet",
            description: "",
            updatedDate: "",
            activeStep: 0,
            prevStep: new Array(MAX_COUNT).fill(0),
            itemsScore: new Array(MAX_COUNT).fill(NOT_METRIC_VALUE),
        },
        trauma: {
            score: undefined,
            maxScore: 80,
            title: "",
            severity: "Not measured yet",
            description: "",
            updatedDate: "",
            activeStep: 0,
            prevStep: new Array(MAX_COUNT).fill(0),
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
                state.scores[state.activeMetric]?.itemsScore ??
                new Array(MAX_COUNT).fill(NOT_METRIC_VALUE);

            if (_updatedScore && state.scores[state.activeMetric]) {
                _updatedScore[action.payload.scoreIndex] = action.payload.score;
                state.scores[state.activeMetric].itemsScore = _updatedScore;
                state.scores[state.activeMetric].activeStep =
                    action.payload.activeStep;

                state.scores[state.activeMetric].prevStep[
                    action.payload.activeStep
                ] = action.payload.prevStep;
            }
        },
        clearMetricInfo: (state) => {
            if (!state.activeMetric || !state.scores) return;

            if (!state.scores[state.activeMetric]) {
                state.scores[state.activeMetric] =
                    initialState.scores[state.activeMetric];
            }

            state.scores[state.activeMetric].itemsScore = new Array(
                MAX_COUNT,
            ).fill(NOT_METRIC_VALUE);
            state.scores[state.activeMetric].activeStep = 0;
            state.scores[state.activeMetric].prevStep = new Array(
                MAX_COUNT,
            ).fill(NOT_METRIC_VALUE);
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
            state.scores[state.activeMetric] = updatedScore;
        },
    },
});

export const {
    setActiveMetric,
    setActiveScore,
    clearMetricInfo,
    setPsychometricScore,
} = metricReducer.actions;

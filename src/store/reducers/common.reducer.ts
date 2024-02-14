import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CommonProps {
    sidebarStatus: string;
    metricCallBackURL: string | null;
}

const initialState: CommonProps = {
    sidebarStatus: "open",
    metricCallBackURL: null,
};

export const commonReducer = createSlice({
    name: "common",
    initialState,
    reducers: {
        setSidebarStatus: (state, action: PayloadAction<string>) => {
            state.sidebarStatus = action.payload;
        },
        setMetricCallBackUrl: (state, action: PayloadAction<string | null>) => {
            state.metricCallBackURL = action.payload;
        },
    },
});

export const { setSidebarStatus, setMetricCallBackUrl } = commonReducer.actions;

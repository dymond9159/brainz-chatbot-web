import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    sidebarStatus: "open",
};

export const commonReducer = createSlice({
    name: "common",
    initialState,
    reducers: {
        setSidebarStatus: (state, action: PayloadAction<string>) => {
            state.sidebarStatus = action.payload;
        },
    },
});

export const { setSidebarStatus } = commonReducer.actions;

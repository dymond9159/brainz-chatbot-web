"use client";

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { chatReducer, commonReducer, metricReducer } from "./reducers";

// Combine your reducers
const rootReducers = combineReducers({
    chat: chatReducer.reducer,
    common: commonReducer.reducer,
    metric: metricReducer.reducer,
});

const isClient = typeof window !== "undefined";

// Dynamically load storage only in client-side
const persistConfig = {
    key: "brainz_chat",
    version: 1,
    storage: storage ?? createWebStorage("local"),
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

// Create the Redux store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }).concat(),
    devTools: process.env.NODE_ENV !== "production",
});

// Initialize the persistor
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducers>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
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
import { chatReducer } from "./reducers";

// Combine your reducers
const rootReducers = combineReducers({
    chat: chatReducer.reducer,
});
const persistConfig = {
    key: "brainz_chat",
    version: 1,
    storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducers);

// Create the Redux store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    // FLUSH,
                    // REHYDRATE,
                    // PAUSE,
                    // PERSIST,
                    // PURGE,
                    // REGISTER,
                ],
            },
        }).concat(),
    devTools: process.env.NODE_ENV !== "production",
});

// Initialize the persistor
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducers>;

export const useAppDispatch = (): any => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import lastMessageReducer from "./lastMessageSlice";

export const store = configureStore({
  reducer: {
    lastMessage: lastMessageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

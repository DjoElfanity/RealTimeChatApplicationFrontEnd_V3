// src/redux/store.js ou store.ts
import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "../redux/actions/messageReducer";

export const store = configureStore({
  reducer: {
    message: messageReducer,
  },
});

// Définissez le type pour l'état global
export type RootState = ReturnType<typeof store.getState>;

// Vous pouvez également définir le type pour AppDispatch si nécessaire
export type AppDispatch = typeof store.dispatch;

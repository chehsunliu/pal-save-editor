import { configureStore } from "@reduxjs/toolkit";
import gameProgressReducer from "app/gameProgress/slice";

export const store = configureStore({
  reducer: {
    game: gameProgressReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

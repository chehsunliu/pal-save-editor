import { configureStore } from "@reduxjs/toolkit";
import charactersReducer from "app/feature/characters/charactersSlice";
import gameProgressReducer from "app/feature/gameProgress/gameProgressSlice";
import rawReducer from "app/feature/header/rawSlice";

export const store = configureStore({
  reducer: {
    characters: charactersReducer,
    game: gameProgressReducer,
    raw: rawReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

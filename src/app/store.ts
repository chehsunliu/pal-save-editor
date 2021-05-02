import { configureStore } from "@reduxjs/toolkit";
import charactersReducer from "app/feature/characters/charactersSlice";

import gameProgressReducer from "app/feature/gameProgress/gameProgressSlice";

export const store = configureStore({
  reducer: {
    characters: charactersReducer,
    game: gameProgressReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

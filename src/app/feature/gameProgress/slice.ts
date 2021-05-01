import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameProgress } from "app/util/saveEditor";

const initialState: GameProgress = {
  saveCount: 0,
  memberCount: 0,
  money: 0,
};

const gameProgressSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    replaced: (state, action: PayloadAction<{ state: GameProgress }>) => {
      return action.payload.state;
    },
    saveCountUpdated: (state, action: PayloadAction<{ count: number }>) => {
      state.saveCount = action.payload.count;
    },
    memberCountUpdated: (state, action: PayloadAction<{ count: number }>) => {
      state.memberCount = action.payload.count;
    },
    moneyUpdated: (state, action: PayloadAction<{ money: number }>) => {
      state.money = action.payload.money;
    },
  },
});

export const { replaced, saveCountUpdated, memberCountUpdated, moneyUpdated } = gameProgressSlice.actions;
export default gameProgressSlice.reducer;

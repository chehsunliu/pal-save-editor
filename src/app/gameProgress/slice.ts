import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GameProgressState {
  saveCount: number;
  memberCount: number;
  money: number;
}

const initialState: GameProgressState = {
  saveCount: 0,
  memberCount: 0,
  money: 0,
};

const gameProgressSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    replaced: (state, action: PayloadAction<{ state: GameProgressState }>) => {
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

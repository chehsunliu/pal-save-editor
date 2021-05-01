import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GameProgressState {
  saveCount: number;
  playerCount: number;
  money: number;
}

const initialState: GameProgressState = {
  saveCount: 0,
  playerCount: 0,
  money: 0,
};

const gameProgressSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    saveCountUpdated: (state, action: PayloadAction<{ count: number }>) => {
      state.saveCount = action.payload.count;
    },
    playerCountUpdated: (state, action: PayloadAction<{ count: number }>) => {
      state.playerCount = action.payload.count;
    },
    moneyUpdated: (state, action: PayloadAction<{ money: number }>) => {
      state.money = action.payload.money;
    },
  },
});

export const { saveCountUpdated, playerCountUpdated, moneyUpdated } = gameProgressSlice.actions;
export default gameProgressSlice.reducer;

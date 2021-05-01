import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GameState {
  saveCount: number;
  playerCount: number;
  money: number;
}

const initialState: GameState = {
  saveCount: 0,
  playerCount: 0,
  money: 0,
};

const gameSlice = createSlice({
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

export const { saveCountUpdated, playerCountUpdated, moneyUpdated } = gameSlice.actions;
export default gameSlice.reducer;

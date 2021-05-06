import { Inventory } from "app/util/editor";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Inventory = {};

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    replaced: (state, action: PayloadAction<{ state: Inventory }>) => {
      return action.payload.state;
    },
    itemRemoved: (state, action: PayloadAction<{ id: number }>) => {
      delete state[action.payload.id];
    },
    itemCountChanged: (state, action: PayloadAction<{ id: number; count: number }>) => {
      state[action.payload.id].count = action.payload.count;
    },
  },
});

export const { replaced, itemRemoved, itemCountChanged } = inventorySlice.actions;
export default inventorySlice.reducer;

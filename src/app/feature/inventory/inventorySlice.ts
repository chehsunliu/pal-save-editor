import { Inventory } from "app/util/editor";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Inventory = [];

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    replaced: (state, action: PayloadAction<{ state: Inventory }>) => {
      return action.payload.state;
    },
  },
});

export const { replaced } = inventorySlice.actions;
export default inventorySlice.reducer;

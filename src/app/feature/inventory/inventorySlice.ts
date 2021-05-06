import { createAllInventoryItems, Inventory } from "app/util/editor";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = createAllInventoryItems();

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    replaced: (state, action: PayloadAction<{ state: Inventory }>) => {
      return action.payload.state;
    },
    itemCountChanged: (state, action: PayloadAction<{ id: number; count: number }>) => {
      state[action.payload.id].count = action.payload.count;
      if (action.payload.count > 0) {
        state[action.payload.id].visible = true;
      }
    },
    itemVisibilityToggled: (state, action: PayloadAction<{ id: number }>) => {
      state[action.payload.id].visible = !state[action.payload.id].visible;
      if (!state[action.payload.id].visible) {
        state[action.payload.id].count = 0;
      }
    },
  },
});

export const { replaced, itemCountChanged, itemVisibilityToggled } = inventorySlice.actions;
export default inventorySlice.reducer;

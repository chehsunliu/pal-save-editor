import { Inventory, Item } from "app/util/editor";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface VisibleItem extends Item {
  visible: boolean;
}

type AllInventory = { [id: number]: VisibleItem };

//61-294
const initialState: AllInventory = Object.fromEntries(
  Array(294 - 61 + 1)
    .fill(0)
    .map((_, index) => [
      index + 61,
      {
        count: 0,
        used: 0,
        visible: false,
      },
    ])
);

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    replaced: (state, action: PayloadAction<{ state: Inventory }>) => {
      const s0: AllInventory = Object.assign({}, initialState);
      Object.entries(action.payload.state).forEach((value) => {
        const [id, item] = value;
        s0[(id as unknown) as number] = { ...item, visible: true };
      });
      return s0;
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

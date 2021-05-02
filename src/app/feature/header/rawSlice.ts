import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RawState {
  filename: string | null;
}

const initialState: RawState = {
  filename: null,
};

const rawSlice = createSlice({
  name: "raw",
  initialState,
  reducers: {
    filenameUpdated: (state, action: PayloadAction<{ filename: string }>) => {
      state.filename = action.payload.filename;
    },
  },
});

export const { filenameUpdated } = rawSlice.actions;
export default rawSlice.reducer;

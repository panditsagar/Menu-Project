import { createSlice } from "@reduxjs/toolkit";

const itemSlice = createSlice({
  name: "items",
  initialState: {
    item: [],
  },
  reducers: {
    getItem: (state, action) => {
      state.item = action.payload;
    },
  },
});

export const { getItem } = itemSlice.actions;
export default itemSlice.reducer;

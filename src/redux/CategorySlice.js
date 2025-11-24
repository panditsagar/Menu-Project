import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    category: [],
  },
  reducers: {
    getCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

export const { getCategory } = categorySlice.actions;
export default categorySlice.reducer;

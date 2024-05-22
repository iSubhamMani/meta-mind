import { createSlice } from "@reduxjs/toolkit";

const featuredSlice = createSlice({
  name: "featured",
  initialState: {
    hasMore: true,
    page: 1,
  },
  reducers: {
    setHasMore: (state, action) => {
      state.hasMore = action.payload;
    },
    updatePage: (state) => {
      state.page = state.page + 1;
    },
  },
});

export const { setHasMore, updatePage } = featuredSlice.actions;
export default featuredSlice.reducer;

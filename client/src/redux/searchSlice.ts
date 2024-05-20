import Post from "@/interfaces/Post";
import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchQuery: "",
    cachedResults: {} as Record<string, Post[]>,
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    cacheResults: (state, action) => {
      if (!state.cachedResults[state.searchQuery]) {
        state.cachedResults[state.searchQuery] = [];
      }
      state.cachedResults[state.searchQuery].push(...action.payload);
    },
  },
});

export const { setSearchQuery, cacheResults } = searchSlice.actions;
export default searchSlice.reducer;

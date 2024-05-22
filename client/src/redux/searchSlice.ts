import Post from "@/interfaces/Post";
import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchQuery: "",
    cachedResults: {} as Record<
      string,
      { data: Post[]; page: number; hasMore: boolean }
    >,
    searchResults: [] as Post[],
    hasMore: false,
    page: 1,
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    cacheResults: (state, action) => {
      const { posts, hasMore, page } = action.payload;
      if (!state.cachedResults[state.searchQuery]) {
        state.cachedResults[state.searchQuery] = {
          data: [],
          hasMore: false,
          page: 1,
        };
      }
      state.cachedResults[state.searchQuery].data.push(...posts);
      state.cachedResults[state.searchQuery].hasMore = hasMore;
      state.cachedResults[state.searchQuery].page = page;
    },
    updatePage: (state) => {
      state.page = state.page + 1;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setHasMore: (state, action) => {
      state.hasMore = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    addSearchResults: (state, action) => {
      state.searchResults.push(...action.payload);
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
  },
});

export const {
  setSearchQuery,
  cacheResults,
  addSearchResults,
  updatePage,
  setHasMore,
  setSearchResults,
  setPage,
  clearSearchResults,
} = searchSlice.actions;
export default searchSlice.reducer;

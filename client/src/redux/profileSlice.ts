import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    userPosts: [],
    bookMarkedPosts: [],
    hasMoreUserPosts: true,
    hasMoreBookMarkedPosts: true,
    userPostsPage: 1,
    bookmarkedPostsPage: 1,
    refetch: false,
  },
  reducers: {
    addUserPosts: (state, action: { payload: [] }) => {
      state.userPosts.push(...action.payload);
    },
    removeUserPosts: (state) => {
      state.userPosts = [];
    },
    addBookMarkedPosts: (state, action) => {
      state.bookMarkedPosts = action.payload;
    },
    removeBookMarkedPosts: (state) => {
      state.bookMarkedPosts = [];
    },
    setRefetch(state, action) {
      state.refetch = action.payload;
    },
    setUserPostsHasMore: (state, action) => {
      state.hasMoreUserPosts = action.payload;
    },
    updateUserPostsPage: (state) => {
      state.userPostsPage = state.userPostsPage + 1;
    },
    setBookMarkedHasMore: (state, action) => {
      state.hasMoreBookMarkedPosts = action.payload;
    },
    updateBookMarkedPage: (state) => {
      state.bookmarkedPostsPage = state.bookmarkedPostsPage + 1;
    },
    setBookMarkedPage: (state, action) => {
      state.bookmarkedPostsPage = action.payload;
    },
  },
});

export const {
  addUserPosts,
  removeUserPosts,
  addBookMarkedPosts,
  removeBookMarkedPosts,
  setUserPostsHasMore,
  updateUserPostsPage,
  setBookMarkedHasMore,
  updateBookMarkedPage,
  setBookMarkedPage,
  setRefetch,
} = profileSlice.actions;
export default profileSlice.reducer;

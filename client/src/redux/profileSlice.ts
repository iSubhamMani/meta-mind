import Post from "@/interfaces/Post";
import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    userPosts: [],
    bookMarkedPosts: {} as Record<string, Post>,
    hasMoreUserPosts: true,
    hasMoreBookMarkedPosts: true,
    userPostsPage: 1,
    bookmarkedPostsPage: 1,
    userPostsRefetch: false,
    bookmarkRefetch: false,
  },
  reducers: {
    addUserPosts: (state, action: { payload: [] }) => {
      state.userPosts.push(...action.payload);
    },
    removeUserPosts: (state) => {
      state.userPosts = [];
    },
    addBookMarkedPost: (state, action) => {
      const { post } = action.payload;
      if (!state.bookMarkedPosts[post._id]) {
        state.bookMarkedPosts[post._id] = post;
      }
    },
    removeBookMarkedPost: (state, action) => {
      const { post } = action.payload;
      delete state.bookMarkedPosts[post._id];
    },
    setUserPostsRefetch(state, action) {
      state.userPostsRefetch = action.payload;
    },
    setBookmarkRefetch(state, action) {
      state.bookmarkRefetch = action.payload;
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
    setUserPostsPage: (state, action) => {
      state.userPostsPage = action.payload;
    },
  },
});

export const {
  addUserPosts,
  removeUserPosts,
  addBookMarkedPost,
  removeBookMarkedPost,
  setUserPostsHasMore,
  updateUserPostsPage,
  setBookMarkedHasMore,
  updateBookMarkedPage,
  setBookMarkedPage,
  setBookmarkRefetch,
  setUserPostsRefetch,
  setUserPostsPage,
} = profileSlice.actions;
export default profileSlice.reducer;

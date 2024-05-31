import Post from "@/interfaces/Post";
import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    userPosts: {} as Record<string, Post>,
    bookMarkedPosts: {} as Record<string, Post>,
    hasMoreUserPosts: true,
    hasMoreBookMarkedPosts: true,
    userPostsPage: 1,
    bookmarkedPostsPage: 1,
    userPostsRefetch: false,
    bookmarkRefetch: false,
  },
  reducers: {
    addUserPosts: (state, action) => {
      const { post } = action.payload;
      if (!state.userPosts[post._id]) {
        state.userPosts[post._id] = post;
      }
    },
    removeUserPosts: (state) => {
      state.userPosts = {};
    },
    removeUserPost: (state, action) => {
      const { post } = action.payload;
      delete state.userPosts[post._id];
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
  removeUserPost,
} = profileSlice.actions;
export default profileSlice.reducer;

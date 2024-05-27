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
    refetch: false,
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
  addBookMarkedPost,
  removeBookMarkedPost,
  setUserPostsHasMore,
  updateUserPostsPage,
  setBookMarkedHasMore,
  updateBookMarkedPage,
  setBookMarkedPage,
  setRefetch,
} = profileSlice.actions;
export default profileSlice.reducer;

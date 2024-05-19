import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    featuredPosts: [],
    whatsNewPosts: [],
    refetch: false,
  },
  reducers: {
    addFeaturedPosts: (state, action) => {
      state.featuredPosts = action.payload;
    },
    removeFeaturedPosts: (state) => {
      state.featuredPosts = [];
    },
    addWhatsNewPosts: (state, action) => {
      state.whatsNewPosts = action.payload;
    },
    removeWhatsNewPosts: (state) => {
      state.whatsNewPosts = [];
    },
    setRefetch(state, action) {
      state.refetch = action.payload;
    },
  },
});

export const {
  addFeaturedPosts,
  removeFeaturedPosts,
  addWhatsNewPosts,
  removeWhatsNewPosts,
  setRefetch,
} = postSlice.actions;
export default postSlice.reducer;

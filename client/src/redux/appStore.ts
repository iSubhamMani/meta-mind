import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import postSlice from "./postSlice";
import searchSlice from "./searchSlice";
import featuredSlice from "./featuredSlice";

const appStore = configureStore({
  reducer: {
    user: userSlice,
    post: postSlice,
    search: searchSlice,
    featured: featuredSlice,
  },
});

export default appStore;

import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import postSlice from "./postSlice";
import searchSlice from "./searchSlice";
import featuredSlice from "./featuredSlice";
import profileSlice from "./profileSlice";

const appStore = configureStore({
  reducer: {
    user: userSlice,
    post: postSlice,
    search: searchSlice,
    featured: featuredSlice,
    profile: profileSlice,
  },
});

export default appStore;

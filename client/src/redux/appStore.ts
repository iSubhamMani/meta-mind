import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import postSlice from "./postSlice";
import searchSlice from "./searchSlice";

const appStore = configureStore({
  reducer: {
    user: userSlice,
    post: postSlice,
    search: searchSlice,
  },
});

export default appStore;

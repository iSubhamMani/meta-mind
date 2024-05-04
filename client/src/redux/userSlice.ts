import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    addUserToState: (state, action) => {
      state.user = action.payload;
    },
    removeUserFromState: (state) => {
      state.user = null;
    },
  },
});

export const { addUserToState, removeUserFromState } = userSlice.actions;
export default userSlice.reducer;

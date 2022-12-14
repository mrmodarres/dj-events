import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: "",
  user: null,
  register: false,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    getUser: (state, action) => {
      state.user = action.payload.user;
    },
    removeUser: (state) => {
      state.user = null;
    },
  },
});

export const { getUser, removeUser } = authSlice.actions;

export default authSlice.reducer;

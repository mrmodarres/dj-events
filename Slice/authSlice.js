import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: "",
  user: false,
  register: false,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    getUser: (state) => {
      state.user = true;
    },
    removeUser: (state) => {
      state.user = false;
    },
  },
});

export const { getUser, removeUser } = authSlice.actions;

export default authSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";

import authSlice from "@/Slice/authSlice";
export const store = configureStore({
  reducer: {
    authSlice,
  },
});
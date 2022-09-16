import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./authSlice";
import movieSlice from "./movieSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    movies: movieSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

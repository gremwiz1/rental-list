import { configureStore } from "@reduxjs/toolkit";
import rentalReducer from "./slices/rentalSlice";

export const store = configureStore({
  reducer: {
    rentals: rentalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

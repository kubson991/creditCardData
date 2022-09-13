import { configureStore } from "@reduxjs/toolkit";
import { popupActions } from "./popups.js";

export const store = configureStore({
  reducer: {
    popups: popupActions.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export * from "./popups";

export default store;

import { createSlice } from "@reduxjs/toolkit";

export const popupActions = createSlice({
  name: "popupActions",
  initialState: {
    errorInesperado: false,
  },
  reducers: {
    onError: (state) => {
      state.errorInesperado = true;
    },
    reset: (state) => {
      state.errorInesperado = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { onError, reset } = popupActions.actions;

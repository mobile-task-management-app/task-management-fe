import { createSlice } from "@reduxjs/toolkit";

type AuthState = {
  isFirstLaunch: boolean;
  isAuthed: boolean;
};

const initialState: AuthState = {
  isFirstLaunch: true,
  isAuthed: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    finishOnboarding: (state) => {
      state.isFirstLaunch = false;
    },
    signIn: (state) => {
      state.isAuthed = true;
    },
    signOut: (state) => {
      state.isAuthed = false;
    },
  },
});

export const { finishOnboarding, signIn, signOut } = authSlice.actions;
export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

type AuthState = {
  isFirstLaunch: boolean;
  isAuthed: boolean;
  isEmailVerified: boolean;
};

const initialState: AuthState = {
  isFirstLaunch: true,
  isAuthed: false,
  isEmailVerified: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    verifyEmail: (state) => {
      state.isEmailVerified = true;
    },
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

export const { verifyEmail, finishOnboarding, signIn, signOut } = authSlice.actions;
export default authSlice.reducer;

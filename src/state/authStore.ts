import { create } from "zustand";

type AuthState = {
  isFirstLaunch: boolean;
  isAuthed: boolean;
  finishOnboarding: () => void;
  signIn: () => void;
  signOut: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isFirstLaunch: true,
  isAuthed: false,
  finishOnboarding: () => set({ isFirstLaunch: false }),
  signIn: () => set({ isAuthed: true }),
  signOut: () => set({ isAuthed: false }),
}));

import { createSlice } from "@reduxjs/toolkit";

type UIState = {
  isCreateModalOpen: boolean;
};

const initialState: UIState = {
  isCreateModalOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openCreateModal: (state) => {
      state.isCreateModalOpen = true;
    },
    closeCreateModal: (state) => {
      state.isCreateModalOpen = false;
    },
  },
});

export const { openCreateModal, closeCreateModal } = uiSlice.actions;
export default uiSlice.reducer;

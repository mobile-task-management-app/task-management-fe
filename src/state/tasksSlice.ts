import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProjectTask } from "../types/models";

type TasksState = {
  tasks: ProjectTask[];
};

const initialState: TasksState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<ProjectTask>) => {
      state.tasks.unshift(action.payload);
    },
    updateTask: (state, action: PayloadAction<ProjectTask>) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index >= 0) {
        state.tasks[index] = action.payload;
      }
    },
  },
});

export const { addTask, updateTask } = tasksSlice.actions;
export default tasksSlice.reducer;

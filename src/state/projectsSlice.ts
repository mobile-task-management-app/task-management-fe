import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { mockProjects } from "../data/mock";
import { Project } from "../types/models";

type ProjectsState = {
  projects: Project[];
};

const initialState: ProjectsState = {
  projects: mockProjects,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.unshift(action.payload);
    },
  },
});

export const { addProject } = projectsSlice.actions;
export default projectsSlice.reducer;

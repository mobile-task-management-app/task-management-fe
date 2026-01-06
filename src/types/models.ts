export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
};

export type Task = {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  color: string;
};

export type ProjectStatus = "Not Yet" | "In Progress" | "Done";

export type Project = {
  id: number;
  title: string;
  tasksCount: number;
  progress: number;
  status: ProjectStatus;
  startDate?: string;
  endDate?: string;
  accentColor: string;
};

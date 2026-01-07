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

export type ProjectStatus = "NOT_YET" | "IN_PROGRESS" | "DONE";

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE" | "CANCELLED";
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

export type ProjectTask = {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  attachments: string[];
  createdAt: string;
};

export type Project = {
  id: number;
  title: string;
  description?: string;
  tasksCount: number;
  progress: number;
  status: ProjectStatus;
  startDate?: string;
  endDate?: string;
  accentColor: string;
};

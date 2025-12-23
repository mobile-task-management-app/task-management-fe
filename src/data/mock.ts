import { Project, Task, User } from "../types/models";
import { colors } from "../theme/colors";

export const mockUser: User = {
  id: "user-1",
  name: "Tonald Drump",
  email: "tonald.drump@gmail.com",
};

export const mockProjects: Project[] = [
  {
    id: "project-1",
    title: "Office Project",
    tasksCount: 23,
    progress: 0.7,
    status: "In Progress",
    startDate: "05/05/2025",
    endDate: "10/10/2025",
    accentColor: "#F6A6C9",
  },
  {
    id: "project-2",
    title: "Personal Project",
    tasksCount: 30,
    progress: 0.52,
    status: "In Progress",
    startDate: "05/05/2025",
    endDate: "10/12/2025",
    accentColor: "#B4A6F6",
  },
  {
    id: "project-3",
    title: "Daily Study",
    tasksCount: 30,
    progress: 0.87,
    status: "Overdue",
    startDate: "05/05/2025",
    endDate: "31/12/2025",
    accentColor: "#FFB169",
  },
  {
    id: "project-4",
    title: "Daily Study",
    tasksCount: 3,
    progress: 0.87,
    status: "Done",
    startDate: "05/05/2025",
    endDate: "11/11/2025",
    accentColor: "#FFD166",
  },
];

export const mockTasks: Task[] = [
  {
    id: "task-1",
    title: "Wireframe elements",
    startTime: "10am",
    endTime: "11am",
    color: colors.info,
  },
  {
    id: "task-2",
    title: "Mobile app design",
    startTime: "11:40am",
    endTime: "12:40pm",
    color: "#8BC34A",
  },
  {
    id: "task-3",
    title: "Design Team",
    startTime: "01:20pm",
    endTime: "02:20pm",
    color: "#F59E0B",
  },
];

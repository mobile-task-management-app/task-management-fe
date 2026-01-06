import { projectTaskApi } from "@/api/client";
import { useQuery } from "@tanstack/react-query";
import {
  ProjectTaskControllerSearchProjectTasksPriorityEnum,
  ProjectTaskControllerSearchProjectTasksStatusEnum,
} from "../api/generated";

export type SearchProjectTaskQuery = {
  status?: ProjectTaskControllerSearchProjectTasksStatusEnum;
  priority?: ProjectTaskControllerSearchProjectTasksPriorityEnum;
  categoryId?: number;
  startDate?: string;
  endDate?: string;
  sort?: string;
  asc?: boolean;
};

export const useSearchProjectTasks = (
  projectId: number,
  params: SearchProjectTaskQuery
) => {
  return useQuery({
    queryKey: ["project-tasks-search", projectId, params],
    queryFn: async () => {
      const response =
        await projectTaskApi.projectTaskControllerSearchProjectTasks(
          projectId,
          params.status,
          params.priority,
          params.categoryId,
          params.startDate,
          params.endDate,
          params.sort,
          params.asc
        );
      return response.data;
    },
    enabled: !!projectId,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });
};

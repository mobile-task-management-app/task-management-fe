import { projectTaskApi, taskApi } from "@/api/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateProjectTaskRequestDTO,
  ProjectTaskControllerCreateProjectTask200Response,
  ProjectTaskControllerSearchProjectTasksPriorityEnum,
  ProjectTaskControllerSearchProjectTasksStatusEnum,
  TaskControllerGetTaskById200Response,
  UpdateTaskRequestDTO,
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
    queryKey: ["project-tasks", projectId, params],
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

export const useTaskDetail = (taskId: number) => {
  return useQuery({
    queryKey: ["task-detail", taskId],
    queryFn: async () => {
      const response = await taskApi.taskControllerGetTaskById(taskId);
      return response.data;
    },
    enabled: !!taskId,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateProjectTask = (
  projectId: number,
  onSuccess?: (
    response: ProjectTaskControllerCreateProjectTask200Response,
    variables: CreateProjectTaskRequestDTO
  ) => void,
  onError?: (error: any) => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateProjectTaskRequestDTO) => {
      const response =
        await projectTaskApi.projectTaskControllerCreateProjectTask(
          projectId,
          data
        );
      return response.data;
    },
    onSuccess: (data, variables) => {
      // ✅ Project task list
      queryClient.invalidateQueries({
        queryKey: ["project-tasks", projectId],
      });

      // ✅ Home summary (QUAN TRỌNG)
      queryClient.invalidateQueries({
        queryKey: ["project-summaries"],
      });

      onSuccess?.(data, variables);
    },
    onError,
  });
};
export const useUpdateTask = (
  taskId: number,
  projectId: number,
  onSuccess?: (
    response: TaskControllerGetTaskById200Response,
    variables: Partial<UpdateTaskRequestDTO>
  ) => void,
  onError?: (error: any) => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<UpdateTaskRequestDTO>) => {
      const response = await taskApi.taskControllerUpdateTask(taskId, data);
      return response.data;
    },
    onSuccess: (data, variables) => {
      // 1️⃣ Task detail
      queryClient.invalidateQueries({
        queryKey: ["task-detail", taskId],
      });

      // 2️⃣ ALL project task lists (KỂ CẢ FILTER)
      queryClient.invalidateQueries({
        queryKey: ["project-tasks", projectId],
      });

      queryClient.invalidateQueries({
        queryKey: ["project-summaries"],
      });

      onSuccess?.(data, variables);
    },
    onError,
  });
};

export const useSearchTasks = (params: SearchProjectTaskQuery) => {
  return useQuery({
    queryKey: ["tasks-search", params],
    queryFn: async () => {
      const response = await taskApi.taskControllerSearchUserTasks(
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
    enabled: true,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });
};

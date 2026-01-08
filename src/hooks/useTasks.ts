import { projectTaskApi, taskApi } from "@/api/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CreateProjectTaskRequestDTO,
  ProjectTaskControllerCreateProjectTask200Response,
  ProjectTaskControllerSearchProjectTasksPriorityEnum,
  ProjectTaskControllerSearchProjectTasksStatusEnum,
  TaskControllerGetTaskById200Response,
  UpdateTaskRequestDTO,
} from "../api/generated";
import { useGetUserProjectSummaries } from "./useProjects";

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
  return useMutation({
    mutationFn: async (data: CreateProjectTaskRequestDTO) => {
      const response =
        await projectTaskApi.projectTaskControllerCreateProjectTask(
          projectId,
          data
        );
      return response.data;
    },
    onSuccess: onSuccess,
    onError: onError,
  });
};
export const useUpdateTask = (
  taskId: number,
  onSuccess?: (
    response: TaskControllerGetTaskById200Response,
    variables: Partial<CreateProjectTaskRequestDTO>
  ) => void,
  onError?: (error: any) => void
) => {
  return useMutation({
    mutationFn: async (data: Partial<UpdateTaskRequestDTO>) => {
      const response = await taskApi.taskControllerUpdateTask(taskId, data);
      return response.data;
    },
    onSuccess: onSuccess,
    onError: onError,
  });
};
export const useTasks = (
  projectId: number,
  startDate?: string,
  endDate?: string
) => {
  return useSearchProjectTasks(projectId, {
    startDate,
    endDate,
    sort: "",
    asc: true,
  });
};

export const useAllProjectsTasks = (params?: {
  startDate?: Date;
  endDate?: Date;
}) => {
  const { data: projectSummaries, isLoading: isLoadingProjects } =
    useGetUserProjectSummaries();

  const projectIds = projectSummaries?.data?.project_summaries?.map(
    (p: any) => p.id
  ) || [];

  // Use useQueries to fetch tasks for all projects in parallel
  const queries = projectIds.map((projectId: number) =>
    useQuery({
      queryKey: ["project-tasks-all", projectId, params],
      queryFn: async () => {
        const response =
          await projectTaskApi.projectTaskControllerSearchProjectTasks(
            projectId,
            undefined,
            undefined,
            undefined,
            params?.startDate
              ? params.startDate.toISOString().split("T")[0]
              : undefined,
            params?.endDate
              ? params.endDate.toISOString().split("T")[0]
              : undefined,
            "",
            true
          );
        return response.data;
      },
      enabled: !!projectId,
      retry: 1,
      staleTime: 1000 * 60 * 5,
    })
  );

  // Combine results from all queries
  const allTasksData = queries.reduce((acc, query) => {
    if (query.data?.data) {
      const taskData = query.data.data;
      // Handle both array and object responses
      if (Array.isArray(taskData)) {
        acc.push(...taskData);
      } else if (taskData && typeof taskData === "object") {
        // If it's an object with a tasks property, use that
        const tasks = (taskData as any).tasks || (taskData as any).data || [];
        if (Array.isArray(tasks)) {
          acc.push(...tasks);
        }
      }
    }
    return acc;
  }, [] as any[]);

  const isLoading = isLoadingProjects || queries.some((q) => q.isLoading);
  const isError = queries.some((q) => q.isError);

  return {
    data: { data: allTasksData },
    isLoading,
    isError,
  };
};

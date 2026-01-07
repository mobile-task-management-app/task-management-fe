import { projectApi } from "@/api/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { AddProjectRequestDTO } from "../api/generated"; // Import SignIn DTO

export const useCreateProject = (
  onSuccess: (response: any, variables: AddProjectRequestDTO) => void,
  onError: (error: any) => void
) => {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: AddProjectRequestDTO) =>
      projectApi.projectControllerAddProject(data),
    onSuccess: onSuccess,
    onError: onError,
  });
};
export const useGetUserProjectSummaries = () => {
  return useQuery({
    // 'profile' is the unique key for caching.
    // If you call this hook on 5 different screens, it only makes 1 API call.
    queryKey: ["project-summaries"],

    // The actual API call from your generated code
    queryFn: async () => {
      const response =
        await projectApi.projectControllerGetUserProjectSummaries();
      return response.data;
    },
    retry: 1,
    staleTime: 1000 * 60 * 5, // Consider data "fresh" for 5 minutes
  });
};

export const useGetProjectDetail = (projectId: string) => {
  return useQuery({
    queryKey: ["project-detail", projectId],
    queryFn: async () => {
      const response = await projectApi.projectControllerGetProjectById(
        Number(projectId)
      );
      return response.data;
    },
    enabled: !!projectId,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });
};

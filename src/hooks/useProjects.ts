import { projectApi } from "@/api/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { AddProjectRequestDTO } from "../api/generated"; // Import SignIn DTO

export const useCreateProject = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: AddProjectRequestDTO) =>
      projectApi.projectControllerAddProject(data),
    onSuccess: (response, variables) => {
      router.push({
        pathname: "/(tabs)",
      });
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      Alert.alert("Sign Up Failed", errorMessage);
    },
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

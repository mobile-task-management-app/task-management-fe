import { userApi } from "@/api/client";
import { useQuery } from "@tanstack/react-query";

export const useProfile = () => {
  return useQuery({
    // 'profile' is the unique key for caching.
    // If you call this hook on 5 different screens, it only makes 1 API call.
    queryKey: ["profile"],

    // The actual API call from your generated code
    queryFn: async () => {
      const response = await userApi.userControllerGetProfile();
      return response.data;
    },

    // Optional: Don't fetch if the user isn't logged in
    retry: 1,
    staleTime: 1000 * 60 * 5, // Consider data "fresh" for 5 minutes
  });
};

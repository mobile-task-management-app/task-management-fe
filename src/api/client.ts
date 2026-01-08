import axios from "axios";
import * as SecureStore from "expo-secure-store";
import {
  AuthenticationApi,
  Configuration,
  ProjectsApi,
  ProjectTasksApi,
  TasksApi,
  UsersApi,
} from "./generated";

// 1. Define your Base URL
const BASE_URL = "https://taskflow.biboxstorage.xyz/";

// 2. Create a shared Axios instance
// This allows you to add interceptors for logging or global error handling
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

/**
 * 3. Configure the OpenAPI classes
 * The Configuration object tells the generated code how to behave.
 */
const apiConfig = new Configuration({
  basePath: BASE_URL,
  // This allows the generated code to use our custom axios instance
});

/**
 * 4. Token Injection (Interceptor)
 * This automatically attaches your JWT to every request made by any API class.
 */

// ... axios instance setup

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      // 1. Fetch the token from the phone's encrypted storage
      const token = await SecureStore.getItemAsync("user_token");

      // 2. If it exists, attach it to the headers
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      // Handle potential storage reading errors
      console.error("Could not retrieve auth token", error);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 5. Instantiate and Export the APIs
// You use these instances in your TanStack Query hooks
export const authApi = new AuthenticationApi(
  apiConfig,
  BASE_URL,
  axiosInstance
);
export const userApi = new UsersApi(apiConfig, BASE_URL, axiosInstance);
export const projectApi = new ProjectsApi(apiConfig, BASE_URL, axiosInstance);
export const taskApi = new TasksApi(apiConfig, BASE_URL, axiosInstance);
export const projectTaskApi = new ProjectTasksApi(
  apiConfig,
  BASE_URL,
  axiosInstance
);
// Export the axios instance in case you need to do manual calls
export default axiosInstance;

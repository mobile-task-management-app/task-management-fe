import { authApi } from "@/api/client";
import { signIn, verifyEmail } from "@/state/authSlice";
import { useAppDispatch } from "@/state/hooks";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";
import { LogInRequestDTO, SignUpRequestDTO, VerifyOtpRequestDTO } from "../api/generated"; // Import SignIn DTO

export const useSignUp = () => {
  // const router = useRouter();

  return useMutation({
    mutationFn: (signUpData: SignUpRequestDTO) =>
      authApi.authControllerSignUp(signUpData),
    onSuccess: (response, variables) => {
      // Alert.alert(
      //   "Success",
      //   "A verification code has been sent to your email."
      // );
      // Navigate to OTP and pass email as a param
      // router.push({
      //   pathname: "/(auth)/verify-otp",
      //   params: { email: variables.email },
      // });
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      Alert.alert("Sign Up Failed", errorMessage);
    },
  });
};

export const useSignIn = () => {
  // const router = useRouter();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (signInData: LogInRequestDTO) =>
      authApi.authControllerLogIn(signInData),

    onSuccess: async (response) => {
      // 1. Extract token from your backend response
      // Assuming your backend returns { access_token: '...' }
      const token = response.data.data.access_token;
      console.log("Received token:", token);

      if (token) {
        // 2. Persist token securely
        await SecureStore.setItemAsync("user_token", token);

        // 3. Update Redux state
        dispatch(signIn());

        // 4. Redirect to main app
        // router.replace("/(tabs)");
      }
    },

    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Invalid credentials";
      Alert.alert("Sign In Failed", errorMessage);
    },
  });
};

export const useVerifyOTP = () => {
  // const router = useRouter();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (verifyOtpData: VerifyOtpRequestDTO) =>
      authApi.authControllerVerifyOtp(verifyOtpData),

    onSuccess: async (response) => {
      dispatch(verifyEmail());
          // router.replace({
          //   pathname: "/(tabs)",
          //   params: { welcome: "1" },
          // });
    },

    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "OTP verification failed";
      Alert.alert("OTP Verification Failed", errorMessage);
    },
  });
};

export const useFirstTimeSignIn = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (signInData: LogInRequestDTO) =>
      authApi.authControllerLogIn(signInData),

    onSuccess: async (response) => {
      const token = response.data.data.access_token;

      if (token) {
        await SecureStore.setItemAsync("user_token", token);
        // dispatch(signIn());

        router.replace({
            pathname: "/(tabs)",
            params: { welcome: "1" },
          });
      }
    },

    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Invalid credentials";
      Alert.alert("Sign In Failed", errorMessage);
    },
  });
}

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuthStore } from "../state/authStore";
import { OnboardingScreen } from "../screens/onboarding/OnboardingScreen";
import { AuthNavigator } from "./AuthNavigator";
import { MainStack } from "./MainStack";
import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  const isFirstLaunch = useAuthStore((state) => state.isFirstLaunch);
  const isAuthed = useAuthStore((state) => state.isAuthed);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isFirstLaunch ? (
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      ) : isAuthed ? (
        <Stack.Screen name="Main" component={MainStack} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};

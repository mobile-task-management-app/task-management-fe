import React from "react";
import {
  Redirect,
  Stack,
  useRootNavigationState,
  useSegments,
} from "expo-router";
import { Provider } from "react-redux";
import { store } from "../src/state/store";
import { useAppSelector } from "../src/state/hooks";
import { CreateActionModal } from "../src/components/modals/CreateActionModal";

const RootLayoutNav = () => {
  const isFirstLaunch = useAppSelector((state) => state.auth.isFirstLaunch);
  const isAuthed = useAppSelector((state) => state.auth.isAuthed);
  const segments = useSegments();
  const segmentsArray = Array.from(segments);
  const navigationState = useRootNavigationState();

  const ready = Boolean(navigationState?.key) && segmentsArray.length > 0;
  const currentGroup = segmentsArray[0];
  const inOnboarding = currentGroup === "(onboarding)";
  const inAuth = currentGroup === "(auth)";
  const inTabs = currentGroup === "(tabs)";
  const inCreate = currentGroup === "create-task" || currentGroup === "create-project";

  let redirectTo: "/(onboarding)" | "/(auth)" | "/(tabs)" | null = null;
  if (ready) {
    if (isFirstLaunch && !inOnboarding) {
      redirectTo = "/(onboarding)";
    } else if (!isFirstLaunch && !isAuthed && !inAuth) {
      redirectTo = "/(auth)";
    } else if (!isFirstLaunch && isAuthed && !inTabs && !inCreate) {
      redirectTo = "/(tabs)";
    }
  }

  return (
    <>
      <CreateActionModal />
      {redirectTo ? <Redirect href={redirectTo} /> : null}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="create-task" />
        <Stack.Screen name="create-project" />
      </Stack>
    </>
  );
};

const RootLayout = () => {
  return (
    <Provider store={store}>
      <RootLayoutNav />
    </Provider>
  );
};

export default RootLayout;

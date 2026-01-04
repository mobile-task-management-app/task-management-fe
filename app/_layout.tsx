import {
  Redirect,
  Stack,
  useRootNavigationState,
  useSegments,
} from "expo-router";
import React from "react";
import { Provider } from "react-redux";
import { CreateActionModal } from "../src/components/modals/CreateActionModal";
import { useAppSelector } from "../src/state/hooks";
import { store } from "../src/state/store";

const RootLayoutNav = () => {
  const isFirstLaunch = useAppSelector((state) => state.auth.isFirstLaunch);
  const isAuthed = useAppSelector((state) => state.auth.isAuthed);
  const isEmailVerified = useAppSelector((state) => state.auth.isEmailVerified);
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
  console.log("RootLayoutNav - isFirstLaunch:", isFirstLaunch, "isAuthed:", isAuthed, "isEmailVerified:", isEmailVerified, "segments:", segmentsArray, "inOnboarding:", inOnboarding, "inAuth:", inAuth, "inTabs:", inTabs, "inCreate:", inCreate);
  if (ready) {
    if (isFirstLaunch && !inOnboarding) {
      redirectTo = "/(onboarding)";
    } else if (!isFirstLaunch && !isAuthed && !isEmailVerified && !inAuth) {
      redirectTo = "/(auth)";
    } else if (
      !isFirstLaunch &&
      isAuthed &&
      isEmailVerified &&
      !inTabs &&
      !inCreate
    ) {
      redirectTo = "/(tabs)";
    } else if (!isFirstLaunch && isAuthed && !inTabs && !inCreate) {
      redirectTo = "/(tabs)";
    }
    // else if (!isFirstLaunch && isAuthed && inTabs) {
    //   redirectTo = "/(auth)";
    // }
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

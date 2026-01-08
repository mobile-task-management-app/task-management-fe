import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://58b548a6fb8fad337456b6e1337a3367@o4510499789340672.ingest.us.sentry.io/4510675179929600',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

// 2. Create the Query Client instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

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
  const inCreate =
    currentGroup === "create-task" ||
    currentGroup === "create-project" ||
    currentGroup === "edit-task" ||
    currentGroup === "project";

  let redirectTo: "/(onboarding)" | "/(auth)" | "/(tabs)" | null = null;
  console.log(
    "RootLayoutNav - isFirstLaunch:",
    isFirstLaunch,
    "isAuthed:",
    isAuthed,
    "isEmailVerified:",
    isEmailVerified,
    "segments:",
    segmentsArray,
    "inOnboarding:",
    inOnboarding,
    "inAuth:",
    inAuth,
    "inTabs:",
    inTabs,
    "inCreate:",
    inCreate
  );
  if (ready) {
    if (isFirstLaunch && !inOnboarding) {
      redirectTo = "/(onboarding)";
    } else if (!isFirstLaunch && !isAuthed && !isEmailVerified && !inAuth) {
      redirectTo = "/(auth)";
    } else if (
      !isFirstLaunch &&
      isAuthed &&
      // isEmailVerified &&
      // !inTabs &&
      !inCreate
    ) {
      redirectTo = "/(tabs)";
    } 
    // else if (!isFirstLaunch && isAuthed && !inTabs && !inCreate) {
    //   redirectTo = "/(tabs)";
    // }
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
        <Stack.Screen name="edit-task" />
      </Stack>
    </>
  );
};

const RootLayout = () => {
  return (
    // 3. Wrap with QueryClientProvider
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RootLayoutNav />
      </Provider>
    </QueryClientProvider>
  );
};

export default Sentry.wrap(RootLayout);
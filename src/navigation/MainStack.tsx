import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainTabs } from "./MainTabs";
import { CreateTaskScreen } from "../screens/create/CreateTaskScreen";
import { CreateProjectScreen } from "../screens/create/CreateProjectScreen";
import { MainStackParamList } from "./types";
import { CreateActionModal } from "../components/modals/CreateActionModal";

const Stack = createNativeStackNavigator<MainStackParamList>();

export const MainStack: React.FC = () => {
  return (
    <>
      <CreateActionModal />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={MainTabs} />
        <Stack.Screen name="CreateTask" component={CreateTaskScreen} />
        <Stack.Screen name="CreateProject" component={CreateProjectScreen} />
      </Stack.Navigator>
    </>
  );
};

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/home/HomeScreen";
import { DailyScreen } from "../screens/daily/DailyScreen";
import { ProjectsScreen } from "../screens/projects/ProjectsScreen";
import { ProfileScreen } from "../screens/profile/ProfileScreen";
import { MainTabParamList } from "./types";
import { TabIcon } from "../components/tabbar/TabIcon";
import { CreateTabButton } from "../components/tabbar/CreateTabButton";

const Tab = createBottomTabNavigator<MainTabParamList>();

const PlaceholderScreen = () => null;

export const MainTabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#EFEAFE",
          borderTopWidth: 0,
          height: 72,
        },
        tabBarIcon: ({ focused }) =>
          route.name === "CreateAction" ? null : (
            <TabIcon routeName={route.name} focused={focused} />
          ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Daily" component={DailyScreen} />
      <Tab.Screen
        name="CreateAction"
        component={PlaceholderScreen}
        options={{
          tabBarButton: () => <CreateTabButton />,
        }}
      />
      <Tab.Screen name="Projects" component={ProjectsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

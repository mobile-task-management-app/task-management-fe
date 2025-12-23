import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../theme/colors";

type TabIconProps = {
  routeName: string;
  focused: boolean;
};

const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
  Home: "home",
  Daily: "calendar",
  Projects: "briefcase",
  Profile: "person",
};

export const TabIcon: React.FC<TabIconProps> = ({ routeName, focused }) => {
  const iconName = iconMap[routeName] ?? "ellipse";

  return (
    <Ionicons
      name={iconName}
      size={22}
      color={focused ? colors.primary : colors.textMuted}
    />
  );
};

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../theme/colors";
import { ProjectStatus } from "../../types/models";

const statusColors: Record<ProjectStatus, string> = {
  Overdue: colors.warning,
  "In Progress": colors.info,
  Done: colors.success,
};

type BadgeProps = {
  label: ProjectStatus;
};

export const Badge: React.FC<BadgeProps> = ({ label }) => {
  return (
    <View style={[styles.badge, { backgroundColor: `${statusColors[label]}22` }]}>
      <Text style={[styles.text, { color: statusColors[label] }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  text: {
    fontSize: 11,
    fontWeight: "600",
  },
});

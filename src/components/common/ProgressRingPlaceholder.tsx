import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../theme/colors";
import { formatPercent } from "../../utils/format";

type ProgressRingPlaceholderProps = {
  progress: number;
  size?: number;
  color?: string;
};

export const ProgressRingPlaceholder: React.FC<ProgressRingPlaceholderProps> = ({
  progress,
  size = 54,
  color = colors.primary,
}) => {
  return (
    <View
      style={[
        styles.ring,
        { width: size, height: size, borderColor: color },
      ]}
    >
      <Text style={[styles.text, { color }]}>{formatPercent(progress)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  ring: {
    borderWidth: 4,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 11,
    fontWeight: "600",
  },
});

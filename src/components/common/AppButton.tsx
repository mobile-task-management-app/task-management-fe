import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";

type AppButtonProps = {
  title: string;
  onPress: () => void;
  variant?: "primary" | "outline";
  style?: StyleProp<ViewStyle>;
};

export const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  style,
}) => {
  const isOutline = variant === "outline";

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[
        styles.base,
        isOutline ? styles.outline : styles.primary,
        style,
      ]}
    >
      <Text style={[styles.label, isOutline && styles.labelOutline]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    width: "100%",
    minHeight: 52,
    paddingVertical: spacing.md,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  primary: {
    backgroundColor: colors.primary,
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.primary,
  },
  label: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  labelOutline: {
    color: colors.primary,
  },
});

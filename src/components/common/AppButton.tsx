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
  disabled?: boolean;
  variant?: "primary" | "outline";
  style?: StyleProp<ViewStyle>;
};

export const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  disabled = false,
  variant = "primary",
  style,
}) => {
  const isOutline = variant === "outline";

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      style={[
        styles.base,
        isOutline ? styles.outline : styles.primary,
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text
        style={[
          styles.label,
          isOutline && styles.labelOutline,
          disabled && styles.labelDisabled,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  /* ===== BASE ===== */
  base: {
    width: "100%",
    minHeight: 52,
    paddingVertical: spacing.md,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },

  /* ===== VARIANTS ===== */
  primary: {
    backgroundColor: colors.primary,
  },

  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.primary,
  },

  /* ===== TEXT ===== */
  label: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  labelOutline: {
    color: colors.primary,
  },

  /* ===== DISABLED ===== */
  disabled: {
    opacity: 0.45,
  },

  labelDisabled: {
    color: "#FFFFFF",
  },
});

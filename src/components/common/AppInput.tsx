import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";

type AppInputProps = TextInputProps & {
  label?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
};

export const AppInput: React.FC<AppInputProps> = ({
  label,
  left,
  right,
  style,
  ...props
}) => {
  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View style={styles.inputRow}>
        {/* LEFT ICON */}
        {left ? <View style={styles.left}>{left}</View> : null}

        <TextInput
          placeholderTextColor={colors.textMuted}
          style={[styles.input, style]}
          {...props}
        />

        {/* RIGHT ICON */}
        {right ? <View style={styles.right}>{right}</View> : null}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },

  label: {
    marginBottom: spacing.sm,
    color: colors.textMuted,
    fontSize: 13,
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
  },

  input: {
    flex: 1,
    paddingVertical: spacing.md,
    fontSize: 15,
    color: colors.text,
  },

  left: {
    marginRight: spacing.sm,
  },

  right: {
    marginLeft: spacing.sm,
  },
});

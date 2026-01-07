import { AppButton } from "@/components/common/AppButton";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  onDone: () => void;
}

export const UpdateProfileSuccessSheet: React.FC<Props> = ({ onDone }) => {
  return (
    <View>
      <View style={styles.iconWrapper}>
        <View style={styles.icon}>
          <Ionicons name="person" size={28} color="#FFF" />
        </View>
      </View>

      <Text style={styles.title}>Profile Updated!</Text>

      <Text style={styles.subtitle}>
        Your profile has been successfully updated. We’re excited to see you
        take this step!
      </Text>

      <AppButton title="Visit My Profile" onPress={onDone} />
    </View>
  );
};

const styles = StyleSheet.create({
  iconWrapper: {
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  icon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: spacing.sm,
    color: colors.text,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: colors.textMuted,
    lineHeight: 20,
    marginBottom: spacing.lg,
  },
});

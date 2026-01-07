import { AppButton } from "@/components/common/AppButton";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
}

export const UpdateProfileConfirmSheet: React.FC<Props> = ({
  onConfirm,
  onCancel,
}) => {
  return (
    <View>
      <View style={styles.iconWrapper}>
        <View style={styles.icon}>
          <Ionicons name="person" size={28} color="#FFF" />
        </View>
      </View>
    
      <Text style={styles.title}>Update Profile</Text>

      <Text style={styles.subtitle}>
        Are you sure you want to update your profile? This will help us improve
        your experience and provide personalized features.
      </Text>
      <View style={styles.buttonGroup}>
        <AppButton title="Yes, Update Profile" onPress={onConfirm} />

        <AppButton
            title="No, Let me check"
            variant="outline"
            onPress={onCancel}
        />
      </View>
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
  buttonGroup: {
      width: "100%",
      gap: 12,
  },
});

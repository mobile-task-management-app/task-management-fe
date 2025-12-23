import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { AppButton } from "../../components/common/AppButton";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";
import { typography } from "../../theme/typography";

export const AuthLandingScreen: React.FC = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.illustration} />
      <View style={styles.content}>
        <Text style={styles.title}>
          Navigate Your Work Journey Efficient & Easy
        </Text>
        <Text style={styles.subtitle}>
          Increase your work management and career development radically.
        </Text>
        <AppButton
          title="Sign In"
          onPress={() => router.push("/(auth)/sign-in")}
        />
        <AppButton
          title="Sign Up"
          variant="outline"
          onPress={() => router.push("/(auth)/sign-up")}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.xl,
    justifyContent: "center",
  },
  illustration: {
    height: 220,
    backgroundColor: "#DAD4FF",
    borderRadius: 24,
    marginBottom: spacing.xl,
  },
  content: {
    gap: spacing.md,
  },
  title: {
    ...typography.h1,
    color: colors.text,
    textAlign: "center",
  },
  subtitle: {
    color: colors.textMuted,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: spacing.md,
  },
});

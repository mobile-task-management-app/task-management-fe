import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppButton } from "../../components/common/AppButton";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";
import { typography } from "../../theme/typography";
import { useAppDispatch } from "../../state/hooks";
import { finishOnboarding } from "../../state/authSlice";

export const OnboardingScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.illustration} />
      <View style={styles.content}>
        <Text style={styles.title}>TaskFlow</Text>
        <Text style={styles.subtitle}>
          Create a unique emotional story that describes better than words.
        </Text>
        <View style={styles.dots}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
        <AppButton
          title="Get Started"
          onPress={() => dispatch(finishOnboarding())}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  illustration: {
    flex: 1,
    backgroundColor: "#DAD4FF",
    margin: spacing.lg,
    borderRadius: 24,
  },
  content: {
    backgroundColor: colors.card,
    padding: spacing.xl,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    gap: spacing.md,
  },
  title: {
    ...typography.title,
    color: colors.primary,
    textAlign: "center",
  },
  subtitle: {
    color: colors.textMuted,
    textAlign: "center",
    lineHeight: 20,
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
  },
  dotActive: {
    backgroundColor: colors.primary,
    width: 24,
  },
});

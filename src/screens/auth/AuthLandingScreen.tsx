import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppButton } from "../../components/common/AppButton";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";
import { typography } from "../../theme/typography";
import { AuthStackParamList } from "../../navigation/types";

export const AuthLandingScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

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
          onPress={() => navigation.navigate("SignIn")}
        />
        <AppButton
          title="Sign Up"
          variant="outline"
          onPress={() => navigation.navigate("SignUp")}
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

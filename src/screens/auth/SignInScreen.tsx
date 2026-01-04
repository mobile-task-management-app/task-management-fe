import { useSignIn } from "@/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppButton } from "../../components/common/AppButton";
import { AppInput } from "../../components/common/AppInput";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";
import { typography } from "../../theme/typography";

export const SignInScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [remember, setRemember] = useState(false);
  const { mutate } = useSignIn();
  const handleSignIn = () => {
    mutate({
      email,
      password,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Sign In</Text>
        <Text style={styles.subtitle}>Sign in to my account</Text>
        <AppInput
          label="Email"
          placeholder="My email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <AppInput
          label="Password"
          placeholder="My password"
          secureTextEntry={isHidden}
          value={password}
          onChangeText={setPassword}
          right={
            <Pressable onPress={() => setIsHidden((prev) => !prev)}>
              <Ionicons
                name={isHidden ? "eye" : "eye-off"}
                size={18}
                color={colors.primary}
              />
            </Pressable>
          }
        />
        <View style={styles.rowBetween}>
          <Pressable
            style={styles.remember}
            onPress={() => setRemember(!remember)}
          >
            <View
              style={[
                styles.checkbox,
                remember && { backgroundColor: colors.primary },
              ]}
            >
              {remember ? (
                <Ionicons name="checkmark" size={14} color="#FFFFFF" />
              ) : null}
            </View>
            <Text style={styles.rememberText}>Remember Me</Text>
          </Pressable>
          <Text style={styles.link}>Forgot Password</Text>
        </View>
        <AppButton title="Sign In" onPress={handleSignIn} />
        <Text style={styles.footerText}>
          Don&apos;t have an account?{" "}
          <Text style={styles.link}>Sign Up Here</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    padding: spacing.xl,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: spacing.xl,
    gap: spacing.sm,
  },
  title: {
    ...typography.h1,
    textAlign: "center",
    color: colors.text,
  },
  subtitle: {
    textAlign: "center",
    color: colors.textMuted,
    marginBottom: spacing.lg,
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.lg,
  },
  remember: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  rememberText: {
    color: colors.text,
    fontSize: 13,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  link: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "600",
  },
  footerText: {
    textAlign: "center",
    color: colors.textMuted,
    marginTop: spacing.lg,
  },
});

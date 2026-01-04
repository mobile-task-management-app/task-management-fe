import { useSignUp } from "@/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppButton } from "../../components/common/AppButton";
import { AppInput } from "../../components/common/AppInput";
import { signIn } from "../../state/authSlice";
import { useAppDispatch } from "../../state/hooks";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";
import { typography } from "../../theme/typography";

export const SignUpScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const { mutate } = useSignUp();
  const handleSignUp = () => {
    mutate({
      email,
      password,
      phone_number: phone,
      date_of_birth: 1767503349,
      first_name: firstName,
      last_name: lastName,
    });
    dispatch(signIn());
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>TaskFlow</Text>
      <Text style={styles.subtitle}>Register Using Your Credentials</Text>
      <AppInput
        label="Email"
        placeholder="Enter Your Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <AppInput
        label="First Name"
        placeholder="Enter Your First Name"
        autoCapitalize="none"
        value={firstName}
        onChangeText={setFirstName}
      />
      <AppInput
        label="Last Name"
        placeholder="Enter Your Last Name"
        autoCapitalize="none"
        value={lastName}
        onChangeText={setLastName}
      />
      <AppInput
        label="Phone Number"
        placeholder="+62 0000 0000 0000"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
        right={
          <Ionicons name="chevron-down" size={16} color={colors.textMuted} />
        }
      />
      <AppInput
        label="Password"
        placeholder="My Password"
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
      <AppInput
        label="Confirm Password"
        placeholder="Confirm My Password"
        secureTextEntry={isHidden}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
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
      <Pressable style={styles.remember} onPress={() => setAgree(!agree)}>
        <View
          style={[
            styles.checkbox,
            agree && { backgroundColor: colors.primary },
          ]}
        >
          {agree ? (
            <Ionicons name="checkmark" size={14} color="#FFFFFF" />
          ) : null}
        </View>
        <Text style={styles.rememberText}>
          I agree with <Text style={styles.link}>terms & conditions</Text> and{" "}
          <Text style={styles.link}>privacy policy</Text>
        </Text>
      </Pressable>
      <AppButton title="Sign Up" onPress={handleSignUp} />
      <Text style={styles.footerText}>
        Already have an account? <Text style={styles.link}>Sign in here</Text>
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.xl,
  },
  title: {
    ...typography.h1,
    color: colors.text,
    textAlign: "center",
    marginBottom: spacing.sm,
  },
  subtitle: {
    textAlign: "center",
    color: colors.textMuted,
    marginBottom: spacing.xl,
  },
  remember: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  rememberText: {
    color: colors.textMuted,
    fontSize: 13,
    flex: 1,
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
    fontWeight: "600",
  },
  footerText: {
    textAlign: "center",
    color: colors.textMuted,
    marginTop: spacing.lg,
  },
});

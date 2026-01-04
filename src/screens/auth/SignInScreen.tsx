import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AppButton } from "../../components/common/AppButton";
import { AppInput } from "../../components/common/AppInput";
import { signIn } from "../../state/authSlice";
import { useAppDispatch } from "../../state/hooks";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";
import { typography } from "../../theme/typography";

interface Props {
  onSuccess?: () => void;
}

export const SignInScreen: React.FC<Props> = ({ onSuccess }) => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [remember, setRemember] = useState(false);

  return (
    <View>
      <Text style={styles.title}>Sign In</Text>
      <Text style={styles.subtitle}>Sign in to my account</Text>

      <AppInput
        label="Email"
        placeholder="My email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        left={
          <Ionicons
            name="mail-outline"
            size={18}
            color={colors.primary}
          />
        }
      />

      <AppInput
        label="Password"
        placeholder="My password"
        secureTextEntry={isHidden}
        value={password}
        onChangeText={setPassword}
        left={
          <Ionicons
            name="finger-print-outline"
            size={18}
            color={colors.primary}
          />
        }
        right={
          <Pressable onPress={() => setIsHidden(!isHidden)}>
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
            {remember && (
              <Ionicons name="checkmark" size={14} color="#FFF" />
            )}
          </View>
          <Text style={styles.rememberText}>Remember Me</Text>
        </Pressable>

        <Text style={styles.link}>Forgot Password</Text>
      </View>

      <AppButton
        title="Sign In"
        onPress={() => {
          dispatch(signIn());
          onSuccess?.();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    ...typography.h1,
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    color: colors.textMuted,
    marginBottom: spacing.lg,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.lg,
  },
  remember: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  rememberText: {
    fontSize: 13,
    color: colors.text,
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
    fontSize: 13,
  },
});

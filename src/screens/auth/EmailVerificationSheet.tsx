import { AppButton } from "@/components/common/AppButton";
import { verifyEmail } from "@/state/authSlice";
import { useAppDispatch } from "@/state/hooks";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";
import { typography } from "../../theme/typography";

interface Props {
  onSuccess?: () => void;
}

export const EmailVerificationSheet: React.FC<Props> = ({ onSuccess }) => {
  const dispatch = useAppDispatch();
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputs = useRef<TextInput[]>([]);

  const handleChange = (value: string, index: number) => {
    const next = [...otp];
    next[index] = value;
    setOtp(next);

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleSubmit = () => {
    dispatch(verifyEmail());

    onSuccess?.();

    router.replace({
      pathname: "/(tabs)",
      params: { welcome: "1" },
    });
  };

  return (
    <View>
      {/* Icon */}
      <View style={styles.iconWrapper}>
        <View style={styles.icon}>
          <Ionicons name="mail" size={26} color="#FFF" />
          <View style={styles.dot} />
        </View>
      </View>

      <Text style={styles.title}>Email Verification Sent!</Text>
      <Text style={styles.subtitle}>
        A verification code has been sent to your email.
      </Text>

      {/* OTP */}
      <View style={styles.otpRow}>
        {otp.map((v, i) => (
          <TextInput
            key={i}
            ref={(el) => {
              if (el) inputs.current[i] = el;
            }}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            value={v}
            onChangeText={(val) => handleChange(val, i)}
          />
        ))}
      </View>

      <Text style={styles.resend}>
        Haven&apos;t received the code?{" "}
        <Text style={styles.link}>Resend it.</Text>
      </Text>

      <AppButton title="Submit" onPress={handleSubmit} />
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
  dot: {
    position: "absolute",
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF4D4F",
  },
  title: {
    ...typography.h2,
    textAlign: "center",
    marginBottom: spacing.sm,
  },
  subtitle: {
    textAlign: "center",
    color: colors.textMuted,
    marginBottom: spacing.lg,
  },
  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.lg,
  },
  otpInput: {
    width: 44,
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    textAlign: "center",
    fontSize: 18,
  },
  resend: {
    textAlign: "center",
    color: colors.textMuted,
    marginBottom: spacing.lg,
  },
  link: {
    color: colors.primary,
    fontWeight: "600",
  },
});

import { AppButton } from "@/components/common/AppButton";
import { AppInput } from "@/components/common/AppInput";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

type Step = "email" | "otp" | "reset" | "success";

interface Props {
  onDone?: () => void;
}

export const ForgotPasswordSheet: React.FC<Props> = ({ onDone }) => {
  const [step, setStep] = useState<Step>("email");

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [hidePwd, setHidePwd] = useState(true);

  const inputs = useRef<TextInput[]>([]);

  const isEmailValid = email.trim().length > 0;
  const isOtpValid = otp.every((v) => v !== "");
  const isPasswordValid =
    password.length >= 6 && password === confirm;

  /* ===== OTP ===== */
  const handleOtpChange = (value: string, index: number) => {
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleResetPassword = () => {
    setStep("success");
  };

  return (
    <View>
      {/* ICON */}
      <View style={styles.iconWrapper}>
        <View style={styles.icon}>
          <Ionicons name="shield-checkmark" size={28} color="#FFF" />
        </View>
      </View>

      {/* ================= EMAIL ================= */}
      {step === "email" && (
        <>
          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.subtitle}>
            A verification code will be sent to your email to reset your password.
          </Text>

          <AppInput
            label="Email"
            placeholder="My email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            left={<Ionicons name="mail-outline" size={18} color={colors.primary} />}
          />

          <AppButton
            title="Send Verification Code"
            disabled={!isEmailValid}
            onPress={() => {
              setStep("otp");
            }}
          />
        </>
      )}

      {/* ================= OTP ================= */}
      {step === "otp" && (
        <>
          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.subtitle}>
            A reset code has been sent to{" "}
            <Text style={styles.bold}>{email}</Text>
          </Text>

          <View style={styles.otpRow}>
            {otp.map((v, i) => (
              <TextInput
                key={i}
                ref={(el) => {
                  if (el) {
                    inputs.current[i] = el;
                  }
                }}
                style={styles.otpInput}
                keyboardType="number-pad"
                maxLength={1}
                value={v}
                onChangeText={(val) => handleOtpChange(val, i)}
              />
            ))}
          </View>

          <Text style={styles.resend}>
            Haven&apos;t received the code?{" "}
            <Text style={styles.link}>Resend it.</Text>
          </Text>

          <AppButton
            title="Submit"
            disabled={!isOtpValid}
            onPress={() => {
              setStep("reset");
            }}
          />
        </>
      )}

      {/* ================= RESET PASSWORD ================= */}
      {step === "reset" && (
        <>
          <Text style={styles.title}>Set a New Password</Text>
          <Text style={styles.subtitle}>
            Please set a new password to secure your Work Mate account.
          </Text>

          <AppInput
            label="Password"
            placeholder="Input Password"
            secureTextEntry={hidePwd}
            value={password}
            onChangeText={setPassword}
            left={<Ionicons name="lock-closed-outline" size={18} color={colors.primary} />}
            right={
              <Ionicons
                name={hidePwd ? "eye" : "eye-off"}
                size={18}
                color={colors.primary}
                onPress={() => setHidePwd(!hidePwd)}
              />
            }
          />

          <AppInput
            label="Confirm Password"
            placeholder="Re Enter Your Password"
            secureTextEntry={hidePwd}
            value={confirm}
            onChangeText={setConfirm}
            left={<Ionicons name="lock-closed-outline" size={18} color={colors.primary} />}
          />
          <View style={styles.actionSection}>
            <AppButton
              title="Submit"
              disabled={!isPasswordValid}
              onPress={() => {
                handleResetPassword();
              }}
            />
          </View>
        </>
      )}

      {step === "success" && (
        <>
          <Text style={styles.title}>Password Has Been Created</Text>

          <Text style={styles.subtitle}>
            To log in to your account, click the Sign in button and enter your email
            along with your new password.
          </Text>

          <View style={styles.signinActionSection}>
            <AppButton
              title="Sign In"
              onPress={() => {
                onDone?.();
              }}
            />
          </View>
        </>
      )}
    </View>
  );
};

/* ================= STYLES ================= */

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
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: spacing.sm,
    color: colors.text,
  },
  subtitle: {
    textAlign: "center",
    color: colors.textMuted,
    lineHeight: 20,
    marginBottom: spacing.lg,
  },
  bold: {
    fontWeight: "600",
    color: colors.text,
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
  bottomButton: {
    marginBottom: spacing.md,
  },
  actionSection: {
    marginTop: -10,  
    marginBottom: spacing.sm,
  },
  signinActionSection: {
    marginTop: 20,
    marginBottom: spacing.sm,
  },
});

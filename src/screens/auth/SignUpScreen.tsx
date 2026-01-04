import { useSignUp } from "@/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { AppButton } from "../../components/common/AppButton";
import { AppInput } from "../../components/common/AppInput";
import { signIn } from "../../state/authSlice";
import { useAppDispatch } from "../../state/hooks";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";
import { typography } from "../../theme/typography";
import { EmailVerificationSheet } from "./EmailVerificationSheet";
import { SignInScreen } from "./SignInScreen";

export const SignUpScreen: React.FC = () => {
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
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

  const [showVerify, setShowVerify] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  /* ===== ANIMATIONS ===== */
  const verifyY = useRef(new Animated.Value(height)).current;
  const signInY = useRef(new Animated.Value(height)).current;

  const SHEET_HEIGHT = height * 0.8;

  useEffect(() => {
    Animated.timing(verifyY, {
      toValue: showVerify ? height - SHEET_HEIGHT : height,
      duration: 350,
      useNativeDriver: true,
    }).start();
  }, [showVerify]);

  useEffect(() => {
    Animated.timing(signInY, {
      toValue: showSignIn ? height - SHEET_HEIGHT : height,
      duration: 350,
      useNativeDriver: true,
    }).start();
  }, [showSignIn]);

  return (
    <SafeAreaView style={styles.container}>
      {/* ===== LOGO ===== */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../../../assets/images/logo.png")}
          style={styles.logo}
        />
      </View>

      <Text style={styles.title}>TaskFlow</Text>
      <Text style={styles.subtitle}>Register Using Your Credentials</Text>

      {/* ===== FORM ===== */}
      <AppInput
        label="Email"
        placeholder="Enter Your Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        left={<Ionicons name="mail-outline" size={18} color={colors.primary} />}
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
        left={
          <Ionicons
            name="finger-print-outline"
            size={18}
            color={colors.primary}
          />
        }
        right={
          <Pressable onPress={() => setIsHidden((v) => !v)}>
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
        left={
          <Ionicons
            name="finger-print-outline"
            size={18}
            color={colors.primary}
          />
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
        Already have an account?{" "}
        <Text style={styles.link} onPress={() => setShowSignIn(true)}>
          Sign in here
        </Text>
      </Text>

      {/* ===== BLUR ===== */}
      {(showVerify || showSignIn) && (
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={() => {
            setShowVerify(false);
            setShowSignIn(false);
          }}
        >
          <BlurView
            intensity={35}
            tint="dark"
            style={StyleSheet.absoluteFill}
          />
        </Pressable>
      )}

      {/* ===== EMAIL VERIFY SHEET ===== */}
      {showVerify && (
        <Animated.View
          style={[
            styles.sheet,
            {
              height: SHEET_HEIGHT + insets.bottom,
              paddingBottom: insets.bottom + 24,
              transform: [{ translateY: verifyY }],
            },
          ]}
        >
          <SafeAreaView edges={["bottom"]} style={styles.sheetContent}>
            <View style={styles.sheetHandle} />
            <EmailVerificationSheet />
          </SafeAreaView>
        </Animated.View>
      )}

      {/* ===== SIGN IN SHEET ===== */}
      {showSignIn && (
        <Animated.View
          style={[
            styles.sheet,
            {
              height: SHEET_HEIGHT + insets.bottom,
              paddingBottom: insets.bottom + 24,
              transform: [{ translateY: signInY }],
            },
          ]}
        >
          <SafeAreaView edges={["bottom"]} style={styles.sheetContent}>
            <View style={styles.sheetHandle} />
            <SignInScreen onSuccess={() => setShowSignIn(false)} />
          </SafeAreaView>
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: spacing.md,
  },

  logo: {
    width: 56,
    height: 56,
    borderRadius: 12,
  },

  title: {
    ...typography.h1,
    textAlign: "center",
    marginBottom: spacing.sm,
  },

  subtitle: {
    textAlign: "center",
    color: colors.textMuted,
    marginBottom: spacing.xl,
  },

  phoneLabel: {
    marginBottom: spacing.sm,
    color: colors.textMuted,
  },

  remember: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },

  rememberText: {
    fontSize: 13,
    color: colors.textMuted,
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

  /* ===== SHEET ===== */
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    zIndex: 100,
  },

  sheetContent: {
    flex: 1,
    paddingHorizontal: spacing.xl,
  },

  sheetHandle: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#D1D5DB",
    alignSelf: "center",
    marginVertical: spacing.md,
  },
});

import { PhoneInput } from "@/components/common/PhoneInput";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Image, Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppButton } from "../../components/common/AppButton";
import { AppInput } from "../../components/common/AppInput";
import { signIn } from "../../state/authSlice";
import { useAppDispatch } from "../../state/hooks";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";
import { typography } from "../../theme/typography";
import { SignInScreen } from "./SignInScreen";

export const SignUpScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [showSignIn, setShowSignIn] = useState(false);
  const { width, height } = useWindowDimensions();
  
    /* ===== Animation ===== */
    const translateY = useRef(new Animated.Value(height)).current;
  
    useEffect(() => {
      Animated.timing(translateY, {
        toValue: showSignIn ? height * 0.25 : height,
        duration: 350,
        useNativeDriver: true,
      }).start();
    }, [showSignIn, height]);
  

  return (
    
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.title}>TaskFlow</Text>
      <Text style={styles.subtitle}>Register Using Your Credentials</Text>
      <AppInput
        label="Email"
        placeholder="Enter Your Email"
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
      {/* <AppInput
        label="Phone Number"
        placeholder="+62 0000 0000 0000"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
        right={<Ionicons name="chevron-down" size={16} color={colors.textMuted} />}
      /> */}

      <Text style={{ marginBottom: spacing.sm, color: colors.textMuted }}>
        Phone Number
      </Text>

      <PhoneInput
        value={phone}
        onChangeText={setPhone}
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
        left={
                  <Ionicons
                    name="finger-print-outline"
                    size={18}
                    color={colors.primary}
                  />
                }
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
          {agree ? <Ionicons name="checkmark" size={14} color="#FFFFFF" /> : null}
        </View>
        <Text style={styles.rememberText}>
          I agree with <Text style={styles.link}>terms & conditions</Text> and{" "}
          <Text style={styles.link}>privacy policy</Text>
        </Text>
      </Pressable>
      <AppButton title="Sign Up" onPress={() => dispatch(signIn())} />
      <Text style={styles.footerText}>
        Already have an account? <Text style={styles.link} onPress={() => setShowSignIn(true)}>Sign in here</Text>
      </Text>

      {showSignIn && (
              <Pressable
                style={[StyleSheet.absoluteFill, { zIndex: 40 }]}
                onPress={() => setShowSignIn(false)}
              >
                <BlurView
                  intensity={40}
                  tint="dark"
                  style={[StyleSheet.absoluteFill, { zIndex: 50 }]}
                />
              </Pressable>
            )}
      
            {/* ===== SIGN IN BOTTOM SHEET ===== */}
            <Animated.View
              style={[
                styles.sheet,
                { 
                  transform: [{ translateY }],
                  zIndex: 100,
                },
              ]}
            >
              <View style={styles.sheetHandle} />
              <SignInScreen onSuccess={() => setShowSignIn(false)} />
            </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: "center",
    marginBottom: spacing.md,
  },

  logo: {
    width: 56,
    height: 56,
    borderRadius: 12,
  },
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

  sheet: {
      position: "absolute",
      left: 0,
      right: 0,
      height: "75%",
      backgroundColor: "#FFFFFF",
      borderTopLeftRadius: 32,
      borderTopRightRadius: 32,
      padding: 24,
      elevation: 30,
      zIndex: 100,
    },

    sheetHandle: {
      width: 40,
      height: 5,
      borderRadius: 3,
      backgroundColor: "#D1D5DB",
      alignSelf: "center",
      marginBottom: 16,
    },
});

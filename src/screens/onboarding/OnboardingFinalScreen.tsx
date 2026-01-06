import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { AppButton } from "../../components/common/AppButton";
import { ForgotPasswordSheet } from "../auth/ForgotPasswordSheet";
import { SignInScreen } from "../auth/SignInScreen";

/* ================= CONSTANTS ================= */

const GRADIENT_COLORS = ["#9B8FFF", "#A78BFA", "#E9D5FF"] as const;

const LAYOUT_RATIOS = {
  CARD_AREA_HEIGHT: 0.44,
  CARD_OVERLAP: 0.12,
  ACHIEVEMENT_CARD_WIDTH: 0.98,
  ACHIEVEMENT_CARD_HEIGHT: 0.65,
  ACHIEVEMENT_CARD_LEFT: -0.03,
  TASK_CARD_WIDTH: 1.7,
  TASK_CARD_HEIGHT: 1.2,
  TASK_CARD_RIGHT: 0.1,
} as const;

type SheetType = "none" | "signin" | "forgot";

/* ================= COMPONENT ================= */

export const OnboardingFinalScreen: React.FC = () => {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const [activeSheet, setActiveSheet] = useState<SheetType>("none");
  const [showForgot, setShowForgot] = useState(false);

  /* ===== Animations ===== */
  const signInY = useRef(new Animated.Value(height)).current;
  const forgotY = useRef(new Animated.Value(height)).current;

  const SHEET_TOP = height * 0.25;

  useEffect(() => {
    Animated.timing(signInY, {
      toValue: activeSheet === "signin" ? SHEET_TOP : height,
      duration: 350,
      useNativeDriver: true,
    }).start();
  }, [activeSheet, height]);

  useEffect(() => {
    Animated.timing(forgotY, {
      toValue: activeSheet === "forgot" ? SHEET_TOP : height,
      duration: 350,
      useNativeDriver: true,
    }).start();
  }, [activeSheet, height]);

  /* ===== Layout ===== */
  const layout = useMemo(
    () => ({
      cardAreaHeight: height * LAYOUT_RATIOS.CARD_AREA_HEIGHT,
      cardOverlap: height * LAYOUT_RATIOS.CARD_OVERLAP,
      achievementWidth: width * LAYOUT_RATIOS.ACHIEVEMENT_CARD_WIDTH,
      achievementHeight: width * LAYOUT_RATIOS.ACHIEVEMENT_CARD_HEIGHT,
      achievementLeft: width * LAYOUT_RATIOS.ACHIEVEMENT_CARD_LEFT,
      taskWidth: width * LAYOUT_RATIOS.TASK_CARD_WIDTH,
      taskHeight: width * LAYOUT_RATIOS.TASK_CARD_HEIGHT,
      taskRight: width * LAYOUT_RATIOS.TASK_CARD_RIGHT,
    }),
    [width, height]
  );

  const styles = useMemo(() => createStyles(layout, insets), [layout, insets]);

  const closeSheet = () => setActiveSheet("none");

  return (
    <View style={{ flex: 1 }}>
      {/* ===== BACKGROUND ===== */}
      <LinearGradient colors={GRADIENT_COLORS} style={StyleSheet.absoluteFill} />

      {/* ===== MAIN CONTENT ===== */}
      <View style={styles.container}>
        {/* Illustration */}
        <View style={styles.illustrationContainer}>
          <View style={styles.cardsContainer}>
            <Image
              source={require("../../../assets/images/today-task.png")}
              style={styles.achievementCard}
              resizeMode="contain"
            />
            <Image
              source={require("../../../assets/images/working-period.png")}
              style={styles.taskCard}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Content */}
        <SafeAreaView edges={["bottom"]} style={styles.contentWrapper}>
          <View style={styles.content}>
            <Text style={styles.title}>
              Navigate Your Work Journey Efficient & Easy
            </Text>
            <Text style={styles.subtitle}>
              Increase your work management & career development radically
            </Text>

            <View style={styles.buttonGroup}>
              <AppButton title="Sign In" onPress={() => setActiveSheet("signin")} />
              <AppButton
                title="Sign Up"
                variant="outline"
                onPress={() => router.push("/(auth)/sign-up")}
              />
            </View>
          </View>
        </SafeAreaView>
      </View>

      {/* ===== BLUR ===== */}
      {activeSheet !== "none" && (
        <Pressable style={StyleSheet.absoluteFill} onPress={closeSheet}>
          <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
        </Pressable>
      )}

      {/* ===== SIGN IN SHEET ===== */}
      <Animated.View
        style={[styles.sheet, { transform: [{ translateY: signInY }] }]}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <View style={styles.sheetHandle} />
          <SignInScreen
            onSuccess={closeSheet}
            onForgotPassword={() => setActiveSheet("forgot")}
          />
        </KeyboardAvoidingView>
      </Animated.View>

      {/* ===== FORGOT PASSWORD SHEET ===== */}
      <Animated.View
        style={[styles.sheet, { transform: [{ translateY: forgotY }] }]}
      >
        <View style={styles.sheetHandle} />
        <ForgotPasswordSheet onDone={() => {
          setShowForgot(false);
          setActiveSheet("signin");
        }} />
      </Animated.View>
    </View>
  );
};

/* ================= STYLES ================= */

const createStyles = (
  layout: any,
  insets: { bottom: number }
) =>
  StyleSheet.create({
    container: { flex: 1 },

    illustrationContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 40,
    },

    cardsContainer: {
      width: "100%",
      height: layout.cardAreaHeight,
      alignItems: "center",
    },

    achievementCard: {
      width: layout.achievementWidth,
      height: layout.achievementHeight,
      position: "absolute",
      top: -12,
      left: layout.achievementLeft,
    },

    taskCard: {
      width: layout.taskWidth,
      height: layout.taskHeight,
      marginTop: layout.cardOverlap,
      marginRight: layout.taskRight,
    },

    contentWrapper: {
      backgroundColor: "#FFF",
      borderTopLeftRadius: 32,
      borderTopRightRadius: 32,
    },

    content: {
      paddingTop: 36,
      paddingHorizontal: 28,
      paddingBottom: 24,
      alignItems: "center",
    },

    title: {
      fontSize: 28,
      fontWeight: "700",
      textAlign: "center",
      marginBottom: 12,
    },

    subtitle: {
      fontSize: 15,
      color: "#6B7280",
      textAlign: "center",
      marginBottom: 24,
    },

    buttonGroup: {
      width: "100%",
      gap: 12,
    },

    sheet: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      height: "75%",
      backgroundColor: "#FFF",
      borderTopLeftRadius: 32,
      borderTopRightRadius: 32,
      paddingHorizontal: 24,
      paddingBottom: insets.bottom + 16,
      elevation: 30,
    },

    sheetHandle: {
      width: 40,
      height: 5,
      borderRadius: 3,
      backgroundColor: "#D1D5DB",
      alignSelf: "center",
      marginVertical: 16,
    },
  });

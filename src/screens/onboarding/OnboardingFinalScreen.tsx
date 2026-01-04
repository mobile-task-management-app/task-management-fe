import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppButton } from "../../components/common/AppButton";
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

/* ================= COMPONENT ================= */

export const OnboardingFinalScreen: React.FC = () => {
  const { width, height } = useWindowDimensions();
  const [showSignIn, setShowSignIn] = useState(false);

  /* ===== Animation ===== */
  const translateY = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: showSignIn ? height * 0.25 : height,
      duration: 350,
      useNativeDriver: true,
    }).start();
  }, [showSignIn, height]);

  /* ===== Layout values ===== */
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

  const styles = useMemo(() => createStyles(layout), [layout]);

  return (
    <View style={{ flex: 1 }}>
      {/* ===== Background ===== */}
      <LinearGradient
        colors={GRADIENT_COLORS}
        style={StyleSheet.absoluteFill}
      />

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
              <AppButton title="Sign In" onPress={() => setShowSignIn(true)} />
              <AppButton
                title="Sign Up"
                variant="outline"
                onPress={() => router.push("/(auth)/sign-up")}
              />
            </View>
          </View>
        </SafeAreaView>
      </View>

      {/* ===== BLUR OVERLAY ===== */}
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
    </View>
  );
};

/* ================= STYLES ================= */

const createStyles = (layout: {
  cardAreaHeight: number;
  cardOverlap: number;
  achievementWidth: number;
  achievementHeight: number;
  achievementLeft: number;
  taskWidth: number;
  taskHeight: number;
  taskRight: number;
}) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },

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
      zIndex: 1,
    },

    taskCard: {
      width: layout.taskWidth,
      height: layout.taskHeight,
      marginTop: layout.cardOverlap,
      marginRight: layout.taskRight,
      zIndex: 2,
    },

    contentWrapper: {
      backgroundColor: "#FFFFFF",
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
      color: "#111827",
      marginBottom: 12,
      textAlign: "center",
    },

    subtitle: {
      fontSize: 15,
      color: "#6B7280",
      textAlign: "center",
      lineHeight: 22,
      marginBottom: 24,
    },

    buttonGroup: {
      width: "100%",
      gap: 12,
    },

    /* ===== Bottom Sheet ===== */
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

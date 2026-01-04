import { finishOnboarding } from "@/state/authSlice";
import { useAppDispatch } from "@/state/hooks";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useMemo } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppButton } from "../../components/common/AppButton";

// Constants
const GRADIENT_COLORS = ["#9B8FFF", "#A78BFA", "#E9D5FF"] as const;
const GRADIENT_LOCATIONS = [0, 0.5, 1] as const;

const LAYOUT_RATIOS = {
  CARD_AREA_HEIGHT: 0.44,
  CARD_OVERLAP: 0.12,
  ACHIEVEMENT_CARD_WIDTH: 0.98,
  ACHIEVEMENT_CARD_HEIGHT: 0.518,
  ACHIEVEMENT_CARD_LEFT: 0.03,
  TASK_CARD_WIDTH: 0.85,
  TASK_CARD_HEIGHT: 0.65,
  TASK_CARD_RIGHT: -0.05,
} as const;

interface OnboardingPlanScreenProps {
  onNext?: () => void;
  onSkip?: () => void;
}

export const OnboardingPlanScreen: React.FC<OnboardingPlanScreenProps> = ({
  onNext,
  onSkip,
}) => {
  const { width, height } = useWindowDimensions();
  const dispatch = useAppDispatch();

  const layoutValues = useMemo(
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

  const styles = useMemo(
    () => createStyles(layoutValues),
    [layoutValues]
  );

  const handleNext = () => {
    onNext?.();
  };

  const handleSkip = () => {
    onSkip?.();
  };

  return (
    <View style={styles.container}>
      {/* Background Gradient */}
      <LinearGradient
        colors={GRADIENT_COLORS}
        locations={GRADIENT_LOCATIONS}
        style={StyleSheet.absoluteFill}
      />

      {/* Illustration Section */}
      <View style={styles.illustrationContainer}>
        <View style={styles.cardsContainer}>
          {/* Achievement Card */}
          <Image
            source={require("../../../assets/images/achievement-card.png")}
            style={styles.achievementCard}
            resizeMode="contain"
          />

          {/* Today Task Card */}
          <Image
            source={require("../../../assets/images/today-task-card.png")}
            style={styles.taskCard}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Bottom Content Section */}
      <SafeAreaView edges={['bottom']} style={styles.contentWrapper}>
        <View style={styles.content}>
          <Text style={styles.title}>Plan for Success</Text>
          <Text style={styles.subtitle}>
            Your Journey Starts Here! Earn achievement badges as you conquer
            your tasks. Let's get started!
          </Text>

          {/* Pagination Dots */}
          <View style={styles.dotsContainer}>
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={[styles.dot, styles.dotActive]} />
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonGroup}>
            <AppButton title="Next" 
                          onPress={() => {
                            dispatch(finishOnboarding());
                            router.push('/(onboarding)/final');
                          }} />
            
            <Pressable 
              style={styles.skipButton}
              onPress={() => dispatch(finishOnboarding())}
              android_ripple={{ color: "#E0E7FF" }}
            >
              <Text style={styles.skipText}>Skip</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const createStyles = (layout: ReturnType<typeof useMemo<{
  cardAreaHeight: number;
  cardOverlap: number;
  achievementWidth: number;
  achievementHeight: number;
  achievementLeft: number;
  taskWidth: number;
  taskHeight: number;
  taskRight: number;
}>>) =>
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
      top: -30,
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
      borderRadius: 32,
    },

    content: {
      backgroundColor: "#FFFFFF",
      borderTopLeftRadius: 32,
      borderTopRightRadius: 32,
      paddingTop: 36,
      paddingHorizontal: 28,
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

    dotsContainer: {
      flexDirection: "row",
      gap: 8,
      marginBottom: 24,
    },

    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: "#D1D5DB",
    },

    dotActive: {
      width: 28,
      backgroundColor: "#6366F1",
    },

    buttonGroup: {
      width: "100%",
      gap: 12,
    },

    skipButton: {
      height: 52,
      borderRadius: 26,
      borderWidth: 1,
      borderColor: "#6366F1",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "transparent",
    },

    skipText: {
      fontSize: 16,
      fontWeight: "600",
      color: "#6366F1",
    },
  });
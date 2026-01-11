import { AppButton } from "@/components/common/AppButton";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export const OnboardingScreen: React.FC = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>

      <LinearGradient
        colors={["#8B8DFF", "#6F73FF", "#5B5FFF", "#4F46E5"]}
        locations={[0, 0.35, 0.7, 1]}
        style={StyleSheet.absoluteFill}
      />
      {/* ===== TOP IMAGE ===== */}
      <ImageBackground
        source={require("../../../assets/images/image_5-removebg-preview.png")}
        style={styles.hero}
        resizeMode="cover"
      />

      {/* ===== BOTTOM CARD ===== */}
      <View style={styles.card}>
        {/* Dots */}
        <View style={styles.dots}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        {/* Title */}
        <Text style={styles.title}>TaskFlow</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Create a unique emotional story that{"\n"}
          describes better than words
        </Text>

        {/* Button */}
        <AppButton
          title="Get Started"
          onPress={() => {
              // dispatch(finishOnboarding());
              router.push('/(onboarding)/welcome');
          }}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6366F1",
  },

  /* ===== IMAGE ===== */
  hero: {
    top: 100,
    height: "60%",
    width: "100%",
  },

  /* ===== CARD ===== */
  card: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 48,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 12,
  },

  /* ===== DOTS ===== */
  dots: {
    flexDirection: "row",
    marginBottom: 28,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E5E7EB",
    marginHorizontal: 4,
  },

  dotActive: {
    width: 32,
    backgroundColor: "#6366F1",
  },

  /* ===== TEXT ===== */
  title: {
    fontSize: 46,
    fontWeight: "800",
    color: "#6366F1",
    marginBottom: 20,
    letterSpacing: -1,
  },

  subtitle: {
    fontSize: 16,
    color: "#9CA3AF",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 40,
  },

  /* ===== BUTTON ===== */
  button: {
    width: "100%",
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 10,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
});

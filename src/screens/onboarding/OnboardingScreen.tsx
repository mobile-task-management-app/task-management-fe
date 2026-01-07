import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppButton } from "../../components/common/AppButton";
import { useAppDispatch } from "../../state/hooks";

export const OnboardingScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#7C7FFF', '#5E63FF', '#6366F1']}
        style={styles.gradientBackground}
      >
        {/* Glow effects */}
        <View style={styles.glowTop} />
        <View style={styles.glowBottom} />
      </LinearGradient>

      {/* Bottom Card */}
      <View style={styles.bottomCard}>
        <View style={styles.dotsContainer}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        {/* Title */}
        <Text style={styles.title}>TaskFlow</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Create a unique emotional story that{'\n'}describes better than words
        </Text>

        {/* Get Started Button */}
        <AppButton
          title="Get Started"
          onPress={() => {
              // dispatch(finishOnboarding());
              router.push('/(onboarding)/welcome');
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6366F1',
  },
  gradientBackground: {
    flex: 1,
    position: 'relative',
  },
  glowTop: {
    position: 'absolute',
    top: '20%',
    left: '50%',
    width: 300,
    height: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 150,
    marginLeft: -150,
    opacity: 0.6,
  },
  glowBottom: {
    position: 'absolute',
    bottom: '35%',
    left: '50%',
    width: 300,
    height: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 150,
    marginLeft: -150,
    opacity: 0.6,
  },
  bottomCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#F8F9FF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 32,
    paddingBottom: 48,
    paddingHorizontal: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 32,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D1D5DB',
  },
  dotActive: {
    width: 32,
    backgroundColor: '#6366F1',
  },
  title: {
    fontSize: 48,
    fontWeight: '700',
    color: '#6366F1',
    marginBottom: 24,
    letterSpacing: -1,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 48,
  },
});
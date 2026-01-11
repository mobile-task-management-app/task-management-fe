import { useSignIn } from "@/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Keyboard,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { AppButton } from "../../components/common/AppButton";
import { AppInput } from "../../components/common/AppInput";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";
import { typography } from "../../theme/typography";

interface Props {
  onSuccess?: () => void;
  onForgotPassword?: () => void;
}

export const SignInScreen: React.FC<Props> = ({
  onSuccess,
  onForgotPassword,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [remember, setRemember] = useState(false);

  const { mutate, isPending } = useSignIn();

  const showEvent = Platform.OS === "ios"
  ? "keyboardWillShow"
  : "keyboardDidShow";

const hideEvent = Platform.OS === "ios"
  ? "keyboardWillHide"
  : "keyboardDidHide";


  /* ===== KEYBOARD ANIMATION ===== */
  const keyboardY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const show = Keyboard.addListener(showEvent, (e) => {
      Animated.timing(keyboardY, {
        toValue: -e.endCoordinates.height + 24,
        duration: Platform.OS === "ios" ? 250 : 0,
        useNativeDriver: true,
      }).start();
    });

    const hide = Keyboard.addListener(hideEvent, () => {
      Animated.timing(keyboardY, {
        toValue: 0,
        duration: Platform.OS === "ios" ? 250 : 0,
        useNativeDriver: true,
      }).start();
    });

    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  const handleSignIn = () => {
    Keyboard.dismiss();
    mutate({ email, password }, { onSuccess });
  };

  return (
    <Animated.View
      // style={[
      //   styles.container,
      //   {
      //     transform: [{ translateY: keyboardY }],
      //   },
      // ]}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.title}>Sign In</Text>
        <Text style={styles.subtitle}>Sign in to my account</Text>

        <AppInput
          label="Email"
          placeholder="My email"
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="next"
          value={email}
          onChangeText={setEmail}
          left={<Ionicons name="mail-outline" size={18} color={colors.primary} />}
        />

        <AppInput
          label="Password"
          placeholder="My password"
          secureTextEntry={isHidden}
          value={password}
          returnKeyType="done"
          onSubmitEditing={handleSignIn}
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

        <View style={styles.rowBetween}>
          <Pressable
            style={styles.remember}
            onPress={() => setRemember(!remember)}
          >
            <View
              style={[
                styles.checkbox,
                remember && styles.checkboxActive,
              ]}
            >
              {remember && (
                <Ionicons name="checkmark" size={14} color="#FFF" />
              )}
            </View>
            <Text style={styles.rememberText}>Remember Me</Text>
          </Pressable>

          <Text style={styles.link} onPress={onForgotPassword}>
            Forgot Password
          </Text>
        </View>

        <AppButton
          title="Sign In"
          onPress={handleSignIn}
          // loading={isPending}
          disabled={!email || !password || isPending}
        />
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    paddingBottom: spacing.xl,
  },

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

  checkboxActive: {
    backgroundColor: colors.primary,
  },

  link: {
    color: colors.primary,
    fontWeight: "600",
    fontSize: 13,
  },
});

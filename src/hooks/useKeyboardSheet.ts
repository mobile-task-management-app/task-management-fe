// hooks/useKeyboardSheet.ts
import { useEffect, useRef } from "react";
import { Animated, Keyboard, Platform } from "react-native";

export const useKeyboardSheet = (extraOffset = 16) => {
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const showEvent =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const showSub = Keyboard.addListener(showEvent, (e) => {
      Animated.timing(translateY, {
        toValue: -e.endCoordinates.height + extraOffset,
        duration: Platform.OS === "ios" ? 280 : 0,
        useNativeDriver: true,
      }).start();
    });

    const hideSub = Keyboard.addListener(hideEvent, () => {
      Animated.timing(translateY, {
        toValue: 0,
        duration: Platform.OS === "ios" ? 280 : 0,
        useNativeDriver: true,
      }).start();
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, [extraOffset]);

  return translateY;
};

import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";
import { useAppDispatch } from "../../state/hooks";
import { openCreateModal } from "../../state/uiSlice";

type CreateTabButtonProps = {
  accessibilityState?: { selected?: boolean };
};

export const CreateTabButton: React.FC<CreateTabButtonProps> = () => {
  const dispatch = useAppDispatch();

  return (
    <View style={styles.wrapper}>
      <Pressable
        style={styles.button}
        onPress={() => dispatch(openCreateModal())}
      >
        <Ionicons name="add" size={26} color="#FFFFFF" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: -spacing.xl,
  },
  button: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.shadow,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 6,
  },
});

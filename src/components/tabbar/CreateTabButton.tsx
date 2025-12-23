import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";
import { useUIStore } from "../../state/uiStore";

type CreateTabButtonProps = {
  accessibilityState?: { selected?: boolean };
};

export const CreateTabButton: React.FC<CreateTabButtonProps> = () => {
  const openCreateModal = useUIStore((state) => state.openCreateModal);

  return (
    <View style={styles.wrapper}>
      <Pressable style={styles.button} onPress={openCreateModal}>
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

import React from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";
import { useUIStore } from "../../state/uiStore";
import { MainStackParamList } from "../../navigation/types";

export const CreateActionModal: React.FC = () => {
  const isOpen = useUIStore((state) => state.isCreateModalOpen);
  const closeCreateModal = useUIStore((state) => state.closeCreateModal);
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const handleNavigate = (route: keyof MainStackParamList) => {
    closeCreateModal();
    navigation.navigate(route);
  };

  return (
    <Modal visible={isOpen} transparent animationType="fade">
      <Pressable style={styles.backdrop} onPress={closeCreateModal}>
        <Pressable style={styles.sheet} onPress={() => null}>
          <View style={styles.handle} />
          <Pressable
            style={styles.row}
            onPress={() => handleNavigate("CreateTask")}
          >
            <Ionicons name="create" size={20} color={colors.primary} />
            <Text style={styles.rowText}>Create Task</Text>
          </Pressable>
          <Pressable
            style={styles.row}
            onPress={() => handleNavigate("CreateProject")}
          >
            <Ionicons name="add-circle" size={20} color={colors.primary} />
            <Text style={styles.rowText}>Create Project</Text>
          </Pressable>
          <Pressable style={styles.closeButton} onPress={closeCreateModal}>
            <Ionicons name="close" size={20} color="#FFFFFF" />
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: colors.card,
    padding: spacing.xl,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    gap: spacing.md,
  },
  handle: {
    width: 44,
    height: 5,
    borderRadius: 999,
    backgroundColor: colors.border,
    alignSelf: "center",
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  rowText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
  },
  closeButton: {
    alignSelf: "center",
    marginTop: spacing.lg,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});

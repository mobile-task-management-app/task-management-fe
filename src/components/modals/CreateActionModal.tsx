import React from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { closeCreateModal } from "../../state/uiSlice";

export const CreateActionModal: React.FC = () => {
  const isOpen = useAppSelector((state) => state.ui.isCreateModalOpen);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleNavigate = (route: string) => {
    dispatch(closeCreateModal());
    router.push(route);
  };

  return (
    <Modal visible={isOpen} transparent animationType="fade">
      <Pressable
        style={styles.backdrop}
        onPress={() => dispatch(closeCreateModal())}
      >
        <Pressable style={styles.sheet} onPress={() => null}>
          <View style={styles.handle} />
          <Pressable
            style={styles.row}
            onPress={() => handleNavigate("/create-task")}
          >
            <Ionicons name="create" size={20} color={colors.primary} />
            <Text style={styles.rowText}>Create Task</Text>
          </Pressable>
          <Pressable
            style={styles.row}
            onPress={() => handleNavigate("/create-project")}
          >
            <Ionicons name="add-circle" size={20} color={colors.primary} />
            <Text style={styles.rowText}>Create Project</Text>
          </Pressable>
          <Pressable
            style={styles.closeButton}
            onPress={() => dispatch(closeCreateModal())}
          >
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

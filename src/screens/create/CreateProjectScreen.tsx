import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { AppButton } from "../../components/common/AppButton";
import { AppInput } from "../../components/common/AppInput";
// import { useCreateProject } from "../../hooks/useProjects";
import { useAppDispatch } from "../../state/hooks";
import { addProject } from "../../state/projectsSlice";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";
import { Project } from "../../types/models";

export const CreateProjectScreen: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [showRangePicker, setShowRangePicker] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Hook for API call
  // const { mutate, isPending } = useCreateProject();

  const onStartChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === "android") setShowStartPicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
      if (selectedDate > endDate) {
        setEndDate(selectedDate);
      }
      if (Platform.OS === "android") {
        setShowEndPicker(true);
      }
    }
  };

  const onEndChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === "android") setShowEndPicker(false);
    if (selectedDate) setEndDate(selectedDate);
  };

  const formatDate = (value: Date) =>
    value.toLocaleDateString("en-GB");

  const dateRangeLabel = `${formatDate(startDate)} - ${formatDate(endDate)}`;

  const pickAccentColor = (seed: string) => {
    const palette = ["#F6A6C9", "#B4A6F6", "#FFB169", "#FFD166", "#79D2DE"];
    let hash = 0;
    for (let i = 0; i < seed.length; i += 1) {
      hash = (hash + seed.charCodeAt(i)) % palette.length;
    }
    return palette[hash];
  };

  const handleSave = () => {
    setShowConfirm(true);
  };

  const handleConfirmCreate = () => {
    const projectId = `project-${Date.now()}`;
    const newProject: Project = {
      id: projectId,
      title: title.trim() || "Untitled Project",
      description: description.trim() || undefined,
      tasksCount: 0,
      progress: 0,
      status: "In Progress",
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      accentColor: pickAccentColor(projectId),
    };

    dispatch(addProject(newProject));
    setShowConfirm(false);
    setShowSuccess(true);
  };

  const handleViewProjects = () => {
    setShowSuccess(false);
    setTitle("");
    setDescription("");
    router.replace("/(tabs)/projects");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Create New Project</Text>

      <AppInput
        label="Project Title"
        placeholder="Enter Project Title"
        value={title}
        onChangeText={setTitle}
      />

      <AppInput
        label="Project Description"
        placeholder="Enter Project Description"
        value={description}
        onChangeText={setDescription}
        multiline
        style={styles.descriptionInput}
      />

      <Pressable
        onPress={() => {
          if (Platform.OS === "ios") {
            setShowRangePicker(true);
          } else {
            setShowStartPicker(true);
          }
        }}
      >
        <View pointerEvents="none">
          <AppInput
            label="Due date"
            value={dateRangeLabel}
            placeholder="Select Due date"
            right={
              <Ionicons
                name="calendar-outline"
                size={18}
                color={colors.primary}
              />
            }
          />
        </View>
      </Pressable>

      {/* Android Pickers */}
      {Platform.OS === "android" && showStartPicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          onChange={onStartChange}
        />
      )}
      {Platform.OS === "android" && showEndPicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          minimumDate={startDate}
          onChange={onEndChange}
        />
      )}

      <View style={styles.spacer} />
      <AppButton
        title="Create Project"
        onPress={handleSave}
        // loading={isPending}
        // disabled={!title}
      />

      <Modal visible={showRangePicker} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.iosPickerContainer}>
            <View style={styles.iosToolbar}>
              <Pressable onPress={() => setShowRangePicker(false)}>
                <Text style={styles.doneText}>Done</Text>
              </Pressable>
            </View>
            <View style={styles.rangePickerBlock}>
              <Text style={styles.rangeLabel}>Start date</Text>
              <DateTimePicker
                value={startDate}
                mode="date"
                display="spinner"
                onChange={onStartChange}
              />
            </View>
            <View style={styles.rangePickerBlock}>
              <Text style={styles.rangeLabel}>End date</Text>
              <DateTimePicker
                value={endDate}
                mode="date"
                display="spinner"
                minimumDate={startDate}
                onChange={onEndChange}
              />
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={showConfirm} transparent animationType="fade">
        <Pressable
          style={styles.backdrop}
          onPress={() => setShowConfirm(false)}
        >
          <Pressable style={styles.sheet} onPress={() => null}>
            <View style={styles.sheetIcon}>
              <Ionicons name="calendar" size={26} color="#FFFFFF" />
            </View>
            <Text style={styles.sheetTitle}>Create New Project</Text>
            <Text style={styles.sheetSubtitle}>
              Double-check your project details to ensure everything is
              correct. Do you want to proceed?
            </Text>
            <AppButton title="Yes, Proceed Now" onPress={handleConfirmCreate} />
            <AppButton
              title="No, Let me check"
              variant="outline"
              onPress={() => setShowConfirm(false)}
            />
          </Pressable>
        </Pressable>
      </Modal>

      <Modal visible={showSuccess} transparent animationType="fade">
        <Pressable
          style={styles.backdrop}
          onPress={() => setShowSuccess(false)}
        >
          <Pressable style={styles.sheet} onPress={() => null}>
            <View style={styles.sheetIcon}>
              <Ionicons name="checkmark" size={26} color="#FFFFFF" />
            </View>
            <Text style={styles.sheetTitle}>Project Has Been Created!</Text>
            <Text style={styles.sheetSubtitle}>
              Congratulations! Project has been created! View your project in
              the projects management.
            </Text>
            <AppButton
              title="View Projects Management"
              onPress={handleViewProjects}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.xl,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.lg,
  },
  descriptionInput: {
    minHeight: 110,
    textAlignVertical: "top",
  },
  spacer: {
    flex: 1,
  },
  // iOS Picker Styles
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  iosPickerContainer: {
    backgroundColor: "white",
    paddingBottom: spacing.xl,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  iosToolbar: {
    height: 44,
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  doneText: {
    color: colors.primary,
    fontWeight: "600",
    fontSize: 16,
  },
  rangePickerBlock: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  rangeLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "flex-end",
    padding: spacing.lg,
  },
  sheet: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: spacing.xl,
    gap: spacing.md,
  },
  sheetIcon: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    textAlign: "center",
  },
  sheetSubtitle: {
    fontSize: 13,
    lineHeight: 18,
    color: colors.textMuted,
    textAlign: "center",
  },
});

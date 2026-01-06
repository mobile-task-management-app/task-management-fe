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

import { AppButton } from "../../components/common/AppButton";
import { AppInput } from "../../components/common/AppInput";
// import { useCreateProject } from "../../hooks/useProjects";
import { useCreateProject } from "@/hooks/useProjects";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";

export const CreateProjectScreen: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  // Hook for API call
  const { mutate, isPending } = useCreateProject();

  const onStartChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === "android") setShowStartPicker(false);
    if (selectedDate) setStartDate(selectedDate);
  };

  const onEndChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === "android") setShowEndPicker(false);
    if (selectedDate) setEndDate(selectedDate);
  };

  const handleSave = () => {
    const formattedStartDate = startDate
      ? Math.floor(startDate.getTime() / 1000)
      : undefined;

    const formattedEndDate = endDate
      ? Math.floor(endDate.getTime() / 1000)
      : undefined;

    mutate({
      name: title,
      description,
      start_date: formattedStartDate,
      end_date: formattedEndDate,
    });
  };

  // Helper to render the iOS specific picker container
  const renderIOSPicker = (
    show: boolean,
    setShow: (v: boolean) => void,
    date: Date,
    onChange: any,
    minDate?: Date
  ) => (
    <Modal visible={show} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.iosPickerContainer}>
          <View style={styles.iosToolbar}>
            <Pressable onPress={() => setShow(false)}>
              <Text style={styles.doneText}>Done</Text>
            </Pressable>
          </View>
          <DateTimePicker
            value={date}
            mode="date"
            display="spinner"
            minimumDate={minDate}
            onChange={onChange}
          />
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Create Project</Text>

      <AppInput
        label="Title"
        placeholder="Project title"
        value={title}
        onChangeText={setTitle}
      />

      <AppInput
        label="Description"
        placeholder="Project description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Pressable onPress={() => setShowStartPicker(true)}>
        <View pointerEvents="none">
          <AppInput
            label="Start Date"
            value={startDate?.toLocaleDateString()}
            placeholder="Select Start Date"
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

      <Pressable onPress={() => setShowEndPicker(true)}>
        <View pointerEvents="none">
          <AppInput
            label="End Date"
            value={endDate?.toLocaleDateString()}
            placeholder="Select End Date"
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
          value={endDate || new Date()}
          mode="date"
          onChange={onStartChange}
        />
      )}
      {Platform.OS === "android" && showEndPicker && (
        <DateTimePicker
          value={startDate || new Date()}
          mode="date"
          minimumDate={startDate}
          onChange={onEndChange}
        />
      )}

      {/* iOS Pickers (Wrapped in Modals) */}
      {Platform.OS === "ios" &&
        renderIOSPicker(
          showStartPicker,
          setShowStartPicker,
          startDate || new Date(),
          onStartChange
        )}
      {Platform.OS === "ios" &&
        renderIOSPicker(
          showEndPicker,
          setShowEndPicker,
          endDate || new Date(),
          onEndChange,
          startDate
        )}

      <View style={styles.spacer} />
      <AppButton
        title="Save Project"
        onPress={handleSave}
        // loading={isPending}
        // disabled={!title}
      />
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
});

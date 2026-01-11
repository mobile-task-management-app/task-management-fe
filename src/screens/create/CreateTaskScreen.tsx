import {
  CreateProjectTaskRequestDTO,
  TaskPriority,
  UpdateTaskRequestDTO,
} from "@/api/generated";
import {
  useCreateProjectTask,
  useTaskDetail,
  useUpdateTask,
} from "@/hooks/useTasks";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ImageSourcePropType,
  KeyboardAvoidingView,
  Linking,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppButton } from "../../components/common/AppButton";
import { AppInput } from "../../components/common/AppInput";
import { Card } from "../../components/common/Card";
import { getAttachmentSource } from "../../data/taskAttachments";
// import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";
import { TaskStatus } from "../../types/models";

const STATUS_OPTIONS: TaskStatus[] = ["TODO", "IN_PROGRESS", "DONE"];
const PRIORITY_OPTIONS: TaskPriority[] = ["LOW", "MEDIUM", "HIGH"];
const MAX_ATTACHMENTS = 3;

const formatDate = (date: Date) => date.toISOString();
const formatDateLabel = (value?: string | null) => {
  if (!value) return "";
  const date = new Date(value);
  return date.toLocaleDateString("en-GB");
};

const resolveAttachmentSource = (value: string): ImageSourcePropType => {
  const localSource = getAttachmentSource(value);
  if (localSource) return localSource;
  return { uri: value };
};

const ensurePermission = async (
  type: "camera" | "library"
): Promise<boolean> => {
  const permissionGetter =
    type === "camera"
      ? ImagePicker.getCameraPermissionsAsync
      : ImagePicker.getMediaLibraryPermissionsAsync;
  const permissionRequester =
    type === "camera"
      ? ImagePicker.requestCameraPermissionsAsync
      : ImagePicker.requestMediaLibraryPermissionsAsync;

  const current = await permissionGetter();
  if (current.granted) return true;

  const requested = await permissionRequester();
  if (requested.granted) return true;

  if (!requested.canAskAgain) {
    Alert.alert(
      "Permission required",
      "Please enable access in Settings to continue.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Open Settings",
          onPress: () => Linking.openSettings(),
        },
      ]
    );
  }

  return false;
};

export const CreateTaskScreen: React.FC = () => {
  const router = useRouter();
  // const dispatch = useAppDispatch();
  const { projectId, taskId } = useLocalSearchParams<{
    projectId?: string;
    taskId?: string;
  }>();

  const { data: taskData, isLoading: taskLoading } = useTaskDetail(
    Number(taskId)
  );
  const existingTask = taskData?.data;
  const isEditing = Boolean(taskId);

  const [title, setTitle] = useState(existingTask?.title ?? "");
  const [description, setDescription] = useState(
    existingTask?.description ?? ""
  );
  const [status, setStatus] = useState<TaskStatus | null>(
    existingTask?.status ?? null
  );
  const [priority, setPriority] = useState<TaskPriority | null>(
    existingTask?.priority ?? null
  );
  const [dueDate, setDueDate] = useState<string | null>(
    existingTask?.end_date
      ? new Date(existingTask.end_date).toDateString()
      : null
  );
  const [attachments, setAttachments] = useState<string[]>(
    existingTask?.attachments.map((key) => key.download_url ?? "") ?? []
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStatusPicker, setShowStatusPicker] = useState(false);
  const [showPriorityPicker, setShowPriorityPicker] = useState(false);
  const [showAttachmentPicker, setShowAttachmentPicker] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (existingTask) {
      setTitle(existingTask.title ?? "");
      setDescription(existingTask.description ?? "");
      setStatus(existingTask.status ?? null);
      setPriority(existingTask.priority ?? null);
      setDueDate(
        existingTask.end_date
          ? new Date(existingTask.end_date * 1000).toISOString()
          : null
      );
      setAttachments(
        existingTask.attachments.map((key) => key.download_url ?? "") ?? []
      );
    }
  }, [existingTask]);

  const { mutate, isPending } = useCreateProjectTask(Number(projectId));
  const { mutate: updateMutate, isPending: updatePending } = useUpdateTask(
    Number(taskId)
  );
  const queryClient = useQueryClient();

  const handleBack = () => {
    if (isEditing && taskId) {
      router.replace({
        pathname: "/project/task/[id]",
        params: {
          id: taskId,
          projectId: projectId ?? existingTask?.project_id,
        },
      });
      return;
    }
    if (projectId) {
      router.replace({
        pathname: "/project/[id]",
        params: { id: projectId },
      });
      return;
    }
    router.back();
  };

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    if (Platform.OS === "android") setShowDatePicker(false);
    if (selectedDate) setDueDate(formatDate(selectedDate));
  };

  const addAttachment = (uri: string) => {
    setAttachments((prev) => {
      if (prev.length >= MAX_ATTACHMENTS) return prev;
      return [...prev, uri];
    });
  };

  const handleRemoveAttachment = (key: string) => {
    setAttachments((prev) => prev.filter((item) => item !== key));
  };

  const handlePickFromLibrary = async () => {
    const granted = await ensurePermission("library");
    if (!granted) return;
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });
    if (!result.canceled && result.assets?.[0]?.uri) {
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [],
        { format: ImageManipulator.SaveFormat.JPEG }
      );
      addAttachment(manipulatedImage.uri);
    }
    setShowAttachmentPicker(false);
  };

  const handleTakePhoto = async () => {
    const granted = await ensurePermission("camera");
    if (!granted) return;
    const result = await ImagePicker.launchCameraAsync({
      quality: 0.8,
    });
    if (!result.canceled && result.assets?.[0]?.uri) {
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [],
        { format: ImageManipulator.SaveFormat.JPEG }
      );
      addAttachment(manipulatedImage.uri);
    }
    setShowAttachmentPicker(false);
  };

  const handleSave = () => {
    setShowConfirm(true);
  };

  const handleConfirmCreate = () => {
    if (isEditing) {
      const data: UpdateTaskRequestDTO = {
        title: title.trim() || "Untitled Task",
        description: description.trim() || undefined,
        priority: priority || "LOW",
        status: status || "TODO",
        end_date: dueDate
          ? Math.floor(new Date(dueDate).getTime() / 1000)
          : undefined,
      };
      updateMutate(data, {
        onSuccess: () => {
          // Invalidate task detail and project tasks queries
          queryClient.invalidateQueries({
            queryKey: ["task-detail", Number(taskId)],
          });
          setShowConfirm(false);
          setShowSuccess(true);
        },
        onError: (error) => {
          console.error("Update task failed:", error);
          Alert.alert("Error", "Failed to update task");
        },
      });
    } else {
      const data: CreateProjectTaskRequestDTO = {
        title: title.trim() || "Untitled Task",
        description: description.trim() || undefined,
        priority: priority || "LOW",
        status: status || "TODO",
        category_ids: [],
        end_date: dueDate
          ? Math.floor(new Date(dueDate).getTime() / 1000)
          : undefined,
        attachments: attachments.map((uri, idx) => ({
          name: `attachment-${idx + 1}`,
          size: 0,
          extension:
            uri.includes("Camera") || uri.includes("heic")
              ? "jpg"
              : uri.split(".").pop() || "jpg",
        })),
      };

      mutate(data, {
        onSuccess: async (response) => {
          // Assuming response.data.attachments is array of { upload_url: string }
          if (response.data.attachments && attachments.length > 0) {
            await Promise.all(
              attachments.map(async (uri, index) => {
                const uploadUrl = response.data.attachments[index]?.upload_url;
                if (uploadUrl) {
                  const res = await fetch(uri);
                  const blob = await res.blob();
                  await axios.put(uploadUrl, blob);
                }
              })
            );
          }
          // Invalidate the tasks query to refetch on navigation back
          queryClient.invalidateQueries({
            queryKey: ["project-tasks-search", Number(projectId), {}],
          });
          queryClient.invalidateQueries({
            queryKey: ["tasks-search", {}],
          });
          setShowConfirm(false);
          setShowSuccess(true);
        },
        onError: (error) => {
          console.error("Create task failed:", error);
          Alert.alert("Error", "Failed to create task");
        },
      });
    }
  };

  const handleSuccess = () => {
    setShowSuccess(false);
    handleBack();
  };

  const dueDateLabel = dueDate ? formatDateLabel(dueDate) : "Select Due date";

  if (isEditing && taskLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={handleBack}>
            <Ionicons name="chevron-back" size={20} color={colors.text} />
          </Pressable>
          <Text style={styles.title}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
      >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: spacing.xl,
          paddingBottom: 32,
        }}
      >
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={handleBack}>
          <Ionicons name="chevron-back" size={20} color={colors.text} />
        </Pressable>
        <Text style={styles.title}>
          {isEditing ? "Edit Task" : "Create New Task"}
        </Text>
      </View>

      <Card style={styles.formCard}>
        <Text style={styles.sectionTitle}>Attachment</Text>
        <Text style={styles.sectionSubtitle}>
          Format should be in .jpeg .png less than 5MB
        </Text>
        <View style={styles.attachmentRow}>
          {attachments.map((key) => (
            <View key={key} style={styles.attachmentPreview}>
              <Image
                source={resolveAttachmentSource(key)}
                style={styles.attachmentImage}
              />
              <Pressable
                style={styles.removeBadge}
                onPress={() => handleRemoveAttachment(key)}
              >
                <Ionicons name="close" size={12} color="#FFFFFF" />
              </Pressable>
            </View>
          ))}
          {Array.from({
            length: Math.max(MAX_ATTACHMENTS - attachments.length, 0),
          }).map((_, index) => (
            <Pressable
              key={`empty-${index}`}
              style={[
                styles.attachmentBox,
                // !canAddMore && styles.attachmentBoxDisabled,
              ]}
              onPress={() => {
                setShowAttachmentPicker(true);
              }}
            >
              <Ionicons
                name="cloud-upload-outline"
                size={20}
                color={colors.primary}
              />
            </Pressable>
          ))}
        </View>

        <AppInput
          label="Task Title"
          placeholder="Enter Task Title"
          value={title}
          onChangeText={setTitle}
        />
        <AppInput
          label="Task Description"
          placeholder="Enter Task Description"
          value={description}
          onChangeText={setDescription}
          multiline
          style={styles.descriptionInput}
          returnKeyType="done"
          blurOnSubmit
        />

        <Pressable onPress={() => setShowStatusPicker(true)}>
          <View pointerEvents="none">
            <AppInput
              label="Status"
              placeholder="Select Status"
              value={status ?? ""}
              right={
                <Ionicons
                  name="chevron-down"
                  size={16}
                  color={colors.textMuted}
                />
              }
            />
          </View>
        </Pressable>

        <Pressable onPress={() => setShowPriorityPicker(true)}>
          <View pointerEvents="none">
            <AppInput
              label="Priority"
              placeholder="Select Priority"
              value={priority ?? ""}
              right={
                <Ionicons
                  name="chevron-down"
                  size={16}
                  color={colors.textMuted}
                />
              }
            />
          </View>
        </Pressable>

        <Pressable onPress={() => setShowDatePicker(true)}>
          <View pointerEvents="none">
            <AppInput
              label="Due date"
              placeholder="Select Due date"
              value={dueDate ? dueDateLabel : ""}
              right={
                <Ionicons
                  name="calendar-outline"
                  size={16}
                  color={colors.textMuted}
                />
              }
            />
          </View>
        </Pressable>
      </Card>

      <AppButton
        title={isEditing ? "Save Task" : "Create Task"}
        onPress={handleSave}
      />
      </ScrollView>
      

      {Platform.OS === "android" && showDatePicker && (
        <DateTimePicker
          value={dueDate ? new Date(dueDate) : new Date()}
          mode="date"
          onChange={handleDateChange}
        />
      )}

      {Platform.OS === "ios" && (
        <Modal visible={showDatePicker} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.iosPickerContainer}>
              <DateTimePicker
                value={dueDate ? new Date(dueDate) : new Date()}
                mode="date"
                display="spinner"
                onChange={handleDateChange}
              />
              <View style={styles.sheetButtons}>
                <AppButton
                  title="Submit Date"
                  onPress={() => setShowDatePicker(false)}
                />
                <AppButton
                  title="Cancel"
                  variant="outline"
                  onPress={() => setShowDatePicker(false)}
                />
              </View>
            </View>
          </View>
        </Modal>
      )}

      <Modal visible={showAttachmentPicker} transparent animationType="slide">
        <Pressable
          style={styles.backdrop}
          onPress={() => setShowAttachmentPicker(false)}
        >
          <Pressable style={styles.sheet} onPress={() => null}>
            <Text style={styles.sheetTitle}>Attachment</Text>
            <Text style={styles.sheetSubtitle}>Choose the source</Text>
            <AppButton title="Take Photo" onPress={handleTakePhoto} />
            <AppButton
              title="Choose from Library"
              // variant="outline"
              onPress={handlePickFromLibrary}
            />
            <AppButton
              title="Cancel"
              variant="outline"
              onPress={() => setShowAttachmentPicker(false)}
            />
          </Pressable>
        </Pressable>
      </Modal>

      <Modal visible={showStatusPicker} transparent animationType="slide">
        <Pressable
          style={styles.backdrop}
          onPress={() => setShowStatusPicker(false)}
        >
          <Pressable style={styles.sheet} onPress={() => null}>
            <Text style={styles.sheetTitle}>Status</Text>
            <Text style={styles.sheetSubtitle}>Select the status</Text>
            {STATUS_OPTIONS.map((option) => {
              const isSelected = status === option;
              return (
                <Pressable
                  key={option}
                  style={[
                    styles.optionRow,
                    isSelected && styles.optionRowSelected,
                  ]}
                  onPress={() => setStatus(option)}
                >
                  <Text style={styles.optionLabel}>{option}</Text>
                  <View
                    style={[
                      styles.optionDot,
                      isSelected && styles.optionDotSelected,
                    ]}
                  >
                    {isSelected ? (
                      <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                    ) : null}
                  </View>
                </Pressable>
              );
            })}
            <View style={styles.sheetButtonsInline}>
              <AppButton
                title="Cancel"
                variant="outline"
                onPress={() => setShowStatusPicker(false)}
                style={styles.sheetButtonHalf}
              />
              <AppButton
                title="Select"
                onPress={() => setShowStatusPicker(false)}
                style={styles.sheetButtonHalf}
              />
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      <Modal visible={showPriorityPicker} transparent animationType="slide">
        <Pressable
          style={styles.backdrop}
          onPress={() => setShowPriorityPicker(false)}
        >
          <Pressable style={styles.sheet} onPress={() => null}>
            <Text style={styles.sheetTitle}>Priority</Text>
            <Text style={styles.sheetSubtitle}>Select the priority</Text>
            {PRIORITY_OPTIONS.map((option) => {
              const isSelected = priority === option;
              return (
                <Pressable
                  key={option}
                  style={[
                    styles.optionRow,
                    isSelected && styles.optionRowSelected,
                  ]}
                  onPress={() => setPriority(option)}
                >
                  <Text style={styles.optionLabel}>{option}</Text>
                  <View
                    style={[
                      styles.optionDot,
                      isSelected && styles.optionDotSelected,
                    ]}
                  >
                    {isSelected ? (
                      <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                    ) : null}
                  </View>
                </Pressable>
              );
            })}
            <View style={styles.sheetButtonsInline}>
              <AppButton
                title="Cancel"
                variant="outline"
                onPress={() => setShowPriorityPicker(false)}
                style={styles.sheetButtonHalf}
              />
              <AppButton
                title="Select"
                onPress={() => setShowPriorityPicker(false)}
                style={styles.sheetButtonHalf}
              />
            </View>
          </Pressable>
        </Pressable>
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
            <Text style={[styles.sheetTitle, styles.centerText]}>
              {isEditing ? "Update Task" : "Create New Task"}
            </Text>
            <Text style={[styles.sheetSubtitle, styles.centerText]}>
              Double-check your task details to ensure everything is correct. Do
              you want to proceed?
            </Text>
            <AppButton
              title={isEditing ? "Yes, Update Now" : "Yes, Proceed Now"}
              onPress={handleConfirmCreate}
            />
            <AppButton
              title="No, Let me check"
              variant="outline"
              onPress={() => setShowConfirm(false)}
            />
          </Pressable>
        </Pressable>
      </Modal>

      <Modal visible={showSuccess} transparent animationType="fade">
        <Pressable style={styles.backdrop} onPress={handleSuccess}>
          <Pressable style={styles.sheet} onPress={() => null}>
            <View style={styles.sheetIcon}>
              <Ionicons name="checkmark" size={26} color="#FFFFFF" />
            </View>
            <Text style={[styles.sheetTitle, styles.centerText]}>
              {isEditing ? "Task Has Been Updated!" : "Task Has Been Created!"}
            </Text>
            <Text style={[styles.sheetSubtitle, styles.centerText]}>
              {isEditing
                ? "Your task changes have been saved."
                : "Congratulations! Task has been created! View your task in the task management."}
            </Text>
            <AppButton
              title={isEditing ? "Back To Task" : "View Task Management"}
              onPress={handleSuccess}
            />
          </Pressable>
        </Pressable>
      </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.card,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
  },
  formCard: {
    padding: spacing.lg,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 4,
    marginBottom: spacing.lg,
  },
  attachmentRow: {
    flexDirection: "row",
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  attachmentBox: {
    flex: 1,
    height: 72,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F3FF",
  },
  attachmentBoxDisabled: {
    opacity: 0.4,
  },
  attachmentPreview: {
    flex: 1,
    height: 72,
    borderRadius: 12,
    overflow: "hidden",
  },
  attachmentImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  removeBadge: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.danger,
    alignItems: "center",
    justifyContent: "center",
  },
  descriptionInput: {
    minHeight: 110,
    textAlignVertical: "top",
  },
  spacer: {
    flex: 1,
  },
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
  sheetButtons: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    gap: spacing.sm,
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
    textAlign: "left",
  },
  sheetSubtitle: {
    fontSize: 13,
    lineHeight: 18,
    color: colors.textMuted,
  },
  centerText: {
    textAlign: "center",
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  optionRowSelected: {
    borderColor: colors.primary,
    backgroundColor: "#F4F0FF",
  },
  optionLabel: {
    fontSize: 14,
    color: colors.text,
  },
  optionDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  optionDotSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  sheetButtonsInline: {
    flexDirection: "row",
    gap: spacing.md,
  },
  sheetButtonHalf: {
    flex: 1,
  },
});

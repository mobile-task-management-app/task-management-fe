import React, { useMemo, useState } from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AppButton } from "../../components/common/AppButton";
import { Card } from "../../components/common/Card";
import { getAttachmentSource } from "../../data/taskAttachments";
import { useAppSelector } from "../../state/hooks";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";

const formatReadableDate = (value: string) => {
  const date = new Date(value);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const resolveAttachmentSource = (value: string): ImageSourcePropType => {
  const localSource = getAttachmentSource(value);
  if (localSource) return localSource;
  return { uri: value };
};

export const TaskDetailScreen: React.FC = () => {
  const router = useRouter();
  const { id, projectId } = useLocalSearchParams<{
    id?: string;
    projectId?: string;
  }>();
  const task = useAppSelector((state) =>
    state.tasks.tasks.find((item) => item.id === id)
  );
  const [activeAttachment, setActiveAttachment] = useState(0);

  const attachmentSources = useMemo(
    () => task?.attachments.map((key) => resolveAttachmentSource(key)) ?? [],
    [task?.attachments]
  );

  const handleBack = () => {
    const targetProject = projectId ?? task?.projectId;
    if (targetProject) {
      router.replace({
        pathname: "/project/[id]",
        params: { id: targetProject },
      });
      return;
    }
    router.back();
  };

  if (!task) {
    return (
      <SafeAreaView style={styles.container}>
        <Pressable style={styles.backButton} onPress={handleBack}>
          <Ionicons name="chevron-back" size={20} color={colors.text} />
        </Pressable>
        <Text style={styles.title}>Task not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={handleBack}>
          <Ionicons name="chevron-back" size={20} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Task Details</Text>
      </View>

      <Card style={styles.detailCard}>
        <View style={styles.taskHeader}>
          <View>
            <Text style={styles.taskTitle}>{task.title}</Text>
            <Text style={styles.taskMeta}>
              Created {formatReadableDate(task.createdAt)}
            </Text>
          </View>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{task.status}</Text>
          </View>
        </View>

        {attachmentSources.length > 0 ? (
          <>
            <View style={styles.heroImageWrap}>
              <Image
                source={attachmentSources[activeAttachment]}
                style={styles.heroImage}
              />
            </View>
            <View style={styles.thumbnailRow}>
              {attachmentSources.map((source, index) => (
                <Pressable
                  key={`thumb-${index}`}
                  style={[
                    styles.thumbnail,
                    activeAttachment === index && styles.thumbnailActive,
                  ]}
                  onPress={() => setActiveAttachment(index)}
                >
                  <Image source={source} style={styles.thumbnailImage} />
                </Pressable>
              ))}
            </View>
          </>
        ) : null}

        <View style={styles.descriptionBlock}>
          <Text style={styles.descriptionLabel}>Description</Text>
          <Text style={styles.descriptionText}>
            {task.description || "No description provided."}
          </Text>
        </View>

        <View style={styles.metaRow}>
          <View>
            <Text style={styles.metaLabel}>Priority</Text>
            <View style={styles.priorityBadge}>
              <Ionicons name="flag" size={12} color="#FFFFFF" />
              <Text style={styles.priorityText}>{task.priority}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.metaLabel}>Due date</Text>
            <View style={styles.dueDateBadge}>
              <Ionicons name="calendar" size={12} color={colors.primary} />
              <Text style={styles.dueDateText}>
                {task.dueDate ? formatReadableDate(task.dueDate) : "No due date"}
              </Text>
            </View>
          </View>
        </View>
      </Card>

      <View style={styles.spacer} />
      <AppButton
        title="Edit Task"
        onPress={() =>
          router.push({
            pathname: "/edit-task",
            params: { taskId: task.id, projectId: task.projectId },
          })
        }
      />
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
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
    marginTop: spacing.lg,
  },
  detailCard: {
    gap: spacing.lg,
  },
  taskHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
  },
  taskMeta: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 4,
  },
  statusBadge: {
    backgroundColor: "#F2EDFF",
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 999,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.primary,
  },
  heroImageWrap: {
    width: "100%",
    height: 200,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: colors.border,
  },
  heroImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  thumbnailRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  thumbnail: {
    width: 62,
    height: 62,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.border,
  },
  thumbnailActive: {
    borderColor: colors.primary,
  },
  thumbnailImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  descriptionBlock: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: spacing.md,
  },
  descriptionLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.textMuted,
  },
  descriptionText: {
    marginTop: spacing.sm,
    fontSize: 13,
    color: colors.text,
    lineHeight: 18,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  metaLabel: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
  priorityBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#FF6B6B",
    borderRadius: 999,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  priorityText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  dueDateBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#F2EDFF",
    borderRadius: 999,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  dueDateText: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.primary,
  },
  spacer: {
    flex: 1,
  },
});

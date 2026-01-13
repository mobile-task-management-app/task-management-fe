import { useGetProjectDetail } from "@/hooks/useProjects";
import { useSearchProjectTasks } from "@/hooks/useTasks";
import { Ionicons } from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { AppButton } from "../../components/common/AppButton";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";

const FILTERS = ["All", "In Progress", "Finish"] as const;

type FilterValue = (typeof FILTERS)[number];

type SummaryCounts = {
  todo: number;
  inProgress: number;
  done: number;
};

const formatDueDateLabel = (value?: string) => {
  if (!value) return "";
  const date = new Date(value);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });
};

const getProgressForStatus = (status: string) => {
  if (status === "DONE") return 1;
  if (status === "IN_PROGRESS") return 0.6;
  return 0.2;
};

export const ProjectDetailScreen: React.FC = () => {
  
  const queryClient = useQueryClient();
  const router = useRouter();
  const { id: projectId } = useLocalSearchParams<{ id?: string }>();
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState<FilterValue>("In Progress");

  const { data: projectData, isLoading: projectLoading } = useGetProjectDetail(
    projectId || ""
  );

  const { data: tasksData, isLoading: tasksLoading } = useSearchProjectTasks(
    Number(projectId),
    {}
  );

  const tasks = tasksData?.data.tasks || [];
  const project = projectData?.data;

  const summary = useMemo<SummaryCounts>(() => {
    return tasks.reduce(
      (acc, task) => {
        if (task.status === "TODO") acc.todo += 1;
        if (task.status === "IN_PROGRESS") acc.inProgress += 1;
        if (task.status === "DONE") acc.done += 1;
        return acc;
      },
      { todo: 0, inProgress: 0, done: 0 }
    );
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    if (filter === "All") return tasks;
    if (filter === "Finish") {
      return tasks.filter((task) => task.status === "DONE");
    }
    return tasks.filter((task) => task.status === "IN_PROGRESS");
  }, [filter, tasks]);

  const headerHeight = Math.max(height * 0.2, 260);

  useFocusEffect(
    React.useCallback(() => {
      queryClient.invalidateQueries({
        queryKey: ["project-tasks", Number(projectId)],
      });
    }, [projectId])
  );

  if (projectLoading || tasksLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.fallbackTitle}>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (!project) {
    return (
      <SafeAreaView style={styles.container}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={20} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.fallbackTitle}>Project not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]}>
      <View style={styles.root}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: 120 }]}
        >
          <LinearGradient
            colors={["#6D5DF6", "#7A6AF8"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[
              styles.header,
              { height: headerHeight, paddingTop: insets.top + spacing.lg },
            ]}
          >
            <Pressable style={styles.backButton} onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={20} color="#FFFFFF" />
            </Pressable>
            <View style={styles.headerContent}>
              <View style={styles.headerTextBlock}>
                <Text style={styles.headerTitle}>{project.name}</Text>
                <Text style={styles.headerSubtitle}>
                  Let's tackle your to do list
                </Text>
              </View>
              <Image
                source={require("../../../assets/images/project_detail.png")}
                style={styles.headerImage}
                resizeMode="contain"
              />
            </View>
          </LinearGradient>

          <SummaryCard summary={summary} />

          <FilterChips
            filter={filter}
            onChange={setFilter}
            counts={{
              all: tasks.length,
              inProgress: summary.inProgress,
              finish: summary.done,
            }}
          />

          {filteredTasks.length === 0 ? (
            <View style={styles.emptyCard}>
              <Ionicons name="document-text" size={42} color={colors.border} />
              <Text style={styles.emptyTitle}>No Tasks Assigned</Text>
              <Text style={styles.emptySubtitle}>
                It looks like you don't have any tasks assigned to you right
                now.
              </Text>
            </View>
          ) : (
            <View style={styles.taskList}>
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onPress={() =>
                    router.replace({
                      pathname: "/project/task/[id]",
                      params: { id: task.id, projectId: project.id },
                    })
                  }
                />
              ))}
            </View>
          )}
        </ScrollView>

        <View
          style={[styles.footer, { paddingBottom: insets.bottom + spacing.md }]}
        >
          <AppButton
            title="Create Task"
            onPress={() =>
              router.replace({
                pathname: "/create-task",
                params: { projectId: project.id },
              })
            }
            style={styles.cta}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const SummaryCard = ({ summary }: { summary: SummaryCounts }) => {
  return (
    <View style={styles.summaryCard}>
      <Text style={styles.summaryTitle}>Summary of Your Work</Text>
      <Text style={styles.summarySubtitle}>Your current task progress</Text>
      <View style={styles.summaryRow}>
        <SummaryItem label="To Do" value={summary.todo} color="#7C5CFF" />
        <SummaryItem
          label="In Progress"
          value={summary.inProgress}
          color="#F59E0B"
        />
        <SummaryItem label="Done" value={summary.done} color="#22C55E" />
      </View>
    </View>
  );
};

const SummaryItem = ({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) => {
  return (
    <View style={styles.summaryItem}>
      <View style={[styles.summaryIcon, { backgroundColor: color }]}>
        <Ionicons name="ellipse" size={12} color="#FFFFFF" />
      </View>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={styles.summaryValue}>{value}</Text>
    </View>
  );
};

const FilterChips = ({
  filter,
  onChange,
  counts,
}: {
  filter: FilterValue;
  onChange: (value: FilterValue) => void;
  counts: { all: number; inProgress: number; finish: number };
}) => {
  return (
    <View style={styles.filterRow}>
      {FILTERS.map((item) => {
        const active = filter === item;
        const count =
          item === "All"
            ? counts.all
            : item === "In Progress"
              ? counts.inProgress
              : counts.finish;
        return (
          <Pressable
            key={item}
            style={[styles.filterChip, active && styles.filterChipActive]}
            onPress={() => onChange(item)}
          >
            <Text
              style={[styles.filterText, active && styles.filterTextActive]}
            >
              {item}
            </Text>
            <View
              style={[styles.filterBadge, active && styles.filterBadgeActive]}
            >
              <Text
                style={[
                  styles.filterBadgeText,
                  active && styles.filterBadgeTextActive,
                ]}
              >
                {count}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

const TaskCard = ({ task, onPress }: { task: any; onPress: () => void }) => {
  return (
    <Pressable style={styles.taskCard} onPress={onPress}>
      <View style={styles.taskHeader}>
        <View style={styles.taskTitleRow}>
          <View style={styles.taskIcon}>
            <Ionicons name="flash" size={12} color="#FFFFFF" />
          </View>
          <Text style={styles.taskTitle}>{task.title}</Text>
        </View>
        <View style={styles.taskStatus}>
          <Text style={styles.taskStatusText}>{task.status}</Text>
        </View>
      </View>
      <View style={styles.taskMetaRow}>
        <View style={styles.priorityPill}>
          <Ionicons name="flag" size={12} color="#FFFFFF" />
          <Text style={styles.priorityText}>{task.priority}</Text>
        </View>
        {task.dueDate ? (
          <View style={styles.dueDateRow}>
            <Ionicons name="calendar" size={12} color="#7C5CFF" />
            <Text style={styles.dueDateText}>
              {formatDueDateLabel(task.dueDate)}
            </Text>
          </View>
        ) : null}
      </View>
      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            { width: `${getProgressForStatus(task.status) * 100}%` },
          ]}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  root: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  header: {
    paddingHorizontal: spacing.xl,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    justifyContent: "flex-end",
    paddingBottom: spacing.xxl,
  },
  backButton: {
    position: "absolute",
    left: spacing.xl,
    top: 80,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTextBlock: {
    flex: 1,
    paddingRight: spacing.md,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  headerSubtitle: {
    fontSize: 13,
    color: "rgba(255,255,255,0.8)",
    marginTop: 6,
  },
  headerImage: {
    width: 110,
    height: 110,
  },
  summaryCard: {
    marginHorizontal: spacing.xl,
    marginTop: -spacing.xl,
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: spacing.lg,
    shadowColor: colors.shadow,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.text,
  },
  summarySubtitle: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 4,
  },
  summaryRow: {
    flexDirection: "row",
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  summaryItem: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: spacing.md,
    backgroundColor: "#FFFFFF",
    gap: 6,
  },
  summaryIcon: {
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  summaryLabel: {
    fontSize: 11,
    color: colors.textMuted,
  },
  summaryValue: {
    fontSize: 19,
    fontWeight: "700",
    color: colors.text,
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacing.sm,
    marginTop: spacing.xl,
    marginHorizontal: spacing.xl,
    padding: spacing.sm,
    backgroundColor: "#EEF1F8",
    borderRadius: 999,
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "transparent",
  },
  filterChipActive: {
    backgroundColor: "#6D5DF6",
  },
  filterText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.textMuted,
  },
  filterTextActive: {
    color: "#FFFFFF",
  },
  filterBadge: {
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#D9DCEF",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  filterBadgeActive: {
    backgroundColor: "#FFFFFF",
  },
  filterBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.textMuted,
  },
  filterBadgeTextActive: {
    color: "#6D5DF6",
  },
  taskList: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },
  taskCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: spacing.lg,
    shadowColor: colors.shadow,
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 2,
    gap: spacing.md,
  },
  taskHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    flex: 1,
  },
  taskIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#6D5DF6",
    alignItems: "center",
    justifyContent: "center",
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
    flexShrink: 1,
  },
  taskStatus: {
    backgroundColor: "#ECEBFF",
    borderRadius: 999,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  taskStatusText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#6D5DF6",
  },
  taskMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priorityPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "#FF6B6B",
  },
  priorityText: {
    fontSize: 10,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  dueDateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  dueDateText: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: "600",
  },
  progressTrack: {
    height: 6,
    borderRadius: 999,
    backgroundColor: "#E5E7EB",
    overflow: "hidden",
  },
  progressFill: {
    height: 6,
    borderRadius: 999,
    backgroundColor: "#6D5DF6",
  },
  emptyCard: {
    marginTop: spacing.lg,
    marginHorizontal: spacing.xl,
    padding: spacing.lg,
    backgroundColor: colors.card,
    borderRadius: 20,
    alignItems: "center",
    gap: spacing.sm,
    shadowColor: colors.shadow,
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 2,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
  },
  emptySubtitle: {
    fontSize: 12,
    color: colors.textMuted,
    textAlign: "center",
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    backgroundColor: "rgba(246,247,251,0.95)",
  },
  cta: {
    borderRadius: 999,
    minHeight: 56,
  },
  fallbackTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    marginTop: spacing.xl,
  },
});

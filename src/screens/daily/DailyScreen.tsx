import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useAppSelector } from "../../state/hooks";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";
import { ProjectTask, TaskPriority } from "../../types/models";

const PRIMARY = "#6D5DF6";
const PRIORITY_ORDER: Record<TaskPriority, number> = {
  High: 0,
  Medium: 1,
  Low: 2,
};

const mockTasks: ProjectTask[] = [
  {
    id: "task-101",
    projectId: "project-1",
    title: "Wiring Dashboard Analytics",
    description: "",
    status: "In Progress",
    priority: "High",
    dueDate: new Date().toISOString(),
    attachments: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: "task-102",
    projectId: "project-1",
    title: "API Dashboard Analytics Integration",
    description: "",
    status: "In Progress",
    priority: "High",
    dueDate: new Date().toISOString(),
    attachments: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: "task-103",
    projectId: "project-2",
    title: "Prepare onboarding copy",
    description: "",
    status: "To do",
    priority: "Medium",
    dueDate: new Date().toISOString(),
    attachments: [],
    createdAt: new Date().toISOString(),
  },
];

const VIEW_OPTIONS = ["Daily", "Monthly"] as const;

type ViewMode = (typeof VIEW_OPTIONS)[number];

type CalendarDay = {
  date: Date;
  isCurrentMonth: boolean;
};

const toDateKey = (date: Date) =>
  date.toISOString().split("T")[0];

const formatHeadline = (date: Date) =>
  date.toLocaleDateString("en-GB", {
    month: "long",
    day: "2-digit",
  });

const formatDayLabel = (date: Date) =>
  date.toLocaleDateString("en-GB", { weekday: "short" });

const formatMonthTitle = (date: Date) =>
  date.toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });

const getDateRange = (center: Date) => {
  return [-2, -1, 0, 1, 2].map((offset) => {
    const date = new Date(center);
    date.setDate(center.getDate() + offset);
    return date;
  });
};

const buildMonthMatrix = (monthDate: Date) => {
  const start = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
  const end = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0);
  const startDay = (start.getDay() + 6) % 7;
  const daysInMonth = end.getDate();

  const days: CalendarDay[] = [];

  for (let i = startDay; i > 0; i -= 1) {
    const date = new Date(start);
    date.setDate(start.getDate() - i);
    days.push({ date, isCurrentMonth: false });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    days.push({
      date: new Date(monthDate.getFullYear(), monthDate.getMonth(), day),
      isCurrentMonth: true,
    });
  }

  const remaining = 7 - (days.length % 7 || 7);
  for (let i = 1; i <= remaining; i += 1) {
    const date = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, i);
    days.push({ date, isCurrentMonth: false });
  }

  const weeks: CalendarDay[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
};

const resolveTaskDate = (task: ProjectTask) =>
  task.dueDate ? new Date(task.dueDate) : new Date(task.createdAt);

export const DailyScreen: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const storeTasks = useAppSelector((state) => state.tasks.tasks);
  const tasks = storeTasks.length > 0 ? storeTasks : mockTasks;

  const [viewMode, setViewMode] = useState<ViewMode>("Daily");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );

  const selectedKey = toDateKey(selectedDate);

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => toDateKey(resolveTaskDate(task)) === selectedKey)
      .sort((a, b) => {
        const priorityDiff =
          PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
        if (priorityDiff !== 0) return priorityDiff;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [tasks, selectedKey]);

  const dayStrip = useMemo(() => getDateRange(selectedDate), [selectedDate]);
  const calendarWeeks = useMemo(
    () => buildMonthMatrix(calendarMonth),
    [calendarMonth]
  );

  const onPickerChange = (event: DateTimePickerEvent, value?: Date) => {
    if (Platform.OS === "android") setShowPicker(false);
    if (value) {
      setSelectedDate(value);
      setCalendarMonth(new Date(value.getFullYear(), value.getMonth(), 1));
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + spacing.xl }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Pressable style={styles.circleButton} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={18} color={PRIMARY} />
          </Pressable>
          <Text style={styles.headerTitle}>
            {viewMode === "Daily" ? "Today Task" : "Monthly Task"}
          </Text>
          <Pressable
            style={styles.circleButton}
            onPress={() => setShowPicker(true)}
          >
            <Ionicons name="calendar" size={18} color={PRIMARY} />
          </Pressable>
        </View>

        <View style={styles.headlineRow}>
          <View>
            <Text style={styles.headlineTitle}>
              {formatHeadline(selectedDate)} ✍️
            </Text>
            <Text style={styles.headlineSubtitle}>
              {filteredTasks.length} task today
            </Text>
          </View>
        </View>

        <View style={styles.viewToggle}>
          {VIEW_OPTIONS.map((option) => (
            <Pressable
              key={option}
              style={[
                styles.viewTogglePill,
                viewMode === option && styles.viewTogglePillActive,
              ]}
              onPress={() => setViewMode(option)}
            >
              <Text
                style={[
                  styles.viewToggleText,
                  viewMode === option && styles.viewToggleTextActive,
                ]}
              >
                {option}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.dayStrip}>
          {dayStrip.map((date) => {
            const active = toDateKey(date) === selectedKey;
            return (
              <Pressable
                key={date.toISOString()}
                style={[styles.dayCard, active && styles.dayCardActive]}
                onPress={() => setSelectedDate(date)}
              >
                <Text style={[styles.dayNumber, active && styles.dayActiveText]}>
                  {date.getDate()}
                </Text>
                <Text style={[styles.dayLabel, active && styles.dayActiveText]}>
                  {formatDayLabel(date)}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {viewMode === "Monthly" ? (
          <View style={styles.calendarCard}>
            <View style={styles.calendarHeader}>
              <Pressable
                style={styles.calendarArrow}
                onPress={() =>
                  setCalendarMonth(
                    new Date(
                      calendarMonth.getFullYear(),
                      calendarMonth.getMonth() - 1,
                      1
                    )
                  )
                }
              >
                <Ionicons name="chevron-back" size={16} color={PRIMARY} />
              </Pressable>
              <Text style={styles.calendarTitle}>
                {formatMonthTitle(calendarMonth)}
              </Text>
              <Pressable
                style={styles.calendarArrow}
                onPress={() =>
                  setCalendarMonth(
                    new Date(
                      calendarMonth.getFullYear(),
                      calendarMonth.getMonth() + 1,
                      1
                    )
                  )
                }
              >
                <Ionicons name="chevron-forward" size={16} color={PRIMARY} />
              </Pressable>
            </View>
            <View style={styles.calendarWeekRow}>
              {"MTWTFSS".split("").map((label) => (
                <Text key={label} style={styles.calendarWeekLabel}>
                  {label}
                </Text>
              ))}
            </View>
            {calendarWeeks.map((week, index) => (
              <View key={`week-${index}`} style={styles.calendarWeekRow}>
                {week.map((day) => {
                  const active = toDateKey(day.date) === selectedKey;
                  return (
                    <Pressable
                      key={day.date.toISOString()}
                      style={[
                        styles.calendarDay,
                        active && styles.calendarDayActive,
                      ]}
                      onPress={() => setSelectedDate(day.date)}
                    >
                      <Text
                        style={[
                          styles.calendarDayText,
                          !day.isCurrentMonth && styles.calendarDayMuted,
                          active && styles.calendarDayTextActive,
                        ]}
                      >
                        {day.date.getDate()}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            ))}
          </View>
        ) : null}

        <View style={styles.taskList}>
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onPress={() =>
                router.push({
                  pathname: "/project/task/[id]",
                  params: { id: task.id, projectId: task.projectId },
                })
              }
            />
          ))}
        </View>
      </ScrollView>

      {Platform.OS === "android" && showPicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          onChange={onPickerChange}
        />
      )}

      {Platform.OS === "ios" && (
        <Modal visible={showPicker} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.pickerSheet}>
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="spinner"
                onChange={onPickerChange}
              />
              <Pressable
                style={styles.pickerDone}
                onPress={() => setShowPicker(false)}
              >
                <Text style={styles.pickerDoneText}>Done</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

const TaskCard = ({
  task,
  onPress,
}: {
  task: ProjectTask;
  onPress: () => void;
}) => {
  return (
    <Pressable style={styles.taskCard} onPress={onPress}>
      <View style={styles.taskHeader}>
        <View style={styles.taskTitleRow}>
          <View style={styles.taskIcon}>
            <Ionicons name="flash" size={12} color="#FFFFFF" />
          </View>
          <Text style={styles.taskTitle} numberOfLines={2}>
            {task.title}
          </Text>
        </View>
        <View style={styles.statusPill}>
          <Text style={styles.statusText}>{task.status}</Text>
        </View>
      </View>
      <View style={styles.taskMetaRow}>
        <View
          style={[
            styles.priorityPill,
            task.priority === "Medium" && styles.priorityMedium,
            task.priority === "Low" && styles.priorityLow,
          ]}
        >
          <Ionicons name="flag" size={12} color="#FFFFFF" />
          <Text style={styles.priorityText}>{task.priority}</Text>
        </View>
        {task.dueDate ? (
          <View style={styles.dueDateRow}>
            <Ionicons name="calendar" size={12} color={PRIMARY} />
            <Text style={styles.dueDateText}>
              {new Date(task.dueDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
              })}
            </Text>
          </View>
        ) : null}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
  },
  circleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.card,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.shadow,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
  },
  headlineRow: {
    paddingHorizontal: spacing.xl,
    marginTop: spacing.xl,
  },
  headlineTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text,
  },
  headlineSubtitle: {
    marginTop: 4,
    color: colors.textMuted,
  },
  viewToggle: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.lg,
    paddingHorizontal: spacing.xl,
  },
  viewTogglePill: {
    paddingVertical: 8,
    paddingHorizontal: spacing.lg,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
  },
  viewTogglePillActive: {
    backgroundColor: PRIMARY,
    borderColor: PRIMARY,
  },
  viewToggleText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.textMuted,
  },
  viewToggleTextActive: {
    color: "#FFFFFF",
  },
  dayStrip: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: spacing.xl,
    marginTop: spacing.lg,
  },
  dayCard: {
    width: 60,
    height: 82,
    borderRadius: 18,
    backgroundColor: colors.card,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  dayCardActive: {
    backgroundColor: PRIMARY,
    borderColor: PRIMARY,
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
  },
  dayLabel: {
    fontSize: 12,
    color: colors.textMuted,
  },
  dayActiveText: {
    color: "#FFFFFF",
  },
  calendarCard: {
    marginTop: spacing.xl,
    marginHorizontal: spacing.xl,
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: spacing.lg,
    shadowColor: colors.shadow,
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 2,
  },
  calendarHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  calendarTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: PRIMARY,
  },
  calendarArrow: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#F4F2FF",
    alignItems: "center",
    justifyContent: "center",
  },
  calendarWeekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  calendarWeekLabel: {
    width: 28,
    textAlign: "center",
    color: colors.textMuted,
    fontSize: 11,
  },
  calendarDay: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  calendarDayActive: {
    backgroundColor: "#ECEBFF",
  },
  calendarDayText: {
    fontSize: 11,
    color: colors.text,
  },
  calendarDayMuted: {
    color: colors.textMuted,
  },
  calendarDayTextActive: {
    color: PRIMARY,
    fontWeight: "700",
  },
  taskList: {
    marginTop: spacing.xl,
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
    alignItems: "center",
    justifyContent: "space-between",
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
    backgroundColor: PRIMARY,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
    flexShrink: 1,
  },
  statusPill: {
    backgroundColor: "#ECEBFF",
    borderRadius: 999,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "600",
    color: PRIMARY,
  },
  taskMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  priorityMedium: {
    backgroundColor: "#F59E0B",
  },
  priorityLow: {
    backgroundColor: "#22C55E",
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
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  pickerSheet: {
    backgroundColor: colors.card,
    paddingBottom: spacing.xl,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  pickerDone: {
    alignSelf: "center",
    marginTop: spacing.md,
  },
  pickerDoneText: {
    color: PRIMARY,
    fontWeight: "600",
  },
});

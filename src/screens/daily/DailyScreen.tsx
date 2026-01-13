import { ProjectTask, TaskPriority } from "@/types/models";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useRef, useState } from "react";
import {
  Animated,
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
import { useSearchTasks } from "../../hooks/useTasks";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";

/* ================= CONSTANTS ================= */

const PRIMARY = "#6D5DF6";
const PRIORITY_ORDER: Record<TaskPriority, number> = {
  HIGH: 0,
  MEDIUM: 1,
  LOW: 2,
};

const VIEW_OPTIONS = ["Daily", "Monthly"] as const;

const toKey = (d: Date) => d.toISOString().split("T")[0];

const formatHeadline = (d: Date) =>
  d.toLocaleDateString("en-GB", { month: "long", day: "2-digit" });

const toDateKey = (date: Date) => date.toISOString().split("T")[0];
const formatDayLabel = (d: Date) =>
  d.toLocaleDateString("en-GB", { weekday: "short" });

const formatMonthTitle = (d: Date) =>
  d.toLocaleDateString("en-GB", { month: "long", year: "numeric" });

const getDateRange = (center: Date) =>
  [-2, -1, 0, 1, 2].map((o) => {
    const d = new Date(center);
    d.setDate(center.getDate() + o);
    return d;
  });
const resolveTaskDate = (task: ProjectTask) =>
  task.dueDate ? new Date(task.dueDate) : new Date(task.createdAt);

const buildMonthMatrix = (month: Date) => {
  const start = new Date(month.getFullYear(), month.getMonth(), 1);
  const end = new Date(month.getFullYear(), month.getMonth() + 1, 0);
  const startDay = (start.getDay() + 6) % 7;

  const days: { date: Date; isCurrentMonth: boolean }[] = [];

  for (let i = startDay; i > 0; i--) {
    const d = new Date(start);
    d.setDate(start.getDate() - i);
    days.push({ date: d, isCurrentMonth: false });
  }

  for (let d = 1; d <= end.getDate(); d++) {
    days.push({
      date: new Date(month.getFullYear(), month.getMonth(), d),
      isCurrentMonth: true,
    });
  }

  while (days.length % 7 !== 0) {
    const d = new Date(end);
    d.setDate(end.getDate() + (days.length % 7));
    days.push({ date: d, isCurrentMonth: false });
  }

  return Array.from({ length: days.length / 7 }, (_, i) =>
    days.slice(i * 7, i * 7 + 7)
  );
};

/* ================= COMPONENT ================= */

export const DailyScreen: React.FC = () => {
  const insets = useSafeAreaInsets();

  const [view, setView] = useState<"Daily" | "Monthly">("Daily");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [month, setMonth] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );
  const selectedKey = toKey(selectedDate);

  /* ===== Animation ===== */
  const dailyOpacity = useRef(new Animated.Value(1)).current;
  const monthlyOpacity = useRef(new Animated.Value(0)).current;

  const { data: taskData } = useSearchTasks({});
  const tasks = taskData?.data.tasks || [];
  tasks.forEach((t) => {
    console.log(
      "Task due date:",
      t.end_date ? new Date(t.end_date * 1000) : "No due date",
      "task name",
      t.title
    );
  });
  const toggleView = () => {
    const toMonthly = view === "Daily";
    setView(toMonthly ? "Monthly" : "Daily");

    Animated.parallel([
      Animated.timing(dailyOpacity, {
        toValue: toMonthly ? 0 : 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(monthlyOpacity, {
        toValue: toMonthly ? 1 : 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  };

  /* ===== DATA ===== */

  const tasksToday = tasks.filter(
    (t) => t.end_date && toKey(new Date(t.end_date * 1000)) === selectedKey
  );

  const taskMap = useMemo(() => {
    const map: Record<string, boolean> = {};
    tasks.forEach((t) => {
      map[
        toKey(t.end_date ? new Date(t.end_date * 1000) : new Date(t.created_at))
      ] = true;
    });
    return map;
  }, []);

  const dayStrip = getDateRange(selectedDate);
  const weeks = buildMonthMatrix(month);

  /* ================= RENDER ================= */

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: insets.bottom + spacing.xl,
        }}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View style={{ width: 40 }} />
          <Text style={styles.headerTitle}>
            {view === "Daily" ? "Today Task" : "Monthly Task"}
          </Text>
          <Pressable style={styles.circleButton} onPress={toggleView}>
            <Ionicons name="calendar" size={18} color={PRIMARY} />
          </Pressable>
        </View>

        {/* HEADLINE */}
        <View style={styles.headlineRow}>
          <Text style={styles.headlineTitle}>
            {formatHeadline(selectedDate)} ✍️
          </Text>
          <Text style={styles.headlineSubtitle}>
            {tasksToday.length} task today
          </Text>
        </View>
        <View style={{ minHeight: 500 }}>
          <View style={styles.dayStrip}>
            {dayStrip.map((d) => {
              const active = toKey(d) === selectedKey;
              return (
                <Pressable
                  key={d.toISOString()}
                  style={[styles.dayCard, active && styles.dayCardActive]}
                  onPress={() => setSelectedDate(d)}
                >
                  <Text style={[styles.dayNumber, active && styles.dayActive]}>
                    {d.getDate()}
                  </Text>
                  <Text style={[styles.dayLabel, active && styles.dayActive]}>
                    {formatDayLabel(d)}
                  </Text>
                </Pressable>
              );
            })}
          </View>
          {/* DAILY */}
          <Animated.View
            style={[
              styles.animatedLayer,
              {
                opacity: dailyOpacity,
                pointerEvents: view === "Daily" ? "auto" : "none",
              },
            ]}
          >
            <View style={styles.dayStrip}>
              {dayStrip.map((d) => {
                const active = toKey(d) === selectedKey;
                return (
                  <Pressable
                    key={d.toISOString()}
                    style={[styles.dayCard, active && styles.dayCardActive]}
                    onPress={() => setSelectedDate(d)}
                  >
                    <Text
                      style={[styles.dayNumber, active && styles.dayActive]}
                    >
                      {d.getDate()}
                    </Text>
                    <Text style={[styles.dayLabel, active && styles.dayActive]}>
                      {formatDayLabel(d)}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {/* TASK TIMELINE */}
            <View style={styles.timeline}>
              {tasksToday.map((t) => (
                <View key={t.id} style={styles.timeRow}>
                  <Text style={styles.timeLabel}>
                    {t.start_date
                      ? new Date(t.start_date * 1000).toLocaleTimeString(
                          "en-GB",
                          { hour: "2-digit", minute: "2-digit" }
                        )
                      : "All day"}
                  </Text>
                  <View style={[styles.taskCard, { backgroundColor: PRIMARY }]}>
                    <Text style={styles.taskTitle}>{t.title}</Text>
                    <Text style={styles.taskTime}>
                      {t.start_date
                        ? new Date(t.start_date * 1000).toLocaleTimeString(
                            "en-GB",
                            { hour: "2-digit", minute: "2-digit" }
                          )
                        : "All day"}{" "}
                      -{" "}
                      {t.end_date
                        ? new Date(t.end_date * 1000).toLocaleTimeString(
                            "en-GB",
                            { hour: "2-digit", minute: "2-digit" }
                          )
                        : "All day"}
                    </Text>
                  </View>
                </View>
              ))}

              {tasksToday.length === 0 && (
                <Text style={styles.emptyText}>No tasks for this day</Text>
              )}
            </View>
          </Animated.View>

          {/* MONTHLY */}
          <Animated.View
            style={[
              styles.animatedLayer,
              {
                opacity: monthlyOpacity,
                pointerEvents: view === "Monthly" ? "auto" : "none",
              },
            ]}
          >
            <View style={styles.dayStrip}>
              {dayStrip.map((d) => {
                const active = toKey(d) === selectedKey;
                return (
                  <Pressable
                    key={d.toISOString()}
                    style={[styles.dayCard, active && styles.dayCardActive]}
                    onPress={() => setSelectedDate(d)}
                  >
                    <Text
                      style={[styles.dayNumber, active && styles.dayActive]}
                    >
                      {d.getDate()}
                    </Text>
                    <Text style={[styles.dayLabel, active && styles.dayActive]}>
                      {formatDayLabel(d)}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
            <View style={styles.calendarCard}>
              {/* Header */}
              <View style={styles.calendarHeader}>
                <Pressable
                  style={styles.navBtn}
                  onPress={() =>
                    setMonth(
                      new Date(month.getFullYear(), month.getMonth() - 1, 1)
                    )
                  }
                >
                  <Ionicons name="chevron-back" size={16} color={PRIMARY} />
                </Pressable>

                <Text style={styles.calendarTitle}>
                  {formatMonthTitle(month)}
                </Text>

                <Pressable
                  style={styles.navBtn}
                  onPress={() =>
                    setMonth(
                      new Date(month.getFullYear(), month.getMonth() + 1, 1)
                    )
                  }
                >
                  <Ionicons name="chevron-forward" size={16} color={PRIMARY} />
                </Pressable>
              </View>

              {/* Weekday */}
              <View style={styles.weekHeader}>
                {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                  <Text key={i} style={styles.weekLabel}>
                    {d}
                  </Text>
                ))}
              </View>

              {/* Days */}
              {weeks.map((week, i) => (
                <View key={i} style={styles.calendarWeekRow}>
                  {week.map(({ date, isCurrentMonth }) => {
                    const key = toKey(date);
                    const hasTask = taskMap[key];
                    const active = key === selectedKey;

                    return (
                      <Pressable
                        key={key}
                        style={[
                          styles.calendarDay,
                          active && styles.calendarDayActive,
                        ]}
                        onPress={() => {
                          setSelectedDate(date);
                          toggleView();
                        }}
                      >
                        <Text
                          style={[
                            styles.calendarDayText,
                            !isCurrentMonth && styles.calendarDayMuted,
                            active && styles.calendarDayTextActive,
                          ]}
                        >
                          {date.getDate()}
                        </Text>

                        {hasTask && <View style={styles.taskDot} />}
                      </Pressable>
                    );
                  })}
                </View>
              ))}
            </View>
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
  },

  headerTitle: { fontSize: 18, fontWeight: "600" },

  circleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.card,
    alignItems: "center",
    justifyContent: "center",
  },

  headlineRow: {
    paddingHorizontal: spacing.xl,
    marginTop: spacing.xl,
  },

  headlineTitle: { fontSize: 24, fontWeight: "700" },
  headlineSubtitle: { color: colors.textMuted, marginTop: 4 },

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
  },

  dayCardActive: { backgroundColor: PRIMARY },

  dayNumber: { fontSize: 16, fontWeight: "700" },
  dayLabel: { fontSize: 12, color: colors.textMuted },
  dayActive: { color: "#FFF" },

  timeline: {
    marginTop: spacing.xl,
    paddingHorizontal: spacing.xl,
  },

  timeRow: {
    flexDirection: "row",
    marginBottom: spacing.lg,
    alignItems: "center",
  },

  timeLabel: {
    width: 60,
    fontSize: 12,
    color: colors.textMuted,
  },

  taskCard: {
    flex: 1,
    borderRadius: 16,
    padding: spacing.lg,
  },

  taskTitle: { fontWeight: "600", color: "#FFF" },
  taskTime: { fontSize: 12, color: "#F0F0F0", marginTop: 6 },

  emptyText: {
    textAlign: "center",
    color: colors.textMuted,
    marginTop: spacing.lg,
  },

  /* ===== CALENDAR ===== */

  calendarCard: {
    marginTop: spacing.xl,
    marginHorizontal: spacing.xl,
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: spacing.lg,
    elevation: 3,
  },

  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },

  calendarTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: PRIMARY,
  },

  navBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F3F2FF",
    alignItems: "center",
    justifyContent: "center",
  },

  weekHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },

  weekLabel: {
    width: 32,
    textAlign: "center",
    fontSize: 11,
    fontWeight: "600",
    color: colors.textMuted,
  },

  calendarWeekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  calendarDay: {
    width: 32,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  calendarDayActive: {
    backgroundColor: "#ECEBFF",
  },

  calendarDayText: {
    fontSize: 12,
    color: colors.text,
  },

  calendarDayMuted: {
    color: colors.textMuted,
  },

  calendarDayTextActive: {
    color: PRIMARY,
    fontWeight: "700",
  },

  taskDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: PRIMARY,
    marginTop: 2,
  },
  animatedLayer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
  },
});

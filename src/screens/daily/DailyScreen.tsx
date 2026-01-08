import { useAllProjectsTasks } from "@/hooks/useTasks";
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
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";

/* ================= CONSTANTS ================= */

const PRIMARY = "#6D5DF6";

/* ================= TYPES ================= */

type UITask = {
  id: string;
  title: string;
  start: string;
  end: string;
  date: Date;
  color: string;
};

/* ================= HELPERS ================= */

const parseTimestamp = (value: any): Date => {
  if (!value) return new Date();
  
  // If it's already a Date, return it
  if (value instanceof Date) {
    return isNaN(value.getTime()) ? new Date() : value;
  }
  
  // If it's a string, try to parse it
  if (typeof value === 'string') {
    const parsed = new Date(value);
    return isNaN(parsed.getTime()) ? new Date() : parsed;
  }
  
  // If it's a number (timestamp), convert it
  if (typeof value === 'number') {
    const parsed = new Date(value);
    return isNaN(parsed.getTime()) ? new Date() : parsed;
  }
  
  return new Date();
};

const toKey = (d: Date | null | undefined): string => {
  if (!d) return new Date().toISOString().split("T")[0];
  const validDate = d instanceof Date && !isNaN(d.getTime()) ? d : new Date();
  return validDate.toISOString().split("T")[0];
};

const formatHeadline = (d: Date) =>
  d.toLocaleDateString("en-GB", { month: "long", day: "2-digit" });

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
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const startDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
  const endDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
  
  const { data, isLoading } = useAllProjectsTasks({
    startDate,
    endDate,
  });

  const [view, setView] = useState<"Daily" | "Monthly">("Daily");
  const [month, setMonth] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );

  /* ===== Animation ===== */
  const dailyOpacity = useRef(new Animated.Value(1)).current;
  const monthlyOpacity = useRef(new Animated.Value(0)).current;

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

  const tasks: UITask[] = useMemo(() => {
    if (!data?.data) return [];
    return data.data
      .map((t: any) => {
        try {
          const dueDate = parseTimestamp(t.due_date);
          return {
            id: String(t.id),
            title: t.title || "Untitled Task",
            start: t.start_time ?? "09:00 am",
            end: t.end_time ?? "10:00 am",
            date: dueDate,
            color: PRIMARY,
          };
        } catch (error) {
          console.warn("Error parsing task:", t, error);
          return null;
        }
      })
      .filter((t): t is UITask => t !== null);
  }, [data]);

  const selectedKey = toKey(selectedDate);

  const tasksToday = useMemo(
    () => tasks.filter((t) => toKey(t.date) === selectedKey),
    [tasks, selectedKey]
  );

  const taskMap = useMemo(() => {
    const map: Record<string, boolean> = {};
    tasks.forEach((t) => {
      map[toKey(t.date)] = true;
    });
    return map;
  }, [tasks]);

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

        {/* DAY STRIP */}
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
        <Animated.View style={{ opacity: dailyOpacity }}>
          <View style={styles.timeline}>
            {tasksToday.map((t) => (
              <View key={t.id} style={styles.timeRow}>
                <Text style={styles.timeLabel}>{t.start}</Text>
                <View style={[styles.taskCard, { backgroundColor: t.color }]}>
                  <Text style={styles.taskTitle}>{t.title}</Text>
                  <Text style={styles.taskTime}>
                    {t.start} - {t.end}
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
        <Animated.View style={{ opacity: monthlyOpacity }}>
          <View style={styles.calendarCard}>
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

            <View style={styles.weekHeader}>
              {["M", "T", "W", "T", "F", "S", "S"].map((d, idx) => (
                    <Text key={`week-${idx}`} style={styles.weekLabel}>
                  {d}
                </Text>
              ))}
            </View>

            {weeks.map((week, i) => (
              <View key={i} style={styles.calendarWeekRow}>
                {week.map(({ date, isCurrentMonth }) => {
                  const key = toKey(date);
                  return (
                    <Pressable
                      key={key}
                      style={styles.calendarDay}
                      onPress={() => {
                        setSelectedDate(date);
                        toggleView();
                      }}
                    >
                      <Text
                        style={[
                          styles.calendarDayText,
                          !isCurrentMonth && styles.calendarDayMuted,
                        ]}
                      >
                        {date.getDate()}
                      </Text>
                      {taskMap[key] && <View style={styles.taskDot} />}
                    </Pressable>
                  );
                })}
              </View>
            ))}
          </View>
        </Animated.View>

        {isLoading && (
          <Text style={{ textAlign: "center", color: colors.textMuted }}>
            Loading tasks...
          </Text>
        )}
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

  calendarCard: {
    marginTop: spacing.xl,
    marginHorizontal: spacing.xl,
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: spacing.lg,
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
    alignItems: "center",
    justifyContent: "center",
  },

  calendarDayText: {
    fontSize: 12,
    color: colors.text,
  },

  calendarDayMuted: {
    color: colors.textMuted,
  },

  taskDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: PRIMARY,
    marginTop: 2,
  },
});

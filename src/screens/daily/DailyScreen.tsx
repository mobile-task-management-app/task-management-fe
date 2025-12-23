import React from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";
import { mockTasks } from "../../data/mock";
import { Task } from "../../types/models";

const days = [
  { day: "19", label: "Sat" },
  { day: "20", label: "Sun" },
  { day: "21", label: "Mon" },
  { day: "22", label: "Tue" },
  { day: "23", label: "Wed" },
];

export const DailyScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.circleButton}>
          <Ionicons name="chevron-back" size={18} color={colors.primary} />
        </View>
        <Text style={styles.title}>Today Task</Text>
        <View style={styles.circleButton}>
          <Ionicons name="create-outline" size={18} color={colors.primary} />
        </View>
      </View>
      <View style={styles.dateRow}>
        <View>
          <Text style={styles.dateTitle}>October, 20</Text>
          <Text style={styles.dateSubtitle}>15 task today</Text>
        </View>
        <View style={styles.circleButton}>
          <Ionicons name="calendar" size={18} color={colors.primary} />
        </View>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.daySelector}
      >
        {days.map((item) => {
          const isActive = item.day === "20";
          return (
            <View
              key={item.day}
              style={[styles.dayCard, isActive && styles.dayCardActive]}
            >
              <Text style={[styles.dayNumber, isActive && styles.dayActiveText]}>
                {item.day}
              </Text>
              <Text style={[styles.dayLabel, isActive && styles.dayActiveText]}>
                {item.label}
              </Text>
            </View>
          );
        })}
      </ScrollView>
      <FlatList
        contentContainerStyle={styles.timeline}
        data={mockTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TimelineItem task={item} />}
        ItemSeparatorComponent={() => <View style={{ height: spacing.lg }} />}
      />
    </SafeAreaView>
  );
};

const TimelineItem: React.FC<{ task: Task }> = ({ task }) => {
  return (
    <View style={styles.timelineRow}>
      <Text style={styles.timelineTime}>{task.startTime}</Text>
      <View style={[styles.timelineCard, { backgroundColor: task.color }]}>
        <Text style={styles.timelineTitle}>{task.title}</Text>
        <Text style={styles.timelineTimeRange}>
          {task.startTime} - {task.endTime}
        </Text>
      </View>
    </View>
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
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.card,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.shadow,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.xl,
    marginTop: spacing.xl,
  },
  dateTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.text,
  },
  dateSubtitle: {
    color: colors.textMuted,
  },
  daySelector: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    gap: spacing.md,
  },
  dayCard: {
    width: 64,
    height: 84,
    borderRadius: 16,
    backgroundColor: colors.card,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  dayCardActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  dayNumber: {
    fontSize: 18,
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
  timeline: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  timelineRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md,
  },
  timelineTime: {
    width: 60,
    color: colors.text,
    fontWeight: "600",
  },
  timelineCard: {
    flex: 1,
    borderRadius: 16,
    padding: spacing.lg,
  },
  timelineTitle: {
    color: "#FFFFFF",
    fontWeight: "600",
    marginBottom: spacing.sm,
  },
  timelineTimeRange: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
  },
});

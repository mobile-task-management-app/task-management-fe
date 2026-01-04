import { useProfile } from "@/hooks/useUsers";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "../../components/common/Card";
import { ProgressRingPlaceholder } from "../../components/common/ProgressRingPlaceholder";
import { SectionHeader } from "../../components/common/SectionHeader";
import { mockProjects } from "../../data/mock";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";
import { Project } from "../../types/models";

export const HomeScreen: React.FC = () => {
  const { data, isLoading, isError } = useProfile();

  // 1. Handle Loading State
  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  if (isError || !data) {
    return <Text>Could not load profile</Text>;
  }

  // 3. Access data safely
  // Assuming your API returns { data: { first_name: '...' } }
  const user = data.data;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={styles.content}
        data={mockProjects}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <View style={styles.avatar} />
              <View style={styles.headerInfo}>
                <Text
                  style={styles.name}
                >{`${user.first_name} ${user.last_name}`}</Text>
                <Text style={styles.email}>{user.email}</Text>
              </View>
              <View style={styles.notification}>
                <Ionicons
                  name="notifications"
                  size={20}
                  color={colors.primary}
                />
              </View>
            </View>
            <Card style={styles.summaryCard}>
              <View style={styles.summaryRow}>
                <View>
                  <Text style={styles.summaryTitle}>My Work Summary</Text>
                  <Text style={styles.summarySubtitle}>
                    Today task & presence activity
                  </Text>
                </View>
                <Ionicons name="sparkles" size={24} color="#FFFFFF" />
              </View>
              <View style={styles.summaryBottom}>
                <ProgressRingPlaceholder progress={0.85} color="#FFFFFF" />
                <View style={styles.summaryButton}>
                  <Text style={styles.summaryButtonText}>View Task</Text>
                </View>
              </View>
            </Card>
            <SectionHeader title="Projects" count={mockProjects.length} />
          </>
        }
        renderItem={({ item }) => <ProjectCard project={item} />}
        ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
      />
    </SafeAreaView>
  );
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <View style={styles.projectCard}>
      <View
        style={[styles.projectIcon, { backgroundColor: project.accentColor }]}
      >
        <Ionicons name="briefcase" size={16} color="#FFFFFF" />
      </View>
      <View style={styles.projectInfo}>
        <Text style={styles.projectTitle}>{project.title}</Text>
        <Text style={styles.projectSubtitle}>{project.tasksCount} Tasks</Text>
      </View>
      <ProgressRingPlaceholder
        progress={project.progress}
        size={46}
        color={project.accentColor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.xl,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E2E8F0",
  },
  headerInfo: {
    marginLeft: spacing.md,
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
  },
  email: {
    fontSize: 12,
    color: colors.primary,
  },
  notification: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  summaryCard: {
    backgroundColor: "#5F3AF3",
    marginBottom: spacing.xl,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  summaryTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
  summarySubtitle: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
  },
  summaryBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  summaryButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  summaryButtonText: {
    color: colors.primary,
    fontWeight: "600",
  },
  projectCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: spacing.md,
    shadowColor: colors.shadow,
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 2,
  },
  projectIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  projectInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  projectTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },
  projectSubtitle: {
    fontSize: 12,
    color: colors.textMuted,
  },
});

import { useGetUserProjectSummaries } from "@/hooks/useProjects";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppInput } from "../../components/common/AppInput";
import { Badge } from "../../components/common/Badge";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";
import { Project } from "../../types/models";

export const ProjectsScreen: React.FC = () => {
  const [query, setQuery] = useState("");
  const { data, isLoading, isError } = useGetUserProjectSummaries();
  // 1. Handle Loading State
  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  if (isError || !data) {
    return <Text>Could not load projects</Text>;
  }
  const projects: Project[] =
    data?.data.project_summaries.map((project): Project => {
      return {
        id: project.id,
        title: project.name,
        tasksCount: project.total_tasks,
        progress:
          Number(project.number_of_done_tasks / project.total_tasks) || 0,
        status: project.status as Project["status"],
        startDate: project.start_date
          ? new Date(project.start_date * 1000).toLocaleDateString()
          : "N/A",

        endDate: project.end_date
          ? new Date(project.end_date * 1000).toLocaleDateString()
          : "N/A",
        accentColor: "#FF5733",
      };
    }) || [];

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={styles.content}
        data={projects}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <>
            <Text style={styles.title}>My projects</Text>
            <AppInput
              placeholder="Search"
              value={query}
              onChangeText={setQuery}
              right={
                <Ionicons name="search" size={16} color={colors.textMuted} />
              }
            />
          </>
        }
        renderItem={({ item }) => <ProjectRow project={item} />}
        ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
      />
    </SafeAreaView>
  );
};

const ProjectRow: React.FC<{ project: Project }> = ({ project }) => {
  const progressWidth =
    `${Math.round(project.progress * 100)}%` as `${number}%`;

  return (
    <View style={styles.card}>
      <View style={styles.rowBetween}>
        <View>
          <Text style={styles.projectTitle}>{project.title}</Text>
          <Text style={styles.projectSubtitle}>
            {project.startDate} - {project.endDate}
          </Text>
        </View>
        <Badge label={project.status} />
      </View>
      <View style={styles.progressRow}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: progressWidth }]} />
        </View>
        <View style={styles.progressPill}>
          <Text style={styles.progressPillText}>
            {Math.round(project.progress * 20)}/20
          </Text>
        </View>
      </View>
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
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.lg,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: spacing.lg,
    shadowColor: colors.shadow,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 2,
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  projectTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
  },
  projectSubtitle: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 999,
    overflow: "hidden",
  },
  progressFill: {
    height: 8,
    backgroundColor: colors.primary,
    borderRadius: 999,
  },
  progressPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
  },
  progressPillText: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.text,
  },
});

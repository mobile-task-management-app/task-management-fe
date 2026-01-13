import { useGetUserProjectSummaries } from "@/hooks/useProjects";
import { Ionicons } from "@expo/vector-icons";
import { router, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { AppInput } from "../../components/common/AppInput";
import { Badge } from "../../components/common/Badge";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";
import { Project } from "../../types/models";


export const ProjectsScreen: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
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

  const filteredProjects = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return projects;
    return projects.filter((project) =>
      project.title.toLowerCase().includes(normalized)
    );
  }, [projects, query]);

  return (
    <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]}>
      <FlatList
        contentContainerStyle={styles.content}
        data={filteredProjects}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <View
            style={[styles.header, { paddingTop: insets.top + spacing.lg }]}
          >
            <View style={styles.headerTop}>
              <Text style={styles.title}>My projects</Text>
            </View>
            <View style={styles.searchWrap}>
              <AppInput
                placeholder="Search"
                value={query}
                onChangeText={setQuery}
                left={
                  <Ionicons name="search" size={16} color={colors.textMuted} />
                }
              />
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <ProjectRow
            project={item}
            onPress={() =>
              router.replace({
                pathname: "/project/[id]",
                params: { id: item.id },
              })
            }
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
      />
    </SafeAreaView>
  );
};

const ProjectRow: React.FC<{
  project: Project;
  onPress: () => void;
}> = ({ project, onPress }) => {
  const renderRightActions = (
      progress: Animated.AnimatedInterpolation<number>,
      dragX: Animated.AnimatedInterpolation<number>,
      onEdit: () => void,
      onDelete: () => void
    ) => {
      return (
        <View style={styles.actionsContainer}>
          <Pressable
            style={[styles.actionButton, styles.editButton]}
            onPress={onEdit}
          >
            <Ionicons name="pencil" size={20} color="#FFF" />
            <Text style={styles.actionText}>Edit</Text>
          </Pressable>
  
          <Pressable
            style={[styles.actionButton, styles.deleteButton]}
            onPress={onDelete}
          >
            <Ionicons name="trash" size={20} color="#FFF" />
            <Text style={styles.actionText}>Delete</Text>
          </Pressable>
        </View>
      );
    };
  const progressWidth =
    `${Math.round(project.progress * 100)}%` as `${number}%`;

  return (
    <Swipeable
          renderRightActions={(progress, dragX) =>
            renderRightActions(
              progress,
              dragX,
              () => {
                // EDIT
                router.replace(`/project/edit/${project.id}`);
              },
              () => {
                // DELETE
                console.log("Delete project:", project.id);
              }
            )
          }
          overshootRight={false}
        >
    <Pressable onPress={onPress} style={styles.card}>
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
    </Pressable>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.xl,
    paddingTop: 0,
  },
  header: {
    backgroundColor: colors.primary,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: spacing.lg,
    marginHorizontal: -spacing.xl,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.xl,
  },
  backButton: {
    position: "absolute",
    left: 30,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  searchWrap: {
    // backgroundColor: colors.card,
    // borderRadius: 16,
    paddingHorizontal: spacing.sm,
    paddingTop: spacing.md,
    marginTop: spacing.md,
    marginHorizontal: spacing.xl,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#FFFFFF",
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
  actionsContainer: {
    flexDirection: "row",
    height: "100%",
  },

  actionButton: {
    width: 80,
    justifyContent: "center",
    alignItems: "center",
  },

  editButton: {
    backgroundColor: "#6366F1", // Indigo
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },

  deleteButton: {
    backgroundColor: "#EF4444", // Red
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },

  actionText: {
    color: "#FFF",
    fontSize: 12,
    marginTop: 4,
    fontWeight: "600",
  },
});

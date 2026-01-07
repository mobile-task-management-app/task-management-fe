import { useProfile } from "@/hooks/useUsers";
import { Ionicons } from "@expo/vector-icons";

import { AppButton } from "@/components/common/AppButton";
import { useGetUserProjectSummaries } from "@/hooks/useProjects";
import { signIn } from "@/state/authSlice";
import { useAppDispatch } from "@/state/hooks";
import { BlurView } from "expo-blur";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Card } from "../../components/common/Card";
import { ProgressRingPlaceholder } from "../../components/common/ProgressRingPlaceholder";
import { SectionHeader } from "../../components/common/SectionHeader";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";
import { Project } from "../../types/models";
import { ProjectsEmptyCard } from "../projects/ProjectsEmptyCard";

export const HomeScreen: React.FC = () => {
  // 3. Access data safely
  // Assuming your API returns { data: { first_name: '...' } }
  const { welcome } = useLocalSearchParams();
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  // const EmptyProjects = () => {
  //   return (
  //     <View style={styles.emptyContainer}>
  //       <Image
  //         source={require("../../../assets/images/empty-project.png")}
  //         style={styles.emptyImage}
  //         resizeMode="contain"
  //       />

  //       <Text style={styles.emptyTitle}>No Projects Created</Text>

  //       <Text style={styles.emptySubtitle}>
  //         It looks like you don't have any projects right now. Don’t worry, this
  //         space will be updated as new projects become available.
  //       </Text>
  //     </View>
  //   );
  // };


  const dispatch = useAppDispatch();

  const [showWelcome, setShowWelcome] = useState(false);
  const translateY = useRef(new Animated.Value(height)).current;
  const {
    data: profileData,
    isLoading: profileLoading,
    isError: profileError,
  } = useProfile();
  const {
    data: projectsData,
    isLoading: projectsLoading,
    isError: projectsError,
  } = useGetUserProjectSummaries();
  useEffect(() => {
    console.log("welcome param:", welcome);
    if (welcome === "1") {
      setShowWelcome(true);
      Animated.timing(translateY, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }).start();

      // clear param
      router.setParams({ welcome: undefined });
    }
  }, [welcome]);
  // 1. Handle Loading State
  const allProjects: Project[] = useMemo(() => {
    return (
      projectsData?.data.project_summaries.map(
        (project): Project => ({
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
          accentColor: "#5F3AF3", // You can vary this based on index if desired
        })
      ) || []
    );
  }, [projectsData]);

  // 3. Global Loading/Error State
  if (profileLoading || projectsLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (profileError || projectsError || !profileData) {
    console.log("Error loading data:", { projectsData });
    return (
      <View style={styles.centered}>
        <Text>Could not load dashboard</Text>
      </View>
    );
  }

  const user = profileData.data;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={[
          styles.content,
          // allProjects.length === 0 &&{ flexGrow: 1 },
        ]}
        data={allProjects}
        keyExtractor={(item) => item.id.toString()}
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
            <SectionHeader title="Projects" count={allProjects.length} />
            {allProjects.length === 0 && (
              <ProjectsEmptyCard />
            )}
          </>
        }
        
        renderItem={({ item }) => <ProjectCard project={item} />}
        ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
      />
      {showWelcome && (
        <>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => setShowWelcome(false)}
          >
            <BlurView
              intensity={30}
              tint="dark"
              style={StyleSheet.absoluteFill}
            />
          </Pressable>

          <Animated.View
            style={[
              styles.welcomeSheet,
              {
                paddingBottom: insets.bottom + spacing.lg,
                transform: [{ translateY }],
              },
            ]}
          >
            <View style={styles.sheetHandle} />

            <View style={styles.welcomeIcon}>
              <Ionicons name="person" size={28} color="#FFF" />
            </View>

            <Text style={styles.welcomeTitle}>Welcome To TaskFlow!</Text>

            <Text style={styles.welcomeSubtitle}>
              To enhance your experience, please set up your profile first.
            </Text>
            <View style={styles.buttonGroup}>
              <AppButton
                title="Set Up My Profile"
                
                onPress={() => {
                  // router.push("/(tabs)/profile");
                  setShowWelcome(false);
                  router.replace({
                    pathname: "/(tabs)/profile",
                    params: { welcome: "0" },
                  });
                }}
              />
              <AppButton
                title="Explore The App First"
                variant="outline"
                onPress={() => {
                  dispatch(signIn());
                  setShowWelcome(false);
                }}
              />
            </View>
          </Animated.View>
        </>
      )}
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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background, // Match the app theme
  },
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

  welcomeSheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: spacing.xl,
    paddingBottom: spacing.xl + 12,
    elevation: 30,
  },

  sheetHandle: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#D1D5DB",
    alignSelf: "center",
    marginBottom: spacing.lg,
  },

  welcomeIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: spacing.md,
  },

  welcomeTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
    textAlign: "center",
    marginBottom: spacing.sm,
  },

  welcomeSubtitle: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: spacing.lg,
  },
  buttonGroup: {
    width: "100%",
    gap: 12,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xl,
  },

  emptyImage: {
    width: 220,
    height: 160,
    marginBottom: spacing.lg,
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginBottom: spacing.sm,
  },

  emptySubtitle: {
    fontSize: 13,
    color: colors.textMuted,
    textAlign: "center",
    lineHeight: 20,
  },
});

import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { AppInput } from "../../components/common/AppInput";
import { Badge } from "../../components/common/Badge";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";
import { mockProjects } from "../../data/mock";
import { Project } from "../../types/models";
import { formatPercent } from "../../utils/format";

export const ProjectsScreen: React.FC = () => {
  const [query, setQuery] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={styles.content}
        data={mockProjects}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
            <Text style={styles.title}>My projects</Text>
            <AppInput
              placeholder="Search"
              value={query}
              onChangeText={setQuery}
              right={<Ionicons name="search" size={16} color={colors.textMuted} />}
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
          <View
            style={[
              styles.progressFill,
              { width: formatPercent(project.progress) },
            ]}
          />
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

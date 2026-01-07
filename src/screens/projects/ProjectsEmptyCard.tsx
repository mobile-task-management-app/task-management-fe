import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export const ProjectsEmptyCard: React.FC = () => {
  return (
    <View style={styles.card}>
      <Image
        source={require("../../../assets/images/empty-project.png")}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.emptyTitle}>No Projects Created</Text>

      <Text style={styles.emptySubtitle}>
        It looks like you don't have any projects right now. Don’t worry, this
        space will be updated as new projects become available.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: spacing.xl,
    alignItems: "center",
  },

  image: {
    width: 280,
    height: 110,
    marginBottom: spacing.lg,
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.sm,
    textAlign: "center",
  },

  emptySubtitle: {
    fontSize: 13,
    color: colors.textMuted,
    textAlign: "center",
    lineHeight: 18,
  },
});

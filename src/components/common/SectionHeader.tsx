import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";

type SectionHeaderProps = {
  title: string;
  count?: number;
  actionLabel?: string;
};

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  count,
  actionLabel,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title} {typeof count === "number" ? ` ${count}` : ""}
      </Text>
      {actionLabel ? <Text style={styles.action}>{actionLabel}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
  },
  action: {
    fontSize: 13,
    color: colors.primary,
  },
});

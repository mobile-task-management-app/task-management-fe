import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";

type CardProps = ViewProps & {
  children: React.ReactNode;
};

export const Card: React.FC<CardProps> = ({ children, style, ...props }) => {
  return (
    <View style={[styles.card, style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: spacing.lg,
    shadowColor: colors.shadow,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 3,
  },
});

import { useProfile } from "@/hooks/useUsers";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { signOut } from "../../state/authSlice";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";

export const ProfileScreen: React.FC = () => {
  const {
    data: profileData,
    isLoading: profileLoading,
    isError: profileError,
  } = useProfile();
  if (profileError || !profileData) {
    console.log("Error loading data:", { profileData, profileError });
    return (
      <View style={styles.centered}>
        <Text>Could not load dashboard</Text>
      </View>
    );
  }

  const user = profileData.data;

  function dispatch(arg0: { payload: undefined; type: "auth/signOut" }): void {
    throw new Error("Function not implemented.");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My Profile</Text>
      <View style={styles.profileCard}>
        <View style={styles.avatar} />
        <Text style={styles.name}>
          {user.first_name} {user.last_name}
        </Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>
      <Section title="CONTACT">
        <ProfileItem icon="mail" label={user.email} />
        <ProfileItem icon="location" label="Taman Anggrek" />
      </Section>
      <Section title="ACCOUNT">
        <ProfileItem
          onPress={() => {
            router.push("/update-profile");
          }}
          icon="person"
          label="Personal Data"
          showChevron
        />
        <ProfileItem icon="lock-closed" label="Change Password" showChevron />
      </Section>
      <Section title="SETTINGS">
        <ProfileItem icon="cube" label="Versioning" showChevron />
        <ProfileItem icon="help-circle" label="FAQ and Help" showChevron />
        <ProfileItem
          icon="log-out"
          label="Logout"
          danger
          onPress={() => dispatch(signOut())}
        />
      </Section>
    </SafeAreaView>
  );
};

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionCard}>{children}</View>
    </View>
  );
};

type ProfileItemProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  showChevron?: boolean;
  danger?: boolean;
  onPress?: () => void;
};

const ProfileItem: React.FC<ProfileItemProps> = ({
  icon,
  label,
  showChevron,
  danger,
  onPress,
}) => {
  const content = (
    <View style={styles.itemRow}>
      <Ionicons
        name={icon}
        size={18}
        color={danger ? colors.danger : colors.primary}
      />
      <Text style={[styles.itemLabel, danger && { color: colors.danger }]}>
        {label}
      </Text>
      {showChevron ? (
        <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
      ) : null}
    </View>
  );

  return onPress ? <Pressable onPress={onPress}>{content}</Pressable> : content;
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
    padding: spacing.xl,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: spacing.lg,
    color: colors.text,
  },
  profileCard: {
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 18,
    backgroundColor: "#DAD4FF",
    marginBottom: spacing.md,
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
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
  sectionCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: spacing.md,
    gap: spacing.md,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  itemLabel: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
  },
});

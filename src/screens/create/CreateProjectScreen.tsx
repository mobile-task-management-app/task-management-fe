import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { AppButton } from "../../components/common/AppButton";
import { AppInput } from "../../components/common/AppInput";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";

export const CreateProjectScreen: React.FC = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Create Project</Text>
      <AppInput
        label="Title"
        placeholder="Project title"
        value={title}
        onChangeText={setTitle}
      />
      <AppInput
        label="Description"
        placeholder="Project description"
        value={description}
        onChangeText={setDescription}
      />
      <View style={styles.spacer} />
      <AppButton title="Save" onPress={() => router.back()} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.xl,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.lg,
  },
  spacer: {
    flex: 1,
  },
});

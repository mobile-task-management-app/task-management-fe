import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppButton } from "../../components/common/AppButton";
import { AppInput } from "../../components/common/AppInput";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";
import { MainStackParamList } from "../../navigation/types";

export const CreateTaskScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Create Task</Text>
      <AppInput label="Title" placeholder="Task title" value={title} onChangeText={setTitle} />
      <AppInput
        label="Description"
        placeholder="Task description"
        value={description}
        onChangeText={setDescription}
      />
      <View style={styles.spacer} />
      <AppButton title="Save" onPress={() => navigation.goBack()} />
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

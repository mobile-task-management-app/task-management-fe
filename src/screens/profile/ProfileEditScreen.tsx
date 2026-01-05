import { AppButton } from "@/components/common/AppButton";
import { AppInput } from "@/components/common/AppInput";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { BlurView } from "expo-blur";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { UpdateProfileConfirmSheet } from "./UpdateProfileConfirmSheet";
import { UpdateProfileSuccessSheet } from "./UpdateProfileSuccessSheet";

export const ProfileEditScreen: React.FC = () => {
  const insets = useSafeAreaInsets();

  const [avatar, setAvatar] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState<Date | null>(null);
  const [showDate, setShowDate] = useState(false);
  const [position, setPosition] = useState<"Giảng viên" | "Sinh viên" | "">("");
  const [showPosition, setShowPosition] = useState(false);
  const [address, setAddress] = useState("");

  // const [showConfirm, setShowConfirm] = useState(false);
  const confirmY = useRef(new Animated.Value(500)).current;

  type SheetStep = "confirm" | "success";

  const [showSheet, setShowSheet] = useState(false);
  const [sheetStep, setSheetStep] = useState<SheetStep>("confirm");

  useEffect(() => {
    Animated.timing(confirmY, {
      toValue: showSheet ? 0 : 500,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [showSheet]);

  /* ===== IMAGE PICKER ===== */
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ===== HEADER ===== */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color={colors.primary} />
        </Pressable>
        <Text style={styles.headerTitle}>My Work Profile</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* ===== SCROLL CONTENT ===== */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        {/* ===== PERSONAL DATA ===== */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Personal Data Information</Text>
          <Text style={styles.sectionSubtitle}>
            Your personal data information
          </Text>

          {/* AVATAR */}
          <Pressable style={styles.avatarWrapper} onPress={pickImage}>
            <View style={styles.avatar}>
              {avatar ? (
                <Image source={{ uri: avatar }} style={styles.avatarImg} />
              ) : (
                <Ionicons
                  name="person-outline"
                  size={32}
                  color={colors.primary}
                />
              )}
            </View>
            <View style={styles.uploadIcon}>
              <Ionicons name="cloud-upload-outline" size={16} color="#FFF" />
            </View>
          </Pressable>

          <Text style={styles.uploadText}>Upload Photo</Text>

          <AppInput
            label="First Name"
            value={firstName}
            placeholder="Enter your first name"
            onChangeText={setFirstName}
            left={
              <Ionicons
                name="person-outline"
                size={18}
                color={colors.primary}
              />
            }
          />

          <AppInput
            label="Last Name"
            value={lastName}
            placeholder="Enter your last name"
            onChangeText={setLastName}
            left={
              <Ionicons
                name="person-outline"
                size={18}
                color={colors.primary}
              />
            }
          />

          {/* DATE OF BIRTH */}
          <Pressable onPress={() => setShowDate(true)}>
            <AppInput
              label="Date of Birth"
              value={dob ? dob.toLocaleDateString() : ""}
              placeholder="Select Date"
              editable={false}
              left={
                <Ionicons
                  name="calendar-outline"
                  size={18}
                  color={colors.primary}
                />
              }
              right={
                <Ionicons
                  name="chevron-down"
                  size={16}
                  color={colors.textMuted}
                />
              }
            />
          </Pressable>

          {showDate && (
            <DateTimePicker
              value={dob || new Date(2000, 0, 1)}
              mode="date"
              display="spinner"
              onChange={(_, date) => {
                setShowDate(false);
                if (date) setDob(date);
              }}
            />
          )}

          {/* POSITION */}
          <Pressable onPress={() => setShowPosition(true)}>
            <AppInput
              label="Position"
              value={position}
              placeholder="Select Position"
              editable={false}
              left={
                <Ionicons
                  name="briefcase-outline"
                  size={18}
                  color={colors.primary}
                />
              }
              right={
                <Ionicons
                  name="chevron-down"
                  size={16}
                  color={colors.textMuted}
                />
              }
            />
          </Pressable>
        </View>

        {/* ===== ADDRESS ===== */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Address</Text>
          <Text style={styles.sectionSubtitle}>Your current domicile</Text>

          <AppInput
            label="Address"
            placeholder="Enter your address"
            value={address}
            onChangeText={setAddress}
            left={
              <Ionicons
                name="location-outline"
                size={18}
                color={colors.primary}
              />
            }
          />
        </View>
      </ScrollView>

      {/* ===== FIXED FOOTER BUTTON ===== */}
      <View
        style={[
          styles.footer,
          { paddingBottom: insets.bottom + spacing.md },
        ]}
      >
        <AppButton 
          title="Update Profile" 
          onPress={() => {
            setSheetStep("confirm");
            setShowSheet(true);
          }} />
      </View>

      {/* ===== POSITION PICKER ===== */}
      {showPosition && (
        <View style={styles.overlay}>
          <View style={styles.bottomSheet}>
            {["Giảng viên", "Sinh viên"].map((item) => (
              <Pressable
                key={item}
                style={styles.option}
                onPress={() => {
                  setPosition(item as any);
                  setShowPosition(false);
                }}
              >
                <Text style={styles.optionText}>{item}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}

      {showSheet && (
        <>
          {/* BLUR */}
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => setShowSheet(false)}
          >
            <BlurView intensity={35} tint="dark" style={StyleSheet.absoluteFill} />
          </Pressable>

          {/* SHEET */}
          <Animated.View
            style={[
              styles.confirmSheet,
              { transform: [{ translateY: confirmY }] },
            ]}
          >
            <View style={styles.sheetHandle} />

            {sheetStep === "confirm" && (
              <UpdateProfileConfirmSheet
                onCancel={() => setShowSheet(false)}
                onConfirm={() => {
                  // 👉 Call API update profile ở đây nếu có
                  setSheetStep("success");
                }}
              />
            )}

            {sheetStep === "success" && (
              <UpdateProfileSuccessSheet
                onDone={() => {
                  setShowSheet(false);
                  router.back(); // hoặc router.replace("/(tabs)/profile")
                }}
              />
            )}
          </Animated.View>
        </>
      )}

    </SafeAreaView>
  );
};

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.xl,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: spacing.lg,
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
  },

  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 4,
    color: colors.text,
  },

  sectionSubtitle: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: spacing.lg,
  },

  avatarWrapper: {
    alignSelf: "center",
    marginBottom: spacing.sm,
  },

  avatar: {
    width: 96,
    height: 96,
    borderRadius: 20,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarImg: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },

  uploadIcon: {
    position: "absolute",
    right: -4,
    top: -4,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  uploadText: {
    textAlign: "center",
    color: colors.primary,
    fontWeight: "600",
    marginBottom: spacing.lg,
  },

  footer: {
    position: "absolute",
    left: spacing.xl,
    right: spacing.xl,
    bottom: 0,
    backgroundColor: colors.background,
    paddingTop: spacing.md,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-end",
  },

  bottomSheet: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: spacing.lg,
  },

  option: {
    paddingVertical: spacing.md,
  },

  optionText: {
    fontSize: 16,
    textAlign: "center",
    color: colors.text,
  },

  confirmSheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: spacing.xl,
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

});

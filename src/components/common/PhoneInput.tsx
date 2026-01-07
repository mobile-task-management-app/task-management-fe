import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { COUNTRIES } from "../../constants/countries";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";

interface Props {
  value: string;
  onChangeText: (value: string) => void;
}

export const PhoneInput: React.FC<Props> = ({
  value,
  onChangeText,
}) => {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState(COUNTRIES[0]); // VN default

  return (
    <View style={{ marginBottom: spacing.lg }}>
      {/* INPUT ROW */}
      <View style={styles.row}>
        {/* COUNTRY DROPDOWN */}
        <Pressable
          style={styles.countryBox}
          onPress={() => setOpen((v) => !v)}
        >
          <Text style={styles.flag}>{country.flag}</Text>
          <Text style={styles.dial}>{country.dialCode}</Text>
          <Ionicons
            name="chevron-down"
            size={16}
            color={colors.textMuted}
          />
        </Pressable>

        {/* PHONE INPUT */}
        <TextInput
          style={styles.input}
          placeholder="0000 0000 0000"
          keyboardType="phone-pad"
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={colors.textMuted}
        />
      </View>

      {open && (
        <View style={styles.dropdown}>
          <FlatList
            data={COUNTRIES}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => (
              <Pressable
                style={styles.countryItem}
                onPress={() => {
                  setCountry(item);
                  setOpen(false);
                }}
              >
                <Text style={styles.flag}>{item.flag}</Text>
                <Text style={styles.countryName}>{item.name}</Text>
                <Text style={styles.dial}>{item.dialCode}</Text>
              </Pressable>
            )}
          />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    overflow: "hidden",
  },

  countryBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    height: "100%",
    borderRightWidth: 1,
    borderRightColor: colors.border,
    gap: 6,
  },

  flag: {
    fontSize: 18,
  },

  dial: {
    fontSize: 14,
    color: colors.text,
    fontWeight: "500",
  },

  input: {
    flex: 1,
    height: "100%",
    paddingHorizontal: spacing.md,
    fontSize: 15,
    color: colors.text,
  },

  dropdown: {
    marginTop: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    maxHeight: 220,
    overflow: "hidden",
  },

  countryItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    gap: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  countryName: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
  },
});

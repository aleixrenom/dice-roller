import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ModifierOptionProps = {
  label: string;
  checked: boolean;
  onToggle: () => void;
};

export default function ModifierOption({
  label,
  checked,
  onToggle,
}: ModifierOptionProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onToggle}
      activeOpacity={0.7}
    >
      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked && <View style={styles.checkboxInner} />}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: "#888",
    borderRadius: 6,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  checkboxChecked: {
    borderColor: "#4caf50",
    backgroundColor: "#e0f7e9",
  },
  checkboxInner: {
    width: 12,
    height: 12,
    backgroundColor: "#4caf50",
    borderRadius: 3,
  },
  label: {
    fontSize: 16,
    color: "#222",
  },
});

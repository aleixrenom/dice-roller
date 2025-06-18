import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { SIZE_PRESETS, ToggleIconButtonProps } from "../types";

export default function ToggleIconButton({
  label,
  active = false,
  color = "#4caf50",
  onPress,
  style,
  labelStyle,
  size = "s",
}: ToggleIconButtonProps) {
  const inactiveColor = "#bbb";
  const preset = SIZE_PRESETS[size] || SIZE_PRESETS.s;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.button,
        {
          width: preset.size,
          height: preset.size,
          borderRadius: preset.size / 2,
          borderWidth: preset.borderWidth,
          borderColor: active ? color : inactiveColor,
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.label,
          {
            color: active ? color : inactiveColor,
            fontSize: preset.fontSize,
          },
          labelStyle,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontWeight: "bold",
  },
});

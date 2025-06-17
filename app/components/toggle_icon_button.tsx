import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { ToggleIconButtonProps } from "../types";

export default function ToggleIconButton({
  label,
  active = false,
  color = "#4caf50",
  onPress,
  style,
  labelStyle,
}: ToggleIconButtonProps) {
  const inactiveColor = "#bbb";

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.button,
        {
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
    width: 34,
    height: 34,
    borderRadius: 18,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    // marginHorizontal: 4,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

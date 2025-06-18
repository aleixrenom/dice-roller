import React from "react";
import { StyleSheet, View } from "react-native";
import { ToggleIconButtonGroupProps } from "../types";
import ToggleIconButton from "./toggle_icon_button";

export default function ToggleIconButtonGroup({
  options,
  value,
  onChange,
  style,
}: ToggleIconButtonGroupProps) {
  return (
    <View style={[styles.group, style]}>
      {options.map((option) => (
        <ToggleIconButton
          key={option.key}
          label={option.label}
          color={option.color}
          size={option.size}
          active={value === option.key}
          onPress={() => onChange(option.key)}
          style={option.style}
          labelStyle={option.labelStyle}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

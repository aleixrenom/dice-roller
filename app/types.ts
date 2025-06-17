import { TextStyle, ViewStyle } from "react-native";

export type ModifierOption = {
  label: string;
  value: string;
};

export type RollResult = {
  rolls: { notation: string; results: number[] }[];
  modifiers: number[];
  total: number;
};

export type NamedRollProps = {
  name: string;
  description: string;
  modifiers?: ModifierOption[]; // Array of possible modifiers for this roll
  result?: RollResult;
  onRoll?: () => void;
  onModifiers?: () => void;
};

export type ToggleIconButtonProps = {
  label: string; // Icon, letter, or text
  active?: boolean;
  color?: string; // Main color when active
  onPress?: () => void;
  style?: ViewStyle;
  labelStyle?: TextStyle;
};

export type ToggleOption = Omit<ToggleIconButtonProps, "active" | "onPress"> & {
  key: string;
};

export type ToggleIconButtonGroupProps = {
  options: ToggleOption[];
  value: string | null; // key of the active option, or null for none
  onChange: (key: string) => void;
  style?: ViewStyle;
};

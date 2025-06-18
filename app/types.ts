import { TextStyle, ViewStyle } from "react-native";

export const SIZE_PRESETS = {
  xs: { size: 24, fontSize: 12, borderWidth: 2 },
  s: { size: 34, fontSize: 18, borderWidth: 3 },
  m: { size: 44, fontSize: 22, borderWidth: 3 },
  l: { size: 56, fontSize: 28, borderWidth: 4 },
  xl: { size: 72, fontSize: 36, borderWidth: 5 },
} as const;

export type SizeName = keyof typeof SIZE_PRESETS;

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
  size?: SizeName;
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

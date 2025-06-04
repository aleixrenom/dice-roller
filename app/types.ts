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
  result?: string | number;
  onRoll?: () => void;
  onModifiers?: () => void;
};

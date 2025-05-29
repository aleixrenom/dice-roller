export type RollResult = {
  rolls: { notation: string; results: number[] }[];
  modifiers: number[];
  total: number;
};

export type NamedRollProps = {
  name: string;
  description: string;
  result?: string | number;
  onRoll?: () => void;
  onModifiers?: () => void;
};

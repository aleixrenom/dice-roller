import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NamedRoll from "../components/named_roll";
import rollsData from "../data/example_rolls.json";
import type { NamedRollProps, RollOptions, RollResult } from "../types";
import { rollDiceString } from "../utils/dice";

const ROLLS: NamedRollProps[] = rollsData;

export default function MainScreen() {
  const [results, setResults] = useState<(RollResult | undefined)[]>(
    Array(ROLLS.length).fill(undefined)
  );
  // Track selected modifiers by roll index: { [rollIdx]: Set of selected modifier indices }
  const [selectedModifiers, setSelectedModifiers] = useState<{
    [rollIdx: number]: number[];
  }>({});
  // Modifiers are added numbers and dice, roll options are things like advantage/disadvantage
  const [rollOptionsByIdx, setRollOptionsByIdx] = useState<{
    [rollIdx: number]: RollOptions;
  }>({});

  const handleRoll = (idx: number) => {
    const base = ROLLS[idx].description;
    const mods = (ROLLS[idx].modifiers || [])
      .filter((_, mIdx) => selectedModifiers[idx]?.includes(mIdx))
      .map((mod) => mod.value)
      .join(" + ");
    const fullNotation = mods ? `${base} + ${mods}` : base;
    const roll: RollResult = rollDiceString(
      fullNotation,
      rollOptionsByIdx[idx] || {}
    );
    setResults((prev) => {
      const next = [...prev];
      next[idx] = roll;
      return next;
    });
  };

  const handleToggleModifier = (rollIdx: number, modIdx: number) => {
    setSelectedModifiers((prev) => {
      const current = prev[rollIdx] || []; // from the current named roll in the current state (previous from the change)...
      const exists = current.includes(modIdx); // ...check if the modifier is already selected
      return {
        ...prev,
        [rollIdx]: exists
          ? current.filter((i) => i !== modIdx) // return a new array with any values that are not the one being toggled (filter out the modifier)
          : [...current, modIdx], // or add the modifier to the current array
      };
    });
  };

  const handleToggleRollOptions = (rollIdx: number, options: RollOptions) => {
    setRollOptionsByIdx((prev) => ({
      ...prev,
      [rollIdx]: options,
    }));
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.leftButton}>
          <Text>Edit Profiles</Text>
        </TouchableOpacity>
        <View style={styles.spacer} />
        <TouchableOpacity style={styles.rightButton}>
          <Text>Choose Profile</Text>
        </TouchableOpacity>
      </View>
      {/* Rolls List Area */}
      <View style={styles.rollsArea}>
        <ScrollView contentContainerStyle={{ paddingBottom: 16 }}>
          {ROLLS.map((roll, idx) => (
            <NamedRoll
              key={roll.name}
              name={roll.name}
              description={roll.description}
              modifiers={roll.modifiers}
              selectedModifiers={selectedModifiers[idx] || []}
              onToggleModifier={(modIdx) => handleToggleModifier(idx, modIdx)}
              onToggleRollOptions={(options) =>
                handleToggleRollOptions(idx, options)
              }
              activeRollOptions={rollOptionsByIdx[idx] || {}}
              result={results[idx]}
              onRoll={() => handleRoll(idx)}
              onModifiers={() => {}}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    paddingHorizontal: 16,
  },
  leftButton: {
    padding: 8,
    backgroundColor: "#ddd",
  },
  rightButton: {
    padding: 8,
    backgroundColor: "#ddd",
  },
  spacer: {
    flex: 1,
  },
  rollsArea: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
});

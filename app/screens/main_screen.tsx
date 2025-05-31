import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import NamedRoll from "../components/named_roll";
import rollsData from "../data/example_rolls.json";
import type { NamedRollProps } from "../types";
import { rollDiceString } from "../utils/dice";

const ROLLS: NamedRollProps[] = rollsData;

export default function MainScreen() {
  const [results, setResults] = useState<(number | undefined)[]>(
    Array(ROLLS.length).fill(undefined)
  );

  const handleRoll = (idx: number) => {
    const roll = rollDiceString(ROLLS[idx].description);
    setResults((prev) => {
      const next = [...prev];
      next[idx] = roll.total;
      return next;
    });
  };

  return (
    <View style={styles.container}>
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
        {ROLLS.map((roll, idx) => (
          <NamedRoll
            key={roll.name}
            name={roll.name}
            description={roll.description}
            result={results[idx]}
            onRoll={() => handleRoll(idx)}
            onModifiers={() => {}}
          />
        ))}
      </View>
    </View>
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

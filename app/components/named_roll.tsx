import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { NamedRollProps, RollResult } from "../types";
import ModifiersModal from "./modifiers_modal";

type NamedRollExtendedProps = NamedRollProps & {
  selectedModifiers?: number[];
  onToggleModifier?: (modIdx: number) => void;
};

export default function NamedRoll({
  name,
  description,
  result,
  onRoll,
  onModifiers,
  modifiers = [],
  selectedModifiers = [],
  onToggleModifier,
}: NamedRollExtendedProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleModifiersPress = () => {
    setModalVisible(true);
    if (onModifiers) onModifiers();
  };

  // Compose the roll description with selected modifiers
  const selectedModsString =
    selectedModifiers.length > 0 && modifiers.length > 0
      ? selectedModifiers
          .map((idx) => modifiers[idx]?.value)
          .filter(Boolean)
          .join("")
      : "";

  const fullDescription = selectedModsString
    ? `${description}${selectedModsString}`
    : description;

  return (
    <View style={styles.container}>
      {/* Left: Info and Result Box */}
      <View style={styles.leftArea}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ maxWidth: "100%" }}
        >
          <Text style={styles.rollName}>{name}</Text>
        </ScrollView>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ maxWidth: "100%" }}
        >
          <Text style={styles.rollDescription}>{fullDescription}</Text>
        </ScrollView>
        <View style={styles.resultBox}>
          {/* Roll analysis is able to be scrolled horizontally when it overflows, to avoid wrapping */}
          {/* TODO: figure out a way to visually show the user that it can be scrolled, maybe gradient */}
          {result !== undefined && (
            <View style={styles.analysisScroll}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Text style={styles.rollAnalysis}>
                  {formatRollAnalysis(result)}
                </Text>
              </ScrollView>
            </View>
          )}
          <Text style={styles.resultText}>
            {result?.total !== undefined ? result.total : "-"}
          </Text>
        </View>
      </View>
      {/* Right: Buttons */}
      <View style={styles.buttonArea}>
        <TouchableOpacity style={styles.rollButton} onPress={onRoll}>
          <Text style={styles.rollButtonText}>Roll</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.modifiersButton}
          onPress={handleModifiersPress}
        >
          <Text style={styles.modifiersButtonText}>Modifiers</Text>
        </TouchableOpacity>
      </View>
      {/* Modifiers Modal */}
      <ModifiersModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        modifiers={modifiers}
        selectedModifiers={selectedModifiers}
        onToggleModifier={onToggleModifier}
      />
    </View>
  );
}

// Helper to format the roll analysis string
function formatRollAnalysis(result: RollResult) {
  if (!result) return "";
  // result.rolls: [{ notation: string, results: number[] }]
  // result.modifiers: number[]
  // result.total: number

  const diceParts = result.rolls.map(
    (roll) => `${roll.notation} (${roll.results.join(", ")})`
  );
  const modifierParts = result.modifiers.map((mod) =>
    mod >= 0 ? `${mod}` : `${mod}`
  );
  return [...diceParts, ...modifierParts].join(" + ");
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 12,
    marginVertical: 8,
    backgroundColor: "#f7f7f7",
    borderRadius: 10,
    alignItems: "flex-start",
    elevation: 2,
  },
  leftArea: {
    flex: 1,
    marginRight: 12,
    justifyContent: "flex-start",
  },
  rollName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 2,
  },
  rollDescription: {
    fontSize: 14,
    color: "#888",
    marginBottom: 8,
  },
  resultBox: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    width: "100%",
    minHeight: 60,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
    height: 68, // Reserve space for both analysis and result (adjustable depending on the font size)
  },
  analysisScroll: {
    width: "100%",
    alignItems: "center",
    minHeight: 18,
  },
  rollAnalysis: {
    fontSize: 13,
    color: "#555",
    marginBottom: 2,
    textAlign: "center",
    minHeight: 18, // Reserve space for analysis line even if not shown
  },
  resultText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    minHeight: 32, // Reserve space for result number
  },
  buttonArea: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginLeft: 8,
  },
  rollButton: {
    backgroundColor: "#4caf50",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 8,
    minWidth: 80,
    alignItems: "center",
  },
  rollButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  modifiersButton: {
    backgroundColor: "#eee",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  modifiersButtonText: {
    color: "#333",
    fontSize: 14,
  },
});

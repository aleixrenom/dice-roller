import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NamedRollProps } from "../types";
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

  return (
    <View style={styles.container}>
      {/* Left: Result and Info */}
      <View style={styles.infoArea}>
        <Text style={styles.rollName}>{name}</Text>
        <Text style={styles.rollDescription}>
          {description}
          {selectedModifiers.length > 0 && modifiers.length > 0 && (
            <Text style={styles.selectedMods}>
              {selectedModifiers
                .map((idx) => modifiers[idx]?.value)
                .filter(Boolean)
                .join("")}
            </Text>
          )}
        </Text>
        <View style={styles.resultBox}>
          <Text style={styles.resultText}>
            {result !== undefined ? result : "-"}
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

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 12,
    marginVertical: 8,
    backgroundColor: "#f7f7f7",
    borderRadius: 10,
    alignItems: "center",
    elevation: 2,
  },
  infoArea: {
    flex: 1,
    marginRight: 12,
    justifyContent: "center",
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
  selectedMods: {
    fontSize: 13,
    color: "#4caf50",
  },
  resultBox: {
    backgroundColor: "#fff",
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: "flex-start",
    marginTop: 4,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  resultText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  buttonArea: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
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

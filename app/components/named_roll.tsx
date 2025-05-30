import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NamedRollProps } from "../types";

export default function NamedRoll({
  name,
  description,
  result,
  onRoll,
  onModifiers,
}: NamedRollProps) {
  return (
    <View style={styles.container}>
      {/* Left: Result and Info */}
      <View style={styles.infoArea}>
        <Text style={styles.rollName}>{name}</Text>
        <Text style={styles.rollDescription}>{description}</Text>
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
        <TouchableOpacity style={styles.modifiersButton} onPress={onModifiers}>
          <Text style={styles.modifiersButtonText}>Modifiers</Text>
        </TouchableOpacity>
      </View>
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

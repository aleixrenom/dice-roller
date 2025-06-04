import React from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import type { ModifierOption as ModifierOptionType } from "../types";
import ModifierOption from "./modifier_option";

type ModifiersModalProps = {
  visible: boolean;
  onClose: () => void;
  modifiers?: ModifierOptionType[];
  selectedModifiers?: number[];
  onToggleModifier?: (modIdx: number) => void;
};

export default function ModifiersModal({
  visible,
  onClose,
  modifiers = [],
  selectedModifiers = [],
  onToggleModifier,
}: ModifiersModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.modalBox} onStartShouldSetResponder={() => true}>
          <Text style={styles.title}>Select Modifiers</Text>
          <ScrollView style={styles.modifiersList}>
            {modifiers.length === 0 && (
              <Text style={{ color: "#888", textAlign: "center" }}>
                No modifiers available.
              </Text>
            )}
            {modifiers.map((mod, idx) => (
              <ModifierOption
                key={mod.label}
                label={mod.label}
                checked={selectedModifiers.includes(idx)}
                onToggle={() => onToggleModifier && onToggleModifier(idx)}
              />
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  modifiersList: {
    maxHeight: 200,
    alignSelf: "stretch",
    marginBottom: 16,
  },
  closeButton: {
    marginTop: 8,
    backgroundColor: "#eee",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  closeButtonText: {
    fontSize: 16,
    color: "#333",
  },
});

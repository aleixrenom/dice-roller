// This file contains many comments used for my own learning purposes, for me to later on be able to come here and refresh my knowledge. Any readers may ignore these non-functional comments.

import React from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import type {
  ModifierOption as ModifierOptionType,
  RollOptions,
  ToggleOption,
} from "../types";
import ModifierOption from "./modifier_option";
import ToggleIconButtonGroup from "./toggle_icon_button_group";

type ModifiersModalProps = {
  visible: boolean;
  onClose: () => void;
  modifiers?: ModifierOptionType[];
  selectedModifiers?: number[];
  onToggleModifier?: (modIdx: number) => void;
  onToggleRollOptions?: (options: RollOptions) => void;
  activeRollOptions?: RollOptions;
};

// Definition for the toggles used for Advantage, Disadvantage, and Critical
const ADC_TOGGLES: ToggleOption[] = [
  { key: "A", label: "A", color: "green", size: "s" },
  { key: "D", label: "D", color: "red" },
  { key: "x2", label: "x2", color: "blue" },
];

export default function ModifiersModal({
  visible,
  onClose,
  modifiers = [],
  selectedModifiers = [],
  onToggleModifier,
  onToggleRollOptions,
  activeRollOptions = {},
}: ModifiersModalProps) {
  const { height: windowHeight } = useWindowDimensions();
  const MODAL_MAX_HEIGHT = Math.max(320, Math.floor(windowHeight * 0.8)); // 80% of window height, but at least 320px
  const MODAL_MIN_HEIGHT = 180;
  const SCROLLVIEW_MAX_HEIGHT = MODAL_MAX_HEIGHT - 140; // leave space for title and button

  const currentKey = activeRollOptions.advantage
    ? "A"
    : activeRollOptions.disadvantage
    ? "D"
    : activeRollOptions.doubleDice
    ? "x2"
    : null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <KeyboardAvoidingView // Remain visible when the keyboard is displayed.
          behavior={Platform.OS === "ios" ? "padding" : undefined} // Use "padding" for iOS to avoid layout issues when keyboard appears
          style={styles.centered}
        >
          <View
            style={[
              styles.modalBox,
              { maxHeight: MODAL_MAX_HEIGHT, minHeight: MODAL_MIN_HEIGHT },
            ]}
            onStartShouldSetResponder={() => true} // Responder = handles touch events. Avoids the above Pressurable to receive said touch events, which would close the modal.
          >
            {/* There is three parts of this modal: the title (with generic roll option toggles underneath), the scrollview, and the button. The scrollview will shrink to let the other two always be on the screen, that's why it is a scrollview instead of a regular one, so the contents will be able to be scrolled through. */}
            <Text style={styles.title}>Select Modifiers</Text>
            <ToggleIconButtonGroup
              options={ADC_TOGGLES}
              value={currentKey}
              onChange={(key) => {
                if (onToggleRollOptions) {
                  // If the clicked key is already active, toggle it off (set to none)
                  if (key === currentKey) {
                    onToggleRollOptions({});
                  } else {
                    const options: RollOptions = {};
                    if (key === "A") options.advantage = true;
                    else if (key === "D") options.disadvantage = true;
                    else if (key === "x2") options.doubleDice = true;
                    onToggleRollOptions(options);
                  }
                }
              }}
            />
            <View style={styles.listContainer}>
              <ScrollView
                style={[
                  // Affects the scrollview itself, not the contents.
                  styles.modifiersList,
                  { maxHeight: SCROLLVIEW_MAX_HEIGHT },
                ]}
                contentContainerStyle={styles.modifiersListContent} // Affects only the contents of the scrollview instead.
                keyboardShouldPersistTaps="handled" // Tapping a touchable does not close the keyboard, tapping anything else does.
                showsVerticalScrollIndicator
              >
                {modifiers.length === 0 && (
                  <Text style={{ color: "#888", textAlign: "center" }}>
                    No modifiers available.
                  </Text>
                )}
                {/* If there are no modifiers render the text, else... */}
                {modifiers.map((mod, idx) => (
                  <ModifierOption
                    key={mod.label}
                    label={mod.label}
                    checked={selectedModifiers.includes(idx)}
                    onToggle={() => onToggleModifier && onToggleModifier(idx)} // Similar to above, if onToggleModifier exists, then call the function.
                  />
                ))}
              </ScrollView>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    // The Pressabe that covers the entire screen, allowing to close the modal when tapped outside.
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)", // Semi-transparent black background
    // Center the modal in the middle of the screen (which is covered by the overlay).
    justifyContent: "center",
    alignItems: "center",
  },
  centered: {
    // Expands the KeyboardAvoidingView to fill the size of the overlay, giving the modalBox the room it needs.
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  modalBox: {
    width: "90%", // Take up the majority of the screen (not all for more modern look) or maxWidth.
    maxWidth: 400, // 280 - 560 seems to be standard for dialogs, with 400 being a nice middle ground.
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingTop: 24,
    paddingBottom: 16,
    paddingHorizontal: 20,
    alignItems: "center",
    elevation: 5, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    flexDirection: "column",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    alignSelf: "flex-start", // Overrides parent's centering. Standard in dialogs for the title to be left-aligned.
  },
  listContainer: {
    // Layout container for the ScrollView for easier, more flexible styling.
    width: "100%",
    marginBottom: 16,
    minHeight: 0,
  },
  modifiersList: {
    // The ScrollView itself.
    width: "100%",
    minHeight: 0,
  },
  modifiersListContent: {
    // The contents of the ScrollView.
    paddingBottom: 8,
  },
  closeButton: {
    backgroundColor: "#eee",
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 0,
  },
  closeButtonText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
});

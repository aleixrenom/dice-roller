import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
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
        <Text>Rolls List goes here</Text>
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

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import NamedRoll from "./components/named_roll";

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
        <NamedRoll
          name="Attack Roll"
          description="1d20 + 5"
          result={17}
        />
        <NamedRoll
          name="Fireball Damage"
          description="8d6"
          result={28}
        />
        <NamedRoll
          name="Stealth Check"
          description="1d20 + 3"
          result={14}
        />
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

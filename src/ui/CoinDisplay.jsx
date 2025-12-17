import { StyleSheet, Text, View } from "react-native";

export default function CoinDisplay({ coins }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🪙 {coins}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000a",
    padding: 6,
    borderRadius: 6,
  },
  text: { color: "#fff", fontWeight: "bold" },
});

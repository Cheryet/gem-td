import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function InventoryPanel({ gems, onSelectGem }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inventory</Text>
      <FlatList
        data={gems}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.gem, { backgroundColor: item.colors[0] || "gray" }]}
            onPress={() => onSelectGem(item)}
          >
            <Text style={styles.gemText}>{item.shape}</Text>
            <Text style={styles.gemText}>{item.sides}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 4 },
  title: { color: "#fff", fontWeight: "bold", marginBottom: 4 },
  gem: {
    width: 50,
    height: 50,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  gemText: { color: "#fff", fontSize: 12, textAlign: "center" },
});

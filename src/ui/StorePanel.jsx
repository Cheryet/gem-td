import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { STORE_GEMS } from "../game/data/store";

export default function StorePanel({ coins, onBuyGem }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Store</Text>

      {STORE_GEMS.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={[
            styles.item,
            coins < item.cost && styles.disabled,
          ]}
          onPress={() => onBuyGem(item)}
          disabled={coins < item.cost}
        >
          <Text style={styles.text}>
            {item.shape} ({item.colors.join(", ")})
          </Text>
          <Text style={styles.text}>Cost: {item.cost}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { color: "#fff", fontWeight: "bold", marginBottom: 8 },
  item: {
    padding: 8,
    backgroundColor: "#444",
    marginBottom: 6,
    borderRadius: 6,
  },
  disabled: {
    opacity: 0.4,
  },
  text: { color: "#fff" },
});

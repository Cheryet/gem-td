import { Text, View } from "react-native";

export default function CoinDisplay({ coins = 0, wave = 0 }) {
  return (
    <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-around"}}>
      <Text style={{ color: "#fff" }}>Coins: {coins}</Text>
      <Text style={{ color: "#fff" }}>Wave: {wave}</Text>
    </View>
  );
}

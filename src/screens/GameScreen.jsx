import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import GameCanvas from "../game/GameCanvas";
import CoinDisplay from "../ui/CoinDisplay";
import InventoryPanel from "../ui/InventoryPanel";
import StorePanel from "../ui/StorePanel";

export default function GameScreen() {
  const [activeTab, setActiveTab] = useState("inventory"); // tabs: inventory, store, menu

  return (
    <View style={styles.container}>
      {/* --- Gameplay Area --- */}
      <View style={styles.gameplayArea}>
        <GameCanvas />
      </View>

      {/* --- Floating Coin / Wave Info --- */}
      <CoinDisplay style={styles.coinDisplay} />

      {/* --- Bottom Panel: Inventory / Store / Menu --- */}
      <View style={styles.bottomPanel}>
        {activeTab === "inventory" && <InventoryPanel />}
        {activeTab === "store" && <StorePanel />}
        {activeTab === "menu" && (
          <View style={styles.menuPlaceholder}>
            <Text>Menu / Settings</Text>
          </View>
        )}

        {/* --- Simple tab switcher --- */}
        <View style={styles.tabBar}>
          <Text style={styles.tab} onPress={() => setActiveTab("inventory")}>
            Inventory
          </Text>
          <Text style={styles.tab} onPress={() => setActiveTab("store")}>
            Store
          </Text>
          <Text style={styles.tab} onPress={() => setActiveTab("menu")}>
            Menu
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#222" },
  gameplayArea: { flex: 3 }, // top 3/4 approx
  bottomPanel: {
    flex: 1, // bottom 1/4
    backgroundColor: "#000",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 8,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 8,
  },
  tab: { color: "#fff", fontWeight: "bold" },
  menuPlaceholder: { flex: 1, justifyContent: "center", alignItems: "center" },
  coinDisplay: {
    position: "absolute",
    top: 16,
    left: 16,
    zIndex: 10,
    color: "#fff",
  },
});

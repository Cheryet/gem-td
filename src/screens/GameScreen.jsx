import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GameCanvas from "../game/GameCanvas";
import useInventory from "../hooks/useInventory";
import CoinDisplay from "../ui/CoinDisplay";
import InventoryPanel from "../ui/InventoryPanel";
import StorePanel from "../ui/StorePanel";

export default function GameScreen() {
  const [activeTab, setActiveTab] = useState("inventory"); // tabs: inventory, store, menu

// --- Inventory ---
const { gems } = useInventory();
const onSelectGem = (gem) => {
  console.log("Selected gem:", gem);
};

// --- Store ---

// --- Menu ---

  
  return (
    <SafeAreaView style={styles.container}>
      {/* --- Gameplay Area --- */}
      <View style={styles.gameplayArea}>
        <GameCanvas />
      </View>

      {/* --- Floating Coin / Wave Info --- */}
      <CoinDisplay style={styles.coinDisplay} />


       {/* --- Bottom Panel: Inventory / Store / Menu --- */}
      <View style={styles.bottomPanel}>
        {activeTab === "inventory" && <InventoryPanel gems={gems} onSelectGem={onSelectGem} />}
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
          <View style={styles.tabDivider} />
          <Text style={styles.tab} onPress={() => setActiveTab("store")}>
            Store
          </Text>
          <View style={styles.tabDivider} />
          <Text style={styles.tab} onPress={() => setActiveTab("menu")}>
            Menu
          </Text>
        </View>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#222" },
  gameplayArea: { flex: 3 }, // top 3/4 approx
  bottomPanel: {
    flex: 1, // bottom 1/4
    backgroundColor: "#626262ff",
    borderRadius: 8,
    paddingTop: 8,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
    backgroundColor: "#4f4e4eff",
  },
  tab: { color: "#fff", fontWeight: "bold" },
  tabDivider: {
    width: 1,
    height: "80%",
    backgroundColor: "#bfbfbf66",
    alignSelf: "center",
  },
  menuPlaceholder: { flex: 1, justifyContent: "center", alignItems: "center" },
  coinDisplay: {
    position: "absolute",
    top: 16,
    left: 16,
    zIndex: 10,
    color: "#fff",
  },
});

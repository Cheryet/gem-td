import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TOWERS } from "../game/data/constants";
import Gem from "../game/entities/Gem";
import Tower from "../game/entities/Tower";
import GameCanvas from "../game/GameCanvas";
import { gridCenterToPixel } from "../game/utils/grid";
import useInventory from "../hooks/useInventory";
import useStore from "../hooks/useStore";
import CoinDisplay from "../ui/CoinDisplay";
import InventoryPanel from "../ui/InventoryPanel";
import StorePanel from "../ui/StorePanel";

export default function GameScreen() {
  const [activeTab, setActiveTab] = useState("inventory"); // tabs: inventory, store, menu
  const [selectedGem, setSelectedGem] = useState(null);

  const { coins, spendCoins } = useStore();

  // --- Towers state (lifted here for gem assignment) ---
  const [towers, setTowers] = useState(() =>
    TOWERS.map((t) => {
      const { x, y } = gridCenterToPixel({ col: t.col, row: t.row });
      return new Tower(t.id, x, y);
    })
  );

  // --- Inventory ---
  const inventory = useInventory();
  const { gems, addGem, removeGem } = inventory;

  const onSelectGem = (gem) => {
    setSelectedGem(gem);
  };

  // --- Store ---
  const onBuyGem = (storeItem) => {
    const success = spendCoins(storeItem.cost);
    if (!success) return;

    const newGem = new Gem(
      Date.now(),
      storeItem.shape,
      storeItem.sides,
      storeItem.colors
    );

    addGem(newGem);
  };

  // --- Tower Logic ---
  const onTowerPress = (towerId) => {
    if (!selectedGem) return;           // nothing selected

    setTowers((prev) =>
      prev.map((t) => {
        if (t.id !== towerId) return t;
        if (t.hasGem()) return t;       // tower already has gem

        // Create new tower instance with gem assigned
        const updated = new Tower(t.id, t.x, t.y);
        updated.assignGem(selectedGem);
        return updated;
      })
    );

    removeGem(selectedGem.id);          // remove gem from inventory
    setSelectedGem(null);               // clear selection
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* --- Gameplay Area --- */}
      <View style={styles.gameplayArea}>
        <GameCanvas
          towers={towers}
          selectedGem={selectedGem}
          onTowerPress={onTowerPress}
        />
      </View>

      {/* --- Floating Coin / Wave Info --- */}
      <CoinDisplay coins={coins} style={styles.coinDisplay} />

      {/* --- Bottom Panel: Inventory / Store / Menu --- */}
      <View style={styles.bottomPanel}>
        {activeTab === "inventory" && (
          <InventoryPanel gems={gems} selectedGem={selectedGem} onSelectGem={onSelectGem} />
        )}
        {activeTab === "store" && <StorePanel coins={coins} onBuyGem={onBuyGem} />}
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
  gameplayArea: { flex: 3 },
  bottomPanel: {
    flex: 1,
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
  coinDisplay: { position: "absolute", top: 16, left: 16, zIndex: 10 },
});

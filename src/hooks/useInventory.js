import { useState } from "react";
import Gem from "../game/entities/Gem";

export default function useInventory() {
  const [gems, setGems] = useState([
    new Gem(1, "circle", 3, ["red"]),
    new Gem(2, "triangle", 3, ["blue"]),
    new Gem(3, "square", 4, ["green"]),
  ]);

  const addGem = (gem) => setGems((prev) => [...prev, gem]);
  const removeGem = (gemId) =>
    setGems((prev) => prev.filter((g) => g.id !== gemId));

  return { gems, addGem, removeGem };
}

import { useState } from "react";

export function useTowers(initialTowers = []) {
  const [towers, setTowers] = useState(initialTowers);

  function assignGem(towerId, gem) {
    setTowers((prev) =>
      prev.map((tower) =>
        tower.id === towerId ? { ...tower, gem } : tower
      )
    );
  }

  function addTower(tower) {
    setTowers((prev) => [...prev, tower]);
  }

  return {
    towers,
    assignGem,
    addTower,
  };
}

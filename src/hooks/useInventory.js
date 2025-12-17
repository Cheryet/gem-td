import { useMemo, useState } from "react";

export function useInventory(initialGems = []) {
  const [gems, setGems] = useState(initialGems);

  function addGem(gem) {
    setGems((prev) => [...prev, gem]);
  }

  function removeGem(index) {
    setGems((prev) => prev.filter((_, i) => i !== index));
  }

  const gemCount = useMemo(() => gems.length, [gems]);

  return {
    gems,
    gemCount,
    addGem,
    removeGem,
  };
}

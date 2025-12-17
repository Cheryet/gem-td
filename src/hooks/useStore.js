import { useState } from "react";

export function useStore(initialCoins = 0) {
  const [coins, setCoins] = useState(initialCoins);

  function addCoins(amount) {
    setCoins((prev) => prev + amount);
  }

  function spendCoins(amount) {
    if (amount > coins) return false;
    setCoins((prev) => prev - amount);
    return true;
  }

  return {
    coins,
    addCoins,
    spendCoins,
  };
}

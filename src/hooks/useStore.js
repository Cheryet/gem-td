import { useState } from "react";

export default function useEconomy() {
  const [coins, setCoins] = useState(100); // start with test coins

  const earnCoins = (amount) => {
    setCoins((prev) => prev + amount);
  };

  const spendCoins = (amount) => {
    if (coins < amount) return false;
    setCoins((prev) => prev - amount);
    return true;
  };

  return {
    coins,
    earnCoins,
    spendCoins,
  };
}

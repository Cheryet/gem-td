export const EconomySystem = {
  coins: 0,

  addCoins(amount) {
    this.coins += amount;
  },

  spendCoins(amount) {
    if (amount > this.coins) {
      return false;
    }
    this.coins -= amount;
    return true;
  },
};

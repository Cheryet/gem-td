export default class Tower {
  constructor(id, x, y) {
    this.id = id;
    this.x = x; // X position on the grid
    this.y = y; // Y position on the grid
    this.gem = null; // gem assigned to tower {gem: {sides: Number, colors: [String]}}
  }

  assignGem(gem) {
    this.gem = gem;
  }

  removeGem() {
    const oldGem = this.gem;
    this.gem = null;
    return oldGem;
  }

  getDamage() {
    if (!this.gem) return 0;
    return this.gem.sides; // simple base damage = gem sides
  }

  getEffects() {
    if (!this.gem) return [];
    return this.gem.colors; // e.g., red = attack speed, blue = slow
  }

  hasGem() {
    return this.gem !== null;
  }
}

export default class Gem {
  constructor(id, shape, sides = 3, colors = []) {
    this.id = id;
    this.shape = shape; // e.g., "circle", "triangle"
    this.sides = sides; // number of sides = strength
    this.colors = colors; // e.g., ["red"] or ["red", "blue"]
  }
}
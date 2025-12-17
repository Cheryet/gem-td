import { TILE_SIZE } from "../data/constants";

export const GridPos = {
  col: Number,
  row: Number,
};

export function gridToPixel(pos) {
  return {
    x: pos.col * TILE_SIZE,
    y: pos.row * TILE_SIZE,
  };
}

export function gridCenterToPixel(pos) {
  return {
    x: pos.col * TILE_SIZE + TILE_SIZE / 2,
    y: pos.row * TILE_SIZE + TILE_SIZE / 2,
  };
}

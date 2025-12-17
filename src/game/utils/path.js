import { gridCenterToPixel } from "./grid";

export function pathToPixels(path) {
  return path.map(gridCenterToPixel);
}
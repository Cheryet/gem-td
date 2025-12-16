export interface GridCell {
  x: number;
  y: number;
  walkable: boolean;
  buildable: boolean;
}

export interface Grid {
  width: number;
  height: number;
  cells: GridCell[][];
}

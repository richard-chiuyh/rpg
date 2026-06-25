import { type ComponentType } from "react";
import { ChestIcon, EnemyIcon, TreeIcon } from "./tileIcons";

export const TILE = {
  EMPTY: 0,
  TREE: 1,
  CHEST: 2,
  ENEMY: 3
} as const;

interface TileDef {
  label: string;
  className: string;
  Icon: ComponentType;
  blocking?: boolean;
}

export const TILES: Record<number, TileDef> = {
  [TILE.TREE]: {
    label: "Tree",
    className: "border-tree text-tree",
    Icon: TreeIcon,
    blocking: true
  },
  [TILE.CHEST]: { label: "Chest", className: "border-chest text-chest", Icon: ChestIcon },
  [TILE.ENEMY]: { label: "Enemy", className: "border-enemy text-enemy", Icon: EnemyIcon }
};

export function isWalkable(code: number): boolean {
  return TILES[code]?.blocking !== true;
}

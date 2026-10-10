import { createContext, useContext } from "react";
import type { EquipmentSlot } from "../data/items";

export interface GameMap {
  map_width: number;
  map_height: number;
  data: number[][];
}

export interface Position {
  x: number;
  y: number;
}

export type UnitKind = "chest" | "npc" | "enemy";

export interface GameUnit extends Position {
  id: string;
  name: string;
  kind: UnitKind;
  hp?: number;
  maxHp?: number;
}

export interface InventoryEntry {
  itemId: string;
  quantity: number;
}

export interface GameContextValue {
  gameMap: GameMap | null;
  mapError: string | null;
  player: Position;
  hp: number;
  maxHp: number;
  level: number;
  xp: number;
  gold: number;
  inventory: InventoryEntry[];
  equipment: Record<EquipmentSlot, string | null>;
  units: GameUnit[];
  movePlayer: (delta: Position) => void;
  equipItem: (itemId: string) => void;
  unequipItem: (slot: EquipmentSlot) => void;
  consumeItem: (itemId: string) => void;
}

export const GameContext = createContext<GameContextValue | null>(null);

export function useGame(): GameContextValue {
  const game = useContext(GameContext);
  if (!game) {
    throw new Error("useGame must be used within a GameProvider.");
  }
  return game;
}

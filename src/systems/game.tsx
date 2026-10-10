import { useEffect, useState, type ReactNode } from "react";
import { ITEMS, type EquipmentSlot } from "../data/items";
import { GameContext, type GameMap, type Position } from "./gameContext";
import { addToInventory, removeFromInventory } from "./items";
import { canMoveTo } from "./movement";
import type { InventoryEntry } from "./gameContext";
import { createUnits } from "./units";

const INITIAL_PLAYER: Position = { x: 7, y: 7 };
const INITIAL_EQUIPMENT: Record<EquipmentSlot, string | null> = {
  weapon: null,
  armor: null,
  helmet: null,
  shoes: null,
  accessory: null,
  offhand: null
};
const INITIAL_INVENTORY = [
  { itemId: "sword", quantity: 1 },
  { itemId: "potion", quantity: 1 }
];

function isGameMap(value: unknown): value is GameMap {
  if (
    typeof value !== "object" ||
    value === null ||
    !("map_width" in value) ||
    !("map_height" in value) ||
    !("data" in value)
  ) {
    return false;
  }

  const { map_width, map_height, data } = value;
  return (
    typeof map_width === "number" &&
    Number.isInteger(map_width) &&
    map_width > 0 &&
    typeof map_height === "number" &&
    Number.isInteger(map_height) &&
    map_height > 0 &&
    Array.isArray(data) &&
    data.length === map_height &&
    data.every(
      (row: unknown) =>
        Array.isArray(row) &&
        row.length === map_width &&
        row.every((code: unknown) => Number.isInteger(code))
    )
  );
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameMap, setGameMap] = useState<GameMap | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [player, setPlayer] = useState(INITIAL_PLAYER);
  const [hp, setHp] = useState(30);
  const xp = 0;
  const gold = 0;
  const [inventory, setInventory] = useState<InventoryEntry[]>(INITIAL_INVENTORY);
  const [equipment, setEquipment] = useState(INITIAL_EQUIPMENT);
  const [units, setUnits] = useState<ReturnType<typeof createUnits>>([]);
  const maxHp = 30;
  const level = Math.floor(xp / 100) + 1;

  useEffect(() => {
    let cancelled = false;

    async function loadMap() {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}map/map.json`);
        if (!response.ok) {
          throw new Error(`Map request failed with status ${response.status}.`);
        }
        const data: unknown = await response.json();
        if (!isGameMap(data)) {
          throw new Error("Map data has an invalid format.");
        }
        if (!cancelled) {
          setGameMap(data);
          setUnits(createUnits(data));
        }
      } catch (error) {
        if (!cancelled) {
          setMapError(error instanceof Error ? error.message : String(error));
        }
      }
    }

    void loadMap();
    return () => {
      cancelled = true;
    };
  }, []);

  function movePlayer(delta: Position) {
    if (!gameMap) {
      return;
    }
    const next = canMoveTo(gameMap, player, delta, units);
    if (next) {
      setPlayer(next);
    }
  }

  function equipItem(itemId: string) {
    const item = ITEMS[itemId];
    if (item?.category !== "equipment" || !item.slot) {
      return;
    }
    if (!inventory.some((entry) => entry.itemId === itemId)) {
      return;
    }
    const replaced = equipment[item.slot];
    setInventory((current) => {
      const withoutNewItem = removeFromInventory(current, itemId);
      return replaced ? addToInventory(withoutNewItem, replaced) : withoutNewItem;
    });
    const slot = item.slot;
    setEquipment((current) => ({ ...current, [slot]: itemId }));
  }

  function unequipItem(slot: EquipmentSlot) {
    const itemId = equipment[slot];
    if (!itemId) {
      return;
    }
    setEquipment((current) => ({ ...current, [slot]: null }));
    setInventory((current) => addToInventory(current, itemId));
  }

  function consumeItem(itemId: string) {
    const item = ITEMS[itemId];
    const healing = item?.healing;
    if (
      item?.category !== "consumable" ||
      !healing ||
      !inventory.some((entry) => entry.itemId === itemId) ||
      hp >= maxHp
    ) {
      return;
    }
    setHp((current) => Math.min(maxHp, current + healing));
    setInventory((current) => removeFromInventory(current, itemId));
  }

  return (
    <GameContext.Provider
      value={{
        gameMap,
        mapError,
        player,
        hp,
        maxHp,
        level,
        xp,
        gold,
        inventory,
        equipment,
        units,
        movePlayer,
        equipItem,
        unequipItem,
        consumeItem
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

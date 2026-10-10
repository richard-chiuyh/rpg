import type { EquipmentSlot } from "../data/items";
import type { InventoryEntry } from "./gameContext";

export type Equipment = Record<EquipmentSlot, string | null>;

export function addToInventory(inventory: InventoryEntry[], itemId: string): InventoryEntry[] {
  const existing = inventory.find((entry) => entry.itemId === itemId);
  if (!existing) {
    return [...inventory, { itemId, quantity: 1 }];
  }
  return inventory.map((entry) =>
    entry.itemId === itemId ? { ...entry, quantity: entry.quantity + 1 } : entry
  );
}

export function removeFromInventory(inventory: InventoryEntry[], itemId: string): InventoryEntry[] {
  return inventory
    .map((entry) => (entry.itemId === itemId ? { ...entry, quantity: entry.quantity - 1 } : entry))
    .filter((entry) => entry.quantity > 0);
}

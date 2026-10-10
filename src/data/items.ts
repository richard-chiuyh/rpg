export type ItemCategory = "equipment" | "consumable" | "quest";
export type EquipmentSlot = "weapon" | "armor" | "helmet" | "shoes" | "accessory" | "offhand";

export interface ItemDefinition {
  id: string;
  name: string;
  category: ItemCategory;
  description: string;
  icon?: string;
  slot?: EquipmentSlot;
  attack?: number;
  healing?: number;
}

export const ITEMS: Record<string, ItemDefinition> = {
  sword: {
    id: "sword",
    name: "Traveler's Sword",
    category: "equipment",
    description: "A reliable blade. Adds 5 attack.",
    icon: "sword.png",
    slot: "weapon",
    attack: 5
  },
  armor: {
    id: "armor",
    name: "Leather Armor",
    category: "equipment",
    description: "Light armor for a long journey.",
    icon: "armor.png",
    slot: "armor"
  },
  helmet: {
    id: "helmet",
    name: "Iron Helmet",
    category: "equipment",
    description: "A sturdy helmet.",
    icon: "helmet.png",
    slot: "helmet"
  },
  shoes: {
    id: "shoes",
    name: "Traveler's Boots",
    category: "equipment",
    description: "Comfortable boots made for walking.",
    icon: "shoes.png",
    slot: "shoes"
  },
  accessory: {
    id: "accessory",
    name: "Copper Charm",
    category: "equipment",
    description: "A small charm with a warm glow.",
    icon: "accessory.png",
    slot: "accessory"
  },
  potion: {
    id: "potion",
    name: "Healing Potion",
    category: "consumable",
    description: "Restores 12 HP.",
    healing: 12
  },
  "village-letter": {
    id: "village-letter",
    name: "Sealed Letter",
    category: "quest",
    description: "A letter from the village elder."
  }
};

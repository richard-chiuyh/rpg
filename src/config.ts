export const VIEW_COLS = 8;
export const VIEW_ROWS = 7;

export const EQUIPMENT_COLS = 3;
export const EQUIPMENT_SLOTS = 6;

export const BACKPACK_COLS = 4;
export const BACKPACK_ROWS = 6;

export const ENEMY_CARDS = 2;

export const ACTION_BUTTONS = ["ATTACK", "SKILLS", "CONSUMABLES"] as const;

export type ActionButton = (typeof ACTION_BUTTONS)[number];

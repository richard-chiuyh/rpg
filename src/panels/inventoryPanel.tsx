import { BACKPACK_COLS, BACKPACK_ROWS, EQUIPMENT_COLS, EQUIPMENT_SLOTS } from "../config";
import { useGame } from "../systems/gameContext";
import { Tabs } from "../ui/Tabs";
import { PANEL } from "../ui/styles";
import { ITEMS, type EquipmentSlot } from "../data/items";

const EQUIPMENT_ORDER: EquipmentSlot[] = [
  "helmet",
  "weapon",
  "armor",
  "offhand",
  "shoes",
  "accessory"
];

const EQUIPMENT_LABEL: Record<EquipmentSlot, string> = {
  weapon: "MAIN HAND",
  armor: "ARMOR",
  helmet: "HELMET",
  shoes: "SHOES",
  accessory: "ACCESSORY",
  offhand: "OFF-HAND"
};

function ItemIcon({ icon, name }: { icon?: string; name: string }) {
  return icon ? (
    <img
      src={`${import.meta.env.BASE_URL}assets/item/${icon}`}
      alt=""
      className="h-full w-full object-contain [image-rendering:pixelated]"
    />
  ) : (
    <span className="text-[9px] leading-tight text-muted">{name.slice(0, 3).toUpperCase()}</span>
  );
}

export function InventoryPanel() {
  const { inventory, equipment, equipItem, unequipItem, consumeItem } = useGame();
  const inventoryItems = inventory.flatMap((entry) =>
    Array.from({ length: entry.quantity }, (_, index) => ({
      key: `${entry.itemId}-${index}`,
      itemId: entry.itemId
    }))
  );

  function renderBackpack() {
    return (
      <div
        className="grid gap-1.5"
        style={{ gridTemplateColumns: `repeat(${BACKPACK_COLS}, 1fr)` }}
      >
        {Array.from({ length: BACKPACK_COLS * BACKPACK_ROWS }, (_, index) => {
          const entry = inventoryItems[index];
          const item = entry ? ITEMS[entry.itemId] : undefined;
          const label = item
            ? `${item.name} (${item.category}) — ${item.description}`
            : `Empty backpack slot ${index + 1}`;

          return (
            <button
              key={entry?.key ?? `empty-${index}`}
              type="button"
              title={label}
              aria-label={label}
              disabled={!item || item.category === "quest"}
              onClick={() => {
                if (item?.category === "equipment") {
                  equipItem(item.id);
                } else if (item?.category === "consumable") {
                  consumeItem(item.id);
                }
              }}
              className="aspect-square min-w-0 border border-line bg-panel2 p-[3px] disabled:cursor-default"
            >
              <div className="flex h-full w-full items-center justify-center border border-line bg-cell p-1">
                {item && <ItemIcon icon={item.icon} name={item.name} />}
              </div>
            </button>
          );
        })}
      </div>
    );
  }

  function renderEquipment() {
    return (
      <div
        className="grid gap-1.5"
        style={{
          gridTemplateColumns: `repeat(${EQUIPMENT_COLS}, minmax(0, 1fr))`,
          gridTemplateRows: "repeat(3, minmax(0, 1fr))"
        }}
      >
        {EQUIPMENT_ORDER.slice(0, EQUIPMENT_SLOTS).map((slot) => {
          const itemId = equipment[slot];
          const item = itemId ? ITEMS[itemId] : undefined;
          const label = item
            ? `${EQUIPMENT_LABEL[slot]}: ${item.name} — click to unequip`
            : `${EQUIPMENT_LABEL[slot]} — empty`;

          return (
            <button
              key={slot}
              type="button"
              title={label}
              aria-label={label}
              disabled={!item}
              onClick={() => unequipItem(slot)}
              className="flex aspect-square min-w-0 flex-col items-center justify-center gap-1 border border-line bg-panel2 p-1 disabled:cursor-default"
            >
              <div className="flex min-h-0 w-full flex-1 items-center justify-center border border-line bg-cell p-1">
                {item && <ItemIcon icon={item.icon} name={item.name} />}
              </div>
              <span className="w-full truncate text-[8px] tracking-wide text-muted">
                {item?.name ?? EQUIPMENT_LABEL[slot]}
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <section className={`${PANEL} gap-2.5`}>
      <Tabs
        defs={[
          { label: "EQUIPMENT", content: renderEquipment() },
          { label: "BACKPACK", content: renderBackpack() }
        ]}
      />
    </section>
  );
}

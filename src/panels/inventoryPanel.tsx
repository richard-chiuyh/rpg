import { BACKPACK_COLS, BACKPACK_ROWS, EQUIPMENT_COLS, EQUIPMENT_SLOTS } from "../config";
import { Tabs } from "../core/tabs";
import { PANEL } from "../core/ui";

function SlotGrid({ count, cols }: { count: number; cols: number }) {
  return (
    <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="aspect-square border border-line bg-panel2 p-[3px]">
          <div className="w-full h-full border border-line bg-cell" />
        </div>
      ))}
    </div>
  );
}

export function InventoryPanel() {
  return (
    <section className={`${PANEL} gap-2.5`}>
      <Tabs
        defs={[
          {
            label: "EQUIPMENT",
            content: <SlotGrid count={EQUIPMENT_SLOTS} cols={EQUIPMENT_COLS} />
          },
          {
            label: "BACKPACK",
            content: <SlotGrid count={BACKPACK_COLS * BACKPACK_ROWS} cols={BACKPACK_COLS} />
          }
        ]}
      />
    </section>
  );
}

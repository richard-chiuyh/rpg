import { CharacterPanel } from "./panels/characterPanel";
import { EnemiesPanel } from "./panels/enemiesPanel";
import { InventoryPanel } from "./panels/inventoryPanel";
import { MapPanel } from "./panels/mapPanel";
import { QuestsPanel } from "./panels/questsPanel";

const COLUMN = "grid gap-2.5 min-w-0 min-h-0";
const SIDE_ROWS = "grid-rows-[1fr_1fr] max-[820px]:grid-rows-none";

export function App() {
  return (
    <div className="grid gap-2.5 items-stretch h-[calc(100vh-32px)] grid-cols-[minmax(180px,1fr)_minmax(0,2.4fr)_minmax(180px,1fr)] max-[820px]:grid-cols-1 max-[820px]:h-auto">
      <aside className={`${COLUMN} ${SIDE_ROWS}`}>
        <CharacterPanel />
        <InventoryPanel />
      </aside>
      <main className={`${COLUMN} grid-rows-[1fr]`}>
        <MapPanel />
      </main>
      <aside className={`${COLUMN} ${SIDE_ROWS}`}>
        <EnemiesPanel />
        <QuestsPanel />
      </aside>
    </div>
  );
}

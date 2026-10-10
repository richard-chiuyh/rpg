import { CharacterPanel } from "./panels/characterPanel";
import { EnemiesPanel } from "./panels/enemiesPanel";
import { InventoryPanel } from "./panels/inventoryPanel";
import { MapPanel } from "./panels/mapPanel";
import { QuestsPanel } from "./panels/questsPanel";
import { GameProvider } from "./systems/game";

export function App() {
  return (
    <GameProvider>
      <div className="flex h-dvh w-full bg-black">
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <div className="m-1 min-h-0 flex-1 grid">
            <CharacterPanel />
          </div>
          <div className="m-1 min-h-0 flex-1 grid">
            <InventoryPanel />
          </div>
        </div>
        <div className="flex min-h-0 min-w-0 flex-3 flex-col">
          <div className="m-1 min-h-0 flex-3">
            <MapPanel />
          </div>
          <div className="m-1 min-h-0 flex-1 border border-line bg-panel p-2.5" />
        </div>
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <div className="m-1 min-h-0 flex-1 grid">
            <EnemiesPanel />
          </div>
          <div className="m-1 min-h-0 flex-1 grid">
            <QuestsPanel />
          </div>
        </div>
      </div>
    </GameProvider>
  );
}

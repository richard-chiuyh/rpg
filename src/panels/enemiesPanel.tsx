import { getAdjacentEnemies } from "../systems/units";
import { useGame } from "../systems/gameContext";
import { SlimeIcon } from "../ui/TileIcons";
import { PANEL, STAT_BAR } from "../ui/styles";

export function EnemiesPanel() {
  const { units, player } = useGame();
  const enemies = getAdjacentEnemies(units, player);

  return (
    <section className={`${PANEL} gap-2.5`}>
      <div className="grid min-h-0 flex-1 content-start gap-2.5 overflow-y-auto scrollbar-hidden">
        {enemies.map((enemy) => (
          <div
            key={enemy.id}
            className="grid grid-cols-[44px_1fr] items-center gap-2 border border-line bg-panel2 p-2"
            title={`${enemy.name}: ${enemy.hp}/${enemy.maxHp} HP`}
          >
            <div className="flex h-11 w-11 items-center justify-center overflow-hidden border border-line-strong bg-cell">
              <div className="h-4/5 w-4/5 overflow-hidden">
                <SlimeIcon />
              </div>
            </div>
            <div className="grid gap-1">
              <span className="truncate text-xs">{enemy.name}</span>
              <div className={STAT_BAR}>
                <div
                  className="h-full bg-hp"
                  style={{
                    width: `${enemy.maxHp ? ((enemy.hp ?? 0) / enemy.maxHp) * 100 : 0}%`
                  }}
                />
              </div>
              <span className="text-right text-[10px] text-muted">
                {enemy.hp}/{enemy.maxHp} HP
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

import { ENEMY_CARDS } from "../config";
import { FILL_COLOR, PANEL, STAT_BAR } from "../core/ui";

function EnemyBar({ modifier }: { modifier: string }) {
  return (
    <div className="grid grid-cols-[24px_1fr] items-center gap-1.5 text-[11px]">
      <span>{modifier.toUpperCase()}</span>
      <div className={STAT_BAR}>
        <div className={`h-full ${FILL_COLOR[modifier]}`} style={{ width: "0%" }} />
      </div>
    </div>
  );
}

function EnemyCard() {
  return (
    <div className="grid grid-cols-[44px_1fr] gap-2 items-center border border-line bg-panel2 p-2">
      <div className="w-11 h-11 border border-line-strong bg-cell" />
      <div className="grid gap-1.5">
        <EnemyBar modifier="hp" />
        <EnemyBar modifier="mp" />
      </div>
    </div>
  );
}

export function EnemiesPanel() {
  return (
    <section className={`${PANEL} gap-2.5`}>
      {Array.from({ length: ENEMY_CARDS }, (_, index) => (
        <EnemyCard key={index} />
      ))}
    </section>
  );
}

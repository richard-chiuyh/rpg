import { useGame } from "../systems/gameContext";
import { FILL_COLOR, PANEL, STAT_BAR, type StatModifier } from "../ui/styles";
import { CharacterIcon } from "../ui/TileIcons";

function StatRow({
  label,
  modifier,
  value,
  max
}: {
  label: string;
  modifier: StatModifier;
  value: number;
  max: number;
}) {
  return (
    <div className="grid grid-cols-[28px_1fr_32px] items-center gap-1.5 text-xs">
      <span className="tracking-[1px]">{label}</span>
      <div className={STAT_BAR}>
        <div
          className={`h-full ${FILL_COLOR[modifier]}`}
          style={{ width: `${max > 0 ? (value / max) * 100 : 0}%` }}
        />
      </div>
      <span className="text-right text-muted">
        {value}/{max}
      </span>
    </div>
  );
}

function MetaRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex justify-between text-xs tracking-[1px]">
      <span>{label}</span>
      <span className="text-muted">{value}</span>
    </div>
  );
}

export function CharacterPanel() {
  const { hp, maxHp, xp, level, gold } = useGame();

  return (
    <section className={`${PANEL} gap-2.5`}>
      <div className="grid place-items-center py-2.5">
        <div className="grid h-14 w-14 place-items-center overflow-hidden rounded-full border-2 border-line-strong bg-panel2">
          <CharacterIcon />
        </div>
      </div>
      <div className="grid gap-2">
        <StatRow label="HP" modifier="hp" value={hp} max={maxHp} />
        <StatRow label="MP" modifier="mp" value={0} max={0} />
        <StatRow label="XP" modifier="xp" value={xp % 100} max={100} />
      </div>
      <div className="grid gap-2">
        <MetaRow label="LEVEL" value={level} />
        <MetaRow label="GOLD" value={gold} />
      </div>
    </section>
  );
}

import { FILL_COLOR, PANEL, STAT_BAR } from "../core/ui";

function StatRow({ label, modifier }: { label: string; modifier: string }) {
  return (
    <div className="grid grid-cols-[28px_1fr_32px] items-center gap-1.5 text-xs">
      <span className="tracking-[1px]">{label}</span>
      <div className={STAT_BAR}>
        <div className={`h-full ${FILL_COLOR[modifier]}`} style={{ width: "0%" }} />
      </div>
      <span className="text-right text-muted" />
    </div>
  );
}

function MetaRow({ label }: { label: string }) {
  return (
    <div className="flex justify-between text-xs tracking-[1px]">
      <span>{label}</span>
      <span className="text-muted" />
    </div>
  );
}

export function CharacterPanel() {
  return (
    <section className={`${PANEL} gap-2.5`}>
      <div className="grid place-items-center py-2.5">
        <div className="w-14 h-14 border-2 border-line-strong rounded-full bg-panel2" />
      </div>
      <div className="grid gap-2">
        <StatRow label="HP" modifier="hp" />
        <StatRow label="MP" modifier="mp" />
        <StatRow label="XP" modifier="xp" />
      </div>
      <div className="grid gap-2">
        <MetaRow label="LEVEL" />
        <MetaRow label="GOLD" />
      </div>
    </section>
  );
}

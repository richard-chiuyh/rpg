import { Tabs } from "../core/tabs";
import { PANEL } from "../core/ui";

const EMPTY = "h-full min-h-[60px] border border-line bg-panel2";

export function QuestsPanel() {
  return (
    <section className={`${PANEL} gap-2.5`}>
      <Tabs
        defs={[
          { label: "QUESTS", content: <div className={EMPTY} /> },
          { label: "LOG", content: <div className={EMPTY} /> }
        ]}
      />
    </section>
  );
}

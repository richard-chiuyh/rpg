import { useState, type ReactNode } from "react";

export interface TabDef {
  label: string;
  content: ReactNode;
}

const TAB = "flex-1 px-1.5 py-[5px] text-[11px] tracking-[1px] bg-panel2 border cursor-pointer";

export function Tabs({ defs }: { defs: TabDef[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col flex-1 min-h-0 gap-2.5">
      <div className="flex gap-1">
        {defs.map((def, index) => (
          <button
            key={def.label}
            type="button"
            onClick={() => setActive(index)}
            className={`${TAB} ${
              index === active ? "text-text border-line-strong" : "text-muted border-line"
            }`}
          >
            {def.label}
          </button>
        ))}
      </div>
      <div className="flex-1 min-h-0 overflow-auto">
        {defs.map((def, index) => (
          <div key={def.label} hidden={index !== active}>
            {def.content}
          </div>
        ))}
      </div>
    </div>
  );
}

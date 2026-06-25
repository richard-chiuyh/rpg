import { useEffect, useState } from "react";
import { ACTION_BUTTONS } from "../config";
import mapData from "../data/map.json";
import { CharacterIcon } from "../core/tileIcons";
import { isWalkable, TILES } from "../core/tiles";
import { PANEL } from "../core/ui";

interface GameMap {
  map_width: number;
  map_height: number;
  data: number[][];
}

interface Vec2 {
  x: number;
  y: number;
}

const gameMap = mapData as GameMap;

const SPAWN: Vec2 = { x: 4, y: 3 };

const MOVES: Record<string, Vec2> = {
  w: { x: 0, y: -1 },
  s: { x: 0, y: 1 },
  a: { x: -1, y: 0 },
  d: { x: 1, y: 0 }
};

function Header() {
  return (
    <div className="flex justify-center items-center min-h-[22px] border border-line bg-panel2">
      <span className="text-xs tracking-[2px]" />
    </div>
  );
}

function Cell({ code, isPlayer }: { code: number; isPlayer: boolean }) {
  const tile = TILES[code];

  return (
    <div
      role={tile ? "img" : undefined}
      aria-label={tile?.label}
      className={`relative aspect-square border bg-cell flex items-center justify-center ${
        tile ? tile.className : "border-cell-border"
      }`}
    >
      {tile && <tile.Icon />}
      {isPlayer && (
        <span className="absolute inset-0 flex items-center justify-center text-player">
          <CharacterIcon />
        </span>
      )}
    </div>
  );
}

function Grid({ player }: { player: Vec2 }) {
  return (
    <div
      className="grid gap-[3px] flex-1 min-h-0 self-center max-w-full border border-line bg-panel2 p-1"
      style={{
        gridTemplateColumns: `repeat(${gameMap.map_width}, 1fr)`,
        aspectRatio: `${gameMap.map_width} / ${gameMap.map_height}`
      }}
    >
      {gameMap.data.flatMap((row, y) =>
        row.map((code, x) => (
          <Cell key={`${x}-${y}`} code={code} isPlayer={player.x === x && player.y === y} />
        ))
      )}
    </div>
  );
}

function ActionBar() {
  return (
    <div className="grid grid-cols-3 gap-1.5">
      {ACTION_BUTTONS.map((label) => (
        <button
          key={label}
          type="button"
          className="flex flex-col items-center gap-1.5 px-1 py-2 text-text bg-panel2 border border-line-strong cursor-pointer"
        >
          <span className="w-[22px] h-[22px] border border-line-strong" />
          <span className="text-[11px] tracking-[1px]">{label}</span>
        </button>
      ))}
    </div>
  );
}

export function MapPanel() {
  const [player, setPlayer] = useState<Vec2>(SPAWN);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const move = MOVES[event.key.toLowerCase()];
      if (!move) {
        return;
      }
      event.preventDefault();
      setPlayer((current) => {
        const next: Vec2 = { x: current.x + move.x, y: current.y + move.y };
        const inBounds =
          next.x >= 0 && next.y >= 0 && next.x < gameMap.map_width && next.y < gameMap.map_height;
        if (!inBounds || !isWalkable(gameMap.data[next.y][next.x])) {
          return current;
        }
        return next;
      });
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <section className={`${PANEL} gap-2`}>
      <Header />
      <Grid player={player} />
      <ActionBar />
    </section>
  );
}

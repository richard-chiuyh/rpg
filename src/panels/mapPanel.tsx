import { useEffect, useRef, useState } from "react";
import { useGame, type GameMap, type GameUnit, type Position } from "../systems/gameContext";
import { CharacterIcon, ChestIcon, SlimeIcon } from "../ui/TileIcons";
import { TILE, TILES } from "../systems/tiles";

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

const MOVES: Record<string, Position> = {
  w: { x: 0, y: -1 },
  s: { x: 0, y: 1 },
  a: { x: -1, y: 0 },
  d: { x: 1, y: 0 }
};

function getViewSize(width: number, height: number, gameMap: GameMap) {
  if (width <= 0 || height <= 0) {
    return { cols: gameMap.map_width, rows: gameMap.map_height };
  }

  const viewportRatio = width / height;
  const mapRatio = gameMap.map_width / gameMap.map_height;
  if (viewportRatio >= mapRatio) {
    return {
      cols: gameMap.map_width,
      rows: clamp(Math.round(gameMap.map_width / viewportRatio), 1, gameMap.map_height)
    };
  }
  return {
    cols: clamp(Math.round(gameMap.map_height * viewportRatio), 1, gameMap.map_width),
    rows: gameMap.map_height
  };
}

function UnitIcon({ unit }: { unit: GameUnit }) {
  if (unit.kind === "chest") {
    return <ChestIcon />;
  }
  if (unit.kind === "enemy") {
    return <SlimeIcon />;
  }
  return <CharacterIcon />;
}

function Cell({ code, unit, isPlayer }: { code: number; unit?: GameUnit; isPlayer: boolean }) {
  const terrainCode = code === TILE.CHEST || code === TILE.ENEMY ? TILE.EMPTY : code;
  const tile = TILES[terrainCode];
  const unitBorder =
    unit?.kind === "chest"
      ? "border-chest"
      : unit?.kind === "enemy"
        ? "border-enemy"
        : "border-player";

  return (
    <div
      className={`relative flex min-h-0 min-w-0 items-center justify-center border bg-cell ${
        tile ? tile.className : "border-cell-border"
      }`}
      role="gridcell"
      aria-label={unit?.name ?? tile?.label}
      title={unit?.name}
    >
      {tile && <tile.Icon />}
      {unit && (
        <span
          className={`absolute inset-0 flex items-center justify-center border ${unitBorder} bg-cell/40`}
          aria-hidden="true"
        >
          <span className="flex h-4/5 w-4/5 items-center justify-center overflow-hidden">
            <UnitIcon unit={unit} />
          </span>
        </span>
      )}
      {isPlayer && (
        <span className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center border border-player text-player">
          <CharacterIcon />
        </span>
      )}
    </div>
  );
}

function Grid({
  gameMap,
  player,
  units,
  cols,
  rows
}: {
  gameMap: GameMap;
  player: Position;
  units: GameUnit[];
  cols: number;
  rows: number;
}) {
  const camX = clamp(player.x - Math.floor(cols / 2), 0, gameMap.map_width - cols);
  const camY = clamp(player.y - Math.floor(rows / 2), 0, gameMap.map_height - rows);

  return (
    <div
      className="grid h-full w-full overflow-hidden"
      role="grid"
      aria-label="Game map"
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`
      }}
    >
      {Array.from({ length: rows }).flatMap((_, vy) =>
        Array.from({ length: cols }, (_, vx) => {
          const x = camX + vx;
          const y = camY + vy;
          const unit = units.find((entry) => entry.x === x && entry.y === y);
          return (
            <Cell
              key={`${x}-${y}`}
              code={gameMap.data[y][x]}
              unit={unit}
              isPlayer={player.x === x && player.y === y}
            />
          );
        })
      )}
    </div>
  );
}

export function MapPanel() {
  const { gameMap, mapError, player, units, movePlayer } = useGame();
  const [viewSize, setViewSize] = useState({ width: 0, height: 0 });
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }

    const observer = new ResizeObserver(([entry]) => {
      setViewSize({ width: entry.contentRect.width, height: entry.contentRect.height });
    });
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const move = MOVES[event.key.toLowerCase()];
      if (move) {
        event.preventDefault();
        movePlayer(move);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [movePlayer]);

  const view = gameMap ? getViewSize(viewSize.width, viewSize.height, gameMap) : null;

  return (
    <section className="h-full min-h-0 min-w-0 overflow-hidden border border-line bg-panel">
      <div ref={viewportRef} className="h-full min-h-0 w-full">
        {gameMap && view ? (
          <Grid gameMap={gameMap} player={player} units={units} cols={view.cols} rows={view.rows} />
        ) : (
          <div
            className="grid h-full place-items-center p-4 text-center text-sm text-muted"
            role={mapError ? "alert" : "status"}
          >
            {mapError ? `Unable to load map: ${mapError}` : "Loading map..."}
          </div>
        )}
      </div>
    </section>
  );
}

import { isWalkable } from "./tiles";
import type { GameMap, GameUnit, Position } from "./gameContext";

export function canMoveTo(
  gameMap: GameMap,
  current: Position,
  delta: Position,
  units: GameUnit[]
): Position | null {
  const next = { x: current.x + delta.x, y: current.y + delta.y };
  if (
    next.x < 0 ||
    next.y < 0 ||
    next.x >= gameMap.map_width ||
    next.y >= gameMap.map_height ||
    !isWalkable(gameMap.data[next.y][next.x]) ||
    units.some((unit) => unit.x === next.x && unit.y === next.y)
  ) {
    return null;
  }
  return next;
}

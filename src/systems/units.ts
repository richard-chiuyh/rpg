import { TILE } from "./tiles";
import type { GameMap, GameUnit, Position } from "./gameContext";

const NPC_POSITION: Position = { x: 7, y: 6 };

export function createUnits(map: GameMap): GameUnit[] {
  const units: GameUnit[] = [];
  let chestIndex = 0;
  let enemyIndex = 0;

  map.data.forEach((row, y) => {
    row.forEach((code, x) => {
      if (code === TILE.CHEST) {
        chestIndex += 1;
        units.push({
          id: `chest-${chestIndex}`,
          name: `Chest ${chestIndex}`,
          kind: "chest",
          x,
          y
        });
      } else if (code === TILE.ENEMY) {
        enemyIndex += 1;
        units.push({
          id: `slime-${enemyIndex}`,
          name: `Slime ${enemyIndex}`,
          kind: "enemy",
          x,
          y,
          hp: 10,
          maxHp: 10
        });
      }
    });
  });

  if (map.data[NPC_POSITION.y]?.[NPC_POSITION.x] === TILE.EMPTY) {
    units.push({
      id: "village-guide",
      name: "Village Guide",
      kind: "npc",
      ...NPC_POSITION
    });
  }

  return units;
}

export function getAdjacentEnemies(units: GameUnit[], player: Position): GameUnit[] {
  return units.filter(
    (unit) =>
      unit.kind === "enemy" && Math.abs(unit.x - player.x) + Math.abs(unit.y - player.y) === 1
  );
}

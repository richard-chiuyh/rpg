import type { CSSProperties } from "react";

const SPRITE_STYLE: CSSProperties = {
  width: 16,
  height: 16,
  objectFit: "none",
  transform: "scale(5)",
  imageRendering: "pixelated"
};

function SpriteIcon({ file, position }: { file: string; position: string }) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}assets/${file}`}
      alt=""
      aria-hidden="true"
      style={{ ...SPRITE_STYLE, objectPosition: position }}
    />
  );
}

export function TreeIcon() {
  return <SpriteIcon file="map/Trees.png" position="-15px 0px" />;
}

export function ChestIcon() {
  return <SpriteIcon file="map/Chests.png" position="0px 0px" />;
}

export function SlimeIcon() {
  return <SpriteIcon file="objects/Slime.png" position="0px 0px" />;
}

export function CharacterIcon() {
  return <SpriteIcon file="objects/SwordsmanTemplate.png" position="0px 0px" />;
}

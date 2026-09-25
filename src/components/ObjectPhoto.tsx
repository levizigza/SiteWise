import drill from "../assets/photos/drill.png";
import hammer from "../assets/photos/hammer.png";
import hardHat from "../assets/photos/hard-hat.png";
import ladder from "../assets/photos/ladder.png";
import saw from "../assets/photos/saw.png";
import tape from "../assets/photos/tape.png";

const PHOTOS: Record<string, string> = {
  hat: hardHat,
  hardhat: hardHat,
  hammer,
  ladder,
  saw,
  tape,
  drill,
  baseline: hardHat,
  visual: hammer,
  supported: tape,
  english: saw,
  sentences: saw,
  instructions: tape,
  tools: drill,
  "hand-tools": hammer,
  "power-tools": drill,
};

export function hasPhoto(id: string) {
  return Boolean(PHOTOS[id]);
}

/** A real picture of the thing, the way the journey phones show it. */
export function ObjectPhoto({ id, compact }: { id: string; compact?: boolean }) {
  const src = PHOTOS[id];
  if (!src) return null;
  return <img className={compact ? "object-photo compact" : "object-photo"} src={src} alt="" />;
}

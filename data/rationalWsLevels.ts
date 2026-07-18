// Rational-Numbers worksheet levels. Each level is scoped to ONE Solve it!
// skill so the practice drills exactly that level (matching the poster/app).
//
// First level: Y2.1 "Spot halves, thirds and quarters in shapes".

export type SpotParts = 2 | 3 | 4;
export type SpotShapeType = "circle" | "square" | "bar";

export interface SpotShape {
  type: SpotShapeType;
  parts: SpotParts;
  equal: boolean; // false = parts are NOT the same size (a distractor)
}

export interface SpotLevelSpec {
  id: string; // route id, e.g. "year-2-1"
  fullId: string; // display id, e.g. "Y2.1"
  shortTitle: string;
  ican: string;
  /** Full shape pool for this level (equal + distractors). */
  pool: () => SpotShape[];
}

/** Meta for a fraction by its number of equal parts. */
export const FRACTION_META: Record<SpotParts, { letter: "H" | "T" | "Q"; word: string; sym: string }> = {
  2: { letter: "H", word: "half", sym: "½" },
  3: { letter: "T", word: "third", sym: "⅓" },
  4: { letter: "Q", word: "quarter", sym: "¼" },
};

function buildSpotPool(): SpotShape[] {
  const types: SpotShapeType[] = ["circle", "square", "bar"];
  const parts: SpotParts[] = [2, 3, 4];
  const pool: SpotShape[] = [];
  // Equal shapes for every type × parts.
  for (const type of types) {
    for (const p of parts) pool.push({ type, parts: p, equal: true });
  }
  // Unequal (not-fair) distractors — split into 3 parts but not the same size.
  for (const type of types) pool.push({ type, parts: 3, equal: false });
  return pool;
}

export const SPOT_LEVELS: SpotLevelSpec[] = [
  {
    id: "year-2-1",
    fullId: "Y2.1",
    shortTitle: "Spot Halves, Thirds & Quarters",
    ican: "I can spot halves, thirds and quarters in shapes.",
    pool: buildSpotPool,
  },
];

export function getSpotLevel(id: string): SpotLevelSpec | null {
  return SPOT_LEVELS.find((l) => l.id === id) ?? null;
}

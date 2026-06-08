// Length worksheet problem pools — Area & Perimeter, mirroring solveit's
// Measurement/Length curriculum. Each year sub-level produces a pool of
// shape problems (rectangle / square / triangle) with labelled dimensions.

export type ShapeKind = "rectangle" | "square" | "triangle";
export type LengthUnit = "cm" | "m" | "mm";
export type LengthOperation = "perimeter" | "area";

export type ShapeProblem = {
  shape: ShapeKind;
  // For rectangle: length (horizontal), width (vertical).
  // For square: length === width.
  // For triangle: rectangle right-triangle whose legs are length × width;
  // area = (L × W) / 2.
  length: number;
  width: number;
  unit: LengthUnit;
  operation: LengthOperation;
  answer: number;
};

export type LengthLevelSpec = {
  id: string;          // url slug, e.g. "year-4-2"
  fullId: string;      // display id, e.g. "Y4.2"
  shortTitle: string;
  diagramTagline: string;
  pool: () => ShapeProblem[];
};

// ── Helpers ──────────────────────────────────────────────────────────────

function rect(L: number, W: number, op: LengthOperation, unit: LengthUnit = "cm"): ShapeProblem {
  const answer = op === "perimeter" ? 2 * (L + W) : L * W;
  return { shape: "rectangle", length: L, width: W, unit, operation: op, answer };
}

function square(s: number, op: LengthOperation, unit: LengthUnit = "cm"): ShapeProblem {
  const answer = op === "perimeter" ? 4 * s : s * s;
  return { shape: "square", length: s, width: s, unit, operation: op, answer };
}

// ── Year 4 ───────────────────────────────────────────────────────────────

// Y4.1: Perimeter of rectangles (and squares). V1 = 1-digit only,
// V2 = larger 1-digit + small 2-digit, V3 = 2-digit dimensions.
// The version-specific filtering happens in the worksheet seed — the pool
// is the full set of valid problems for the level.
function y41Pool(): ShapeProblem[] {
  const out: ShapeProblem[] = [];
  // rectangles: L, W both 2..20, L >= W to avoid duplicates
  for (let L = 2; L <= 20; L++) {
    for (let W = 2; W <= L; W++) {
      // avoid trivial 1×1 / awkward shapes
      if (L === W) continue; // squares handled separately
      out.push(rect(L, W, "perimeter"));
    }
  }
  // squares with side 2..20
  for (let s = 2; s <= 20; s++) out.push(square(s, "perimeter"));
  return out;
}

// Y4.2: Rectangle area = L × W. 1-digit and small 2-digit dimensions.
function y42Pool(): ShapeProblem[] {
  const out: ShapeProblem[] = [];
  for (let L = 2; L <= 12; L++) {
    for (let W = 2; W <= L; W++) {
      if (L === W) continue;
      out.push(rect(L, W, "area"));
    }
  }
  return out;
}

// Y4.3: Square area = s × s. Sides 2..12.
function y43Pool(): ShapeProblem[] {
  const out: ShapeProblem[] = [];
  for (let s = 2; s <= 12; s++) out.push(square(s, "area"));
  return out;
}

// ── Level registry ──────────────────────────────────────────────────────

export const LENGTH_LEVELS: LengthLevelSpec[] = [
  {
    id: "year-4-1",
    fullId: "Y4.1",
    shortTitle: "Perimeter of rectangles & squares",
    diagramTagline: "Find the perimeter (P) of each shape.",
    pool: y41Pool,
  },
  {
    id: "year-4-2",
    fullId: "Y4.2",
    shortTitle: "Rectangle area = length × width",
    diagramTagline: "Find the area (A) of each rectangle.",
    pool: y42Pool,
  },
  {
    id: "year-4-3",
    fullId: "Y4.3",
    shortTitle: "Square area = side × side",
    diagramTagline: "Find the area (A) of each square.",
    pool: y43Pool,
  },
];

export function getLengthLevel(id: string): LengthLevelSpec | undefined {
  return LENGTH_LEVELS.find((l) => l.id === id);
}

// Version-specific number-range filter. V1 uses 1-digit dimensions only;
// V2 mixes 1- and 2-digit; V3 prefers larger 2-digit. Applied as a filter
// over the level's full pool when generating a worksheet.
export type WorksheetVersion = 1 | 2 | 3;

export function filterByVersion(pool: ShapeProblem[], v: WorksheetVersion): ShapeProblem[] {
  if (v === 1) {
    return pool.filter((p) => p.length <= 9 && p.width <= 9);
  }
  if (v === 2) {
    return pool.filter((p) =>
      (p.length >= 5 && p.length <= 15) || (p.width >= 5 && p.width <= 15)
    );
  }
  // V3: prefer larger dimensions (anything goes, weighted to larger end)
  return pool.filter((p) => p.length >= 8 || p.width >= 8);
}

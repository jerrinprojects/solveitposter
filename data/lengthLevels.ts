// Length worksheet problem pools — Area & Perimeter, mirroring solveit's
// Measurement/Length curriculum. Each year sub-level produces a pool of
// shape problems (rectangle / square / triangle) with labelled dimensions.

export type ShapeKind = "rectangle" | "square" | "triangle" | "rightTriangle" | "rightTriangleGrid" | "rectangleGrid";
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

export type PolygonLevelSpec = {
  id: string;
  fullId: string;
  shortTitle: string;
  diagramTagline: string;
  pool: () => PolygonProblem[];
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

// ── Polygons (Y3.2) ──────────────────────────────────────────────────────

export type PolygonKind = "triangle" | "pentagon" | "hexagon";

export type PolygonProblem = {
  kind: PolygonKind;
  sides: number[];      // length of each side, in display order around the polygon
  unit: LengthUnit;
  operation: "perimeter";
  answer: number;
};

// ── Year 3 ───────────────────────────────────────────────────────────────

// ── Year 2 ───────────────────────────────────────────────────────────────

// Y2.4: Perimeter by counting side units — rectangle drawn on a unit
// grid; the student counts the unit edges around its border (= 2L+2W).
function y24Pool(): ShapeProblem[] {
  const out: ShapeProblem[] = [];
  for (let L = 2; L <= 8; L++) {
    for (let W = 2; W <= L; W++) {
      out.push({
        shape: "rectangleGrid",
        length: L, width: W,
        unit: "cm",
        operation: "perimeter",
        answer: 2 * (L + W),
      });
    }
  }
  return out;
}

// Y2.3: First perimeter — small labelled rectangles. Like Y4.1 but
// restricted to single-digit sides so Y2 students can sum them
// without renaming. Includes squares.
function y23Pool(): ShapeProblem[] {
  const out: ShapeProblem[] = [];
  for (let L = 2; L <= 9; L++) {
    for (let W = 2; W <= L; W++) {
      if (L === W) continue;
      out.push(rect(L, W, "perimeter"));
    }
  }
  for (let s = 2; s <= 9; s++) out.push(square(s, "perimeter"));
  return out;
}

// Y3.2: Perimeter of polygons — triangles, pentagons and hexagons with
// every side labelled. Students sum the side lengths to find the perimeter.
function y32Pool(): PolygonProblem[] {
  const out: PolygonProblem[] = [];
  const mkProblem = (kind: PolygonKind, sides: number[]): PolygonProblem => ({
    kind, sides, unit: "cm", operation: "perimeter",
    answer: sides.reduce((a, b) => a + b, 0),
  });

  // Triangles — 3 sides. Mix of equal/isosceles/scalene with whole sides.
  // 1-digit sides for V1, mixed for V2/V3.
  for (let a = 2; a <= 9; a++) {
    out.push(mkProblem("triangle", [a, a, a]));         // equilateral
    if (a >= 3) out.push(mkProblem("triangle", [a, a, a - 1])); // isosceles
    if (a >= 4) out.push(mkProblem("triangle", [a, a - 1, a - 2])); // scalene
  }
  // Larger triangles for V2/V3 versions.
  for (let a = 10; a <= 20; a += 2) {
    out.push(mkProblem("triangle", [a, a, a]));
    out.push(mkProblem("triangle", [a, a - 2, a - 4]));
  }

  // Pentagons — 5 sides.
  for (let a = 2; a <= 9; a++) {
    out.push(mkProblem("pentagon", [a, a, a, a, a]));   // regular
    if (a >= 3) out.push(mkProblem("pentagon", [a, a - 1, a, a - 1, a]));
  }
  for (let a = 10; a <= 18; a += 2) {
    out.push(mkProblem("pentagon", [a, a, a, a, a]));
  }

  // Hexagons — 6 sides.
  for (let a = 2; a <= 9; a++) {
    out.push(mkProblem("hexagon", [a, a, a, a, a, a])); // regular
    if (a >= 3) out.push(mkProblem("hexagon", [a, a - 1, a, a - 1, a, a - 1]));
  }
  for (let a = 10; a <= 16; a += 2) {
    out.push(mkProblem("hexagon", [a, a, a, a, a, a]));
  }

  return out;
}

// Filter for polygon levels — V1 small (max side <= 9), V2 mixed, V3 larger.
export function filterPolygonByVersion(
  pool: PolygonProblem[],
  v: WorksheetVersion,
): PolygonProblem[] {
  const maxOf = (p: PolygonProblem) => Math.max(...p.sides);
  if (v === 1) return pool.filter((p) => maxOf(p) <= 9);
  if (v === 2) return pool.filter((p) => maxOf(p) >= 5 && maxOf(p) <= 14);
  return pool.filter((p) => maxOf(p) >= 9);
}

// Y3.3: Area by counting squares — rectangles drawn on a unit grid.
// Student counts the grid cells (all whole) to find the area.
function y33Pool(): ShapeProblem[] {
  const out: ShapeProblem[] = [];
  // Rectangles 2..8 in each dimension; skip very thin/big shapes.
  for (let L = 2; L <= 8; L++) {
    for (let W = 2; W <= L; W++) {
      out.push({
        shape: "rectangleGrid",
        length: L,
        width: W,
        unit: "cm",
        operation: "area",
        answer: L * W,
      });
    }
  }
  return out;
}

// Y3.4: Compare area of two shapes. Two rectangles on a unit grid side by
// side; student finds the area of each (by counting whole squares) and
// compares with > / < / =.

export type ComparePairProblem = {
  shapeA: { length: number; width: number };
  shapeB: { length: number; width: number };
  areaA: number;
  areaB: number;
  comparison: ">" | "<" | "=";
};

function y34Pool(): ComparePairProblem[] {
  const out: ComparePairProblem[] = [];
  const make = (a: [number, number], b: [number, number]): ComparePairProblem => {
    const areaA = a[0] * a[1];
    const areaB = b[0] * b[1];
    const comparison: ">" | "<" | "=" =
      areaA > areaB ? ">" : areaA < areaB ? "<" : "=";
    return {
      shapeA: { length: a[0], width: a[1] },
      shapeB: { length: b[0], width: b[1] },
      areaA, areaB, comparison,
    };
  };
  // Generate pairs: mix of equal-area and different-area shapes.
  for (let aL = 2; aL <= 7; aL++) {
    for (let aW = 2; aW <= aL; aW++) {
      for (let bL = 2; bL <= 7; bL++) {
        for (let bW = 2; bW <= bL; bW++) {
          // Skip identical shapes — boring.
          if (aL === bL && aW === bW) continue;
          out.push(make([aL, aW], [bL, bW]));
        }
      }
    }
  }
  return out;
}

// Y5.4: Same area vs same perimeter. Pairs of rectangles where the
// student computes A and P for each and decides whether they match.
export type SameAreaPerimeterProblem = {
  shapeA: { length: number; width: number };
  shapeB: { length: number; width: number };
  areaA: number;
  areaB: number;
  perA: number;
  perB: number;
  sameArea: boolean;
  samePerimeter: boolean;
};

function y54Pool(): SameAreaPerimeterProblem[] {
  const out: SameAreaPerimeterProblem[] = [];
  const seen = new Set<string>();
  const make = (a: [number, number], b: [number, number]) => {
    const key = `${a[0]}x${a[1]}|${b[0]}x${b[1]}`;
    const keyRev = `${b[0]}x${b[1]}|${a[0]}x${a[1]}`;
    if (seen.has(key) || seen.has(keyRev)) return;
    seen.add(key);
    const areaA = a[0] * a[1];
    const areaB = b[0] * b[1];
    const perA = 2 * (a[0] + a[1]);
    const perB = 2 * (b[0] + b[1]);
    out.push({
      shapeA: { length: a[0], width: a[1] },
      shapeB: { length: b[0], width: b[1] },
      areaA, areaB, perA, perB,
      sameArea: areaA === areaB,
      samePerimeter: perA === perB,
    });
  };

  // All pairs use balanced aspect ratios (max 1:2.5) so the rendered
  // shapes look more square-ish and less ribbon-like.
  //
  // 1) Same area, different perimeter
  const sameAreaPairs: [[number, number], [number, number]][] = [
    [[4, 6], [3, 8]],    // 24
    [[4, 6], [5, 5]],    // close-area pair; per 20 vs 20 — also same per (skip if so)
    [[4, 9], [6, 6]],    // 36
    [[4, 9], [3, 12]],   // 36 — 3:12 is 1:4, skip
    [[5, 8], [4, 10]],   // 40 — 4:10 is 1:2.5, OK
    [[6, 8], [4, 12]],   // 48 — 4:12 is 1:3, skip
    [[6, 10], [5, 12]],  // 60 — 5:12 is 1:2.4, OK
    [[3, 4], [2, 6]],    // 12
    [[5, 6], [3, 10]],   // 30 — 3:10 thin, skip
    [[6, 6], [4, 9]],    // 36, dup
    [[5, 6], [6, 5]],    // identical area swap, skip
    [[4, 6], [6, 4]],    // identical, skip
    [[6, 8], [4, 12]],   // skip
    [[6, 10], [5, 12]],  // dup
    [[7, 8], [4, 14]],   // 56 — thin
    [[6, 9], [9, 6]],    // identical
    [[6, 12], [8, 9]],   // 72 — 6:12 1:2 OK, 8:9 OK
    [[5, 8], [4, 10]],   // dup
  ];

  // 2) Same perimeter, different area
  const samePerimeterPairs: [[number, number], [number, number]][] = [
    [[3, 5], [4, 4]],    // per 16
    [[4, 5], [3, 6]],    // per 18
    [[4, 6], [5, 5]],    // per 20
    [[3, 7], [5, 5]],    // per 20 (3:7 = 1:2.33)
    [[4, 7], [5, 6]],    // per 22
    [[5, 7], [6, 6]],    // per 24
    [[4, 8], [5, 7]],    // per 24
    [[5, 8], [6, 7]],    // per 26
    [[4, 9], [6, 7]],    // per 26
    [[5, 9], [6, 8]],    // per 28
    [[6, 9], [7, 8]],    // per 30
    [[5, 10], [6, 9]],   // per 30 (5:10 = 1:2)
    [[6, 10], [7, 9]],   // per 32
    [[7, 10], [8, 9]],   // per 34
    [[6, 11], [7, 10]],  // per 34
    [[5, 12], [7, 10]],  // per 34 (5:12 = 1:2.4)
    [[7, 12], [8, 11]],  // per 38
  ];

  // 3) Both different — random balanced pairs
  const bothDifferent: [[number, number], [number, number]][] = [
    [[3, 5], [4, 6]],
    [[4, 5], [5, 7]],
    [[5, 6], [6, 8]],
    [[4, 7], [5, 8]],
    [[6, 7], [7, 9]],
    [[5, 9], [6, 10]],
    [[7, 8], [6, 10]],
    [[8, 9], [7, 11]],
    [[5, 7], [6, 9]],
    [[6, 8], [7, 9]],
    [[4, 6], [5, 8]],
    [[5, 8], [6, 10]],
    [[7, 9], [8, 11]],
  ];

  // Apply only pairs with max aspect ratio <= 2.5 in BOTH shapes.
  const ok = ([L, W]: [number, number]) => {
    const r = L / W;
    return r >= 1 / 2.5 && r <= 2.5;
  };
  for (const [a, b] of sameAreaPairs) if (ok(a) && ok(b)) make(a, b);
  for (const [a, b] of samePerimeterPairs) if (ok(a) && ok(b)) make(a, b);
  for (const [a, b] of bothDifferent) if (ok(a) && ok(b)) make(a, b);

  return out;
}

export type SameAreaPerimeterLevelSpec = {
  id: string;
  fullId: string;
  shortTitle: string;
  diagramTagline: string;
  pool: () => SameAreaPerimeterProblem[];
};

export const SAME_AP_LEVELS: SameAreaPerimeterLevelSpec[] = [
  {
    id: "year-5-4",
    fullId: "Y5.4",
    shortTitle: "Same area vs same perimeter",
    diagramTagline: "Find A and P for each shape, then decide what is the same.",
    pool: y54Pool,
  },
];

export function getSameAPLevel(id: string): SameAreaPerimeterLevelSpec | undefined {
  return SAME_AP_LEVELS.find((l) => l.id === id);
}

export type ComparePairLevelSpec = {
  id: string;
  fullId: string;
  shortTitle: string;
  diagramTagline: string;
  pool: () => ComparePairProblem[];
};

export const COMPARE_LEVELS: ComparePairLevelSpec[] = [
  {
    id: "year-3-4",
    fullId: "Y3.4",
    shortTitle: "Compare area of two shapes",
    diagramTagline: "Count the squares in each shape, then compare.",
    pool: y34Pool,
  },
];

export function getCompareLevel(id: string): ComparePairLevelSpec | undefined {
  return COMPARE_LEVELS.find((l) => l.id === id);
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

// ── Year 5 ───────────────────────────────────────────────────────────────

// Y5.2: Perimeter of straight-sided shapes — rectangles and squares with
// larger dimensions than Y4.1 (review and extension).
function y52Pool(): ShapeProblem[] {
  const out: ShapeProblem[] = [];
  for (let L = 5; L <= 30; L++) {
    for (let W = 5; W <= L; W++) {
      if (L === W) continue;
      out.push(rect(L, W, "perimeter"));
    }
  }
  for (let s = 5; s <= 30; s++) out.push(square(s, "perimeter"));
  return out;
}

// Y5.3: Rectangle and square area review — extends Y4.2/Y4.3 to larger
// 2-digit dimensions so students practice bigger multiplications.
function y53Pool(): ShapeProblem[] {
  const out: ShapeProblem[] = [];
  // Rectangles 4..20 in each dim (skip squares).
  for (let L = 4; L <= 20; L++) {
    for (let W = 4; W <= L; W++) {
      if (L === W) continue;
      out.push(rect(L, W, "area"));
    }
  }
  // Squares with side 4..15.
  for (let s = 4; s <= 15; s++) out.push(square(s, "area"));
  return out;
}

// Y7.2: Find a missing side from the perimeter. Given a rectangle with
// one labelled side and the perimeter, work backwards to the missing side.
// Y7.4: Same idea but with area.
export type MissingDimProblem = {
  // Which dimension is known.
  knownDim: "L" | "W";
  knownValue: number;     // value of the known side
  missingValue: number;   // value of the side to find
  // Either P (when operation === "perimeter") or A (when "area").
  given: number;
  operation: "perimeter" | "area";
  unit: LengthUnit;
};

function y72Pool(): MissingDimProblem[] {
  const out: MissingDimProblem[] = [];
  for (let L = 5; L <= 25; L++) {
    for (let W = 3; W <= L; W++) {
      if (L === W) continue;
      const P = 2 * (L + W);
      // Two variants — known L → find W; known W → find L.
      out.push({ knownDim: "L", knownValue: L, missingValue: W, given: P, operation: "perimeter", unit: "cm" });
      out.push({ knownDim: "W", knownValue: W, missingValue: L, given: P, operation: "perimeter", unit: "cm" });
    }
  }
  return out;
}

function y74Pool(): MissingDimProblem[] {
  const out: MissingDimProblem[] = [];
  for (let L = 3; L <= 15; L++) {
    for (let W = 2; W <= L; W++) {
      if (L === W) continue;
      const A = L * W;
      out.push({ knownDim: "L", knownValue: L, missingValue: W, given: A, operation: "area", unit: "cm" });
      out.push({ knownDim: "W", knownValue: W, missingValue: L, given: A, operation: "area", unit: "cm" });
    }
  }
  return out;
}

export type MissingDimLevelSpec = {
  id: string;
  fullId: string;
  shortTitle: string;
  diagramTagline: string;
  pool: () => MissingDimProblem[];
};

export const MISSING_DIM_LEVELS: MissingDimLevelSpec[] = [
  {
    id: "year-7-2",
    fullId: "Y7.2",
    shortTitle: "Missing side from the perimeter",
    diagramTagline: "Work out the unknown side using the perimeter.",
    pool: y72Pool,
  },
  {
    id: "year-7-4",
    fullId: "Y7.4",
    shortTitle: "Missing side from the area",
    diagramTagline: "Work out the unknown side using the area.",
    pool: y74Pool,
  },
];

export function getMissingDimLevel(id: string): MissingDimLevelSpec | undefined {
  return MISSING_DIM_LEVELS.find((l) => l.id === id);
}

// Y7.5: Composite area — L-shapes. Each shape is a big rectangle with
// a rectangular notch removed from the top-right corner; students
// usually split it into 2 rectangles and add the areas.
export type CompositeShapeProblem = {
  // Outer rectangle dimensions (the L sits inside).
  outerW: number;
  outerH: number;
  // Notch removed from the top-right corner.
  notchW: number;
  notchH: number;
  area: number;
  unit: LengthUnit;
};

function y75Pool(): CompositeShapeProblem[] {
  const out: CompositeShapeProblem[] = [];
  for (let W = 6; W <= 14; W++) {
    for (let H = 5; H <= 12; H++) {
      // Notch sizes — keep notch smaller than half the rectangle so the
      // L is recognisable. Pick a couple of variants per (W,H).
      const notchOptions: [number, number][] = [
        [Math.floor(W / 2) - 1, Math.floor(H / 2)],
        [Math.floor(W / 3), Math.floor(H / 3) + 1],
        [Math.max(2, Math.floor(W / 4)), Math.max(2, Math.floor(H / 4))],
      ];
      for (const [nw, nh] of notchOptions) {
        if (nw < 2 || nh < 2) continue;
        if (nw >= W - 1 || nh >= H - 1) continue;
        const area = W * H - nw * nh;
        out.push({
          outerW: W, outerH: H, notchW: nw, notchH: nh,
          area, unit: "cm",
        });
      }
    }
  }
  return out;
}

export type CompositeShapeLevelSpec = {
  id: string;
  fullId: string;
  shortTitle: string;
  diagramTagline: string;
  pool: () => CompositeShapeProblem[];
};

export const COMPOSITE_LEVELS: CompositeShapeLevelSpec[] = [
  {
    id: "year-7-5",
    fullId: "Y7.5",
    shortTitle: "Composite area — L-shapes",
    diagramTagline: "Split each L-shape into rectangles, then add the areas.",
    pool: y75Pool,
  },
];

export function getCompositeLevel(id: string): CompositeShapeLevelSpec | undefined {
  return COMPOSITE_LEVELS.find((l) => l.id === id);
}

// ── Year 7 ───────────────────────────────────────────────────────────────

// Y7.1: Use the perimeter formula P = 2(L + W). Span small-to-larger
// dimensions so V1 has variety; V2/V3 push to 2-digit.
function y71Pool(): ShapeProblem[] {
  const out: ShapeProblem[] = [];
  for (let L = 4; L <= 30; L++) {
    for (let W = 3; W <= L; W++) {
      if (L === W) continue;
      out.push(rect(L, W, "perimeter"));
    }
  }
  for (let s = 4; s <= 25; s++) out.push(square(s, "perimeter"));
  return out;
}

// Y7.3: Use the area formula A = L × W (and s²).
function y73Pool(): ShapeProblem[] {
  const out: ShapeProblem[] = [];
  for (let L = 4; L <= 20; L++) {
    for (let W = 3; W <= L; W++) {
      if (L === W) continue;
      out.push(rect(L, W, "area"));
    }
  }
  for (let s = 4; s <= 15; s++) out.push(square(s, "area"));
  return out;
}

// Y6.4: Area of right-angled triangles. Uses A = ½ × base × height.
// Pairs are restricted to those where b × h is even so the area is a
// whole number — keeps the focus on the formula rather than fractions.
function y64Pool(): ShapeProblem[] {
  const out: ShapeProblem[] = [];
  for (let b = 2; b <= 20; b++) {
    for (let h = 2; h <= 20; h++) {
      if ((b * h) % 2 !== 0) continue; // ensure integer area
      // Skip very thin shapes that render poorly.
      if (b / h > 4 || h / b > 4) continue;
      out.push({
        shape: "rightTriangle",
        length: b,    // base
        width: h,     // height
        unit: "cm",
        operation: "area",
        answer: (b * h) / 2,
      });
    }
  }
  return out;
}

// Y4.4: Area with half-squares — right triangles drawn on a unit grid.
// The bounding box is a square s × s so the diagonal cleanly halves
// individual grid cells; counting (whole + half) squares yields the area.
// Area = (s × s) / 2.
function y44Pool(): ShapeProblem[] {
  const out: ShapeProblem[] = [];
  // Use square-bounded right triangles so the diagonal lines up with cell
  // corners and "half-squares" are exact halves. Sizes 2..10.
  for (let s = 2; s <= 10; s++) {
    const answer = (s * s) / 2;
    out.push({
      shape: "rightTriangleGrid",
      length: s,
      width: s,
      unit: "cm",
      operation: "area",
      answer,
    });
  }
  return out;
}

// ── Level registry ──────────────────────────────────────────────────────

export const LENGTH_LEVELS: LengthLevelSpec[] = [
  {
    id: "year-2-3",
    fullId: "Y2.3",
    shortTitle: "First perimeter (small numbers)",
    diagramTagline: "Find the perimeter (P) of each shape.",
    pool: y23Pool,
  },
  {
    id: "year-2-4",
    fullId: "Y2.4",
    shortTitle: "Perimeter by counting side units",
    diagramTagline: "Count the unit edges around each shape to find the perimeter.",
    pool: y24Pool,
  },
  {
    id: "year-3-3",
    fullId: "Y3.3",
    shortTitle: "Area by counting squares",
    diagramTagline: "Count the squares inside each rectangle to find the area.",
    pool: y33Pool,
  },
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
  {
    id: "year-4-4",
    fullId: "Y4.4",
    shortTitle: "Area with half-squares (right triangles on a grid)",
    diagramTagline: "Count whole squares and half squares to find the area.",
    pool: y44Pool,
  },
  {
    id: "year-6-4",
    fullId: "Y6.4",
    shortTitle: "Right-angled triangle area = ½ × base × height",
    diagramTagline: "Find the area (A) of each right-angled triangle.",
    pool: y64Pool,
  },
  {
    id: "year-5-2",
    fullId: "Y5.2",
    shortTitle: "Perimeter of straight-sided shapes",
    diagramTagline: "Find the perimeter (P) of each shape.",
    pool: y52Pool,
  },
  {
    id: "year-5-3",
    fullId: "Y5.3",
    shortTitle: "Rectangle and square area",
    diagramTagline: "Find the area (A) of each rectangle or square.",
    pool: y53Pool,
  },
  {
    id: "year-7-1",
    fullId: "Y7.1",
    shortTitle: "Use the perimeter formula P = 2(L + W)",
    diagramTagline: "Use the formula P = 2 × (length + width) for each shape.",
    pool: y71Pool,
  },
  {
    id: "year-7-3",
    fullId: "Y7.3",
    shortTitle: "Use the area formula A = L × W",
    diagramTagline: "Use the formula A = length × width for each shape.",
    pool: y73Pool,
  },
];

export function getLengthLevel(id: string): LengthLevelSpec | undefined {
  return LENGTH_LEVELS.find((l) => l.id === id);
}

export const POLYGON_LEVELS: PolygonLevelSpec[] = [
  {
    id: "year-3-2",
    fullId: "Y3.2",
    shortTitle: "Perimeter of polygons",
    diagramTagline: "Add all the sides to find the perimeter.",
    pool: y32Pool,
  },
];

export function getPolygonLevel(id: string): PolygonLevelSpec | undefined {
  return POLYGON_LEVELS.find((l) => l.id === id);
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

// ── Word problem templates ───────────────────────────────────────────────
// Real-life contexts. Each template picks a unit (cm or m) appropriate to
// the size of the dimensions — small objects (book, photo, tile) use cm;
// larger spaces (room, garden, pool) use m.

export type LengthWordProblem = {
  prompt: string;
  answer: string;       // e.g. "26 cm" or "48 m²"
  operation: LengthOperation;
};

// Helper: choose a sensible unit for given dimensions and a context. Small
// numbers (<= 10) might be cm-sized objects; bigger numbers (>10) feel
// more natural in m. Each template specifies a preferred unit.
type Ctx = {
  buildPerimeter?: (L: number, W: number, unit: LengthUnit) => string;
  buildArea?: (L: number, W: number, unit: LengthUnit) => string;
  // Preferred unit for this context. "cm" = small object, "m" = space/room.
  preferUnit: LengthUnit;
};

const PERIMETER_CONTEXTS: Ctx[] = [
  {
    preferUnit: "m",
    buildPerimeter: (L, W, u) =>
      `A rectangular garden is ${L} ${u} long and ${W} ${u} wide. How much fencing is needed to go around it?`,
  },
  {
    preferUnit: "cm",
    buildPerimeter: (L, W, u) =>
      `A photo frame is ${L} ${u} by ${W} ${u}. What is the perimeter of the frame?`,
  },
  {
    preferUnit: "m",
    buildPerimeter: (L, W, u) =>
      `A swimming pool is ${L} ${u} long and ${W} ${u} wide. What is the distance around the edge?`,
  },
  {
    preferUnit: "cm",
    buildPerimeter: (L, W, u) =>
      `A book cover is ${L} ${u} tall and ${W} ${u} wide. What is the perimeter of the cover?`,
  },
  {
    preferUnit: "m",
    buildPerimeter: (L, W, u) =>
      `A classroom is ${L} ${u} by ${W} ${u}. How long is the strip of skirting board needed for the perimeter?`,
  },
  {
    preferUnit: "cm",
    buildPerimeter: (L, W, u) =>
      `A painting is ${L} ${u} long and ${W} ${u} wide. Find the perimeter of the painting.`,
  },
  {
    preferUnit: "m",
    buildPerimeter: (L, W, u) =>
      `A vegetable patch measures ${L} ${u} by ${W} ${u}. How many metres of edging will go all the way around?`,
  },
  {
    preferUnit: "cm",
    buildPerimeter: (L, W, u) =>
      `A piece of card is ${L} ${u} by ${W} ${u}. How far is it around the edge?`,
  },
  {
    preferUnit: "m",
    buildPerimeter: (L, W, u) =>
      `A basketball court is ${L} ${u} long and ${W} ${u} wide. What is the perimeter of the court?`,
  },
  {
    preferUnit: "cm",
    buildPerimeter: (L, W, u) =>
      `A rectangular sticker is ${L} ${u} by ${W} ${u}. What is its perimeter?`,
  },
  {
    preferUnit: "m",
    buildPerimeter: (L, W, u) =>
      `A dog run is ${L} ${u} by ${W} ${u}. How much fence wire goes around the run?`,
  },
  {
    preferUnit: "cm",
    buildPerimeter: (L, W, u) =>
      `A tablet screen is ${L} ${u} tall and ${W} ${u} wide. Find the perimeter.`,
  },
];

const AREA_CONTEXTS: Ctx[] = [
  {
    preferUnit: "m",
    buildArea: (L, W, u) =>
      `A rug is ${L} ${u} long and ${W} ${u} wide. What is the area of the rug?`,
  },
  {
    preferUnit: "cm",
    buildArea: (L, W, u) =>
      `A poster is ${L} ${u} by ${W} ${u}. How much paper covers the poster?`,
  },
  {
    preferUnit: "m",
    buildArea: (L, W, u) =>
      `A classroom floor is ${L} ${u} long and ${W} ${u} wide. What is its floor area?`,
  },
  {
    preferUnit: "cm",
    buildArea: (L, W, u) =>
      `A page in a book is ${L} ${u} tall and ${W} ${u} wide. What is the area of the page?`,
  },
  {
    preferUnit: "m",
    buildArea: (L, W, u) =>
      `A vegetable garden is ${L} ${u} by ${W} ${u}. What is the area of the garden?`,
  },
  {
    preferUnit: "cm",
    buildArea: (L, W, u) =>
      `A photo is ${L} ${u} long and ${W} ${u} wide. What is the area of the photo?`,
  },
  {
    preferUnit: "m",
    buildArea: (L, W, u) =>
      `A lawn is ${L} ${u} long and ${W} ${u} wide. How many square metres of grass cover the lawn?`,
  },
  {
    preferUnit: "cm",
    buildArea: (L, W, u) =>
      `A tile is ${L} ${u} by ${W} ${u}. What is the area of one tile?`,
  },
  {
    preferUnit: "m",
    buildArea: (L, W, u) =>
      `A car park space is ${L} ${u} long and ${W} ${u} wide. What is its area?`,
  },
  {
    preferUnit: "cm",
    buildArea: (L, W, u) =>
      `A piece of fabric is ${L} ${u} by ${W} ${u}. What is the area of the fabric?`,
  },
  {
    preferUnit: "m",
    buildArea: (L, W, u) =>
      `A wall is ${L} ${u} long and ${W} ${u} tall. What is its area in square metres?`,
  },
  {
    preferUnit: "cm",
    buildArea: (L, W, u) =>
      `A laptop screen is ${L} ${u} wide and ${W} ${u} tall. What is the area of the screen?`,
  },
];

const TRIANGLE_AREA_CONTEXTS: Ctx[] = [
  {
    preferUnit: "cm",
    buildArea: (b, h, u) =>
      `A right-angled triangular flag has a base of ${b} ${u} and a height of ${h} ${u}. What is the area of the flag?`,
  },
  {
    preferUnit: "m",
    buildArea: (b, h, u) =>
      `A wooden ramp is shaped as a right-angled triangle with a base of ${b} ${u} and a height of ${h} ${u}. Find its area.`,
  },
  {
    preferUnit: "cm",
    buildArea: (b, h, u) =>
      `A piece of card is cut into a right-angled triangle. The base is ${b} ${u} and the height is ${h} ${u}. What is its area?`,
  },
  {
    preferUnit: "m",
    buildArea: (b, h, u) =>
      `A sail on a small boat is a right-angled triangle. Its base is ${b} ${u} and its height is ${h} ${u}. What is the area of the sail?`,
  },
  {
    preferUnit: "cm",
    buildArea: (b, h, u) =>
      `A triangular sticker has a right angle at one corner. The base is ${b} ${u} and the height is ${h} ${u}. Find its area.`,
  },
  {
    preferUnit: "m",
    buildArea: (b, h, u) =>
      `The end of a tent is a right-angled triangle with a base of ${b} ${u} and a height of ${h} ${u}. What is its area?`,
  },
  {
    preferUnit: "cm",
    buildArea: (b, h, u) =>
      `Sione cuts a right-angled triangle out of paper with a base of ${b} ${u} and a height of ${h} ${u}. What is the area?`,
  },
  {
    preferUnit: "m",
    buildArea: (b, h, u) =>
      `A road sign is shaped as a right-angled triangle. The base measures ${b} ${u} and the height measures ${h} ${u}. Find its area.`,
  },
  {
    preferUnit: "cm",
    buildArea: (b, h, u) =>
      `A right-angled triangular tile has a base of ${b} ${u} and a height of ${h} ${u}. What is the area of one tile?`,
  },
  {
    preferUnit: "m",
    buildArea: (b, h, u) =>
      `A triangular garden corner has a right angle at the fence. The base is ${b} ${u} and the height is ${h} ${u}. Find its area.`,
  },
  {
    preferUnit: "cm",
    buildArea: (b, h, u) =>
      `Aroha folds paper into a right-angled triangle with a base of ${b} ${u} and a height of ${h} ${u}. What is its area?`,
  },
  {
    preferUnit: "m",
    buildArea: (b, h, u) =>
      `A triangular flower bed has a base of ${b} ${u} and a height of ${h} ${u} with a right angle in one corner. Find the area.`,
  },
];

const SQUARE_AREA_CONTEXTS: Ctx[] = [
  {
    preferUnit: "cm",
    buildArea: (L, _W, u) =>
      `A square photo has sides of ${L} ${u}. What is the area of the photo?`,
  },
  {
    preferUnit: "m",
    buildArea: (L, _W, u) =>
      `A square garden bed has sides of ${L} ${u}. What is its area?`,
  },
  {
    preferUnit: "cm",
    buildArea: (L, _W, u) =>
      `A square tile has sides of ${L} ${u}. What is the area of one tile?`,
  },
  {
    preferUnit: "m",
    buildArea: (L, _W, u) =>
      `A square room is ${L} ${u} on each side. What is the floor area?`,
  },
  {
    preferUnit: "cm",
    buildArea: (L, _W, u) =>
      `A square sticker is ${L} ${u} on each side. Find its area.`,
  },
  {
    preferUnit: "m",
    buildArea: (L, _W, u) =>
      `A square paddock has sides of ${L} ${u}. What is the area of the paddock?`,
  },
  {
    preferUnit: "cm",
    buildArea: (L, _W, u) =>
      `A square napkin has sides of ${L} ${u}. What is its area?`,
  },
  {
    preferUnit: "m",
    buildArea: (L, _W, u) =>
      `A square playground has sides of ${L} ${u}. What is the area of the playground?`,
  },
  {
    preferUnit: "cm",
    buildArea: (L, _W, u) =>
      `A square card is ${L} ${u} on each side. What is its area?`,
  },
  {
    preferUnit: "m",
    buildArea: (L, _W, u) =>
      `A square sandpit has sides of ${L} ${u}. Find its area.`,
  },
];

// Seeded shuffle so V1/V2/V3 differ.
function lwShuffle<T>(arr: T[], seed: number): T[] {
  let state = seed >>> 0;
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    state = (state * 1103515245 + 12345) & 0x7fffffff;
    const j = state % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

const WORD_SEEDS: Record<WorksheetVersion, { problems: number; templates: number }> = {
  1: { problems: 2131, templates: 6101 },
  2: { problems: 4357, templates: 7853 },
  3: { problems: 9871, templates: 8237 },
};

export function buildLengthWordProblems(
  pool: ShapeProblem[],
  version: WorksheetVersion,
  count: number,
): LengthWordProblem[] {
  if (pool.length === 0) return [];
  const operation = pool[0].operation;
  const isSquareLevel = pool.every((p) => p.shape === "square");
  const isRightTriangleLevel = pool.every((p) => p.shape === "rightTriangle");
  const contexts =
    operation === "perimeter" ? PERIMETER_CONTEXTS
    : isRightTriangleLevel ? TRIANGLE_AREA_CONTEXTS
    : isSquareLevel ? SQUARE_AREA_CONTEXTS
    : AREA_CONTEXTS;

  const seeds = WORD_SEEDS[version];
  const shuffledProblems = lwShuffle(pool, seeds.problems);
  const templateOrder = lwShuffle(
    Array.from({ length: contexts.length }, (_, i) => i),
    seeds.templates,
  );

  return Array.from({ length: count }, (_, i) => {
    const p = shuffledProblems[i % shuffledProblems.length];
    const ctx = contexts[templateOrder[i % templateOrder.length]];
    const unit = ctx.preferUnit;
    const build = operation === "perimeter" ? ctx.buildPerimeter : ctx.buildArea;
    const prompt = build!(p.length, p.width, unit);
    const answerVal = operation === "perimeter"
      ? (p.shape === "square" ? 4 * p.length : 2 * (p.length + p.width))
      : (p.shape === "square" ? p.length * p.length
        : p.shape === "rightTriangle" ? (p.length * p.width) / 2
        : p.length * p.width);
    const ansUnit = operation === "area" ? `${unit}²` : unit;
    return {
      prompt,
      answer: `${answerVal} ${ansUnit}`,
      operation,
    };
  });
}

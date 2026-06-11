// Y7.5 Composite area worksheet — L-shapes. Each problem draws the
// L-shape outline with all six sides labelled; students split it into
// two rectangles and sum the areas.

import type { CompositeShapeProblem } from "@/data/lengthLevels";

const PAGE_PALETTE = {
  pink:   { ink: "#d6336c", soft: "#fff0f7", chip: "#ffd5e8", num: "#ec407a", fill: "#ffd5e8" },
  mint:   { ink: "#0d9488", soft: "#e6fbf5", chip: "#bff3e6", num: "#14b8a6", fill: "#bff3e6" },
  sunny:  { ink: "#b8860b", soft: "#fff7d9", chip: "#ffe8a0", num: "#e8a93e", fill: "#ffe8a0" },
  grape:  { ink: "#7c3aed", soft: "#f3edff", chip: "#dccdfb", num: "#a78bda", fill: "#dccdfb" },
} as const;

export type AccentKey = keyof typeof PAGE_PALETTE;
export type WorksheetVersion = 1 | 2 | 3;

function seededShuffle<T>(arr: T[], seed: number): T[] {
  let state = seed >>> 0;
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    state = (state * 1103515245 + 12345) & 0x7fffffff;
    const j = state % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

const VERSION_SEEDS: Record<WorksheetVersion, number> = {
  1: 4297, 2: 8731, 3: 6113,
};

export function buildCompositeProblems(
  pool: CompositeShapeProblem[],
  version: WorksheetVersion,
  count: number,
): CompositeShapeProblem[] {
  if (pool.length === 0) return [];
  const shuffled = seededShuffle(pool, VERSION_SEEDS[version]);
  return Array.from({ length: count }, (_, i) => shuffled[i % shuffled.length]);
}

function LShapeSvg({
  problem, accent, cellW, cellH, maxDim,
}: {
  problem: CompositeShapeProblem; accent: AccentKey;
  cellW: number; cellH: number; maxDim: number;
}) {
  const { num, ink, fill } = PAGE_PALETTE[accent];
  const { outerW, outerH, notchW, notchH, unit } = problem;
  const kind = problem.kind ?? "L";

  const padX = 28;
  const padY = 28;
  const availW = cellW - padX * 2;
  const availH = cellH - padY * 2;
  const unitPx = Math.min(availW, availH) / Math.max(maxDim, 6) * 0.9;

  const fullW = outerW * unitPx;
  const fullH = outerH * unitPx;
  const nW = notchW * unitPx;
  const nH = notchH * unitPx;

  const x0 = (cellW - fullW) / 2;
  const y0 = (cellH - fullH) / 2 + 4;

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-mono), 'Courier New', monospace",
    fontSize: 10, fontWeight: 700, fill: ink,
  };

  if (kind === "T") {
    // T-shape: two notches removed from top-left and top-right corners.
    // Outline (clockwise from top-left of top bar — actually from the
    // top-edge of the middle column):
    //
    //                 +--------+              ← top of stem
    //                 |        |
    //         +-------+        +-------+      ← top of base bar
    //         |                        |
    //         +------------------------+      ← bottom
    //
    // We'll build the vertices clockwise starting at the top-left of
    // the central stem (above the base bar).
    const stemLeft = x0 + nW;
    const stemRight = x0 + fullW - nW;
    const baseTop = y0 + nH;
    const baseBottom = y0 + fullH;
    const pts = [
      [stemLeft, y0],
      [stemRight, y0],
      [stemRight, baseTop],
      [x0 + fullW, baseTop],
      [x0 + fullW, baseBottom],
      [x0, baseBottom],
      [x0, baseTop],
      [stemLeft, baseTop],
    ];
    const pointsStr = pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
    // Side labels (clockwise from top):
    const sides = [
      // 1. top of stem (stemRight - stemLeft) = outerW - 2*notchW
      { x1: pts[0][0], y1: pts[0][1], x2: pts[1][0], y2: pts[1][1],
        value: outerW - 2 * notchW, position: "above" },
      // 2. right side of stem (vertical, height notchH)
      { x1: pts[1][0], y1: pts[1][1], x2: pts[2][0], y2: pts[2][1],
        value: notchH, position: "rightOfInside" },
      // 3. notch horizontal right (length notchW)
      { x1: pts[2][0], y1: pts[2][1], x2: pts[3][0], y2: pts[3][1],
        value: notchW, position: "above" },
      // 4. right side of base bar (height outerH - notchH)
      { x1: pts[3][0], y1: pts[3][1], x2: pts[4][0], y2: pts[4][1],
        value: outerH - notchH, position: "right" },
      // 5. bottom of base bar (outerW)
      { x1: pts[4][0], y1: pts[4][1], x2: pts[5][0], y2: pts[5][1],
        value: outerW, position: "belowBottom" },
      // 6. left side of base bar (height outerH - notchH)
      { x1: pts[5][0], y1: pts[5][1], x2: pts[6][0], y2: pts[6][1],
        value: outerH - notchH, position: "left" },
      // 7. notch horizontal left (length notchW)
      { x1: pts[6][0], y1: pts[6][1], x2: pts[7][0], y2: pts[7][1],
        value: notchW, position: "above" },
      // 8. left side of stem (height notchH)
      { x1: pts[7][0], y1: pts[7][1], x2: pts[0][0], y2: pts[0][1],
        value: notchH, position: "leftOfInside" },
    ];

    return (
      <svg width={cellW} height={cellH} style={{ display: "block" }}>
        <polygon points={pointsStr}
          fill={fill} fillOpacity={0.5}
          stroke={num} strokeWidth={1.8} />
        {sides.map((s, i) => {
          const mx = (s.x1 + s.x2) / 2;
          const my = (s.y1 + s.y2) / 2;
          let lx = mx, ly = my;
          let anchor: "middle" | "start" | "end" = "middle";
          let dom: "central" | "hanging" | "middle" = "middle";
          switch (s.position) {
            case "above":
              ly = my - 4; anchor = "middle"; break;
            case "belowBottom":
              ly = my + 14; anchor = "middle"; break;
            case "rightOfInside":
              lx = mx + 4; anchor = "start"; dom = "central"; break;
            case "leftOfInside":
              lx = mx - 4; anchor = "end"; dom = "central"; break;
            case "right":
              lx = mx + 6; anchor = "start"; dom = "central"; break;
            case "left":
              lx = mx - 6; anchor = "end"; dom = "central"; break;
          }
          return (
            <text key={i} x={lx} y={ly}
              textAnchor={anchor} dominantBaseline={dom} style={labelStyle}>
              {s.value} {unit}
            </text>
          );
        })}
      </svg>
    );
  }

  // L-shape vertices going clockwise from top-left:
  // (x0, y0) → (x0+fullW-nW, y0) → (x0+fullW-nW, y0+nH)
  //   → (x0+fullW, y0+nH) → (x0+fullW, y0+fullH) → (x0, y0+fullH) → close
  const pts = [
    [x0, y0],
    [x0 + fullW - nW, y0],
    [x0 + fullW - nW, y0 + nH],
    [x0 + fullW, y0 + nH],
    [x0 + fullW, y0 + fullH],
    [x0, y0 + fullH],
  ];
  const pointsStr = pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");

  // Sides (clockwise, indexed by pts pair):
  const sides = [
    // top-left horizontal (outerW - notchW)
    {
      x1: pts[0][0], y1: pts[0][1], x2: pts[1][0], y2: pts[1][1],
      value: outerW - notchW, position: "above",
    },
    // right-top vertical (notchH)
    {
      x1: pts[1][0], y1: pts[1][1], x2: pts[2][0], y2: pts[2][1],
      value: notchH, position: "rightOfInside",
    },
    // notch horizontal (notchW)
    {
      x1: pts[2][0], y1: pts[2][1], x2: pts[3][0], y2: pts[3][1],
      value: notchW, position: "below",
    },
    // right-bottom vertical (outerH - notchH)
    {
      x1: pts[3][0], y1: pts[3][1], x2: pts[4][0], y2: pts[4][1],
      value: outerH - notchH, position: "right",
    },
    // bottom horizontal (outerW)
    {
      x1: pts[4][0], y1: pts[4][1], x2: pts[5][0], y2: pts[5][1],
      value: outerW, position: "belowBottom",
    },
    // left vertical (outerH)
    {
      x1: pts[5][0], y1: pts[5][1], x2: pts[0][0], y2: pts[0][1],
      value: outerH, position: "left",
    },
  ];

  return (
    <svg width={cellW} height={cellH} style={{ display: "block" }}>
      <polygon
        points={pointsStr}
        fill={fill} fillOpacity={0.5}
        stroke={num} strokeWidth={1.8}
      />
      {sides.map((s, i) => {
        const mx = (s.x1 + s.x2) / 2;
        const my = (s.y1 + s.y2) / 2;
        const text = `${s.value}`;
        // Position the label by side position descriptor.
        let lx = mx, ly = my;
        let anchor: "middle" | "start" | "end" = "middle";
        let dom: "central" | "hanging" | "middle" = "middle";
        switch (s.position) {
          case "above":
            ly = my - 6; anchor = "middle"; break;
          case "below":
            ly = my + 12; anchor = "middle"; break;
          case "belowBottom":
            ly = my + 14; anchor = "middle"; break;
          case "rightOfInside":
            lx = mx + 4; anchor = "start"; dom = "central"; break;
          case "right":
            lx = mx + 6; anchor = "start"; dom = "central"; break;
          case "left":
            lx = mx - 6; anchor = "end"; dom = "central"; break;
        }
        return (
          <text key={i} x={lx} y={ly}
            textAnchor={anchor} dominantBaseline={dom} style={labelStyle}>
            {text} {unit}
          </text>
        );
      })}
    </svg>
  );
}

function CompositeCell({
  index, problem, accent, showAnswer, maxDim,
}: {
  index: number; problem: CompositeShapeProblem; accent: AccentKey;
  showAnswer: boolean; maxDim: number;
}) {
  const { ink, chip, soft, num } = PAGE_PALETTE[accent];

  return (
    <div style={{
      borderRadius: 14,
      background: "#fffaf3",
      border: `1.5px solid ${chip}`,
      padding: "10px 12px 12px",
      display: "flex", flexDirection: "column",
      minHeight: 0, boxSizing: "border-box",
      boxShadow: "0 1px 0 rgba(0,0,0,0.04)",
    }}>
      <div style={{
        fontFamily: "var(--font-body), sans-serif",
        fontSize: 10, fontWeight: 800, color: ink,
        letterSpacing: "0.08em", textTransform: "uppercase",
        marginBottom: 2,
      }}>
        Q{index}
      </div>
      <div style={{
        flex: 1, minHeight: 0, display: "flex",
        alignItems: "center", justifyContent: "center",
      }}>
        <LShapeSvg problem={problem} accent={accent}
          cellW={195} cellH={140} maxDim={maxDim} />
      </div>
      <div style={{
        display: "flex", alignItems: "center", gap: 6, marginTop: 6,
        paddingTop: 4, borderTop: `1px dashed ${chip}`,
      }}>
        <span style={{
          fontFamily: "var(--font-display), sans-serif",
          fontSize: 13, fontWeight: 800, color: ink,
          whiteSpace: "nowrap",
        }}>
          Area =
        </span>
        {showAnswer ? (
          <span style={{
            fontFamily: "var(--font-mono), 'Courier New', monospace",
            fontSize: 14, fontWeight: 700, color: ink,
            background: soft, padding: "2px 8px", borderRadius: 6,
          }}>
            {problem.area} {problem.unit}²
          </span>
        ) : (
          <div style={{ flex: 1, height: 18, borderBottom: `2px solid ${num}` }} />
        )}
      </div>
    </div>
  );
}

function OperationHero({
  accent, hasTShapes,
}: { accent: AccentKey; hasTShapes: boolean }) {
  const { ink, chip } = PAGE_PALETTE[accent];
  const title = hasTShapes
    ? "Find the Area of the Composite Shape"
    : "Find the Area of the L-shape";
  const subtitle = hasTShapes
    ? "Split each shape into rectangles, find each area, then add them."
    : "Split each L-shape into two rectangles, then add the areas.";
  return (
    <div style={{
      padding: "12px 18px", borderRadius: 16,
      background: chip, marginBottom: 12,
    }}>
      <div style={{
        fontFamily: "var(--font-display), sans-serif",
        fontSize: 28, fontWeight: 800, color: ink,
        letterSpacing: "-0.02em", lineHeight: 1,
      }}>
        {title}
      </div>
      <div style={{
        fontFamily: "var(--font-body), sans-serif",
        fontSize: 12, fontWeight: 600, color: ink, opacity: 0.85,
        marginTop: 4,
      }}>
        {subtitle}
      </div>
    </div>
  );
}

export function CompositeProblemPage({
  pageNumber, problems, accent, showAnswer, cols = 4, rows = 3,
}: {
  pageNumber: 1 | 2;
  problems: CompositeShapeProblem[];
  accent: AccentKey;
  showAnswer: boolean;
  levelFullId: string;
  cols?: number;
  rows?: number;
}) {
  const startIndex = (pageNumber - 1) * problems.length + 1;
  const maxDim = problems.reduce((m, p) => Math.max(m, p.outerW, p.outerH), 6);
  const hasTShapes = problems.some((p) => p.kind === "T");
  return (
    <div style={{ padding: "14px 22px 12px", display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
      <OperationHero accent={accent} hasTShapes={hasTShapes} />
      <div style={{
        flex: 1, display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gap: 14, minHeight: 0,
      }}>
        {problems.map((p, i) => (
          <CompositeCell
            key={i}
            index={startIndex + i}
            problem={p}
            accent={accent}
            showAnswer={showAnswer}
            maxDim={maxDim}
          />
        ))}
      </div>
    </div>
  );
}

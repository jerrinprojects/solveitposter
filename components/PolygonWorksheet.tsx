// Polygon perimeter worksheet (Y3.2). Renders a regular polygon
// (triangle / pentagon / hexagon) with every side labelled. Students
// add the labelled side lengths to find the perimeter.

import type { PolygonProblem, PolygonKind } from "@/data/lengthLevels";

const PAGE_PALETTE = {
  pink:   { ink: "#d6336c", soft: "#fff0f7", chip: "#ffd5e8", num: "#ec407a" },
  mint:   { ink: "#0d9488", soft: "#e6fbf5", chip: "#bff3e6", num: "#14b8a6" },
  sunny:  { ink: "#b8860b", soft: "#fff7d9", chip: "#ffe8a0", num: "#e8a93e" },
  grape:  { ink: "#7c3aed", soft: "#f3edff", chip: "#dccdfb", num: "#a78bda" },
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
  1: 8501, 2: 6203, 3: 4159,
};

export function buildPolygonProblems(
  pool: PolygonProblem[],
  version: WorksheetVersion,
  count: number,
): PolygonProblem[] {
  if (pool.length === 0) return [];
  const shuffled = seededShuffle(pool, VERSION_SEEDS[version]);
  return Array.from({ length: count }, (_, i) => shuffled[i % shuffled.length]);
}

// Compute vertex positions for a regular polygon centred at (cx, cy)
// with circumscribed-circle radius r. Vertices start at the top and go
// clockwise.
function regularPolygonVertices(n: number, cx: number, cy: number, r: number): Array<[number, number]> {
  const out: Array<[number, number]> = [];
  for (let i = 0; i < n; i++) {
    const angle = -Math.PI / 2 + (2 * Math.PI * i) / n;
    out.push([cx + r * Math.cos(angle), cy + r * Math.sin(angle)]);
  }
  return out;
}

function PolygonSvg({
  problem, accent, cellW, cellH,
}: { problem: PolygonProblem; accent: AccentKey; cellW: number; cellH: number }) {
  const { num, ink } = PAGE_PALETTE[accent];
  const { kind, sides, unit } = problem;
  const sideCount = sides.length;

  // Center and radius for the polygon outline.
  const cx = cellW / 2;
  const cy = cellH / 2;
  // Radius depends on cell size; leave room for labels around the edges.
  const r = Math.min(cellW, cellH) * 0.36;

  const verts = regularPolygonVertices(sideCount, cx, cy, r);
  const pointsStr = verts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");

  // Label each side at its midpoint, offset outward along the side's
  // outward normal.
  const labels = sides.map((sideLen, i) => {
    const [x1, y1] = verts[i];
    const [x2, y2] = verts[(i + 1) % sideCount];
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;
    // Outward normal: from center to midpoint, normalised, then scaled.
    const dx = mx - cx;
    const dy = my - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const offset = 12;
    const lx = mx + (dx / dist) * offset;
    const ly = my + (dy / dist) * offset;
    return { x: lx, y: ly, len: sideLen };
  });

  return (
    <svg width={cellW} height={cellH} style={{ display: "block" }}>
      <polygon
        points={pointsStr}
        fill="none" stroke={num} strokeWidth={2}
      />
      {labels.map((l, i) => (
        <text
          key={i}
          x={l.x} y={l.y}
          textAnchor="middle" dominantBaseline="middle"
          style={{
            fontFamily: "var(--font-mono), 'Courier New', monospace",
            fontSize: 11, fontWeight: 700, fill: ink,
          }}
        >
          {l.len} {unit}
        </text>
      ))}
    </svg>
  );
}

function PolygonCell({
  index, problem, accent, showAnswer,
}: {
  index: number; problem: PolygonProblem; accent: AccentKey; showAnswer: boolean;
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
        <PolygonSvg
          problem={problem} accent={accent}
          cellW={170} cellH={130}
        />
      </div>
      <div style={{
        display: "flex", alignItems: "center", gap: 6, marginTop: 8,
        paddingTop: 4,
        borderTop: `1px dashed ${chip}`,
      }}>
        <span style={{
          fontFamily: "var(--font-display), sans-serif",
          fontSize: 13, fontWeight: 800, color: ink,
          whiteSpace: "nowrap",
        }}>
          Perimeter =
        </span>
        {showAnswer ? (
          <span style={{
            fontFamily: "var(--font-mono), 'Courier New', monospace",
            fontSize: 14, fontWeight: 700, color: ink,
            background: soft, padding: "2px 8px", borderRadius: 6,
          }}>
            {problem.answer} {problem.unit}
          </span>
        ) : (
          <div style={{
            flex: 1, height: 18,
            borderBottom: `2px solid ${num}`,
          }} />
        )}
      </div>
    </div>
  );
}

function OperationHero({ accent }: { accent: AccentKey }) {
  const { ink, chip } = PAGE_PALETTE[accent];
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
        Find the Perimeter
      </div>
      <div style={{
        fontFamily: "var(--font-body), sans-serif",
        fontSize: 12, fontWeight: 600, color: ink, opacity: 0.85,
        marginTop: 4,
      }}>
        Add all the side lengths — distance around the polygon.
      </div>
    </div>
  );
}

export function PolygonProblemPage({
  pageNumber, problems, accent, showAnswer, cols = 5, rows = 3,
}: {
  pageNumber: 1 | 2;
  problems: PolygonProblem[];
  accent: AccentKey;
  showAnswer: boolean;
  levelFullId: string;
  cols?: number;
  rows?: number;
}) {
  const startIndex = (pageNumber - 1) * problems.length + 1;
  return (
    <div style={{ padding: "14px 22px 12px", display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
      <OperationHero accent={accent} />
      <div style={{
        flex: 1, display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gap: 16, minHeight: 0,
      }}>
        {problems.map((p, i) => (
          <PolygonCell
            key={i}
            index={startIndex + i}
            problem={p}
            accent={accent}
            showAnswer={showAnswer}
          />
        ))}
      </div>
    </div>
  );
}

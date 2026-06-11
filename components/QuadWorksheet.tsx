// Y8.2 / Y8.3 worksheet: parallelogram and trapezium area. Each problem
// shows the shape with labelled base/height (or top/bottom/height) and
// the student applies the appropriate formula.

import type { QuadProblem } from "@/data/lengthLevels";

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
  1: 2741, 2: 7919, 3: 4621,
};

export function buildQuadProblems(
  pool: QuadProblem[],
  version: WorksheetVersion,
  count: number,
): QuadProblem[] {
  if (pool.length === 0) return [];
  // Version filter:
  // V1 = smaller, V2 = mixed, V3 = larger.
  const maxDim = (p: QuadProblem) => Math.max(p.a, p.b, p.h);
  let filtered: QuadProblem[];
  if (version === 1) filtered = pool.filter((p) => maxDim(p) <= 10);
  else if (version === 2) filtered = pool.filter((p) => maxDim(p) >= 6 && maxDim(p) <= 14);
  else filtered = pool.filter((p) => maxDim(p) >= 10);
  if (filtered.length === 0) filtered = pool;
  const shuffled = seededShuffle(filtered, VERSION_SEEDS[version]);
  return Array.from({ length: count }, (_, i) => shuffled[i % shuffled.length]);
}

function QuadSvg({
  problem, accent, cellW, cellH, maxDim,
}: {
  problem: QuadProblem; accent: AccentKey;
  cellW: number; cellH: number; maxDim: number;
}) {
  const { num, ink, fill } = PAGE_PALETTE[accent];
  const padX = 20;
  const padY = 24;
  const availW = cellW - padX * 2;
  const availH = cellH - padY * 2;
  const unitPx = Math.min(availW, availH) / Math.max(maxDim, 6) * 0.85;

  if (problem.shape === "parallelogram") {
    const base = problem.a;
    const h = problem.h;
    const slant = problem.slant ?? Math.max(1, Math.floor(h / 3));
    const bw = base * unitPx;
    const sh = h * unitPx;
    const sx = slant * unitPx;
    // Reserve space on the left of the cell for the "h = X cm" label so
    // it sits outside the parallelogram and doesn't overlap the fill.
    const leftReserve = 56;
    const totalW = bw + sx;
    const x0 = leftReserve + Math.max(0, (cellW - leftReserve - 12 - totalW) / 2);
    const y0 = (cellH - sh) / 2 + 2;
    // Vertices: bottom-left, bottom-right, top-right, top-left
    const pts = [
      [x0, y0 + sh],
      [x0 + bw, y0 + sh],
      [x0 + bw + sx, y0],
      [x0 + sx, y0],
    ];
    const pointsStr = pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
    // Height dashed line — drop a perpendicular from top-left vertex to base.
    const heightX = x0 + sx;
    return (
      <svg width={cellW} height={cellH} style={{ display: "block" }}>
        <polygon points={pointsStr}
          fill={fill} fillOpacity={0.5}
          stroke={num} strokeWidth={2} />
        {/* Dashed height marker */}
        <line x1={heightX} y1={y0} x2={heightX} y2={y0 + sh}
          stroke={ink} strokeWidth={1} strokeDasharray="3 3" />
        {/* Small right-angle marker at the foot of the height */}
        <path d={`M ${heightX} ${y0 + sh - 7} L ${heightX + 7} ${y0 + sh - 7} L ${heightX + 7} ${y0 + sh}`}
          fill="none" stroke={ink} strokeWidth={1} />
        {/* Base label below */}
        <text x={x0 + bw / 2} y={y0 + sh + 14} textAnchor="middle"
          style={{
            fontFamily: "var(--font-mono), 'Courier New', monospace",
            fontSize: 11, fontWeight: 700, fill: ink,
          }}>
          base = {base} {problem.unit}
        </text>
        {/* Height label OUTSIDE the parallelogram on the left, at the
            level of the dashed line's midpoint. Avoids overlap with
            the shape fill. */}
        <text x={x0 - 8} y={y0 + sh / 2}
          textAnchor="end" dominantBaseline="middle"
          style={{
            fontFamily: "var(--font-mono), 'Courier New', monospace",
            fontSize: 11, fontWeight: 700, fill: ink,
          }}>
          h = {h} {problem.unit}
        </text>
      </svg>
    );
  } else {
    // Trapezium — isosceles for simple visual.
    const a = problem.a;
    const b = problem.b;
    const h = problem.h;
    const aw = a * unitPx;
    const bw = b * unitPx;
    const sh = h * unitPx;
    const x0 = (cellW - bw) / 2;
    const y0 = (cellH - sh) / 2 + 2;
    // Top corners centred above the base.
    const inset = (bw - aw) / 2;
    const pts = [
      [x0, y0 + sh],            // bottom-left
      [x0 + bw, y0 + sh],       // bottom-right
      [x0 + bw - inset, y0],    // top-right
      [x0 + inset, y0],         // top-left
    ];
    const pointsStr = pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
    const heightX = x0 + bw / 2;
    return (
      <svg width={cellW} height={cellH} style={{ display: "block" }}>
        <polygon points={pointsStr}
          fill={fill} fillOpacity={0.5}
          stroke={num} strokeWidth={2} />
        {/* Dashed height marker through centre */}
        <line x1={heightX} y1={y0} x2={heightX} y2={y0 + sh}
          stroke={ink} strokeWidth={1} strokeDasharray="3 3" />
        {/* Top label (a) */}
        <text x={x0 + bw / 2} y={y0 - 4} textAnchor="middle"
          style={{
            fontFamily: "var(--font-mono), 'Courier New', monospace",
            fontSize: 11, fontWeight: 700, fill: ink,
          }}>
          a = {a} {problem.unit}
        </text>
        {/* Bottom label (b) */}
        <text x={x0 + bw / 2} y={y0 + sh + 14} textAnchor="middle"
          style={{
            fontFamily: "var(--font-mono), 'Courier New', monospace",
            fontSize: 11, fontWeight: 700, fill: ink,
          }}>
          b = {b} {problem.unit}
        </text>
        {/* Height label */}
        <text x={heightX + 4} y={y0 + sh / 2}
          textAnchor="start" dominantBaseline="middle"
          style={{
            fontFamily: "var(--font-mono), 'Courier New', monospace",
            fontSize: 11, fontWeight: 700, fill: ink,
          }}>
          h = {h} {problem.unit}
        </text>
      </svg>
    );
  }
}

function QuadCell({
  index, problem, accent, showAnswer, maxDim,
}: {
  index: number; problem: QuadProblem; accent: AccentKey;
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
        <QuadSvg problem={problem} accent={accent}
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
  accent, shape,
}: { accent: AccentKey; shape: "parallelogram" | "trapezium" }) {
  const { ink, chip } = PAGE_PALETTE[accent];
  const title = shape === "parallelogram"
    ? "Find the Area of the Parallelogram"
    : "Find the Area of the Trapezium";
  const subtitle = shape === "parallelogram"
    ? "Use the formula A = base × height. (Slant length is not needed.)"
    : "Use the formula A = ½ × (a + b) × h.";
  return (
    <div style={{
      padding: "12px 18px", borderRadius: 16,
      background: chip, marginBottom: 12,
    }}>
      <div style={{
        fontFamily: "var(--font-display), sans-serif",
        fontSize: 26, fontWeight: 800, color: ink,
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

export function QuadProblemPage({
  pageNumber, problems, accent, showAnswer, cols = 4, rows = 3,
}: {
  pageNumber: 1 | 2;
  problems: QuadProblem[];
  accent: AccentKey;
  showAnswer: boolean;
  levelFullId: string;
  cols?: number;
  rows?: number;
}) {
  const startIndex = (pageNumber - 1) * problems.length + 1;
  const maxDim = problems.reduce((m, p) => Math.max(m, p.a, p.b, p.h), 6);
  const shape = problems[0]?.shape ?? "parallelogram";
  return (
    <div style={{ padding: "14px 22px 12px", display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
      <OperationHero accent={accent} shape={shape} />
      <div style={{
        flex: 1, display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gap: 14, minHeight: 0,
      }}>
        {problems.map((p, i) => (
          <QuadCell
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

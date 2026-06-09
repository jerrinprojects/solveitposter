// Compare-area worksheet (Y3.4). Each problem shows two rectangles drawn
// on a unit grid side-by-side. Students count squares in each and decide
// which has the larger area (> / < / =).

import type { ComparePairProblem } from "@/data/lengthLevels";

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
  1: 1567, 2: 3137, 3: 8623,
};

export function buildComparePairs(
  pool: ComparePairProblem[],
  version: WorksheetVersion,
  count: number,
): ComparePairProblem[] {
  if (pool.length === 0) return [];
  // V1 = small shapes (max <= 5), V2 = medium (4–7), V3 = larger (5–7).
  let filtered: ComparePairProblem[];
  if (version === 1) {
    filtered = pool.filter((p) =>
      Math.max(p.shapeA.length, p.shapeB.length) <= 5,
    );
  } else if (version === 2) {
    filtered = pool.filter((p) => {
      const mx = Math.max(p.shapeA.length, p.shapeB.length);
      return mx >= 4 && mx <= 7;
    });
  } else {
    filtered = pool.filter((p) =>
      Math.max(p.shapeA.length, p.shapeB.length) >= 5,
    );
  }
  if (filtered.length === 0) filtered = pool;

  // Also bias toward problems where comparison is mixed (>/</=).
  const shuffled = seededShuffle(filtered, VERSION_SEEDS[version]);
  return Array.from({ length: count }, (_, i) => shuffled[i % shuffled.length]);
}

function MiniGridRect({
  L, W, accent, cellPx,
}: { L: number; W: number; accent: AccentKey; cellPx: number }) {
  const { num, fill } = PAGE_PALETTE[accent];
  // Surround with 1-cell padding so the unit cells are visible.
  const padCells = 1;
  const cols = L + padCells * 2;
  const rows = W + padCells * 2;
  const totalW = cols * cellPx;
  const totalH = rows * cellPx;
  const sx = padCells * cellPx;
  const sy = padCells * cellPx;
  const sw = L * cellPx;
  const sh = W * cellPx;

  const lines: React.ReactElement[] = [];
  for (let i = 0; i <= cols; i++) {
    lines.push(
      <line key={`v${i}`} x1={i * cellPx} y1={0} x2={i * cellPx} y2={totalH}
        stroke="#d0c8c0" strokeWidth={0.7} />,
    );
  }
  for (let i = 0; i <= rows; i++) {
    lines.push(
      <line key={`h${i}`} x1={0} y1={i * cellPx} x2={totalW} y2={i * cellPx}
        stroke="#d0c8c0" strokeWidth={0.7} />,
    );
  }
  const innerLines: React.ReactElement[] = [];
  for (let i = 1; i < L; i++) {
    innerLines.push(
      <line key={`iv${i}`} x1={sx + i * cellPx} y1={sy} x2={sx + i * cellPx} y2={sy + sh}
        stroke="#fff" strokeWidth={1.2} />,
    );
  }
  for (let i = 1; i < W; i++) {
    innerLines.push(
      <line key={`ih${i}`} x1={sx} y1={sy + i * cellPx} x2={sx + sw} y2={sy + i * cellPx}
        stroke="#fff" strokeWidth={1.2} />,
    );
  }

  return (
    <svg width={totalW} height={totalH} style={{ display: "block" }}>
      {lines}
      <rect x={sx} y={sy} width={sw} height={sh}
        fill={fill} fillOpacity={0.85} stroke={num} strokeWidth={2} />
      {innerLines}
    </svg>
  );
}

function CompareCell({
  index, problem, accent, showAnswer,
}: {
  index: number; problem: ComparePairProblem; accent: AccentKey; showAnswer: boolean;
}) {
  const { ink, chip, soft } = PAGE_PALETTE[accent];
  // Size shape rendering: cell width ~250, height ~150.
  // Each grid cell ~10-12 px so a 7×7 shape fits roughly 80×80 px.
  const maxDim = Math.max(
    problem.shapeA.length, problem.shapeA.width,
    problem.shapeB.length, problem.shapeB.width,
  );
  const cellPx = Math.min(13, Math.floor(60 / maxDim));

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
        marginBottom: 4,
      }}>
        Q{index}
      </div>
      <div style={{
        flex: 1, minHeight: 0, display: "flex",
        alignItems: "center", justifyContent: "center", gap: 8,
      }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: ink }}>A</div>
          <MiniGridRect L={problem.shapeA.length} W={problem.shapeA.width}
            accent={accent} cellPx={cellPx} />
        </div>
        <div style={{
          fontSize: 18, fontWeight: 800, color: ink,
          fontFamily: "var(--font-display), sans-serif",
        }}>
          vs
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: ink }}>B</div>
          <MiniGridRect L={problem.shapeB.length} W={problem.shapeB.width}
            accent={accent} cellPx={cellPx} />
        </div>
      </div>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 6, marginTop: 6, paddingTop: 4,
        borderTop: `1px dashed ${chip}`,
        fontFamily: "var(--font-display), sans-serif",
        fontSize: 12, fontWeight: 800, color: ink,
      }}>
        {showAnswer ? (
          <>
            <span>A = <span style={{ background: soft, padding: "1px 5px", borderRadius: 4 }}>{problem.areaA}</span></span>
            <span style={{
              fontSize: 16, background: soft,
              padding: "1px 8px", borderRadius: 4,
            }}>
              A {problem.comparison} B
            </span>
            <span>B = <span style={{ background: soft, padding: "1px 5px", borderRadius: 4 }}>{problem.areaB}</span></span>
          </>
        ) : (
          <>
            <span>A = ____</span>
            <span style={{ fontSize: 14 }}>A&nbsp;__&nbsp;B</span>
            <span>B = ____</span>
          </>
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
        Compare the Areas
      </div>
      <div style={{
        fontFamily: "var(--font-body), sans-serif",
        fontSize: 12, fontWeight: 600, color: ink, opacity: 0.85,
        marginTop: 4,
      }}>
        Count the squares in each shape, then write &gt; , &lt; , or = between them.
      </div>
    </div>
  );
}

export function ComparePairProblemPage({
  pageNumber, problems, accent, showAnswer, cols = 4, rows = 3,
}: {
  pageNumber: 1 | 2;
  problems: ComparePairProblem[];
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
        gap: 14, minHeight: 0,
      }}>
        {problems.map((p, i) => (
          <CompareCell
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

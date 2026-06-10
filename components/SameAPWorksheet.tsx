// Y5.4 "Same area vs same perimeter" worksheet. Each problem shows two
// rectangles on a grid; students compute A and P for each and decide
// whether the pair has the same area, same perimeter, both, or neither.

import type { SameAreaPerimeterProblem } from "@/data/lengthLevels";

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
  1: 3209, 2: 6791, 3: 1543,
};

export function buildSameAPProblems(
  pool: SameAreaPerimeterProblem[],
  version: WorksheetVersion,
  count: number,
): SameAreaPerimeterProblem[] {
  if (pool.length === 0) return [];
  const shuffled = seededShuffle(pool, VERSION_SEEDS[version]);
  return Array.from({ length: count }, (_, i) => shuffled[i % shuffled.length]);
}

function LabelledRect({
  L, W, accent, label, maxDim,
}: {
  L: number; W: number; accent: AccentKey; label: string;
  // Largest dimension across all shapes on the page — used so big shapes
  // (e.g. the 24cm side of a 2×24 pair) cap to the same pixel size as
  // smaller pairs and don't overflow the cell.
  maxDim: number;
}) {
  const { num, ink, fill } = PAGE_PALETTE[accent];
  // Fixed maximum shape height/width in pixels; everything scales relative
  // to the largest dimension on the page so the layout stays tight.
  const maxPx = 56;
  const unit = maxPx / Math.max(maxDim, 6);
  const sw = L * unit;
  const sh = W * unit;
  // Pad: left/right space for "X cm" labels, top space for top label,
  // bottom space for the "A" / "B" caption.
  const padTop = 14;
  const padBottom = 14;
  const padLeft = 8;
  const padRight = 30; // "10 cm" needs ~28px
  const totalW = sw + padLeft + padRight;
  const totalH = sh + padTop + padBottom;
  const sx = padLeft;
  const sy = padTop;

  return (
    <svg width={totalW} height={totalH} style={{ display: "block" }}>
      <rect x={sx} y={sy} width={sw} height={sh}
        fill={fill} fillOpacity={0.7} stroke={num} strokeWidth={1.5} />
      <text x={sx + sw / 2} y={sy - 4} textAnchor="middle"
        style={{
          fontFamily: "var(--font-mono), 'Courier New', monospace",
          fontSize: 10, fontWeight: 700, fill: ink,
        }}>
        {L} cm
      </text>
      <text x={sx + sw + 4} y={sy + sh / 2}
        textAnchor="start" dominantBaseline="middle"
        style={{
          fontFamily: "var(--font-mono), 'Courier New', monospace",
          fontSize: 10, fontWeight: 700, fill: ink,
        }}>
        {W} cm
      </text>
      <text x={sx + sw / 2} y={sy + sh + 11}
        textAnchor="middle"
        style={{
          fontFamily: "var(--font-display), sans-serif",
          fontSize: 12, fontWeight: 800, fill: ink,
        }}>
        {label}
      </text>
    </svg>
  );
}

function SameAPCell({
  index, problem, accent, showAnswer, maxDim,
}: {
  index: number; problem: SameAreaPerimeterProblem;
  accent: AccentKey; showAnswer: boolean;
  maxDim: number;
}) {
  const { ink, chip, soft } = PAGE_PALETTE[accent];

  return (
    <div style={{
      borderRadius: 14,
      background: "#fffaf3",
      border: `1.5px solid ${chip}`,
      padding: "10px 12px 10px",
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
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        marginBottom: 4,
      }}>
        <LabelledRect L={problem.shapeA.length} W={problem.shapeA.width}
          accent={accent} label="A" maxDim={maxDim} />
        <LabelledRect L={problem.shapeB.length} W={problem.shapeB.width}
          accent={accent} label="B" maxDim={maxDim} />
      </div>
      <div style={{
        fontFamily: "var(--font-display), sans-serif",
        fontSize: 10, fontWeight: 700, color: ink,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "2px 8px",
        paddingTop: 4,
        borderTop: `1px dashed ${chip}`,
      }}>
        {showAnswer ? (
          <>
            <span>A: A={<span style={{ background: soft, padding: "0 4px", borderRadius: 3 }}>{problem.areaA}</span>} P={<span style={{ background: soft, padding: "0 4px", borderRadius: 3 }}>{problem.perA}</span>}</span>
            <span>B: A={<span style={{ background: soft, padding: "0 4px", borderRadius: 3 }}>{problem.areaB}</span>} P={<span style={{ background: soft, padding: "0 4px", borderRadius: 3 }}>{problem.perB}</span>}</span>
            <span>Same area? <span style={{ background: soft, padding: "0 4px", borderRadius: 3 }}>{problem.sameArea ? "YES" : "NO"}</span></span>
            <span>Same per? <span style={{ background: soft, padding: "0 4px", borderRadius: 3 }}>{problem.samePerimeter ? "YES" : "NO"}</span></span>
          </>
        ) : (
          <>
            <span>A: A=____ P=____</span>
            <span>B: A=____ P=____</span>
            <span>Same area? Y / N</span>
            <span>Same per? Y / N</span>
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
        fontSize: 26, fontWeight: 800, color: ink,
        letterSpacing: "-0.02em", lineHeight: 1,
      }}>
        Same Area or Same Perimeter?
      </div>
      <div style={{
        fontFamily: "var(--font-body), sans-serif",
        fontSize: 12, fontWeight: 600, color: ink, opacity: 0.85,
        marginTop: 4,
      }}>
        Work out the area (A) and perimeter (P) of each shape, then circle Y or N.
      </div>
    </div>
  );
}

export function SameAPProblemPage({
  pageNumber, problems, accent, showAnswer, cols = 4, rows = 3,
}: {
  pageNumber: 1 | 2;
  problems: SameAreaPerimeterProblem[];
  accent: AccentKey;
  showAnswer: boolean;
  levelFullId: string;
  cols?: number;
  rows?: number;
}) {
  const startIndex = (pageNumber - 1) * problems.length + 1;
  // Largest dim across all problems' shapes — used to size them uniformly.
  const maxDim = problems.reduce((m, p) => Math.max(
    m, p.shapeA.length, p.shapeA.width, p.shapeB.length, p.shapeB.width,
  ), 6);
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
          <SameAPCell
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

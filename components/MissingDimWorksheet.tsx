// Y7.2 / Y7.4 missing-dimension worksheet. Each problem shows a rectangle
// with ONE side labelled and either the perimeter or the area given. The
// student works backwards to find the missing side.

import type { MissingDimProblem } from "@/data/lengthLevels";

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
  1: 5419, 2: 7823, 3: 9277,
};

export function buildMissingDimProblems(
  pool: MissingDimProblem[],
  version: WorksheetVersion,
  count: number,
): MissingDimProblem[] {
  if (pool.length === 0) return [];
  const shuffled = seededShuffle(pool, VERSION_SEEDS[version]);
  return Array.from({ length: count }, (_, i) => shuffled[i % shuffled.length]);
}

function ShapeSvg({
  problem, accent, cellW, cellH, maxDim,
}: {
  problem: MissingDimProblem; accent: AccentKey;
  cellW: number; cellH: number; maxDim: number;
}) {
  const { num, ink } = PAGE_PALETTE[accent];
  // Draw the rectangle using whatever dimensions we know — for the
  // unknown side use a representative size so the shape doesn't look
  // degenerate. The numerical answer is what students compute; the
  // diagram is a visual aid.
  const L = problem.knownDim === "L" ? problem.knownValue : problem.missingValue;
  const W = problem.knownDim === "W" ? problem.knownValue : problem.missingValue;

  const padX = 34;
  const padY = 22;
  const availW = cellW - padX * 2;
  const availH = cellH - padY * 2;
  const pixelsPerUnit = Math.min(availW, availH) / Math.max(maxDim, 1) * 0.9;
  const minDimPx = Math.min(availW, availH) * 0.35;
  const scale = (dim: number) => Math.max(minDimPx, dim * pixelsPerUnit);
  const w = Math.min(scale(L), availW);
  const h = Math.min(scale(W), availH);
  const x = (cellW - w) / 2;
  const y = (cellH - h) / 2 + 4;

  const knownLabelStyle: React.CSSProperties = {
    fontFamily: "var(--font-mono), 'Courier New', monospace",
    fontSize: 11, fontWeight: 700, fill: ink,
  };
  const unknownLabelStyle: React.CSSProperties = {
    fontFamily: "var(--font-display), sans-serif",
    fontSize: 14, fontWeight: 800, fill: num,
  };

  // Which side label is the known number vs "?"
  const isLKnown = problem.knownDim === "L";

  return (
    <svg width={cellW} height={cellH} style={{ display: "block" }}>
      <rect x={x} y={y} width={w} height={h}
        fill="none" stroke={num} strokeWidth={2} />
      {/* Top label */}
      <text x={x + w / 2} y={y - 6} textAnchor="middle"
        style={isLKnown ? knownLabelStyle : unknownLabelStyle}>
        {isLKnown ? `${problem.knownValue} ${problem.unit}` : "?"}
      </text>
      {/* Right label */}
      <text x={x + w + 8} y={y + h / 2}
        textAnchor="start" dominantBaseline="middle"
        style={isLKnown ? unknownLabelStyle : knownLabelStyle}>
        {isLKnown ? "?" : `${problem.knownValue} ${problem.unit}`}
      </text>
    </svg>
  );
}

function MissingDimCell({
  index, problem, accent, showAnswer, maxDim,
}: {
  index: number; problem: MissingDimProblem; accent: AccentKey;
  showAnswer: boolean; maxDim: number;
}) {
  const { ink, chip, soft, num } = PAGE_PALETTE[accent];
  const givenLabel = problem.operation === "perimeter" ? "P" : "A";
  const givenUnit = problem.operation === "perimeter"
    ? problem.unit
    : `${problem.unit}²`;

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
        <ShapeSvg problem={problem} accent={accent}
          cellW={165} cellH={108} maxDim={maxDim} />
      </div>
      <div style={{
        marginTop: 6, paddingTop: 4,
        borderTop: `1px dashed ${chip}`,
      }}>
        <div style={{
          fontFamily: "var(--font-display), sans-serif",
          fontSize: 12, fontWeight: 700, color: ink,
          marginBottom: 4,
        }}>
          {givenLabel} = {problem.given} {givenUnit}
        </div>
        <div style={{
          display: "flex", alignItems: "center", gap: 6,
        }}>
          <span style={{
            fontFamily: "var(--font-display), sans-serif",
            fontSize: 13, fontWeight: 800, color: ink,
            whiteSpace: "nowrap",
          }}>
            ? =
          </span>
          {showAnswer ? (
            <span style={{
              fontFamily: "var(--font-mono), 'Courier New', monospace",
              fontSize: 14, fontWeight: 700, color: ink,
              background: soft, padding: "2px 8px", borderRadius: 6,
            }}>
              {problem.missingValue} {problem.unit}
            </span>
          ) : (
            <div style={{ flex: 1, height: 18, borderBottom: `2px solid ${num}` }} />
          )}
        </div>
      </div>
    </div>
  );
}

function OperationHero({
  accent, operation,
}: { accent: AccentKey; operation: "perimeter" | "area" }) {
  const { ink, chip } = PAGE_PALETTE[accent];
  const title = operation === "perimeter"
    ? "Find the Missing Side"
    : "Find the Missing Side";
  const subtitle = operation === "perimeter"
    ? "P = 2 × (length + width). Use the perimeter to work backwards."
    : "A = length × width. Use the area to work backwards.";
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

export function MissingDimProblemPage({
  pageNumber, problems, accent, showAnswer, cols = 5, rows = 3,
}: {
  pageNumber: 1 | 2;
  problems: MissingDimProblem[];
  accent: AccentKey;
  showAnswer: boolean;
  levelFullId: string;
  cols?: number;
  rows?: number;
}) {
  const startIndex = (pageNumber - 1) * problems.length + 1;
  const maxDim = problems.reduce((m, p) => Math.max(m, p.knownValue, p.missingValue), 1);
  const operation = problems[0]?.operation ?? "perimeter";
  return (
    <div style={{ padding: "14px 22px 12px", display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
      <OperationHero accent={accent} operation={operation} />
      <div style={{
        flex: 1, display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gap: 16, minHeight: 0,
      }}>
        {problems.map((p, i) => (
          <MissingDimCell
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

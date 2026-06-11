// Y8.4 "Area and perimeter together" worksheet. Each problem shows a
// labelled rectangle; students compute both A and P.

import type { APBothProblem } from "@/data/lengthLevels";

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
  1: 3343, 2: 7331, 3: 1471,
};

export function buildAPBothProblems(
  pool: APBothProblem[],
  version: WorksheetVersion,
  count: number,
): APBothProblem[] {
  if (pool.length === 0) return [];
  let filtered = pool;
  if (version === 1) filtered = pool.filter((p) => Math.max(p.length, p.width) <= 12);
  else if (version === 2) filtered = pool.filter((p) => {
    const mx = Math.max(p.length, p.width);
    return mx >= 8 && mx <= 18;
  });
  else filtered = pool.filter((p) => Math.max(p.length, p.width) >= 12);
  if (filtered.length === 0) filtered = pool;
  const shuffled = seededShuffle(filtered, VERSION_SEEDS[version]);
  return Array.from({ length: count }, (_, i) => shuffled[i % shuffled.length]);
}

function APBothSvg({
  problem, accent, cellW, cellH, maxDim,
}: {
  problem: APBothProblem; accent: AccentKey;
  cellW: number; cellH: number; maxDim: number;
}) {
  const { num, ink } = PAGE_PALETTE[accent];
  const padX = 34;
  const padY = 22;
  const availW = cellW - padX * 2;
  const availH = cellH - padY * 2;
  const pixelsPerUnit = Math.min(availW, availH) / Math.max(maxDim, 1) * 0.9;
  const minDimPx = Math.min(availW, availH) * 0.35;
  const scale = (dim: number) => Math.max(minDimPx, dim * pixelsPerUnit);
  const w = Math.min(scale(problem.length), availW);
  const h = Math.min(scale(problem.width), availH);
  const x = (cellW - w) / 2;
  const y = (cellH - h) / 2 + 4;

  return (
    <svg width={cellW} height={cellH} style={{ display: "block" }}>
      <rect x={x} y={y} width={w} height={h}
        fill="none" stroke={num} strokeWidth={2} />
      <text x={x + w / 2} y={y - 6} textAnchor="middle"
        style={{
          fontFamily: "var(--font-mono), 'Courier New', monospace",
          fontSize: 12, fontWeight: 700, fill: ink,
        }}>
        {problem.length} {problem.unit}
      </text>
      <text x={x + w + 8} y={y + h / 2}
        textAnchor="start" dominantBaseline="middle"
        style={{
          fontFamily: "var(--font-mono), 'Courier New', monospace",
          fontSize: 12, fontWeight: 700, fill: ink,
        }}>
        {problem.width} {problem.unit}
      </text>
    </svg>
  );
}

function APBothCell({
  index, problem, accent, showAnswer, maxDim,
}: {
  index: number; problem: APBothProblem; accent: AccentKey;
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
        <APBothSvg problem={problem} accent={accent}
          cellW={170} cellH={108} maxDim={maxDim} />
      </div>
      <div style={{
        marginTop: 6, paddingTop: 4,
        borderTop: `1px dashed ${chip}`,
        display: "flex", flexDirection: "column", gap: 3,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{
            fontFamily: "var(--font-display), sans-serif",
            fontSize: 11, fontWeight: 800, color: ink, whiteSpace: "nowrap",
          }}>
            Area =
          </span>
          {showAnswer ? (
            <span style={{
              fontFamily: "var(--font-mono), 'Courier New', monospace",
              fontSize: 12, fontWeight: 700, color: ink,
              background: soft, padding: "1px 6px", borderRadius: 5,
            }}>
              {problem.area} {problem.unit}²
            </span>
          ) : (
            <div style={{ flex: 1, height: 14, borderBottom: `2px solid ${num}` }} />
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{
            fontFamily: "var(--font-display), sans-serif",
            fontSize: 11, fontWeight: 800, color: ink, whiteSpace: "nowrap",
          }}>
            Perimeter =
          </span>
          {showAnswer ? (
            <span style={{
              fontFamily: "var(--font-mono), 'Courier New', monospace",
              fontSize: 12, fontWeight: 700, color: ink,
              background: soft, padding: "1px 6px", borderRadius: 5,
            }}>
              {problem.perimeter} {problem.unit}
            </span>
          ) : (
            <div style={{ flex: 1, height: 14, borderBottom: `2px solid ${num}` }} />
          )}
        </div>
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
        Find Both A and P
      </div>
      <div style={{
        fontFamily: "var(--font-body), sans-serif",
        fontSize: 12, fontWeight: 600, color: ink, opacity: 0.85,
        marginTop: 4,
      }}>
        A = length × width.  P = 2 × (length + width).  Find both for each rectangle.
      </div>
    </div>
  );
}

export function APBothProblemPage({
  pageNumber, problems, accent, showAnswer, cols = 5, rows = 3,
}: {
  pageNumber: 1 | 2;
  problems: APBothProblem[];
  accent: AccentKey;
  showAnswer: boolean;
  levelFullId: string;
  cols?: number;
  rows?: number;
}) {
  const startIndex = (pageNumber - 1) * problems.length + 1;
  const maxDim = problems.reduce((m, p) => Math.max(m, p.length, p.width), 1);
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
          <APBothCell
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

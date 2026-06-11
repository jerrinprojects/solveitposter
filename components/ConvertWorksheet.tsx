// Unit conversion worksheet (Y5.1 / Y6.1 / Y8.1). Each cell shows a value
// to convert from one unit to another. Inline-style 25 problems per page.

import type { ConvertProblem } from "@/data/lengthLevels";

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
  1: 8123, 2: 6473, 3: 9421,
};

export function buildConvertProblems(
  pool: ConvertProblem[],
  version: WorksheetVersion,
  count: number,
): ConvertProblem[] {
  if (pool.length === 0) return [];
  const shuffled = seededShuffle(pool, VERSION_SEEDS[version]);
  return Array.from({ length: count }, (_, i) => shuffled[i % shuffled.length]);
}

function ConvertCell({
  index, problem, accent, showAnswer,
}: {
  index: number; problem: ConvertProblem; accent: AccentKey; showAnswer: boolean;
}) {
  const { ink, chip, soft, num } = PAGE_PALETTE[accent];

  return (
    <div style={{
      borderRadius: 12,
      background: "#fffaf3",
      border: `1.5px solid ${chip}`,
      padding: "8px 12px 10px",
      display: "flex", flexDirection: "column",
      minHeight: 0, boxSizing: "border-box",
      boxShadow: "0 1px 0 rgba(0,0,0,0.04)",
    }}>
      <div style={{
        fontFamily: "var(--font-body), sans-serif",
        fontSize: 9, fontWeight: 800, color: ink,
        letterSpacing: "0.08em", textTransform: "uppercase",
        marginBottom: 2,
      }}>
        Q{index}
      </div>
      <div style={{
        flex: 1, display: "flex",
        alignItems: "center", justifyContent: "center", gap: 6,
        fontFamily: "var(--font-mono), 'Courier New', monospace",
        fontSize: 14, fontWeight: 700, color: ink,
      }}>
        <span>{problem.fromValueDisplay} {problem.fromUnit}</span>
        <span style={{ color: num }}>=</span>
        {showAnswer ? (
          <span style={{
            background: soft, padding: "2px 8px", borderRadius: 6,
          }}>
            {problem.answerDisplay} {problem.toUnit}
          </span>
        ) : (
          <>
            <span style={{ display: "inline-block", minWidth: 36, borderBottom: `2px solid ${num}`, paddingBottom: 2 }}>&nbsp;</span>
            <span>{problem.toUnit}</span>
          </>
        )}
      </div>
    </div>
  );
}

function OperationHero({
  accent, title, subtitle,
}: { accent: AccentKey; title: string; subtitle: string }) {
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

export function ConvertProblemPage({
  pageNumber, problems, accent, showAnswer,
  heroTitle, heroSubtitle, cols = 5, rows = 5,
}: {
  pageNumber: 1 | 2;
  problems: ConvertProblem[];
  accent: AccentKey;
  showAnswer: boolean;
  levelFullId: string;
  heroTitle: string;
  heroSubtitle: string;
  cols?: number;
  rows?: number;
}) {
  const startIndex = (pageNumber - 1) * problems.length + 1;
  return (
    <div style={{ padding: "14px 22px 12px", display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
      <OperationHero accent={accent} title={heroTitle} subtitle={heroSubtitle} />
      <div style={{
        flex: 1, display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gap: 8, minHeight: 0,
      }}>
        {problems.map((p, i) => (
          <ConvertCell
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

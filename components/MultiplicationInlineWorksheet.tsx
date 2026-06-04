// Inline multiplication worksheet — no column form, just "A × B = ___" per cell.
// Used for Multiplication Stage 2.x basic practice sheets.

const PAGE_PALETTE = {
  pink:   { ink: "#d6336c", soft: "#fff0f7", chip: "#ffd5e8", num: "#ec407a" },
  mint:   { ink: "#0d9488", soft: "#e6fbf5", chip: "#bff3e6", num: "#14b8a6" },
  sunny:  { ink: "#b8860b", soft: "#fff7d9", chip: "#ffe8a0", num: "#e8a93e" },
  grape:  { ink: "#7c3aed", soft: "#f3edff", chip: "#dccdfb", num: "#a78bda" },
} as const;

type AccentKey = keyof typeof PAGE_PALETTE;

export type InlineProblem = { a: number; b: number };

// Banner pill used at the top of each page's grid.
function PageBanner({ accent, label, hint }: { accent: AccentKey; label: string; hint: string }) {
  const { ink, chip } = PAGE_PALETTE[accent];
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "8px 14px", borderRadius: 14,
      background: chip, marginBottom: 12,
    }}>
      <span style={{
        fontFamily: "var(--font-display), sans-serif",
        fontSize: 16, fontWeight: 800, color: ink, letterSpacing: "-0.01em",
      }}>
        {label}
      </span>
      <span style={{
        fontFamily: "var(--font-body), sans-serif",
        fontSize: 11, fontWeight: 600, color: ink, opacity: 0.85,
      }}>
        {hint}
      </span>
    </div>
  );
}

// One inline problem cell. Shows "Qn  AA × B = ____" or with the answer filled in.
function InlineCell({
  index, a, b, accent, showAnswer,
}: {
  index: number; a: number; b: number; accent: AccentKey; showAnswer: boolean;
}) {
  const { ink, chip, num, soft } = PAGE_PALETTE[accent];
  return (
    <div style={{
      borderRadius: 14,
      background: "#fffaf3",
      border: `1.5px solid ${chip}`,
      padding: "10px 14px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: 4,
      boxShadow: "0 1px 0 rgba(0,0,0,0.04)",
    }}>
      <div style={{
        fontFamily: "var(--font-body), sans-serif",
        fontSize: 10, fontWeight: 800, color: ink,
        letterSpacing: "0.08em", textTransform: "uppercase",
      }}>
        Q{index}
      </div>
      <div style={{
        display: "flex", alignItems: "baseline", gap: 6,
        fontFamily: "var(--font-mono), 'Courier New', monospace",
        fontSize: 22, fontWeight: 700, color: num, lineHeight: 1.1,
      }}>
        <span>{a}</span>
        <span style={{ color: ink, fontSize: 18 }}>×</span>
        <span>{b}</span>
        <span style={{ color: ink, fontSize: 18 }}>=</span>
        {showAnswer ? (
          <span style={{
            color: ink,
            background: soft,
            padding: "1px 10px",
            borderRadius: 8,
          }}>
            {a * b}
          </span>
        ) : (
          <span style={{
            flex: 1,
            borderBottom: `2px solid ${ink}`,
            minWidth: 60,
            height: 18,
          }} />
        )}
      </div>
    </div>
  );
}


// Deterministic Fisher–Yates shuffle. Same seed → same ordering.
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

export function InlineProblemPage({
  pageNumber, problems, accent, showAnswer, stageFullId, instructionHint,
}: {
  pageNumber: 1 | 2;
  problems: InlineProblem[];
  accent: AccentKey;
  showAnswer: boolean;
  stageFullId: string;
  instructionHint: string;
}) {
  const startIndex = (pageNumber - 1) * problems.length + 1;
  return (
    <div style={{ padding: "16px 22px 12px", display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
      <PageBanner
        accent={accent}
        label={`Stage ${stageFullId} · Page ${pageNumber}${showAnswer ? " · Answers" : ""}`}
        hint={showAnswer
          ? "Check your answers against the highlighted numbers."
          : instructionHint}
      />
      <div style={{
        flex: 1, display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gridTemplateRows: "repeat(5, 1fr)",
        gap: 10, minHeight: 0,
      }}>
        {problems.map((p, i) => (
          <InlineCell
            key={i}
            index={startIndex + i}
            a={p.a}
            b={p.b}
            accent={accent}
            showAnswer={showAnswer}
          />
        ))}
      </div>
    </div>
  );
}

// Each version uses a distinct seeded shuffle, so V1/V2/V3 have different
// orderings (and different repeats if the pool is smaller than `total`).
export type WorksheetVersion = 1 | 2 | 3;

export const VERSION_SEEDS: Record<WorksheetVersion, number> = {
  1: 42,
  2: 137,
  3: 271,
};

export function buildPages(
  pool: InlineProblem[],
  version: WorksheetVersion,
  perPage: number,
): { page1: InlineProblem[]; page2: InlineProblem[] } {
  const total = perPage * 2;
  const shuffled = seededShuffle(pool, VERSION_SEEDS[version]);
  const sequence: InlineProblem[] = [];
  for (let i = 0; i < total; i++) {
    sequence.push(shuffled[i % shuffled.length]);
  }
  return {
    page1: sequence.slice(0, perPage),
    page2: sequence.slice(perPage),
  };
}

export { seededShuffle };

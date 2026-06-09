// Word-problem worksheet for length levels (Y4 area & perimeter).
// 6 problems per page, 4 pages of problems + 4 answer pages, matching
// the existing arithmetic word-problem layout.

import type { LengthWordProblem } from "@/data/lengthLevels";

const PAGE_PALETTE = {
  pink:   { ink: "#d6336c", soft: "#fff0f7", chip: "#ffd5e8", num: "#ec407a" },
  mint:   { ink: "#0d9488", soft: "#e6fbf5", chip: "#bff3e6", num: "#14b8a6" },
  sunny:  { ink: "#b8860b", soft: "#fff7d9", chip: "#ffe8a0", num: "#e8a93e" },
  grape:  { ink: "#7c3aed", soft: "#f3edff", chip: "#dccdfb", num: "#a78bda" },
} as const;

export type AccentKey = keyof typeof PAGE_PALETTE;

function WordProblemCell({
  index, problem, accent, showAnswer,
}: {
  index: number; problem: LengthWordProblem; accent: AccentKey; showAnswer: boolean;
}) {
  const { ink, chip, soft } = PAGE_PALETTE[accent];
  return (
    <div style={{
      borderRadius: 16,
      background: "#fffaf3",
      border: `1.5px solid ${chip}`,
      padding: "10px 14px 12px",
      display: "flex",
      flexDirection: "column",
      gap: 6,
      minHeight: 0,
      boxSizing: "border-box",
      boxShadow: "0 1px 0 rgba(0,0,0,0.04)",
    }}>
      <div>
        <span style={{
          fontFamily: "var(--font-display), sans-serif",
          fontSize: 14, fontWeight: 800, color: ink,
          background: chip, padding: "2px 9px", borderRadius: 999,
        }}>
          Q{index}
        </span>
      </div>
      <p style={{
        fontFamily: "var(--font-body), sans-serif",
        fontSize: 12.5, fontWeight: 500, color: "#2a2422",
        lineHeight: 1.45, margin: 0, flex: 1,
      }}>
        {problem.prompt}
      </p>

      {/* Working space — dashed lines */}
      <div style={{
        background: soft, borderRadius: 10,
        padding: "6px 10px",
        display: "flex", flexDirection: "column", justifyContent: "space-around",
        height: 40,
      }}>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} style={{
            borderBottom: `1px dashed ${chip}`,
            height: 1,
          }} />
        ))}
      </div>

      {/* Answer line */}
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <span style={{
          fontFamily: "var(--font-display), sans-serif",
          fontSize: 13, fontWeight: 700, color: ink,
        }}>
          Answer:
        </span>
        {showAnswer ? (
          <span style={{
            fontFamily: "var(--font-mono), 'Courier New', monospace",
            fontSize: 18, fontWeight: 700, color: ink,
            background: soft, padding: "2px 12px", borderRadius: 8,
          }}>
            {problem.answer}
          </span>
        ) : (
          <div style={{
            flex: 1, height: 22,
            borderBottom: `2px solid ${ink}`,
          }} />
        )}
      </div>
    </div>
  );
}

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

export function LengthWordProblemPage({
  pageNumber, problems, accent, showAnswer, levelFullId,
}: {
  pageNumber: 1 | 2 | 3 | 4;
  problems: LengthWordProblem[];
  accent: AccentKey;
  showAnswer: boolean;
  levelFullId: string;
}) {
  const startIndex = (pageNumber - 1) * problems.length + 1;
  return (
    <div style={{ padding: "16px 22px 12px", display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
      <PageBanner
        accent={accent}
        label={`${levelFullId} · Word Problems · Page ${pageNumber}${showAnswer ? " · Answers" : ""}`}
        hint={showAnswer
          ? "Highlighted numbers are the correct answers."
          : "Read carefully, show your working, then write your answer."}
      />
      <div style={{
        flex: 1, display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "repeat(2, 1fr)",
        gap: 12, minHeight: 0,
      }}>
        {problems.map((p, i) => (
          <WordProblemCell
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

// Long-division column cell. Renders the standard worksheet layout:
//
//        _quotient_
//     divisor ) dividend       (with optional "R remainder" after the quotient)
//
// The horizontal bar above the dividend is where the student writes the
// quotient; on answer pages it's filled in.

import type { InlineProblem } from "./MultiplicationInlineWorksheet";

const PAGE_PALETTE = {
  pink:   { ink: "#d6336c", soft: "#fff0f7", chip: "#ffd5e8", num: "#ec407a" },
  mint:   { ink: "#0d9488", soft: "#e6fbf5", chip: "#bff3e6", num: "#14b8a6" },
  sunny:  { ink: "#b8860b", soft: "#fff7d9", chip: "#ffe8a0", num: "#e8a93e" },
  grape:  { ink: "#7c3aed", soft: "#f3edff", chip: "#dccdfb", num: "#a78bda" },
} as const;

type AccentKey = keyof typeof PAGE_PALETTE;

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

function DivisionCell({
  index, problem, accent, showAnswer,
}: {
  index: number; problem: InlineProblem; accent: AccentKey; showAnswer: boolean;
}) {
  const { a, b, aDisplay, bDisplay, answerDisplay } = problem;
  const { ink, chip, num, soft } = PAGE_PALETTE[accent];
  const dividendStr = aDisplay ?? String(a);
  const divisorStr = bDisplay ?? String(b);
  // answerDisplay is the quotient (and optional remainder), e.g. "28 R 4".
  const quotientStr = answerDisplay ?? String(a / b);
  // Auto-scale font down for wider dividends.
  const totalLen = dividendStr.length + divisorStr.length + quotientStr.length;
  const digitFont =
    totalLen >= 14 ? 16 :
    totalLen >= 10 ? 18 :
                     22;

  return (
    <div style={{
      borderRadius: 14,
      background: "#fffaf3",
      border: `1.5px solid ${chip}`,
      padding: "8px 12px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      minHeight: 0,
      boxSizing: "border-box",
      overflow: "hidden",
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
        display: "flex", alignItems: "center", justifyContent: "center",
        flex: 1, minHeight: 0,
      }}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 4 }}>
          {/* Divisor on the left */}
          <span style={{
            fontFamily: "var(--font-mono), 'Courier New', monospace",
            fontSize: digitFont, fontWeight: 700, color: num,
            paddingBottom: 2,
          }}>
            {divisorStr}
          </span>
          {/* ")" bracket — uses a tall character so it visually contains the dividend */}
          <span style={{
            fontFamily: "var(--font-mono), 'Courier New', monospace",
            fontSize: digitFont * 1.5, fontWeight: 400, color: num,
            lineHeight: 0.9,
            paddingBottom: 2,
          }}>
            )
          </span>
          {/* Stacked: top bar with quotient on top, dividend on bottom */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "stretch" }}>
            {/* Quotient (above the bar) */}
            <div style={{
              minHeight: digitFont + 4,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-start",
              paddingLeft: 2,
              paddingBottom: 2,
            }}>
              {showAnswer ? (
                <span style={{
                  fontFamily: "var(--font-mono), 'Courier New', monospace",
                  fontSize: digitFont, fontWeight: 700, color: ink,
                  background: soft, padding: "1px 6px", borderRadius: 6,
                }}>
                  {quotientStr}
                </span>
              ) : null}
            </div>
            {/* Horizontal bar (vinculum) above dividend */}
            <div style={{
              borderTop: `2px solid ${ink}`,
              paddingTop: 2,
              paddingLeft: 4,
              minWidth: dividendStr.length * digitFont * 0.6 + 8,
            }}>
              <span style={{
                fontFamily: "var(--font-mono), 'Courier New', monospace",
                fontSize: digitFont, fontWeight: 700, color: num,
              }}>
                {dividendStr}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DivisionColumnPage({
  pageNumber, problems, accent, showAnswer, stageFullId, instructionHint,
  cols = 5, rows = 4,
}: {
  pageNumber: 1 | 2;
  problems: InlineProblem[];
  accent: AccentKey;
  showAnswer: boolean;
  stageFullId: string;
  instructionHint: string;
  cols?: number;
  rows?: number;
}) {
  const startIndex = (pageNumber - 1) * problems.length + 1;
  return (
    <div style={{ padding: "16px 22px 12px", display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
      <PageBanner
        accent={accent}
        label={`Stage ${stageFullId} · Long Division · Page ${pageNumber}${showAnswer ? " · Answers" : ""}`}
        hint={showAnswer
          ? "Quotient is written above the bar. Remainders shown as 'R n' where applicable."
          : instructionHint}
      />
      <div style={{
        flex: 1, display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gap: 10, minHeight: 0,
      }}>
        {problems.map((p, i) => (
          <DivisionCell
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

// Column-form Stage 2.1 worksheet — vertical (long multiplication) layout,
// with optional answer fill-in for the answer pages.

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

// One column-form problem with H/T/O place-value labels above each digit.
// Shows either an empty answer space (dashed) or the answer filled in.
function VerticalCell({
  index, problem, accent, showAnswer,
}: {
  index: number; problem: InlineProblem; accent: AccentKey; showAnswer: boolean;
}) {
  const { a, b, aDisplay, bDisplay, answerDisplay, op = "×" } = problem;
  const { ink, chip, num, soft } = PAGE_PALETTE[accent];
  let aStr = aDisplay ?? String(a);
  let bStr = bDisplay ?? String(b);
  let answerStr = answerDisplay ?? String(
    op === "+" ? a + b : op === "−" ? a - b : a * b,
  );
  // Decimal problems are detected by the presence of a "." in any string —
  // PV labels (H/T/O) don't apply, so we suppress them.
  const isDecimal = aStr.includes(".") || bStr.includes(".") || answerStr.includes(".");
  // For column ADDITION and SUBTRACTION of decimals, decimal points must
  // align. Pad shorter operands with trailing zeros (and a decimal point
  // if needed) so the . sits in the same column across all three strings.
  if (isDecimal && (op === "+" || op === "−")) {
    const dpOf = (s: string) => s.includes(".") ? s.length - s.indexOf(".") - 1 : 0;
    const maxDp = Math.max(dpOf(aStr), dpOf(bStr), dpOf(answerStr));
    const padDp = (s: string): string => {
      const cur = dpOf(s);
      if (cur === maxDp) return s;
      return (s.includes(".") ? s : s + ".") + "0".repeat(maxDp - cur);
    };
    aStr = padDp(aStr);
    bStr = padDp(bStr);
    answerStr = padDp(answerStr);
  }
  // Grid width fits the widest of multiplicand, multiplier, and product.
  // Otherwise 4-digit answers (e.g. 52 × 53 = 2756) overflow a 3-column grid
  // and the trailing digit gets clipped.
  const digitCols = Math.max(aStr.length, bStr.length, answerStr.length);
  const totalCols = digitCols + 1;
  // PV labels from millions down to ones — covers products up to 7 digits
  // (Stage 4.9's 3999 × 1999 = ~8 million needs M; future stages may need more).
  const PV_LABELS = ["M", "HTh", "TTh", "Th", "H", "T", "O"];
  const pvForCol = (i: number) => PV_LABELS[7 - digitCols + i];
  const COL_W = 18;
  const monoStyle: React.CSSProperties = {
    fontFamily: "var(--font-mono), 'Courier New', monospace",
    fontSize: 20, fontWeight: 700,
  };

  return (
    <div style={{
      borderRadius: 14,
      background: "#fffaf3",
      border: `1.5px solid ${chip}`,
      padding: "5px 10px 8px",
      display: "flex",
      flexDirection: "column",
      minHeight: 0,
      boxSizing: "border-box",
      overflow: "hidden",
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
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: 1,
        color: num,
        lineHeight: 1.1,
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(${totalCols}, ${COL_W}px)`,
          justifyItems: "center",
          alignItems: "center",
          rowGap: 2,
        }}>
          {/* Place-value labels — suppressed for decimal problems */}
          <span>&nbsp;</span>
          {Array.from({ length: digitCols }).map((_, i) => (
            <span key={"pv" + i} style={{
              fontFamily: "var(--font-body), sans-serif",
              fontSize: 9, fontWeight: 800, color: ink, opacity: 0.6,
              letterSpacing: "0.04em",
            }}>
              {isDecimal ? " " : pvForCol(i)}
            </span>
          ))}

          {/* Multiplicand (a) right-aligned */}
          {Array.from({ length: totalCols - aStr.length }).map((_, i) => (
            <span key={"pad-a" + i}>&nbsp;</span>
          ))}
          {aStr.split("").map((d, i) => (
            <span key={"a" + i} style={monoStyle}>{d}</span>
          ))}

          {/* op b — operator sits in the column directly left of b's leading digit */}
          {Array.from({ length: totalCols - bStr.length - 1 }).map((_, i) => (
            <span key={"pad-b" + i}>&nbsp;</span>
          ))}
          <span style={monoStyle}>{op}</span>
          {bStr.split("").map((d, i) => (
            <span key={"b" + i} style={monoStyle}>{d}</span>
          ))}
        </div>

        {/* Underline */}
        <div style={{
          width: COL_W * totalCols,
          borderBottom: `2px solid ${ink}`,
          marginTop: 2, marginBottom: 4,
        }} />

        {/* Answer area — either filled-in digits or dashed practice lines */}
        {showAnswer ? (
          <div style={{
            display: "grid",
            gridTemplateColumns: `repeat(${totalCols}, ${COL_W}px)`,
            justifyItems: "center",
            alignItems: "center",
            color: ink,
          }}>
            {Array.from({ length: totalCols - answerStr.length }).map((_, i) => (
              <span key={"pad-ans" + i}>&nbsp;</span>
            ))}
            {answerStr.split("").map((d, i) => (
              <span key={"ans" + i} style={{
                ...monoStyle,
                background: soft,
                borderRadius: 4,
                padding: "0 2px",
              }}>{d}</span>
            ))}
          </div>
        ) : (
          <div style={{ width: "100%", flex: 1, position: "relative" }}>
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} style={{
                position: "absolute",
                left: "10%", right: "10%",
                top: `${(i + 1) * 30}%`,
                borderBottom: `1px dashed ${chip}`,
              }} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function ColumnProblemPage({
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
        label={`Stage ${stageFullId} · Column · Page ${pageNumber}${showAnswer ? " · Answers" : ""}`}
        hint={showAnswer
          ? "Filled-in answers match the multiplicand and multiplier above."
          : instructionHint}
      />
      <div style={{
        flex: 1, display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gridTemplateRows: "repeat(4, 1fr)",
        gap: 10, minHeight: 0,
      }}>
        {problems.map((p, i) => (
          <VerticalCell
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

/* Static SVG previews for Algebra Phase 1 (Y0–Y3) levels. Each preview
 * mirrors what a student would see in solveit's practice — pattern
 * sequences, ordinal rows, equation boxes — so the poster matches the
 * platform vocabulary. */
import React from "react";
import {
  PatternRow,
  OrdinalRow,
  AnswerBadge,
  EquationBox,
  TrueFalseBadge,
  CompareBox,
  FigureRow,
  CompareExpressions,
  RuleCards,
  FigureCountRow,
  MiniCoordGrid,
  InputOutputTable,
  OptionRow,
  MultipleChoice,
  InequalityLine,
} from "./AlgebraSvg";

/* ── Frame wrapper — pale-pink card. */
/* Frame — pink card matching YearOps/Rational style. Uses pink-50 bg
 * (lighter than the page's pink-100) and a pink-200 border so the box
 * is clearly visible against the poster background. */
const Frame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    className="rounded-2xl border-2 border-pink-200 bg-pink-50 flex flex-col items-center justify-center p-3 gap-2"
    style={{ minHeight: 148 }}
  >
    {children}
  </div>
);

/* ── Y0 — Patterns & Position ───────────────────────────────────── */

/* Friendly prompt label shown above the visual to mirror solveit's
 * question wording (e.g., "What comes next?"). */
const Prompt: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      fontFamily: "Fredoka, sans-serif",
      fontWeight: 800,
      fontSize: 16,
      color: "#db2777",
      letterSpacing: "0.01em",
    }}
  >
    {children}
  </div>
);

/* 0.1 "Continue the pattern" — prompt above the sequence, no answer. */
const P0_1 = () => (
  <Frame>
    <Prompt>What comes next?</Prompt>
    <PatternRow items={["🍎", "🍌", "🍎", "🍌", "🍎", "🍌", null]} />
  </Frame>
);

/* 0.2 "Continue shapes & colours" — prompt above the sequence. */
const P0_2 = () => (
  <Frame>
    <Prompt>What comes next?</Prompt>
    <PatternRow items={["🔴", "🟡", "🔴", "🟡", "🔴", "🟡", null]} />
  </Frame>
);

/* 0.3 "Find the missing one" — interior blank, prompt above. */
const P0_3 = () => (
  <Frame>
    <Prompt>What is missing?</Prompt>
    <PatternRow items={["🐱", "🐶", null, "🐶", "🐱", "🐶"]} />
  </Frame>
);

/* 0.4 "Which one is …th?" — 5 items, highlight the 4th. */
const P0_4 = () => (
  <Frame>
    <OrdinalRow
      items={["🍎", "⭐", "🐱", "🚗", "🌙"]}
      highlightIndex={3}
    />
    <AnswerBadge label="4th is" answer="🚗" />
  </Frame>
);

/* ── Y1 — Patterns & Equations ──────────────────────────────────── */

/* 1.1 "Continue the pattern" (3 elements mixed). */
const P1_1 = () => (
  <Frame>
    <PatternRow items={["🐱", "🐶", "⭐", "🐱", "🐶", "⭐", null]} />
    <AnswerBadge label="Next is" answer="🐱" />
  </Frame>
);

/* 1.2 "Find the missing element" (3 elements mixed). */
const P1_2 = () => (
  <Frame>
    <PatternRow items={["🐱", null, "⭐", "🐱", "🐶", "⭐"]} />
    <AnswerBadge label="Missing:" answer="🐶" />
  </Frame>
);

/* 1.3 "Find the missing number" (+ / −, one-digit). */
const P1_3 = () => (
  <Frame>
    <EquationBox text="3 + ? = 7" />
    <AnswerBadge label="? =" answer="4" />
  </Frame>
);

/* 1.4 "Balance — addition" (a + b = c + ?). */
const P1_4 = () => (
  <Frame>
    <EquationBox text="2 + 5 = 3 + ?" />
    <AnswerBadge label="? =" answer="4" />
  </Frame>
);

/* 1.5 "Balance — subtraction" (a − b = c − ?). */
const P1_5 = () => (
  <Frame>
    <EquationBox text="7 − 2 = 6 − ?" />
    <AnswerBadge label="? =" answer="1" />
  </Frame>
);

/* 1.6 "True or False?" (+ / −, one-digit). */
const P1_6 = () => (
  <Frame>
    <TrueFalseBadge equation="4 + 3 = 7" isTrue />
    <TrueFalseBadge equation="5 + 1 = 7" isTrue={false} />
  </Frame>
);

/* ── Y2 — Compare, Operations & Patterns ────────────────────────── */

/* 2.1 "Compare with >, < or =". */
const P2_1 = () => (
  <Frame>
    <CompareBox a={12} b={15} />
    <AnswerBadge label="? =" answer="<" />
  </Frame>
);

/* 2.2 "True or False? (compare)". */
const P2_2 = () => (
  <Frame>
    <TrueFalseBadge equation="12 > 15" isTrue={false} />
    <TrueFalseBadge equation="20 < 35" isTrue />
  </Frame>
);

/* 2.3 "Find the missing number (× ÷)". */
const P2_3 = () => (
  <Frame>
    <EquationBox text="4 × ? = 12" />
    <AnswerBadge label="? =" answer="3" />
  </Frame>
);

/* 2.4 "Open number sentence" (mixed operations). */
const P2_4 = () => (
  <Frame>
    <EquationBox text="3 × 4 = 6 + ?" />
    <AnswerBadge label="? =" answer="6" />
  </Frame>
);

/* 2.5 "True or False? (any operation)". */
const P2_5 = () => (
  <Frame>
    <TrueFalseBadge equation="4 × 3 = 7 + 5" isTrue />
    <TrueFalseBadge equation="6 × 2 = 18 − 4" isTrue={false} />
  </Frame>
);

/* 2.6 "Find the pattern's place" — 3-unit repeat, ask the 8th. */
const P2_6 = () => (
  <Frame>
    <PatternRow items={["🍎", "🍌", "🐱", "🍎", "🍌", "🐱", "🍎", null]} />
    <AnswerBadge label="8th is" answer="🍌" />
  </Frame>
);

/* ── Y3 — Bigger Numbers & Growing Patterns ─────────────────────── */

/* 3.1 "True or False? (compare big numbers)". */
const P3_1 = () => (
  <Frame>
    <TrueFalseBadge equation="124 < 235" isTrue />
    <TrueFalseBadge equation="780 > 950" isTrue={false} />
  </Frame>
);

/* 3.2 "Find the missing number (bigger numbers)". */
const P3_2 = () => (
  <Frame>
    <EquationBox text="450 − ? = 200" />
    <AnswerBadge label="? =" answer="250" />
  </Frame>
);

/* 3.3 "True or False? (any operations)". */
const P3_3 = () => (
  <Frame>
    <TrueFalseBadge equation="4 × 6 = 12 + 12" isTrue />
    <TrueFalseBadge equation="20 ÷ 4 = 3 × 2" isTrue={false} />
  </Frame>
);

/* 3.4 "Continue the growing pattern" — 3, 5, 7, 9, ?. */
const P3_4 = () => (
  <Frame>
    <PatternRow items={["3", "5", "7", "9", null]} cellSize={30} gap={6} />
    <AnswerBadge label="Next is" answer="11" />
  </Frame>
);

/* 3.5 "Missing number in a growing pattern" — 3, _, 7, 9, 11. */
const P3_5 = () => (
  <Frame>
    <PatternRow items={["3", null, "7", "9", "11"]} cellSize={30} gap={6} />
    <AnswerBadge label="Missing:" answer="5" />
  </Frame>
);

/* ── Y4 — Large Numbers & Growing Patterns ─────────────────────── */

/* 4.1 "True or False? (+ −)" — 4-digit additions/subtractions. */
const P4_1 = () => (
  <Frame>
    <TrueFalseBadge equation="3450 + 2100 = 5550" isTrue />
    <TrueFalseBadge equation="6800 − 1200 = 5700" isTrue={false} />
  </Frame>
);

/* 4.2 "Find the missing number (+ −)" — 4-digit. */
const P4_2 = () => (
  <Frame>
    <EquationBox text="3450 − ? = 2100" />
    <AnswerBadge label="? =" answer="1350" />
  </Frame>
);

/* 4.3 "True or False? (× ÷)" — 2-12 factors. */
const P4_3 = () => (
  <Frame>
    <TrueFalseBadge equation="12 × 7 = 84" isTrue />
    <TrueFalseBadge equation="8 × 9 = 80" isTrue={false} />
  </Frame>
);

/* 4.4 "Find the missing number (× ÷)". */
const P4_4 = () => (
  <Frame>
    <EquationBox text="12 × ? = 96" />
    <AnswerBadge label="? =" answer="8" />
  </Frame>
);

/* 4.5 "Continue the growing pattern" (arithmetic, larger step). */
const P4_5 = () => (
  <Frame>
    <PatternRow items={["4", "7", "10", "13", null]} cellSize={30} gap={6} />
    <AnswerBadge label="Next is" answer="16" />
  </Frame>
);

/* 4.6 "Geometric growing pattern" (×2 or ×3). */
const P4_6 = () => (
  <Frame>
    <PatternRow items={["2", "4", "8", "16", null]} cellSize={30} gap={6} />
    <AnswerBadge label="Next is" answer="32" />
    <div style={{ fontFamily: "Fredoka", fontWeight: 700, fontSize: 11, color: "#6b7280" }}>
      doubles each time (× 2)
    </div>
  </Frame>
);

/* 4.7 "Growing figure pattern" — matchstick-squares family.
 *      The pink figure on the right IS the answer; a small caption below
 *      makes the connection explicit without crowding. */
const P4_7 = () => (
  <Frame>
    <FigureRow shownNs={[1, 2, 3]} answerN={4} />
    <div style={{ fontFamily: "Fredoka", fontWeight: 700, fontSize: 11, color: "#6b7280" }}>
      4 connected squares
    </div>
  </Frame>
);

/* ── Y5 — Comparing Expressions & Decimal Patterns ─────────────── */

/* 5.1 "Compare expressions (+ −)". */
const P5_1 = () => (
  <Frame>
    <CompareExpressions lhs="34,500 + 12,000" rhs="46,000 + 1,000" />
    <AnswerBadge label="? =" answer="<" />
  </Frame>
);

/* 5.2 "Compare expressions (×)". */
const P5_2 = () => (
  <Frame>
    <CompareExpressions lhs="3 × 8" rhs="4 × 6" />
    <AnswerBadge label="? =" answer="=" />
  </Frame>
);

/* 5.3 "True or False? (large numbers)" — 6-digit. */
const P5_3 = () => (
  <Frame>
    <TrueFalseBadge equation="234,567 + 100,000 = 334,567" isTrue size={16} />
    <TrueFalseBadge equation="789,000 − 300,000 = 590,000" isTrue={false} size={16} />
  </Frame>
);

/* 5.4 "Find the missing number" — 6-digit. */
const P5_4 = () => (
  <Frame>
    <EquationBox text="450,000 − ? = 200,000" size={18} />
    <AnswerBadge label="? =" answer="250,000" />
  </Frame>
);

/* 5.5 "Growing pattern (decimals)". */
const P5_5 = () => (
  <Frame>
    <PatternRow items={["3", "4.5", "6", "7.5", null]} cellSize={34} gap={6} />
    <AnswerBadge label="Next is" answer="9" />
    <div style={{ fontFamily: "Fredoka", fontWeight: 700, fontSize: 11, color: "#6b7280" }}>
      add 1.5 each time
    </div>
  </Frame>
);

/* ── Y6 — Order of Operations, Rules & Coordinate Plane ────────── */

/* 6.1 "True or False? (order of operations)". */
const P6_1 = () => (
  <Frame>
    <TrueFalseBadge equation="2 + 3 × 4 ≤ 14" isTrue />
    <TrueFalseBadge equation="3² + 5 > 16" isTrue={false} />
  </Frame>
);

/* 6.2 "Find the missing number (order of operations)". */
const P6_2 = () => (
  <Frame>
    <EquationBox text="5 × 8 = 5 × 3 + ?" />
    <AnswerBadge label="? =" answer="25" />
  </Frame>
);

/* 6.3 "Find the rule". */
const P6_3 = () => (
  <Frame>
    <RuleCards
      sequence="2, 5, 8, 11, …"
      options={[
        { text: "add 3", correct: true },
        { text: "add 5" },
        { text: "times 2" },
      ]}
    />
  </Frame>
);

/* 6.4 "How many in the next figure?" — dots-square family. */
const P6_4 = () => (
  <Frame>
    <FigureCountRow shownNs={[1, 2, 3]} answerN={4} />
    <AnswerBadge label="How many?" answer="16" />
  </Frame>
);

/* 6.5 "Read the coordinates". */
const P6_5 = () => (
  <Frame>
    <MiniCoordGrid point={{ x: 3, y: 2 }} />
    <AnswerBadge label="Point =" answer="(3, 2)" />
  </Frame>
);

/* 6.6 "Plot the point" — Plot (4, 5). */
const P6_6 = () => (
  <Frame>
    <Prompt>Plot (4, 5)</Prompt>
    <MiniCoordGrid point={{ x: 4, y: 5 }} />
  </Frame>
);

/* 6.7 "Table rule, then plot" — y = x + 2, x=4 → (4, 6). */
const P6_7 = () => (
  <Frame>
    <div style={{ display: "inline-flex", alignItems: "center", gap: 14 }}>
      <InputOutputTable
        rows={[
          { x: 1, y: 3 },
          { x: 2, y: 4 },
          { x: 3, y: 5 },
        ]}
        rule="y = x + 2"
      />
      <MiniCoordGrid point={{ x: 4, y: 6 }} cellSize={14} />
    </div>
    <AnswerBadge label="x = 4 →" answer="(4, 6)" />
  </Frame>
);

/* ── Y7 — Variables, Equations & Coordinates ────────────────────── */

/* 7.1 "Solve a one-step equation". */
const P7_1 = () => (
  <Frame>
    <EquationBox text="x + 7 = 12" />
    <AnswerBadge label="x =" answer="5" />
  </Frame>
);

/* 7.2 "Solve a two-step equation". */
const P7_2 = () => (
  <Frame>
    <EquationBox text="3x + 5 = 14" />
    <AnswerBadge label="x =" answer="3" />
  </Frame>
);

/* 7.3 "Substitution" — Find 3x + 4 when x = 5. */
const P7_3 = () => (
  <Frame>
    <div style={{ fontFamily: "Fredoka", fontWeight: 800, fontSize: 16, color: "#1f2937" }}>
      Find <span style={{ color: "#db2777" }}>3x + 4</span> when x = 5
    </div>
    <AnswerBadge label="=" answer="19" />
  </Frame>
);

/* 7.4 "Collect like terms" — 2x + x + x → 4x. */
const P7_4 = () => (
  <Frame>
    <MultipleChoice
      prompt="Simplify"
      expression="2x + x + x"
      options={[
        { text: "4x", correct: true },
        { text: "3x" },
        { text: "5x" },
      ]}
    />
  </Frame>
);

/* 7.5 "Rearrange a formula" — Make w the subject of A = lw. */
const P7_5 = () => (
  <Frame>
    <MultipleChoice
      prompt="Make w the subject"
      expression="A = lw"
      options={[
        { text: "w = A ÷ l", correct: true },
        { text: "w = A × l" },
        { text: "w = l ÷ A" },
      ]}
    />
  </Frame>
);

/* 7.6 "Plot in the four quadrants" — point at (−3, 4). */
const P7_6 = () => (
  <Frame>
    <Prompt>Plot (−3, 4)</Prompt>
    <MiniCoordGrid point={{ x: -3, y: 4 }} gridMin={-6} gridMax={6} cellSize={11} />
  </Frame>
);

/* 7.7 "Find the linear rule". */
const P7_7 = () => (
  <Frame>
    <MultipleChoice
      prompt="What is the rule?"
      expression="5, 8, 11, 14, …"
      options={[
        { text: "t = 3n + 2", correct: true },
        { text: "t = 4n + 1" },
        { text: "t = 2n + 3" },
      ]}
    />
  </Frame>
);

/* 7.8 "True or False? (operations & inequalities)" — same generator as Y6·1. */
const P7_8 = () => (
  <Frame>
    <TrueFalseBadge equation="2 + 3 × 4 ≤ 14" isTrue />
    <TrueFalseBadge equation="3² + 5 > 16" isTrue={false} />
  </Frame>
);

/* ── Y8 — Advanced Algebra ──────────────────────────────────────── */

/* 8.1 "Solve equation (rational answer)". */
const P8_1 = () => (
  <Frame>
    <EquationBox text="x + 3 = 5.5" />
    <AnswerBadge label="x =" answer="2.5" />
  </Frame>
);

/* 8.2 "Solve equation (negative answer)". */
const P8_2 = () => (
  <Frame>
    <EquationBox text="x + 7 = 2" />
    <AnswerBadge label="x =" answer="−5" />
  </Frame>
);

/* 8.3 "Solve an inequality" — t − 2 ≥ −1 → t ≥ 1. */
const P8_3 = () => (
  <Frame>
    <EquationBox text="t − 2 ≥ −1" />
    <div style={{ fontFamily: "Fredoka", fontWeight: 700, fontSize: 11, color: "#6b7280" }}>
      so t ≥ 1
    </div>
    <InequalityLine boundary={1} dir="≥" min={-4} max={6} width={240} />
  </Frame>
);

/* 8.4 "Expand and simplify" — 2(x + 3) + 4 → 2x + 10. */
const P8_4 = () => (
  <Frame>
    <MultipleChoice
      prompt="Expand and simplify"
      expression="2(x + 3) + 4"
      options={[
        { text: "2x + 10", correct: true },
        { text: "2x + 7" },
        { text: "3x + 10" },
      ]}
    />
  </Frame>
);

/* 8.5 "Factorise" — 2x + 6 → 2(x + 3). */
const P8_5 = () => (
  <Frame>
    <MultipleChoice
      prompt="Factorise"
      expression="2x + 6"
      options={[
        { text: "2(x + 3)", correct: true },
        { text: "2(x + 6)" },
        { text: "3(x + 2)" },
      ]}
    />
  </Frame>
);

/* 8.6 "Substitution (with negatives)" — Find 3x + 4 when x = (−5). */
const P8_6 = () => (
  <Frame>
    <div style={{ fontFamily: "Fredoka", fontWeight: 800, fontSize: 16, color: "#1f2937" }}>
      Find <span style={{ color: "#db2777" }}>3x + 4</span> when x = (−5)
    </div>
    <AnswerBadge label="=" answer="−11" />
  </Frame>
);

/* 8.7 "Square, triangular & cube numbers" — square pattern. */
const P8_7 = () => (
  <Frame>
    <PatternRow items={["1", "4", "9", null]} cellSize={30} gap={6} />
    <AnswerBadge label="Next is" answer="16" />
    <div style={{ fontFamily: "Fredoka", fontWeight: 700, fontSize: 11, color: "#6b7280" }}>
      square numbers (n × n)
    </div>
  </Frame>
);

/* 8.8 "Rearrange a formula (two steps)" — Make x of y = mx + c. */
const P8_8 = () => (
  <Frame>
    <MultipleChoice
      prompt="Make x the subject"
      expression="y = mx + c"
      options={[
        { text: "x = (y − c) ÷ m", correct: true },
        { text: "x = (y + c) ÷ m" },
        { text: "x = y − c ÷ m" },
      ]}
    />
  </Frame>
);

const MAP: Record<string, React.FC> = {
  "0.1": P0_1,
  "0.2": P0_2,
  "0.3": P0_3,
  "0.4": P0_4,
  "1.1": P1_1,
  "1.2": P1_2,
  "1.3": P1_3,
  "1.4": P1_4,
  "1.5": P1_5,
  "1.6": P1_6,
  "2.1": P2_1,
  "2.2": P2_2,
  "2.3": P2_3,
  "2.4": P2_4,
  "2.5": P2_5,
  "2.6": P2_6,
  "3.1": P3_1,
  "3.2": P3_2,
  "3.3": P3_3,
  "3.4": P3_4,
  "3.5": P3_5,
  "4.1": P4_1,
  "4.2": P4_2,
  "4.3": P4_3,
  "4.4": P4_4,
  "4.5": P4_5,
  "4.6": P4_6,
  "4.7": P4_7,
  "5.1": P5_1,
  "5.2": P5_2,
  "5.3": P5_3,
  "5.4": P5_4,
  "5.5": P5_5,
  "6.1": P6_1,
  "6.2": P6_2,
  "6.3": P6_3,
  "6.4": P6_4,
  "6.5": P6_5,
  "6.6": P6_6,
  "6.7": P6_7,
  "7.1": P7_1,
  "7.2": P7_2,
  "7.3": P7_3,
  "7.4": P7_4,
  "7.5": P7_5,
  "7.6": P7_6,
  "7.7": P7_7,
  "7.8": P7_8,
  "8.1": P8_1,
  "8.2": P8_2,
  "8.3": P8_3,
  "8.4": P8_4,
  "8.5": P8_5,
  "8.6": P8_6,
  "8.7": P8_7,
  "8.8": P8_8,
};

export const HAS_ALGEBRA_PREVIEW = new Set(Object.keys(MAP));

export default function AlgebraExercisePreview({ code }: { code: string }) {
  const Component = MAP[code];
  if (!Component) return null;
  return <Component />;
}

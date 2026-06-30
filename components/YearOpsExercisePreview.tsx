/* Year Operations Year 1 — exercise previews.
 *
 * Skill codes 1.1–1.18 mirror solveit Year 1 (Y0–Y3 phase). Themes:
 *   1.1–1.6  single-digit addition pairs (1+ through 9+)
 *   1.7      number bonds to 10 (make 10)
 *   1.8      doubles to 10
 *   1.9      subtract within 10
 *   1.10     10 + single (teen formation)
 *   1.11     bridging 10 (sums 11–18)
 *   1.12     teen + single ≤ 20
 *   1.13–14  subtract from teen (no borrow / with borrow)
 *   1.15     mixed +/− within 20
 *   1.16–18  equal groups, equal share, halves
 *
 * Codes overlap with Rational/DecimalPv so this MAP is kept separate
 * and resolved through HAS_YEAR_OPS_PREVIEW + YearOpsSectionBlock. */
import React from "react";
import {
  PINK_DEEP,
  PINK_MID,
  PINK_SOFT,
  INK,
  MUTED,
  TenFrame,
  GroupShare,
  Caption,
  PVBlocks,
  ColumnMini,
  SkipCount,
  DotArray,
  TenthsStrip,
  DecimalGrid,
  ThousandthsBar,
  PercentBar,
  FractionLabel,
  IntegerNumberLine,
  BarFraction,
  PieFraction,
  RatioBar,
  MixedNumberVis,
  LCDFractions,
  FractionMultGrid,
  SimplifyArrow,
} from "./RationalSvg";

const AMBER = "#fbbf24";
const AMBER_DEEP = "#d97706";

/* ── frame wrapper — pale-pink card matching the rest of the YearOps poster. */
const Frame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    className="rounded-2xl border-2 border-pink-200 bg-pink-50 flex items-center justify-center p-3"
    style={{ minHeight: 148 }}
  >
    {children}
  </div>
);

/* ── inline "a op b = result" equation. */
const Eq: React.FC<{
  a: React.ReactNode;
  b: React.ReactNode;
  op: string;
  result: React.ReactNode;
  size?: number;
}> = ({ a, b, op, result, size = 22 }) => (
  <div
    className="font-fredoka font-bold flex items-baseline gap-2 justify-center"
    style={{ fontSize: size, color: INK }}
  >
    <span style={{ color: PINK_DEEP }}>{a}</span>
    <span style={{ color: MUTED }}>{op}</span>
    <span style={{ color: AMBER_DEEP }}>{b}</span>
    <span style={{ color: MUTED }}>=</span>
    <span style={{ color: PINK_DEEP }}>{result}</span>
  </div>
);

/* ── Y0 — Addition & Subtraction within 5 ──────────────────────── */

/* Small ten-frame helper for Y0 (only first row used, since totals ≤ 5). */
const FiveFrame: React.FC<{
  groupA: number;
  groupB?: number;
  crossed?: number; // crosses out last N of groupA
  cellSize?: number;
}> = ({ groupA, groupB = 0, crossed = 0, cellSize = 26 }) => {
  const cells = 5;
  const w = cellSize * cells + 2;
  const h = cellSize + 2;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      {Array.from({ length: cells }, (_, i) => {
        const x = 1 + i * cellSize;
        const y = 1;
        const isA = i < groupA;
        const isB = !isA && i < groupA + groupB;
        const isCrossed = isA && i >= groupA - crossed;
        return (
          <g key={i}>
            <rect
              x={x} y={y}
              width={cellSize} height={cellSize}
              fill="#fff" stroke={PINK_DEEP} strokeWidth={1.5}
            />
            {(isA || isB) && (
              <circle
                cx={x + cellSize / 2}
                cy={y + cellSize / 2}
                r={cellSize * 0.34}
                fill={isA ? PINK_MID : AMBER}
                stroke={PINK_DEEP}
                strokeWidth={1.2}
              />
            )}
            {isCrossed && (
              <g stroke={INK} strokeWidth={2} strokeLinecap="round">
                <line x1={x + 5} y1={y + 5} x2={x + cellSize - 5} y2={y + cellSize - 5} />
                <line x1={x + cellSize - 5} y1={y + 5} x2={x + 5} y2={y + cellSize - 5} />
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
};

/* ── 0.1 "Addition: sums to 3": 1 + 2 = 3. */
const P0_1 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <FiveFrame groupA={1} groupB={2} cellSize={24} />
      <Eq a={1} op="+" b={2} result={3} />
    </div>
  </Frame>
);

/* ── 0.2 "Addition: sums to 5": 3 + 2 = 5. */
const P0_2 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <FiveFrame groupA={3} groupB={2} cellSize={24} />
      <Eq a={3} op="+" b={2} result={5} />
    </div>
  </Frame>
);

/* ── 0.3 "Subtraction within 3": 3 − 1 = 2. */
const P0_3 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <FiveFrame groupA={3} crossed={1} cellSize={24} />
      <Eq a={3} op="−" b={1} result={2} />
    </div>
  </Frame>
);

/* ── 0.4 "Subtraction within 5": 5 − 2 = 3. */
const P0_4 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <FiveFrame groupA={5} crossed={2} cellSize={24} />
      <Eq a={5} op="−" b={2} result={3} />
    </div>
  </Frame>
);

/* ── 0.5 "Mixed + and − within 5": two stacked equations. */
const P0_5 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <Eq a={2} op="+" b={3} result={5} />
      <Eq a={4} op="−" b={1} result={3} />
    </div>
  </Frame>
);

/* ── Y1 — Facts to 10 & Extending to 20 ──────────────────────────── */

/* ── 1.1 "1–4 + single digit": 3 + 4 = 7 (ten-frame with two colours). */
const P1_1 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <TenFrame groupA={3} groupB={4} cellSize={22} />
      <Eq a={3} op="+" b={4} result={7} />
    </div>
  </Frame>
);

/* ── 1.2 "5 + single digit": 5 + 3 = 8. */
const P1_2 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <TenFrame groupA={5} groupB={3} cellSize={22} />
      <Eq a={5} op="+" b={3} result={8} />
    </div>
  </Frame>
);

/* ── 1.3 "6 + single digit": 6 + 2 = 8. */
const P1_3 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <TenFrame groupA={6} groupB={2} cellSize={22} />
      <Eq a={6} op="+" b={2} result={8} />
    </div>
  </Frame>
);

/* ── 1.4 "7 + single digit": 7 + 2 = 9. */
const P1_4 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <TenFrame groupA={7} groupB={2} cellSize={22} />
      <Eq a={7} op="+" b={2} result={9} />
    </div>
  </Frame>
);

/* ── 1.5 "8 + single digit": 8 + 2 = 10 (frame full). */
const P1_5 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <TenFrame groupA={8} groupB={2} cellSize={22} />
      <Eq a={8} op="+" b={2} result={10} />
    </div>
  </Frame>
);

/* ── 1.6 "9 + single digit": 9 + 1 = 10. */
const P1_6 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <TenFrame groupA={9} groupB={1} cellSize={22} />
      <Eq a={9} op="+" b={1} result={10} />
    </div>
  </Frame>
);

/* ── 1.7 "Make 10 (number bonds)": pair 6 + 4 = 10. */
const P1_7 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <TenFrame groupA={6} groupB={4} cellSize={22} />
      <Eq a={6} op="+" b={4} result={10} />
    </div>
  </Frame>
);

/* ── 1.8 "Doubles to 10": 4 + 4 = 8 across two ten-frames. */
const P1_8 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        <TenFrame groupA={4} cellSize={18} />
        <span
          className="font-fredoka font-bold"
          style={{ fontSize: 22, color: MUTED }}
        >
          +
        </span>
        <TenFrame groupA={4} cellSize={18} fillA={AMBER} />
      </div>
      <Eq a={4} op="+" b={4} result={8} />
    </div>
  </Frame>
);

/* ── 1.9 "Subtract within 10": 8 − 3 = 5 (three dots crossed). */
const P1_9 = () => {
  const cellSize = 22;
  const w = cellSize * 5 + 2;
  const h = cellSize * 2 + 2;
  return (
    <Frame>
      <div className="flex flex-col items-center gap-2">
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
          {Array.from({ length: 10 }, (_, i) => {
            const col = i % 5;
            const row = Math.floor(i / 5);
            const x = 1 + col * cellSize;
            const y = 1 + row * cellSize;
            const isFilled = i < 8;
            const isCrossed = i >= 5 && i < 8; // last 3 of the 8
            return (
              <g key={i}>
                <rect
                  x={x} y={y}
                  width={cellSize} height={cellSize}
                  fill="#fff" stroke={PINK_DEEP} strokeWidth={1.5}
                />
                {isFilled && (
                  <circle
                    cx={x + cellSize / 2}
                    cy={y + cellSize / 2}
                    r={cellSize * 0.34}
                    fill={PINK_MID}
                    stroke={PINK_DEEP}
                    strokeWidth={1.2}
                  />
                )}
                {isCrossed && (
                  <g stroke={INK} strokeWidth={2} strokeLinecap="round">
                    <line
                      x1={x + 5} y1={y + 5}
                      x2={x + cellSize - 5} y2={y + cellSize - 5}
                    />
                    <line
                      x1={x + cellSize - 5} y1={y + 5}
                      x2={x + 5} y2={y + cellSize - 5}
                    />
                  </g>
                )}
              </g>
            );
          })}
        </svg>
        <Eq a={8} op="−" b={3} result={5} />
      </div>
    </Frame>
  );
};

/* ── 1.10 "10 + single digit": full frame + 3 loose dots = 13. */
const P1_10 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-3">
        <TenFrame groupA={10} cellSize={18} />
        <span
          className="font-fredoka font-bold"
          style={{ fontSize: 22, color: MUTED }}
        >
          +
        </span>
        <svg width={60} height={36} viewBox="0 0 60 36">
          {[0, 1, 2].map((i) => (
            <circle
              key={i}
              cx={12 + i * 18}
              cy={18}
              r={8}
              fill={AMBER}
              stroke={AMBER_DEEP}
              strokeWidth={1.4}
            />
          ))}
        </svg>
      </div>
      <Eq a={10} op="+" b={3} result={13} />
    </div>
  </Frame>
);

/* ── 1.11 "Bridging 10": 8 + 5 = 8 + 2 + 3 = 13. Two ten-frames. */
const P1_11 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        <TenFrame groupA={8} groupB={2} cellSize={18} />
        <span
          className="font-fredoka font-bold"
          style={{ fontSize: 20, color: MUTED }}
        >
          +
        </span>
        <svg width={62} height={36} viewBox="0 0 62 36">
          {[0, 1, 2].map((i) => (
            <circle
              key={i}
              cx={12 + i * 18}
              cy={18}
              r={8}
              fill={AMBER}
              stroke={AMBER_DEEP}
              strokeWidth={1.4}
            />
          ))}
        </svg>
      </div>
      <Caption>8 + 2 = 10, then + 3 = 13</Caption>
      <Eq a={8} op="+" b={5} result={13} size={20} />
    </div>
  </Frame>
);

/* ── 1.12 "Teen + single digit ≤ 20": 13 + 4 = 17. */
const P1_12 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        <TenFrame groupA={10} cellSize={16} />
        <svg width={56} height={32} viewBox="0 0 56 32">
          {[0, 1, 2].map((i) => (
            <circle
              key={i}
              cx={10 + i * 16}
              cy={16}
              r={7}
              fill={PINK_MID}
              stroke={PINK_DEEP}
              strokeWidth={1.2}
            />
          ))}
        </svg>
        <span
          className="font-fredoka font-bold"
          style={{ fontSize: 18, color: MUTED }}
        >
          +
        </span>
        <svg width={72} height={32} viewBox="0 0 72 32">
          {[0, 1, 2, 3].map((i) => (
            <circle
              key={i}
              cx={10 + i * 16}
              cy={16}
              r={7}
              fill={AMBER}
              stroke={AMBER_DEEP}
              strokeWidth={1.2}
            />
          ))}
        </svg>
      </div>
      <Eq a={13} op="+" b={4} result={17} />
    </div>
  </Frame>
);

/* ── 1.13 "Subtract from teen, no borrowing": 16 − 4 = 12. */
const P1_13 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        <TenFrame groupA={10} cellSize={16} />
        <svg width={108} height={32} viewBox="0 0 108 32">
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const cross = i >= 2; // first 2 stay, last 4 are crossed
            return (
              <g key={i}>
                <circle
                  cx={10 + i * 16}
                  cy={16}
                  r={7}
                  fill={PINK_MID}
                  stroke={PINK_DEEP}
                  strokeWidth={1.2}
                />
                {cross && (
                  <g stroke={INK} strokeWidth={1.8} strokeLinecap="round">
                    <line
                      x1={10 + i * 16 - 5} y1={11}
                      x2={10 + i * 16 + 5} y2={21}
                    />
                    <line
                      x1={10 + i * 16 + 5} y1={11}
                      x2={10 + i * 16 - 5} y2={21}
                    />
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>
      <Eq a={16} op="−" b={4} result={12} />
    </div>
  </Frame>
);

/* ── 1.14 "Subtract from teen, WITH borrowing": 15 − 7 = 8.
 *      Cross all 5 ones, then 2 more from the ten-frame. */
const P1_14 = () => {
  const cellSize = 16;
  const w = cellSize * 5 + 2;
  const h = cellSize * 2 + 2;
  return (
    <Frame>
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
            {Array.from({ length: 10 }, (_, i) => {
              const col = i % 5;
              const row = Math.floor(i / 5);
              const x = 1 + col * cellSize;
              const y = 1 + row * cellSize;
              // Cross 2 cells in the ten (after taking 5 from ones)
              const cross = i === 8 || i === 9;
              return (
                <g key={i}>
                  <rect
                    x={x} y={y}
                    width={cellSize} height={cellSize}
                    fill="#fff" stroke={PINK_DEEP} strokeWidth={1.3}
                  />
                  <circle
                    cx={x + cellSize / 2}
                    cy={y + cellSize / 2}
                    r={cellSize * 0.32}
                    fill={PINK_MID}
                    stroke={PINK_DEEP}
                    strokeWidth={1}
                  />
                  {cross && (
                    <g stroke={INK} strokeWidth={1.6} strokeLinecap="round">
                      <line x1={x + 3} y1={y + 3} x2={x + cellSize - 3} y2={y + cellSize - 3} />
                      <line x1={x + cellSize - 3} y1={y + 3} x2={x + 3} y2={y + cellSize - 3} />
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
          <svg width={92} height={32} viewBox="0 0 92 32">
            {[0, 1, 2, 3, 4].map((i) => (
              <g key={i}>
                <circle
                  cx={10 + i * 16}
                  cy={16}
                  r={7}
                  fill={PINK_MID}
                  stroke={PINK_DEEP}
                  strokeWidth={1.2}
                />
                <g stroke={INK} strokeWidth={1.6} strokeLinecap="round">
                  <line x1={10 + i * 16 - 5} y1={11} x2={10 + i * 16 + 5} y2={21} />
                  <line x1={10 + i * 16 + 5} y1={11} x2={10 + i * 16 - 5} y2={21} />
                </g>
              </g>
            ))}
          </svg>
        </div>
        <Caption>take 5 ones, then 2 more from ten</Caption>
        <Eq a={15} op="−" b={7} result={8} size={20} />
      </div>
    </Frame>
  );
};

/* ── 1.15 "Mixed +/− within 20": two stacked examples. */
const P1_15 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <Eq a={14} op="+" b={5} result={19} />
      <Eq a={18} op="−" b={6} result={12} />
    </div>
  </Frame>
);

/* ── 1.16 "Equal groups (multiplication)": 3 groups of 4 = 12. */
const P1_16 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <GroupShare total={12} groups={3} boxed />
      <Eq a={3} op="×" b={4} result={12} />
    </div>
  </Frame>
);

/* ── 1.17 "Equal sharing (division)": 12 ÷ 3 = 4 each. */
const P1_17 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <GroupShare total={12} groups={3} boxed />
      <Eq a={12} op="÷" b={3} result={4} />
    </div>
  </Frame>
);

/* ── 1.18 "Halves to 10": 8 ÷ 2 = 4 (two equal piles). */
const P1_18 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <GroupShare total={8} groups={2} boxed />
      <Eq a={8} op="÷" b={2} result={4} />
    </div>
  </Frame>
);

/* ── Y2 — Two-digit ops & 2s/5s/10s tables ───────────────────────── */

/* 2.1 "Doubles to 20": 8 + 8 = 16 (two ten-frames). */
const P2_1 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        <TenFrame groupA={8} cellSize={16} />
        <span className="font-fredoka font-bold" style={{ fontSize: 18, color: MUTED }}>+</span>
        <TenFrame groupA={8} cellSize={16} fillA="#fbbf24" />
      </div>
      <Eq a={8} op="+" b={8} result={16} />
    </div>
  </Frame>
);

/* 2.2 "Add one-digit to multiple of 10": 30 + 5 = 35. */
const P2_2 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <PVBlocks tens={3} ones={5} />
      <Eq a={30} op="+" b={5} result={35} />
    </div>
  </Frame>
);

/* 2.3 "Add multiples of 10": 40 + 30 = 70. */
const P2_3 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        <PVBlocks tens={4} unit={6} />
        <span className="font-fredoka font-bold" style={{ fontSize: 16, color: MUTED }}>+</span>
        <PVBlocks tens={3} unit={6} colorT="#fde68a" />
      </div>
      <Eq a={40} op="+" b={30} result={70} />
    </div>
  </Frame>
);

/* 2.4 "2d + 1d, no renaming": 24 + 3 = 27. */
const P2_4 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <PVBlocks tens={2} ones={7} />
      <Eq a={24} op="+" b={3} result={27} />
    </div>
  </Frame>
);

/* 2.5 "2d − 1d, no borrowing": 27 − 3 = 24. */
const P2_5 = () => (
  <Frame>
    <ColumnMini a="27" b="3" result="24" op="−" />
  </Frame>
);

/* 2.6 "2d + 1d WITH renaming": 28 + 5 = 33. */
const P2_6 = () => (
  <Frame>
    <ColumnMini a="28" b="5" result="33" op="+" carries="1 " />
  </Frame>
);

/* 2.7 "2d − 1d WITH borrowing": 32 − 5 = 27. */
const P2_7 = () => (
  <Frame>
    <ColumnMini a="32" b="5" result="27" op="−" borrows="2  " />
  </Frame>
);

/* 2.8 "Two 2-digit +, no renaming": 24 + 13 = 37. */
const P2_8 = () => (
  <Frame>
    <ColumnMini a="24" b="13" result="37" op="+" />
  </Frame>
);

/* 2.9 "Two 2-digit −, no borrowing": 47 − 12 = 35. */
const P2_9 = () => (
  <Frame>
    <ColumnMini a="47" b="12" result="35" op="−" />
  </Frame>
);

/* 2.10 "Two 2-digit + WITH renaming": 28 + 15 = 43. */
const P2_10 = () => (
  <Frame>
    <ColumnMini a="28" b="15" result="43" op="+" carries="1 " />
  </Frame>
);

/* 2.11 "Two 2-digit − WITH borrowing": 52 − 18 = 34. */
const P2_11 = () => (
  <Frame>
    <ColumnMini a="52" b="18" result="34" op="−" borrows="4  " />
  </Frame>
);

/* 2.12 "Adding 3 one-digit numbers": 4 + 5 + 3 = 12. */
const P2_12 = () => (
  <Frame>
    <div
      className="font-fredoka font-bold flex items-baseline gap-2 justify-center"
      style={{ fontSize: 24, color: INK }}
    >
      <span style={{ color: PINK_DEEP }}>4</span>
      <span style={{ color: MUTED }}>+</span>
      <span style={{ color: "#d97706" }}>5</span>
      <span style={{ color: MUTED }}>+</span>
      <span style={{ color: PINK_MID }}>3</span>
      <span style={{ color: MUTED }}>=</span>
      <span style={{ color: PINK_DEEP }}>12</span>
    </div>
  </Frame>
);

/* 2.13 "Times tables 2/5/10": 5 × 3 = 15 (skip-count by 5). */
const P2_13 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <SkipCount step={5} jumps={3} width={260} />
      <Eq a={5} op="×" b={3} result={15} />
    </div>
  </Frame>
);

/* 2.14 "Division facts 2/5/10": 15 ÷ 5 = 3 groups. */
const P2_14 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <GroupShare total={15} groups={3} boxed />
      <Eq a={15} op="÷" b={5} result={3} />
    </div>
  </Frame>
);

/* 2.15 "100 + single digit": 100 + 7 = 107. */
const P2_15 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <PVBlocks hundreds={1} ones={7} />
      <Eq a={100} op="+" b={7} result={107} />
    </div>
  </Frame>
);

/* 2.16 "Halves to 20": 16 ÷ 2 = 8 (two equal piles of 8). */
const P2_16 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <GroupShare total={16} groups={2} boxed />
      <Eq a={16} op="÷" b={2} result={8} />
    </div>
  </Frame>
);

/* 2.17 "Multi-step +/− within 20": 8 + 5 − 4 = 9. */
const P2_17 = () => (
  <Frame>
    <div
      className="font-fredoka font-bold flex items-baseline gap-2 justify-center"
      style={{ fontSize: 22, color: INK }}
    >
      <span style={{ color: PINK_DEEP }}>8</span>
      <span style={{ color: MUTED }}>+</span>
      <span style={{ color: "#d97706" }}>5</span>
      <span style={{ color: MUTED }}>−</span>
      <span style={{ color: PINK_MID }}>4</span>
      <span style={{ color: MUTED }}>=</span>
      <span style={{ color: PINK_DEEP }}>9</span>
    </div>
  </Frame>
);

/* ── Y3 — Three-digit ops & 3s/4s/8s tables ──────────────────────── */

/* 3.1 "Number bonds to 100": 73 + 27 = 100 (bar model). */
const P3_1 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <svg width={260} height={48} viewBox="0 0 260 48">
        <rect x={4} y={4} width={252} height={26} fill="#fff" stroke={PINK_DEEP} strokeWidth={1.6} rx={4} />
        <rect x={4} y={4} width={252 * 0.73} height={26} fill={PINK_MID} stroke={PINK_DEEP} strokeWidth={1.6} rx={4} />
        <text x={4 + (252 * 0.73) / 2} y={22} fontFamily="Nunito" fontWeight={800} fontSize={14} fill="#fff" textAnchor="middle">73</text>
        <text x={4 + 252 * 0.73 + (252 * 0.27) / 2} y={22} fontFamily="Nunito" fontWeight={800} fontSize={14} fill={INK} textAnchor="middle">27</text>
        <text x={130} y={44} fontFamily="Nunito" fontWeight={700} fontSize={12} fill={MUTED} textAnchor="middle">100</text>
      </svg>
      <Eq a={73} op="+" b={27} result={100} />
    </div>
  </Frame>
);

/* 3.2 "Hundreds only": 300 + 200 = 500. */
const P3_2 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        <PVBlocks hundreds={3} unit={5} />
        <span className="font-fredoka font-bold" style={{ fontSize: 16, color: MUTED }}>+</span>
        <PVBlocks hundreds={2} unit={5} colorH="#fde68a" />
      </div>
      <Eq a={300} op="+" b={200} result={500} />
    </div>
  </Frame>
);

/* 3.3 "3-digit, no renaming": 234 + 125 = 359. */
const P3_3 = () => (
  <Frame>
    <ColumnMini a="234" b="125" result="359" op="+" digitSize={20} />
  </Frame>
);

/* 3.4 "3-digit, ones renaming": 247 + 125 = 372. */
const P3_4 = () => (
  <Frame>
    <ColumnMini a="247" b="125" result="372" op="+" carries=" 1 " digitSize={20} />
  </Frame>
);

/* 3.5 "3-digit, multiple renaming": 268 + 475 = 743. */
const P3_5 = () => (
  <Frame>
    <ColumnMini a="268" b="475" result="743" op="+" carries="11 " digitSize={20} />
  </Frame>
);

/* 3.6 "3-digit −, no borrowing": 567 − 234 = 333. */
const P3_6 = () => (
  <Frame>
    <ColumnMini a="567" b="234" result="333" op="−" digitSize={20} />
  </Frame>
);

/* 3.7 "3-digit −, with borrowing": 524 − 287 = 237. */
const P3_7 = () => (
  <Frame>
    <ColumnMini a="524" b="287" result="237" op="−" borrows="411" digitSize={20} />
  </Frame>
);

/* 3.8 "Tables 3/4/8": 4 × 6 = 24 (array). */
const P3_8 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <DotArray rows={4} cols={6} dotSize={10} />
      <Eq a={4} op="×" b={6} result={24} />
    </div>
  </Frame>
);

/* 3.9 "All tables mixed (2–5, 8, 10)": three sample facts. */
const P3_9 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-1">
      <Eq a={3} op="×" b={8} result={24} size={18} />
      <Eq a={5} op="×" b={7} result={35} size={18} />
      <Eq a={8} op="×" b={4} result={32} size={18} />
    </div>
  </Frame>
);

/* 3.10 "2-digit × one-digit": 23 × 4 = 92. */
const P3_10 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <svg width={252} height={52} viewBox="0 0 252 52">
        <rect x={2} y={4} width={152} height={28} fill={PINK_MID} stroke={PINK_DEEP} strokeWidth={1.4} rx={4} />
        <rect x={160} y={4} width={90} height={28} fill="#fbbf24" stroke="#d97706" strokeWidth={1.4} rx={4} />
        <text x={78} y={22} fontFamily="Nunito" fontWeight={800} fontSize={14} fill="#fff" textAnchor="middle">20 × 4 = 80</text>
        <text x={205} y={22} fontFamily="Nunito" fontWeight={800} fontSize={14} fill={INK} textAnchor="middle">3 × 4 = 12</text>
        <text x={126} y={46} fontFamily="Nunito" fontWeight={700} fontSize={12} fill={MUTED} textAnchor="middle">80 + 12 = 92</text>
      </svg>
      <Eq a={23} op="×" b={4} result={92} />
    </div>
  </Frame>
);

/* 3.11 "Divide by 1-digit, no remainder": 24 ÷ 3 = 8. */
const P3_11 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <GroupShare total={24} groups={3} dotSize={10} boxed />
      <Eq a={24} op="÷" b={3} result={8} />
    </div>
  </Frame>
);

/* 3.12 "Mixed 3-digit +/−": one + one − sample. */
const P3_12 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-1">
      <Eq a={356} op="+" b={241} result={597} size={18} />
      <Eq a={528} op="−" b={163} result={365} size={18} />
    </div>
  </Frame>
);

/* 3.13 "Multi-step +/− within 100": 45 + 30 − 12 = 63. */
const P3_13 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <div
        className="font-fredoka font-bold flex items-baseline gap-2 justify-center"
        style={{ fontSize: 20, color: INK }}
      >
        <span style={{ color: PINK_DEEP }}>45</span>
        <span style={{ color: MUTED }}>+</span>
        <span style={{ color: "#d97706" }}>30</span>
        <span style={{ color: MUTED }}>−</span>
        <span style={{ color: PINK_MID }}>12</span>
        <span style={{ color: MUTED }}>=</span>
        <span style={{ color: PINK_DEEP }}>63</span>
      </div>
      <Caption>45 + 30 = 75, then − 12 = 63</Caption>
    </div>
  </Frame>
);

/* ── Y4 — Four-digit ops & decimal tenths ────────────────────────── */

/* 4.1 "Times tables 6/7/9": 6 × 7 = 42 (array). */
const P4_1 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <DotArray rows={6} cols={7} dotSize={8} gap={3} />
      <Eq a={6} op="×" b={7} result={42} />
    </div>
  </Frame>
);

/* 4.2 "All tables 2–10 mixed": three sample facts. */
const P4_2 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-1">
      <Eq a={6} op="×" b={9} result={54} size={18} />
      <Eq a={8} op="×" b={7} result={56} size={18} />
      <Eq a={4} op="×" b={6} result={24} size={18} />
    </div>
  </Frame>
);

/* 4.3 "÷ facts 2–10 mixed": three samples. */
const P4_3 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-1">
      <Eq a={54} op="÷" b={9} result={6} size={18} />
      <Eq a={56} op="÷" b={8} result={7} size={18} />
      <Eq a={24} op="÷" b={6} result={4} size={18} />
    </div>
  </Frame>
);

/* 4.4 "4-digit + no renaming": 2345 + 1234 = 3579. */
const P4_4 = () => (
  <Frame>
    <ColumnMini a="2345" b="1234" result="3579" op="+" digitSize={16} />
  </Frame>
);

/* 4.5 "4-digit + WITH renaming": 2487 + 1265 = 3752.
 *      7+5=12 (c1); 8+6+1=15 (c1); 4+2+1=7; 2+1=3 → 3752. */
const P4_5 = () => (
  <Frame>
    <ColumnMini a="2487" b="1265" result="3752" op="+" carries=" 11 " digitSize={16} />
  </Frame>
);

/* 4.6 "4-digit − no renaming": 4789 − 1234 = 3555. */
const P4_6 = () => (
  <Frame>
    <ColumnMini a="4789" b="1234" result="3555" op="−" digitSize={16} />
  </Frame>
);

/* 4.7 "4-digit − WITH renaming": 5234 − 2487 = 2747.
 *      borrow trace: thousands 5→4, hundreds 2→1, tens 3→2; ones regrouped to 14. */
const P4_7 = () => (
  <Frame>
    <ColumnMini a="5234" b="2487" result="2747" op="−" borrows="4121" digitSize={16} />
  </Frame>
);

/* 4.8 "3-digit × 1-digit": 234 × 3 = 702.
 *      4×3=12 (c1 above tens); 3×3+1=10 (c1 above hundreds); 2×3+1=7. */
const P4_8 = () => (
  <Frame>
    <ColumnMini a="234" b="3" result="702" op="×" carries="11 " digitSize={18} />
  </Frame>
);

/* 4.9 "3-digit ÷ 1-digit, no remainder": 246 ÷ 3 = 82. */
const P4_9 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <Eq a={246} op="÷" b={3} result={82} />
      <Caption>think 24 ÷ 3 = 8, then 6 ÷ 3 = 2</Caption>
    </div>
  </Frame>
);

/* 4.10 "Tenths + whole": 3 + 0.4 = 3.4 (3 whole squares + tenths strip). */
const P4_10 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        <svg width={84} height={26} viewBox="0 0 84 26">
          {[0, 1, 2].map((i) => (
            <rect
              key={i}
              x={1 + i * 28}
              y={1}
              width={26}
              height={24}
              fill={PINK_MID}
              stroke={PINK_DEEP}
              strokeWidth={1.4}
            />
          ))}
        </svg>
        <span className="font-fredoka font-bold" style={{ fontSize: 16, color: MUTED }}>+</span>
        <TenthsStrip shaded={4} width={140} height={24} fill="#fbbf24" stroke="#d97706" />
      </div>
      <Eq a={3} op="+" b={0.4} result={3.4} />
    </div>
  </Frame>
);

/* 4.11 "Tenths + tenths, no renaming": 0.3 + 0.5 = 0.8.
 *      Two-colour fill in one strip + sum strip below. */
const P4_11 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <svg width={220} height={28} viewBox="0 0 220 28">
        {Array.from({ length: 10 }, (_, i) => {
          const x = i * 22 + 1;
          const fill = i < 3 ? PINK_MID : i < 8 ? "#fbbf24" : "#fff";
          const stroke = i < 8 ? (i < 3 ? PINK_DEEP : "#d97706") : PINK_DEEP;
          return <rect key={i} x={x} y={1} width={20} height={26} fill={fill} stroke={stroke} strokeWidth={1.4} />;
        })}
      </svg>
      <Eq a={0.3} op="+" b={0.5} result={0.8} />
    </div>
  </Frame>
);

/* 4.12 "Tenths + tenths, WITH renaming": 0.7 + 0.6 = 1.3.
 *      Full strip + extra 3 tenths to show the regrouped 1 whole. */
const P4_12 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        <TenthsStrip shaded={10} width={140} height={22} />
        <span className="font-fredoka font-bold" style={{ fontSize: 14, color: MUTED }}>+</span>
        <TenthsStrip shaded={3} width={66} height={22} fill="#fbbf24" stroke="#d97706" />
      </div>
      <Caption>0.7 + 0.6 = 1.0 + 0.3</Caption>
      <Eq a={0.7} op="+" b={0.6} result={1.3} />
    </div>
  </Frame>
);

/* 4.13 "Tenths − tenths": 0.8 − 0.3 = 0.5. */
const P4_13 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <svg width={220} height={28} viewBox="0 0 220 28">
        {Array.from({ length: 10 }, (_, i) => {
          const x = i * 22 + 1;
          const filled = i < 8;
          const crossed = i >= 5 && i < 8;
          return (
            <g key={i}>
              <rect x={x} y={1} width={20} height={26}
                fill={filled ? PINK_MID : "#fff"}
                stroke={PINK_DEEP} strokeWidth={1.4} />
              {crossed && (
                <g stroke={INK} strokeWidth={2} strokeLinecap="round">
                  <line x1={x + 3} y1={5} x2={x + 17} y2={23} />
                  <line x1={x + 17} y1={5} x2={x + 3} y2={23} />
                </g>
              )}
            </g>
          );
        })}
      </svg>
      <Eq a={0.8} op="−" b={0.3} result={0.5} />
    </div>
  </Frame>
);

/* 4.14 "× or ÷ by 0 or 1": three rules sample. */
const P4_14 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-1">
      <Eq a={5} op="×" b={0} result={0} size={18} />
      <Eq a={7} op="×" b={1} result={7} size={18} />
      <Eq a={8} op="÷" b={1} result={8} size={18} />
    </div>
  </Frame>
);

/* ── Y5 — Big numbers & hundredths ──────────────────────────────── */

/* 5.1 "Tables 11/12": 12 × 7 = 84. */
const P5_1 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <Eq a={12} op="×" b={7} result={84} />
      <Caption>think 10 × 7 = 70, then + 2 × 7 = 14</Caption>
    </div>
  </Frame>
);

/* 5.2 "5/6-digit +": 45,231 + 12,468 = 57,699. */
const P5_2 = () => (
  <Frame>
    <ColumnMini a="45231" b="12468" result="57699" op="+" digitSize={14} />
  </Frame>
);

/* 5.3 "5/6-digit −": 78,452 − 23,167 = 55,285.
 *      borrows: hundreds 4→3, tens 5→4, ones regrouped to 12. */
const P5_3 = () => (
  <Frame>
    <ColumnMini a="78452" b="23167" result="55285" op="−" borrows="  341" digitSize={14} />
  </Frame>
);

/* 5.4 "2d × 2d": 23 × 14 = 322 (partial products bar). */
const P5_4 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <svg width={250} height={56} viewBox="0 0 250 56">
        <rect x={2} y={4} width={150} height={26} fill={PINK_MID} stroke={PINK_DEEP} strokeWidth={1.4} rx={4} />
        <rect x={154} y={4} width={94} height={26} fill="#fbbf24" stroke="#d97706" strokeWidth={1.4} rx={4} />
        <text x={77} y={22} fontFamily="Nunito" fontWeight={800} fontSize={13} fill="#fff" textAnchor="middle">23 × 10 = 230</text>
        <text x={201} y={22} fontFamily="Nunito" fontWeight={800} fontSize={13} fill={INK} textAnchor="middle">23 × 4 = 92</text>
        <text x={125} y={48} fontFamily="Nunito" fontWeight={700} fontSize={12} fill={MUTED} textAnchor="middle">230 + 92 = 322</text>
      </svg>
      <Eq a={23} op="×" b={14} result={322} />
    </div>
  </Frame>
);

/* 5.5 "÷ remainder as whole": 47 ÷ 5 = 9 r 2. */
const P5_5 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <div
        className="font-fredoka font-bold flex items-baseline gap-2 justify-center"
        style={{ fontSize: 22, color: INK }}
      >
        <span style={{ color: PINK_DEEP }}>47</span>
        <span style={{ color: MUTED }}>÷</span>
        <span style={{ color: "#d97706" }}>5</span>
        <span style={{ color: MUTED }}>=</span>
        <span style={{ color: PINK_DEEP }}>9</span>
        <span style={{ color: MUTED, fontSize: 16 }}>r</span>
        <span style={{ color: PINK_DEEP }}>2</span>
      </div>
      <Caption>9 groups of 5 = 45, with 2 left over</Caption>
    </div>
  </Frame>
);

/* 5.6 "Hundredths + whole or tenths": 2 + 0.45 = 2.45. */
const P5_6 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        <svg width={56} height={48} viewBox="0 0 56 48">
          {[0, 1].map((i) => (
            <rect
              key={i}
              x={1 + i * 26}
              y={1}
              width={24}
              height={46}
              fill={PINK_MID}
              stroke={PINK_DEEP}
              strokeWidth={1.4}
            />
          ))}
        </svg>
        <span className="font-fredoka font-bold" style={{ fontSize: 14, color: MUTED }}>+</span>
        <DecimalGrid shaded={45} size={56} fill="#fbbf24" stroke="#d97706" />
      </div>
      <Eq a={2} op="+" b={0.45} result={2.45} />
    </div>
  </Frame>
);

/* 5.7 "Hundredths + hundredths, no renaming": 0.34 + 0.25 = 0.59. */
const P5_7 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        <DecimalGrid shaded={34} size={58} />
        <span className="font-fredoka font-bold" style={{ fontSize: 14, color: MUTED }}>+</span>
        <DecimalGrid shaded={25} size={58} fill="#fbbf24" stroke="#d97706" />
      </div>
      <Eq a={0.34} op="+" b={0.25} result={0.59} />
    </div>
  </Frame>
);

/* 5.8 "Hundredths + hundredths, WITH renaming": 0.47 + 0.38 = 0.85. */
const P5_8 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        <DecimalGrid shaded={47} size={58} />
        <span className="font-fredoka font-bold" style={{ fontSize: 14, color: MUTED }}>+</span>
        <DecimalGrid shaded={38} size={58} fill="#fbbf24" stroke="#d97706" />
      </div>
      <Caption>7 + 8 = 15 → rename 10 hundredths as 1 tenth</Caption>
      <Eq a={0.47} op="+" b={0.38} result={0.85} size={18} />
    </div>
  </Frame>
);

/* 5.9 "Hundredths − hundredths": 0.85 − 0.27 = 0.58. */
const P5_9 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <DecimalGrid shaded={58} size={60} />
      <Eq a={0.85} op="−" b={0.27} result={0.58} size={18} />
    </div>
  </Frame>
);

/* 5.10 "Mixed decimal places +/−": 0.3 + 0.45 = 0.75. */
const P5_10 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <Eq a={0.3} op="+" b={0.45} result={0.75} />
      <Caption>line up the decimal points → 0.30 + 0.45</Caption>
    </div>
  </Frame>
);

/* 5.12 "3/4-digit × 1-digit": 234 × 6 = 1404.
 *      4×6=24 (c2 tens); 3×6+2=20 (c2 hundreds); 2×6+2=14. */
const P5_12 = () => (
  <Frame>
    <ColumnMini a="234" b="6" result="1404" op="×" carries=" 22 " digitSize={18} />
  </Frame>
);

/* 5.13 "Decimal × 10 or 100": 0.45 × 10 = 4.5.
 *      Place-value table makes the digit shift visible — each digit
 *      moves one column to the LEFT when multiplied by 10. */
const P5_13 = () => {
  const cellW = 28;
  const dotW = 12;
  const headerH = 14;
  const rowH = 26;
  const ow = cellW * 3 + dotW;       // ones | . | tenths | hundredths
  const xOnes = 0;
  const xDot = cellW;
  const xTenths = cellW + dotW;
  const xHundredths = cellW * 2 + dotW;
  const labels: [string, number][] = [
    ["O", xOnes + cellW / 2],
    ["", xDot + dotW / 2],
    ["t", xTenths + cellW / 2],
    ["h", xHundredths + cellW / 2],
  ];
  const Row = ({
    y, digits, hundredthsEmpty = false,
  }: { y: number; digits: string[]; hundredthsEmpty?: boolean }) => (
    <g>
      <rect x={xOnes} y={y} width={cellW} height={rowH} fill="#fff" stroke={PINK_DEEP} strokeWidth={1.3} />
      <rect x={xDot} y={y} width={dotW} height={rowH} fill={PINK_SOFT} stroke={PINK_DEEP} strokeWidth={1.3} />
      <rect x={xTenths} y={y} width={cellW} height={rowH} fill="#fff" stroke={PINK_DEEP} strokeWidth={1.3} />
      <rect x={xHundredths} y={y} width={cellW} height={rowH}
        fill={hundredthsEmpty ? "#fff" : "#fff"}
        stroke={PINK_DEEP} strokeWidth={1.3}
        strokeDasharray={hundredthsEmpty ? "3 3" : undefined}
        strokeOpacity={hundredthsEmpty ? 0.5 : 1}
      />
      <g fontFamily="Nunito, sans-serif" fontWeight={800} fontSize={16} textAnchor="middle" fill={INK}>
        <text x={xOnes + cellW / 2} y={y + rowH / 2 + 6}>{digits[0]}</text>
        <text x={xDot + dotW / 2} y={y + rowH / 2 + 6} fill={PINK_DEEP}>.</text>
        <text x={xTenths + cellW / 2} y={y + rowH / 2 + 6}>{digits[1]}</text>
        <text x={xHundredths + cellW / 2} y={y + rowH / 2 + 6}>{digits[2]}</text>
      </g>
    </g>
  );
  const totalH = headerH + rowH + 18 + rowH + 4;
  return (
    <Frame>
      <div className="flex flex-col items-center gap-2">
        <svg width={ow + 40} height={totalH} viewBox={`0 0 ${ow + 40} ${totalH}`}>
          {/* column headers */}
          <g fontFamily="Nunito, sans-serif" fontWeight={700} fontSize={9} textAnchor="middle" fill={MUTED}>
            {labels.map(([txt, cx], i) => (
              <text key={i} x={cx} y={headerH - 3}>{txt}</text>
            ))}
          </g>
          {/* row 1: 0.45 */}
          <Row y={headerH} digits={["0", "4", "5"]} />
          {/* × 10 label and arrow */}
          <g fontFamily="Nunito, sans-serif" fontWeight={800} fontSize={11} fill={PINK_DEEP}>
            <text x={ow + 6} y={headerH + rowH / 2 + 4}>×10</text>
          </g>
          {/* shift arrows between rows */}
          <g stroke={PINK_DEEP} strokeWidth={1.6} fill="none">
            <path
              d={`M ${xTenths + cellW / 2} ${headerH + rowH + 2} L ${xOnes + cellW / 2} ${headerH + rowH + 16}`}
              markerEnd="url(#arr513)"
            />
            <path
              d={`M ${xHundredths + cellW / 2} ${headerH + rowH + 2} L ${xTenths + cellW / 2} ${headerH + rowH + 16}`}
              markerEnd="url(#arr513)"
            />
          </g>
          <defs>
            <marker id="arr513" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <polygon points="0 0, 8 4, 0 8" fill={PINK_DEEP} />
            </marker>
          </defs>
          {/* row 2: 4.5 (hundredths empty) */}
          <Row y={headerH + rowH + 18} digits={["4", "5", ""]} hundredthsEmpty />
        </svg>
        <Eq a={0.45} op="×" b={10} result={4.5} size={18} />
      </div>
    </Frame>
  );
};

/* ── Y6 — Seven-digit, thousandths, BEDMAS, negatives intro, % ───── */

/* Bedmas chain — stacked lines, with the *next* operator highlighted in
 * pink on each line so students see which step happens first. Each line
 * is the equation rewritten one step further. */
const BedmasChain: React.FC<{
  lines: { parts: { text: string; hot?: boolean }[]; result?: string }[];
  size?: number;
}> = ({ lines, size = 18 }) => (
  <div className="flex flex-col items-center gap-0.5">
    {lines.map((line, i) => (
      <div
        key={i}
        className="font-fredoka font-bold flex items-baseline gap-1.5 justify-center"
        style={{ fontSize: size, color: INK }}
      >
        {line.parts.map((p, j) => (
          <span
            key={j}
            style={{
              color: p.hot ? PINK_DEEP : INK,
              background: p.hot ? "#fce7f3" : "transparent",
              padding: p.hot ? "0 4px" : 0,
              borderRadius: p.hot ? 4 : 0,
            }}
          >
            {p.text}
          </span>
        ))}
      </div>
    ))}
  </div>
);

/* 6.1 "any whole +": 34,567 + 21,856 = 56,423 (5-digit, still feels
 *      bigger than the Y5 sample without becoming unreadable). */
const P6_1 = () => (
  <Frame>
    <ColumnMini a="34567" b="21856" result="56423" op="+" carries=" 111 " digitSize={16} />
  </Frame>
);

/* 6.2 "any whole −": 67,452 − 23,187 = 44,265.
 *      borrows: hundreds 4→3, tens 5→4, ones regrouped to 12. */
const P6_2 = () => (
  <Frame>
    <ColumnMini a="67452" b="23187" result="44265" op="−" borrows="  341" digitSize={16} />
  </Frame>
);

/* 6.3 "Any whole × 2-digit": 245 × 23 = 5635 (partial products). */
const P6_3 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <svg width={260} height={52} viewBox="0 0 260 52">
        <rect x={2} y={4} width={150} height={26} fill={PINK_MID} stroke={PINK_DEEP} strokeWidth={1.4} rx={4} />
        <rect x={154} y={4} width={104} height={26} fill="#fbbf24" stroke="#d97706" strokeWidth={1.4} rx={4} />
        <text x={77} y={22} fontFamily="Nunito" fontWeight={800} fontSize={13} fill="#fff" textAnchor="middle">245 × 20 = 4900</text>
        <text x={206} y={22} fontFamily="Nunito" fontWeight={800} fontSize={13} fill={INK} textAnchor="middle">245 × 3 = 735</text>
        <text x={130} y={46} fontFamily="Nunito" fontWeight={700} fontSize={11} fill={MUTED} textAnchor="middle">4900 + 735 = 5635</text>
      </svg>
      <Eq a={245} op="×" b={23} result={5635} size={18} />
    </div>
  </Frame>
);

/* 6.4 "÷ remainder as fraction": 47 ÷ 5 = 9 ²⁄₅.
 *      The fraction part needs to sit vertically centred against the
 *      "9", not on the text baseline (which leaves the fraction
 *      hanging below the whole number). items-center on the row +
 *      removing baseline alignment fixes the mixed-number look. */
const P6_4 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <div
        className="font-fredoka font-bold flex items-center gap-2 justify-center"
        style={{ fontSize: 22, color: INK }}
      >
        <span style={{ color: PINK_DEEP }}>47</span>
        <span style={{ color: MUTED }}>÷</span>
        <span style={{ color: "#d97706" }}>5</span>
        <span style={{ color: MUTED }}>=</span>
        <span style={{ color: PINK_DEEP }}>9</span>
        <FractionLabel num={2} den={5} size={16} color={PINK_DEEP} />
      </div>
      <Caption>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
          9 × 5 = 45, remainder 2 =
          <FractionLabel num={2} den={5} size={11} color={MUTED} />
        </span>
      </Caption>
    </div>
  </Frame>
);

/* 6.5 "Thousandths, no renaming": 0.234 + 0.125 = 0.359. */
const P6_5 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <ThousandthsBar shaded={359} width={240} />
      <Eq a={0.234} op="+" b={0.125} result={0.359} size={18} />
    </div>
  </Frame>
);

/* 6.6 "Thousandths, WITH renaming": 0.347 + 0.265 = 0.612. */
const P6_6 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <ThousandthsBar shaded={612} width={240} />
      <Caption>7 + 5 = 12 → rename 10 thousandths as 1 hundredth</Caption>
      <Eq a={0.347} op="+" b={0.265} result={0.612} size={18} />
    </div>
  </Frame>
);

/* 6.7 "Thousandths − thousandths": 0.847 − 0.235 = 0.612. */
const P6_7 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <ThousandthsBar shaded={612} width={240} />
      <Eq a={0.847} op="−" b={0.235} result={0.612} size={18} />
    </div>
  </Frame>
);

/* 6.8 "Mixed decimal places +/−": 0.4 + 0.123 = 0.523.
 *      Lining up the points turns 0.4 into 0.400 first. */
const P6_8 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <ColumnMini a="0.400" b="0.123" result="0.523" op="+" digitSize={14} />
      <Caption>line up the decimal points → 0.4 = 0.400</Caption>
    </div>
  </Frame>
);

/* 6.9 "BEDMAS: + and ×": 3 + 4 × 5 = 23 (multiply first). */
const P6_9 = () => (
  <Frame>
    <BedmasChain
      lines={[
        { parts: [{ text: "3 +" }, { text: "4 × 5", hot: true }] },
        { parts: [{ text: "= 3 + 20" }] },
        { parts: [{ text: "= 23", hot: true }] },
      ]}
    />
  </Frame>
);

/* 6.10 "BEDMAS: Brackets": (3 + 4) × 5 = 35 (brackets first). */
const P6_10 = () => (
  <Frame>
    <BedmasChain
      lines={[
        { parts: [{ text: "(3 + 4)", hot: true }, { text: "× 5" }] },
        { parts: [{ text: "= 7 × 5" }] },
        { parts: [{ text: "= 35", hot: true }] },
      ]}
    />
  </Frame>
);

/* 6.11 "BEDMAS: + and ÷": 12 + 8 ÷ 2 = 16 (divide first). */
const P6_11 = () => (
  <Frame>
    <BedmasChain
      lines={[
        { parts: [{ text: "12 +" }, { text: "8 ÷ 2", hot: true }] },
        { parts: [{ text: "= 12 + 4" }] },
        { parts: [{ text: "= 16", hot: true }] },
      ]}
    />
  </Frame>
);

/* 6.12 "BEDMAS: four ops": (3 + 5) × 4 − 6 = 26. */
const P6_12 = () => (
  <Frame>
    <BedmasChain
      size={16}
      lines={[
        { parts: [{ text: "(3 + 5)", hot: true }, { text: "× 4 − 6" }] },
        { parts: [{ text: "=" }, { text: "8 × 4", hot: true }, { text: "− 6" }] },
        { parts: [{ text: "= 32 − 6" }] },
        { parts: [{ text: "= 26", hot: true }] },
      ]}
    />
  </Frame>
);

/* 6.13 "÷ remainder as decimal": 7 ÷ 4 = 1.75. */
const P6_13 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <Eq a={7} op="÷" b={4} result={1.75} />
      <Caption>1 whole, remainder 3 → 3 ÷ 4 = 0.75</Caption>
    </div>
  </Frame>
);

/* 6.14 "Subtract across 0 (negatives intro)": 5 − 8 = −3. */
const P6_14 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <IntegerNumberLine min={-5} max={8} from={5} to={-3} width={300} />
      <Eq a={5} op="−" b={8} result={-3} size={18} />
    </div>
  </Frame>
);

/* 6.15 "% of whole (common percentages)": 25% of 80 = 20. */
const P6_15 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <PercentBar percent={25} width={240} height={24} />
      <div
        className="font-fredoka font-bold flex items-baseline gap-2 justify-center"
        style={{ fontSize: 20, color: INK }}
      >
        <span style={{ color: PINK_DEEP }}>25%</span>
        <span style={{ color: MUTED }}>of</span>
        <span style={{ color: "#d97706" }}>80</span>
        <span style={{ color: MUTED }}>=</span>
        <span style={{ color: PINK_DEEP }}>20</span>
      </div>
    </div>
  </Frame>
);

/* ── Y7 — Integers, exponents, fraction/decimal ops & % ──────────── */

/* 7.1 "Pos + neg → pos": 5 + (-3) = 2. */
const P7_1 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <IntegerNumberLine min={-3} max={6} from={5} to={2} width={280} />
      <Eq a={5} op="+" b="(−3)" result={2} size={18} />
    </div>
  </Frame>
);

/* 7.2 "Pos + neg → neg": 3 + (-7) = −4. */
const P7_2 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <IntegerNumberLine min={-5} max={5} from={3} to={-4} width={280} />
      <Eq a={3} op="+" b="(−7)" result={-4} size={18} />
    </div>
  </Frame>
);

/* 7.3 "Neg + neg": −3 + (−4) = −7. */
const P7_3 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <IntegerNumberLine min={-8} max={2} from={-3} to={-7} width={280} />
      <Eq a={-3} op="+" b="(−4)" result={-7} size={18} />
    </div>
  </Frame>
);

/* 7.4 "Integer subtraction": 4 − (−3) = 7 (taking away a negative
 *      adds — arc moves to the right). */
const P7_4 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <IntegerNumberLine min={-2} max={8} from={4} to={7} width={280} />
      <Eq a={4} op="−" b="(−3)" result={7} size={18} />
    </div>
  </Frame>
);

/* 7.5 "Mixed integer +/−": −3 + 5 − 2 = 0. */
const P7_5 = () => (
  <Frame>
    <BedmasChain
      lines={[
        { parts: [{ text: "−3 +" }, { text: "5", hot: true }, { text: "− 2" }] },
        { parts: [{ text: "= 2 − 2" }] },
        { parts: [{ text: "= 0", hot: true }] },
      ]}
    />
  </Frame>
);

/* 7.6 "Three integers": −5 + 8 + (−4) = −1. */
const P7_6 = () => (
  <Frame>
    <BedmasChain
      lines={[
        { parts: [{ text: "−5 +" }, { text: "8", hot: true }, { text: "+ (−4)" }] },
        { parts: [{ text: "= 3 + (−4)" }] },
        { parts: [{ text: "= −1", hot: true }] },
      ]}
    />
  </Frame>
);

/* 7.7 "Larger integers and decimals": 12.5 + (−7.3) = 5.2. */
const P7_7 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <Eq a={12.5} op="+" b="(−7.3)" result={5.2} size={20} />
      <Caption>same as 12.5 − 7.3 = 5.2</Caption>
    </div>
  </Frame>
);

/* 7.8 "×÷ by 10, 100, 1000": 0.456 × 100 = 45.6 (PV table, digits
 *      shift two places to the LEFT). */
const P7_8 = () => {
  const cellW = 24;
  const dotW = 10;
  const headerH = 12;
  const rowH = 22;
  const cols = 6; // T O . t h th
  const xs = [0, cellW, cellW * 2, cellW * 2 + dotW, cellW * 3 + dotW, cellW * 4 + dotW];
  const widths = [cellW, cellW, dotW, cellW, cellW, cellW];
  const ow = cellW * 5 + dotW;
  const Row = ({ y, digits }: { y: number; digits: string[] }) => (
    <g>
      {xs.map((x, i) => (
        <rect
          key={i}
          x={x}
          y={y}
          width={widths[i]}
          height={rowH}
          fill={i === 2 ? PINK_SOFT : "#fff"}
          stroke={PINK_DEEP}
          strokeWidth={1.2}
        />
      ))}
      <g fontFamily="Nunito, sans-serif" fontWeight={800} fontSize={14} textAnchor="middle" fill={INK}>
        {digits.map((d, i) => (
          <text key={i} x={xs[i] + widths[i] / 2} y={y + rowH / 2 + 5}
            fill={i === 2 ? PINK_DEEP : INK}>
            {d}
          </text>
        ))}
      </g>
    </g>
  );
  return (
    <Frame>
      <div className="flex flex-col items-center gap-2">
        <svg width={ow + 36} height={headerH + rowH + 18 + rowH + 4}
          viewBox={`0 0 ${ow + 36} ${headerH + rowH + 18 + rowH + 4}`}>
          <g fontFamily="Nunito, sans-serif" fontWeight={700} fontSize={8} textAnchor="middle" fill={MUTED}>
            <text x={xs[0] + cellW / 2} y={headerH - 2}>T</text>
            <text x={xs[1] + cellW / 2} y={headerH - 2}>O</text>
            <text x={xs[3] + cellW / 2} y={headerH - 2}>t</text>
            <text x={xs[4] + cellW / 2} y={headerH - 2}>h</text>
            <text x={xs[5] + cellW / 2} y={headerH - 2}>th</text>
          </g>
          <Row y={headerH} digits={["", "0", ".", "4", "5", "6"]} />
          <text x={ow + 6} y={headerH + rowH / 2 + 4}
            fontFamily="Nunito, sans-serif" fontWeight={800} fontSize={10} fill={PINK_DEEP}>
            ×100
          </text>
          <g stroke={PINK_DEEP} strokeWidth={1.5} fill="none">
            <path d={`M ${xs[3] + cellW / 2} ${headerH + rowH + 2} L ${xs[0] + cellW / 2} ${headerH + rowH + 16}`} markerEnd="url(#arr78)" />
            <path d={`M ${xs[4] + cellW / 2} ${headerH + rowH + 2} L ${xs[1] + cellW / 2} ${headerH + rowH + 16}`} markerEnd="url(#arr78)" />
            <path d={`M ${xs[5] + cellW / 2} ${headerH + rowH + 2} L ${xs[3] + cellW / 2} ${headerH + rowH + 16}`} markerEnd="url(#arr78)" />
          </g>
          <defs>
            <marker id="arr78" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <polygon points="0 0, 8 4, 0 8" fill={PINK_DEEP} />
            </marker>
          </defs>
          <Row y={headerH + rowH + 18} digits={["4", "5", ".", "6", "", ""]} />
        </svg>
        <Eq a={0.456} op="×" b={100} result={45.6} size={16} />
      </div>
    </Frame>
  );
};

/* 7.9 "Exponents + ops": 3² + 4 = 13. */
const P7_9 = () => (
  <Frame>
    <BedmasChain
      lines={[
        { parts: [{ text: "3² + 4", hot: false }, { text: "", hot: false }] },
        { parts: [{ text: "=" }, { text: "9", hot: true }, { text: "+ 4" }] },
        { parts: [{ text: "= 13", hot: true }] },
      ]}
    />
  </Frame>
);

/* 7.10 "Brackets with exponents": (2 + 3)² = 25. */
const P7_10 = () => (
  <Frame>
    <BedmasChain
      lines={[
        { parts: [{ text: "(2 + 3)", hot: true }, { text: "²" }] },
        { parts: [{ text: "=" }, { text: "5²", hot: true }] },
        { parts: [{ text: "= 25", hot: true }] },
      ]}
    />
  </Frame>
);

/* 7.11 "BEDMAS with negatives": −3 + 2 × 4 = 5 (× first). */
const P7_11 = () => (
  <Frame>
    <BedmasChain
      lines={[
        { parts: [{ text: "−3 +" }, { text: "2 × 4", hot: true }] },
        { parts: [{ text: "= −3 + 8" }] },
        { parts: [{ text: "= 5", hot: true }] },
      ]}
    />
  </Frame>
);

/* 7.12 "Complex expression": 5 × (3 + 2)² − 10 = 115. */
const P7_12 = () => (
  <Frame>
    <BedmasChain
      size={15}
      lines={[
        { parts: [{ text: "5 ×" }, { text: "(3 + 2)", hot: true }, { text: "² − 10" }] },
        { parts: [{ text: "= 5 ×" }, { text: "5²", hot: true }, { text: "− 10" }] },
        { parts: [{ text: "=" }, { text: "5 × 25", hot: true }, { text: "− 10" }] },
        { parts: [{ text: "= 125 − 10" }] },
        { parts: [{ text: "= 115", hot: true }] },
      ]}
    />
  </Frame>
);

/* 7.13 "Whole × fraction": 4 × ⅔ = 8/3 = 2⅔. */
const P7_13 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-1">
        {[0, 1, 2, 3].map((i) => (
          <PieFraction key={i} num={2} den={3} size={36} />
        ))}
      </div>
      <div className="font-fredoka font-bold flex items-center gap-2"
        style={{ fontSize: 18, color: INK }}>
        <span style={{ color: PINK_DEEP }}>4</span>
        <span style={{ color: MUTED }}>×</span>
        <FractionLabel num={2} den={3} size={14} color="#d97706" />
        <span style={{ color: MUTED }}>=</span>
        <span style={{ color: PINK_DEEP }}>2</span>
        <FractionLabel num={2} den={3} size={14} color={PINK_DEEP} />
      </div>
    </div>
  </Frame>
);

/* 7.14 "Decimal × whole": 3.4 × 5 = 17. */
const P7_14 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <Eq a={3.4} op="×" b={5} result={17} size={20} />
      <Caption>3 × 5 = 15, then 0.4 × 5 = 2, total 17</Caption>
    </div>
  </Frame>
);

/* 7.15 "Whole ÷ unit fraction": 6 ÷ ⅓ = 18 (each whole splits into 3). */
const P7_15 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-1.5">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <BarFraction key={i} num={3} den={3} width={34} height={28} />
        ))}
      </div>
      <div className="font-fredoka font-bold flex items-center gap-2"
        style={{ fontSize: 18, color: INK }}>
        <span style={{ color: PINK_DEEP }}>6</span>
        <span style={{ color: MUTED }}>÷</span>
        <FractionLabel num={1} den={3} size={14} color="#d97706" />
        <span style={{ color: MUTED }}>=</span>
        <span style={{ color: PINK_DEEP }}>18</span>
      </div>
    </div>
  </Frame>
);

/* 7.16 "Fraction ÷ whole": ¾ ÷ 2 = ⅜. Visual: ¾ bar, then halved. */
const P7_16 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <svg width={200} height={36} viewBox="0 0 200 36">
        {/* 4 main quarters, 3 shaded */}
        {[0, 1, 2, 3].map((i) => (
          <rect key={i}
            x={i * 50 + 1} y={2}
            width={48} height={32}
            fill={i < 3 ? PINK_MID : "#fff"}
            stroke={PINK_DEEP} strokeWidth={1.6}
          />
        ))}
        {/* horizontal split through each cell (halving) */}
        <line x1={1} y1={18} x2={199} y2={18}
          stroke={INK} strokeWidth={1.5} strokeDasharray="4 3" />
      </svg>
      <div className="font-fredoka font-bold flex items-center gap-2"
        style={{ fontSize: 18, color: INK }}>
        <FractionLabel num={3} den={4} size={14} color={PINK_DEEP} />
        <span style={{ color: MUTED }}>÷</span>
        <span style={{ color: "#d97706" }}>2</span>
        <span style={{ color: MUTED }}>=</span>
        <FractionLabel num={3} den={8} size={14} color={PINK_DEEP} />
      </div>
    </div>
  </Frame>
);

/* 7.17 "Divide by two-digit": 456 ÷ 12 = 38. */
const P7_17 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <Eq a={456} op="÷" b={12} result={38} size={22} />
      <Caption>38 × 12 = 360 + 96 = 456</Caption>
    </div>
  </Frame>
);

/* 7.18 "% of whole": 15% of 80 = 12. */
const P7_18 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <PercentBar percent={15} width={240} height={22} />
      <div className="font-fredoka font-bold flex items-baseline gap-2"
        style={{ fontSize: 18, color: INK }}>
        <span style={{ color: PINK_DEEP }}>15%</span>
        <span style={{ color: MUTED }}>of</span>
        <span style={{ color: "#d97706" }}>80</span>
        <span style={{ color: MUTED }}>=</span>
        <span style={{ color: PINK_DEEP }}>12</span>
      </div>
    </div>
  </Frame>
);

/* 7.19 "Find whole from %": 25% of ? = 20 → ? = 80. */
const P7_19 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <PercentBar percent={25} width={240} height={22} />
      <div className="font-fredoka font-bold flex items-baseline gap-2"
        style={{ fontSize: 18, color: INK }}>
        <span style={{ color: PINK_DEEP }}>25%</span>
        <span style={{ color: MUTED }}>of</span>
        <span style={{ color: "#d97706" }}>?</span>
        <span style={{ color: MUTED }}>=</span>
        <span style={{ color: PINK_DEEP }}>20</span>
        <span style={{ color: MUTED, fontSize: 14 }}>→ ? = 80</span>
      </div>
    </div>
  </Frame>
);

/* 7.20 "Non-unit fraction of whole": ¾ of 20 = 15. */
const P7_20 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <svg width={240} height={42} viewBox="0 0 240 42">
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x={i * 60 + 1} y={2} width={58} height={28}
              fill={i < 3 ? PINK_MID : "#fff"}
              stroke={PINK_DEEP} strokeWidth={1.6} />
            <text x={i * 60 + 30} y={20}
              fontFamily="Nunito" fontWeight={800} fontSize={13}
              fill={i < 3 ? "#fff" : INK} textAnchor="middle">5</text>
          </g>
        ))}
        <text x={120} y={40}
          fontFamily="Nunito" fontWeight={700} fontSize={11}
          fill={MUTED} textAnchor="middle">5 + 5 + 5 = 15</text>
      </svg>
      <div className="font-fredoka font-bold flex items-center gap-2"
        style={{ fontSize: 18, color: INK }}>
        <FractionLabel num={3} den={4} size={14} color={PINK_DEEP} />
        <span style={{ color: MUTED }}>of</span>
        <span style={{ color: "#d97706" }}>20</span>
        <span style={{ color: MUTED }}>=</span>
        <span style={{ color: PINK_DEEP }}>15</span>
      </div>
    </div>
  </Frame>
);

/* 7.21 "Find whole from a fraction": ⅗ of ? = 12 → ? = 20. */
const P7_21 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <svg width={250} height={42} viewBox="0 0 250 42">
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <rect x={i * 50 + 1} y={2} width={48} height={28}
              fill={i < 3 ? PINK_MID : "#fff"}
              stroke={PINK_DEEP} strokeWidth={1.6} />
            <text x={i * 50 + 25} y={20}
              fontFamily="Nunito" fontWeight={800} fontSize={13}
              fill={i < 3 ? "#fff" : INK} textAnchor="middle">4</text>
          </g>
        ))}
        <text x={125} y={40}
          fontFamily="Nunito" fontWeight={700} fontSize={11}
          fill={MUTED} textAnchor="middle">12 ÷ 3 parts = 4 per part</text>
      </svg>
      <div className="font-fredoka font-bold flex items-center gap-2"
        style={{ fontSize: 18, color: INK }}>
        <FractionLabel num={3} den={5} size={14} color={PINK_DEEP} />
        <span style={{ color: MUTED }}>of</span>
        <span style={{ color: "#d97706" }}>?</span>
        <span style={{ color: MUTED }}>=</span>
        <span style={{ color: PINK_DEEP }}>12</span>
        <span style={{ color: MUTED, fontSize: 14 }}>→ ? = 20</span>
      </div>
    </div>
  </Frame>
);

/* 7.22 "Integer ×": (−4) × 3 = −12. Sign rule caption (full words). */
const P7_22 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-1">
      <Eq a="(−4)" op="×" b={3} result={-12} size={20} />
      <Eq a="(−4)" op="×" b="(−3)" result={"+12"} size={16} />
      <Caption>negative × positive = negative</Caption>
      <Caption>negative × negative = positive</Caption>
    </div>
  </Frame>
);

/* 7.23 "Integer ÷": (−12) ÷ 4 = −3. Sign rule caption (full words). */
const P7_23 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-1">
      <Eq a="(−12)" op="÷" b={4} result={-3} size={20} />
      <Eq a="(−12)" op="÷" b="(−4)" result={"+3"} size={16} />
      <Caption>negative ÷ positive = negative</Caption>
      <Caption>negative ÷ negative = positive</Caption>
    </div>
  </Frame>
);

/* ── Y8 — Decimal & Fraction Ops · % · Ratios ────────────────────── */

/* 8.1 "Multi-step w/ integers": −3 + 4 × (−2) = −11. */
const P8_1 = () => (
  <Frame>
    <BedmasChain
      lines={[
        { parts: [{ text: "−3 +" }, { text: "4 × (−2)", hot: true }] },
        { parts: [{ text: "= −3 + (−8)" }] },
        { parts: [{ text: "= −11", hot: true }] },
      ]}
    />
  </Frame>
);

/* 8.2 "Nested brackets": (2 + (3 + 4)) × 5 = 45. */
const P8_2 = () => (
  <Frame>
    <BedmasChain
      size={16}
      lines={[
        { parts: [{ text: "(2 +" }, { text: "(3 + 4)", hot: true }, { text: ") × 5" }] },
        { parts: [{ text: "=" }, { text: "(2 + 7)", hot: true }, { text: "× 5" }] },
        { parts: [{ text: "= 9 × 5" }] },
        { parts: [{ text: "= 45", hot: true }] },
      ]}
    />
  </Frame>
);

/* 8.3 "Exponents in full expressions": 3² × (4 + 2) − 5 = 49. */
const P8_3 = () => (
  <Frame>
    <BedmasChain
      size={16}
      lines={[
        { parts: [{ text: "3² ×" }, { text: "(4 + 2)", hot: true }, { text: "− 5" }] },
        { parts: [{ text: "=" }, { text: "3²", hot: true }, { text: "× 6 − 5" }] },
        { parts: [{ text: "= 9 × 6 − 5" }] },
        { parts: [{ text: "= 54 − 5" }] },
        { parts: [{ text: "= 49", hot: true }] },
      ]}
    />
  </Frame>
);

/* 8.4 "Decimal × whole": 3.45 × 6 = 20.7. */
const P8_4 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <Eq a={3.45} op="×" b={6} result={20.7} size={20} />
      <Caption>345 × 6 = 2070, then place 2 decimals → 20.70 = 20.7</Caption>
    </div>
  </Frame>
);

/* 8.5 "Decimal × decimal": 0.4 × 0.3 = 0.12.
 *      4/10 × 3/10 = 12/100 — shaded overlap of 4 cols and 3 rows. */
const P8_5 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <FractionMultGrid aNum={3} aDen={10} bNum={4} bDen={10} size={88} />
      <Eq a={0.4} op="×" b={0.3} result={0.12} size={18} />
    </div>
  </Frame>
);

/* 8.6 "÷ by 2-digit": 864 ÷ 24 = 36. */
const P8_6 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <Eq a={864} op="÷" b={24} result={36} size={22} />
      <Caption>36 × 24 = 720 + 144 = 864</Caption>
    </div>
  </Frame>
);

/* 8.7 "% of number": 35% of 60 = 21. */
const P8_7 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <PercentBar percent={35} width={240} height={22} />
      <div className="font-fredoka font-bold flex items-baseline gap-2"
        style={{ fontSize: 18, color: INK }}>
        <span style={{ color: PINK_DEEP }}>35%</span>
        <span style={{ color: MUTED }}>of</span>
        <span style={{ color: "#d97706" }}>60</span>
        <span style={{ color: MUTED }}>=</span>
        <span style={{ color: PINK_DEEP }}>21</span>
      </div>
    </div>
  </Frame>
);

/* 8.8 "Find whole from %": 35% of ? = 21 → 60. */
const P8_8 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <PercentBar percent={35} width={240} height={22} />
      <div className="font-fredoka font-bold flex items-baseline gap-2"
        style={{ fontSize: 18, color: INK }}>
        <span style={{ color: PINK_DEEP }}>35%</span>
        <span style={{ color: MUTED }}>of</span>
        <span style={{ color: "#d97706" }}>?</span>
        <span style={{ color: MUTED }}>=</span>
        <span style={{ color: PINK_DEEP }}>21</span>
        <span style={{ color: MUTED, fontSize: 14 }}>→ ? = 60</span>
      </div>
    </div>
  </Frame>
);

/* 8.9 "Divide quantity in ratio": 60 in 2:3 → 24:36. */
const P8_9 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <RatioBar a={2} b={3} cellSize={32} height={28} />
      <div className="font-fredoka font-bold flex items-baseline gap-2"
        style={{ fontSize: 17, color: INK }}>
        <span style={{ color: "#d97706" }}>60</span>
        <span style={{ color: MUTED }}>in</span>
        <span style={{ color: PINK_DEEP }}>2 : 3</span>
        <span style={{ color: MUTED }}>=</span>
        <span style={{ color: PINK_DEEP }}>24 : 36</span>
      </div>
      <Caption>5 parts → 60 ÷ 5 = 12 per part</Caption>
    </div>
  </Frame>
);

/* 8.10 "Fractions same denom": ⅜ + ⅛ = 4/8 = ½. */
const P8_10 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <svg width={220} height={32} viewBox="0 0 220 32">
        {/* one bar of 8 cells, first 3 pink, next 1 amber, rest empty */}
        {Array.from({ length: 8 }, (_, i) => {
          const fill = i < 3 ? PINK_MID : i < 4 ? "#fbbf24" : "#fff";
          const stroke = i < 4 ? (i < 3 ? PINK_DEEP : "#d97706") : PINK_DEEP;
          return (
            <rect key={i} x={i * 27 + 1} y={1} width={25} height={30}
              fill={fill} stroke={stroke} strokeWidth={1.5} />
          );
        })}
      </svg>
      <div className="font-fredoka font-bold flex items-center gap-2"
        style={{ fontSize: 18, color: INK }}>
        <FractionLabel num={3} den={8} size={14} color={PINK_DEEP} />
        <span style={{ color: MUTED }}>+</span>
        <FractionLabel num={1} den={8} size={14} color="#d97706" />
        <span style={{ color: MUTED }}>=</span>
        <FractionLabel num={4} den={8} size={14} color={PINK_DEEP} />
        <span style={{ color: MUTED }}>=</span>
        <FractionLabel num={1} den={2} size={14} color={PINK_DEEP} />
      </div>
    </div>
  </Frame>
);

/* 8.11 "Fractions diff denom": ½ + ⅓ = 3/6 + 2/6 = 5/6. */
const P8_11 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <LCDFractions aNum={1} aDen={2} bNum={1} bDen={3} lcd={6} width={150} height={18} />
      <Eq a="½" op="+" b="⅓" result="⅚" size={16} />
    </div>
  </Frame>
);

/* 8.12 "Multi-step real-world": 25% off $40, then split between 2 people. */
const P8_12 = () => (
  <Frame>
    <BedmasChain
      size={15}
      lines={[
        { parts: [{ text: "$40 −" }, { text: "25% off", hot: true }] },
        { parts: [{ text: "= $40 − $10 = $30" }] },
        { parts: [{ text: "$30 ÷ 2 people" }] },
        { parts: [{ text: "= $15 each", hot: true }] },
      ]}
    />
  </Frame>
);

/* 8.13 "Fraction × fraction": ⅔ × ¾ = 6/12 = ½. */
const P8_13 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <FractionMultGrid aNum={2} aDen={3} bNum={3} bDen={4} size={84} />
      <div className="font-fredoka font-bold flex items-center gap-2"
        style={{ fontSize: 18, color: INK }}>
        <FractionLabel num={2} den={3} size={14} color={PINK_DEEP} />
        <span style={{ color: MUTED }}>×</span>
        <FractionLabel num={3} den={4} size={14} color="#d97706" />
        <span style={{ color: MUTED }}>=</span>
        <FractionLabel num={6} den={12} size={14} color={PINK_DEEP} />
        <span style={{ color: MUTED }}>=</span>
        <FractionLabel num={1} den={2} size={14} color={PINK_DEEP} />
      </div>
    </div>
  </Frame>
);

/* 8.14 "% discount": $40 − 25% off → $30 (75% remaining shaded). */
const P8_14 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <PercentBar percent={75} width={240} height={22} />
      <div className="font-fredoka font-bold flex items-baseline gap-2"
        style={{ fontSize: 17, color: INK }}>
        <span style={{ color: "#d97706" }}>$40</span>
        <span style={{ color: MUTED }}>−</span>
        <span style={{ color: PINK_DEEP }}>25% off</span>
        <span style={{ color: MUTED }}>=</span>
        <span style={{ color: PINK_DEEP }}>$30</span>
      </div>
      <Caption>pay 75% of $40 → 0.75 × 40 = 30</Caption>
    </div>
  </Frame>
);

/* 8.15 "Whole × improper/mixed": 4 × 1½ = 6 (4 wholes each with 1½). */
const P8_15 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-1">
        {[0, 1, 2, 3].map((i) => (
          <MixedNumberVis key={i} wholes={1} num={1} den={2} pieSize={26} />
        ))}
      </div>
      <div className="font-fredoka font-bold flex items-center gap-2"
        style={{ fontSize: 18, color: INK }}>
        <span style={{ color: PINK_DEEP }}>4</span>
        <span style={{ color: MUTED }}>×</span>
        <span style={{ color: "#d97706" }}>1</span>
        <FractionLabel num={1} den={2} size={14} color="#d97706" />
        <span style={{ color: MUTED }}>=</span>
        <span style={{ color: PINK_DEEP }}>6</span>
      </div>
    </div>
  </Frame>
);

/* 8.16 "% equivalence": 45% of 20 = 20% of 45 = 9. */
const P8_16 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-1">
      <div className="font-fredoka font-bold flex items-baseline gap-2"
        style={{ fontSize: 18, color: INK }}>
        <span style={{ color: PINK_DEEP }}>45% of 20</span>
        <span style={{ color: MUTED }}>=</span>
        <span style={{ color: PINK_DEEP }}>20% of 45</span>
        <span style={{ color: MUTED }}>=</span>
        <span style={{ color: "#d97706" }}>9</span>
      </div>
      <Caption>swap the numbers — same answer, easier mental maths</Caption>
    </div>
  </Frame>
);

/* 8.17 "Express as simplified ratio": 24 : 36 → 2 : 3. */
const P8_17 = () => (
  <Frame>
    <div className="flex flex-col items-center gap-2">
      <RatioBar a={2} b={3} cellSize={32} height={26} />
      <div className="font-fredoka font-bold flex items-center gap-2"
        style={{ fontSize: 17, color: INK }}>
        <span style={{ color: "#d97706" }}>24 : 36</span>
        <SimplifyArrow divBy={12} width={48} />
        <span style={{ color: PINK_DEEP }}>2 : 3</span>
      </div>
    </div>
  </Frame>
);

const MAP: Record<string, React.FC> = {
  "0.1": P0_1,
  "0.2": P0_2,
  "0.3": P0_3,
  "0.4": P0_4,
  "0.5": P0_5,
  "1.1": P1_1,
  "1.2": P1_2,
  "1.3": P1_3,
  "1.4": P1_4,
  "1.5": P1_5,
  "1.6": P1_6,
  "1.7": P1_7,
  "1.8": P1_8,
  "1.9": P1_9,
  "1.10": P1_10,
  "1.11": P1_11,
  "1.12": P1_12,
  "1.13": P1_13,
  "1.14": P1_14,
  "1.15": P1_15,
  "1.16": P1_16,
  "1.17": P1_17,
  "1.18": P1_18,
  "2.1": P2_1,
  "2.2": P2_2,
  "2.3": P2_3,
  "2.4": P2_4,
  "2.5": P2_5,
  "2.6": P2_6,
  "2.7": P2_7,
  "2.8": P2_8,
  "2.9": P2_9,
  "2.10": P2_10,
  "2.11": P2_11,
  "2.12": P2_12,
  "2.13": P2_13,
  "2.14": P2_14,
  "2.15": P2_15,
  "2.16": P2_16,
  "2.17": P2_17,
  "3.1": P3_1,
  "3.2": P3_2,
  "3.3": P3_3,
  "3.4": P3_4,
  "3.5": P3_5,
  "3.6": P3_6,
  "3.7": P3_7,
  "3.8": P3_8,
  "3.9": P3_9,
  "3.10": P3_10,
  "3.11": P3_11,
  "3.12": P3_12,
  "3.13": P3_13,
  "4.1": P4_1,
  "4.2": P4_2,
  "4.3": P4_3,
  "4.4": P4_4,
  "4.5": P4_5,
  "4.6": P4_6,
  "4.7": P4_7,
  "4.8": P4_8,
  "4.9": P4_9,
  "4.10": P4_10,
  "4.11": P4_11,
  "4.12": P4_12,
  "4.13": P4_13,
  "4.14": P4_14,
  "5.1": P5_1,
  "5.2": P5_2,
  "5.3": P5_3,
  "5.4": P5_4,
  "5.5": P5_5,
  "5.6": P5_6,
  "5.7": P5_7,
  "5.8": P5_8,
  "5.9": P5_9,
  "5.10": P5_10,
  "5.12": P5_12,
  "5.13": P5_13,
  "6.1": P6_1,
  "6.2": P6_2,
  "6.3": P6_3,
  "6.4": P6_4,
  "6.5": P6_5,
  "6.6": P6_6,
  "6.7": P6_7,
  "6.8": P6_8,
  "6.9": P6_9,
  "6.10": P6_10,
  "6.11": P6_11,
  "6.12": P6_12,
  "6.13": P6_13,
  "6.14": P6_14,
  "6.15": P6_15,
  "7.1": P7_1,
  "7.2": P7_2,
  "7.3": P7_3,
  "7.4": P7_4,
  "7.5": P7_5,
  "7.6": P7_6,
  "7.7": P7_7,
  "7.8": P7_8,
  "7.9": P7_9,
  "7.10": P7_10,
  "7.11": P7_11,
  "7.12": P7_12,
  "7.13": P7_13,
  "7.14": P7_14,
  "7.15": P7_15,
  "7.16": P7_16,
  "7.17": P7_17,
  "7.18": P7_18,
  "7.19": P7_19,
  "7.20": P7_20,
  "7.21": P7_21,
  "7.22": P7_22,
  "7.23": P7_23,
  "8.1": P8_1,
  "8.2": P8_2,
  "8.3": P8_3,
  "8.4": P8_4,
  "8.5": P8_5,
  "8.6": P8_6,
  "8.7": P8_7,
  "8.8": P8_8,
  "8.9": P8_9,
  "8.10": P8_10,
  "8.11": P8_11,
  "8.12": P8_12,
  "8.13": P8_13,
  "8.14": P8_14,
  "8.15": P8_15,
  "8.16": P8_16,
  "8.17": P8_17,
};

export const HAS_YEAR_OPS_PREVIEW = new Set(Object.keys(MAP));

export default function YearOpsExercisePreview({ code }: { code: string }) {
  const Component = MAP[code];
  if (!Component) return null;
  return <Component />;
}

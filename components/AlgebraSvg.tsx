/* SVG/JSX primitives for Algebra posters. Pink-themed to match the
 * Year Operations / Rational Numbers / Number Structures posters. */
import React from "react";
import { PINK_DEEP, PINK_MID, PINK_SOFT, PINK_PALE, INK, MUTED } from "./RationalSvg";

export { PINK_DEEP, PINK_MID, PINK_SOFT, PINK_PALE, INK, MUTED };

/* ── PatternRow — sequence of emoji/text tiles, with `null` slots
 * rendered as dashed-outline blank cells. Kept as a pure visual
 * primitive; preview components show the answer below via a
 * separate AnswerBadge (so the row stays narrow enough to fit). */
export const PatternRow: React.FC<{
  items: (string | null)[];
  cellSize?: number;
  gap?: number;
}> = ({ items, cellSize = 24, gap = 4 }) => {
  const totalW = items.length * cellSize + (items.length - 1) * gap;
  const totalH = cellSize + 4;
  return (
    <svg width={totalW} height={totalH} viewBox={`0 0 ${totalW} ${totalH}`}>
      {items.map((it, i) => {
        const x = i * (cellSize + gap);
        const isBlank = it === null;
        return (
          <g key={i}>
            <rect
              x={x}
              y={2}
              width={cellSize}
              height={cellSize}
              fill={isBlank ? PINK_PALE : "#ffffff"}
              stroke={PINK_DEEP}
              strokeWidth={1.5}
              strokeDasharray={isBlank ? "4 3" : undefined}
              rx={5}
            />
            <text
              x={x + cellSize / 2}
              y={2 + cellSize / 2 + cellSize * 0.18}
              textAnchor="middle"
              fontFamily="Fredoka, sans-serif"
              fontSize={cellSize * 0.6}
              fontWeight={800}
              fill={isBlank ? MUTED : INK}
            >
              {isBlank ? "?" : it}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

/* ── AnswerBadge — "Label: <pink answer tile>" used below PatternRow
 * to make the correct answer unmistakable. `label` defaults to
 * "Answer:". */
export const AnswerBadge: React.FC<{
  label?: string;
  answer: string;
  cellSize?: number;
  fontSize?: number;
}> = ({ label = "Answer:", answer, cellSize = 28, fontSize = 13 }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      fontFamily: "Fredoka, sans-serif",
      fontWeight: 800,
      fontSize,
      color: PINK_DEEP,
    }}
  >
    <span>{label}</span>
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: cellSize,
        height: cellSize,
        padding: "0 8px",
        borderRadius: 6,
        background: PINK_MID,
        color: "#ffffff",
        fontSize: cellSize * 0.55,
        boxShadow: `inset 0 0 0 2px ${PINK_DEEP}`,
        whiteSpace: "nowrap",
      }}
    >
      {answer}
    </span>
  </div>
);

/* ── BlankSlot — pink "?" tile used inside equation text strings to
 * mark the unknown that the student needs to find. */
const BlankSlot: React.FC<{ size?: number }> = ({ size = 22 }) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      minWidth: size * 1.3,
      height: size * 1.3,
      background: PINK_PALE,
      border: `2px dashed ${PINK_DEEP}`,
      borderRadius: 6,
      color: PINK_DEEP,
      fontWeight: 800,
      fontSize: size,
      margin: "0 2px",
      boxSizing: "border-box",
    }}
  >
    ?
  </span>
);

/* ── EquationBox — render an equation like "3 + ? = 7" with each "?"
 * replaced by a pink BlankSlot. Used by Y1·3/1·4/1·5/2·3/2·4/3·2. */
export const EquationBox: React.FC<{
  text: string;
  size?: number;
}> = ({ text, size = 22 }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      fontFamily: "Fredoka, sans-serif",
      fontWeight: 800,
      fontSize: size,
      color: INK,
    }}
  >
    {text.split(/(\?)/g).map((part, i) =>
      part === "?" ? <BlankSlot key={i} size={size * 0.9} /> : <span key={i}>{part}</span>,
    )}
  </div>
);

/* ── TrueFalseBadge — equation followed by a green ✓ or red ✗ stamp. */
export const TrueFalseBadge: React.FC<{
  equation: string;
  isTrue: boolean;
  size?: number;
}> = ({ equation, isTrue, size = 20 }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      padding: "6px 12px",
      borderRadius: 10,
      background: "#ffffff",
      border: `2px solid ${PINK_DEEP}`,
    }}
  >
    <span
      style={{
        fontFamily: "Fredoka, sans-serif",
        fontWeight: 800,
        fontSize: size,
        color: INK,
      }}
    >
      {equation}
    </span>
    <span
      style={{
        width: size * 1.5,
        height: size * 1.5,
        borderRadius: "50%",
        background: isTrue ? "#10b981" : "#ef4444",
        color: "#ffffff",
        fontSize: size * 1.0,
        fontWeight: 900,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {isTrue ? "✓" : "✗"}
    </span>
  </div>
);

/* ── CompareBox — two numbers with a pink "?" slot between them, used
 * by Y2·1 where the student picks >, <, or =. */
export const CompareBox: React.FC<{
  a: number | string;
  b: number | string;
  size?: number;
}> = ({ a, b, size = 26 }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      fontFamily: "Fredoka, sans-serif",
      fontWeight: 800,
      fontSize: size,
      color: INK,
    }}
  >
    <span>{a}</span>
    <BlankSlot size={size * 0.85} />
    <span>{b}</span>
  </div>
);

/* ── FigureRow — matchstick-squares growing pattern. Renders n=1, 2, 3
 * as connected squares, a dashed "?" cell, then the answer figure n=4
 * highlighted in pink. Used by Y4·7. */
export const FigureRow: React.FC<{
  shownNs?: number[];   // figures to display (default 1,2,3)
  answerN?: number;     // the answer figure (default 4)
  unitSize?: number;    // each square side in px
}> = ({ shownNs = [1, 2, 3], answerN = 4, unitSize = 12 }) => {
  const figureWidth = (n: number) => n * unitSize + 4;
  const widths = [...shownNs.map(figureWidth), figureWidth(answerN), figureWidth(answerN)];
  const gap = 10;
  const totalW = widths.reduce((s, w) => s + w, 0) + gap * (widths.length - 1);
  const totalH = unitSize + 24;
  let x = 0;
  return (
    <svg width={totalW} height={totalH} viewBox={`0 0 ${totalW} ${totalH}`}>
      {/* shown figures */}
      {shownNs.map((n, i) => {
        const fx = x;
        x += figureWidth(n) + gap;
        return (
          <g key={i}>
            {Array.from({ length: n }, (_, k) => (
              <rect
                key={k}
                x={fx + 2 + k * unitSize}
                y={2}
                width={unitSize}
                height={unitSize}
                fill="#ffffff"
                stroke={PINK_DEEP}
                strokeWidth={1.4}
              />
            ))}
            <text
              x={fx + figureWidth(n) / 2}
              y={unitSize + 16}
              textAnchor="middle"
              fontFamily="Fredoka, sans-serif"
              fontWeight={700}
              fontSize={10}
              fill={MUTED}
            >
              n={n}
            </text>
          </g>
        );
      })}
      {/* blank "?" cell */}
      {(() => {
        const fx = x;
        x += figureWidth(answerN) + gap;
        return (
          <g>
            <rect
              x={fx + 2}
              y={2}
              width={figureWidth(answerN) - 4}
              height={unitSize}
              fill={PINK_PALE}
              stroke={PINK_DEEP}
              strokeWidth={1.4}
              strokeDasharray="4 3"
              rx={3}
            />
            <text
              x={fx + figureWidth(answerN) / 2}
              y={2 + unitSize / 2 + 4}
              textAnchor="middle"
              fontFamily="Fredoka, sans-serif"
              fontWeight={800}
              fontSize={11}
              fill={MUTED}
            >
              ?
            </text>
            <text
              x={fx + figureWidth(answerN) / 2}
              y={unitSize + 16}
              textAnchor="middle"
              fontFamily="Fredoka, sans-serif"
              fontWeight={700}
              fontSize={10}
              fill={MUTED}
            >
              n={answerN}
            </text>
          </g>
        );
      })()}
      {/* answer figure (n=4) in pink */}
      {(() => {
        const fx = x;
        return (
          <g>
            {Array.from({ length: answerN }, (_, k) => (
              <rect
                key={k}
                x={fx + 2 + k * unitSize}
                y={2}
                width={unitSize}
                height={unitSize}
                fill={PINK_MID}
                stroke={PINK_DEEP}
                strokeWidth={1.4}
              />
            ))}
            <text
              x={fx + figureWidth(answerN) / 2}
              y={unitSize + 16}
              textAnchor="middle"
              fontFamily="Fredoka, sans-serif"
              fontWeight={800}
              fontSize={10}
              fill={PINK_DEEP}
            >
              answer
            </text>
          </g>
        );
      })()}
    </svg>
  );
};

/* ── CompareExpressions — `<lhs>  ?  <rhs>` with the ? in pink slot. */
export const CompareExpressions: React.FC<{
  lhs: string;
  rhs: string;
  size?: number;
}> = ({ lhs, rhs, size = 18 }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      fontFamily: "Fredoka, sans-serif",
      fontWeight: 800,
      fontSize: size,
      color: INK,
    }}
  >
    <span>{lhs}</span>
    <BlankSlot size={size * 0.85} />
    <span>{rhs}</span>
  </div>
);

/* ── RuleCards — sequence text + 3 option cards (correct one pink). */
export const RuleCards: React.FC<{
  sequence: string;
  options: { text: string; correct?: boolean }[];
}> = ({ sequence, options }) => (
  <div
    style={{
      display: "inline-flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 8,
      fontFamily: "Fredoka, sans-serif",
      fontWeight: 800,
    }}
  >
    <div style={{ fontSize: 18, color: INK }}>{sequence}</div>
    <div style={{ display: "inline-flex", gap: 6 }}>
      {options.map((o, i) => (
        <div
          key={i}
          style={{
            padding: "4px 10px",
            borderRadius: 8,
            fontSize: 12,
            fontWeight: 800,
            color: o.correct ? "#ffffff" : INK,
            background: o.correct ? PINK_MID : "#ffffff",
            border: `2px solid ${PINK_DEEP}`,
          }}
        >
          {o.text}
        </div>
      ))}
    </div>
  </div>
);

/* ── FigureCountRow — dot-square figures 1²/2²/3²/? with answer below. */
export const FigureCountRow: React.FC<{
  shownNs?: number[];   // default [1,2,3]
  answerN?: number;     // default 4
  dotSize?: number;     // default 4
  dotGap?: number;      // default 2
}> = ({ shownNs = [1, 2, 3], answerN = 4, dotSize = 4, dotGap = 2 }) => {
  const figW = (n: number) => Math.max(n, 1) * (dotSize + dotGap) + 6;
  const figH = figW(answerN);
  const gap = 10;
  const totalW = shownNs.reduce((s, n) => s + figW(n), 0) + figW(answerN) + figW(answerN) + gap * (shownNs.length + 1);
  const totalH = figH + 18;
  let x = 0;
  const renderDots = (n: number, fx: number, color: string) => {
    const cells: React.ReactNode[] = [];
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        cells.push(
          <circle
            key={`${r}-${c}`}
            cx={fx + 3 + c * (dotSize + dotGap) + dotSize / 2}
            cy={3 + r * (dotSize + dotGap) + dotSize / 2}
            r={dotSize / 2}
            fill={color}
            stroke={PINK_DEEP}
            strokeWidth={0.8}
          />,
        );
      }
    }
    return cells;
  };
  return (
    <svg width={totalW} height={totalH} viewBox={`0 0 ${totalW} ${totalH}`}>
      {shownNs.map((n, i) => {
        const fx = x;
        x += figW(n) + gap;
        return (
          <g key={i}>
            {renderDots(n, fx, "#ffffff")}
            <text
              x={fx + figW(n) / 2}
              y={figH + 12}
              textAnchor="middle"
              fontFamily="Fredoka, sans-serif"
              fontWeight={700}
              fontSize={9}
              fill={MUTED}
            >
              n={n}
            </text>
          </g>
        );
      })}
      {/* blank ? */}
      {(() => {
        const fx = x;
        x += figW(answerN) + gap;
        return (
          <g>
            <rect
              x={fx + 2}
              y={3}
              width={figW(answerN) - 4}
              height={figH - 4}
              fill={PINK_PALE}
              stroke={PINK_DEEP}
              strokeWidth={1.2}
              strokeDasharray="3 2"
              rx={3}
            />
            <text
              x={fx + figW(answerN) / 2}
              y={3 + (figH - 4) / 2 + 4}
              textAnchor="middle"
              fontFamily="Fredoka, sans-serif"
              fontWeight={800}
              fontSize={12}
              fill={MUTED}
            >
              ?
            </text>
            <text
              x={fx + figW(answerN) / 2}
              y={figH + 12}
              textAnchor="middle"
              fontFamily="Fredoka, sans-serif"
              fontWeight={700}
              fontSize={9}
              fill={MUTED}
            >
              n={answerN}
            </text>
          </g>
        );
      })()}
      {/* answer figure in pink */}
      {(() => {
        const fx = x;
        return (
          <g>
            {renderDots(answerN, fx, PINK_MID)}
            <text
              x={fx + figW(answerN) / 2}
              y={figH + 12}
              textAnchor="middle"
              fontFamily="Fredoka, sans-serif"
              fontWeight={800}
              fontSize={9}
              fill={PINK_DEEP}
            >
              answer
            </text>
          </g>
        );
      })()}
    </svg>
  );
};

/* ── MiniCoordGrid — small coordinate grid with optional point.
 * gridMin defaults to 0 (single quadrant) but accepts negative values
 * for four-quadrant plots (Y7·6). */
export const MiniCoordGrid: React.FC<{
  point?: { x: number; y: number };
  gridMin?: number;
  gridMax?: number;
  cellSize?: number;
}> = ({ point, gridMin = 0, gridMax = 6, cellSize = 16 }) => {
  const range = gridMax - gridMin;
  const m = 16;
  const size = range * cellSize;
  const W = m + size + 8;
  const H = m + size + 16;
  const X = (x: number) => m + (x - gridMin) * cellSize;
  const Y = (y: number) => m + size - (y - gridMin) * cellSize;
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      {/* grid lines */}
      {Array.from({ length: range + 1 }, (_, i) => {
        const v = gridMin + i;
        return (
          <g key={i} stroke="#9ca3af" strokeWidth={1}>
            <line x1={X(v)} y1={Y(gridMin)} x2={X(v)} y2={Y(gridMax)} />
            <line x1={X(gridMin)} y1={Y(v)} x2={X(gridMax)} y2={Y(v)} />
          </g>
        );
      })}
      {/* axes (drawn at v=0 always) */}
      <line x1={X(gridMin)} y1={Y(0)} x2={X(gridMax)} y2={Y(0)} stroke={INK} strokeWidth={1.5} />
      <line x1={X(0)} y1={Y(gridMin)} x2={X(0)} y2={Y(gridMax)} stroke={INK} strokeWidth={1.5} />
      {/* tick labels */}
      {Array.from({ length: range + 1 }, (_, i) => {
        const v = gridMin + i;
        if (v === 0) return null;
        return (
          <g key={i} fontFamily="Fredoka, sans-serif" fontSize={8} fontWeight={700} fill={MUTED}>
            <text x={X(v)} y={Y(0) + 10} textAnchor="middle">{v}</text>
            <text x={X(0) - 6} y={Y(v) + 3} textAnchor="middle">{v}</text>
          </g>
        );
      })}
      <text x={X(0) - 6} y={Y(0) + 10} fontFamily="Fredoka" fontSize={8} fontWeight={700} fill={MUTED} textAnchor="middle">0</text>
      {/* point */}
      {point && (
        <circle cx={X(point.x)} cy={Y(point.y)} r={5} fill={PINK_MID} stroke="#ffffff" strokeWidth={1.5} />
      )}
    </svg>
  );
};

/* ── MultipleChoice — prompt + expression + 3 option cards (correct
 * highlighted pink with ✓). Used by Y7·4/5/7 and Y8·4/5/8. */
export const MultipleChoice: React.FC<{
  prompt: string;
  expression?: string;
  options: { text: string; correct?: boolean }[];
  optionSize?: number;
}> = ({ prompt, expression, options, optionSize = 12 }) => (
  <div
    style={{
      display: "inline-flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 6,
      fontFamily: "Fredoka, sans-serif",
      fontWeight: 800,
    }}
  >
    <div style={{ fontSize: 12, color: MUTED }}>{prompt}</div>
    {expression && (
      <div style={{ fontSize: 18, color: INK }}>{expression}</div>
    )}
    <div style={{ display: "inline-flex", flexWrap: "wrap", gap: 6, justifyContent: "center" }}>
      {options.map((o, i) => (
        <div
          key={i}
          style={{
            position: "relative",
            padding: "5px 10px",
            borderRadius: 8,
            fontSize: optionSize,
            fontWeight: 800,
            color: o.correct ? "#ffffff" : INK,
            background: o.correct ? PINK_MID : "#ffffff",
            border: `2px solid ${PINK_DEEP}`,
          }}
        >
          {o.text}
          {o.correct && (
            <span
              style={{
                position: "absolute",
                top: -6,
                right: -6,
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: "#10b981",
                color: "#ffffff",
                fontSize: 9,
                fontWeight: 900,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1.5px solid #ffffff",
              }}
            >
              ✓
            </span>
          )}
        </div>
      ))}
    </div>
  </div>
);

/* ── InequalityLine — integer number line with a shaded ray (or arrow)
 * showing the solution set. dir is the inequality sign relative to the
 * boundary value. Closed circle for ≥/≤, open for >/<. */
export const InequalityLine: React.FC<{
  boundary: number;
  dir: "≥" | "≤" | ">" | "<";
  min?: number;
  max?: number;
  width?: number;
}> = ({ boundary, dir, min = -6, max = 6, width = 260 }) => {
  const padX = 16;
  const innerW = width - padX * 2;
  const range = max - min;
  const yLine = 28;
  const xFor = (v: number) => padX + ((v - min) / range) * innerW;
  const isClosed = dir === "≥" || dir === "≤";
  const goesRight = dir === "≥" || dir === ">";
  const bx = xFor(boundary);
  const endX = goesRight ? xFor(max) : xFor(min);
  return (
    <svg width={width} height={56} viewBox={`0 0 ${width} 56`}>
      {/* axis */}
      <line x1={padX} y1={yLine} x2={padX + innerW} y2={yLine} stroke={INK} strokeWidth={1.4} />
      <polygon points={`${padX},${yLine} ${padX + 6},${yLine - 4} ${padX + 6},${yLine + 4}`} fill={INK} />
      <polygon points={`${padX + innerW},${yLine} ${padX + innerW - 6},${yLine - 4} ${padX + innerW - 6},${yLine + 4}`} fill={INK} />
      {/* integer ticks + labels */}
      {Array.from({ length: range + 1 }, (_, i) => {
        const v = min + i;
        const x = xFor(v);
        return (
          <g key={v}>
            <line x1={x} y1={yLine - 4} x2={x} y2={yLine + 4} stroke={INK} strokeWidth={1} />
            <text x={x} y={yLine + 16} textAnchor="middle"
              fontFamily="Fredoka, sans-serif" fontSize={9} fontWeight={700}
              fill={v < 0 ? "#d97706" : INK}>
              {v}
            </text>
          </g>
        );
      })}
      {/* shaded ray */}
      <line x1={bx} y1={yLine - 5} x2={endX} y2={yLine - 5} stroke={PINK_MID} strokeWidth={4} />
      {/* arrow at far end */}
      <polygon
        points={`${endX},${yLine - 5} ${endX + (goesRight ? -7 : 7)},${yLine - 5 - 4} ${endX + (goesRight ? -7 : 7)},${yLine - 5 + 4}`}
        fill={PINK_MID}
      />
      {/* boundary circle */}
      <circle
        cx={bx}
        cy={yLine - 5}
        r={5}
        fill={isClosed ? PINK_MID : "#ffffff"}
        stroke={PINK_DEEP}
        strokeWidth={2}
      />
    </svg>
  );
};

/* ── InputOutputTable — small x|y table with optional rule caption. */
export const InputOutputTable: React.FC<{
  rows: { x: number | string; y: number | string }[];
  rule?: string;
  cellW?: number;
  cellH?: number;
}> = ({ rows, rule, cellW = 38, cellH = 22 }) => {
  const W = cellW * 2 + 4;
  const headerH = 18;
  const H = headerH + rows.length * cellH + (rule ? 16 : 4);
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      {/* headers */}
      <rect x={0} y={0} width={cellW} height={headerH} fill={PINK_SOFT} stroke={PINK_DEEP} strokeWidth={1.2} />
      <rect x={cellW} y={0} width={cellW} height={headerH} fill={PINK_SOFT} stroke={PINK_DEEP} strokeWidth={1.2} />
      <text x={cellW / 2} y={headerH - 5} textAnchor="middle" fontFamily="Fredoka" fontWeight={800} fontSize={12} fill={INK}>x</text>
      <text x={cellW + cellW / 2} y={headerH - 5} textAnchor="middle" fontFamily="Fredoka" fontWeight={800} fontSize={12} fill={INK}>y</text>
      {/* rows */}
      {rows.map((r, i) => (
        <g key={i}>
          <rect x={0} y={headerH + i * cellH} width={cellW} height={cellH} fill="#fff" stroke={PINK_DEEP} strokeWidth={1.1} />
          <rect x={cellW} y={headerH + i * cellH} width={cellW} height={cellH} fill="#fff" stroke={PINK_DEEP} strokeWidth={1.1} />
          <text x={cellW / 2} y={headerH + i * cellH + cellH / 2 + 4} textAnchor="middle" fontFamily="Fredoka" fontWeight={700} fontSize={12} fill={INK}>{r.x}</text>
          <text x={cellW + cellW / 2} y={headerH + i * cellH + cellH / 2 + 4} textAnchor="middle" fontFamily="Fredoka" fontWeight={700} fontSize={12} fill={INK}>{r.y}</text>
        </g>
      ))}
      {/* rule caption */}
      {rule && (
        <text x={W / 2} y={H - 3} textAnchor="middle" fontFamily="Fredoka" fontWeight={800} fontSize={11} fill={PINK_DEEP}>
          {rule}
        </text>
      )}
    </svg>
  );
};

/* ── OptionRow — multiple-choice option tiles. Used by solveit-style
 * pattern questions where the student picks the next/missing item
 * from a small set. Correct option is highlighted pink with a small
 * ✓ tag in the corner. */
export const OptionRow: React.FC<{
  options: { value: string; correct?: boolean }[];
  cellSize?: number;
  gap?: number;
}> = ({ options, cellSize = 28, gap = 10 }) => (
  <div style={{ display: "inline-flex", gap }}>
    {options.map((o, i) => (
      <div
        key={i}
        style={{
          position: "relative",
          width: cellSize,
          height: cellSize,
          borderRadius: 6,
          background: o.correct ? PINK_MID : "#ffffff",
          border: `2px solid ${PINK_DEEP}`,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Fredoka, sans-serif",
          fontWeight: 800,
          fontSize: cellSize * 0.55,
          color: o.correct ? "#ffffff" : INK,
        }}
      >
        {o.value}
        {o.correct && (
          <span
            style={{
              position: "absolute",
              top: -6,
              right: -6,
              width: 16,
              height: 16,
              borderRadius: "50%",
              background: "#10b981",
              color: "#ffffff",
              fontSize: 10,
              fontWeight: 900,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1.5px solid #ffffff",
            }}
          >
            ✓
          </span>
        )}
      </div>
    ))}
  </div>
);

/* ── OrdinalRow — row of items with 1st/2nd/3rd/... labels under each,
 * and one position highlighted with a pink arrow + ordinal word. */
const ORDINALS = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];
export const OrdinalRow: React.FC<{
  items: string[];
  highlightIndex: number;   // 0-based
  cellSize?: number;
  gap?: number;
}> = ({ items, highlightIndex, cellSize = 36, gap = 6 }) => {
  const totalW = items.length * cellSize + (items.length - 1) * gap;
  const labelH = 16;
  const arrowH = 14;
  const totalH = cellSize + labelH + arrowH + 6;
  return (
    <svg width={totalW} height={totalH} viewBox={`0 0 ${totalW} ${totalH}`}>
      {items.map((it, i) => {
        const x = i * (cellSize + gap);
        const isHi = i === highlightIndex;
        return (
          <g key={i}>
            <rect
              x={x}
              y={2}
              width={cellSize}
              height={cellSize}
              fill={isHi ? PINK_MID : "#ffffff"}
              stroke={PINK_DEEP}
              strokeWidth={isHi ? 2 : 1.6}
              rx={6}
            />
            <text
              x={x + cellSize / 2}
              y={2 + cellSize / 2 + cellSize * 0.18}
              textAnchor="middle"
              fontFamily="Fredoka, sans-serif"
              fontSize={cellSize * 0.55}
              fontWeight={800}
              fill={isHi ? "#ffffff" : INK}
            >
              {it}
            </text>
            {/* ordinal label below the tile */}
            <text
              x={x + cellSize / 2}
              y={2 + cellSize + labelH - 2}
              textAnchor="middle"
              fontFamily="Fredoka, sans-serif"
              fontSize={11}
              fontWeight={700}
              fill={isHi ? PINK_DEEP : MUTED}
            >
              {ORDINALS[i]}
            </text>
          </g>
        );
      })}
      {/* arrow pointing up at the highlighted cell */}
      {(() => {
        const hx = highlightIndex * (cellSize + gap) + cellSize / 2;
        const ay = 2 + cellSize + labelH;
        return (
          <polygon
            points={`${hx},${ay + 2} ${hx - 6},${ay + arrowH - 2} ${hx + 6},${ay + arrowH - 2}`}
            fill={PINK_DEEP}
          />
        );
      })()}
    </svg>
  );
};

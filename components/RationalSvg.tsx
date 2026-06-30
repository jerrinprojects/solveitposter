/* Reusable SVG fraction primitives used by every Rational poster
 * preview. Keeping the geometry centralised means every ½, ⅓, ¾
 * across all 22+ Phase-1 previews looks identical — no per-preview
 * tweaks needed.
 *
 * Color tokens match the existing pink Number Structures posters.
 */
import React from "react";

export const PINK_DEEP = "#db2777";    // pink-600 — outlines + accent text
export const PINK_MID = "#ec4899";     // pink-500 — primary fill
export const PINK_LIGHT = "#f472b6";   // pink-400 — secondary fill
export const PINK_SOFT = "#fbcfe8";    // pink-200 — borders
export const PINK_PALE = "#fce7f3";    // pink-100 — preview backgrounds
export const PINK_BG = "#fdf2f8";      // pink-50  — page bg
export const INK = "#1f2937";          // slate-800 — labels
export const MUTED = "#6b7280";

/* ── PieFraction — circle split into `den` slices, `num` filled ── */
export const PieFraction: React.FC<{
  num: number;
  den: number;
  size?: number;
  fill?: string;
  stroke?: string;
  showLabel?: boolean;
  faded?: boolean;
}> = ({ num, den, size = 80, fill = PINK_MID, stroke = INK, showLabel, faded }) => {
  const r = size / 2 - 3;
  const cx = size / 2;
  const cy = size / 2;
  const sliceAngle = (2 * Math.PI) / den;
  const slices = Array.from({ length: den }, (_, i) => {
    const a0 = -Math.PI / 2 + i * sliceAngle;
    const a1 = a0 + sliceAngle;
    const x0 = cx + r * Math.cos(a0);
    const y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1);
    const y1 = cy + r * Math.sin(a1);
    const large = sliceAngle > Math.PI ? 1 : 0;
    return { d: `M ${cx} ${cy} L ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1} Z`, filled: i < num };
  });
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}
      style={{ opacity: faded ? 0.45 : 1 }}>
      {slices.map((s, i) => (
        <path
          key={i}
          d={s.d}
          fill={s.filled ? fill : "#ffffff"}
          stroke={stroke}
          strokeWidth={2}
        />
      ))}
      {showLabel && (
        <text
          x={cx} y={cy + 4}
          textAnchor="middle"
          fontFamily="Fredoka, sans-serif"
          fontSize={size * 0.32}
          fontWeight={700}
          fill={INK}
        >
          {num}/{den}
        </text>
      )}
    </svg>
  );
};

/* ── BarFraction — horizontal bar split into `den` parts ── */
export const BarFraction: React.FC<{
  num: number;
  den: number;
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
}> = ({ num, den, width = 200, height = 36, fill = PINK_MID, stroke = PINK_DEEP }) => {
  const cellW = width / den;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {Array.from({ length: den }, (_, i) => (
        <rect
          key={i}
          x={i * cellW + 1}
          y={1}
          width={cellW - 2}
          height={height - 2}
          fill={i < num ? fill : "#ffffff"}
          stroke={stroke}
          strokeWidth={2}
        />
      ))}
    </svg>
  );
};

/* ── FractionLabel — stacked num/den with bar (½ style) ── */
export const FractionLabel: React.FC<{
  num: number | string;
  den: number | string;
  size?: number;
  color?: string;
}> = ({ num, den, size = 28, color = INK }) => (
  <span
    style={{
      display: "inline-flex",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: "Fredoka, sans-serif",
      fontWeight: 800,
      color,
      lineHeight: 1,
      verticalAlign: "middle",
    }}
  >
    <span style={{ fontSize: size }}>{num}</span>
    <span style={{
      width: `${size * 0.9}px`,
      height: 2,
      background: color,
      margin: "2px 0",
    }} />
    <span style={{ fontSize: size }}>{den}</span>
  </span>
);

/* ── NumberLine 0–1 with optional marks ── */
export const NumberLine: React.FC<{
  width?: number;
  height?: number;
  marks?: {
    pos: number;
    label?: string;
    /* Optional stacked fraction label — when set, takes priority over
     * `label` and renders num/den as a proper stacked fraction. */
    fraction?: { num: number; den: number };
  }[];
  highlight?: number; // pos 0..1 to circle
  divisions?: number; // tick count
  hideEndpoints?: boolean;
  labelSize?: number;
}> = ({ width = 280, height = 56, marks = [], highlight, divisions = 0, hideEndpoints, labelSize = 11 }) => {
  const padX = 18;
  const usable = width - padX * 2;
  const baseY = height - 18;
  const x = (pos: number) => padX + pos * usable;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <line x1={padX} x2={width - padX} y1={baseY} y2={baseY} stroke={INK} strokeWidth={2} />
      {/* arrowheads */}
      <polygon points={`${padX},${baseY} ${padX + 6},${baseY - 4} ${padX + 6},${baseY + 4}`} fill={INK} />
      <polygon points={`${width - padX},${baseY} ${width - padX - 6},${baseY - 4} ${width - padX - 6},${baseY + 4}`} fill={INK} />
      {/* 0 and 1 — optional */}
      {!hideEndpoints && (
        <>
          <text x={x(0)} y={baseY + 14} textAnchor="middle" fontFamily="Fredoka, sans-serif" fontSize={12} fontWeight={700} fill={INK}>0</text>
          <text x={x(1)} y={baseY + 14} textAnchor="middle" fontFamily="Fredoka, sans-serif" fontSize={12} fontWeight={700} fill={INK}>1</text>
        </>
      )}
      {/* division ticks */}
      {divisions > 0 && Array.from({ length: divisions + 1 }, (_, i) => (
        <line key={`d-${i}`} x1={x(i / divisions)} x2={x(i / divisions)} y1={baseY - 5} y2={baseY + 5} stroke={INK} strokeWidth={1.5} />
      ))}
      {/* marks */}
      {marks.map((m, i) => (
        <g key={i}>
          <line x1={x(m.pos)} x2={x(m.pos)} y1={baseY - 10} y2={baseY + 6} stroke={PINK_MID} strokeWidth={2.5} />
          {m.fraction ? (
            <foreignObject
              x={x(m.pos) - 16}
              y={baseY - 40}
              width={32}
              height={28}
            >
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: "100%", height: "100%",
              }}>
                <FractionLabel num={m.fraction.num} den={m.fraction.den}
                  size={labelSize} color={PINK_DEEP} />
              </div>
            </foreignObject>
          ) : m.label ? (
            <text x={x(m.pos)} y={baseY - 14} textAnchor="middle" fontFamily="Fredoka, sans-serif" fontSize={labelSize} fontWeight={700} fill={PINK_DEEP}>
              {m.label}
            </text>
          ) : null}
        </g>
      ))}
      {/* highlight circle */}
      {highlight !== undefined && (
        <circle cx={x(highlight)} cy={baseY} r={8} fill="none" stroke={PINK_DEEP} strokeWidth={2.5} />
      )}
    </svg>
  );
};

/* ── GroupShare — total items split into equal groups
 * highlightGroup: single group index (0-based), or -1 for all.
 * highlightCount: shade the first N groups (overrides highlightGroup). ── */
export const GroupShare: React.FC<{
  total: number;
  groups: number;
  dotSize?: number;
  highlightGroup?: number;
  highlightCount?: number;
  fill?: string;
  stroke?: string;
  boxed?: boolean; // draw a rounded box around each group (clearer split)
}> = ({
  total, groups,
  dotSize = 12,
  highlightGroup = -1,
  highlightCount,
  fill = PINK_MID,
  stroke = PINK_DEEP,
  boxed = false,
}) => {
  const per = Math.floor(total / groups);
  const dotGap = 4;
  const pad = boxed ? 7 : 0;
  const gap = boxed ? 12 : 14;
  const groupW = per * dotSize + (per - 1) * dotGap;
  const boxW = groupW + 2 * pad;
  const totalW = groups * boxW + (groups - 1) * gap;
  const h = dotSize + (boxed ? 2 * pad : 8);
  return (
    <svg width={totalW} height={h} viewBox={`0 0 ${totalW} ${h}`}>
      {Array.from({ length: groups }, (_, gi) => {
        const boxX = gi * (boxW + gap);
        const baseX = boxX + pad;
        const isHi =
          highlightCount !== undefined ? gi < highlightCount :
          highlightGroup === -1 || highlightGroup === gi;
        return (
          <g key={gi}>
            {boxed && (
              <rect
                x={boxX} y={0} width={boxW} height={h} rx={8}
                fill="#fff0f6" stroke="#f9a8d4" strokeWidth={1.4}
              />
            )}
            {Array.from({ length: per }, (_, di) => (
              <circle
                key={di}
                cx={baseX + di * (dotSize + dotGap) + dotSize / 2}
                cy={h / 2}
                r={dotSize / 2}
                fill={isHi ? fill : "#fff"}
                stroke={stroke}
                strokeWidth={2}
              />
            ))}
          </g>
        );
      })}
    </svg>
  );
};

/* ── EqualsArrow — small arrow between two visuals ── */
export const EqualsArrow: React.FC<{ symbol?: string }> = ({ symbol = "=" }) => (
  <span
    style={{
      fontFamily: "Fredoka, sans-serif",
      fontWeight: 800,
      fontSize: 28,
      color: PINK_DEEP,
      padding: "0 8px",
    }}
  >
    {symbol}
  </span>
);

/* ── TenthsStrip — 10-cell horizontal strip, k cells shaded ── */
export const TenthsStrip: React.FC<{
  shaded: number; // 0..10
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
}> = ({ shaded, width = 220, height = 30, fill = PINK_MID, stroke = PINK_DEEP }) => {
  const cellW = width / 10;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {Array.from({ length: 10 }, (_, i) => (
        <rect
          key={i}
          x={i * cellW + 1}
          y={1}
          width={cellW - 2}
          height={height - 2}
          fill={i < shaded ? fill : "#ffffff"}
          stroke={stroke}
          strokeWidth={1.5}
        />
      ))}
    </svg>
  );
};

/* ── DecimalGrid — 10×10 grid, k cells shaded (hundredths) ── */
export const DecimalGrid: React.FC<{
  shaded: number; // 0..100
  size?: number;
  fill?: string;
  stroke?: string;
}> = ({ shaded, size = 100, fill = PINK_MID, stroke = PINK_DEEP }) => {
  const cellSize = (size - 2) / 10;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {Array.from({ length: 100 }, (_, i) => {
        const row = Math.floor(i / 10);
        const col = i % 10;
        return (
          <rect
            key={i}
            x={1 + col * cellSize}
            y={1 + row * cellSize}
            width={cellSize}
            height={cellSize}
            fill={i < shaded ? fill : "#ffffff"}
            stroke={stroke}
            strokeWidth={0.6}
          />
        );
      })}
      <rect x={1} y={1} width={size - 2} height={size - 2}
        fill="none" stroke={stroke} strokeWidth={1.8} />
    </svg>
  );
};

/* ── DecimalNumberLine — 0–1 with decimal marks ── */
export const DecimalNumberLine: React.FC<{
  width?: number;
  height?: number;
  marks?: { pos: number; label: string }[];
  divisions?: number;
}> = ({ width = 280, height = 56, marks = [], divisions = 10 }) => {
  const padX = 14;
  const usable = width - padX * 2;
  const baseY = height - 18;
  const x = (pos: number) => padX + pos * usable;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <line x1={padX} x2={width - padX} y1={baseY} y2={baseY}
        stroke={INK} strokeWidth={2} />
      <polygon points={`${padX},${baseY} ${padX + 6},${baseY - 4} ${padX + 6},${baseY + 4}`} fill={INK} />
      <polygon points={`${width - padX},${baseY} ${width - padX - 6},${baseY - 4} ${width - padX - 6},${baseY + 4}`} fill={INK} />
      <text x={x(0)} y={baseY + 14} textAnchor="middle"
        fontFamily="Fredoka, sans-serif" fontSize={11} fontWeight={700} fill={INK}>0</text>
      <text x={x(1)} y={baseY + 14} textAnchor="middle"
        fontFamily="Fredoka, sans-serif" fontSize={11} fontWeight={700} fill={INK}>1</text>
      {Array.from({ length: divisions + 1 }, (_, i) => (
        <line key={i} x1={x(i / divisions)} x2={x(i / divisions)}
          y1={baseY - 4} y2={baseY + 4} stroke={INK} strokeWidth={1.2} />
      ))}
      {marks.map((m, i) => (
        <g key={i}>
          <line x1={x(m.pos)} x2={x(m.pos)} y1={baseY - 10} y2={baseY + 6}
            stroke={PINK_MID} strokeWidth={2.5} />
          <text x={x(m.pos)} y={baseY - 14} textAnchor="middle"
            fontFamily="Fredoka, sans-serif" fontSize={10} fontWeight={700} fill={PINK_DEEP}>
            {m.label}
          </text>
        </g>
      ))}
    </svg>
  );
};

/* ── PercentBar — single bar with exact % fill + 10% reference ticks.
 * Smooth fill (not segment-snapped) so any percent (25%, 35%, …) lines
 * up with the verbal answer in the caption. ── */
export const PercentBar: React.FC<{
  percent: number; // 0..100, any value
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
  showTicks?: boolean; // default true — 10% reference dividers
}> = ({
  percent, width = 220, height = 26,
  fill = PINK_MID, stroke = PINK_DEEP, showTicks = true,
}) => {
  const innerW = width - 2;
  const fillW = innerW * (Math.max(0, Math.min(100, percent)) / 100);
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <rect x={1} y={1} width={innerW} height={height - 2}
        fill="#ffffff" stroke={stroke} strokeWidth={1.8} />
      <rect x={1} y={1} width={fillW} height={height - 2} fill={fill} />
      {showTicks && Array.from({ length: 9 }, (_, i) => (
        <line
          key={i}
          x1={1 + innerW * ((i + 1) / 10)}
          x2={1 + innerW * ((i + 1) / 10)}
          y1={1}
          y2={height - 1}
          stroke={stroke}
          strokeWidth={0.7}
          opacity={0.65}
        />
      ))}
    </svg>
  );
};

/* ── RatioBar — two-color bar (e.g. 2:3 red:blue) ── */
export const RatioBar: React.FC<{
  a: number;
  b: number;
  cellSize?: number;
  height?: number;
  fillA?: string;
  fillB?: string;
  stroke?: string;
}> = ({
  a, b,
  cellSize = 22,
  height = 28,
  fillA = "#f472b6",  // pink
  fillB = "#60a5fa",  // blue
  stroke = PINK_DEEP,
}) => {
  const total = a + b;
  const width = total * cellSize;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {Array.from({ length: total }, (_, i) => (
        <rect
          key={i}
          x={i * cellSize + 1}
          y={1}
          width={cellSize - 2}
          height={height - 2}
          fill={i < a ? fillA : fillB}
          stroke={stroke}
          strokeWidth={1.5}
        />
      ))}
    </svg>
  );
};

/* ── MixedNumberVis — whole pies + a fractional pie ── */
export const MixedNumberVis: React.FC<{
  wholes: number;
  num: number;
  den: number;
  pieSize?: number;
}> = ({ wholes, num, den, pieSize = 46 }) => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
    {Array.from({ length: wholes }, (_, i) => (
      <PieFraction key={i} num={den} den={den} size={pieSize} />
    ))}
    <PieFraction num={num} den={den} size={pieSize} />
  </div>
);

/* ── SimplifyVisual — explicitly shows ÷n applied to BOTH top and
 * bottom of a fraction, then the simplified result. Used by 4.1, 5.1,
 * 6.1 so students can see why simplifying preserves the value. ── */
export const SimplifyVisual: React.FC<{
  num: number;
  den: number;
  divBy: number;
  simpNum: number;
  simpDen: number;
  size?: number;
}> = ({ num, den, divBy, simpNum, simpDen, size = 22 }) => {
  const barW = size * 1.2;
  const divLabel = (
    <span
      style={{
        fontFamily: "Fredoka, sans-serif",
        fontWeight: 800,
        fontSize: size * 0.62,
        color: PINK_DEEP,
        marginLeft: 5,
        background: "#fff",
        border: `1.5px solid ${PINK_SOFT}`,
        borderRadius: 6,
        padding: "1px 6px",
        lineHeight: 1,
      }}
    >
      {`÷${divBy}`}
    </span>
  );
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      <span
        style={{
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "flex-start",
          fontFamily: "Fredoka, sans-serif",
          fontWeight: 800,
          color: INK,
          lineHeight: 1,
        }}
      >
        <span style={{ display: "inline-flex", alignItems: "center" }}>
          <span style={{ fontSize: size, minWidth: barW, textAlign: "center" }}>{num}</span>
          {divLabel}
        </span>
        <span
          style={{
            width: barW,
            height: 2,
            background: INK,
            margin: "3px 0",
          }}
        />
        <span style={{ display: "inline-flex", alignItems: "center" }}>
          <span style={{ fontSize: size, minWidth: barW, textAlign: "center" }}>{den}</span>
          {divLabel}
        </span>
      </span>
      <svg width={34} height={14} viewBox="0 0 34 14">
        <line x1={3} y1={7} x2={26} y2={7} stroke={PINK_DEEP} strokeWidth={2.5} />
        <polygon points="32,7 26,3 26,11" fill={PINK_DEEP} />
      </svg>
      <FractionLabel num={simpNum} den={simpDen} size={size} color={PINK_DEEP} />
    </span>
  );
};

/* ── SimplifyArrow — A/B (÷n)→ C/D, used for simplifying ── */
export const SimplifyArrow: React.FC<{
  divBy: number;
  width?: number;
}> = ({ divBy, width = 56 }) => (
  <span
    style={{
      display: "inline-flex",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: "Fredoka, sans-serif",
      fontSize: 13,
      fontWeight: 800,
      color: PINK_DEEP,
      minWidth: width,
    }}
  >
    <span>{`÷${divBy}`}</span>
    <svg width={width} height={14} viewBox={`0 0 ${width} 14`}>
      <line x1={2} y1={7} x2={width - 8} y2={7} stroke={PINK_DEEP} strokeWidth={2} />
      <polygon
        points={`${width - 2},7 ${width - 8},3 ${width - 8},11`}
        fill={PINK_DEEP}
      />
    </svg>
  </span>
);

/* ── ScaleArrow — × n or ÷ n with optional value pair ── */
export const ScaleArrow: React.FC<{
  op: "×" | "÷";
  by: number;
  width?: number;
}> = ({ op, by, width = 60 }) => (
  <span
    style={{
      display: "inline-flex",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: "Fredoka, sans-serif",
      fontSize: 12,
      fontWeight: 800,
      color: PINK_DEEP,
      minWidth: width,
    }}
  >
    <span>{op}{by}</span>
    <svg width={width} height={14} viewBox={`0 0 ${width} 14`}>
      <line x1={2} y1={7} x2={width - 8} y2={7} stroke={PINK_DEEP} strokeWidth={2.5} />
      <polygon
        points={`${width - 2},7 ${width - 8},3 ${width - 8},11`}
        fill={PINK_DEEP}
      />
    </svg>
  </span>
);

/* ── OpsBlock — a calc card showing "0.3 + 0.4 = 0.7" etc ── */
export const OpsBlock: React.FC<{
  children: React.ReactNode;
  size?: number;
}> = ({ children, size = 22 }) => (
  <div
    style={{
      background: "#fff",
      border: `2px solid ${PINK_SOFT}`,
      borderRadius: 12,
      padding: "10px 18px",
      fontFamily: "Fredoka, sans-serif",
      fontWeight: 800,
      fontSize: size,
      color: INK,
      letterSpacing: "0.01em",
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
    }}
  >
    {children}
  </div>
);

/* ── CompareSymbol — large > < = chip ── */
export const CompareSymbol: React.FC<{
  symbol: "<" | ">" | "=";
  size?: number;
}> = ({ symbol, size = 32 }) => (
  <span
    style={{
      fontFamily: "Fredoka, sans-serif",
      fontWeight: 800,
      fontSize: size,
      color: PINK_DEEP,
      padding: "0 6px",
    }}
  >
    {symbol}
  </span>
);

/* ── FractionMultGrid — area model for fraction × fraction (a/b × c/d).
 * Draws a rectangle split into d columns × b rows. The "overlap"
 * region (first c columns × first a rows) is double-shaded to show
 * the product (a×c) / (b×d). Used by 8.9. ── */
export const FractionMultGrid: React.FC<{
  aNum: number; aDen: number;  // first fraction (rows)
  bNum: number; bDen: number;  // second fraction (columns)
  size?: number;
}> = ({ aNum, aDen, bNum, bDen, size = 110 }) => {
  const colW = (size - 2) / bDen;
  const rowH = (size - 2) / aDen;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* horizontal-fraction shading (first bNum columns, all rows) */}
      <rect x={1} y={1} width={colW * bNum} height={size - 2}
        fill={PINK_PALE} opacity={0.55} />
      {/* vertical-fraction shading (all columns, first aNum rows) */}
      <rect x={1} y={1} width={size - 2} height={rowH * aNum}
        fill={PINK_PALE} opacity={0.55} />
      {/* overlap (both): solid pink */}
      <rect x={1} y={1} width={colW * bNum} height={rowH * aNum}
        fill={PINK_MID} opacity={0.85} />
      {/* gridlines */}
      {Array.from({ length: bDen + 1 }, (_, i) => (
        <line key={`c${i}`} x1={1 + i * colW} x2={1 + i * colW}
          y1={1} y2={size - 1} stroke={PINK_DEEP} strokeWidth={1} />
      ))}
      {Array.from({ length: aDen + 1 }, (_, i) => (
        <line key={`r${i}`} x1={1} x2={size - 1}
          y1={1 + i * rowH} y2={1 + i * rowH} stroke={PINK_DEEP} strokeWidth={1} />
      ))}
    </svg>
  );
};

/* ── DivByUnitFraction — "N ÷ 1/k = N×k" — N bars each split into k
 * pieces. Used by 7.13. ── */
export const DivByUnitFraction: React.FC<{
  whole: number;       // how many wholes
  splitInto: number;   // k (denominator of unit fraction)
  cellSize?: number;
}> = ({ whole, splitInto, cellSize = 22 }) => {
  const totalW = whole * (cellSize * splitInto) + (whole - 1) * 6;
  const h = cellSize + 4;
  return (
    <svg width={totalW} height={h} viewBox={`0 0 ${totalW} ${h}`}>
      {Array.from({ length: whole }, (_, w) => {
        const baseX = w * (cellSize * splitInto + 6);
        return (
          <g key={w}>
            <rect x={baseX + 1} y={1}
              width={cellSize * splitInto - 1} height={h - 2}
              fill="#fff" stroke={PINK_DEEP} strokeWidth={1.8} />
            {Array.from({ length: splitInto }, (_, k) => (
              <rect key={k}
                x={baseX + k * cellSize + 1} y={1}
                width={cellSize - 1} height={h - 2}
                fill={k === 0 ? PINK_MID : PINK_PALE}
                stroke={PINK_DEEP} strokeWidth={1} />
            ))}
          </g>
        );
      })}
    </svg>
  );
};

/* ── FractionDivByWhole — "1/n ÷ k = 1/(n×k)". Shows the 1/n bar
 * split into k smaller parts. Used by 7.12. ── */
export const FractionDivByWhole: React.FC<{
  num: number; den: number;
  divBy: number;
  width?: number;
  height?: number;
}> = ({ num, den, divBy, width = 200, height = 28 }) => {
  const cellW = width / den;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {Array.from({ length: den }, (_, i) => {
        const filled = i < num;
        return (
          <g key={i}>
            <rect
              x={i * cellW + 1} y={1}
              width={cellW - 2} height={height - 2}
              fill={filled ? PINK_MID : "#ffffff"}
              stroke={PINK_DEEP} strokeWidth={1.5}
            />
            {/* dashed sub-divisions on filled cells */}
            {filled &&
              Array.from({ length: divBy - 1 }, (_, k) => (
                <line key={k}
                  x1={i * cellW + ((k + 1) * cellW) / divBy}
                  x2={i * cellW + ((k + 1) * cellW) / divBy}
                  y1={3} y2={height - 3}
                  stroke="#fff" strokeWidth={1.5} strokeDasharray="3 2"
                />
              ))}
          </g>
        );
      })}
    </svg>
  );
};

/* ── LCDFractions — show two unlike fractions converted to the common
 * denominator. Used by 7.7 and 7.14. Renders three bars stacked:
 * a/b → a·k/lcd, c/d → c·j/lcd, then sum bar. ── */
export const LCDFractions: React.FC<{
  aNum: number; aDen: number;
  bNum: number; bDen: number;
  lcd: number;
  width?: number;
  height?: number;
}> = ({ aNum, aDen, bNum, bDen, lcd, width = 220, height = 22 }) => {
  const kA = lcd / aDen;
  const kB = lcd / bDen;
  const sumNum = aNum * kA + bNum * kB;
  return (
    <div style={{ display: "inline-flex", flexDirection: "column", gap: 4, alignItems: "center" }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
        <BarFraction num={aNum * kA} den={lcd} width={width} height={height} />
        <FractionLabel num={aNum * kA} den={lcd} size={12} color={PINK_DEEP} />
      </div>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
        <BarFraction num={bNum * kB} den={lcd} width={width} height={height} />
        <FractionLabel num={bNum * kB} den={lcd} size={12} color={PINK_DEEP} />
      </div>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
        <BarFraction num={sumNum} den={lcd} width={width} height={height} fill={PINK_DEEP} />
        <FractionLabel num={sumNum} den={lcd} size={12} color={PINK_DEEP} />
      </div>
    </div>
  );
};

/* ── ThousandthsBar — compact representation of thousandths (m/1000).
 * 10 segments × 10 sub-cells × 10 strokes; we draw 10 segs × 100 cells
 * scaled down so the value is readable. ── */
export const ThousandthsBar: React.FC<{
  shaded: number;    // 0..1000
  width?: number;
  height?: number;
  showTicks?: boolean; // default true — tenths dividers
}> = ({ shaded, width = 240, height = 22, showTicks = true }) => {
  const innerW = width - 2;
  const fillW = (innerW * Math.max(0, Math.min(1000, shaded))) / 1000;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <rect x={1} y={1} width={innerW} height={height - 2}
        fill="#ffffff" stroke={PINK_DEEP} strokeWidth={1.8} />
      <rect x={1} y={1} width={fillW} height={height - 2} fill={PINK_MID} />
      {showTicks && Array.from({ length: 9 }, (_, i) => (
        <line key={`t${i}`}
          x1={1 + innerW * ((i + 1) / 10)}
          x2={1 + innerW * ((i + 1) / 10)}
          y1={1} y2={height - 1}
          stroke={PINK_DEEP} strokeWidth={1.1} opacity={0.7}
        />
      ))}
    </svg>
  );
};

/* ── IntegerNumberLine — number line that spans negative and positive
 * integers, with optional arc jump from `from` to `to`. Used by Year
 * Operations 6.14 (subtraction crossing 0 into negatives). */
export const IntegerNumberLine: React.FC<{
  min?: number;
  max?: number;
  from?: number;       // arc start (omit to skip arc)
  to?: number;         // arc end
  width?: number;
}> = ({ min = -5, max = 8, from, to, width = 300 }) => {
  const padX = 16;
  const innerW = width - padX * 2;
  const yLine = 38;
  const range = max - min;
  const xFor = (v: number) => padX + ((v - min) / range) * innerW;
  return (
    <svg width={width} height={64} viewBox={`0 0 ${width} 64`}>
      <line x1={padX} y1={yLine} x2={padX + innerW} y2={yLine} stroke={PINK_DEEP} strokeWidth={1.6} />
      {/* arrowheads on both ends */}
      <polygon points={`${padX},${yLine} ${padX + 6},${yLine - 4} ${padX + 6},${yLine + 4}`} fill={PINK_DEEP} />
      <polygon points={`${padX + innerW},${yLine} ${padX + innerW - 6},${yLine - 4} ${padX + innerW - 6},${yLine + 4}`} fill={PINK_DEEP} />
      {/* integer ticks + labels */}
      {Array.from({ length: range + 1 }, (_, i) => {
        const v = min + i;
        const x = xFor(v);
        const isZero = v === 0;
        const isNeg = v < 0;
        return (
          <g key={v}>
            <line
              x1={x} x2={x}
              y1={yLine - (isZero ? 6 : 4)}
              y2={yLine + (isZero ? 6 : 4)}
              stroke={isZero ? PINK_DEEP : PINK_DEEP}
              strokeWidth={isZero ? 2 : 1.2}
            />
            <text
              x={x}
              y={yLine + 18}
              fontFamily="Nunito, sans-serif"
              fontSize={10}
              fontWeight={isZero ? 800 : 700}
              fill={isNeg ? "#d97706" : INK}
              textAnchor="middle"
            >
              {v}
            </text>
          </g>
        );
      })}
      {/* optional jump arc (from → to, arcing above the line) */}
      {from !== undefined && to !== undefined && (
        <g>
          {(() => {
            const x1 = xFor(from);
            const x2 = xFor(to);
            const mid = (x1 + x2) / 2;
            const span = Math.abs(x2 - x1);
            const ry = Math.min(span * 0.4, 24);
            const sweep = to < from ? 0 : 1; // arc above either way
            return (
              <>
                <path
                  d={`M ${x1} ${yLine - 1} A ${span / 2} ${ry} 0 0 ${sweep} ${x2} ${yLine - 1}`}
                  fill="none"
                  stroke={PINK_MID}
                  strokeWidth={1.8}
                />
                {/* arrowhead on the end of the arc */}
                <circle cx={x2} cy={yLine - 1} r={3} fill={PINK_MID} />
                <text
                  x={mid}
                  y={yLine - ry - 2}
                  fontFamily="Nunito, sans-serif"
                  fontSize={10}
                  fontWeight={700}
                  fill={PINK_DEEP}
                  textAnchor="middle"
                >
                  {to < from ? `− ${from - to}` : `+ ${to - from}`}
                </text>
              </>
            );
          })()}
        </g>
      )}
    </svg>
  );
};

/* ── TenFrame — classic 2×5 grid for early number sense.
 * Pass groupA + groupB to show two-colour combinations (e.g. "3 pink
 * + 4 amber = 7"); leave groupB undefined for a single-colour fill.
 * Used by the Year Operations Y0–Y3 posters. */
export const TenFrame: React.FC<{
  groupA: number;          // count filled in colour A (first)
  groupB?: number;         // count filled in colour B (after A)
  cellSize?: number;
  fillA?: string;
  fillB?: string;
  stroke?: string;
}> = ({
  groupA,
  groupB = 0,
  cellSize = 24,
  fillA = PINK_MID,
  fillB = "#fbbf24", // amber-400
  stroke = PINK_DEEP,
}) => {
  const w = cellSize * 5 + 2;
  const h = cellSize * 2 + 2;
  const a = Math.max(0, Math.min(10, groupA));
  const b = Math.max(0, Math.min(10 - a, groupB));
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      {Array.from({ length: 10 }, (_, i) => {
        const col = i % 5;
        const row = Math.floor(i / 5);
        const x = 1 + col * cellSize;
        const y = 1 + row * cellSize;
        const isA = i < a;
        const isB = !isA && i < a + b;
        return (
          <g key={i}>
            <rect
              x={x} y={y}
              width={cellSize} height={cellSize}
              fill="#fff"
              stroke={stroke}
              strokeWidth={1.5}
            />
            {(isA || isB) && (
              <circle
                cx={x + cellSize / 2}
                cy={y + cellSize / 2}
                r={cellSize * 0.34}
                fill={isA ? fillA : fillB}
                stroke={stroke}
                strokeWidth={1.2}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
};

const AMBER_DEEP_LOCAL = "#d97706";

/* ── PVBlocks — base-10 place value blocks (hundreds-flat / tens-rod /
 * ones-cube). Used by Year Operations Y2–Y3 posters. */
export const PVBlocks: React.FC<{
  hundreds?: number;
  tens?: number;
  ones?: number;
  unit?: number;
  gap?: number;
  colorH?: string;
  colorT?: string;
  colorO?: string;
}> = ({
  hundreds = 0,
  tens = 0,
  ones = 0,
  unit = 7,
  gap = 8,
  colorH = "#fce7f3",
  colorT = PINK_SOFT,
  colorO = PINK_MID,
}) => {
  const hSize = unit * 10;
  const tWidth = unit;
  const tHeight = unit * 10;
  const hPart = hundreds > 0 ? hundreds * (hSize + 2) + gap : 0;
  const tPart = tens > 0 ? tens * (tWidth + 2) + gap : 0;
  const onesRows = ones > 5 ? 2 : (ones > 0 ? 1 : 0);
  const onesCols = ones > 0 ? Math.min(ones, 5) : 0;
  const onesPart = ones > 0 ? onesCols * (unit + 2) : 0;
  const totalW = hPart + tPart + onesPart + 4;
  const totalH = tHeight + 2;
  const xH = 2;
  const xT = xH + hPart;
  const xO = xT + tPart;
  return (
    <svg width={totalW} height={totalH} viewBox={`0 0 ${totalW} ${totalH}`}>
      {Array.from({ length: hundreds }, (_, i) => {
        const gx = xH + i * (hSize + 2);
        return (
          <g key={`h${i}`}>
            <rect x={gx} y={1} width={hSize} height={hSize} fill={colorH} stroke={PINK_DEEP} strokeWidth={1.3} />
            {Array.from({ length: 9 }, (_, k) => (
              <g key={k} stroke={PINK_DEEP} strokeOpacity={0.35} strokeWidth={0.5}>
                <line x1={gx + (k + 1) * unit} y1={1} x2={gx + (k + 1) * unit} y2={1 + hSize} />
                <line x1={gx} y1={1 + (k + 1) * unit} x2={gx + hSize} y2={1 + (k + 1) * unit} />
              </g>
            ))}
          </g>
        );
      })}
      {Array.from({ length: tens }, (_, i) => {
        const gx = xT + i * (tWidth + 2);
        return (
          <g key={`t${i}`}>
            <rect x={gx} y={1} width={tWidth} height={tHeight} fill={colorT} stroke={PINK_DEEP} strokeWidth={1.1} />
            {Array.from({ length: 9 }, (_, k) => (
              <line
                key={k}
                x1={gx} y1={1 + (k + 1) * unit}
                x2={gx + tWidth} y2={1 + (k + 1) * unit}
                stroke={PINK_DEEP} strokeOpacity={0.5} strokeWidth={0.5}
              />
            ))}
          </g>
        );
      })}
      {Array.from({ length: ones }, (_, i) => {
        const col = i % 5;
        const row = Math.floor(i / 5);
        const gx = xO + col * (unit + 2);
        const gy = 1 + tHeight - (onesRows - row) * (unit + 2);
        return (
          <rect
            key={`o${i}`}
            x={gx}
            y={gy}
            width={unit}
            height={unit}
            fill={colorO}
            stroke={PINK_DEEP}
            strokeWidth={0.9}
          />
        );
      })}
    </svg>
  );
};

/* ── ColumnMini — small column-arithmetic display.
 * a/b/result as strings (will be space-padded to the same width).
 * carries[] and borrows[] are optional annotation rows above. */
export const ColumnMini: React.FC<{
  a: string;
  b: string;
  result: string;
  op: "+" | "−" | "×";
  carries?: string;       // e.g. " 1 " — same length as result; spaces hide cells
  borrows?: string;       // shown above operand a, same length
  digitSize?: number;
}> = ({ a, b, result, op, carries, borrows, digitSize = 18 }) => {
  const cols = Math.max(a.length, b.length, result.length);
  const colW = digitSize * 0.9;
  const padL = digitSize * 1.2;
  const w = padL + cols * colW + 8;
  const rowH = digitSize * 1.08;
  const headerH = (carries || borrows) ? digitSize * 0.75 : 0;
  const h = headerH + rowH * 3 + 6;
  const pad = (s: string) => s.padStart(cols, " ");
  const aP = pad(a);
  const bP = pad(b);
  const rP = pad(result);
  const cP = carries ? pad(carries) : "";
  const bwP = borrows ? pad(borrows) : "";
  const xForCol = (i: number) => padL + i * colW + colW / 2;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      {carries && (
        <g fontFamily="Nunito, sans-serif" fontWeight={700}
           fontSize={digitSize * 0.55} textAnchor="middle" fill={AMBER_DEEP_LOCAL}>
          {cP.split("").map((ch, i) =>
            ch !== " " ? <text key={i} x={xForCol(i)} y={headerH - 2}>{ch}</text> : null,
          )}
        </g>
      )}
      {borrows && (
        <g fontFamily="Nunito, sans-serif" fontWeight={700}
           fontSize={digitSize * 0.55} textAnchor="middle" fill={AMBER_DEEP_LOCAL}>
          {bwP.split("").map((ch, i) =>
            ch !== " " ? <text key={i} x={xForCol(i)} y={headerH - 2}>{ch}</text> : null,
          )}
        </g>
      )}
      <g fontFamily="Nunito, sans-serif" fontWeight={800}
         fontSize={digitSize} textAnchor="middle" fill={INK}>
        {aP.split("").map((ch, i) => (
          <text key={i} x={xForCol(i)} y={headerH + rowH}>{ch}</text>
        ))}
      </g>
      <text x={padL - colW * 0.6} y={headerH + rowH * 2}
        fontFamily="Nunito, sans-serif" fontWeight={800}
        fontSize={digitSize} textAnchor="middle" fill={MUTED}>{op}</text>
      <g fontFamily="Nunito, sans-serif" fontWeight={800}
         fontSize={digitSize} textAnchor="middle" fill={INK}>
        {bP.split("").map((ch, i) => (
          <text key={i} x={xForCol(i)} y={headerH + rowH * 2}>{ch}</text>
        ))}
      </g>
      <line
        x1={padL - colW * 0.6}
        y1={headerH + rowH * 2 + 5}
        x2={w - 4}
        y2={headerH + rowH * 2 + 5}
        stroke={PINK_DEEP} strokeWidth={1.6}
      />
      <g fontFamily="Nunito, sans-serif" fontWeight={900}
         fontSize={digitSize} textAnchor="middle" fill={PINK_DEEP}>
        {rP.split("").map((ch, i) => (
          <text key={i} x={xForCol(i)} y={headerH + rowH * 3 + 2}>{ch}</text>
        ))}
      </g>
    </svg>
  );
};

/* ── SkipCount — number line with arc jumps (skip-counting / × facts). */
export const SkipCount: React.FC<{
  start?: number;
  step: number;
  jumps: number;
  width?: number;
  labelSize?: number;
}> = ({ start = 0, step, jumps, width = 280, labelSize = 11 }) => {
  const padX = 18;
  const innerW = width - padX * 2;
  const yLine = 36;
  return (
    <svg width={width} height={62} viewBox={`0 0 ${width} 62`}>
      <line x1={padX} y1={yLine} x2={padX + innerW} y2={yLine} stroke={PINK_DEEP} strokeWidth={1.6} />
      <polygon
        points={`${padX + innerW},${yLine} ${padX + innerW - 6},${yLine - 4} ${padX + innerW - 6},${yLine + 4}`}
        fill={PINK_DEEP}
      />
      {Array.from({ length: jumps + 1 }, (_, i) => {
        const x = padX + (i / jumps) * innerW;
        const v = start + i * step;
        return (
          <g key={i}>
            <line x1={x} y1={yLine - 4} x2={x} y2={yLine + 4} stroke={PINK_DEEP} strokeWidth={1.4} />
            <text x={x} y={yLine + 16}
              fontFamily="Nunito, sans-serif" fontSize={labelSize}
              fontWeight={700} fill={INK} textAnchor="middle">{v}</text>
          </g>
        );
      })}
      {Array.from({ length: jumps }, (_, i) => {
        const x1 = padX + (i / jumps) * innerW;
        const x2 = padX + ((i + 1) / jumps) * innerW;
        const mid = (x1 + x2) / 2;
        const r = (x2 - x1) / 2;
        return (
          <g key={i}>
            <path
              d={`M ${x1} ${yLine} A ${r} ${r * 0.85} 0 0 1 ${x2} ${yLine}`}
              fill="none" stroke={AMBER_DEEP_LOCAL} strokeWidth={1.6}
            />
            <text x={mid} y={yLine - r * 0.6 - 2}
              fontFamily="Nunito, sans-serif" fontSize={labelSize - 1}
              fontWeight={700} fill={AMBER_DEEP_LOCAL} textAnchor="middle">+{step}</text>
          </g>
        );
      })}
    </svg>
  );
};

/* ── DotArray — rows × cols array (multiplication facts). */
export const DotArray: React.FC<{
  rows: number;
  cols: number;
  dotSize?: number;
  gap?: number;
  fill?: string;
  stroke?: string;
}> = ({ rows, cols, dotSize = 12, gap = 4, fill = PINK_MID, stroke = PINK_DEEP }) => {
  const w = cols * (dotSize + gap) + 2;
  const h = rows * (dotSize + gap) + 2;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      {Array.from({ length: rows * cols }, (_, i) => {
        const r = Math.floor(i / cols);
        const c = i % cols;
        return (
          <circle
            key={i}
            cx={1 + c * (dotSize + gap) + dotSize / 2}
            cy={1 + r * (dotSize + gap) + dotSize / 2}
            r={dotSize / 2}
            fill={fill}
            stroke={stroke}
            strokeWidth={1.2}
          />
        );
      })}
    </svg>
  );
};

/* ── PVTable — place value table for decimals
 * cells: e.g. [{label:"Ones", value:"1"}, {label:"Tenths", value:"7"}] */
export const PVTable: React.FC<{
  cells: { label: string; value: string }[];
  size?: number;
}> = ({ cells, size = 28 }) => (
  <div
    style={{
      display: "inline-flex",
      border: `2px solid ${PINK_DEEP}`,
      borderRadius: 8,
      overflow: "hidden",
      background: "#fff",
    }}
  >
    {cells.map((c, i) => (
      <div
        key={i}
        style={{
          borderRight:
            i < cells.length - 1 ? `1.5px solid ${PINK_SOFT}` : "none",
          padding: "4px 10px",
          textAlign: "center",
          minWidth: size + 6,
        }}
      >
        <div
          style={{
            fontSize: size * 0.42,
            color: PINK_DEEP,
            fontWeight: 700,
            fontFamily: "Nunito, sans-serif",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            lineHeight: 1,
          }}
        >
          {c.label}
        </div>
        <div
          style={{
            fontSize: size,
            fontWeight: 800,
            color: INK,
            fontFamily: "Fredoka, sans-serif",
            lineHeight: 1,
            marginTop: 2,
          }}
        >
          {c.value}
        </div>
      </div>
    ))}
  </div>
);

/* ── DigitHighlight — a number with one digit highlighted in pink. */
export const DigitHighlight: React.FC<{
  parts: { text: string; highlight?: boolean }[];
  size?: number;
}> = ({ parts, size = 26 }) => (
  <span
    style={{
      display: "inline-flex",
      fontFamily: "Fredoka, sans-serif",
      fontWeight: 800,
      fontSize: size,
      color: INK,
      alignItems: "baseline",
    }}
  >
    {parts.map((p, i) => (
      <span
        key={i}
        style={{
          background: p.highlight ? PINK_SOFT : "transparent",
          color: p.highlight ? PINK_DEEP : INK,
          padding: p.highlight ? "0 4px" : "0",
          borderRadius: 4,
        }}
      >
        {p.text}
      </span>
    ))}
  </span>
);

/* ── Caption — small label under a visual ── */
export const Caption: React.FC<{ children: React.ReactNode; color?: string }> = ({
  children,
  color = MUTED,
}) => (
  <span
    style={{
      fontFamily: "Nunito, sans-serif",
      fontSize: 13,
      fontWeight: 700,
      color,
      marginTop: 4,
    }}
  >
    {children}
  </span>
);

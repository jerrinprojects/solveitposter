// "Spot the fraction" worksheet (Rational Y2.1). One skill — recognising and
// telling apart halves, thirds and quarters in shapes — in three formats:
//   name   (V1): shape split into equal parts → mark H / T / Q
//   tick   (V2): mixed shapes → tick only the ones split into thirds
//   colour (V3): shape + a fraction → colour that fraction of it
//
// Deterministic (seeded) so the static build is stable across renders.

import React from "react";
import type { SpotShape, SpotParts } from "@/data/rationalWsLevels";
import { FRACTION_META } from "@/data/rationalWsLevels";

export type SpotMode = "name" | "tick" | "colour";
export type WorksheetVersion = 1 | 2 | 3;

const PAGE_PALETTE = {
  pink: { ink: "#d6336c", soft: "#fff0f7", chip: "#ffd5e8", num: "#ec407a" },
  mint: { ink: "#0d9488", soft: "#e6fbf5", chip: "#bff3e6", num: "#14b8a6" },
} as const;
export type AccentKey = keyof typeof PAGE_PALETTE;

const INK = "#1f2937";
const PINK = "#ff69b4";

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

const VERSION_SEEDS: Record<WorksheetVersion, number> = { 1: 1567, 2: 3137, 3: 8623 };

/** Build the list of shapes for a page-set, tuned per mode. */
export function buildSpotProblems(
  pool: SpotShape[],
  mode: SpotMode,
  version: WorksheetVersion,
  count: number,
): SpotShape[] {
  let src: SpotShape[];
  if (mode === "name") {
    // Equal shapes only, all three fractions.
    src = pool.filter((s) => s.equal);
  } else if (mode === "tick") {
    // ~50% equal-thirds (the "yes"), rest are distractors (halves, quarters,
    // unequal thirds — all "no").
    const thirds = pool.filter((s) => s.equal && s.parts === 3);
    const others = pool.filter((s) => !(s.equal && s.parts === 3));
    src = [...thirds, ...thirds, ...thirds, ...others];
  } else {
    // Colour: columnar shapes only (square / bar) so a part is a clean strip.
    src = pool.filter((s) => s.equal && s.type !== "circle");
  }
  if (src.length === 0) src = pool;
  const shuffled = seededShuffle(src, VERSION_SEEDS[version]);
  return Array.from({ length: count }, (_, i) => shuffled[i % shuffled.length]);
}

/* ----------------------------- shape SVG ----------------------------- */

// Even division line positions along 0..1 (equal) or lumpy (unequal).
function divs(parts: SpotParts, equal: boolean): number[] {
  if (equal) return Array.from({ length: parts - 1 }, (_, i) => (i + 1) / parts);
  if (parts === 3) return [0.22, 0.55]; // clearly unequal thirds
  if (parts === 2) return [0.34];
  return [0.18, 0.46, 0.7];
}

function FractionShape({
  shape, size = 84, fillFirst = false, stripSquare = false,
}: {
  shape: SpotShape; size?: number; fillFirst?: boolean; stripSquare?: boolean;
}) {
  const { type, parts, equal } = shape;
  const S = { fill: "none", stroke: INK, strokeWidth: 2.6, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
  const shadeFill = { fill: PINK, fillOpacity: 0.55 };

  if (type === "circle") {
    const c = size / 2, r = size / 2 - 4;
    const rad = (deg: number) => [c + r * Math.cos((deg * Math.PI) / 180), c + r * Math.sin((deg * Math.PI) / 180)];
    const lines: React.ReactElement[] = [];
    if (parts === 2) {
      lines.push(<line key="d" x1={c} y1={4} x2={c} y2={size - 4} {...S} />);
    } else if (parts === 4) {
      lines.push(<line key="v" x1={c} y1={4} x2={c} y2={size - 4} {...S} />);
      lines.push(<line key="h" x1={4} y1={c} x2={size - 4} y2={c} {...S} />);
    } else {
      const angs = equal ? [-90, 30, 150] : [-90, -20, 110];
      angs.forEach((a, i) => {
        const [x, y] = rad(a);
        lines.push(<line key={i} x1={c} y1={c} x2={x} y2={y} {...S} />);
      });
    }
    return (
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} style={{ display: "block" }}>
        <circle cx={c} cy={c} r={r} {...S} />
        {lines}
      </svg>
    );
  }

  if (type === "bar" || (type === "square" && stripSquare)) {
    const w = type === "bar" ? size * 1.5 : size;
    const h = type === "bar" ? size * 0.62 : size;
    const x0 = 4, x1 = w - 4, y0 = type === "bar" ? 8 : 4, y1 = h - (type === "bar" ? 8 : 4);
    const cuts = divs(parts, equal).map((f) => x0 + f * (x1 - x0));
    const firstRight = cuts.length ? cuts[0] : x1;
    return (
      <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} style={{ display: "block" }}>
        {fillFirst && <rect x={x0} y={y0} width={firstRight - x0} height={y1 - y0} {...shadeFill} />}
        <rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} rx={6} {...S} />
        {cuts.map((x, i) => <line key={i} x1={x} y1={y0} x2={x} y2={y1} {...S} />)}
      </svg>
    );
  }

  // square (grid style: quarters = cross, thirds = 2 verticals, half = 1 vertical)
  const x0 = 4, x1 = size - 4, y0 = 4, y1 = size - 4;
  const inner: React.ReactElement[] = [];
  if (parts === 4 && equal) {
    inner.push(<line key="v" x1={size / 2} y1={y0} x2={size / 2} y2={y1} {...S} />);
    inner.push(<line key="h" x1={x0} y1={size / 2} x2={x1} y2={size / 2} {...S} />);
  } else {
    divs(parts, equal).forEach((f, i) => {
      const x = x0 + f * (x1 - x0);
      inner.push(<line key={i} x1={x} y1={y0} x2={x} y2={y1} {...S} />);
    });
  }
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} style={{ display: "block" }}>
      <rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} rx={6} {...S} />
      {inner}
    </svg>
  );
}

/* ------------------------------- cell -------------------------------- */

function LetterBox({ ch, on, accent }: { ch: string; on: boolean; accent: AccentKey }) {
  const { ink } = PAGE_PALETTE[accent];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      width: 24, height: 24, borderRadius: 6,
      border: `2px solid ${on ? PINK : "#cbd5e1"}`,
      background: on ? PINK : "#fff",
      color: on ? "#fff" : ink,
      fontFamily: "var(--font-display), sans-serif", fontWeight: 800, fontSize: 13,
    }}>{ch}</span>
  );
}

function SpotCell({
  index, shape, mode, accent, showAnswer,
}: {
  index: number; shape: SpotShape; mode: SpotMode; accent: AccentKey; showAnswer: boolean;
}) {
  const { ink, chip, soft } = PAGE_PALETTE[accent];
  const meta = FRACTION_META[shape.parts];
  const isThird = shape.equal && shape.parts === 3;

  return (
    <div style={{
      borderRadius: 14, background: "#fffaf3", border: `1.5px solid ${chip}`,
      padding: "8px 10px 10px", display: "flex", flexDirection: "column",
      minHeight: 0, boxSizing: "border-box", boxShadow: "0 1px 0 rgba(0,0,0,0.04)",
    }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2,
      }}>
        <span style={{
          fontFamily: "var(--font-body), sans-serif", fontSize: 10, fontWeight: 800,
          color: ink, letterSpacing: "0.08em",
        }}>Q{index}</span>
        {mode === "colour" && (
          <span style={{
            fontFamily: "var(--font-display), sans-serif", fontSize: 13, fontWeight: 800, color: ink,
          }}>Colour {meta.sym}</span>
        )}
      </div>

      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <FractionShape
          shape={shape}
          fillFirst={mode === "colour" && showAnswer}
          stripSquare={mode === "colour"}
        />
      </div>

      <div style={{
        marginTop: 6, paddingTop: 5, borderTop: `1px dashed ${chip}`,
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8, minHeight: 30,
      }}>
        {mode === "name" && (
          <div style={{ display: "flex", gap: 6 }}>
            <LetterBox ch="H" on={showAnswer && meta.letter === "H"} accent={accent} />
            <LetterBox ch="T" on={showAnswer && meta.letter === "T"} accent={accent} />
            <LetterBox ch="Q" on={showAnswer && meta.letter === "Q"} accent={accent} />
          </div>
        )}
        {mode === "tick" && (
          <span style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 26, height: 26, borderRadius: 7,
            border: `2px solid ${showAnswer ? (isThird ? PINK : "#cbd5e1") : "#cbd5e1"}`,
            background: showAnswer && isThird ? PINK : "#fff",
            color: showAnswer ? (isThird ? "#fff" : "#c0392b") : "#fff",
            fontWeight: 800, fontSize: 16, lineHeight: 1,
          }}>{showAnswer ? (isThird ? "✓" : "✗") : ""}</span>
        )}
        {mode === "colour" && (
          <span style={{
            fontFamily: "var(--font-body), sans-serif", fontSize: 11, fontWeight: 700,
            color: ink, background: soft, padding: "2px 8px", borderRadius: 5,
          }}>
            {showAnswer ? `one ${meta.word} shaded` : `${meta.sym} = 1 of ${shape.parts} parts`}
          </span>
        )}
      </div>
    </div>
  );
}

/* ------------------------------- page -------------------------------- */

function ModeHero({ mode, accent }: { mode: SpotMode; accent: AccentKey }) {
  const { ink, chip } = PAGE_PALETTE[accent];
  const title = mode === "name" ? "Half, Third or Quarter?" : mode === "tick" ? "Tick the Thirds" : "Colour the Fraction";
  const sub = mode === "name"
    ? "Look at the equal parts. Mark H for half, T for third, Q for quarter."
    : mode === "tick"
      ? "Tick only the shapes split into thirds (3 same-size parts)."
      : "Colour the fraction shown above each shape.";
  return (
    <div style={{ padding: "10px 18px", borderRadius: 16, background: chip, marginBottom: 10 }}>
      <div style={{
        fontFamily: "var(--font-display), sans-serif", fontSize: 26, fontWeight: 800,
        color: ink, letterSpacing: "-0.02em", lineHeight: 1,
      }}>{title}</div>
      <div style={{
        fontFamily: "var(--font-body), sans-serif", fontSize: 12, fontWeight: 600,
        color: ink, opacity: 0.85, marginTop: 4,
      }}>{sub}</div>
    </div>
  );
}

export function SpotProblemPage({
  pageNumber, problems, mode, accent, showAnswer, cols = 4, rows = 3,
}: {
  pageNumber: 1 | 2;
  problems: SpotShape[];
  mode: SpotMode;
  accent: AccentKey;
  showAnswer: boolean;
  cols?: number;
  rows?: number;
}) {
  const startIndex = (pageNumber - 1) * problems.length + 1;
  return (
    <div style={{ padding: "14px 22px 12px", display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
      <ModeHero mode={mode} accent={accent} />
      <div style={{
        flex: 1, display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gap: 12, minHeight: 0,
      }}>
        {problems.map((p, i) => (
          <SpotCell key={i} index={startIndex + i} shape={p} mode={mode} accent={accent} showAnswer={showAnswer} />
        ))}
      </div>
    </div>
  );
}

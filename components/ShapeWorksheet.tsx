// Diagram-style worksheet for length problems (area & perimeter).
// Renders an SVG shape with labelled dimensions and an answer slot.

import type { ShapeProblem } from "@/data/lengthLevels";

const PAGE_PALETTE = {
  pink:   { ink: "#d6336c", soft: "#fff0f7", chip: "#ffd5e8", num: "#ec407a" },
  mint:   { ink: "#0d9488", soft: "#e6fbf5", chip: "#bff3e6", num: "#14b8a6" },
  sunny:  { ink: "#b8860b", soft: "#fff7d9", chip: "#ffe8a0", num: "#e8a93e" },
  grape:  { ink: "#7c3aed", soft: "#f3edff", chip: "#dccdfb", num: "#a78bda" },
} as const;

export type AccentKey = keyof typeof PAGE_PALETTE;

export type WorksheetVersion = 1 | 2 | 3;

// Seeded shuffle (Fisher-Yates with LCG) — deterministic so V1/V2/V3 have
// stable problem orderings across reloads but differ from each other.
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
  1: 7919, 2: 4861, 3: 2647,
};

// Build N problems from a pool. Cycles if pool is smaller than count to
// keep V1/V2/V3 the same length even when version filtering yields a
// short list.
export function buildShapeProblems(
  pool: ShapeProblem[],
  version: WorksheetVersion,
  count: number,
): ShapeProblem[] {
  if (pool.length === 0) return [];
  const shuffled = seededShuffle(pool, VERSION_SEEDS[version]);
  return Array.from({ length: count }, (_, i) => shuffled[i % shuffled.length]);
}

// Render an SVG of the shape. Dimensions scaled to fit inside the cell;
// the *labels* show the actual problem numbers (e.g. "8 cm") rather than
// the rendered pixel size.
function ShapeSvg({
  problem, accent, cellW, cellH, maxDim,
}: {
  problem: ShapeProblem; accent: AccentKey;
  cellW: number; cellH: number;
  // The largest dimension across all problems on the page — used so a
  // 9cm square renders visibly larger than a 3cm square within the same
  // sheet, instead of every shape filling the cell.
  maxDim: number;
}) {
  const { num, ink } = PAGE_PALETTE[accent];
  const { shape, length: L, width: W, unit } = problem;

  // Fit the shape inside the cell with padding for labels.
  const padX = 34; // room for vertical label on right (e.g. "10 cm")
  const padY = 22; // room for horizontal label on top
  const availW = cellW - padX * 2;
  const availH = cellH - padY * 2;

  // Per-dimension scaling: each unit of length maps to a fixed number of
  // pixels, so a 9-unit shape looks 3x larger than a 3-unit shape. Floor
  // the result so very small shapes (1-2 cm) stay legible.
  const pixelsPerUnit = Math.min(availW, availH) / Math.max(maxDim, 1) * 1.0;
  const minDimPx = Math.min(availW, availH) * 0.35;
  const scale = (dim: number) => Math.max(minDimPx, dim * pixelsPerUnit);

  let w: number, h: number;
  if (shape === "square") {
    const side = scale(L);
    w = side; h = side;
  } else if (shape === "triangle") {
    w = Math.min(scale(L), availW);
    h = Math.min(scale(W), availH);
  } else {
    // rectangle
    w = Math.min(scale(L), availW);
    h = Math.min(scale(W), availH);
  }

  const x = (cellW - w) / 2;
  const y = (cellH - h) / 2 + 4;

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-mono), 'Courier New', monospace",
    fontSize: 12, fontWeight: 700, fill: ink,
  };

  return (
    <svg width={cellW} height={cellH} style={{ display: "block" }}>
      {/* Outline */}
      {shape === "triangle" ? (
        <polygon
          points={`${x},${y + h} ${x + w},${y + h} ${x},${y}`}
          fill="none" stroke={num} strokeWidth={2}
        />
      ) : (
        <rect
          x={x} y={y} width={w} height={h}
          fill="none" stroke={num} strokeWidth={2}
        />
      )}

      {/* Square: equal-side tick marks on each of the 4 sides */}
      {shape === "square" && (() => {
        const t = 5; // tick half-length
        const cx = x + w / 2;
        const cy = y + h / 2;
        return (
          <g stroke={num} strokeWidth={2} strokeLinecap="round">
            {/* Top side */}
            <line x1={cx} y1={y - t} x2={cx} y2={y + t} />
            {/* Bottom side */}
            <line x1={cx} y1={y + h - t} x2={cx} y2={y + h + t} />
            {/* Left side */}
            <line x1={x - t} y1={cy} x2={x + t} y2={cy} />
            {/* Right side */}
            <line x1={x + w - t} y1={cy} x2={x + w + t} y2={cy} />
          </g>
        );
      })()}

      {/* Top label (length L) */}
      <text x={x + w / 2} y={y - 6} textAnchor="middle" style={labelStyle}>
        {L} {unit}
      </text>

      {/* Right label (width W) — for non-square shapes; squares show only one label */}
      {shape !== "square" && (
        <text
          x={x + w + 8} y={y + h / 2}
          textAnchor="start" dominantBaseline="middle" style={labelStyle}
        >
          {W} {unit}
        </text>
      )}
    </svg>
  );
}

function ShapeCell({
  index, problem, accent, showAnswer, operation, maxDim,
}: {
  index: number; problem: ShapeProblem; accent: AccentKey;
  showAnswer: boolean; operation: "perimeter" | "area";
  maxDim: number;
}) {
  const { ink, chip, soft, num } = PAGE_PALETTE[accent];
  const unitLabel = problem.unit + (operation === "area" ? "²" : "");
  const opLabel = operation === "perimeter" ? "Perimeter" : "Area";

  return (
    <div style={{
      borderRadius: 14,
      background: "#fffaf3",
      border: `1.5px solid ${chip}`,
      padding: "10px 12px 12px",
      display: "flex", flexDirection: "column",
      minHeight: 0, boxSizing: "border-box",
      boxShadow: "0 1px 0 rgba(0,0,0,0.04)",
    }}>
      <div style={{
        fontFamily: "var(--font-body), sans-serif",
        fontSize: 10, fontWeight: 800, color: ink,
        letterSpacing: "0.08em", textTransform: "uppercase",
        marginBottom: 2,
      }}>
        Q{index}
      </div>
      <div style={{
        flex: 1, minHeight: 0, display: "flex",
        alignItems: "center", justifyContent: "center", overflow: "visible",
      }}>
        <ShapeSvg
          problem={problem} accent={accent}
          cellW={165} cellH={120}
          maxDim={maxDim}
        />
      </div>
      <div style={{
        display: "flex", alignItems: "center", gap: 6, marginTop: 8,
        paddingTop: 4,
        borderTop: `1px dashed ${chip}`,
      }}>
        <span style={{
          fontFamily: "var(--font-display), sans-serif",
          fontSize: 13, fontWeight: 800, color: ink,
          whiteSpace: "nowrap",
        }}>
          {opLabel} =
        </span>
        {showAnswer ? (
          <span style={{
            fontFamily: "var(--font-mono), 'Courier New', monospace",
            fontSize: 14, fontWeight: 700, color: ink,
            background: soft, padding: "2px 8px", borderRadius: 6,
          }}>
            {problem.answer} {unitLabel}
          </span>
        ) : (
          <div style={{
            flex: 1, height: 18,
            borderBottom: `2px solid ${num}`,
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
      background: chip, marginBottom: 10,
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

function OperationHero({
  accent, operation,
}: { accent: AccentKey; operation: "perimeter" | "area" }) {
  const { ink, chip } = PAGE_PALETTE[accent];
  const label = operation === "perimeter" ? "Perimeter" : "Area";
  const subtitle = operation === "perimeter"
    ? "Add all sides — distance around the shape."
    : "Multiply length × width — squares inside the shape.";
  return (
    <div style={{
      padding: "12px 18px", borderRadius: 16,
      background: chip, marginBottom: 12,
    }}>
      <div style={{
        fontFamily: "var(--font-display), sans-serif",
        fontSize: 28, fontWeight: 800, color: ink,
        letterSpacing: "-0.02em", lineHeight: 1,
      }}>
        Find the {label}
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

export function ShapeProblemPage({
  pageNumber, problems, accent, showAnswer, levelFullId,
  instructionHint, operation, cols = 5, rows = 3,
}: {
  pageNumber: 1 | 2;
  problems: ShapeProblem[];
  accent: AccentKey;
  showAnswer: boolean;
  levelFullId: string;
  instructionHint: string;
  operation: "perimeter" | "area";
  cols?: number;
  rows?: number;
}) {
  const startIndex = (pageNumber - 1) * problems.length + 1;
  // Largest single dimension on the page — used to scale shapes
  // proportionally so a 9cm square renders 3x larger than a 3cm square.
  const maxDim = problems.reduce(
    (m, p) => Math.max(m, p.length, p.width), 1,
  );
  return (
    <div style={{ padding: "14px 22px 12px", display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
      <OperationHero accent={accent} operation={operation} />
      <div style={{
        flex: 1, display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gap: 16, minHeight: 0,
      }}>
        {problems.map((p, i) => (
          <ShapeCell
            key={i}
            index={startIndex + i}
            problem={p}
            accent={accent}
            showAnswer={showAnswer}
            operation={operation}
            maxDim={maxDim}
          />
        ))}
      </div>
    </div>
  );
}

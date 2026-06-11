// Grid-based shape worksheet for Y4.4 — half-square area counting.
// Each cell shows a right triangle drawn on a unit grid so students can
// count whole + half unit squares to find the area.

import type { ShapeProblem } from "@/data/lengthLevels";

const PAGE_PALETTE = {
  pink:   { ink: "#d6336c", soft: "#fff0f7", chip: "#ffd5e8", num: "#ec407a", fill: "#ffd5e8" },
  mint:   { ink: "#0d9488", soft: "#e6fbf5", chip: "#bff3e6", num: "#14b8a6", fill: "#bff3e6" },
  sunny:  { ink: "#b8860b", soft: "#fff7d9", chip: "#ffe8a0", num: "#e8a93e", fill: "#ffe8a0" },
  grape:  { ink: "#7c3aed", soft: "#f3edff", chip: "#dccdfb", num: "#a78bda", fill: "#dccdfb" },
} as const;

export type AccentKey = keyof typeof PAGE_PALETTE;

export type WorksheetVersion = 1 | 2 | 3;

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
  1: 5113, 2: 9277, 3: 6203,
};

export function buildGridShapeProblems(
  pool: ShapeProblem[],
  version: WorksheetVersion,
  count: number,
): ShapeProblem[] {
  if (pool.length === 0) return [];
  const shuffled = seededShuffle(pool, VERSION_SEEDS[version]);
  return Array.from({ length: count }, (_, i) => shuffled[i % shuffled.length]);
}

// Render a unit-grid with a shape on it. The shape is either a right
// triangle (Y4.4 — count whole + half squares) or a rectangle (Y3.3 —
// count whole squares only). Either way the surrounding grid makes the
// unit squares visible so students can count.
function GridShapeSvg({
  problem, accent, cellW, cellH,
}: { problem: ShapeProblem; accent: AccentKey; cellW: number; cellH: number }) {
  const { num, fill } = PAGE_PALETTE[accent];
  const isTriangle = problem.shape === "rightTriangleGrid";
  // Bounding box: for triangles s × s; for rectangles L × W.
  const cols = problem.length;
  const rows = problem.width;
  // Pad the grid so the surrounding cells (showing the unit) are visible.
  // For triangles, surround on all 4 sides; for rectangles add a 1-cell
  // border so students see the grid context.
  const padCells = 1;
  const totalCols = cols + padCells * 2;
  const totalRows = rows + padCells * 2;

  // Maximum size of the grid in the SVG view.
  const padX = 14;
  const padY = 14;
  const availW = cellW - padX * 2;
  const availH = cellH - padY * 2;
  const unit = Math.min(availW / totalCols, availH / totalRows);
  const gridW = unit * totalCols;
  const gridH = unit * totalRows;
  const x0 = (cellW - gridW) / 2;
  const y0 = (cellH - gridH) / 2;

  // Shape origin within the padded grid (inset by padCells).
  const sx = x0 + padCells * unit;
  const sy = y0 + padCells * unit;
  const sw = cols * unit;
  const sh = rows * unit;

  // Build outer grid lines
  const lines: React.ReactElement[] = [];
  for (let i = 0; i <= totalCols; i++) {
    lines.push(
      <line
        key={`v${i}`}
        x1={x0 + i * unit} y1={y0}
        x2={x0 + i * unit} y2={y0 + gridH}
        stroke="#d0c8c0" strokeWidth={0.7}
      />,
    );
  }
  for (let i = 0; i <= totalRows; i++) {
    lines.push(
      <line
        key={`h${i}`}
        x1={x0} y1={y0 + i * unit}
        x2={x0 + gridW} y2={y0 + i * unit}
        stroke="#d0c8c0" strokeWidth={0.7}
      />,
    );
  }

  // Inner grid lines (drawn over the shaded shape in white so the unit
  // squares stay visible against the fill colour).
  const innerLines: React.ReactElement[] = [];
  if (isTriangle) {
    // Triangle: only the lines that lie inside the triangle.
    const s = cols; // legs are s
    for (let i = 1; i < s; i++) {
      const xc = sx + i * unit;
      const yc = sy + i * unit;
      innerLines.push(
        <line key={`tv${i}`} x1={xc} y1={sy + i * unit} x2={xc} y2={sy + sh}
          stroke="#fff" strokeWidth={1.2} />,
        <line key={`th${i}`} x1={sx} y1={yc} x2={sx + (s - i) * unit} y2={yc}
          stroke="#fff" strokeWidth={1.2} />,
      );
    }
  } else {
    // Rectangle: every interior cell line.
    for (let i = 1; i < cols; i++) {
      innerLines.push(
        <line key={`rv${i}`}
          x1={sx + i * unit} y1={sy}
          x2={sx + i * unit} y2={sy + sh}
          stroke="#fff" strokeWidth={1.2} />,
      );
    }
    for (let i = 1; i < rows; i++) {
      innerLines.push(
        <line key={`rh${i}`}
          x1={sx} y1={sy + i * unit}
          x2={sx + sw} y2={sy + i * unit}
          stroke="#fff" strokeWidth={1.2} />,
      );
    }
  }

  // Shape outline.
  let shapeOutline: React.ReactElement;
  if (isTriangle) {
    // Right triangle: right angle at bottom-left, hypotenuse top-left to
    // bottom-right.
    const pts = [
      [sx, sy + sh],          // bottom-left (right angle)
      [sx + sw, sy + sh],     // bottom-right
      [sx, sy],               // top-left
    ];
    shapeOutline = (
      <polygon
        points={pts.map(([x, y]) => `${x},${y}`).join(" ")}
        fill={fill} fillOpacity={0.85}
        stroke={num} strokeWidth={2}
      />
    );
  } else {
    shapeOutline = (
      <rect
        x={sx} y={sy} width={sw} height={sh}
        fill={fill} fillOpacity={0.85}
        stroke={num} strokeWidth={2}
      />
    );
  }

  return (
    <svg width={cellW} height={cellH} style={{ display: "block" }}>
      {lines}
      {shapeOutline}
      {innerLines}
    </svg>
  );
}

function GridShapeCell({
  index, problem, accent, showAnswer,
}: {
  index: number; problem: ShapeProblem; accent: AccentKey; showAnswer: boolean;
}) {
  const { ink, chip, soft, num } = PAGE_PALETTE[accent];
  const answer = problem.answer;
  // Format half-units cleanly: "12½" reads better than "12.5"
  const answerStr = Number.isInteger(answer)
    ? `${answer}`
    : `${Math.floor(answer)}½`;
  const isPerimeter = problem.operation === "perimeter";
  const labelText = isPerimeter ? "Perimeter =" : "Area =";
  const unitText = isPerimeter ? "units" : "squares";

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
        alignItems: "center", justifyContent: "center",
      }}>
        <GridShapeSvg
          problem={problem} accent={accent}
          cellW={165} cellH={120}
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
          {labelText}
        </span>
        {showAnswer ? (
          <span style={{
            fontFamily: "var(--font-mono), 'Courier New', monospace",
            fontSize: 14, fontWeight: 700, color: ink,
            background: soft, padding: "2px 8px", borderRadius: 6,
          }}>
            {answerStr} {unitText}
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

function OperationHero({
  accent, hasHalfSquares, isPerimeter,
}: {
  accent: AccentKey;
  hasHalfSquares: boolean;
  isPerimeter: boolean;
}) {
  const { ink, chip } = PAGE_PALETTE[accent];
  const title = isPerimeter
    ? "Count Unit Edges to Find the Perimeter"
    : "Count Squares to Find the Area";
  const subtitle = isPerimeter
    ? "Trace around the shape and count each unit edge along the border."
    : hasHalfSquares
    ? "Whole squares = 1.  Half squares = ½.  Add them up."
    : "Each square inside the shape = 1 square unit.  Count them up.";
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
        {title}
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

export function GridShapeProblemPage({
  pageNumber, problems, accent, showAnswer, cols = 5, rows = 3,
}: {
  pageNumber: 1 | 2;
  problems: ShapeProblem[];
  accent: AccentKey;
  showAnswer: boolean;
  levelFullId: string;
  cols?: number;
  rows?: number;
}) {
  const startIndex = (pageNumber - 1) * problems.length + 1;
  const hasHalfSquares = problems.some((p) => p.shape === "rightTriangleGrid");
  const isPerimeter = problems[0]?.operation === "perimeter";
  return (
    <div style={{ padding: "14px 22px 12px", display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
      <OperationHero accent={accent} hasHalfSquares={hasHalfSquares} isPerimeter={isPerimeter} />
      <div style={{
        flex: 1, display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gap: 16, minHeight: 0,
      }}>
        {problems.map((p, i) => (
          <GridShapeCell
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

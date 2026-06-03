// Static visual mockups for Measurement · Capacity & Volume exercise previews.
// Mirrors the live app questions from solveit's capacityGen.js — no interactivity.

import React from "react";

// ── Shared atoms ─────────────────────────────────────────────────

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ flex: 1, padding: "12px 14px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      {children}
    </div>
  );
}

function Instr({ text }: { text: string }) {
  return <p style={{ fontSize: 11, color: "#6b7280", lineHeight: 1.4, marginBottom: 8, textAlign: "center", fontWeight: 600 }}>{text}</p>;
}

function QBox() {
  return <div style={{ border: "2px solid #e5e7eb", borderRadius: 8, width: 52, height: 32, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#bbb", fontSize: 13 }}>?</div>;
}

function ChoiceBtn({ label }: { label: string }) {
  return <div style={{ border: "2px solid #e5e7eb", borderRadius: 8, padding: "4px 10px", fontSize: 11, fontWeight: 700, color: "#6b7280" }}>{label}</div>;
}

function CapTag({ label }: { label: string }) {
  return (
    <div style={{ background: "#ecfeff", border: "2px solid #a5f3fc", borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 800, color: "#0891b2", minWidth: 60, textAlign: "center" }}>
      {label}
    </div>
  );
}

// ── Container SVG (bottle / cup / jug shape with optional water fill) ──
// kind: "wide" (cup/glass), "tall" (bottle), "spout" (jug)
function Container({ kind = "tall", widthPx = 38, heightPx, fill = 1, label, color = "#22d3ee" }:
  { kind?: "wide" | "tall" | "spout"; widthPx?: number; heightPx?: number; fill?: number; label?: string; color?: string }) {
  const h = heightPx ?? (kind === "wide" ? 44 : 60);
  const w = widthPx;
  // Body path
  let bodyPath = "";
  let neckOffset = 0;
  if (kind === "tall") {
    // Bottle: narrow neck, wider body
    neckOffset = 8;
    bodyPath = `M${w * 0.32},2 L${w * 0.68},2 L${w * 0.68},${neckOffset} Q${w * 0.68},${neckOffset + 4} ${w * 0.85},${neckOffset + 6} L${w - 2},${h - 2} L2,${h - 2} L${w * 0.15},${neckOffset + 6} Q${w * 0.32},${neckOffset + 4} ${w * 0.32},${neckOffset} Z`;
  } else if (kind === "wide") {
    // Cup/glass: slightly tapered
    bodyPath = `M${w * 0.18},3 L${w - w * 0.18},3 L${w - 3},${h - 2} L3,${h - 2} Z`;
  } else {
    // Jug: spout on left side at top
    bodyPath = `M${w * 0.1},6 Q${w * 0.05},2 ${w * 0.22},3 L${w - 4},3 L${w - 2},${h - 2} L4,${h - 2} L${w * 0.1},6 Z`;
  }
  const fillTop = kind === "tall" ? neckOffset + 8 : 6;
  const fillBottom = h - 3;
  const fillHeight = (fillBottom - fillTop) * fill;
  const fillY = fillBottom - fillHeight;
  const clipId = `cap-clip-${Math.random().toString(36).slice(2, 8)}`;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
      <svg overflow="visible" width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
        <defs>
          <clipPath id={clipId}>
            <path d={bodyPath} />
          </clipPath>
        </defs>
        {/* Water fill (clipped to body shape) */}
        {fill > 0 && (
          <rect
            x="0" y={fillY} width={w} height={fillHeight}
            fill={color} opacity="0.85"
            clipPath={`url(#${clipId})`}
          />
        )}
        {/* Container outline */}
        <path d={bodyPath} fill="none" stroke="#6b7280" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
      {label && <span style={{ fontSize: 10, fontWeight: 800, color: "#475569" }}>{label}</span>}
    </div>
  );
}

// ── Measuring jug SVG with tick marks and fill ───────────────────
// max = full scale (e.g. 500 or 1000), level = current reading on scale
function MeasuringJug({ max = 500, level = 300, unit = "ml", ticks }:
  { max?: number; level?: number; unit?: "ml" | "L"; ticks?: number[] }) {
  const W = 56, H = 80;
  const top = 8, bottom = H - 6;
  const usable = bottom - top;
  const yFromVal = (v: number) => bottom - (v / max) * usable;
  const tArr = ticks ?? [max / 5, (max * 2) / 5, (max * 3) / 5, (max * 4) / 5, max];
  const fillY = yFromVal(level);
  const fillH = bottom - fillY;
  const clipId = `jug-clip-${Math.random().toString(36).slice(2, 8)}`;
  // Jug body — tapered cup with spout
  const bodyPath = `M8,${top} Q4,${top - 4} 14,${top - 3} L${W - 6},${top} L${W - 4},${bottom} L6,${bottom} L8,${top} Z`;
  return (
    <svg overflow="visible" width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      <defs>
        <clipPath id={clipId}>
          <path d={bodyPath} />
        </clipPath>
      </defs>
      {/* Water */}
      <rect x="0" y={fillY} width={W} height={fillH} fill="#22d3ee" opacity="0.7" clipPath={`url(#${clipId})`} />
      {/* Outline */}
      <path d={bodyPath} fill="none" stroke="#6b7280" strokeWidth="1.6" strokeLinejoin="round" />
      {/* Ticks + labels */}
      {tArr.map((t, i) => {
        const y = yFromVal(t);
        return (
          <g key={i}>
            <line x1={W - 10} y1={y} x2={W - 4} y2={y} stroke="#475569" strokeWidth="1" />
            <text x={W - 12} y={y + 3} textAnchor="end" fontSize="7" fill="#475569" fontWeight="700">{t}{unit === "L" ? "" : ""}</text>
          </g>
        );
      })}
      {/* Unit label */}
      <text x={W / 2} y={H - 1} textAnchor="middle" fontSize="7" fill="#64748b" fontWeight="800">{unit}</text>
    </svg>
  );
}

// ── C0.1 — Tap the container that holds more ─────────────────────
// Small cup vs big tall bottle — clearly larger
function C01() {
  return (
    <Card>
      <Instr text="Tap the container that holds more." />
      <div style={{ display: "flex", gap: 18, justifyContent: "center", alignItems: "flex-end" }}>
        <Container kind="wide" widthPx={26} heightPx={34} color="#60a5fa" />
        <Container kind="tall" widthPx={46} heightPx={84} color="#34d399" />
      </div>
    </Card>
  );
}

// ── C0.2 — Tap the container that holds less ─────────────────────
// Big bucket-style vs tiny cup — clearly smaller
function C02() {
  return (
    <Card>
      <Instr text="Tap the container that holds less." />
      <div style={{ display: "flex", gap: 18, justifyContent: "center", alignItems: "flex-end" }}>
        <Container kind="tall" widthPx={50} heightPx={82} color="#a78bfa" />
        <Container kind="wide" widthPx={22} heightPx={30} color="#38bdf8" />
      </div>
    </Card>
  );
}

// ── C0.3 — Same or different capacity? ───────────────────────────
// One small + one big — clearly different
function C03() {
  return (
    <Card>
      <Instr text="Do these hold the same or different capacity?" />
      <div style={{ display: "flex", gap: 18, justifyContent: "center", alignItems: "flex-end", marginBottom: 6 }}>
        <Container kind="tall" widthPx={44} heightPx={76} color="#22d3ee" />
        <Container kind="wide" widthPx={26} heightPx={36} color="#60a5fa" />
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        <ChoiceBtn label="same capacity" />
        <ChoiceBtn label="different capacity" />
      </div>
    </Card>
  );
}

// ── C1.1 — Which has more water? ─────────────────────────────────
function C11() {
  return (
    <Card>
      <Instr text="Which has more water?" />
      <div style={{ display: "flex", gap: 14, justifyContent: "center", alignItems: "flex-end" }}>
        <Container kind="tall" widthPx={32} color="#22d3ee" fill={0.8} label="A" />
        <Container kind="tall" widthPx={32} color="#22d3ee" fill={0.3} label="B" />
      </div>
    </Card>
  );
}

// ── C1.2 — Which has less water? ─────────────────────────────────
function C12() {
  return (
    <Card>
      <Instr text="Which has less water?" />
      <div style={{ display: "flex", gap: 14, justifyContent: "center", alignItems: "flex-end" }}>
        <Container kind="tall" widthPx={32} color="#22d3ee" fill={0.4} label="A" />
        <Container kind="tall" widthPx={32} color="#22d3ee" fill={0.9} label="B" />
      </div>
    </Card>
  );
}

// ── C1.3 — Full / half-full / empty ──────────────────────────────
function C13() {
  return (
    <Card>
      <Instr text="Is this container full, half-full, or empty?" />
      <Container kind="tall" widthPx={36} color="#22d3ee" fill={0.5} />
      <div style={{ display: "flex", gap: 5, marginTop: 6, flexWrap: "wrap", justifyContent: "center" }}>
        <ChoiceBtn label="full" />
        <ChoiceBtn label="half-full" />
        <ChoiceBtn label="empty" />
      </div>
    </Card>
  );
}

// ── C1.4 — Order least to most water ─────────────────────────────
function C14() {
  return (
    <Card>
      <Instr text="Order from least to most water." />
      <div style={{ display: "flex", gap: 10, justifyContent: "center", alignItems: "flex-end" }}>
        <Container kind="tall" widthPx={28} color="#22d3ee" fill={0.5} label="A" />
        <Container kind="tall" widthPx={28} color="#22d3ee" fill={0.2} label="B" />
        <Container kind="tall" widthPx={28} color="#22d3ee" fill={0.8} label="C" />
      </div>
    </Card>
  );
}

// ── C2.1 — Read measuring jug ────────────────────────────────────
function C21() {
  return (
    <Card>
      <Instr text="Read the measuring jug. How many ml?" />
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <MeasuringJug max={500} level={300} unit="ml" ticks={[100, 200, 300, 400, 500]} />
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <QBox />
          <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 700 }}>ml</span>
        </div>
      </div>
    </Card>
  );
}

// ── C2.2 — Choose correct mL reading ─────────────────────────────
function C22() {
  return (
    <Card>
      <Instr text="Choose the correct reading." />
      <MeasuringJug max={500} level={400} unit="ml" ticks={[100, 200, 300, 400, 500]} />
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center", marginTop: 4 }}>
        {["200 ml", "300 ml", "400 ml", "500 ml"].map(l => <ChoiceBtn key={l} label={l} />)}
      </div>
    </Card>
  );
}

// ── C2.3 — Order three mL capacities ─────────────────────────────
function C23() {
  return (
    <Card>
      <Instr text="Order from least to most." />
      <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
        <CapTag label="300 ml" />
        <CapTag label="100 ml" />
        <CapTag label="500 ml" />
      </div>
    </Card>
  );
}

// ── C2.4 — Compare two mL capacities ─────────────────────────────
function C24() {
  return (
    <Card>
      <Instr text="Which holds more: 200 ml or 500 ml?" />
      <div style={{ display: "flex", gap: 8 }}>
        <ChoiceBtn label="200 ml" />
        <ChoiceBtn label="500 ml" />
      </div>
    </Card>
  );
}

// ── C3.1 — Best unit (ml or L) ───────────────────────────────────
function C31() {
  return (
    <Card>
      <Instr text="What is the best unit to measure a bathtub?" />
      <div style={{ fontSize: 26, marginBottom: 8 }}>🛁</div>
      <div style={{ display: "flex", gap: 8 }}>
        <ChoiceBtn label="ml" />
        <ChoiceBtn label="L" />
      </div>
    </Card>
  );
}

// ── C3.2 — Read a container in mL or L ───────────────────────────
function C32() {
  return (
    <Card>
      <Instr text="Read the container in millilitres or litres." />
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <MeasuringJug max={500} level={300} unit="ml" ticks={[100, 200, 300, 400, 500]} />
          <span style={{ fontSize: 9, fontWeight: 800, color: "#0891b2" }}>ml</span>
        </div>
        <span style={{ fontSize: 11, fontWeight: 800, color: "#9ca3af" }}>or</span>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <MeasuringJug max={10} level={6} unit="L" ticks={[2, 4, 6, 8, 10]} />
          <span style={{ fontSize: 9, fontWeight: 800, color: "#0891b2" }}>L</span>
        </div>
      </div>
      <QBox />
    </Card>
  );
}

// ── C3.3 — Compare two capacities ────────────────────────────────
function C33() {
  return (
    <Card>
      <Instr text="Which holds more: 5 L or 8 L?" />
      <div style={{ display: "flex", gap: 8 }}>
        <ChoiceBtn label="5 L" />
        <ChoiceBtn label="8 L" />
      </div>
    </Card>
  );
}

// ── C3.4 — Order three capacities ────────────────────────────────
function C34() {
  return (
    <Card>
      <Instr text="Order from least to most." />
      <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
        <CapTag label="6 L" />
        <CapTag label="2 L" />
        <CapTag label="9 L" />
      </div>
    </Card>
  );
}

// ── Isometric 3D cube / prism (for volume) ───────────────────────
// Draws a stacked-cubes prism in an isometric-ish projection.
// l × w × h unit cubes, where l = length (x), w = width (z, depth), h = height (y).
function CubePrism({ l, w, h, cell = 12 }: { l: number; w: number; h: number; cell?: number }) {
  // 30° isometric vectors
  const dx = cell;       // along length (right)
  const dyDown = cell;   // along height (down)
  const depthX = cell * 0.55; // depth offset x (back/right)
  const depthY = -cell * 0.32; // depth offset y (back/up)

  // Total SVG dims
  const W = Math.ceil(l * dx + w * depthX + 4);
  const H = Math.ceil(h * dyDown + w * Math.abs(depthY) + 4);
  const originX = 2;
  const originY = Math.ceil(h * dyDown + w * Math.abs(depthY)) - 2;

  // Each cube: render top, right, front faces with depth at (i, j, k)
  // i: along l (0..l-1), j: along h (0..h-1, top=h-1), k: along w (0..w-1, back=w-1)
  const cubes: { i: number; j: number; k: number }[] = [];
  for (let k = w - 1; k >= 0; k--) {
    for (let j = 0; j < h; j++) {
      for (let i = 0; i < l; i++) {
        cubes.push({ i, j, k });
      }
    }
  }
  // Sort by k desc (back first), j asc (bottom first), i asc (left first)
  cubes.sort((a, b) => (b.k - a.k) || (a.j - b.j) || (a.i - b.i));

  function cubeFaces(i: number, j: number, k: number) {
    // bottom-left-front corner of this cube
    const bx = originX + i * dx + k * depthX;
    const by = originY - j * dyDown + k * depthY;
    const top = [
      [bx, by - dyDown],
      [bx + dx, by - dyDown],
      [bx + dx + depthX, by - dyDown + depthY],
      [bx + depthX, by - dyDown + depthY],
    ];
    const front = [
      [bx, by - dyDown],
      [bx + dx, by - dyDown],
      [bx + dx, by],
      [bx, by],
    ];
    const right = [
      [bx + dx, by - dyDown],
      [bx + dx + depthX, by - dyDown + depthY],
      [bx + dx + depthX, by + depthY],
      [bx + dx, by],
    ];
    return { top, front, right };
  }

  const polyStr = (pts: number[][]) => pts.map((p) => p.join(",")).join(" ");

  return (
    <svg overflow="visible" width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      {cubes.map(({ i, j, k }) => {
        const { top, front, right } = cubeFaces(i, j, k);
        return (
          <g key={`${i}-${j}-${k}`}>
            <polygon points={polyStr(top)} fill="#bae6fd" stroke="#0284c7" strokeWidth="0.9" />
            <polygon points={polyStr(right)} fill="#7dd3fc" stroke="#0284c7" strokeWidth="0.9" />
            <polygon points={polyStr(front)} fill="#e0f2fe" stroke="#0284c7" strokeWidth="0.9" />
          </g>
        );
      })}
    </svg>
  );
}

// Compact dimensioned rectangular prism (just an outline + l/w/h labels)
function PrismLabel({ l, w, h, cell = 10 }: { l: number; w: number; h: number; cell?: number }) {
  const dx = cell;
  const dyDown = cell;
  const depthX = cell * 0.6;
  const depthY = -cell * 0.34;
  const W = Math.ceil(l * dx + w * depthX + 30);
  const H = Math.ceil(h * dyDown + w * Math.abs(depthY) + 18);
  const ox = 4;
  const oy = Math.ceil(h * dyDown + w * Math.abs(depthY)) + 4;

  // Front face (l × h)
  const fA = [ox, oy - h * dyDown];
  const fB = [ox + l * dx, oy - h * dyDown];
  const fC = [ox + l * dx, oy];
  const fD = [ox, oy];
  // Back face (top-right)
  const bA = [fA[0] + w * depthX, fA[1] + w * depthY];
  const bB = [fB[0] + w * depthX, fB[1] + w * depthY];
  const bC = [fC[0] + w * depthX, fC[1] + w * depthY];

  const poly = (pts: number[][]) => pts.map((p) => p.join(",")).join(" ");

  return (
    <svg overflow="visible" width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      {/* Top */}
      <polygon points={poly([fA, fB, bB, bA])} fill="#bae6fd" stroke="#0284c7" strokeWidth="1.2" />
      {/* Front */}
      <polygon points={poly([fA, fB, fC, fD])} fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.2" />
      {/* Right */}
      <polygon points={poly([fB, bB, bC, fC])} fill="#7dd3fc" stroke="#0284c7" strokeWidth="1.2" />
      {/* Labels */}
      <text x={(fA[0] + fB[0]) / 2} y={fC[1] + 10} textAnchor="middle" fontSize="9" fill="#0c4a6e" fontWeight="bold">{l} cm</text>
      <text x={fC[0] + (bC[0] - fC[0]) / 2 + 2} y={fC[1] + (bC[1] - fC[1]) / 2 + 6} fontSize="9" fill="#0c4a6e" fontWeight="bold">{w} cm</text>
      <text x={fC[0] + 4} y={(fB[1] + fC[1]) / 2 + 3} fontSize="9" fill="#0c4a6e" fontWeight="bold">{h} cm</text>
    </svg>
  );
}

// ── C4.1 — Best unit (ml or L) ───────────────────────────────────
function C41() {
  return (
    <Card>
      <Instr text="What is the best unit to measure a jug of milk?" />
      <div style={{ fontSize: 26, marginBottom: 8 }}>🥛</div>
      <div style={{ display: "flex", gap: 8 }}>
        <ChoiceBtn label="ml" />
        <ChoiceBtn label="L" />
      </div>
    </Card>
  );
}

// ── C4.2 — Mixed L + ml → ml ─────────────────────────────────────
function C42() {
  return (
    <Card>
      <Instr text="Convert to millilitres." />
      <div style={{ fontSize: 14, fontWeight: 800, color: "#374151", textAlign: "center", margin: "6px 0 10px", lineHeight: 1.6 }}>
        3 L 400 ml = ___ ml
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <QBox />
        <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 700 }}>ml</span>
      </div>
    </Card>
  );
}

// ── C4.3 — Compare two mixed-unit capacities ─────────────────────
function C43() {
  return (
    <Card>
      <Instr text="Which holds more?" />
      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <CapTag label="2 L 800 ml" />
        <CapTag label="3 L 200 ml" />
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        <ChoiceBtn label="2 L 800 ml" />
        <ChoiceBtn label="3 L 200 ml" />
      </div>
    </Card>
  );
}

// ── C4.4 — Count unit cubes ──────────────────────────────────────
function C44() {
  return (
    <Card>
      <Instr text="How many unit cubes make up this shape?" />
      <CubePrism l={3} w={2} h={2} />
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
        <QBox />
        <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 700 }}>cubes</span>
      </div>
    </Card>
  );
}

// ── C4.5 — Capacity vs Volume concept ────────────────────────────
function C45() {
  return (
    <Card>
      <Instr text={'Is "the amount of water a jug can hold" capacity or volume?'} />
      <div style={{ display: "flex", gap: 6 }}>
        <ChoiceBtn label="capacity" />
        <ChoiceBtn label="volume" />
      </div>
    </Card>
  );
}

// ── C5.1 — L → ml ────────────────────────────────────────────────
function C51() {
  return (
    <Card>
      <Instr text="Convert litres to millilitres." />
      <div style={{ fontSize: 14, fontWeight: 800, color: "#374151", textAlign: "center", margin: "6px 0 10px", lineHeight: 1.6 }}>
        4 L = ___ ml
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <QBox />
        <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 700 }}>ml</span>
      </div>
    </Card>
  );
}

// ── C5.2 — ml → L ────────────────────────────────────────────────
function C52() {
  return (
    <Card>
      <Instr text="Convert millilitres to litres." />
      <div style={{ fontSize: 14, fontWeight: 800, color: "#374151", textAlign: "center", margin: "6px 0 10px", lineHeight: 1.6 }}>
        5000 ml = ___ L
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <QBox />
        <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 700 }}>L</span>
      </div>
    </Card>
  );
}

// ── C5.3 — Mixed L+ml → ml (multiple choice) ─────────────────────
function C53() {
  return (
    <Card>
      <Instr text="2 L 500 ml = ?" />
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center" }}>
        {["250 ml", "2500 ml", "2050 ml", "25000 ml"].map(l => <ChoiceBtn key={l} label={l} />)}
      </div>
    </Card>
  );
}

// ── C5.4 — Volume from layers of cubes ───────────────────────────
function C54() {
  return (
    <Card>
      <Instr text="How many cubes in total?" />
      <CubePrism l={4} w={3} h={2} />
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
        <QBox />
        <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 700 }}>cubes</span>
      </div>
    </Card>
  );
}

// ── C5.5 — Compare two prism volumes ─────────────────────────────
function C55() {
  return (
    <Card>
      <Instr text="Which shape has the greater volume?" />
      <div style={{ display: "flex", gap: 14, alignItems: "flex-end" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <CubePrism l={3} w={2} h={3} cell={9} />
          <span style={{ fontSize: 9, fontWeight: 800, color: "#475569" }}>A</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <CubePrism l={4} w={2} h={2} cell={9} />
          <span style={{ fontSize: 9, fontWeight: 800, color: "#475569" }}>B</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
        <ChoiceBtn label="A" />
        <ChoiceBtn label="B" />
      </div>
    </Card>
  );
}

// ── C6.1 — L + ml → ml ───────────────────────────────────────────
function C61() {
  return (
    <Card>
      <Instr text="Convert to millilitres." />
      <div style={{ fontSize: 14, fontWeight: 800, color: "#374151", textAlign: "center", margin: "6px 0 10px", lineHeight: 1.6 }}>
        2 L 350 ml = ___ ml
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <QBox />
        <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 700 }}>ml</span>
      </div>
    </Card>
  );
}

// ── C6.2 — ml total → decimal L ──────────────────────────────────
function C62() {
  return (
    <Card>
      <Instr text="Convert to litres." />
      <div style={{ fontSize: 14, fontWeight: 800, color: "#374151", textAlign: "center", margin: "6px 0 10px", lineHeight: 1.6 }}>
        3750 ml = ___ L
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <QBox />
        <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 700 }}>L</span>
      </div>
    </Card>
  );
}

// ── C6.3 — Compare ml vs L ───────────────────────────────────────
function C63() {
  return (
    <Card>
      <Instr text="Which holds more: 2500 ml or 3 L?" />
      <div style={{ display: "flex", gap: 8 }}>
        <ChoiceBtn label="2500 ml" />
        <ChoiceBtn label="3 L" />
      </div>
    </Card>
  );
}

// ── C6.4 — Volume of rectangular prism ───────────────────────────
function C64() {
  return (
    <Card>
      <Instr text="Find the volume of this rectangular prism." />
      <PrismLabel l={5} w={3} h={4} />
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
        <QBox />
        <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 700 }}>cm³</span>
      </div>
    </Card>
  );
}

// ── C6.5 — Best volume unit (cm³ or m³) ──────────────────────────
function C65() {
  return (
    <Card>
      <Instr text="What is the best unit for the volume of a swimming pool?" />
      <div style={{ fontSize: 26, marginBottom: 8 }}>🏊</div>
      <div style={{ display: "flex", gap: 8 }}>
        <ChoiceBtn label="cm³" />
        <ChoiceBtn label="m³" />
      </div>
    </Card>
  );
}

// ── C6.6 — ml ↔ cm³ ──────────────────────────────────────────────
function C66() {
  return (
    <Card>
      <Instr text="Convert between millilitres and cubic centimetres." />
      <div style={{ fontSize: 14, fontWeight: 800, color: "#374151", textAlign: "center", margin: "6px 0 10px", lineHeight: 1.6 }}>
        250 ml = ___ cm³
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <QBox />
        <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 700 }}>cm³</span>
      </div>
    </Card>
  );
}

// ── Triangular prism (right-angled cross-section) ────────────────
function TriPrism({ base, triH, length, cell = 9 }: { base: number; triH: number; length: number; cell?: number }) {
  const dx = cell;
  const depthX = cell * 0.6;
  const depthY = -cell * 0.34;
  const W = Math.ceil(base * dx + length * depthX + 30);
  const H = Math.ceil(triH * cell + length * Math.abs(depthY) + 22);
  const ox = 4;
  const oy = Math.ceil(triH * cell + length * Math.abs(depthY)) + 4;

  // Front triangle
  const fA = [ox, oy];                                 // bottom-left (right angle)
  const fB = [ox + base * dx, oy];                     // bottom-right
  const fC = [ox, oy - triH * cell];                   // top
  // Back triangle (shifted by length * depth)
  const bA = [fA[0] + length * depthX, fA[1] + length * depthY];
  const bB = [fB[0] + length * depthX, fB[1] + length * depthY];
  const bC = [fC[0] + length * depthX, fC[1] + length * depthY];

  const poly = (pts: number[][]) => pts.map((p) => p.join(",")).join(" ");
  return (
    <svg overflow="visible" width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      {/* Bottom face */}
      <polygon points={poly([fA, fB, bB, bA])} fill="#bae6fd" stroke="#0284c7" strokeWidth="1.2" />
      {/* Slanted face */}
      <polygon points={poly([fB, fC, bC, bB])} fill="#7dd3fc" stroke="#0284c7" strokeWidth="1.2" />
      {/* Front triangle */}
      <polygon points={poly([fA, fB, fC])} fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.2" />
      {/* Back triangle outline */}
      <polygon points={poly([bA, bB, bC])} fill="none" stroke="#0284c7" strokeWidth="1" strokeDasharray="2,2" />
      {/* Right-angle marker */}
      <polyline points={`${fA[0] + 4},${fA[1]} ${fA[0] + 4},${fA[1] - 4} ${fA[0]},${fA[1] - 4}`} fill="none" stroke="#0c4a6e" strokeWidth="1" />
      {/* Labels */}
      <text x={(fA[0] + fB[0]) / 2} y={fA[1] + 11} textAnchor="middle" fontSize="9" fill="#0c4a6e" fontWeight="bold">b = {base}</text>
      <text x={fA[0] - 2} y={(fA[1] + fC[1]) / 2 + 3} textAnchor="end" fontSize="9" fill="#0c4a6e" fontWeight="bold">h = {triH}</text>
      <text x={fB[0] + (bB[0] - fB[0]) / 2 + 3} y={fB[1] + (bB[1] - fB[1]) / 2 + 9} fontSize="9" fill="#0c4a6e" fontWeight="bold">L = {length}</text>
    </svg>
  );
}

// ── Composite shape: two prisms stacked ──────────────────────────
function CompositePrism({ a, b, cell = 8 }:
  { a: { l: number; w: number; h: number }; b: { l: number; w: number; h: number }; cell?: number }) {
  // Render two cube-stacks side by side with a small "+" label
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 10 }}>
      <CubePrism l={a.l} w={a.w} h={a.h} cell={cell} />
      <span style={{ fontSize: 14, fontWeight: 800, color: "#0c4a6e", paddingBottom: 6 }}>+</span>
      <CubePrism l={b.l} w={b.w} h={b.h} cell={cell} />
    </div>
  );
}

// ── C7.1 — Choose the volume formula ─────────────────────────────
function C71() {
  return (
    <Card>
      <Instr text="Which formula gives the volume of a rectangular prism?" />
      <PrismLabel l={4} w={2} h={3} cell={9} />
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center", marginTop: 2 }}>
        {["l × w × h", "s × s × s", "½ × b × h × L", "π × r² × h"].map(l => <ChoiceBtn key={l} label={l} />)}
      </div>
    </Card>
  );
}

// ── C7.2 — Volume of a cube ──────────────────────────────────────
function C72() {
  return (
    <Card>
      <Instr text="Find the volume of this cube." />
      <PrismLabel l={4} w={4} h={4} cell={10} />
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
        <QBox />
        <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 700 }}>cm³</span>
      </div>
    </Card>
  );
}

// ── C7.3 — Volume of a rectangular prism ─────────────────────────
function C73() {
  return (
    <Card>
      <Instr text="Find the volume of this rectangular prism." />
      <PrismLabel l={6} w={3} h={4} cell={9} />
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
        <QBox />
        <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 700 }}>cm³</span>
      </div>
    </Card>
  );
}

// ── C7.4 — Missing side from volume ──────────────────────────────
function C74() {
  return (
    <Card>
      <Instr text="The volume is 48 cm³. Find the missing side." />
      <PrismLabelHidden l={4} w={3} hLabel="?" cell={10} />
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
        <QBox />
        <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 700 }}>cm</span>
      </div>
    </Card>
  );
}

// ── C7.5 — Compare two prism volumes (formulas variant) ──────────
function C75() {
  return (
    <Card>
      <Instr text="Which prism has the greater volume?" />
      <div style={{ display: "flex", gap: 12, alignItems: "flex-end" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <CubePrism l={4} w={2} h={3} cell={8} />
          <span style={{ fontSize: 9, fontWeight: 800, color: "#475569" }}>A</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <CubePrism l={3} w={3} h={3} cell={8} />
          <span style={{ fontSize: 9, fontWeight: 800, color: "#475569" }}>B</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
        <ChoiceBtn label="A" />
        <ChoiceBtn label="B" />
      </div>
    </Card>
  );
}

// ── C8.1 — cm³ ↔ m³ ──────────────────────────────────────────────
function C81() {
  return (
    <Card>
      <Instr text="Convert between cm³ and m³." />
      <div style={{ fontSize: 14, fontWeight: 800, color: "#374151", textAlign: "center", margin: "6px 0 10px", lineHeight: 1.6 }}>
        2 m³ = ___ cm³
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <QBox />
        <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 700 }}>cm³</span>
      </div>
    </Card>
  );
}

// ── C8.2 — Capacity ↔ Volume ─────────────────────────────────────
function C82() {
  return (
    <Card>
      <Instr text="Convert between capacity and volume." />
      <div style={{ fontSize: 14, fontWeight: 800, color: "#374151", textAlign: "center", margin: "6px 0 10px", lineHeight: 1.6 }}>
        3 L = ___ cm³
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <QBox />
        <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 700 }}>cm³</span>
      </div>
    </Card>
  );
}

// ── C8.3 — Triangular prism volume ───────────────────────────────
function C83() {
  return (
    <Card>
      <Instr text="Find the volume of this triangular prism." />
      <TriPrism base={6} triH={4} length={5} />
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
        <QBox />
        <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 700 }}>cm³</span>
      </div>
    </Card>
  );
}

// ── C8.4 — Composite shape volume ────────────────────────────────
function C84() {
  return (
    <Card>
      <Instr text="Find the total volume of this composite shape." />
      <CompositePrism a={{ l: 4, w: 3, h: 3 }} b={{ l: 3, w: 2, h: 2 }} />
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
        <QBox />
        <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 700 }}>cm³</span>
      </div>
    </Card>
  );
}

// ── C8.5 — Compare capacity vs volume ────────────────────────────
function C85() {
  return (
    <Card>
      <Instr text="Which is greater: 1500 ml or 1200 cm³?" />
      <div style={{ display: "flex", gap: 8 }}>
        <ChoiceBtn label="1500 ml" />
        <ChoiceBtn label="1200 cm³" />
      </div>
    </Card>
  );
}

// ── C8.6 — Sensible capacity (estimation) ────────────────────────
function C86() {
  return (
    <Card>
      <Instr text="A glass of water holds about..." />
      <div style={{ fontSize: 26, marginBottom: 8 }}>🥛</div>
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center" }}>
        {["25 ml", "250 ml", "2.5 L", "25 L"].map(l => <ChoiceBtn key={l} label={l} />)}
      </div>
    </Card>
  );
}

// PrismLabel variant with one side hidden (for 7.4 missing-side)
function PrismLabelHidden({ l, w, hLabel, cell = 10 }: { l: number; w: number; hLabel: string; cell?: number }) {
  // Render fixed-shape prism; just swap the height label to "?"
  const h = 3; // visual h (doesn't represent actual answer)
  const dx = cell;
  const dyDown = cell;
  const depthX = cell * 0.6;
  const depthY = -cell * 0.34;
  const W = Math.ceil(l * dx + w * depthX + 30);
  const H = Math.ceil(h * dyDown + w * Math.abs(depthY) + 18);
  const ox = 4;
  const oy = Math.ceil(h * dyDown + w * Math.abs(depthY)) + 4;
  const fA = [ox, oy - h * dyDown];
  const fB = [ox + l * dx, oy - h * dyDown];
  const fC = [ox + l * dx, oy];
  const fD = [ox, oy];
  const bA = [fA[0] + w * depthX, fA[1] + w * depthY];
  const bB = [fB[0] + w * depthX, fB[1] + w * depthY];
  const bC = [fC[0] + w * depthX, fC[1] + w * depthY];
  const poly = (pts: number[][]) => pts.map((p) => p.join(",")).join(" ");
  return (
    <svg overflow="visible" width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      <polygon points={poly([fA, fB, bB, bA])} fill="#bae6fd" stroke="#0284c7" strokeWidth="1.2" />
      <polygon points={poly([fA, fB, fC, fD])} fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.2" />
      <polygon points={poly([fB, bB, bC, fC])} fill="#7dd3fc" stroke="#0284c7" strokeWidth="1.2" />
      <text x={(fA[0] + fB[0]) / 2} y={fC[1] + 10} textAnchor="middle" fontSize="9" fill="#0c4a6e" fontWeight="bold">{l} cm</text>
      <text x={fC[0] + (bC[0] - fC[0]) / 2 + 2} y={fC[1] + (bC[1] - fC[1]) / 2 + 6} fontSize="9" fill="#0c4a6e" fontWeight="bold">{w} cm</text>
      <text x={fC[0] + 4} y={(fB[1] + fC[1]) / 2 + 3} fontSize="10" fill="#be123c" fontWeight="bold">{hLabel}</text>
    </svg>
  );
}

// ── Map ──────────────────────────────────────────────────────────

export const CAPACITY_PREVIEW_MAP: Record<string, () => React.ReactElement> = {
  "0.1": C01, "0.2": C02, "0.3": C03,
  "1.1": C11, "1.2": C12, "1.3": C13, "1.4": C14,
  "2.1": C21, "2.2": C22, "2.3": C23, "2.4": C24,
  "3.1": C31, "3.2": C32, "3.3": C33, "3.4": C34,
  "4.1": C41, "4.2": C42, "4.3": C43, "4.4": C44, "4.5": C45,
  "5.1": C51, "5.2": C52, "5.3": C53, "5.4": C54, "5.5": C55,
  "6.1": C61, "6.2": C62, "6.3": C63, "6.4": C64, "6.5": C65, "6.6": C66,
  "7.1": C71, "7.2": C72, "7.3": C73, "7.4": C74, "7.5": C75,
  "8.1": C81, "8.2": C82, "8.3": C83, "8.4": C84, "8.5": C85, "8.6": C86,
};

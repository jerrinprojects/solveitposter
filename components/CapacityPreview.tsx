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
function Container({ kind = "tall", widthPx = 38, fill = 1, label, color = "#22d3ee" }:
  { kind?: "wide" | "tall" | "spout"; widthPx?: number; fill?: number; label?: string; color?: string }) {
  const h = kind === "wide" ? 44 : 60;
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
function C01() {
  return (
    <Card>
      <Instr text="Tap the container that holds more." />
      <div style={{ display: "flex", gap: 14, justifyContent: "center", alignItems: "flex-end" }}>
        <Container kind="wide" widthPx={36} color="#60a5fa" />
        <Container kind="tall" widthPx={32} color="#34d399" />
      </div>
    </Card>
  );
}

// ── C0.2 — Tap the container that holds less ─────────────────────
function C02() {
  return (
    <Card>
      <Instr text="Tap the container that holds less." />
      <div style={{ display: "flex", gap: 14, justifyContent: "center", alignItems: "flex-end" }}>
        <Container kind="tall" widthPx={34} color="#a78bfa" />
        <Container kind="wide" widthPx={30} color="#38bdf8" />
      </div>
    </Card>
  );
}

// ── C0.3 — Same or different capacity? ───────────────────────────
function C03() {
  return (
    <Card>
      <Instr text="Do these hold the same or different capacity?" />
      <div style={{ display: "flex", gap: 14, justifyContent: "center", alignItems: "flex-end", marginBottom: 6 }}>
        <Container kind="tall" widthPx={32} color="#22d3ee" />
        <Container kind="wide" widthPx={32} color="#60a5fa" />
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
      <Instr text="Read the container. How many litres?" />
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <MeasuringJug max={10} level={6} unit="L" ticks={[2, 4, 6, 8, 10]} />
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <QBox />
          <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 700 }}>L</span>
        </div>
      </div>
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

// ── Map ──────────────────────────────────────────────────────────

export const CAPACITY_PREVIEW_MAP: Record<string, () => React.ReactElement> = {
  "0.1": C01, "0.2": C02, "0.3": C03,
  "1.1": C11, "1.2": C12, "1.3": C13, "1.4": C14,
  "2.1": C21, "2.2": C22, "2.3": C23, "2.4": C24,
  "3.1": C31, "3.2": C32, "3.3": C33, "3.4": C34,
};

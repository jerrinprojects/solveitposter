// Static visual mockups for Measurement · Mass exercise previews.
// No interactivity — display only.

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

function ObjCard({ emoji, name }: { emoji: string; name: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, background: "#fdf4ff", border: "2px solid #e9d5ff", borderRadius: 10, padding: "8px 12px", minWidth: 52 }}>
      <span style={{ fontSize: 24 }}>{emoji}</span>
      <span style={{ fontSize: 9, color: "#7c3aed", fontWeight: 700 }}>{name}</span>
    </div>
  );
}

function MassTag({ label }: { label: string }) {
  return (
    <div style={{ background: "#fdf4ff", border: "2px solid #e9d5ff", borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 800, color: "#7c3aed", minWidth: 60, textAlign: "center" }}>
      {label}
    </div>
  );
}

// ── Balance scale SVG ─────────────────────────────────────────────
function BalanceScale({ leftVal, rightVal }: { leftVal: number; rightVal: number }) {
  const diff = leftVal - rightVal;
  const tilt = Math.max(-12, Math.min(12, diff / 40));
  const cx = 60, cy = 34;
  const armLen = 44;
  const lx = cx - armLen * Math.cos((tilt * Math.PI) / 180);
  const ly = cy + armLen * Math.sin((tilt * Math.PI) / 180);
  const rx = cx + armLen * Math.cos((tilt * Math.PI) / 180);
  const ry = cy - armLen * Math.sin((tilt * Math.PI) / 180);
  return (
    <svg overflow="visible" width="120" height="80" viewBox="0 0 120 80">
      {/* Stand */}
      <line x1={cx} y1={cy} x2={cx} y2={72} stroke="#9ca3af" strokeWidth="3" />
      <line x1={cx - 14} y1={72} x2={cx + 14} y2={72} stroke="#9ca3af" strokeWidth="3" strokeLinecap="round" />
      {/* Beam */}
      <line x1={lx} y1={ly} x2={rx} y2={ry} stroke="#6b7280" strokeWidth="2.5" strokeLinecap="round" />
      {/* Pivot */}
      <circle cx={cx} cy={cy} r="4" fill="#9ca3af" />
      {/* Left pan */}
      <line x1={lx} y1={ly} x2={lx - 12} y2={ly + 14} stroke="#d1d5db" strokeWidth="1.5" />
      <line x1={lx} y1={ly} x2={lx + 12} y2={ly + 14} stroke="#d1d5db" strokeWidth="1.5" />
      <ellipse cx={lx} cy={ly + 16} rx="14" ry="4" fill="#fce7f3" stroke="#f9a8d4" strokeWidth="1.5" />
      <text x={lx} y={ly + 16} textAnchor="middle" dominantBaseline="middle" fontSize="8" fill="#be185d" fontWeight="bold">{leftVal} g</text>
      {/* Right pan */}
      <line x1={rx} y1={ry} x2={rx - 12} y2={ry + 14} stroke="#d1d5db" strokeWidth="1.5" />
      <line x1={rx} y1={ry} x2={rx + 12} y2={ry + 14} stroke="#d1d5db" strokeWidth="1.5" />
      <ellipse cx={rx} cy={ry + 16} rx="14" ry="4" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.5" />
      <text x={rx} y={ry + 16} textAnchor="middle" dominantBaseline="middle" fontSize="8" fill="#1d4ed8" fontWeight="bold">{rightVal} g</text>
    </svg>
  );
}

// ── Scale display SVG ─────────────────────────────────────────────
function ScaleDisplay({ reading }: { reading: string }) {
  return (
    <div style={{ background: "#1f2937", borderRadius: 10, padding: "8px 18px", fontSize: 18, fontWeight: 800, color: "#4ade80", letterSpacing: 1, marginBottom: 6, fontFamily: "monospace" }}>
      {reading}
    </div>
  );
}

// ── M0.1 — Tap the heavier object ────────────────────────────────
function M01() {
  return (
    <Card>
      <Instr text="Tap the heavier one." />
      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        <ObjCard emoji="🍎" name="apple" />
        <ObjCard emoji="🪶" name="feather" />
      </div>
    </Card>
  );
}

// ── M0.2 — Tap the lighter object ────────────────────────────────
function M02() {
  return (
    <Card>
      <Instr text="Tap the lighter one." />
      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        <ObjCard emoji="📚" name="book" />
        <ObjCard emoji="🪙" name="coin" />
      </div>
    </Card>
  );
}

// ── M0.3 — Same or different weight? ─────────────────────────────
function M03() {
  return (
    <Card>
      <Instr text="Same weight or different weight?" />
      <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 8 }}>
        <ObjCard emoji="🍎" name="apple" />
        <ObjCard emoji="🍊" name="orange" />
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        <ChoiceBtn label="same weight" />
        <ChoiceBtn label="different weight" />
      </div>
    </Card>
  );
}

// ── M1.1 — Heavier or lighter? ───────────────────────────────────
function M11() {
  return (
    <Card>
      <Instr text="Which one is heavier?" />
      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        <ObjCard emoji="🐱" name="cat" />
        <ObjCard emoji="✏️" name="pencil" />
      </div>
    </Card>
  );
}

// ── M1.2 — Tap the heaviest ──────────────────────────────────────
function M12() {
  return (
    <Card>
      <Instr text="Tap the heaviest one." />
      <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
        <ObjCard emoji="🐘" name="elephant" />
        <ObjCard emoji="🐱" name="cat" />
        <ObjCard emoji="🐦" name="bird" />
      </div>
    </Card>
  );
}

// ── M1.3 — Tap the lightest ──────────────────────────────────────
function M13() {
  return (
    <Card>
      <Instr text="Tap the lightest one." />
      <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
        <ObjCard emoji="📖" name="book" />
        <ObjCard emoji="🍌" name="banana" />
        <ObjCard emoji="🪶" name="feather" />
      </div>
    </Card>
  );
}

// ── M1.4 — Order lightest to heaviest ───────────────────────────
function M14() {
  return (
    <Card>
      <Instr text="Order from lightest to heaviest. Tap each one in order." />
      <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
        <ObjCard emoji="📚" name="book" />
        <ObjCard emoji="🪶" name="feather" />
        <ObjCard emoji="🍎" name="apple" />
      </div>
    </Card>
  );
}

// ── M2.1 — Balance scale ─────────────────────────────────────────
function M21() {
  return (
    <Card>
      <Instr text="Which side is heavier?" />
      <BalanceScale leftVal={320} rightVal={180} />
      <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
        <ChoiceBtn label="left" />
        <ChoiceBtn label="right" />
      </div>
    </Card>
  );
}

// ── M2.2 — Read scale in grams ───────────────────────────────────
function M22() {
  return (
    <Card>
      <Instr text="Read the scale. What is the mass?" />
      <ScaleDisplay reading="75 g" />
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <QBox />
        <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 700 }}>g</span>
      </div>
    </Card>
  );
}

// ── M2.3 — Choose correct mass ───────────────────────────────────
function M23() {
  return (
    <Card>
      <Instr text="About how heavy is an apple?" />
      <div style={{ fontSize: 28, marginBottom: 8 }}>🍎</div>
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center" }}>
        {["18 g", "180 g", "1800 g", "80 g"].map(l => <ChoiceBtn key={l} label={l} />)}
      </div>
    </Card>
  );
}

// ── M2.4 — Order masses in grams ─────────────────────────────────
function M24() {
  return (
    <Card>
      <Instr text="Order from lightest to heaviest." />
      <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
        <MassTag label="200 g" />
        <MassTag label="50 g" />
        <MassTag label="400 g" />
      </div>
    </Card>
  );
}

// ── M3.1 — g or kg? ──────────────────────────────────────────────
function M31() {
  return (
    <Card>
      <Instr text="What is the best unit to measure the mass of a pencil?" />
      <div style={{ fontSize: 26, marginBottom: 8 }}>✏️</div>
      <div style={{ display: "flex", gap: 8 }}>
        <ChoiceBtn label="g" />
        <ChoiceBtn label="kg" />
      </div>
    </Card>
  );
}

// ── M3.2 — Read scale g or kg ────────────────────────────────────
function M32() {
  return (
    <Card>
      <Instr text="Read the scale. What is the mass?" />
      <ScaleDisplay reading="350 g" />
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <QBox />
        <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 700 }}>g</span>
      </div>
    </Card>
  );
}

// ── M3.3 — Compare two masses ────────────────────────────────────
function M33() {
  return (
    <Card>
      <Instr text="Which is heavier?" />
      <div style={{ display: "flex", gap: 10, marginBottom: 8 }}>
        <MassTag label="650 g" />
        <MassTag label="250 g" />
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        <ChoiceBtn label="650 g" />
        <ChoiceBtn label="250 g" />
      </div>
    </Card>
  );
}

// ── M3.4 — Order masses ──────────────────────────────────────────
function M34() {
  return (
    <Card>
      <Instr text="Order from lightest to heaviest." />
      <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
        <MassTag label="8 kg" />
        <MassTag label="3 kg" />
        <MassTag label="15 kg" />
      </div>
    </Card>
  );
}

// ── M4.1 — Best unit (g or kg) ───────────────────────────────────
function M41() {
  return (
    <Card>
      <Instr text="Choose the best unit to measure mass." />
      <div style={{ fontSize: 26, marginBottom: 8 }}>🚗</div>
      <div style={{ display: "flex", gap: 8 }}>
        <ChoiceBtn label="g" />
        <ChoiceBtn label="kg" />
      </div>
    </Card>
  );
}

// ── M4.2 — Mixed unit to grams ───────────────────────────────────
function M42() {
  return (
    <Card>
      <Instr text="Convert to grams." />
      <div style={{ fontSize: 14, fontWeight: 800, color: "#374151", textAlign: "center", margin: "6px 0 10px", lineHeight: 1.6 }}>
        3 kg 500 g = ___ g
      </div>
      <QBox />
    </Card>
  );
}

// ── M4.3 — Compare mixed-unit masses ─────────────────────────────
function M43() {
  return (
    <Card>
      <Instr text="Which is heavier?" />
      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <MassTag label="2 kg 800 g" />
        <MassTag label="3 kg 200 g" />
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        <ChoiceBtn label="2 kg 800 g" />
        <ChoiceBtn label="3 kg 200 g" />
      </div>
    </Card>
  );
}

// ── M4.4 — Match number and unit ─────────────────────────────────
function M44() {
  return (
    <Card>
      <Instr text="A watermelon weighs about 3 ___. Which unit?" />
      <div style={{ fontSize: 26, marginBottom: 8 }}>🍉</div>
      <div style={{ display: "flex", gap: 8 }}>
        <ChoiceBtn label="g" />
        <ChoiceBtn label="kg" />
      </div>
    </Card>
  );
}

// ── M5.1 — Scale reading, convert g ↔ kg ─────────────────────────
function M51() {
  return (
    <Card>
      <Instr text="A scale shows 2500 g. How many kg is that?" />
      <ScaleDisplay reading="2500 g" />
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <QBox />
        <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 700 }}>kg</span>
      </div>
    </Card>
  );
}

// ── M5.2 — Compare mixed masses ──────────────────────────────────
function M52() {
  return (
    <Card>
      <Instr text="Which is heavier?" />
      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <MassTag label="4 kg 250 g" />
        <MassTag label="4 kg 800 g" />
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        <ChoiceBtn label="4 kg 250 g" />
        <ChoiceBtn label="4 kg 800 g" />
      </div>
    </Card>
  );
}

// ── M5.3 — Mixed to decimal kg ───────────────────────────────────
function M53() {
  return (
    <Card>
      <Instr text="Convert to decimal kilograms." />
      <div style={{ fontSize: 14, fontWeight: 800, color: "#374151", textAlign: "center", margin: "6px 0 10px", lineHeight: 1.6 }}>
        1 kg 500 g = ?
      </div>
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center" }}>
        {["1.5 kg", "15 kg", "1.05 kg", "0.15 kg"].map(l => <ChoiceBtn key={l} label={l} />)}
      </div>
    </Card>
  );
}

// ── M5.4 — Order mixed-form masses ───────────────────────────────
function M54() {
  return (
    <Card>
      <Instr text="Order from lightest to heaviest." />
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", justifyContent: "center" }}>
        <MassTag label="3 kg 400 g" />
        <MassTag label="2 kg 900 g" />
        <MassTag label="4 kg 100 g" />
      </div>
    </Card>
  );
}

// ── M5.5 — Choose sensible mass ──────────────────────────────────
function M55() {
  return (
    <Card>
      <Instr text="A cat might weigh about..." />
      <div style={{ fontSize: 26, marginBottom: 8 }}>🐱</div>
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center" }}>
        {["40 g", "400 g", "4 kg", "40 kg"].map(l => <ChoiceBtn key={l} label={l} />)}
      </div>
    </Card>
  );
}

// ── M6.1 — Convert g ↔ kg ────────────────────────────────────────
function M61() {
  return (
    <Card>
      <Instr text="Convert the measurement." />
      <div style={{ fontSize: 14, fontWeight: 800, color: "#374151", textAlign: "center", margin: "6px 0 10px", lineHeight: 1.6 }}>
        4500 g = ___ kg
      </div>
      <QBox />
    </Card>
  );
}

// ── M6.2 — Convert mixed units to g ──────────────────────────────
function M62() {
  return (
    <Card>
      <Instr text="Convert to grams." />
      <div style={{ fontSize: 14, fontWeight: 800, color: "#374151", textAlign: "center", margin: "6px 0 10px", lineHeight: 1.6 }}>
        2 kg 300 g = ___ g
      </div>
      <QBox />
    </Card>
  );
}

// ── M6.3 — Convert to decimal kg ─────────────────────────────────
function M63() {
  return (
    <Card>
      <Instr text="Convert to decimal kilograms." />
      <div style={{ fontSize: 14, fontWeight: 800, color: "#374151", textAlign: "center", margin: "6px 0 10px", lineHeight: 1.6 }}>
        3 kg 250 g = ___ kg
      </div>
      <QBox />
    </Card>
  );
}

// ── M6.4 — Compare across units ──────────────────────────────────
function M64() {
  return (
    <Card>
      <Instr text="Which is heavier?" />
      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <MassTag label="2 kg 100 g" />
        <MassTag label="1950 g" />
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        <ChoiceBtn label="2 kg 100 g" />
        <ChoiceBtn label="1950 g" />
      </div>
    </Card>
  );
}

// ── M6.5 — Order mixed and decimal masses ────────────────────────
function M65() {
  return (
    <Card>
      <Instr text="Order from lightest to heaviest." />
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center" }}>
        <MassTag label="1.75 kg" />
        <MassTag label="1200 g" />
        <MassTag label="2 kg 50 g" />
        <MassTag label="1.4 kg" />
      </div>
    </Card>
  );
}

// ── M7.1 — Most suitable unit ────────────────────────────────────
function M71() {
  return (
    <Card>
      <Instr text="What is the most suitable unit to measure the mass of a suitcase?" />
      <div style={{ fontSize: 26, marginBottom: 8 }}>🧳</div>
      <div style={{ display: "flex", gap: 8 }}>
        <ChoiceBtn label="g" />
        <ChoiceBtn label="kg" />
      </div>
    </Card>
  );
}

// ── M7.2 — Decimal g ↔ kg ────────────────────────────────────────
function M72() {
  return (
    <Card>
      <Instr text="Convert the measurement." />
      <div style={{ fontSize: 14, fontWeight: 800, color: "#374151", textAlign: "center", margin: "6px 0 10px", lineHeight: 1.6 }}>
        750 g = ___ kg
      </div>
      <QBox />
    </Card>
  );
}

// ── M7.3 — Compare decimal and gram form ─────────────────────────
function M73() {
  return (
    <Card>
      <Instr text="Which is heavier?" />
      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <MassTag label="1.25 kg" />
        <MassTag label="1400 g" />
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        <ChoiceBtn label="1.25 kg" />
        <ChoiceBtn label="1400 g" />
      </div>
    </Card>
  );
}

// ── M7.4 — Choose most reasonable mass ───────────────────────────
function M74() {
  return (
    <Card>
      <Instr text="A loaf of bread might weigh about..." />
      <div style={{ fontSize: 26, marginBottom: 8 }}>🍞</div>
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center" }}>
        {["5 g", "50 g", "500 g", "5 kg"].map(l => <ChoiceBtn key={l} label={l} />)}
      </div>
    </Card>
  );
}

// ── M8.1 — Advanced conversion ───────────────────────────────────
function M81() {
  return (
    <Card>
      <Instr text="Convert to kilograms." />
      <div style={{ fontSize: 14, fontWeight: 800, color: "#374151", textAlign: "center", margin: "6px 0 10px", lineHeight: 1.6 }}>
        3456 g = ___ kg
      </div>
      <QBox />
    </Card>
  );
}

// ── M8.2 — Find heaviest of 3 forms ──────────────────────────────
function M82() {
  return (
    <Card>
      <Instr text="Which is the heaviest?" />
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center", marginBottom: 8 }}>
        <MassTag label="3.25 kg" />
        <MassTag label="2 kg 800 g" />
        <MassTag label="3100 g" />
      </div>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", justifyContent: "center" }}>
        <ChoiceBtn label="3.25 kg" />
        <ChoiceBtn label="2 kg 800 g" />
        <ChoiceBtn label="3100 g" />
      </div>
    </Card>
  );
}

// ── M8.3 — Order 4 forms ─────────────────────────────────────────
function M83() {
  return (
    <Card>
      <Instr text="Order from lightest to heaviest." />
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center" }}>
        <MassTag label="2.50 kg" />
        <MassTag label="1 kg 750 g" />
        <MassTag label="3200 g" />
        <MassTag label="1.500 kg" />
      </div>
    </Card>
  );
}

// ── M8.4 — Word problem ──────────────────────────────────────────
function M84() {
  return (
    <Card>
      <Instr text="A bag of flour weighs 2 kg. 350 g of flour is used. How many grams are left?" />
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <QBox />
        <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 700 }}>g</span>
      </div>
    </Card>
  );
}

// ── Map ──────────────────────────────────────────────────────────

export const MASS_PREVIEW_MAP: Record<string, () => React.ReactElement> = {
  "0.1": M01,
  "0.2": M02,
  "0.3": M03,
  "1.1": M11,
  "1.2": M12,
  "1.3": M13,
  "1.4": M14,
  "2.1": M21,
  "2.2": M22,
  "2.3": M23,
  "2.4": M24,
  "3.1": M31,
  "3.2": M32,
  "3.3": M33,
  "3.4": M34,
  "4.1": M41,
  "4.2": M42,
  "4.3": M43,
  "4.4": M44,
  "5.1": M51,
  "5.2": M52,
  "5.3": M53,
  "5.4": M54,
  "5.5": M55,
  "6.1": M61,
  "6.2": M62,
  "6.3": M63,
  "6.4": M64,
  "6.5": M65,
  "7.1": M71,
  "7.2": M72,
  "7.3": M73,
  "7.4": M74,
  "8.1": M81,
  "8.2": M82,
  "8.3": M83,
  "8.4": M84,
};

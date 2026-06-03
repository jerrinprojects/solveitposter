// Static visual mockups for Measurement · Temperature exercise previews.
// Mirrors solveit's temperatureGen.js — no interactivity.

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

function ChoiceBtn({ label }: { label: string }) {
  return <div style={{ border: "2px solid #e5e7eb", borderRadius: 8, padding: "4px 10px", fontSize: 11, fontWeight: 700, color: "#6b7280" }}>{label}</div>;
}

function QBoxT() {
  return <div style={{ border: "2px solid #e5e7eb", borderRadius: 8, width: 52, height: 32, display: "flex", alignItems: "center", justifyContent: "center", color: "#bbb", fontWeight: 700 }} />;
}

function SceneCard({ emoji, label }: { emoji: string; label: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, background: "#fef2f2", border: "2px solid #fecaca", borderRadius: 10, padding: "6px 10px", minWidth: 64, maxWidth: 92 }}>
      <span style={{ fontSize: 22 }}>{emoji}</span>
      <span style={{ fontSize: 9, color: "#991b1b", fontWeight: 700, textAlign: "center", lineHeight: 1.15 }}>{label}</span>
    </div>
  );
}

// ── Thermometer SVG ──────────────────────────────────────────────
// Vertical tube with mercury fill to {value} on {min..max} scale.
function Thermometer({ value, min = 0, max = 50, step = 10 }:
  { value: number; min?: number; max?: number; step?: number }) {
  const W = 56, H = 110;
  const tubeTop = 8;
  const tubeBottom = H - 18;
  const usable = tubeBottom - tubeTop;
  const yFromVal = (v: number) => tubeBottom - ((v - min) / (max - min)) * usable;
  const bulbCY = H - 10;
  const bulbR = 8;
  const fillTop = yFromVal(value);
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} overflow="visible">
      {/* Tube outline */}
      <rect x="18" y={tubeTop} width="10" height={tubeBottom - tubeTop + 4} rx="5" fill="#fff" stroke="#475569" strokeWidth="1.5" />
      {/* Bulb */}
      <circle cx="23" cy={bulbCY} r={bulbR} fill="#ef4444" stroke="#475569" strokeWidth="1.5" />
      {/* Mercury fill (red) */}
      <rect x="20" y={fillTop} width="6" height={tubeBottom - fillTop + 4} fill="#ef4444" />
      {/* Tick marks + labels */}
      {Array.from({ length: Math.floor((max - min) / step) + 1 }).map((_, i) => {
        const v = min + i * step;
        const y = yFromVal(v);
        return (
          <g key={i}>
            <line x1="30" y1={y} x2="36" y2={y} stroke="#475569" strokeWidth="1.2" />
            <text x="38" y={y + 3} fontSize="8" fill="#475569" fontWeight="700">{v}°</text>
          </g>
        );
      })}
    </svg>
  );
}

// ── Year 0 ───────────────────────────────────────────────────────
function Te01() {
  return (
    <Card>
      <Instr text="Is a campfire hot or cold?" />
      <div style={{ fontSize: 28, marginBottom: 6 }}>🔥</div>
      <div style={{ display: "flex", gap: 8 }}>
        <ChoiceBtn label="hot" />
        <ChoiceBtn label="cold" />
      </div>
    </Card>
  );
}

function Te02() {
  return (
    <Card>
      <Instr text="Which is hotter?" />
      <div style={{ display: "flex", gap: 12, alignItems: "flex-end" }}>
        <SceneCard emoji="🧊" label="an ice cube" />
        <SceneCard emoji="☀️" label="a hot summer day" />
      </div>
    </Card>
  );
}

function Te03() {
  return (
    <Card>
      <Instr text="Which is colder?" />
      <div style={{ display: "flex", gap: 12, alignItems: "flex-end" }}>
        <SceneCard emoji="⛄" label="a snowman" />
        <SceneCard emoji="🏖️" label="a sunny beach" />
      </div>
    </Card>
  );
}

// ── Year 1 ───────────────────────────────────────────────────────
function Te11() {
  return (
    <Card>
      <Instr text="Which is warmer (or cooler)?" />
      <div style={{ display: "flex", gap: 12, alignItems: "flex-end" }}>
        <SceneCard emoji="🌧️" label="a rainy day" />
        <SceneCard emoji="👕" label="a t-shirt day" />
      </div>
    </Card>
  );
}

function Te12() {
  return (
    <Card>
      <Instr text="Order from coldest to hottest." />
      <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
        <SceneCard emoji="🌧️" label="a rainy day" />
        <SceneCard emoji="❄️" label="falling snow" />
        <SceneCard emoji="🔥" label="a campfire" />
      </div>
    </Card>
  );
}

function Te13() {
  return (
    <Card>
      <Instr text="Which word best matches an ice cube?" />
      <div style={{ fontSize: 22, marginBottom: 4 }}>🧊</div>
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center" }}>
        {["freezing", "warm", "hot"].map(w => <ChoiceBtn key={w} label={w} />)}
      </div>
    </Card>
  );
}

// ── Year 2 ───────────────────────────────────────────────────────
function Te21() {
  return (
    <Card>
      <Instr text='Which word best describes "eating hot soup"?' />
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center" }}>
        {["hot", "cold", "warm"].map(w => <ChoiceBtn key={w} label={w} />)}
      </div>
    </Card>
  );
}

function Te22() {
  return (
    <Card>
      <Instr text="Which scene is the coldest?" />
      <div style={{ display: "flex", gap: 8, alignItems: "flex-end", marginBottom: 4 }}>
        <SceneCard emoji="🌤️" label="spring morning" />
        <SceneCard emoji="🍦" label="ice cream" />
        <SceneCard emoji="☀️" label="hot summer" />
      </div>
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center" }}>
        {["spring morning", "ice cream", "hot summer"].map(w => <ChoiceBtn key={w} label={w} />)}
      </div>
    </Card>
  );
}

function Te23() {
  return (
    <Card>
      <Instr text="Order from coldest to hottest." />
      <div style={{ display: "flex", gap: 6, alignItems: "flex-end", flexWrap: "wrap", justifyContent: "center" }}>
        <SceneCard emoji="❄️" label="snow" />
        <SceneCard emoji="🧥" label="winter jacket" />
        <SceneCard emoji="👕" label="t-shirt day" />
        <SceneCard emoji="🔥" label="campfire" />
      </div>
    </Card>
  );
}

// ── Year 3 ───────────────────────────────────────────────────────
function Te31() {
  return (
    <Card>
      <Instr text="What temperature does the thermometer show?" />
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <Thermometer value={30} min={0} max={50} step={10} />
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {["20°C", "30°C", "40°C"].map(t => <ChoiceBtn key={t} label={t} />)}
        </div>
      </div>
    </Card>
  );
}

function Te32() {
  return (
    <Card>
      <Instr text="Which temperature best matches a hot summer afternoon?" />
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center" }}>
        {["10°C", "20°C", "32°C"].map(t => <ChoiceBtn key={t} label={t} />)}
      </div>
    </Card>
  );
}

function Te33() {
  return (
    <Card>
      <Instr text="Which temperature is hotter: 12°C or 25°C?" />
      <div style={{ display: "flex", gap: 8 }}>
        <ChoiceBtn label="12°C" />
        <ChoiceBtn label="25°C" />
      </div>
    </Card>
  );
}

// ── Year 4 ───────────────────────────────────────────────────────
function Te41() {
  return (
    <Card>
      <Instr text="Read the thermometer. Type the temperature in °C." />
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <Thermometer value={25} min={0} max={40} step={5} />
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <QBoxT />
          <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 700 }}>°C</span>
        </div>
      </div>
    </Card>
  );
}

function Te42() {
  return (
    <Card>
      <Instr text="Which reading matches the thermometer?" />
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <Thermometer value={20} min={0} max={50} step={5} />
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {["15°C", "20°C", "25°C"].map(t => <ChoiceBtn key={t} label={t} />)}
        </div>
      </div>
    </Card>
  );
}

function Te43() {
  return (
    <Card>
      <Instr text="Which is hotter: 12°C or 27°C?" />
      <div style={{ display: "flex", gap: 8 }}>
        <ChoiceBtn label="12°C" />
        <ChoiceBtn label="27°C" />
      </div>
    </Card>
  );
}

function Te44() {
  return (
    <Card>
      <Instr text="Order from coldest to hottest." />
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", justifyContent: "center" }}>
        {["15°C", "32°C", "8°C", "21°C"].map(t => <ChoiceBtn key={t} label={t} />)}
      </div>
    </Card>
  );
}

function Te45() {
  return (
    <Card>
      <Instr text="Which is a sensible temperature for the inside of a fridge?" />
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center" }}>
        {["-10°C", "4°C", "18°C", "35°C"].map(t => <ChoiceBtn key={t} label={t} />)}
      </div>
    </Card>
  );
}

// ── Year 5 ───────────────────────────────────────────────────────
function Te51() {
  return (
    <Card>
      <Instr text="Read the thermometer in 2°C steps. Type the temperature." />
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <Thermometer value={22} min={0} max={40} step={2} />
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <QBoxT />
          <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 700 }}>°C</span>
        </div>
      </div>
    </Card>
  );
}

function Te52() {
  return (
    <Card>
      <Instr text="Which number matches the thermometer?" />
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <Thermometer value={18} min={0} max={40} step={2} />
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {["16°C", "18°C", "19°C", "20°C"].map(t => <ChoiceBtn key={t} label={t} />)}
        </div>
      </div>
    </Card>
  );
}

function Te53() {
  return (
    <Card>
      <Instr text="The temperature rises from 12°C to 19°C. What is the change?" />
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <QBoxT />
        <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 700 }}>°C</span>
      </div>
    </Card>
  );
}

function Te54() {
  return (
    <Card>
      <Instr text="From 18°C to 11°C — did it increase or decrease?" />
      <div style={{ display: "flex", gap: 8 }}>
        <ChoiceBtn label="increase" />
        <ChoiceBtn label="decrease" />
      </div>
    </Card>
  );
}

function Te55() {
  return (
    <Card>
      <Instr text="Mon 17°C, Tue 22°C. Which day was warmer?" />
      <div style={{ display: "flex", gap: 8 }}>
        <ChoiceBtn label="Monday" />
        <ChoiceBtn label="Tuesday" />
      </div>
    </Card>
  );
}

// ── Year 6 ───────────────────────────────────────────────────────
function Te61() {
  return (
    <Card>
      <Instr text="Read the thermometer. Type the temperature in °C." />
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <Thermometer value={-5} min={-15} max={15} step={5} />
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <QBoxT />
          <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 700 }}>°C</span>
        </div>
      </div>
    </Card>
  );
}

function Te62() {
  return (
    <Card>
      <Instr text="Which is hotter: -4°C or 6°C?" />
      <div style={{ display: "flex", gap: 8 }}>
        <ChoiceBtn label="-4°C" />
        <ChoiceBtn label="6°C" />
      </div>
    </Card>
  );
}

function Te63() {
  return (
    <Card>
      <Instr text="Order from coldest to hottest." />
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", justifyContent: "center" }}>
        {["-7°C", "3°C", "-2°C", "12°C"].map(t => <ChoiceBtn key={t} label={t} />)}
      </div>
    </Card>
  );
}

function Te64() {
  return (
    <Card>
      <Instr text="What is the difference between -3°C and 8°C?" />
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <QBoxT />
        <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 700 }}>°C</span>
      </div>
    </Card>
  );
}

function Te65() {
  return (
    <Card>
      <Instr text="The temperature rose from -5°C to 7°C. By how many degrees?" />
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <QBoxT />
        <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 700 }}>°C</span>
      </div>
    </Card>
  );
}

// ── Compact temperature table (cities/days × °C) ─────────────────
function TempTable({ rows }: { rows: { label: string; value: number }[] }) {
  return (
    <div style={{
      background: "#fef2f2", border: "2px solid #fecaca", borderRadius: 8,
      padding: "5px 8px", margin: "2px 0 4px",
      fontFamily: "monospace", minWidth: 130,
    }}>
      {rows.map((r, i) => (
        <div key={i} style={{
          display: "grid", gridTemplateColumns: "1fr auto",
          fontSize: 10, color: "#991b1b", fontWeight: 700,
          padding: "1px 4px",
          borderTop: i > 0 ? "1px solid #fecaca" : "none",
        }}>
          <span>{r.label}</span>
          <span>{r.value}°C</span>
        </div>
      ))}
    </div>
  );
}

// ── Year 7 ───────────────────────────────────────────────────────
function Te71() {
  return (
    <Card>
      <Instr text="Which is coldest: -8°C, 4°C, -2°C?" />
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", justifyContent: "center" }}>
        {["-8°C", "4°C", "-2°C"].map(t => <ChoiceBtn key={t} label={t} />)}
      </div>
    </Card>
  );
}

function Te72() {
  return (
    <Card>
      <Instr text="From 8°C to -3°C. What is the change? (use + or -)" />
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <QBoxT />
        <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 700 }}>°C</span>
      </div>
    </Card>
  );
}

function Te73() {
  return (
    <Card>
      <Instr text="Starts at 4°C. Rises 6°C, then falls 3°C. Final temperature?" />
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <QBoxT />
        <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 700 }}>°C</span>
      </div>
    </Card>
  );
}

function Te74() {
  return (
    <Card>
      <Instr text="What temperature does Wellington show?" />
      <TempTable rows={[
        { label: "Auckland",     value: 21 },
        { label: "Wellington",   value: 14 },
        { label: "Christchurch", value: -2 },
        { label: "Dunedin",      value: 8 },
      ]} />
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
        <QBoxT />
        <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 700 }}>°C</span>
      </div>
    </Card>
  );
}

function Te75() {
  return (
    <Card>
      <Instr text="What is the temperature range for the week? (highest − lowest)" />
      <TempTable rows={[
        { label: "Mon", value: 12 },
        { label: "Tue", value: 18 },
        { label: "Wed", value: -3 },
        { label: "Thu", value: 9 },
        { label: "Fri", value: 22 },
      ]} />
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
        <QBoxT />
        <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 700 }}>°C</span>
      </div>
    </Card>
  );
}

// ── Year 8 ───────────────────────────────────────────────────────
function Te81() {
  return (
    <Card>
      <Instr text="From -7°C to 5°C. What is the change? (use + or -)" />
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <QBoxT />
        <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 700 }}>°C</span>
      </div>
    </Card>
  );
}

function Te82() {
  return (
    <Card>
      <Instr text="Starts at 3°C. Rises 5°C, falls 4°C, rises 2°C. Final temperature?" />
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <QBoxT />
        <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 700 }}>°C</span>
      </div>
    </Card>
  );
}

function Te83() {
  return (
    <Card>
      <Instr text="Which city has the bigger temperature range?" />
      <div style={{
        background: "#fef2f2", border: "2px solid #fecaca", borderRadius: 8,
        padding: "5px 8px", margin: "2px 0 4px", fontFamily: "monospace",
        fontSize: 10, color: "#991b1b", fontWeight: 700, minWidth: 170,
      }}>
        <div style={{ padding: "1px 4px" }}>City A: 2, 14, -1°C</div>
        <div style={{ padding: "1px 4px", borderTop: "1px solid #fecaca" }}>City B: 8, 12, 10°C</div>
      </div>
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center", marginTop: 2 }}>
        {["City A", "City B", "same"].map(c => <ChoiceBtn key={c} label={c} />)}
      </div>
    </Card>
  );
}

function Te84() {
  return (
    <Card>
      <Instr text="Which day had the highest temperature?" />
      <TempTable rows={[
        { label: "Mon", value: 12 },
        { label: "Tue", value: 18 },
        { label: "Wed", value: -3 },
        { label: "Thu", value: 22 },
        { label: "Fri", value: 9 },
      ]} />
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center", marginTop: 2 }}>
        {["Mon", "Tue", "Wed", "Thu", "Fri"].map(d => <ChoiceBtn key={d} label={d} />)}
      </div>
    </Card>
  );
}

function Te85() {
  return (
    <Card>
      <Instr text="At dawn it was -4°C. By midday it had risen 9°C. What was the midday temperature?" />
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <QBoxT />
        <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 700 }}>°C</span>
      </div>
    </Card>
  );
}

// ── Map ──────────────────────────────────────────────────────────

export const TEMPERATURE_PREVIEW_MAP: Record<string, () => React.ReactElement> = {
  "0.1": Te01, "0.2": Te02, "0.3": Te03,
  "1.1": Te11, "1.2": Te12, "1.3": Te13,
  "2.1": Te21, "2.2": Te22, "2.3": Te23,
  "3.1": Te31, "3.2": Te32, "3.3": Te33,
  "4.1": Te41, "4.2": Te42, "4.3": Te43, "4.4": Te44, "4.5": Te45,
  "5.1": Te51, "5.2": Te52, "5.3": Te53, "5.4": Te54, "5.5": Te55,
  "6.1": Te61, "6.2": Te62, "6.3": Te63, "6.4": Te64, "6.5": Te65,
  "7.1": Te71, "7.2": Te72, "7.3": Te73, "7.4": Te74, "7.5": Te75,
  "8.1": Te81, "8.2": Te82, "8.3": Te83, "8.4": Te84, "8.5": Te85,
};

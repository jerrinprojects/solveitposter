// Static visual mockups for Measurement · Time exercise previews.
// Mirrors the live solveit timeGen.js — no interactivity.

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

// ── Analogue clock SVG ───────────────────────────────────────────
function AnalogueClock({ h, m, size = 72 }: { h: number; m: number; size?: number }) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 3;
  // Hour hand angle: each hour = 30°, plus minutes contribute 0.5° each
  const hourAngle = ((h % 12) + m / 60) * 30 - 90; // -90 so 12 o'clock = top
  const minAngle = (m * 6) - 90;
  const hourLen = r * 0.5;
  const minLen = r * 0.78;
  const hx = cx + hourLen * Math.cos((hourAngle * Math.PI) / 180);
  const hy = cy + hourLen * Math.sin((hourAngle * Math.PI) / 180);
  const mx = cx + minLen * Math.cos((minAngle * Math.PI) / 180);
  const my = cy + minLen * Math.sin((minAngle * Math.PI) / 180);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={r} fill="#fff7ed" stroke="#9a3412" strokeWidth="2" />
      {/* Hour marks */}
      {Array.from({ length: 12 }).map((_, i) => {
        const a = i * 30 - 90;
        const x1 = cx + (r - 4) * Math.cos((a * Math.PI) / 180);
        const y1 = cy + (r - 4) * Math.sin((a * Math.PI) / 180);
        const x2 = cx + r * Math.cos((a * Math.PI) / 180);
        const y2 = cy + r * Math.sin((a * Math.PI) / 180);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#9a3412" strokeWidth="1.4" />;
      })}
      {/* Numbers 12, 3, 6, 9 */}
      {[[12, 0, -1], [3, 1, 0], [6, 0, 1], [9, -1, 0]].map(([num, dx, dy], i) => {
        const labelR = r - 9;
        const lx = cx + labelR * (dx as number);
        const ly = cy + labelR * (dy as number) + 3;
        return <text key={i} x={lx} y={ly} textAnchor="middle" fontSize="8" fill="#9a3412" fontWeight="bold">{num}</text>;
      })}
      {/* Minute hand */}
      <line x1={cx} y1={cy} x2={mx} y2={my} stroke="#0c4a6e" strokeWidth="2" strokeLinecap="round" />
      {/* Hour hand */}
      <line x1={cx} y1={cy} x2={hx} y2={hy} stroke="#7f1d1d" strokeWidth="2.6" strokeLinecap="round" />
      {/* Centre */}
      <circle cx={cx} cy={cy} r="2" fill="#7f1d1d" />
    </svg>
  );
}

// ── Digital time display ─────────────────────────────────────────
function DigitalTime({ text }: { text: string }) {
  return (
    <div style={{ background: "#1f2937", borderRadius: 8, padding: "6px 14px", fontSize: 18, fontWeight: 800, color: "#fbbf24", letterSpacing: 2, marginBottom: 6, fontFamily: "monospace" }}>
      {text}
    </div>
  );
}

// ── Year 0 ───────────────────────────────────────────────────────
function T01() {
  return (
    <Card>
      <Instr text="What comes after lunch?" />
      <div style={{ display: "flex", gap: 6 }}>
        <ChoiceBtn label="breakfast" />
        <ChoiceBtn label="dinner" />
      </div>
    </Card>
  );
}

function T02() {
  return (
    <Card>
      <Instr text="When do you eat breakfast?" />
      <div style={{ display: "flex", gap: 6 }}>
        <ChoiceBtn label="morning" />
        <ChoiceBtn label="afternoon" />
        <ChoiceBtn label="night" />
      </div>
    </Card>
  );
}

function T03() {
  return (
    <Card>
      <Instr text="Is Saturday a weekday or weekend?" />
      <div style={{ display: "flex", gap: 6 }}>
        <ChoiceBtn label="weekday" />
        <ChoiceBtn label="weekend" />
      </div>
    </Card>
  );
}

function T04() {
  return (
    <Card>
      <Instr text="After breakfast, what comes next?" />
      <div style={{ display: "flex", gap: 6 }}>
        <ChoiceBtn label="lunch" />
        <ChoiceBtn label="dinner" />
      </div>
    </Card>
  );
}

// ── Year 1 ───────────────────────────────────────────────────────
function T11() {
  return (
    <Card>
      <Instr text="What day is before Wednesday?" />
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", justifyContent: "center" }}>
        <ChoiceBtn label="Tuesday" />
        <ChoiceBtn label="Thursday" />
        <ChoiceBtn label="Friday" />
      </div>
    </Card>
  );
}

function T12() {
  return (
    <Card>
      <Instr text="What day is after Friday?" />
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", justifyContent: "center" }}>
        <ChoiceBtn label="Saturday" />
        <ChoiceBtn label="Thursday" />
        <ChoiceBtn label="Sunday" />
      </div>
    </Card>
  );
}

function T13() {
  return (
    <Card>
      <Instr text="Put the days in order, earliest to latest." />
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center" }}>
        {["Tuesday", "Wednesday", "Monday", "Thursday"].map(d => <ChoiceBtn key={d} label={d} />)}
      </div>
    </Card>
  );
}

function T14() {
  return (
    <Card>
      <Instr text="What time is it?" />
      <AnalogueClock h={3} m={0} />
      <div style={{ display: "flex", gap: 5, marginTop: 4, flexWrap: "wrap", justifyContent: "center" }}>
        <ChoiceBtn label="3 o'clock" />
        <ChoiceBtn label="4 o'clock" />
        <ChoiceBtn label="half past 3" />
      </div>
    </Card>
  );
}

function T15() {
  return (
    <Card>
      <Instr text="What time is 5:00?" />
      <DigitalTime text="5:00" />
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", justifyContent: "center" }}>
        <ChoiceBtn label="5 o'clock" />
        <ChoiceBtn label="6 o'clock" />
        <ChoiceBtn label="half past 5" />
      </div>
    </Card>
  );
}

// ── Year 2 ───────────────────────────────────────────────────────
function T21() {
  return (
    <Card>
      <Instr text="What month is before July?" />
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", justifyContent: "center" }}>
        <ChoiceBtn label="June" />
        <ChoiceBtn label="August" />
        <ChoiceBtn label="September" />
      </div>
    </Card>
  );
}

function T22() {
  return (
    <Card>
      <Instr text="What month is after March?" />
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", justifyContent: "center" }}>
        <ChoiceBtn label="April" />
        <ChoiceBtn label="February" />
        <ChoiceBtn label="May" />
      </div>
    </Card>
  );
}

function T23() {
  return (
    <Card>
      <Instr text="What season is July in? (NZ)" />
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center" }}>
        {["summer", "autumn", "winter", "spring"].map(s => <ChoiceBtn key={s} label={s} />)}
      </div>
    </Card>
  );
}

function T24() {
  return (
    <Card>
      <Instr text="What time is it?" />
      <AnalogueClock h={2} m={30} />
      <div style={{ display: "flex", gap: 5, marginTop: 4, flexWrap: "wrap", justifyContent: "center" }}>
        <ChoiceBtn label="half past 2" />
        <ChoiceBtn label="quarter past 2" />
        <ChoiceBtn label="2 o'clock" />
      </div>
    </Card>
  );
}

function T25() {
  return (
    <Card>
      <Instr text="What time is it?" />
      <AnalogueClock h={4} m={15} />
      <div style={{ display: "flex", gap: 5, marginTop: 4, flexWrap: "wrap", justifyContent: "center" }}>
        <ChoiceBtn label="quarter past 4" />
        <ChoiceBtn label="half past 4" />
        <ChoiceBtn label="4 o'clock" />
      </div>
    </Card>
  );
}

function T26() {
  return (
    <Card>
      <Instr text="What time is it?" />
      <AnalogueClock h={7} m={45} />
      <div style={{ display: "flex", gap: 5, marginTop: 4, flexWrap: "wrap", justifyContent: "center" }}>
        <ChoiceBtn label="quarter to 8" />
        <ChoiceBtn label="quarter past 7" />
        <ChoiceBtn label="half past 7" />
      </div>
    </Card>
  );
}

function T27() {
  return (
    <Card>
      <Instr text="Which digital time matches?" />
      <AnalogueClock h={6} m={15} size={64} />
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center", marginTop: 4 }}>
        {["6:15", "6:30", "7:15", "5:15"].map(t => <ChoiceBtn key={t} label={t} />)}
      </div>
    </Card>
  );
}

// ── Year 3 ───────────────────────────────────────────────────────
function T31() {
  return (
    <Card>
      <Instr text="Type the time shown (h:mm). Nearest 5 minutes." />
      <AnalogueClock h={9} m={20} />
      <DigitalTime text="_:__" />
    </Card>
  );
}

function T32() {
  return (
    <Card>
      <Instr text="Type the time to the minute (h:mm)." />
      <AnalogueClock h={11} m={47} />
      <DigitalTime text="_:__" />
    </Card>
  );
}

function T33() {
  return (
    <Card>
      <Instr text="How would you say this time?" />
      <AnalogueClock h={3} m={10} size={64} />
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center", marginTop: 4 }}>
        {["ten past 3", "five past 3", "ten past 4", "quarter past 3"].map(t => <ChoiceBtn key={t} label={t} />)}
      </div>
    </Card>
  );
}

function T34() {
  return (
    <Card>
      <Instr text="How would you say this time?" />
      <AnalogueClock h={5} m={50} size={64} />
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center", marginTop: 4 }}>
        {["ten to 6", "five to 6", "quarter to 6", "ten to 5"].map(t => <ChoiceBtn key={t} label={t} />)}
      </div>
    </Card>
  );
}

function T35() {
  return (
    <Card>
      <Instr text="How many minutes are in 1 hour?" />
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <div style={{ border: "2px solid #e5e7eb", borderRadius: 8, width: 60, height: 32, display: "flex", alignItems: "center", justifyContent: "center", color: "#bbb", fontWeight: 700 }} />
        <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 700 }}>min</span>
      </div>
    </Card>
  );
}

function T36() {
  return (
    <Card>
      <Instr text="What is the best unit for brushing your teeth?" />
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center" }}>
        {["seconds", "minutes", "hours", "weeks"].map(u => <ChoiceBtn key={u} label={u} />)}
      </div>
    </Card>
  );
}

function T37() {
  return (
    <Card>
      <Instr text="Which is longer, 30 minutes or 1 hour?" />
      <div style={{ display: "flex", gap: 8 }}>
        <ChoiceBtn label="30 minutes" />
        <ChoiceBtn label="1 hour" />
      </div>
    </Card>
  );
}

// ── Map ──────────────────────────────────────────────────────────

export const TIME_PREVIEW_MAP: Record<string, () => React.ReactElement> = {
  "0.1": T01, "0.2": T02, "0.3": T03, "0.4": T04,
  "1.1": T11, "1.2": T12, "1.3": T13, "1.4": T14, "1.5": T15,
  "2.1": T21, "2.2": T22, "2.3": T23, "2.4": T24, "2.5": T25, "2.6": T26, "2.7": T27,
  "3.1": T31, "3.2": T32, "3.3": T33, "3.4": T34, "3.5": T35, "3.6": T36, "3.7": T37,
};

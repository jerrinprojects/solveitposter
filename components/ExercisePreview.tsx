// Static visual mockups of each exercise — no interactivity.
// Matches the appearance of Number1Level.jsx exercises from solveit.

import React from "react";

// ── Shared atoms ─────────────────────────────────────────────────

function Instr({ text }: { text: string }) {
  return (
    <p style={{ fontSize: 11, color: "#6b7280", lineHeight: 1.4, marginBottom: 8, textAlign: "center", fontWeight: 600 }}>
      {text}
    </p>
  );
}

function QBox() {
  return (
    <div style={{ border: "2px solid #e5e7eb", borderRadius: 8, width: 52, height: 32, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#bbb", fontSize: 13, margin: "0 auto" }}>?</div>
  );
}

function Dot({ color }: { color: string }) {
  return <div style={{ width: 12, height: 12, borderRadius: "50%", background: color, flexShrink: 0 }} />;
}

function SeqRow({ tokens, fontSize = 22 }: { tokens: (number | null)[]; fontSize?: number }) {
  return (
    <div style={{ display: "flex", gap: 10, justifyContent: "center", alignItems: "center", margin: "6px 0 10px", flexWrap: "wrap" }}>
      {tokens.map((t, i) =>
        t === null
          ? <div key={i} style={{ width: 44, height: 34, border: "2px solid #e5e7eb", borderRadius: 8, flexShrink: 0 }} />
          : <span key={i} style={{ display: "inline-block", minWidth: 24, textAlign: "center" as const, fontWeight: 800, fontSize }}>{t}</span>
      )}
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ flex: 1, padding: "10px 16px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      {children}
    </div>
  );
}

// Part-whole model (whole at top, two parts below)
function PartWhole({ whole, p1, p2 }: { whole: number | string; p1: number | string; p2: string }) {
  return (
    <div style={{ textAlign: "center", margin: "4px 0" }}>
      <div style={{ fontSize: 9, color: "#9ca3af", marginBottom: 2 }}>whole</div>
      <div style={{ border: "2px solid #d1d5db", borderRadius: 6, padding: "3px 14px", fontWeight: 700, fontSize: 15, display: "inline-block", marginBottom: 8 }}>
        {whole}
      </div>
      <div style={{ display: "flex", gap: 14, justifyContent: "center" }}>
        {[{ label: "part", val: String(p1) }, { label: "part", val: p2 }].map(({ label, val }, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 9, color: "#9ca3af", marginBottom: 2 }}>{label}</div>
            <div style={{ border: "2px solid #d1d5db", borderRadius: 6, padding: "3px 10px", fontWeight: 700, fontSize: 14, display: "inline-block", color: val === "?" ? "#9ca3af" : undefined }}>
              {val}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Base-ten blocks SVG (blue rods = tens, yellow cubes = ones)
function BTBSvg({ tens, ones, label }: { tens: number; ones: number; label?: string }) {
  const cell = 9, vgap = 1.5, rodW = cell;
  const rodH = cell * 10 + vgap * 9; // 106.5
  const perRow = 5, colGap = 6, rowGap = 6;
  const oGap = 2, oPerRow = 5;

  const rodCols = Math.min(tens, perRow);
  const rodRows = Math.ceil(tens / perRow);
  const rodsW = tens > 0 ? rodCols * (rodW + colGap) - colGap : 0;
  const rodsH = tens > 0 ? rodRows * (rodH + rowGap) - rowGap : 0;
  const onesW = ones > 0 ? Math.min(ones, oPerRow) * (cell + oGap) - oGap : 0;
  const onesRows = ones > 0 ? Math.ceil(ones / oPerRow) : 0;
  const onesH = ones > 0 ? onesRows * (cell + oGap) - oGap : 0;

  const midGap = tens > 0 && ones > 0 ? 12 : 0;
  const w = rodsW + midGap + onesW + 4;
  const h = Math.max(rodsH, onesH) + 4;

  return (
    <div style={{ textAlign: "center" }}>
      {label && <div style={{ fontSize: 9, color: "#6b7280", fontWeight: 700, marginBottom: 2 }}>{label}</div>}
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: "block", margin: "0 auto 6px" }}>
        {/* tens rods */}
        {Array.from({ length: tens }).map((_, i) => {
          const c = i % perRow, r = Math.floor(i / perRow);
          const x = 2 + c * (rodW + colGap);
          const y = 2 + r * (rodH + rowGap);
          return Array.from({ length: 10 }).map((__, k) => (
            <rect key={`t${i}k${k}`} x={x} y={y + k * (cell + vgap)} width={cell} height={cell} fill="#4da3ff" stroke="#2b6cb0" strokeWidth="0.8" rx="1.5" />
          ));
        })}
        {/* ones cubes */}
        {Array.from({ length: ones }).map((_, i) => {
          const c = i % oPerRow, r = Math.floor(i / oPerRow);
          return (
            <rect key={`o${i}`}
              x={2 + rodsW + midGap + c * (cell + oGap)}
              y={2 + r * (cell + oGap)}
              width={cell} height={cell}
              fill="#ffd93d" stroke="#b98c00" strokeWidth="0.8" rx="1.5" />
          );
        })}
      </svg>
    </div>
  );
}

// Hundreds SVG (blue 10×10 grid = hundreds, rods = tens, cubes = ones)
function HundsSvg({ hundreds, tens, ones, label }: { hundreds: number; tens: number; ones: number; label?: string }) {
  const cell = 7, gap = 1;
  const flat = cell * 10 + gap * 9; // 79
  const rodW = cell, sep = 10;

  const hundW = hundreds > 0 ? hundreds * (flat + sep) : 0;
  const tonsW = tens > 0 ? tens * (rodW + 4) : 0;
  const tSep = (hundreds > 0 && tens > 0) ? sep : 0;
  const oSep = (tens > 0 || hundreds > 0) && ones > 0 ? sep : 0;
  const onesW = ones > 0 ? Math.min(ones, 5) * (cell + 2) : 0;

  const w = hundW + tSep + tonsW + oSep + onesW + 4;
  const h = flat + 4;
  const hx = 2;
  const tx = hx + hundW + tSep;
  const ox = tx + tonsW + oSep;

  return (
    <div style={{ textAlign: "center" }}>
      {label && <div style={{ fontSize: 9, color: "#6b7280", fontWeight: 700, marginBottom: 2 }}>{label}</div>}
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: "block", margin: "0 auto 6px" }}>
        {/* hundreds: 10×10 blue grids */}
        {Array.from({ length: hundreds }).map((_, hi) =>
          Array.from({ length: 10 }).map((__, r) =>
            Array.from({ length: 10 }).map((__, c) => (
              <rect key={`h${hi}r${r}c${c}`}
                x={hx + hi * (flat + sep) + c * (cell + gap)}
                y={2 + r * (cell + gap)}
                width={cell} height={cell}
                fill="#4da3ff" stroke="#2b6cb0" strokeWidth="0.5" rx="1" />
            ))
          ).flat()
        ).flat()}
        {/* tens: vertical rods */}
        {Array.from({ length: tens }).map((_, ti) =>
          Array.from({ length: 10 }).map((__, k) => (
            <rect key={`t${ti}k${k}`}
              x={tx + ti * (rodW + 4)}
              y={2 + k * (cell + gap)}
              width={rodW} height={cell}
              fill="#4da3ff" stroke="#2b6cb0" strokeWidth="0.5" rx="1" />
          ))
        ).flat()}
        {/* ones: yellow cubes */}
        {Array.from({ length: ones }).map((_, oi) => (
          <rect key={`o${oi}`}
            x={ox + (oi % 5) * (cell + 2)}
            y={2 + Math.floor(oi / 5) * (cell + 2)}
            width={cell} height={cell}
            fill="#ffd93d" stroke="#b98c00" strokeWidth="0.5" rx="1" />
        ))}
      </svg>
    </div>
  );
}

// Number + Word input pair
function NumWordInputs() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5, width: "85%" }}>
      <div style={{ border: "2px solid #e5e7eb", borderRadius: 8, padding: "3px 0", fontSize: 11, color: "#9ca3af", textAlign: "center" }}>Number</div>
      <div style={{ border: "2px solid #e5e7eb", borderRadius: 8, padding: "3px 0", fontSize: 11, color: "#9ca3af", textAlign: "center" }}>Word</div>
    </div>
  );
}

// Write-in-words input
function WordInput({ num }: { num: number }) {
  return (
    <>
      <div style={{ fontSize: 32, fontWeight: 800, textAlign: "center", margin: "4px 0 8px" }}>{num}</div>
      <div style={{ border: "2px solid #e5e7eb", borderRadius: 8, padding: "4px 0", fontSize: 12, color: "#9ca3af", textAlign: "center", width: "80%" }}>Write in words</div>
    </>
  );
}

// Order three numbers display
function OrderRow({ nums }: { nums: number[] }) {
  return (
    <>
      <div style={{ display: "flex", gap: 8, justifyContent: "center", margin: "6px 0 6px" }}>
        {nums.map(n => (
          <div key={n} style={{ border: "2px solid #e5e7eb", borderRadius: 8, padding: "4px 12px", fontWeight: 700, fontSize: 15 }}>{n}</div>
        ))}
      </div>
      <div style={{ fontSize: 10, color: "#9ca3af", textAlign: "center" }}>Your order:</div>
    </>
  );
}

// Two-group compare (dots)
function TwoGroups({ dotsA, dotsB, colorA, colorB }: { dotsA: number; dotsB: number; colorA: string; colorB: string }) {
  const mkDots = (n: number, col: string) => Array.from({ length: n }).map((_, i) => <Dot key={i} color={col} />);
  return (
    <div style={{ display: "flex", gap: 8, justifyContent: "center", width: "100%" }}>
      {[{ dots: dotsA, color: colorA, label: "A" }, { dots: dotsB, color: colorB, label: "B" }].map(({ dots, color, label }) => (
        <div key={label} style={{ border: "2px solid #e5e7eb", borderRadius: 10, padding: "8px 10px", textAlign: "center", flex: 1 }}>
          <div style={{ display: "flex", gap: 4, justifyContent: "center", flexWrap: "wrap", marginBottom: 4 }}>
            {mkDots(dots, color)}
          </div>
          <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 700 }}>{label}</span>
        </div>
      ))}
    </div>
  );
}

// Two base-ten-block groups for compare exercises
function TwoBlockGroups({ aLabel, bLabel, aTens, aOnes, bTens, bOnes }: {
  aLabel: string; bLabel: string;
  aTens: number; aOnes: number; bTens: number; bOnes: number;
}) {
  const cell = 7, vg = 1.2, rodW = cell;
  const rodH = cell * 10 + vg * 9;

  function rod(tens: number, ones: number) {
    const oGap = 2, oPerRow = 4;
    const rodsW = tens > 0 ? tens * (rodW + 4) - 4 : 0;
    const onesW = ones > 0 ? Math.min(ones, oPerRow) * (cell + oGap) - oGap : 0;
    const mid = (tens > 0 && ones > 0) ? 8 : 0;
    const w = rodsW + mid + onesW + 4;
    const h = rodH + 4;
    return (
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: "block", margin: "0 auto 3px" }}>
        {Array.from({ length: tens }).map((_, ti) =>
          Array.from({ length: 10 }).map((__, k) => (
            <rect key={`t${ti}k${k}`} x={2 + ti * (rodW + 4)} y={2 + k * (cell + vg)} width={rodW} height={cell} fill="#4da3ff" stroke="#2b6cb0" strokeWidth="0.5" rx="1" />
          ))
        ).flat()}
        {Array.from({ length: ones }).map((_, oi) => (
          <rect key={`o${oi}`}
            x={2 + rodsW + mid + (oi % oPerRow) * (cell + oGap)}
            y={2 + Math.floor(oi / oPerRow) * (cell + oGap)}
            width={cell} height={cell}
            fill="#ffd93d" stroke="#b98c00" strokeWidth="0.5" rx="1" />
        ))}
      </svg>
    );
  }

  return (
    <div style={{ display: "flex", gap: 8, justifyContent: "center", width: "100%" }}>
      {[{ label: aLabel, t: aTens, o: aOnes }, { label: bLabel, t: bTens, o: bOnes }].map(({ label, t, o }) => (
        <div key={label} style={{ border: "2px solid #e5e7eb", borderRadius: 10, padding: "6px 8px", textAlign: "center", flex: 1 }}>
          {rod(t, o)}
          <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 700 }}>{label}</span>
        </div>
      ))}
    </div>
  );
}

// ── Year 0a ──────────────────────────────────────────────────────

function P01a() {
  return <Card><Instr text="Count forwards up to 10: write the missing number." /><SeqRow tokens={[6, 7, 8, null]} /><QBox /></Card>;
}
function P02a() {
  return <Card><Instr text="Count backwards from 10: write the missing number." /><SeqRow tokens={[8, 7, 6, null]} /><QBox /></Card>;
}
function P03a() {
  return (
    <Card>
      <Instr text="How many giraffes? Enter the number." />
      <div style={{ textAlign: "center", fontSize: 22, letterSpacing: 4, margin: "6px 0 10px" }}>🦒 🦒 🦒 🦒</div>
      <QBox />
    </Card>
  );
}
function P04a() {
  return <Card><Instr text="Write the number in words (e.g., 7 → seven)." /><WordInput num={9} /></Card>;
}
function P05a() {
  return (
    <Card>
      <Instr text="How many are there? Enter the number and the word." />
      <div style={{ textAlign: "center", fontSize: 18, lineHeight: 1.8, margin: "4px 0 8px" }}>🌸 🌸 🌸 🌸 🌸<br />🌸 🌸</div>
      <NumWordInputs />
    </Card>
  );
}
function P06a() {
  return <Card><Instr text="Which group has more? Tap a box." /><TwoGroups dotsA={2} dotsB={5} colorA="#f97316" colorB="#22c55e" /></Card>;
}
function P07a() {
  return <Card><Instr text="Order from smallest to largest. Click in order." /><OrderRow nums={[4, 5, 7]} /></Card>;
}
function P08a() {
  return (
    <Card>
      <Instr text="How many dots are there? Enter the number." />
      <div style={{ display: "flex", flexDirection: "column", gap: 5, alignItems: "center", margin: "6px 0 10px" }}>
        <div style={{ display: "flex", gap: 5 }}><Dot color="#1e293b" /><Dot color="#1e293b" /><Dot color="#1e293b" /></div>
        <div style={{ display: "flex", gap: 5 }}><Dot color="#1e293b" /><Dot color="#1e293b" /></div>
      </div>
      <QBox />
    </Card>
  );
}
function P09a() {
  return <Card><Instr text="Find the missing part:" /><PartWhole whole={9} p1={1} p2="?" /></Card>;
}

// ── Year 0b ──────────────────────────────────────────────────────

function P01b() {
  return <Card><Instr text="Count forwards up to 20: write the missing number." /><SeqRow tokens={[14, 15, 16, null]} /><QBox /></Card>;
}
function P02b() {
  return <Card><Instr text="Count backwards from 20: write the missing number." /><SeqRow tokens={[19, 18, 17, null]} /><QBox /></Card>;
}
function P03b() {
  return (
    <Card>
      <Instr text="How many penguins? Enter the number." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 3, justifyContent: "center", fontSize: 16, margin: "4px auto 8px", width: 130 }}>
        {Array.from({ length: 12 }).map((_, i) => <span key={i}>🐧</span>)}
      </div>
      <QBox />
    </Card>
  );
}
function P04b() {
  return <Card><Instr text="Write the number in words (e.g., 12 → twelve)." /><WordInput num={13} /></Card>;
}
function P05b() {
  return (
    <Card>
      <Instr text="How many are there? Enter the number and the word." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 2, fontSize: 14, margin: "3px auto 6px", width: 110 }}>
        {Array.from({ length: 15 }).map((_, i) => <span key={i}>🐦</span>)}
      </div>
      <NumWordInputs />
    </Card>
  );
}
function P06b() {
  return <Card><Instr text="Which group has more? Tap a box." /><TwoGroups dotsA={5} dotsB={8} colorA="#f97316" colorB="#22c55e" /></Card>;
}
function P07b() {
  return <Card><Instr text="Order from smallest to largest. Click in order." /><OrderRow nums={[9, 16, 11]} /></Card>;
}
function P08b() {
  return (
    <Card>
      <Instr text="How many dots are there? Enter the number." />
      <div style={{ display: "flex", flexDirection: "column", gap: 5, alignItems: "center", margin: "6px 0 10px" }}>
        <div style={{ display: "flex", gap: 5 }}><Dot color="#1e293b" /><Dot color="#1e293b" /><Dot color="#1e293b" /></div>
        <div style={{ display: "flex", gap: 5 }}><Dot color="#1e293b" /><Dot color="#1e293b" /><Dot color="#1e293b" /></div>
        <div style={{ display: "flex", gap: 5 }}><Dot color="#1e293b" /></div>
      </div>
      <QBox />
    </Card>
  );
}
function P09b() {
  return <Card><Instr text="Find the missing part:" /><PartWhole whole={17} p1={5} p2="?" /></Card>;
}

// ── Year 1 ───────────────────────────────────────────────────────

function P11() {
  return <Card><Instr text="Count forwards up to 100: write the missing number." /><SeqRow tokens={[82, 83, 84, null]} fontSize={19} /><QBox /></Card>;
}
function P12() {
  return <Card><Instr text="Count by 10s forwards. Fill the blank." /><SeqRow tokens={[62, 72, 82, null]} fontSize={19} /><QBox /></Card>;
}
function P13() {
  return (
    <Card>
      <Instr text="How many in total? Enter the number." />
      <BTBSvg tens={5} ones={1} label="5 tens  1 ones" />
      <QBox />
    </Card>
  );
}
function P14() {
  return <Card><Instr text="Write the number in words." /><WordInput num={66} /></Card>;
}
function P15() {
  return (
    <Card>
      <Instr text="How many in total? Enter the number and the word." />
      <BTBSvg tens={2} ones={9} label="2 tens  9 ones" />
      <NumWordInputs />
    </Card>
  );
}
function P16() {
  return <Card><Instr text="Which has greater value? Tap a box." /><TwoBlockGroups aLabel="A" bLabel="B" aTens={1} aOnes={4} bTens={3} bOnes={2} /></Card>;
}
function P17() {
  return <Card><Instr text="Order from smallest to largest. Click in order." /><OrderRow nums={[47, 74, 45]} /></Card>;
}
function P18() {
  return <Card><Instr text="Find the missing part:" /><PartWhole whole={90} p1={50} p2="?" /></Card>;
}
function P19() {
  return <Card><Instr text="Find the missing part:" /><PartWhole whole={86} p1={32} p2="?" /></Card>;
}

// ── Year 2 ───────────────────────────────────────────────────────

function P21() {
  return <Card><Instr text="Count forwards up to 120: write the missing number." /><SeqRow tokens={[38, 39, 40, null]} fontSize={19} /><QBox /></Card>;
}
function P22() {
  return <Card><Instr text="Count by 5s forwards. Fill the blank." /><SeqRow tokens={[82, 87, 92, null]} fontSize={19} /><QBox /></Card>;
}
function P23() {
  return (
    <Card>
      <Instr text="How many in total? Enter the number." />
      <BTBSvg tens={2} ones={8} label="2 tens  8 ones" />
      <QBox />
    </Card>
  );
}
function P24() {
  return <Card><Instr text="Write the number in words." /><WordInput num={57} /></Card>;
}
function P25() {
  return (
    <Card>
      <Instr text="How many in total? Enter the number and the word." />
      <BTBSvg tens={5} ones={7} label="5 tens  7 ones" />
      <NumWordInputs />
    </Card>
  );
}
function P26() {
  return <Card><Instr text="Which has greater value? Tap a box." /><TwoBlockGroups aLabel="A" bLabel="B" aTens={3} aOnes={4} bTens={5} bOnes={2} /></Card>;
}
function P27() {
  return <Card><Instr text="Order from smallest to largest. Click in order." /><OrderRow nums={[119, 106, 69]} /></Card>;
}
function P28() {
  return <Card><Instr text="Find the missing part:" /><PartWhole whole={80} p1={50} p2="?" /></Card>;
}
function P29() {
  return <Card><Instr text="Find the missing part:" /><PartWhole whole={84} p1={16} p2="?" /></Card>;
}

// ── Year 3 ───────────────────────────────────────────────────────

function P31() {
  return <Card><Instr text="Count forwards up to 1,000: write the missing number." /><SeqRow tokens={[274, 275, 276, null]} fontSize={16} /><QBox /></Card>;
}
function P32() {
  return <Card><Instr text="Count by 5s forwards. Fill the blank." /><SeqRow tokens={[923, 928, 933, null]} fontSize={16} /><QBox /></Card>;
}
function P33() {
  return (
    <Card>
      <Instr text="How many in total? Enter the number." />
      <HundsSvg hundreds={1} tens={3} ones={4} label="1 hundreds  3 tens  4 ones" />
      <QBox />
    </Card>
  );
}
function P34() {
  return <Card><Instr text="Write the number in words." /><WordInput num={889} /></Card>;
}
function P35() {
  return (
    <Card>
      <Instr text="Which digit is in the ones place in 324?" />
      <div style={{ fontSize: 28, fontWeight: 800, textAlign: "center", margin: "6px 0 10px" }}>
        3<span style={{ color: "#9ca3af" }}>2</span><span style={{ color: "#ec4899" }}>4</span>
      </div>
      <QBox />
    </Card>
  );
}
function P36() {
  return (
    <Card>
      <Instr text="Which number is greater? Tap a card." />
      <div style={{ display: "flex", gap: 10, justifyContent: "center", margin: "6px 0 6px" }}>
        {[{ n: 277, label: "A" }, { n: 946, label: "B" }].map(({ n, label }) => (
          <div key={label} style={{ border: "2px solid #e5e7eb", borderRadius: 10, padding: "8px 14px", textAlign: "center" }}>
            <div style={{ fontSize: 20, fontWeight: 800 }}>{n}</div>
            <div style={{ fontSize: 10, color: "#9ca3af", fontWeight: 700 }}>{label}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}
function P37() {
  return <Card><Instr text="Order from smallest to largest. Click in order." /><OrderRow nums={[591, 305, 202]} /></Card>;
}
function P38() {
  return <Card><Instr text="Find the missing part:" /><PartWhole whole={600} p1={200} p2="?" /></Card>;
}
function P39() {
  return <Card><Instr text="Find the missing part:" /><PartWhole whole={1000} p1={80} p2="?" /></Card>;
}

// ── Map & container ──────────────────────────────────────────────

const MAP: Record<string, () => React.ReactElement> = {
  // Year 0a
  "0.1a": P01a, "0.2a": P02a, "0.3a": P03a, "0.4a": P04a, "0.5a": P05a,
  "0.6a": P06a, "0.7a": P07a, "0.8a": P08a, "0.9a": P09a,
  // Year 0b
  "0.1b": P01b, "0.2b": P02b, "0.3b": P03b, "0.4b": P04b, "0.5b": P05b,
  "0.6b": P06b, "0.7b": P07b, "0.8b": P08b, "0.9b": P09b,
  // Year 1
  "1.1": P11, "1.2": P12, "1.3": P13, "1.4": P14, "1.5": P15,
  "1.6": P16, "1.7": P17, "1.8": P18, "1.9": P19,
  // Year 2
  "2.1": P21, "2.2": P22, "2.3": P23, "2.4": P24, "2.5": P25,
  "2.6": P26, "2.7": P27, "2.8": P28, "2.9": P29,
  // Year 3
  "3.1": P31, "3.2": P32, "3.3": P33, "3.4": P34, "3.5": P35,
  "3.6": P36, "3.7": P37, "3.8": P38, "3.9": P39,
};

export default function ExercisePreview({ code }: { code: string }) {
  const Preview = MAP[code];
  if (!Preview) return null;

  return (
    <div
      className="rounded-2xl border-2 border-pink-200 bg-white overflow-hidden"
      style={{ minHeight: 148, height: "100%", display: "flex", flexDirection: "column" }}
    >
      <Preview />
    </div>
  );
}

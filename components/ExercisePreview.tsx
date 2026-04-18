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

function SeqRow({ tokens, fontSize = 22, formatted = false }: { tokens: (number | null)[]; fontSize?: number; formatted?: boolean }) {
  return (
    <div style={{ display: "flex", gap: 10, justifyContent: "center", alignItems: "center", margin: "6px 0 10px", flexWrap: "wrap" }}>
      {tokens.map((t, i) =>
        t === null
          ? <div key={i} style={{ width: 44, height: 34, border: "2px solid #e5e7eb", borderRadius: 8, flexShrink: 0 }} />
          : <span key={i} style={{ display: "inline-block", minWidth: 24, textAlign: "center" as const, fontWeight: 800, fontSize }}>{formatted ? t.toLocaleString() : t}</span>
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
// compact=true uses smaller cells so tall content doesn't overflow the card
function BTBSvg({ tens, ones, label, compact = false, perRow: perRowProp, cellSize }: { tens: number; ones: number; label?: string; compact?: boolean; perRow?: number; cellSize?: number }) {
  const cell = cellSize ?? (compact ? 5 : 9);
  const vgap = cell <= 3 ? 0.3 : compact ? 0.5 : 1.5;
  const rodW = cell;
  const rodH = cell * 10 + vgap * 9;
  const perRow = perRowProp ?? 5, colGap = cell <= 3 ? 4 : 6, rowGap = cell <= 3 ? 4 : 6;
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
      <div style={{ fontSize: 32, fontWeight: 800, textAlign: "center", margin: "4px 0 8px" }}>{num.toLocaleString()}</div>
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
      <div style={{ textAlign: "center", fontSize: 13, lineHeight: 1.6, margin: "2px 0 5px" }}>🌸 🌸 🌸 🌸 🌸<br />🌸 🌸</div>
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
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 1, fontSize: 11, margin: "1px auto 4px", width: 85 }}>
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
      <Instr text="5 tens · 1 ones. How many in total?" />
      <BTBSvg tens={5} ones={1} compact />
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
      <Instr text="11 tens · 4 ones. How many in total?" />
      <BTBSvg tens={11} ones={4} perRow={5} cellSize={3} />
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

// ── Year 4 ───────────────────────────────────────────────────────

// Highlight one digit in a formatted number (pos 0 = ones, counting right-to-left by digit only)
function DigitHighlight({ num, pos }: { num: string; pos: number }) {
  const totalDigits = num.replace(/,/g, "").length;
  let di = 0;
  return (
    <span style={{ fontSize: 26, fontWeight: 800, letterSpacing: 1 }}>
      {num.split("").map((ch, i) => {
        if (ch === ",") return <span key={i} style={{ color: "#6b7280" }}>{ch}</span>;
        const fromRight = totalDigits - 1 - di++;
        return <span key={i} style={{ color: fromRight === pos ? "#ec4899" : "#9ca3af" }}>{ch}</span>;
      })}
    </span>
  );
}

// Expanded form boxes: e.g. 4385 → [4000, 300, 80, 5]
function ExpandRow({ parts }: { parts: number[] }) {
  return (
    <div style={{ display: "flex", gap: 4, justifyContent: "center", alignItems: "center", flexWrap: "wrap", margin: "6px 0 4px" }}>
      {parts.map((p, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span style={{ fontWeight: 800, fontSize: 14, color: "#6b7280" }}>+</span>}
          <div style={{ border: "2px solid #e5e7eb", borderRadius: 8, padding: "3px 8px", fontWeight: 700, fontSize: 13 }}>{p.toLocaleString()}</div>
        </React.Fragment>
      ))}
    </div>
  );
}

// Place value form boxes — labels can contain spaces to split onto two lines
function PVForm({ labels }: { labels: string[] }) {
  return (
    <div style={{ display: "flex", gap: 5, justifyContent: "center", flexWrap: "wrap", margin: "6px 0 4px" }}>
      {labels.map((lbl, i) => {
        const words = lbl.split(" ");
        const line1 = words.slice(0, Math.ceil(words.length / 2)).join(" ");
        const line2 = words.slice(Math.ceil(words.length / 2)).join(" ");
        return (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{ border: "2px solid #e5e7eb", borderRadius: 6, width: 36, height: 26, marginBottom: 2 }} />
            <div style={{ fontSize: 7.5, color: "#6b7280", fontWeight: 700, lineHeight: 1.3, maxWidth: 40 }}>
              {line1}
              {line2 && <><br />{line2}</>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Compare two numbers with a blank symbol selector
function CompareRow({ a, b }: { a: string; b: string }) {
  return (
    <div style={{ display: "flex", gap: 8, justifyContent: "center", alignItems: "center", margin: "8px 0 6px" }}>
      <div style={{ border: "2px solid #e5e7eb", borderRadius: 8, padding: "4px 10px", fontWeight: 700, fontSize: 14 }}>{a}</div>
      <div style={{ border: "2px solid #e5e7eb", borderRadius: 8, width: 32, height: 30, display: "flex", alignItems: "center", justifyContent: "center", color: "#9ca3af", fontSize: 18, fontWeight: 700 }}>?</div>
      <div style={{ border: "2px solid #e5e7eb", borderRadius: 8, padding: "4px 10px", fontWeight: 700, fontSize: 14 }}>{b}</div>
    </div>
  );
}

// Round number display
function RoundDisplay({ num, unit }: { num: string; unit: string }) {
  return (
    <div style={{ textAlign: "center", margin: "4px 0 6px" }}>
      <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>{num}</div>
      <div style={{ fontSize: 10, color: "#6b7280", fontWeight: 700, marginBottom: 6 }}>Round to nearest {unit}</div>
    </div>
  );
}

function P41() {
  return <Card><Instr text="Skip count by 1,000. Fill the missing numbers." /><SeqRow tokens={[1811, null, null, 4811]} fontSize={13} formatted /><QBox /></Card>;
}
function P42() {
  return (
    <Card>
      <Instr text="Which digit is in the thousands place?" />
      <div style={{ textAlign: "center", margin: "6px 0 10px" }}>
        <DigitHighlight num="7,483" pos={3} />
      </div>
      <QBox />
    </Card>
  );
}
function P43() {
  return (
    <Card>
      <Instr text="How many hundreds are in this number?" />
      <div style={{ fontSize: 28, fontWeight: 800, textAlign: "center", margin: "6px 0 10px" }}>1,066</div>
      <QBox />
    </Card>
  );
}
function P44() {
  return (
    <Card>
      <Instr text="Write 4,385 in expanded form." />
      <div style={{ fontSize: 16, fontWeight: 800, textAlign: "center", marginBottom: 4 }}>4,385 =</div>
      <ExpandRow parts={[4000, 300, 80, 5]} />
    </Card>
  );
}
function P45() {
  return (
    <Card>
      <Instr text="Write 7,436 in place value form." />
      <PVForm labels={["thousands", "hundreds", "tens", "ones"]} />
    </Card>
  );
}
function P46() {
  return <Card><Instr text="Write the number in words." /><WordInput num={9483} /></Card>;
}
function P47() {
  return (
    <Card>
      <Instr text="Compare. Write &lt;, &gt;, or =." />
      <CompareRow a="7,609" b="4,158" />
      <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
        {["<", ">", "="].map(s => (
          <div key={s} style={{ border: "2px solid #e5e7eb", borderRadius: 8, width: 30, height: 26, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, color: "#9ca3af" }}>{s}</div>
        ))}
      </div>
    </Card>
  );
}
function P48() {
  return <Card><Instr text="Order from smallest to largest. Click in order." /><OrderRow nums={[1799, 627, 4715]} /></Card>;
}
function P49() {
  return (
    <Card>
      <RoundDisplay num="6,852" unit="1,000" />
      <QBox />
    </Card>
  );
}

// ── Year 5a ──────────────────────────────────────────────────────

function P51a() {
  return <Card><Instr text="Skip count by 10,000. Fill the missing numbers." /><SeqRow tokens={[39440, null, null, 69440]} fontSize={11} formatted /><QBox /></Card>;
}
function P52a() {
  return (
    <Card>
      <Instr text="Which digit is in the hundred thousands place?" />
      <div style={{ textAlign: "center", margin: "6px 0 10px" }}>
        <DigitHighlight num="905,649" pos={5} />
      </div>
      <QBox />
    </Card>
  );
}
function P53a() {
  return (
    <Card>
      <Instr text="How many ten thousands are in this number?" />
      <div style={{ fontSize: 24, fontWeight: 800, textAlign: "center", margin: "6px 0 10px" }}>31,907</div>
      <QBox />
    </Card>
  );
}
function P54a() {
  return (
    <Card>
      <Instr text="Write 365,929 in expanded form." />
      <div style={{ fontSize: 13, fontWeight: 800, textAlign: "center", marginBottom: 4 }}>365,929 =</div>
      <ExpandRow parts={[300000, 60000, 5000, 900, 20, 9]} />
    </Card>
  );
}
function P55a() {
  return (
    <Card>
      <Instr text="Write 826,899 in place value form." />
      <PVForm labels={["hundred thousands", "ten thousands", "thousands", "hundreds", "tens", "ones"]} />
    </Card>
  );
}
function P56a() {
  return <Card><Instr text="Write the number in words." /><WordInput num={83058} /></Card>;
}
function P57a() {
  return (
    <Card>
      <Instr text="Compare. Write &lt;, &gt;, or =." />
      <CompareRow a="76,400" b="47,830" />
      <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
        {["<", ">", "="].map(s => (
          <div key={s} style={{ border: "2px solid #e5e7eb", borderRadius: 8, width: 30, height: 26, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, color: "#9ca3af" }}>{s}</div>
        ))}
      </div>
    </Card>
  );
}
function P58a() {
  return <Card><Instr text="Order from smallest to largest. Click in order." /><OrderRow nums={[8922, 41875, 92409]} /></Card>;
}
function P59a() {
  return (
    <Card>
      <RoundDisplay num="85,697" unit="10,000" />
      <QBox />
    </Card>
  );
}

// ── Year 5b ──────────────────────────────────────────────────────

function P51b() {
  return <Card><Instr text="Skip count by 100,000. Fill the missing numbers." /><SeqRow tokens={[200000, null, null, 500000]} fontSize={10} formatted /><QBox /></Card>;
}
function P52b() {
  return (
    <Card>
      <Instr text="Which digit is in the millions place?" />
      <div style={{ textAlign: "center", margin: "6px 0 10px" }}>
        <DigitHighlight num="5,986,981" pos={6} />
      </div>
      <QBox />
    </Card>
  );
}
function P53b() {
  return (
    <Card>
      <Instr text="How many hundred thousands are in this number?" />
      <div style={{ fontSize: 22, fontWeight: 800, textAlign: "center", margin: "6px 0 10px" }}>432,841</div>
      <QBox />
    </Card>
  );
}
function P54b() {
  return (
    <Card>
      <Instr text="Write 358,782 in expanded form." />
      <div style={{ fontSize: 13, fontWeight: 800, textAlign: "center", marginBottom: 4 }}>358,782 =</div>
      <ExpandRow parts={[300000, 50000, 8000, 700, 80, 2]} />
    </Card>
  );
}
function P55b() {
  return (
    <Card>
      <Instr text="Write 778,488 in place value form." />
      <PVForm labels={["hundred thousands", "ten thousands", "thousands", "hundreds", "tens", "ones"]} />
    </Card>
  );
}
function P56b() {
  return <Card><Instr text="Write the number in words." /><WordInput num={881548} /></Card>;
}
function P57b() {
  return (
    <Card>
      <Instr text="Compare. Write &lt;, &gt;, or =." />
      <CompareRow a="51,371" b="99,902" />
      <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
        {["<", ">", "="].map(s => (
          <div key={s} style={{ border: "2px solid #e5e7eb", borderRadius: 8, width: 30, height: 26, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, color: "#9ca3af" }}>{s}</div>
        ))}
      </div>
    </Card>
  );
}
function P58b() {
  return <Card><Instr text="Order from smallest to largest. Click in order." /><OrderRow nums={[15345, 614872, 981600]} /></Card>;
}
function P59b() {
  return (
    <Card>
      <RoundDisplay num="229,831" unit="100,000" />
      <QBox />
    </Card>
  );
}

// ── Year 6 ───────────────────────────────────────────────────────

// Factor pair input (__ × __ = n)
function FactorPairInput({ n }: { n: number }) {
  return (
    <div style={{ display: "flex", gap: 8, justifyContent: "center", alignItems: "center", margin: "8px 0 4px" }}>
      <div style={{ border: "2px solid #e5e7eb", borderRadius: 8, width: 36, height: 30, display: "flex", alignItems: "center", justifyContent: "center", color: "#9ca3af", fontWeight: 700 }}>?</div>
      <span style={{ fontWeight: 800, fontSize: 18 }}>×</span>
      <div style={{ border: "2px solid #e5e7eb", borderRadius: 8, width: 36, height: 30, display: "flex", alignItems: "center", justifyContent: "center", color: "#9ca3af", fontWeight: 700 }}>?</div>
      <span style={{ fontWeight: 800, fontSize: 18 }}>=</span>
      <span style={{ fontWeight: 800, fontSize: 20 }}>{n}</span>
    </div>
  );
}

// All factor pairs boxes
function AllFactorPairs({ n, pairs }: { n: number; pairs: [number, number][] }) {
  return (
    <div style={{ margin: "4px 0 4px" }}>
      <div style={{ fontSize: 11, color: "#6b7280", fontWeight: 700, textAlign: "center", marginBottom: 4 }}>Factor pairs of {n}:</div>
      <div style={{ display: "flex", gap: 4, justifyContent: "center", flexWrap: "wrap" }}>
        {pairs.map(([a, b], i) => (
          <div key={i} style={{ border: "2px solid #e5e7eb", borderRadius: 8, padding: "2px 8px", fontSize: 12, fontWeight: 700, color: "#6b7280" }}>{a} × {b}</div>
        ))}
      </div>
    </div>
  );
}

// Square/cube notation display
function PowerNotation({ base, exp }: { base: number | string; exp: number | string }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "flex-start", fontSize: 28, fontWeight: 800, margin: "6px 0" }}>
      <span>{base}</span>
      <sup style={{ fontSize: 16, fontWeight: 800, marginTop: 2 }}>{exp}</sup>
    </div>
  );
}

// Recognise list (circle the square/cube numbers)
function RecogniseList({ nums, targets }: { nums: number[]; targets: number[] }) {
  return (
    <div style={{ display: "flex", gap: 5, justifyContent: "center", flexWrap: "wrap", margin: "6px 0 6px" }}>
      {nums.map(n => {
        const isTarget = targets.includes(n);
        return (
          <div key={n} style={{
            border: isTarget ? "2px solid #ec4899" : "2px solid #e5e7eb",
            borderRadius: 20,
            padding: "3px 10px",
            fontWeight: 700,
            fontSize: 14,
            color: isTarget ? "#ec4899" : "#374151",
          }}>{n}</div>
        );
      })}
    </div>
  );
}

// Number line for negatives (static SVG)
function NegNumberLine({ min, max, target }: { min: number; max: number; target: number }) {
  const w = 220, h = 60, padX = 16, y = 30;
  const innerW = w - padX * 2;
  const toX = (v: number) => padX + ((v - min) / (max - min)) * innerW;
  const vals: number[] = [];
  for (let v = min; v <= max; v++) vals.push(v);
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: "block", margin: "0 auto" }}>
      <line x1={padX} y1={y} x2={w - padX} y2={y} stroke="#374151" strokeWidth="1.5" />
      {vals.map(v => {
        const x = toX(v);
        const isT = v === target;
        const show = v === min || v === max || v === 0;
        return (
          <g key={v}>
            <line x1={x} y1={y - 6} x2={x} y2={y + 6} stroke="#374151" strokeWidth="1" />
            {isT && <circle cx={x} cy={y} r={7} fill="#ec4899" opacity={0.9} />}
            {show && (
              <text x={x} y={y + 20} textAnchor="middle" fontSize="10" fontWeight="700" fill="#374151">{v}</text>
            )}
            {!show && !isT && (
              <rect x={x - 9} y={y + 11} width={18} height={12} rx={3} fill="#fff" stroke="#d1d5db" />
            )}
          </g>
        );
      })}
    </svg>
  );
}

function P61() {
  return (
    <Card>
      <Instr text="Find a factor pair for 24." />
      <FactorPairInput n={24} />
    </Card>
  );
}
function P62() {
  return (
    <Card>
      <Instr text="Find all the factor pairs for 18." />
      <AllFactorPairs n={18} pairs={[[1, 18], [2, 9], [3, 6]]} />
    </Card>
  );
}
function P63() {
  return (
    <Card>
      <Instr text="Write 9² as a multiplication." />
      <div style={{ textAlign: "center", margin: "4px 0" }}>
        <PowerNotation base={9} exp={2} />
        <div style={{ fontSize: 13, fontWeight: 700, color: "#6b7280", marginTop: 2 }}>= <span style={{ border: "2px solid #e5e7eb", borderRadius: 6, padding: "1px 8px" }}>?</span> × <span style={{ border: "2px solid #e5e7eb", borderRadius: 6, padding: "1px 8px" }}>?</span></div>
      </div>
    </Card>
  );
}
function P64() {
  return (
    <Card>
      <Instr text="Write 12 × 12 as a square number." />
      <div style={{ textAlign: "center", margin: "4px 0", fontSize: 18, fontWeight: 800 }}>
        12 × 12 = <span style={{ display: "inline-flex", alignItems: "flex-start" }}>
          <span style={{ border: "2px solid #e5e7eb", borderRadius: 6, padding: "1px 8px", fontSize: 15 }}>?</span>
          <sup style={{ border: "2px solid #e5e7eb", borderRadius: 4, fontSize: 11, padding: "0 4px", marginTop: 2 }}>?</sup>
        </span>
      </div>
    </Card>
  );
}
function P65() {
  return (
    <Card>
      <Instr text="Calculate the value." />
      <div style={{ textAlign: "center", margin: "4px 0 8px" }}>
        <PowerNotation base={4} exp={2} />
        <span style={{ fontSize: 18, fontWeight: 700 }}> = </span>
      </div>
      <QBox />
    </Card>
  );
}
function P66() {
  return (
    <Card>
      <Instr text="Circle the square numbers." />
      <RecogniseList nums={[100, 126, 144, 35, 27]} targets={[100, 144]} />
    </Card>
  );
}
function P67() {
  return <Card><Instr text="Count forwards. Fill the missing numbers." /><SeqRow tokens={[-10, null, null, -7, null]} fontSize={14} /><QBox /></Card>;
}
function P68() {
  return (
    <Card>
      <Instr text="Write the number in words." />
      <div style={{ fontSize: 34, fontWeight: 800, textAlign: "center", margin: "4px 0 8px" }}>−7</div>
      <div style={{ border: "2px solid #e5e7eb", borderRadius: 8, padding: "4px 0", fontSize: 11, color: "#9ca3af", textAlign: "center", width: "80%" }}>Write in words</div>
    </Card>
  );
}
function P69() {
  return (
    <Card>
      <Instr text="Click on −3 on the number line." />
      <NegNumberLine min={-6} max={3} target={-3} />
    </Card>
  );
}

// ── Year 7 ───────────────────────────────────────────────────────

// Power-of-10 notation: base^exp inline
function Pow10({ exp }: { exp: number | string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "flex-start", fontWeight: 800, fontSize: 20 }}>
      <span>10</span>
      <sup style={{ fontSize: 12, fontWeight: 800, marginTop: 1 }}>{exp}</sup>
    </span>
  );
}

// Expanded form row: ? × 10^n + ? × 10^m + ...
function ExpandedPow10({ exponents }: { exponents: number[] }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 4, justifyContent: "center", alignItems: "center", margin: "6px 0 4px", fontSize: 13 }}>
      {exponents.map((e, i) => (
        <React.Fragment key={e}>
          <div style={{ border: "2px solid #e5e7eb", borderRadius: 6, width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#9ca3af" }}>?</div>
          <span style={{ fontWeight: 700 }}>×</span>
          <Pow10 exp={e} />
          {i < exponents.length - 1 && <span style={{ fontWeight: 700, color: "#6b7280" }}>+</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

// Numbered answer boxes (for common multiples)
function NumberedBoxes({ labels }: { labels: string[] }) {
  return (
    <div style={{ display: "flex", gap: 6, justifyContent: "center", margin: "6px 0 4px" }}>
      {labels.map((lbl, i) => (
        <div key={i} style={{ textAlign: "center" }}>
          <div style={{ border: "2px solid #e5e7eb", borderRadius: 8, width: 40, height: 30, marginBottom: 2 }} />
          <div style={{ fontSize: 9, color: "#9ca3af", fontWeight: 700 }}>{lbl}</div>
        </div>
      ))}
    </div>
  );
}

// Number tap row (for prime/composite click)
function TapRow({ nums, highlightIdx }: { nums: number[]; highlightIdx?: number }) {
  return (
    <div style={{ display: "flex", gap: 8, justifyContent: "center", margin: "8px 0 6px" }}>
      {nums.map((n, i) => (
        <div key={i} style={{
          border: `2px solid ${i === highlightIdx ? "#ec4899" : "#e5e7eb"}`,
          borderRadius: 10,
          padding: "6px 16px",
          fontWeight: 800,
          fontSize: 18,
          color: i === highlightIdx ? "#ec4899" : "#374151",
        }}>{n}</div>
      ))}
    </div>
  );
}

function P71() {
  return (
    <Card>
      <Instr text="Complete the place value sentence:" />
      <div style={{ textAlign: "center", fontSize: 13, fontWeight: 700, color: "#6b7280", marginBottom: 6 }}>200,000 = 2 × 10<sup>?</sup></div>
      <div style={{ display: "flex", gap: 8, justifyContent: "center", alignItems: "center" }}>
        <span style={{ fontWeight: 800, fontSize: 15 }}>200,000 = 2 ×</span>
        <div style={{ display: "inline-flex", alignItems: "flex-start", fontWeight: 800, fontSize: 18 }}>
          <span>10</span>
          <div style={{ border: "2px solid #e5e7eb", borderRadius: 6, width: 26, height: 20, marginTop: 0, display: "inline-block" }} />
        </div>
      </div>
    </Card>
  );
}
function P72() {
  return (
    <Card>
      <Instr text="Write 39,759 in expanded form. Fill each box with the correct digit." />
      <ExpandedPow10 exponents={[4, 3, 2, 1, 0]} />
    </Card>
  );
}
function P73() {
  return (
    <Card>
      <Instr text="Convert the expanded form into a number:" />
      <div style={{ fontSize: 11, fontWeight: 700, textAlign: "center", margin: "4px 0 6px", color: "#374151" }}>
        7×10<sup>4</sup> + 9×10<sup>3</sup> + 7×10<sup>2</sup> + 3×10<sup>1</sup> + 7×10<sup>0</sup>
      </div>
      <div style={{ border: "2px solid #e5e7eb", borderRadius: 8, height: 28, width: "80%", margin: "0 auto" }} />
    </Card>
  );
}
function P74() {
  return (
    <Card>
      <Instr text="Work out the square root:" />
      <div style={{ textAlign: "center", fontSize: 22, fontWeight: 800, margin: "6px 0 10px" }}>
        <span style={{ fontSize: 18, marginRight: 2 }}>√</span>169
      </div>
      <QBox />
    </Card>
  );
}
function P75() {
  return (
    <Card>
      <Instr text="Click the prime number." />
      <TapRow nums={[4, 2, 27]} highlightIdx={1} />
    </Card>
  );
}
function P76() {
  return (
    <Card>
      <Instr text="Write the common factors of 22 and 11 in order." />
      <div style={{ fontSize: 10, color: "#6b7280", textAlign: "center", marginBottom: 4 }}>Common factors to find: 2</div>
      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        <div style={{ border: "2px solid #e5e7eb", borderRadius: 8, width: 40, height: 30, display: "flex", alignItems: "center", justifyContent: "center", color: "#9ca3af", fontWeight: 700 }}>?</div>
        <div style={{ border: "2px solid #e5e7eb", borderRadius: 8, width: 40, height: 30, display: "flex", alignItems: "center", justifyContent: "center", color: "#9ca3af", fontWeight: 700 }}>?</div>
      </div>
    </Card>
  );
}
function P77() {
  return (
    <Card>
      <Instr text="Write the first 3 common multiples of 9 and 19 in order." />
      <NumberedBoxes labels={["#1", "#2", "#3"]} />
    </Card>
  );
}
function P78() {
  return (
    <Card>
      <Instr text="Find the highest common factor (HCF) of 19, 12." />
      <div style={{ border: "2px solid #e5e7eb", borderRadius: 8, height: 30, width: "60%", margin: "8px auto 4px", display: "flex", alignItems: "center", justifyContent: "center", color: "#9ca3af", fontSize: 12, fontWeight: 700 }}>HCF</div>
    </Card>
  );
}
function P79() {
  return (
    <Card>
      <Instr text="Find the lowest common multiple (LCM) of 14, 3." />
      <div style={{ border: "2px solid #e5e7eb", borderRadius: 8, height: 30, width: "60%", margin: "8px auto 4px", display: "flex", alignItems: "center", justifyContent: "center", color: "#9ca3af", fontSize: 12, fontWeight: 700 }}>LCM</div>
    </Card>
  );
}

// ── Year 8 ───────────────────────────────────────────────────────

// Expanded form row with negative exponents
function ExpandedPow10Neg({ exponents }: { exponents: number[] }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 4, justifyContent: "center", alignItems: "center", margin: "6px 0 4px", fontSize: 12 }}>
      {exponents.map((e, i) => (
        <React.Fragment key={e}>
          <div style={{ border: "2px solid #e5e7eb", borderRadius: 6, width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#9ca3af", fontSize: 11 }}>?</div>
          <span style={{ fontWeight: 700 }}>×</span>
          <span style={{ display: "inline-flex", alignItems: "flex-start", fontWeight: 800, fontSize: 16 }}>
            <span>10</span>
            <sup style={{ fontSize: 10, fontWeight: 800, marginTop: 1 }}>{e}</sup>
          </span>
          {i < exponents.length - 1 && <span style={{ fontWeight: 700, color: "#6b7280" }}>+</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

// Prime factorization: n = p^e × p^e ...
function PrimeFactorBoxes({ n }: { n: number }) {
  return (
    <div style={{ margin: "6px 0 4px", textAlign: "center" }}>
      <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 6 }}>{n}</div>
      <div style={{ display: "flex", gap: 6, justifyContent: "center", alignItems: "center" }}>
        <div style={{ border: "2px solid #e5e7eb", borderRadius: 6, padding: "2px 8px", fontSize: 13, color: "#9ca3af", fontWeight: 700 }}>p</div>
        <sup style={{ fontSize: 11 }}><div style={{ border: "2px solid #e5e7eb", borderRadius: 4, width: 18, height: 16, display: "inline-block" }} /></sup>
        <span style={{ fontWeight: 800, fontSize: 14 }}>×</span>
        <div style={{ border: "2px solid #e5e7eb", borderRadius: 6, padding: "2px 8px", fontSize: 13, color: "#9ca3af", fontWeight: 700 }}>p</div>
        <sup style={{ fontSize: 11 }}><div style={{ border: "2px solid #e5e7eb", borderRadius: 4, width: 18, height: 16, display: "inline-block" }} /></sup>
      </div>
    </div>
  );
}

function P81() {
  return (
    <Card>
      <Instr text="Write as a decimal:" />
      <div style={{ textAlign: "center", fontSize: 22, fontWeight: 800, margin: "4px 0 8px" }}>
        10<sup style={{ fontSize: 14 }}>−3</sup> = ?
      </div>
      <div style={{ fontSize: 10, color: "#9ca3af", textAlign: "center", marginBottom: 6 }}>e.g. 0.01</div>
      <QBox />
    </Card>
  );
}
function P82() {
  return (
    <Card>
      <Instr text="Write 0.003 using powers of 10. Fill the boxes." />
      <div style={{ display: "flex", gap: 6, justifyContent: "center", alignItems: "center", margin: "6px 0 4px" }}>
        <span style={{ fontWeight: 800, fontSize: 15 }}>0.003 =</span>
        <div style={{ border: "2px solid #e5e7eb", borderRadius: 6, width: 28, height: 26, display: "flex", alignItems: "center", justifyContent: "center", color: "#9ca3af", fontWeight: 700 }}>?</div>
        <span style={{ fontWeight: 800, fontSize: 15 }}>×</span>
        <span style={{ display: "inline-flex", alignItems: "flex-start", fontWeight: 800, fontSize: 18 }}>
          <span>10</span>
          <div style={{ border: "2px solid #e5e7eb", borderRadius: 4, width: 22, height: 18, marginTop: 1 }} />
        </span>
      </div>
    </Card>
  );
}
function P83() {
  return (
    <Card>
      <Instr text="Expand 27.97 using powers of 10. Fill each box." />
      <ExpandedPow10Neg exponents={[1, 0, -1, -2]} />
    </Card>
  );
}
function P84() {
  return (
    <Card>
      <Instr text="Convert the expanded form into a number:" />
      <div style={{ fontSize: 10, fontWeight: 700, textAlign: "center", margin: "4px 0 6px", color: "#374151" }}>
        9×10<sup>1</sup> + 2×10<sup>0</sup> + 0×10<sup>−1</sup> + 4×10<sup>−2</sup>
      </div>
      <div style={{ border: "2px solid #e5e7eb", borderRadius: 8, height: 28, width: "80%", margin: "0 auto 4px" }} />
      <div style={{ fontSize: 9, color: "#9ca3af", textAlign: "center" }}>You can type a dot or just a digit (e.g. 92.04)</div>
    </Card>
  );
}
function P85() {
  return (
    <Card>
      <Instr text="Break 100 into prime factors." />
      <PrimeFactorBoxes n={100} />
    </Card>
  );
}
function P86() {
  return (
    <Card>
      <Instr text="Work out the cube root:" />
      <div style={{ textAlign: "center", fontSize: 22, fontWeight: 800, margin: "6px 0 10px" }}>
        <sup style={{ fontSize: 13 }}>3</sup><span style={{ fontSize: 18, marginRight: 1 }}>√</span>64
      </div>
      <QBox />
    </Card>
  );
}
function P87() {
  return (
    <Card>
      <Instr text="Order the numbers smallest → largest. Click in order." />
      <OrderRow nums={[10, -6, -15]} />
    </Card>
  );
}
function P88() {
  return (
    <Card>
      <Instr text="Work out:" />
      <div style={{ textAlign: "center", fontSize: 26, fontWeight: 800, margin: "6px 0 10px" }}>−11 + −3</div>
      <QBox />
    </Card>
  );
}
function P89() {
  return (
    <Card>
      <Instr text="Work out:" />
      <div style={{ textAlign: "center", fontSize: 26, fontWeight: 800, margin: "6px 0 10px" }}>−42 ÷ 7</div>
      <QBox />
    </Card>
  );
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
  // Year 4
  "4.1": P41, "4.2": P42, "4.3": P43, "4.4": P44, "4.5": P45,
  "4.6": P46, "4.7": P47, "4.8": P48, "4.9": P49,
  // Year 5a
  "5.1a": P51a, "5.2a": P52a, "5.3a": P53a, "5.4a": P54a, "5.5a": P55a,
  "5.6a": P56a, "5.7a": P57a, "5.8a": P58a, "5.9a": P59a,
  // Year 5b
  "5.1b": P51b, "5.2b": P52b, "5.3b": P53b, "5.4b": P54b, "5.5b": P55b,
  "5.6b": P56b, "5.7b": P57b, "5.8b": P58b, "5.9b": P59b,
  // Year 6
  "6.1": P61, "6.2": P62, "6.3": P63, "6.4": P64, "6.5": P65,
  "6.6": P66, "6.7": P67, "6.8": P68, "6.9": P69,
  // Year 7
  "7.1": P71, "7.2": P72, "7.3": P73, "7.4": P74, "7.5": P75,
  "7.6": P76, "7.7": P77, "7.8": P78, "7.9": P79,
  // Year 8
  "8.1": P81, "8.2": P82, "8.3": P83, "8.4": P84, "8.5": P85,
  "8.6": P86, "8.7": P87, "8.8": P88, "8.9": P89,
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

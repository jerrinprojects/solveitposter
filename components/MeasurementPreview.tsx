// Static visual mockups for Measurement · Length exercise previews.
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

function Bar({ w, color, label }: { w: number; color: string; label?: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "flex-start" }}>
      {label && <span style={{ fontSize: 10, color: "#9ca3af", fontWeight: 700 }}>{label}</span>}
      <div style={{ width: w, height: 16, borderRadius: 4, background: color }} />
    </div>
  );
}

// ── L0.1 — Tap the longer bar ────────────────────────────────────
function L01() {
  return (
    <Card>
      <Instr text="Tap the longer bar." />
      <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start" }}>
        <Bar w={90} color="#f9a8d4" label="A" />
        <Bar w={55} color="#93c5fd" label="B" />
      </div>
    </Card>
  );
}

// ── L0.2 — Tap the shorter bar ───────────────────────────────────
function L02() {
  return (
    <Card>
      <Instr text="Tap the shorter bar." />
      <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start" }}>
        <Bar w={80} color="#86efac" label="A" />
        <Bar w={45} color="#fde68a" label="B" />
      </div>
    </Card>
  );
}

// ── L0.3 — Tap the longest bar ───────────────────────────────────
function L03() {
  return (
    <Card>
      <Instr text="Tap the longest bar." />
      <div style={{ display: "flex", flexDirection: "column", gap: 7, alignItems: "flex-start" }}>
        <Bar w={65} color="#f9a8d4" label="A" />
        <Bar w={100} color="#93c5fd" label="B" />
        <Bar w={45} color="#86efac" label="C" />
      </div>
    </Card>
  );
}

// ── L0.4 — Tap the shortest bar ──────────────────────────────────
function L04() {
  return (
    <Card>
      <Instr text="Tap the shortest bar." />
      <div style={{ display: "flex", flexDirection: "column", gap: 7, alignItems: "flex-start" }}>
        <Bar w={80} color="#fca5a5" label="A" />
        <Bar w={50} color="#fde68a" label="B" />
        <Bar w={35} color="#c4b5fd" label="C" />
      </div>
    </Card>
  );
}

// ── L1.1 — Longer / shorter / taller word choice ─────────────────
function L11() {
  return (
    <Card>
      <Instr text="Choose the correct word." />
      <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-start", marginBottom: 8 }}>
        <Bar w={90} color="#f9a8d4" label="A" />
        <Bar w={55} color="#93c5fd" label="B" />
      </div>
      <div style={{ display: "flex", gap: 5 }}>
        <ChoiceBtn label="longer" />
        <ChoiceBtn label="shorter" />
        <ChoiceBtn label="taller" />
      </div>
    </Card>
  );
}

// ── L1.2 — Order shortest → longest ─────────────────────────────
function L12() {
  return (
    <Card>
      <Instr text="Order: shortest → longest." />
      <div style={{ display: "flex", gap: 8, alignItems: "flex-end", justifyContent: "center" }}>
        {[40, 70, 55].map((h, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
            <div style={{ width: 18, height: h, borderRadius: 4, background: ["#f9a8d4", "#93c5fd", "#86efac"][i] }} />
            <span style={{ fontSize: 10, color: "#9ca3af", fontWeight: 700 }}>{["A", "B", "C"][i]}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ── L1.3 — Order longest → shortest ─────────────────────────────
function L13() {
  return (
    <Card>
      <Instr text="Order: longest → shortest." />
      <div style={{ display: "flex", gap: 8, alignItems: "flex-end", justifyContent: "center" }}>
        {[65, 38, 50].map((h, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
            <div style={{ width: 18, height: h, borderRadius: 4, background: ["#fca5a5", "#fde68a", "#c4b5fd"][i] }} />
            <span style={{ fontSize: 10, color: "#9ca3af", fontWeight: 700 }}>{["A", "B", "C"][i]}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ── L1.4 — Same / Different ──────────────────────────────────────
function L14() {
  return (
    <Card>
      <Instr text="Are these the same length?" />
      <div style={{ display: "flex", flexDirection: "column", gap: 7, alignItems: "flex-start", marginBottom: 8 }}>
        <Bar w={75} color="#f9a8d4" label="A" />
        <Bar w={75} color="#93c5fd" label="B" />
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        <ChoiceBtn label="Same" />
        <ChoiceBtn label="Different" />
      </div>
    </Card>
  );
}

// ── L2.1 — SVG ruler with pink arrow ─────────────────────────────
function L21() {
  return (
    <Card>
      <Instr text="What measurement is the arrow pointing to?" />
      <svg width="150" height="44" viewBox="0 0 150 44">
        {/* Ruler body */}
        <rect x="5" y="20" width="140" height="18" rx="2" fill="#fef9c3" stroke="#d1d5db" strokeWidth="1.5" />
        {/* Tick marks 0–10 */}
        {Array.from({ length: 11 }, (_, i) => (
          <g key={i}>
            <line x1={5 + i * 14} y1="20" x2={5 + i * 14} y2={i % 5 === 0 ? "12" : "15"} stroke="#6b7280" strokeWidth="1.2" />
            {i % 2 === 0 && <text x={5 + i * 14} y="10" textAnchor="middle" fontSize="7" fill="#6b7280">{i}</text>}
          </g>
        ))}
        {/* Arrow at 7 cm = 5 + 7*14 = 103 */}
        <polygon points="103,18 99,8 107,8" fill="#f9a8d4" />
        <line x1="103" y1="18" x2="103" y2="8" stroke="#ec4899" strokeWidth="1.5" />
      </svg>
      <QBox />
    </Card>
  );
}

// ── L2.2 — Ruler + multiple choice ───────────────────────────────
function L22() {
  return (
    <Card>
      <Instr text="Which measurement does the arrow show?" />
      <svg width="140" height="42" viewBox="0 0 140 42">
        <rect x="5" y="20" width="130" height="16" rx="2" fill="#fef9c3" stroke="#d1d5db" strokeWidth="1.5" />
        {Array.from({ length: 10 }, (_, i) => (
          <g key={i}>
            <line x1={5 + i * 13} y1="20" x2={5 + i * 13} y2={i % 5 === 0 ? "13" : "16"} stroke="#6b7280" strokeWidth="1" />
            {i % 2 === 0 && <text x={5 + i * 13} y="11" textAnchor="middle" fontSize="7" fill="#6b7280">{i}</text>}
          </g>
        ))}
        {/* Arrow at 4 cm = 5 + 4*13 = 57 */}
        <polygon points="57,18 53,8 61,8" fill="#f9a8d4" />
      </svg>
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center" }}>
        {["3 cm", "4 cm", "5 cm", "6 cm"].map(l => <ChoiceBtn key={l} label={l} />)}
      </div>
    </Card>
  );
}

// ── L2.3 — Rectangle perimeter with labels ───────────────────────
function L23() {
  return (
    <Card>
      <Instr text="Find the perimeter of this rectangle." />
      <svg width="110" height="70" viewBox="0 0 110 70">
        <rect x="10" y="10" width="90" height="45" rx="2" fill="#fce7f3" stroke="#f9a8d4" strokeWidth="2" />
        <text x="55" y="8" textAnchor="middle" fontSize="9" fill="#6b7280" fontWeight="bold">8 cm</text>
        <text x="105" y="36" textAnchor="middle" fontSize="9" fill="#6b7280" fontWeight="bold">3 cm</text>
      </svg>
      <QBox />
    </Card>
  );
}

// ── L2.4 — L-shaped grid perimeter ───────────────────────────────
function L24() {
  return (
    <Card>
      <Instr text="Count units around the outside." />
      <svg width="80" height="65" viewBox="0 0 80 65">
        {/* L-shape: 3 wide × 2 tall on left, 1 wide × 1 tall bottom extension */}
        {/* Row 0 */}
        {[0,1,2].map(c => <rect key={c} x={10+c*18} y={5} width={18} height={18} fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.5" />)}
        {/* Row 1 */}
        {[0,1,2].map(c => <rect key={c} x={10+c*18} y={23} width={18} height={18} fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.5" />)}
        {/* Row 2 — only first cell */}
        <rect x={10} y={41} width={18} height={18} fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.5" />
        <text x="40" y="62" textAnchor="middle" fontSize="8" fill="#9ca3af">= ? units</text>
      </svg>
    </Card>
  );
}

// ── L3.1 — cm vs m choice ────────────────────────────────────────
function L31() {
  return (
    <Card>
      <Instr text="Would you measure this in cm or m?" />
      <div style={{ fontSize: 28, marginBottom: 8 }}>✏️</div>
      <div style={{ display: "flex", gap: 8 }}>
        <ChoiceBtn label="cm" />
        <ChoiceBtn label="m" />
      </div>
    </Card>
  );
}

// ── L3.2 — Pentagon perimeter ────────────────────────────────────
function L32() {
  return (
    <Card>
      <Instr text="Find the perimeter of this pentagon." />
      <svg width="110" height="85" viewBox="0 0 110 85">
        {/* Pentagon approx */}
        <polygon points="55,8 95,35 80,78 30,78 15,35" fill="#fce7f3" stroke="#f9a8d4" strokeWidth="2" />
        <text x="73" y="24" fontSize="8" fill="#6b7280" fontWeight="bold">5 cm</text>
        <text x="86" y="60" fontSize="8" fill="#6b7280" fontWeight="bold">6 cm</text>
        <text x="44" y="82" fontSize="8" fill="#6b7280" fontWeight="bold">5 cm</text>
        <text x="8" y="60" fontSize="8" fill="#6b7280" fontWeight="bold">4 cm</text>
        <text x="20" y="24" fontSize="8" fill="#6b7280" fontWeight="bold">4 cm</text>
      </svg>
      <QBox />
    </Card>
  );
}

// ── L3.3 — 5×3 grid area (count squares) ────────────────────────
function L33() {
  return (
    <Card>
      <Instr text="Count the squares to find the area." />
      <svg width="100" height="66" viewBox="0 0 100 66">
        {Array.from({ length: 3 }, (_, r) =>
          Array.from({ length: 5 }, (_, c) => (
            <rect key={`${r}-${c}`} x={5+c*18} y={5+r*18} width={18} height={18} fill="#fef08a" stroke="#d1d5db" strokeWidth="1" />
          ))
        )}
      </svg>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <QBox />
        <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 700 }}>squares</span>
      </div>
    </Card>
  );
}

// ── L3.4 — Compare two grids ─────────────────────────────────────
function L34() {
  return (
    <Card>
      <Instr text="Which shape has a bigger area?" />
      <div style={{ display: "flex", gap: 10, marginBottom: 8 }}>
        {/* 3×3 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 1, alignItems: "center" }}>
          {Array.from({ length: 3 }, (_, r) => (
            <div key={r} style={{ display: "flex", gap: 1 }}>
              {Array.from({ length: 3 }, (_, c) => (
                <div key={c} style={{ width: 12, height: 12, background: "#fce7f3", border: "1px solid #f9a8d4" }} />
              ))}
            </div>
          ))}
          <span style={{ fontSize: 10, color: "#9ca3af", fontWeight: 700, marginTop: 2 }}>A</span>
        </div>
        {/* 4×2 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 1, alignItems: "center" }}>
          {Array.from({ length: 2 }, (_, r) => (
            <div key={r} style={{ display: "flex", gap: 1 }}>
              {Array.from({ length: 4 }, (_, c) => (
                <div key={c} style={{ width: 12, height: 12, background: "#dbeafe", border: "1px solid #93c5fd" }} />
              ))}
            </div>
          ))}
          <span style={{ fontSize: 10, color: "#9ca3af", fontWeight: 700, marginTop: 2 }}>B</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        <ChoiceBtn label="A" />
        <ChoiceBtn label="B" />
        <ChoiceBtn label="Same" />
      </div>
    </Card>
  );
}

// ── L4.1 — mm / cm / m choice ────────────────────────────────────
function L41() {
  return (
    <Card>
      <Instr text="Choose the best unit to measure this." />
      <div style={{ fontSize: 26, marginBottom: 8 }}>🖊️</div>
      <div style={{ display: "flex", gap: 6 }}>
        <ChoiceBtn label="mm" />
        <ChoiceBtn label="cm" />
        <ChoiceBtn label="m" />
      </div>
    </Card>
  );
}

// ── L4.2 — Perimeter of rectangle (12 × 5) ───────────────────────
function L42() {
  return (
    <Card>
      <Instr text="Find the perimeter." />
      <svg width="115" height="65" viewBox="0 0 115 65">
        <rect x="8" y="8" width="98" height="42" rx="2" fill="#fce7f3" stroke="#f9a8d4" strokeWidth="2" />
        <text x="57" y="6" textAnchor="middle" fontSize="9" fill="#6b7280" fontWeight="bold">12 cm</text>
        <text x="112" y="33" textAnchor="middle" fontSize="9" fill="#6b7280" fontWeight="bold">5 cm</text>
      </svg>
      <QBox />
    </Card>
  );
}

// ── L4.3 — Area by multiplication (9 × 4) ────────────────────────
function L43() {
  return (
    <Card>
      <Instr text="Use multiplication to find the area." />
      <svg width="105" height="65" viewBox="0 0 105 65">
        <rect x="5" y="5" width="90" height="50" rx="2" fill="#dbeafe" stroke="#93c5fd" strokeWidth="2" />
        <text x="50" y="35" textAnchor="middle" fontSize="13" fill="#1d4ed8" fontWeight="bold">9 × 4</text>
      </svg>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <QBox />
        <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 700 }}>cm²</span>
      </div>
    </Card>
  );
}

// ── L4.4 — Area of a square (6 × 6) ─────────────────────────────
function L44() {
  return (
    <Card>
      <Instr text="Find the area of this square." />
      <svg width="80" height="75" viewBox="0 0 80 75">
        <rect x="5" y="5" width="60" height="60" rx="2" fill="#f0fdf4" stroke="#86efac" strokeWidth="2" />
        <text x="35" y="4" textAnchor="middle" fontSize="9" fill="#6b7280" fontWeight="bold">6 cm</text>
        <text x="72" y="38" textAnchor="middle" fontSize="9" fill="#6b7280" fontWeight="bold">6 cm</text>
      </svg>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <QBox />
        <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 700 }}>cm²</span>
      </div>
    </Card>
  );
}

// ── L4.5 — Grid with half-squares ────────────────────────────────
function L45() {
  return (
    <Card>
      <Instr text="Find the area including half-squares." />
      <svg width="90" height="80" viewBox="0 0 90 80">
        {/* 4×3 grid */}
        {Array.from({ length: 3 }, (_, r) =>
          Array.from({ length: 4 }, (_, c) => {
            const isTriangle = r === 0 && c >= 2;
            if (isTriangle) return null;
            return <rect key={`${r}-${c}`} x={5+c*18} y={5+r*18} width={18} height={18} fill="#fef08a" stroke="#d1d5db" strokeWidth="1" />;
          })
        )}
        {/* Two triangle half-squares in top-right */}
        <polygon points="41,5 59,5 41,23" fill="#fde68a" stroke="#d1d5db" strokeWidth="1" />
        <polygon points="59,5 77,5 77,23" fill="#fde68a" stroke="#d1d5db" strokeWidth="1" />
      </svg>
      <QBox />
    </Card>
  );
}

// ── L5.1 — Convert m and cm ──────────────────────────────────────
function L51() {
  return (
    <Card>
      <Instr text="Convert the measurement." />
      <div style={{ fontSize: 14, fontWeight: 800, color: "#374151", textAlign: "center", margin: "6px 0 10px", lineHeight: 1.6 }}>
        2 m 45 cm = ___ cm
      </div>
      <QBox />
    </Card>
  );
}

// ── L5.2 — Hexagon perimeter ─────────────────────────────────────
function L52() {
  return (
    <Card>
      <Instr text="Find the perimeter of this hexagon." />
      <svg width="100" height="90" viewBox="0 0 100 90">
        <polygon points="50,5 90,27 90,63 50,85 10,63 10,27" fill="#fce7f3" stroke="#f9a8d4" strokeWidth="2" />
        <text x="74" y="22" fontSize="8" fill="#6b7280" fontWeight="bold">4 m</text>
        <text x="82" y="50" fontSize="8" fill="#6b7280" fontWeight="bold">5 m</text>
        <text x="62" y="82" fontSize="8" fill="#6b7280" fontWeight="bold">4 m</text>
        <text x="12" y="82" fontSize="8" fill="#6b7280" fontWeight="bold">5 m</text>
        <text x="2" y="50" fontSize="8" fill="#6b7280" fontWeight="bold">4 m</text>
        <text x="22" y="22" fontSize="8" fill="#6b7280" fontWeight="bold">4 m</text>
      </svg>
      <QBox />
    </Card>
  );
}

// ── L5.3 — Area with formula A = l × w ───────────────────────────
function L53() {
  return (
    <Card>
      <Instr text="Use the formula to find the area." />
      <svg width="110" height="65" viewBox="0 0 110 65">
        <rect x="5" y="5" width="90" height="50" rx="2" fill="#dbeafe" stroke="#93c5fd" strokeWidth="2" />
        <text x="5" y="3" fontSize="8" fill="#6b7280" fontWeight="bold">8</text>
        <text x="100" y="35" fontSize="8" fill="#6b7280" fontWeight="bold">5</text>
        <text x="50" y="35" textAnchor="middle" fontSize="10" fill="#1d4ed8" fontWeight="bold">A = l × w</text>
      </svg>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <QBox />
        <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 700 }}>cm²</span>
      </div>
    </Card>
  );
}

// ── L5.4 — Same area or same perimeter? ──────────────────────────
function L54() {
  return (
    <Card>
      <Instr text="What is the same about these shapes?" />
      <div style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-end" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <svg width="55" height="40" viewBox="0 0 55 40">
            <rect x="3" y="3" width="48" height="32" rx="2" fill="#fce7f3" stroke="#f9a8d4" strokeWidth="1.5" />
            <text x="27" y="2" textAnchor="middle" fontSize="8" fill="#6b7280">6</text>
            <text x="53" y="22" textAnchor="middle" fontSize="8" fill="#6b7280">4</text>
          </svg>
          <span style={{ fontSize: 9, color: "#9ca3af", fontWeight: 700 }}>A</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <svg width="45" height="50" viewBox="0 0 45 50">
            <rect x="3" y="3" width="38" height="42" rx="2" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.5" />
            <text x="22" y="2" textAnchor="middle" fontSize="8" fill="#6b7280">4</text>
            <text x="43" y="27" textAnchor="middle" fontSize="8" fill="#6b7280">4</text>
          </svg>
          <span style={{ fontSize: 9, color: "#9ca3af", fontWeight: 700 }}>B</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 5 }}>
        <ChoiceBtn label="Same area" />
        <ChoiceBtn label="Same perimeter" />
      </div>
    </Card>
  );
}

// ── L5.5 — Compare two areas ─────────────────────────────────────
function L55() {
  return (
    <Card>
      <Instr text="Which shape has the bigger area?" />
      <div style={{ display: "flex", gap: 10, marginBottom: 8 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
          <div style={{ background: "#fce7f3", border: "2px solid #f9a8d4", borderRadius: 8, padding: "8px 12px", fontSize: 12, fontWeight: 800, color: "#be185d" }}>15 cm²</div>
          <span style={{ fontSize: 10, color: "#9ca3af", fontWeight: 700 }}>A</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
          <div style={{ background: "#dcfce7", border: "2px solid #86efac", borderRadius: 8, padding: "8px 12px", fontSize: 12, fontWeight: 800, color: "#166534" }}>24 cm²</div>
          <span style={{ fontSize: 10, color: "#9ca3af", fontWeight: 700 }}>B</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <ChoiceBtn label="A" />
        <ChoiceBtn label="B" />
      </div>
    </Card>
  );
}

// ── L6.1 — Mixed unit conversion ─────────────────────────────────
function L61() {
  return (
    <Card>
      <Instr text="Convert to mixed units." />
      <div style={{ fontSize: 13, fontWeight: 800, color: "#374151", textAlign: "center", margin: "6px 0 10px", lineHeight: 1.6 }}>
        325 cm = ___ m ___ cm
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <QBox />
        <QBox />
      </div>
    </Card>
  );
}

// ── L6.2 — Choose area unit ──────────────────────────────────────
function L62() {
  return (
    <Card>
      <Instr text="Choose the best unit for measuring area." />
      <div style={{ fontSize: 28, marginBottom: 8 }}>🏠</div>
      <div style={{ display: "flex", gap: 5 }}>
        <ChoiceBtn label="mm²" />
        <ChoiceBtn label="cm²" />
        <ChoiceBtn label="m²" />
      </div>
    </Card>
  );
}

// ── L6.3 — Area with formula 12 × 7 ─────────────────────────────
function L63() {
  return (
    <Card>
      <Instr text="Find the area using the formula." />
      <svg width="110" height="65" viewBox="0 0 110 65">
        <rect x="5" y="5" width="95" height="50" rx="2" fill="#dbeafe" stroke="#93c5fd" strokeWidth="2" />
        <text x="52" y="3" textAnchor="middle" fontSize="9" fill="#6b7280" fontWeight="bold">12 m</text>
        <text x="106" y="34" textAnchor="middle" fontSize="9" fill="#6b7280" fontWeight="bold">7 m</text>
      </svg>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <QBox />
        <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 700 }}>m²</span>
      </div>
    </Card>
  );
}

// ── L6.4 — Right-angled triangle area ────────────────────────────
function L64() {
  return (
    <Card>
      <Instr text="Find the area of this right-angled triangle." />
      <svg width="110" height="75" viewBox="0 0 110 75">
        <polygon points="10,65 90,65 10,15" fill="#fce7f3" stroke="#f9a8d4" strokeWidth="2" />
        {/* Right angle marker */}
        <polyline points="10,55 20,55 20,65" fill="none" stroke="#6b7280" strokeWidth="1.5" />
        <text x="45" y="73" textAnchor="middle" fontSize="9" fill="#6b7280" fontWeight="bold">8 cm</text>
        <text x="2" y="42" textAnchor="middle" fontSize="9" fill="#6b7280" fontWeight="bold">5 cm</text>
      </svg>
      <QBox />
    </Card>
  );
}

// ── L6.5 — Identify and find area ────────────────────────────────
function L65() {
  return (
    <Card>
      <Instr text="Find the area of this triangle." />
      <svg width="105" height="75" viewBox="0 0 105 75">
        <polygon points="50,5 95,65 5,65" fill="#f0fdf4" stroke="#86efac" strokeWidth="2" />
        <text x="50" y="72" textAnchor="middle" fontSize="9" fill="#6b7280" fontWeight="bold">6 m</text>
        <line x1="50" y1="5" x2="50" y2="65" stroke="#9ca3af" strokeWidth="1" strokeDasharray="3,2" />
        <text x="55" y="38" fontSize="8" fill="#6b7280" fontWeight="bold">h=4 m</text>
      </svg>
      <QBox />
    </Card>
  );
}

// ── L7.1 — Perimeter formula P = 2(l+w) ─────────────────────────
function L71() {
  return (
    <Card>
      <Instr text="Use the formula to find the perimeter." />
      <svg width="110" height="65" viewBox="0 0 110 65">
        <rect x="5" y="5" width="95" height="50" rx="2" fill="#fce7f3" stroke="#f9a8d4" strokeWidth="2" />
        <text x="52" y="3" textAnchor="middle" fontSize="9" fill="#6b7280" fontWeight="bold">11 cm</text>
        <text x="107" y="34" textAnchor="middle" fontSize="9" fill="#6b7280" fontWeight="bold">4 cm</text>
        <text x="52" y="35" textAnchor="middle" fontSize="9" fill="#be185d" fontWeight="bold">P = 2(l+w)</text>
      </svg>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <QBox />
        <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 700 }}>cm</span>
      </div>
    </Card>
  );
}

// ── L7.2 — Missing side from perimeter ───────────────────────────
function L72() {
  return (
    <Card>
      <Instr text="Find the missing side length." />
      <svg width="110" height="65" viewBox="0 0 110 65">
        <rect x="5" y="5" width="95" height="50" rx="2" fill="#fef9c3" stroke="#fde68a" strokeWidth="2" />
        <text x="52" y="3" textAnchor="middle" fontSize="9" fill="#6b7280" fontWeight="bold">? cm</text>
        <text x="107" y="34" textAnchor="middle" fontSize="9" fill="#6b7280" fontWeight="bold">5 cm</text>
        <text x="52" y="35" textAnchor="middle" fontSize="9" fill="#92400e" fontWeight="bold">P = 28 cm</text>
      </svg>
      <QBox />
    </Card>
  );
}

// ── L7.3 — Triangle area formula A = ½bh ────────────────────────
function L73() {
  return (
    <Card>
      <Instr text="Use the formula to find the area." />
      <svg width="110" height="75" viewBox="0 0 110 75">
        <polygon points="10,68 100,68 10,15" fill="#dbeafe" stroke="#93c5fd" strokeWidth="2" />
        <polyline points="10,58 20,58 20,68" fill="none" stroke="#6b7280" strokeWidth="1.5" />
        <text x="50" y="73" textAnchor="middle" fontSize="9" fill="#6b7280" fontWeight="bold">10 m</text>
        <text x="2" y="44" textAnchor="middle" fontSize="9" fill="#6b7280" fontWeight="bold">6 m</text>
        <text x="52" y="52" textAnchor="middle" fontSize="9" fill="#1d4ed8" fontWeight="bold">A = ½bh</text>
      </svg>
      <QBox />
    </Card>
  );
}

// ── L7.4 — Missing dimension from area ───────────────────────────
function L74() {
  return (
    <Card>
      <Instr text="Find the missing dimension." />
      <svg width="110" height="65" viewBox="0 0 110 65">
        <rect x="5" y="5" width="95" height="50" rx="2" fill="#f0fdf4" stroke="#86efac" strokeWidth="2" />
        <text x="52" y="3" textAnchor="middle" fontSize="9" fill="#6b7280" fontWeight="bold">? m</text>
        <text x="107" y="34" textAnchor="middle" fontSize="9" fill="#6b7280" fontWeight="bold">4 m</text>
        <text x="52" y="35" textAnchor="middle" fontSize="9" fill="#166534" fontWeight="bold">A = 32 m²</text>
      </svg>
      <QBox />
    </Card>
  );
}

// ── L7.5 — Composite L-shaped area ───────────────────────────────
function L75() {
  return (
    <Card>
      <Instr text="Split the shape and find the total area." />
      <svg width="110" height="80" viewBox="0 0 110 80">
        {/* Main rectangle */}
        <rect x="5" y="25" width="80" height="48" rx="2" fill="#fce7f3" stroke="#f9a8d4" strokeWidth="2" />
        {/* Smaller rect top-right */}
        <rect x="57" y="5" width="28" height="22" rx="2" fill="#dbeafe" stroke="#93c5fd" strokeWidth="2" />
        <text x="44" y="23" textAnchor="middle" fontSize="8" fill="#6b7280">8 cm</text>
        <text x="90" y="52" fontSize="8" fill="#6b7280">5 cm</text>
        <text x="62" y="18" textAnchor="middle" fontSize="8" fill="#6b7280">4 cm</text>
      </svg>
      <QBox />
    </Card>
  );
}

// ── L8.1 — Convert 1 m² to cm² ───────────────────────────────────
function L81() {
  return (
    <Card>
      <Instr text="Complete the unit conversion." />
      <div style={{ fontSize: 14, fontWeight: 800, color: "#374151", textAlign: "center", margin: "6px 0 10px", lineHeight: 1.6 }}>
        1 m² = ____ cm²
      </div>
      <QBox />
    </Card>
  );
}

// ── L8.2 — Parallelogram area ────────────────────────────────────
function L82() {
  return (
    <Card>
      <Instr text="Find the area of this parallelogram." />
      <svg width="110" height="68" viewBox="0 0 110 68">
        <polygon points="20,60 100,60 90,10 10,10" fill="#dbeafe" stroke="#93c5fd" strokeWidth="2" />
        <text x="50" y="68" textAnchor="middle" fontSize="9" fill="#6b7280" fontWeight="bold">b = 8 cm</text>
        {/* Dashed height */}
        <line x1="90" y1="10" x2="90" y2="60" stroke="#9ca3af" strokeWidth="1" strokeDasharray="3,2" />
        <text x="96" y="38" fontSize="8" fill="#6b7280" fontWeight="bold">h=4</text>
        <text x="20" y="38" fontSize="9" fill="#1d4ed8" fontWeight="bold">A = b×h</text>
      </svg>
      <QBox />
    </Card>
  );
}

// ── L8.3 — Trapezium area ────────────────────────────────────────
function L83() {
  return (
    <Card>
      <Instr text="Find the area of this trapezium." />
      <svg width="115" height="68" viewBox="0 0 115 68">
        <polygon points="25,60 90,60 75,12 40,12" fill="#fce7f3" stroke="#f9a8d4" strokeWidth="2" />
        <text x="57" y="8" textAnchor="middle" fontSize="9" fill="#6b7280" fontWeight="bold">a = 6 cm</text>
        <text x="57" y="68" textAnchor="middle" fontSize="9" fill="#6b7280" fontWeight="bold">b = 10 cm</text>
        <line x1="75" y1="12" x2="75" y2="60" stroke="#9ca3af" strokeWidth="1" strokeDasharray="3,2" />
        <text x="82" y="40" fontSize="8" fill="#6b7280" fontWeight="bold">h=4</text>
      </svg>
      <QBox />
    </Card>
  );
}

// ── L8.4 — Area AND perimeter of rectangle ───────────────────────
function L84() {
  return (
    <Card>
      <Instr text="Find both the area and the perimeter." />
      <svg width="110" height="60" viewBox="0 0 110 60">
        <rect x="5" y="5" width="95" height="48" rx="2" fill="#fef9c3" stroke="#fde68a" strokeWidth="2" />
        <text x="52" y="3" textAnchor="middle" fontSize="9" fill="#6b7280" fontWeight="bold">9 m</text>
        <text x="107" y="32" textAnchor="middle" fontSize="9" fill="#6b7280" fontWeight="bold">6 m</text>
      </svg>
      <div style={{ display: "flex", gap: 8 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <span style={{ fontSize: 9, color: "#9ca3af", fontWeight: 700 }}>Area</span>
          <QBox />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <span style={{ fontSize: 9, color: "#9ca3af", fontWeight: 700 }}>Perimeter</span>
          <QBox />
        </div>
      </div>
    </Card>
  );
}

// ── L8.5 — Parts of a circle ─────────────────────────────────────
function L85() {
  return (
    <Card>
      <Instr text="Name the parts of this circle." />
      <svg width="120" height="100" viewBox="0 0 120 100">
        <circle cx="60" cy="50" r="40" fill="#fce7f3" stroke="#f9a8d4" strokeWidth="2" />
        {/* Centre dot */}
        <circle cx="60" cy="50" r="3" fill="#ec4899" />
        {/* Radius */}
        <line x1="60" y1="50" x2="100" y2="50" stroke="#ec4899" strokeWidth="1.5" />
        {/* Diameter */}
        <line x1="20" y1="50" x2="100" y2="50" stroke="#93c5fd" strokeWidth="1" strokeDasharray="4,2" />
        <text x="63" y="48" fontSize="7" fill="#be185d" fontWeight="bold">centre</text>
        <text x="80" y="44" fontSize="7" fill="#ec4899" fontWeight="bold">radius</text>
        <text x="22" y="68" fontSize="7" fill="#2563eb" fontWeight="bold">diameter</text>
        <text x="5" y="22" fontSize="7" fill="#059669" fontWeight="bold">circumference</text>
        {/* Arrow to circumference */}
        <line x1="38" y1="22" x2="26" y2="14" stroke="#059669" strokeWidth="1" />
        <circle cx="60" cy="50" r="40" fill="none" stroke="#059669" strokeWidth="1" strokeDasharray="3,3" />
      </svg>
    </Card>
  );
}

// ── L8.6 — Composite rectangle + triangle ────────────────────────
function L86() {
  return (
    <Card>
      <Instr text="Find the total area of this composite shape." />
      <svg width="110" height="85" viewBox="0 0 110 85">
        {/* Rectangle bottom */}
        <rect x="10" y="38" width="80" height="38" rx="2" fill="#dbeafe" stroke="#93c5fd" strokeWidth="2" />
        {/* Triangle on top */}
        <polygon points="10,40 90,40 50,8" fill="#fce7f3" stroke="#f9a8d4" strokeWidth="2" />
        <text x="46" y="63" textAnchor="middle" fontSize="9" fill="#6b7280" fontWeight="bold">8 m × 4 m</text>
        <text x="46" y="28" textAnchor="middle" fontSize="9" fill="#6b7280" fontWeight="bold">b=8, h=4</text>
      </svg>
      <QBox />
    </Card>
  );
}

// ── Map ──────────────────────────────────────────────────────────

export const MEASUREMENT_PREVIEW_MAP: Record<string, () => React.ReactElement> = {
  "0.1": L01,
  "0.2": L02,
  "0.3": L03,
  "0.4": L04,
  "1.1": L11,
  "1.2": L12,
  "1.3": L13,
  "1.4": L14,
  "2.1": L21,
  "2.2": L22,
  "2.3": L23,
  "2.4": L24,
  "3.1": L31,
  "3.2": L32,
  "3.3": L33,
  "3.4": L34,
  "4.1": L41,
  "4.2": L42,
  "4.3": L43,
  "4.4": L44,
  "4.5": L45,
  "5.1": L51,
  "5.2": L52,
  "5.3": L53,
  "5.4": L54,
  "5.5": L55,
  "6.1": L61,
  "6.2": L62,
  "6.3": L63,
  "6.4": L64,
  "6.5": L65,
  "7.1": L71,
  "7.2": L72,
  "7.3": L73,
  "7.4": L74,
  "7.5": L75,
  "8.1": L81,
  "8.2": L82,
  "8.3": L83,
  "8.4": L84,
  "8.5": L85,
  "8.6": L86,
};

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

function VBar({ h, color, label }: { h: number; color: string; label?: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
      <div style={{ width: 20, height: h, borderRadius: 4, background: color }} />
      {label && <span style={{ fontSize: 10, color: "#9ca3af", fontWeight: 700 }}>{label}</span>}
    </div>
  );
}

// ── L0.1 — Tap the taller bar ────────────────────────────────────
function L01() {
  return (
    <Card>
      <Instr text="Tap the longer bar." />
      <div style={{ display: "flex", gap: 14, alignItems: "flex-end", justifyContent: "center" }}>
        <VBar h={72} color="#fb923c" label="A" />
        <VBar h={44} color="#4ade80" label="B" />
      </div>
    </Card>
  );
}

// ── L0.2 — Tap the shorter bar ───────────────────────────────────
function L02() {
  return (
    <Card>
      <Instr text="Tap the shorter bar." />
      <div style={{ display: "flex", gap: 14, alignItems: "flex-end", justifyContent: "center" }}>
        <VBar h={65} color="#fb923c" label="A" />
        <VBar h={38} color="#4ade80" label="B" />
      </div>
    </Card>
  );
}

// ── L0.3 — Tap the tallest bar ───────────────────────────────────
function L03() {
  return (
    <Card>
      <Instr text="Tap the longest bar." />
      <div style={{ display: "flex", gap: 10, alignItems: "flex-end", justifyContent: "center" }}>
        <VBar h={50} color="#fb923c" label="A" />
        <VBar h={78} color="#4ade80" label="B" />
        <VBar h={34} color="#f9a8d4" label="C" />
      </div>
    </Card>
  );
}

// ── L0.4 — Tap the shortest bar ──────────────────────────────────
function L04() {
  return (
    <Card>
      <Instr text="Tap the shortest bar." />
      <div style={{ display: "flex", gap: 10, alignItems: "flex-end", justifyContent: "center" }}>
        <VBar h={68} color="#fb923c" label="A" />
        <VBar h={42} color="#4ade80" label="B" />
        <VBar h={28} color="#f9a8d4" label="C" />
      </div>
    </Card>
  );
}

// ── L1.1 — Longer / shorter / taller word choice ─────────────────
function L11() {
  return (
    <Card>
      <Instr text="Bar A is ___ than bar B." />
      <div style={{ display: "flex", gap: 14, alignItems: "flex-end", justifyContent: "center", marginBottom: 8 }}>
        <VBar h={72} color="#fb923c" label="A" />
        <VBar h={44} color="#93c5fd" label="B" />
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
      <Instr text="Are the two bars the same length or different?" />
      <div style={{ display: "flex", gap: 14, alignItems: "flex-end", justifyContent: "center", marginBottom: 8 }}>
        <VBar h={58} color="#fb923c" label="A" />
        <VBar h={58} color="#93c5fd" label="B" />
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        <ChoiceBtn label="same" />
        <ChoiceBtn label="different" />
      </div>
    </Card>
  );
}

// ── L2.1 — SVG ruler with pink arrow ─────────────────────────────
function L21() {
  return (
    <Card>
      <Instr text="What measurement is the arrow pointing to?" />
      <svg overflow="visible" width="150" height="44" viewBox="0 0 150 44">
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
      <svg overflow="visible" width="140" height="42" viewBox="0 0 140 42">
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

// ── L2.3 — Rectangle grid perimeter with labels ──────────────────
function L23() {
  const cols = 5, rows = 3, cell = 14;
  const gw = cols * cell, gh = rows * cell;
  const ox = 8, oy = 18;
  return (
    <Card>
      <Instr text="Find the perimeter of this rectangle." />
      <svg overflow="visible" width={gw + ox + 28} height={gh + oy + 14} viewBox={`0 0 ${gw + ox + 28} ${gh + oy + 14}`}>
        {/* Grid cells */}
        {Array.from({ length: rows }, (_, r) =>
          Array.from({ length: cols }, (_, c) => (
            <rect key={`${r}-${c}`} x={ox + c * cell} y={oy + r * cell} width={cell} height={cell} fill="#fce7f3" stroke="#f9a8d4" strokeWidth="1" />
          ))
        )}
        {/* Width label on top */}
        <text x={ox + gw / 2} y={oy - 7} textAnchor="middle" fontSize="9" fill="#6b7280" fontWeight="bold">5 cm</text>
        {/* Height label on right */}
        <text x={ox + gw + 5} y={oy + gh / 2 + 4} fontSize="9" fill="#6b7280" fontWeight="bold">3 cm</text>
      </svg>
      <QBox />
    </Card>
  );
}

// ── L2.4 — Rectangle perimeter grid (outer cells blue) ───────────
function L24() {
  const cols = 5, rows = 4, cell = 13;
  const ox = 8, oy = 8;
  const gw = cols * cell, gh = rows * cell;
  return (
    <Card>
      <Instr text="Count the side units around the outside." />
      <svg overflow="visible" width={gw + ox + 10} height={gh + oy + 10} viewBox={`0 0 ${gw + ox + 10} ${gh + oy + 10}`}>
        {Array.from({ length: rows }, (_, r) =>
          Array.from({ length: cols }, (_, c) => {
            const isOuter = r === 0 || r === rows - 1 || c === 0 || c === cols - 1;
            return (
              <rect key={`${r}-${c}`}
                x={ox + c * cell} y={oy + r * cell}
                width={cell} height={cell}
                fill={isOuter ? "#bfdbfe" : "#f0f9ff"}
                stroke="#93c5fd" strokeWidth="1"
              />
            );
          })
        )}
      </svg>
    </Card>
  );
}

// ── L3.1 — cm vs m choice ────────────────────────────────────────
function L31() {
  return (
    <Card>
      <Instr text="A pencil is about how long? Choose the best unit." />
      <div style={{ display: "flex", gap: 8 }}>
        <ChoiceBtn label="cm" />
        <ChoiceBtn label="m" />
      </div>
    </Card>
  );
}

// ── L3.2 — Rectangle perimeter with labels ───────────────────────
function L32() {
  return (
    <Card>
      <Instr text="Find the perimeter of this shape." />
      <svg overflow="visible" width="125" height="80" viewBox="0 0 125 80">
        <rect x="10" y="18" width="85" height="48" rx="2" fill="#fce7f3" stroke="#f9a8d4" strokeWidth="2" />
        <text x="52" y="12" textAnchor="middle" fontSize="9" fill="#6b7280" fontWeight="bold">7 cm</text>
        <text x="99" y="45" textAnchor="start" fontSize="9" fill="#6b7280" fontWeight="bold">4 cm</text>
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
      <svg overflow="visible" width="100" height="66" viewBox="0 0 100 66">
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

// ── L3.4 — Compare two rectangles by area ────────────────────────
function L34() {
  return (
    <Card>
      <Instr text="Which shape has the greater area?" />
      <div style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "flex-end" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <svg overflow="visible" width="68" height="50" viewBox="0 0 68 50">
            <rect x="3" y="9" width="46" height="36" rx="2" fill="#fce7f3" stroke="#f9a8d4" strokeWidth="1.5" />
            <text x="26" y="6" textAnchor="middle" fontSize="8" fill="#6b7280">6 cm</text>
            <text x="53" y="30" textAnchor="start" fontSize="8" fill="#6b7280">5 cm</text>
          </svg>
          <span style={{ fontSize: 9, color: "#9ca3af", fontWeight: 700 }}>A</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <svg overflow="visible" width="76" height="42" viewBox="0 0 76 42">
            <rect x="3" y="9" width="54" height="28" rx="2" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.5" />
            <text x="30" y="6" textAnchor="middle" fontSize="8" fill="#6b7280">9 cm</text>
            <text x="61" y="26" textAnchor="start" fontSize="8" fill="#6b7280">3 cm</text>
          </svg>
          <span style={{ fontSize: 9, color: "#9ca3af", fontWeight: 700 }}>B</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        <ChoiceBtn label="A" />
        <ChoiceBtn label="B" />
        <ChoiceBtn label="same" />
      </div>
    </Card>
  );
}

// ── L4.1 — mm / cm / m choice ────────────────────────────────────
function L41() {
  return (
    <Card>
      <Instr text="What is the best unit to measure a pen?" />
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
      <svg overflow="visible" width="130" height="72" viewBox="0 0 130 72">
        <rect x="8" y="16" width="98" height="42" rx="2" fill="#fce7f3" stroke="#f9a8d4" strokeWidth="2" />
        <text x="57" y="10" textAnchor="middle" fontSize="9" fill="#6b7280" fontWeight="bold">12 cm</text>
        <text x="110" y="40" textAnchor="start" fontSize="9" fill="#6b7280" fontWeight="bold">5 cm</text>
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
      <svg overflow="visible" width="105" height="65" viewBox="0 0 105 65">
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
      <svg overflow="visible" width="92" height="82" viewBox="0 0 92 82">
        <rect x="5" y="14" width="60" height="60" rx="2" fill="#f0fdf4" stroke="#86efac" strokeWidth="2" />
        <text x="35" y="9" textAnchor="middle" fontSize="9" fill="#6b7280" fontWeight="bold">6 cm</text>
        <text x="69" y="47" textAnchor="start" fontSize="9" fill="#6b7280" fontWeight="bold">6 cm</text>
      </svg>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <QBox />
        <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 700 }}>cm²</span>
      </div>
    </Card>
  );
}

// ── L4.5 — Grid with half-squares below ──────────────────────────
function L45() {
  const cell = 16;
  return (
    <Card>
      <Instr text="Find the area including half-squares." />
      <svg overflow="visible" width="90" height="90" viewBox="0 0 90 90">
        {/* 4×3 full-square grid */}
        {Array.from({ length: 3 }, (_, r) =>
          Array.from({ length: 4 }, (_, c) => (
            <rect key={`${r}-${c}`} x={5 + c * cell} y={5 + r * cell} width={cell} height={cell} fill="#fef08a" stroke="#d1d5db" strokeWidth="1" />
          ))
        )}
        {/* Row of triangle half-squares BELOW the full grid */}
        {Array.from({ length: 4 }, (_, c) => {
          const x = 5 + c * cell;
          const y = 5 + 3 * cell + 4; // small gap below grid
          return (
            <polygon key={`tri-${c}`}
              points={`${x},${y} ${x + cell},${y} ${x},${y + cell}`}
              fill="#fde68a" stroke="#d1d5db" strokeWidth="1"
            />
          );
        })}
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
        3 m = ___ cm
      </div>
      <QBox />
    </Card>
  );
}

// ── L5.2 — Perimeter of a rectangle ─────────────────────────────
function L52() {
  return (
    <Card>
      <Instr text="Find the perimeter of this shape." />
      <svg overflow="visible" width="128" height="82" viewBox="0 0 128 82">
        <rect x="8" y="18" width="90" height="52" rx="2" fill="#fce7f3" stroke="#f9a8d4" strokeWidth="2" />
        <text x="53" y="12" textAnchor="middle" fontSize="9" fill="#6b7280" fontWeight="bold">9 m</text>
        <text x="102" y="47" textAnchor="start" fontSize="9" fill="#6b7280" fontWeight="bold">6 m</text>
      </svg>
      <QBox />
    </Card>
  );
}

// ── L5.3 — Area with formula A = l × w ───────────────────────────
function L53() {
  return (
    <Card>
      <Instr text="Find the area of the rectangle." />
      <svg overflow="visible" width="125" height="72" viewBox="0 0 125 72">
        <rect x="5" y="14" width="90" height="50" rx="2" fill="#dbeafe" stroke="#93c5fd" strokeWidth="2" />
        <text x="50" y="9" textAnchor="middle" fontSize="9" fill="#6b7280" fontWeight="bold">8 cm</text>
        <text x="99" y="42" textAnchor="start" fontSize="9" fill="#6b7280" fontWeight="bold">5 cm</text>
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
          <svg overflow="visible" width="64" height="46" viewBox="0 0 64 46">
            <rect x="3" y="11" width="48" height="32" rx="2" fill="#fce7f3" stroke="#f9a8d4" strokeWidth="1.5" />
            <text x="27" y="7" textAnchor="middle" fontSize="8" fill="#6b7280">6</text>
            <text x="55" y="30" textAnchor="start" fontSize="8" fill="#6b7280">4</text>
          </svg>
          <span style={{ fontSize: 9, color: "#9ca3af", fontWeight: 700 }}>A</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <svg overflow="visible" width="54" height="56" viewBox="0 0 54 56">
            <rect x="3" y="11" width="38" height="42" rx="2" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.5" />
            <text x="22" y="7" textAnchor="middle" fontSize="8" fill="#6b7280">4</text>
            <text x="45" y="35" textAnchor="start" fontSize="8" fill="#6b7280">4</text>
          </svg>
          <span style={{ fontSize: 9, color: "#9ca3af", fontWeight: 700 }}>B</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", justifyContent: "center" }}>
        <ChoiceBtn label="same area" />
        <ChoiceBtn label="same perimeter" />
        <ChoiceBtn label="neither" />
      </div>
    </Card>
  );
}

// ── L5.5 — Compare two rectangles by area ────────────────────────
function L55() {
  return (
    <Card>
      <Instr text="Which rectangle has the larger area?" />
      <div style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "flex-end" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <svg overflow="visible" width="66" height="50" viewBox="0 0 66 50">
            <rect x="3" y="9" width="46" height="38" rx="2" fill="#fce7f3" stroke="#f9a8d4" strokeWidth="1.5" />
            <text x="26" y="6" textAnchor="middle" fontSize="8" fill="#6b7280">5 m</text>
            <text x="53" y="32" textAnchor="start" fontSize="8" fill="#6b7280">3 m</text>
          </svg>
          <span style={{ fontSize: 9, color: "#9ca3af", fontWeight: 700 }}>A</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <svg overflow="visible" width="76" height="40" viewBox="0 0 76 40">
            <rect x="3" y="9" width="56" height="28" rx="2" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.5" />
            <text x="31" y="6" textAnchor="middle" fontSize="8" fill="#6b7280">8 m</text>
            <text x="63" y="27" textAnchor="start" fontSize="8" fill="#6b7280">2 m</text>
          </svg>
          <span style={{ fontSize: 9, color: "#9ca3af", fontWeight: 700 }}>B</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center" }}>
        <ChoiceBtn label="A is larger" />
        <ChoiceBtn label="B is larger" />
        <ChoiceBtn label="same area" />
      </div>
    </Card>
  );
}

// ── L6.1 — Mixed unit conversion ─────────────────────────────────
function L61() {
  return (
    <Card>
      <Instr text="Convert the measurement." />
      <div style={{ fontSize: 13, fontWeight: 800, color: "#374151", textAlign: "center", margin: "6px 0 10px", lineHeight: 1.6 }}>
        2 m 45 cm = ___ cm
      </div>
      <QBox />
    </Card>
  );
}

// ── L6.2 — Choose the best unit (length or area) ─────────────────
function L62() {
  return (
    <Card>
      <Instr text="What unit would you use to measure the floor area of a room?" />
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center" }}>
        <ChoiceBtn label="cm" />
        <ChoiceBtn label="m" />
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
      <svg overflow="visible" width="128" height="72" viewBox="0 0 128 72">
        <rect x="5" y="14" width="95" height="50" rx="2" fill="#dbeafe" stroke="#93c5fd" strokeWidth="2" />
        <text x="52" y="9" textAnchor="middle" fontSize="9" fill="#6b7280" fontWeight="bold">12 m</text>
        <text x="104" y="42" textAnchor="start" fontSize="9" fill="#6b7280" fontWeight="bold">7 m</text>
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
      <svg overflow="visible" width="110" height="75" viewBox="0 0 110 75">
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

// ── L6.5 — Rectangle OR triangle (alternating) — find the area ───
function L65() {
  return (
    <Card>
      <Instr text="Find the area of this shape." />
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        margin: "4px 0 8px",
      }}>
        {/* Sample shape — alternates per attempt between rectangle and triangle.
            Show a triangle here (rectangle area already shown in 6.3). */}
        <svg overflow="visible" width="86" height="58" viewBox="0 0 86 58">
          <polygon points="6,50 74,50 6,12" fill="#fce7f3" stroke="#f9a8d4" strokeWidth="1.5" />
          <polyline points="6,42 14,42 14,50" fill="none" stroke="#6b7280" strokeWidth="1.2" />
          <text x="40" y="57" textAnchor="middle" fontSize="9" fill="#6b7280" fontWeight="bold">8 m</text>
          <text x="0" y="33" fontSize="9" fill="#6b7280" fontWeight="bold">6 m</text>
        </svg>
        {/* "or" badge with mini icons */}
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
        }}>
          <svg width="22" height="14" viewBox="0 0 22 14">
            <rect x="1" y="2" width="20" height="10" rx="1.5" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" />
          </svg>
          <span style={{ fontSize: 9, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.05em" }}>or</span>
          <svg width="22" height="14" viewBox="0 0 22 14">
            <polygon points="1,12 21,12 1,1" fill="#fce7f3" stroke="#f9a8d4" strokeWidth="1" />
          </svg>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <QBox />
        <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 700 }}>m²</span>
      </div>
    </Card>
  );
}

// ── L7.1 — Perimeter formula P = 2(l+w) ─────────────────────────
function L71() {
  return (
    <Card>
      <Instr text="Use the formula to find the perimeter." />
      <svg overflow="visible" width="128" height="72" viewBox="0 0 128 72">
        <rect x="5" y="14" width="95" height="50" rx="2" fill="#fce7f3" stroke="#f9a8d4" strokeWidth="2" />
        <text x="52" y="9" textAnchor="middle" fontSize="9" fill="#6b7280" fontWeight="bold">11 cm</text>
        <text x="104" y="42" textAnchor="start" fontSize="9" fill="#6b7280" fontWeight="bold">4 cm</text>
        <text x="52" y="43" textAnchor="middle" fontSize="9" fill="#be185d" fontWeight="bold">P = 2(l+w)</text>
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
      <svg overflow="visible" width="128" height="72" viewBox="0 0 128 72">
        <rect x="5" y="14" width="95" height="50" rx="2" fill="#fef9c3" stroke="#fde68a" strokeWidth="2" />
        <text x="52" y="9" textAnchor="middle" fontSize="9" fill="#6b7280" fontWeight="bold">? cm</text>
        <text x="104" y="42" textAnchor="start" fontSize="9" fill="#6b7280" fontWeight="bold">5 cm</text>
        <text x="52" y="43" textAnchor="middle" fontSize="9" fill="#92400e" fontWeight="bold">P = 28 cm</text>
      </svg>
      <QBox />
    </Card>
  );
}

// ── L7.3 — Area formula (rectangle / square / triangle alternates) ──
function L73() {
  return (
    <Card>
      <Instr text="Use the formula to find the area." />
      <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "2px 0 6px" }}>
        <svg overflow="visible" width="92" height="68" viewBox="0 0 92 68">
          <polygon points="6,60 82,60 6,18" fill="#dbeafe" stroke="#93c5fd" strokeWidth="2" />
          <polyline points="6,52 14,52 14,60" fill="none" stroke="#6b7280" strokeWidth="1.2" />
          <text x="44" y="67" textAnchor="middle" fontSize="9" fill="#6b7280" fontWeight="bold">10 m</text>
          <text x="0" y="40" fontSize="9" fill="#6b7280" fontWeight="bold">6 m</text>
          <text x="40" y="46" textAnchor="middle" fontSize="9" fill="#1d4ed8" fontWeight="bold">A = ½bh</text>
        </svg>
        {/* "rect / sq / tri" rotation badge */}
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
        }}>
          <svg width="20" height="12" viewBox="0 0 20 12">
            <rect x="1" y="2" width="18" height="8" rx="1.2" fill="#dbeafe" stroke="#93c5fd" strokeWidth="0.9" />
          </svg>
          <svg width="14" height="12" viewBox="0 0 14 12">
            <rect x="1" y="1" width="12" height="10" rx="1.2" fill="#f0fdf4" stroke="#86efac" strokeWidth="0.9" />
          </svg>
          <svg width="20" height="12" viewBox="0 0 20 12">
            <polygon points="1,10 19,10 1,1" fill="#fce7f3" stroke="#f9a8d4" strokeWidth="0.9" />
          </svg>
        </div>
      </div>
      <QBox />
    </Card>
  );
}

// ── L7.4 — Missing dimension from area ───────────────────────────
function L74() {
  return (
    <Card>
      <Instr text="Find the missing dimension." />
      <svg overflow="visible" width="128" height="72" viewBox="0 0 128 72">
        <rect x="5" y="14" width="95" height="50" rx="2" fill="#f0fdf4" stroke="#86efac" strokeWidth="2" />
        <text x="52" y="9" textAnchor="middle" fontSize="9" fill="#6b7280" fontWeight="bold">? m</text>
        <text x="104" y="42" textAnchor="start" fontSize="9" fill="#6b7280" fontWeight="bold">4 m</text>
        <text x="52" y="43" textAnchor="middle" fontSize="9" fill="#166534" fontWeight="bold">A = 32 m²</text>
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
      <svg overflow="visible" width="110" height="80" viewBox="0 0 110 80">
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
      <svg overflow="visible" width="110" height="68" viewBox="0 0 110 68">
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
      <svg overflow="visible" width="115" height="76" viewBox="0 0 115 76">
        <polygon points="25,66 90,66 75,18 40,18" fill="#fce7f3" stroke="#f9a8d4" strokeWidth="2" />
        <text x="57" y="14" textAnchor="middle" fontSize="9" fill="#6b7280" fontWeight="bold">a = 6 cm</text>
        <text x="57" y="74" textAnchor="middle" fontSize="9" fill="#6b7280" fontWeight="bold">b = 10 cm</text>
        <line x1="75" y1="18" x2="75" y2="66" stroke="#9ca3af" strokeWidth="1" strokeDasharray="3,2" />
        <text x="82" y="46" fontSize="8" fill="#6b7280" fontWeight="bold">h=4</text>
        <text x="57" y="44" textAnchor="middle" fontSize="9" fill="#be185d" fontWeight="bold">A = ½(a+b)h</text>
      </svg>
      <QBox />
    </Card>
  );
}

// ── L8.4 — Perimeter given → find the area ───────────────────────
function L84() {
  return (
    <Card>
      <Instr text="Perimeter = 30 cm. Find the area." />
      <svg overflow="visible" width="128" height="72" viewBox="0 0 128 72">
        <rect x="5" y="14" width="95" height="50" rx="2" fill="#fef9c3" stroke="#fde68a" strokeWidth="2" />
        <text x="52" y="9" textAnchor="middle" fontSize="9" fill="#6b7280" fontWeight="bold">9 cm</text>
        <text x="104" y="42" textAnchor="start" fontSize="9" fill="#6b7280" fontWeight="bold">? cm</text>
        <text x="52" y="43" textAnchor="middle" fontSize="9" fill="#92400e" fontWeight="bold">P = 30 cm</text>
      </svg>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <QBox />
        <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 700 }}>cm²</span>
      </div>
    </Card>
  );
}

// ── L8.5 — Definition → choose the circle part ───────────────────
function L85() {
  return (
    <Card>
      <Instr text='Which part is "the distance from the centre to the edge"?' />
      <svg overflow="visible" width="72" height="56" viewBox="0 0 72 56">
        <circle cx="36" cy="28" r="22" fill="#fce7f3" stroke="#f9a8d4" strokeWidth="1.5" />
        <circle cx="36" cy="28" r="2" fill="#ec4899" />
        <line x1="36" y1="28" x2="58" y2="28" stroke="#ec4899" strokeWidth="1.5" />
      </svg>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", justifyContent: "center", marginTop: 4 }}>
        <ChoiceBtn label="radius" />
        <ChoiceBtn label="diameter" />
        <ChoiceBtn label="circumference" />
      </div>
    </Card>
  );
}

// ── L8.6 — Advanced composite (L-shape, same family as 7.5, scaled) ──
function L86() {
  return (
    <Card>
      <Instr text="Find the total area of this composite shape." />
      <svg overflow="visible" width="120" height="92" viewBox="0 0 120 92">
        {/* L-shape rectilinear polygon — bigger than 7.5 */}
        <polygon
          points="8,10 92,10 92,46 50,46 50,82 8,82"
          fill="#dbeafe" stroke="#93c5fd" strokeWidth="2"
        />
        {/* Side labels */}
        <text x="50" y="6" textAnchor="middle" fontSize="9" fill="#6b7280" fontWeight="bold">24 cm</text>
        <text x="96" y="30" textAnchor="start" fontSize="9" fill="#6b7280" fontWeight="bold">12 cm</text>
        <text x="71" y="44" textAnchor="middle" fontSize="9" fill="#6b7280" fontWeight="bold">12 cm</text>
        <text x="54" y="68" textAnchor="start" fontSize="9" fill="#6b7280" fontWeight="bold">12 cm</text>
        <text x="29" y="88" textAnchor="middle" fontSize="9" fill="#6b7280" fontWeight="bold">12 cm</text>
        <text x="1" y="48" fontSize="9" fill="#6b7280" fontWeight="bold">24 cm</text>
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

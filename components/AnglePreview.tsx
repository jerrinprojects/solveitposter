// Static visual mockups for Measurement · Angle exercise previews.
// No interactivity — display only.
// Visuals mirror the live Angle activity: purple arrows (#7c3aed),
// orange "end" arrows (#f59e0b) and dashed orange turn arcs.

import React from "react";

// ── Brand tokens (match the live Angle activity) ─────────────────
const PURPLE = "#7c3aed";
const PURPLE_LIGHT = "#c4b5fd";
const PURPLE_SOFT = "#ede9fe";
const ORANGE = "#f59e0b";
const ORANGE_SOFT = "#fef3c7";
const ORANGE_LIGHT = "#fde68a";

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

function Choices({ items }: { items: string[] }) {
  return (
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center", marginTop: 8 }}>
      {items.map((label) => (
        <div key={label} style={{ border: "2px solid #e5e7eb", borderRadius: 8, padding: "4px 10px", fontSize: 11, fontWeight: 700, color: "#6b7280" }}>
          {label}
        </div>
      ))}
    </div>
  );
}

// A straight arrow inside an SVG. angle 0 = points up, clockwise positive.
function Arrow({ angle = 0, color = PURPLE, length = 56, cx, cy }: { angle?: number; color?: string; length?: number; cx: number; cy: number }) {
  return (
    <g transform={`rotate(${angle} ${cx} ${cy})`}>
      <line x1={cx} y1={cy + length / 2} x2={cx} y2={cy - length / 2} stroke={color} strokeWidth="4" strokeLinecap="round" />
      <polygon points={`${cx - 7},${cy - length / 2 + 10} ${cx},${cy - length / 2 - 4} ${cx + 7},${cy - length / 2 + 10}`} fill={color} />
    </g>
  );
}

// Dashed orange turn arc (mirrors CurvedIndicator). 0 = top, clockwise positive.
function Arc({ cx, cy, r, startAngle, sweep }: { cx: number; cy: number; r: number; startAngle: number; sweep: number }) {
  const s = (deg: number) => {
    const rad = (deg - 90) * (Math.PI / 180);
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };
  const start = s(startAngle);
  const end = s(startAngle + sweep);
  const largeArc = Math.abs(sweep) > 180 ? 1 : 0;
  const sweepFlag = sweep > 0 ? 1 : 0;
  return (
    <path d={`M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} ${sweepFlag} ${end.x} ${end.y}`} stroke={ORANGE} strokeWidth="2.5" fill="none" strokeDasharray="4,3" />
  );
}

// A disc (circle) holding arrows / arcs. Purple "start" or yellow "end" style.
function Disc({ size = 84, tone = "start", children }: { size?: number; tone?: "start" | "end" | "plain"; children?: React.ReactNode }) {
  const c = size / 2;
  const fill = tone === "end" ? ORANGE_SOFT : tone === "plain" ? "#f8fafc" : PURPLE_SOFT;
  const stroke = tone === "end" ? ORANGE_LIGHT : tone === "plain" ? "#e2e8f0" : PURPLE_LIGHT;
  return (
    <svg width={size} height={size}>
      <circle cx={c} cy={c} r={c - 6} fill={fill} stroke={stroke} strokeWidth="2" />
      {children}
    </svg>
  );
}

function Qmark({ cx, cy }: { cx: number; cy: number }) {
  return <text x={cx} y={cy + 8} textAnchor="middle" fontSize="26" fontWeight="800" fill={PURPLE_LIGHT}>?</text>;
}

function Caret() {
  return <div style={{ fontSize: 24, color: "#94a3b8", fontWeight: 700 }}>→</div>;
}

// A "start → end" turn pair. sweep in degrees (clockwise positive).
function TurnPair({ size = 78, startAngle = 0, sweep = 90, showArc = true, endQ = false }: { size?: number; startAngle?: number; sweep?: number; showArc?: boolean; endQ?: boolean }) {
  const c = size / 2;
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "center" }}>
      <Disc size={size} tone="start">
        <Arrow angle={startAngle} length={size * 0.62} cx={c} cy={c} color={PURPLE} />
      </Disc>
      <Caret />
      <Disc size={size} tone="end">
        {showArc && <Arc cx={c} cy={c} r={c - 14} startAngle={startAngle} sweep={sweep} />}
        {endQ ? <Qmark cx={c} cy={c} /> : <Arrow angle={startAngle + sweep} length={size * 0.62} cx={c} cy={c} color={ORANGE} />}
      </Disc>
    </div>
  );
}

// A round (circular) rotation arrow showing clockwise / anticlockwise.
function SpinDisc({ size = 90, clockwise = true }: { size?: number; clockwise?: boolean }) {
  const c = size / 2;
  const r = c - 16;
  const sweep = clockwise ? 270 : -270;
  const s = (deg: number) => {
    const rad = (deg - 90) * (Math.PI / 180);
    return { x: c + r * Math.cos(rad), y: c + r * Math.sin(rad) };
  };
  const start = s(0);
  const end = s(sweep);
  const head = s(sweep);
  return (
    <Disc size={size} tone="start">
      <path d={`M ${start.x} ${start.y} A ${r} ${r} 0 1 ${clockwise ? 1 : 0} ${end.x} ${end.y}`} stroke={PURPLE} strokeWidth="4" fill="none" strokeLinecap="round" />
      <polygon
        points={`${head.x - 6},${head.y} ${head.x + 6},${head.y - 5} ${head.x + 6},${head.y + 5}`}
        fill={PURPLE}
        transform={`rotate(${clockwise ? 90 : -90} ${head.x} ${head.y})`}
      />
    </Disc>
  );
}

// A compass: N/E/S/W ring with a purple "start" pointer, a turn arc, and an
// optional "?" marker at the direction the turn ends on.
function Compass({ size = 96, facing = 0, sweep, showQ = false }: { size?: number; facing?: number; sweep?: number; showQ?: boolean }) {
  const c = size / 2;
  const endA = facing + (sweep ?? 0);
  const qr = c - 18;
  const qx = c + qr * Math.cos((endA - 90) * (Math.PI / 180));
  const qy = c + qr * Math.sin((endA - 90) * (Math.PI / 180));
  return (
    <svg width={size} height={size}>
      <circle cx={c} cy={c} r={c - 6} fill={PURPLE_SOFT} stroke={PURPLE_LIGHT} strokeWidth="2" />
      <text x={c} y={13} textAnchor="middle" fontSize="10" fontWeight="700" fill="#6b7280">N</text>
      <text x={size - 7} y={c + 4} textAnchor="middle" fontSize="10" fontWeight="700" fill="#6b7280">E</text>
      <text x={c} y={size - 4} textAnchor="middle" fontSize="10" fontWeight="700" fill="#6b7280">S</text>
      <text x={7} y={c + 4} textAnchor="middle" fontSize="10" fontWeight="700" fill="#6b7280">W</text>
      {typeof sweep === "number" && <Arc cx={c} cy={c} r={c - 20} startAngle={facing} sweep={sweep} />}
      <Arrow angle={facing} length={size * 0.42} cx={c} cy={c} color={PURPLE} />
      {showQ && <text x={qx} y={qy + 6} textAnchor="middle" fontSize="18" fontWeight="800" fill={ORANGE}>?</text>}
    </svg>
  );
}

// ── Year 0 ───────────────────────────────────────────────────────

// 0.1 — Which way does the arrow point?
function A01() {
  return (
    <Card>
      <Instr text="Which way does the arrow point?" />
      <Disc size={92}>
        <Arrow angle={90} length={58} cx={46} cy={46} />
      </Disc>
      <Choices items={["Left", "Right"]} />
    </Card>
  );
}

// 0.2 — Do these two turns go the same way?
function A02() {
  return (
    <Card>
      <Instr text="Do these two turns go the same way?" />
      <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
        <SpinDisc size={70} clockwise />
        <SpinDisc size={70} clockwise={false} />
      </div>
      <Choices items={["Same", "Different"]} />
    </Card>
  );
}

// 0.3 — Find the arrow that points right.
function A03() {
  const dirs = [0, 90, 180, 270];
  return (
    <Card>
      <Instr text="Tap the arrow that points right." />
      <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
        {dirs.map((d, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <Disc size={56} tone="plain">
              <Arrow angle={d} length={34} cx={28} cy={28} />
            </Disc>
            <div style={{ fontSize: 10, fontWeight: 800, color: PURPLE }}>{String.fromCharCode(65 + i)}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ── Year 1 ───────────────────────────────────────────────────────

// 1.1 — Did the arrow turn left or right?
function A11() {
  return (
    <Card>
      <Instr text="Did the arrow turn left or right?" />
      <TurnPair size={78} startAngle={0} sweep={-90} />
      <Choices items={["Left", "Right"]} />
    </Card>
  );
}

// 1.2 — Match the turn to "left" or "right".
function A12() {
  return (
    <Card>
      <Instr text="Which turn is this?" />
      <TurnPair size={78} startAngle={0} sweep={90} />
      <Choices items={["Left", "Right"]} />
    </Card>
  );
}

// 1.3 — Turn and say which way I face now.
function A13() {
  return (
    <Card>
      <Instr text="You face up, then turn. Which way now?" />
      <Compass size={96} facing={0} sweep={90} showQ />
      <Choices items={["Up", "Down", "Left", "Right"]} />
    </Card>
  );
}

// ── Year 2 ───────────────────────────────────────────────────────

// 2.1 — Full, half, or quarter turn?
function A21() {
  return (
    <Card>
      <Instr text="What kind of turn is this?" />
      <TurnPair size={78} startAngle={0} sweep={90} />
      <Choices items={["Full turn", "Half turn", "Quarter turn"]} />
    </Card>
  );
}

// 2.2 — Clockwise or anticlockwise?
function A22() {
  return (
    <Card>
      <Instr text="Which way does it turn?" />
      <SpinDisc size={92} clockwise />
      <Choices items={["Clockwise", "Anticlockwise"]} />
    </Card>
  );
}

// 2.3 — Facing up, make a quarter turn. Which way now?
function A23() {
  return (
    <Card>
      <Instr text="Facing up, make a quarter turn. Which way now?" />
      <Compass size={96} facing={0} sweep={90} showQ />
      <Choices items={["Up", "Down", "Left", "Right"]} />
    </Card>
  );
}

// 2.4 — Facing up, make a half turn. Which way now?
function A24() {
  return (
    <Card>
      <Instr text="Facing up, make a half turn. Which way now?" />
      <Compass size={96} facing={0} sweep={180} showQ />
      <Choices items={["Up", "Down", "Left", "Right"]} />
    </Card>
  );
}

// 2.5 — Facing up, make a three-quarter turn. Which way now?
function A25() {
  return (
    <Card>
      <Instr text="Facing up, make a three-quarter turn. Which way now?" />
      <Compass size={96} facing={0} sweep={270} showQ />
      <Choices items={["Up", "Down", "Left", "Right"]} />
    </Card>
  );
}

// ── Year 3 ───────────────────────────────────────────────────────

// 3.1 — Match the description to the turn (turn shown, pick the words).
function A31() {
  return (
    <Card>
      <Instr text="Which description matches this turn?" />
      <TurnPair size={76} startAngle={0} sweep={90} />
      <Choices items={["Quarter clockwise", "Half turn", "Quarter anticlockwise"]} />
    </Card>
  );
}

// 3.2 — Clockwise quarter turn. Which way now?
function A32() {
  return (
    <Card>
      <Instr text="Turn a quarter clockwise. Which way now?" />
      <Compass size={96} facing={0} sweep={90} showQ />
      <Choices items={["Up", "Down", "Left", "Right"]} />
    </Card>
  );
}

// 3.3 — Anticlockwise quarter turn. Which way now?
function A33() {
  return (
    <Card>
      <Instr text="Turn a quarter anticlockwise. Which way now?" />
      <Compass size={96} facing={0} sweep={-90} showQ />
      <Choices items={["Up", "Down", "Left", "Right"]} />
    </Card>
  );
}

// 3.4 — Mixed quarter or half turn: which way now?
function A34() {
  return (
    <Card>
      <Instr text="Make a half turn. Which way now?" />
      <Compass size={96} facing={0} sweep={180} showQ />
      <Choices items={["Up", "Down", "Left", "Right"]} />
    </Card>
  );
}

// 3.5 — How far did it turn?
function A35() {
  return (
    <Card>
      <Instr text="How far did it turn?" />
      <TurnPair size={78} startAngle={0} sweep={270} />
      <Choices items={["Quarter", "Half", "Three-quarter", "Full"]} />
    </Card>
  );
}

// ── Phase 2 atoms (angles, protractor, shapes) — mirror AngleLevel ───

// A single angle: vertex + two dark rays + purple arc (right-angle square at 90).
// 0 = first ray along +x; deg measured anticlockwise. Reflex (>180) draws the major arc.
function AngleMark({ deg, label, size = 116, color = PURPLE, closeTriangle = false }: { deg: number; label?: string; size?: number; color?: string; closeTriangle?: boolean }) {
  const cx = size / 2, cy = size / 2 + 12;
  const rayLen = size * 0.4;
  const rad = (deg * Math.PI) / 180;
  const r1 = { x: cx + rayLen, y: cy };
  const r2 = { x: cx + rayLen * Math.cos(rad), y: cy - rayLen * Math.sin(rad) };
  const arcR = 18;
  const arcS = { x: cx + arcR, y: cy };
  const arcE = { x: cx + arcR * Math.cos(rad), y: cy - arcR * Math.sin(rad) };
  const largeArc = deg > 180 ? 1 : 0;
  const labelRad = (deg / 2) * (Math.PI / 180);
  const labelR = arcR + 14;
  const lx = cx + labelR * Math.cos(labelRad);
  const ly = cy - labelR * Math.sin(labelRad);
  return (
    <svg width={size} height={size}>
      <line x1={cx} y1={cy} x2={r1.x} y2={r1.y} stroke="#1f2937" strokeWidth="3" strokeLinecap="round" />
      <line x1={cx} y1={cy} x2={r2.x} y2={r2.y} stroke="#1f2937" strokeWidth="3" strokeLinecap="round" />
      {closeTriangle && <line x1={r1.x} y1={r1.y} x2={r2.x} y2={r2.y} stroke="#1f2937" strokeWidth="3" strokeLinecap="round" />}
      {deg === 90 ? (
        <rect x={cx} y={cy - 16} width={16} height={16} fill="none" stroke={color} strokeWidth="2.5" />
      ) : (
        <path d={`M ${arcS.x} ${arcS.y} A ${arcR} ${arcR} 0 ${largeArc} 0 ${arcE.x} ${arcE.y}`} stroke={color} strokeWidth="2.5" fill="none" />
      )}
      {label && <text x={lx} y={ly + 4} textAnchor="middle" fontSize="13" fontWeight="800" fill={color}>{label}</text>}
      <circle cx={cx} cy={cy} r={3} fill="#1f2937" />
    </svg>
  );
}

// A row of small angle diagrams labelled A / B / C (choose-the-angle questions).
function AngleChoiceRow({ angles }: { angles: { deg: number; label: string }[] }) {
  return (
    <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
      {angles.map((a) => (
        <div key={a.label} style={{ textAlign: "center" }}>
          <div style={{ background: "#f8fafc", borderRadius: 8 }}>
            <AngleMark deg={a.deg} size={66} />
          </div>
          <div style={{ fontSize: 10, fontWeight: 800, color: PURPLE }}>{a.label}</div>
        </div>
      ))}
    </div>
  );
}

// A protractor (180° semicircle or 360° full) with a red measured ray + arc.
function Protractor({ deg, max = 180, size = 150 }: { deg: number; max?: number; size?: number }) {
  const cx = size / 2;
  const cy = max === 180 ? size * 0.6 : size / 2;
  const R = size * 0.42;
  const toPt = (a: number, rFrom = R) => {
    const r = (a * Math.PI) / 180;
    return { x: cx + rFrom * Math.cos(r), y: cy - rFrom * Math.sin(r) };
  };
  const body = max === 180
    ? <path d={`M ${cx + R} ${cy} A ${R} ${R} 0 0 0 ${cx - R} ${cy} Z`} fill={PURPLE_SOFT} stroke={PURPLE} strokeWidth="2" />
    : <circle cx={cx} cy={cy} r={R} fill={PURPLE_SOFT} stroke={PURPLE} strokeWidth="2" />;
  const ticks = [];
  for (let a = 0; a <= max; a += 30) {
    const o = toPt(a, R), inp = toPt(a, R - 8);
    ticks.push(<line key={a} x1={inp.x} y1={inp.y} x2={o.x} y2={o.y} stroke="#1f2937" strokeWidth="1.2" />);
  }
  const baseEnd = toPt(0, R);
  const rayEnd = toPt(deg, R);
  const arcR = R * 0.34;
  const arcS = toPt(0, arcR), arcE = toPt(deg, arcR);
  const largeArc = deg > 180 ? 1 : 0;
  return (
    <svg width={size} height={max === 180 ? size * 0.72 : size}>
      {body}
      {ticks}
      <line x1={cx} y1={cy} x2={baseEnd.x} y2={baseEnd.y} stroke="#b91c1c" strokeWidth="3" strokeLinecap="round" />
      <line x1={cx} y1={cy} x2={rayEnd.x} y2={rayEnd.y} stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
      <path d={`M ${arcS.x} ${arcS.y} A ${arcR} ${arcR} 0 ${largeArc} 0 ${arcE.x} ${arcE.y}`} stroke="#dc2626" strokeWidth="2.5" fill="none" />
      <circle cx={cx} cy={cy} r={3} fill="#1f2937" />
    </svg>
  );
}

// A regular polygon outline with a dot at each vertex (count-the-angles).
function Polygon({ n, size = 120 }: { n: number; size?: number }) {
  const cx = size / 2, cy = size / 2, r = size * 0.38;
  const pts: string[] = [];
  for (let i = 0; i < n; i++) {
    const a = (-90 + (i * 360) / n) * (Math.PI / 180);
    pts.push(`${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`);
  }
  return (
    <svg width={size} height={size}>
      <polygon points={pts.join(" ")} fill="#fafafa" stroke="#1f2937" strokeWidth="2.5" />
      {pts.map((p, i) => {
        const [x, y] = p.split(",").map(Number);
        return <circle key={i} cx={x} cy={y} r={3} fill={PURPLE} />;
      })}
    </svg>
  );
}

// A quadrilateral (trapezium) with its four interior angles labelled.
// xIndex marks the unknown angle (drawn orange).
function Quad({ labels, xIndex }: { labels: string[]; xIndex?: number }) {
  const pos = [{ x: 58, y: 74 }, { x: 216, y: 74 }, { x: 238, y: 170 }, { x: 30, y: 170 }];
  return (
    <svg width={172} height={120} viewBox="0 0 290 200">
      <polygon points="40,50 250,50 270,180 20,180" fill="#fafafa" stroke="#1f2937" strokeWidth="2.5" />
      {labels.map((l, i) => (
        <text key={i} x={pos[i].x} y={pos[i].y} fontSize="17" fontWeight="800" fill={i === xIndex ? ORANGE : PURPLE}>{l}</text>
      ))}
    </svg>
  );
}

// ── Year 4 ───────────────────────────────────────────────────────

// 4.1 — How many degrees in a turn?
function A41() {
  return (
    <Card>
      <Instr text="How many degrees in this quarter turn?" />
      <TurnPair size={76} startAngle={0} sweep={90} endQ />
      <Choices items={["90°", "180°", "270°", "360°"]} />
    </Card>
  );
}

// 4.2 — Which is a right angle?
function A42() {
  return (
    <Card>
      <Instr text="Tap the right angle." />
      <AngleChoiceRow angles={[{ deg: 45, label: "A" }, { deg: 90, label: "B" }, { deg: 130, label: "C" }]} />
    </Card>
  );
}

// 4.3 — Smaller or larger than a right angle?
function A43() {
  return (
    <Card>
      <Instr text="Is this smaller or larger than a right angle?" />
      <AngleMark deg={50} size={104} />
      <Choices items={["Smaller", "Larger"]} />
    </Card>
  );
}

// 4.4 — Estimate using benchmark angles.
function A44() {
  return (
    <Card>
      <Instr text="Which benchmark is the best estimate?" />
      <AngleMark deg={120} size={104} />
      <Choices items={["0°", "45°", "90°", "135°", "180°"]} />
    </Card>
  );
}

// 4.5 — Estimate the size of this angle.
function A45() {
  return (
    <Card>
      <Instr text="Estimate the size of this angle." />
      <AngleMark deg={60} size={104} />
      <Choices items={["50°", "60°", "70°"]} />
    </Card>
  );
}

// ── Year 5 ───────────────────────────────────────────────────────

// 5.1 — Classify the angle.
function A51() {
  return (
    <Card>
      <Instr text="Classify this angle." />
      <AngleMark deg={130} size={104} />
      <Choices items={["Acute", "Right", "Obtuse", "Straight"]} />
    </Card>
  );
}

// 5.2 — Classify the angle (includes reflex).
function A52() {
  return (
    <Card>
      <Instr text="Classify this angle." />
      <AngleMark deg={300} size={104} />
      <Choices items={["Acute", "Right", "Obtuse", "Straight", "Reflex"]} />
    </Card>
  );
}

// 5.3 — Read the angle on the protractor.
function A53() {
  return (
    <Card>
      <Instr text="Read the angle on the protractor." />
      <Protractor deg={120} max={180} />
      <Choices items={["110°", "120°", "130°"]} />
    </Card>
  );
}

// 5.4 — Estimate the size of this angle.
function A54() {
  return (
    <Card>
      <Instr text="Estimate the size of this angle." />
      <AngleMark deg={110} size={104} />
      <Choices items={["About 70°", "About 110°", "About 150°"]} />
    </Card>
  );
}

// 5.5 — Sort angles from smallest to largest.
function A55() {
  return (
    <Card>
      <Instr text="Put these in order, smallest to largest." />
      <AngleChoiceRow angles={[{ deg: 35, label: "A" }, { deg: 120, label: "B" }, { deg: 70, label: "C" }]} />
      <div style={{ fontSize: 10, fontWeight: 700, color: "#9ca3af", marginTop: 6 }}>smallest → largest</div>
    </Card>
  );
}

// ── Year 6 ───────────────────────────────────────────────────────

// 6.1 — Read a reflex angle on a 360° protractor.
function A61() {
  return (
    <Card>
      <Instr text="Read the reflex angle on the protractor." />
      <Protractor deg={240} max={360} size={128} />
      <Choices items={["220°", "240°", "260°"]} />
    </Card>
  );
}

// 6.2 — How many interior angles does a shape have?
function A62() {
  return (
    <Card>
      <Instr text="How many interior angles does this shape have?" />
      <Polygon n={5} size={104} />
      <Choices items={["4", "5", "6"]} />
    </Card>
  );
}

// 6.3 — Classify a triangle by its angles.
function A63() {
  return (
    <Card>
      <Instr text="What type of triangle is this?" />
      <AngleMark deg={110} size={110} closeTriangle />
      <Choices items={["Acute", "Right", "Obtuse"]} />
    </Card>
  );
}

// 6.4 — Estimate an angle of a triangle.
function A64() {
  return (
    <Card>
      <Instr text="Estimate the marked angle of this triangle." />
      <AngleMark deg={45} size={150} closeTriangle label="?" color={ORANGE} />
      <Choices items={["30°", "45°", "60°"]} />
    </Card>
  );
}

// 6.5 — Largest interior angle of a quadrilateral.
function A65() {
  return (
    <Card>
      <Instr text="Which interior angle is the largest?" />
      <Quad labels={["80°", "95°", "110°", "75°"]} />
      <Choices items={["80°", "95°", "110°", "75°"]} />
    </Card>
  );
}

// ── Phase 3 atoms (angle relationships + polygon rules) ──────────

// A small "x = ▢" answer box (Y7/Y8 answers are typed, not multiple choice).
function AnswerBox({ label = "x" }: { label?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
      <span style={{ fontSize: 12, fontWeight: 800, color: ORANGE }}>{label} =</span>
      <div style={{ border: "2px solid #e5e7eb", borderRadius: 8, width: 46, height: 26, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#bbb", fontSize: 13 }}>?</div>
    </div>
  );
}

// 7.1 — Angles on a straight line.
function DiaStraightLine({ a = 130 }: { a?: number }) {
  const w = 178, cy = 64, cx = w / 2, L = 60;
  const rad = (a * Math.PI) / 180;
  return (
    <svg width={w} height={92}>
      <line x1={14} y1={cy} x2={w - 14} y2={cy} stroke="#1f2937" strokeWidth="3" strokeLinecap="round" />
      <line x1={cx} y1={cy} x2={cx + L * Math.cos(rad)} y2={cy - L * Math.sin(rad)} stroke="#1f2937" strokeWidth="3" strokeLinecap="round" />
      <text x={cx + 22} y={cy - 8} fontSize="13" fontWeight="800" fill={PURPLE}>{a}°</text>
      <text x={cx - 30} y={cy - 8} fontSize="13" fontWeight="800" fill={ORANGE}>?</text>
      <circle cx={cx} cy={cy} r={3} fill="#1f2937" />
    </svg>
  );
}

// 7.2 — Angles at a point.
function DiaAtPoint({ parts = [120, 90] }: { parts?: number[] }) {
  const w = 150, h = 118, cx = w / 2, cy = h / 2, R = 46;
  const boundaries = [0];
  let c = 0;
  parts.forEach((p) => { c += p; boundaries.push(c); });
  const missing = 360 - c;
  const segs = [...parts, missing];
  const segLabels = [...parts.map((p) => `${p}°`), "?"];
  const ray = (deg: number) => ({ x: cx + R * Math.cos((deg * Math.PI) / 180), y: cy - R * Math.sin((deg * Math.PI) / 180) });
  let cursor = 0;
  const labs = segs.map((deg, i) => {
    const mid = cursor + deg / 2;
    const lr = R * 0.6;
    const o = segLabels[i] === "?";
    const pt = { x: cx + lr * Math.cos((mid * Math.PI) / 180), y: cy - lr * Math.sin((mid * Math.PI) / 180), t: segLabels[i], o };
    cursor += deg;
    return pt;
  });
  return (
    <svg width={w} height={h}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4,3" />
      {boundaries.slice(0, -1).map((b, i) => {
        const p = ray(b);
        return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" />;
      })}
      {labs.map((l, i) => <text key={i} x={l.x} y={l.y + 4} textAnchor="middle" fontSize="11" fontWeight="800" fill={l.o ? ORANGE : PURPLE}>{l.t}</text>)}
      <circle cx={cx} cy={cy} r={3} fill="#1f2937" />
    </svg>
  );
}

// 7.3 — Vertically opposite angles.
function DiaVertical({ a = 125 }: { a?: number }) {
  const w = 150, h = 116, cx = w / 2, cy = h / 2, L = 56;
  const rad = (a * Math.PI) / 180;
  return (
    <svg width={w} height={h}>
      <line x1={cx - L} y1={cy} x2={cx + L} y2={cy} stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" />
      <line x1={cx - L * Math.cos(rad)} y1={cy + L * Math.sin(rad)} x2={cx + L * Math.cos(rad)} y2={cy - L * Math.sin(rad)} stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" />
      <text x={cx + 16} y={cy - 12} fontSize="13" fontWeight="800" fill={PURPLE}>{a}°</text>
      <text x={cx - 24} y={cy + 22} fontSize="13" fontWeight="800" fill={ORANGE}>?</text>
      <circle cx={cx} cy={cy} r={3} fill="#1f2937" />
    </svg>
  );
}

// 7.4 — Complementary angles (split a right angle).
function DiaComplementary({ a = 35 }: { a?: number }) {
  const w = 150, h = 116, ox = 48, oy = 92, L = 72;
  const rad = ((90 - a) * Math.PI) / 180;
  return (
    <svg width={w} height={h}>
      <line x1={ox} y1={oy} x2={ox} y2={oy - L} stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" />
      <line x1={ox} y1={oy} x2={ox + L} y2={oy} stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" />
      <line x1={ox} y1={oy} x2={ox + L * Math.cos(rad)} y2={oy - L * Math.sin(rad)} stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" />
      <rect x={ox + 2} y={oy - 16} width={14} height={14} fill="none" stroke={PURPLE_LIGHT} strokeWidth="1.5" />
      <text x={ox + 30} y={oy - 14} fontSize="13" fontWeight="800" fill={PURPLE}>{a}°</text>
      <text x={ox + 8} y={oy - 50} fontSize="13" fontWeight="800" fill={ORANGE}>?</text>
      <circle cx={ox} cy={oy} r={3} fill="#1f2937" />
    </svg>
  );
}

// 7.5 — Angles on parallel lines.
function DiaParallel({ a = 120 }: { a?: number }) {
  const w = 172;
  return (
    <svg width={w} height={116}>
      <line x1={16} y1={36} x2={w - 16} y2={36} stroke="#1f2937" strokeWidth="2.5" />
      <line x1={16} y1={88} x2={w - 16} y2={88} stroke="#1f2937" strokeWidth="2.5" />
      <text x={w - 13} y={33} fontSize="13" fill="#1f2937">›</text>
      <text x={w - 13} y={85} fontSize="13" fill="#1f2937">›</text>
      <line x1={52} y1={14} x2={122} y2={110} stroke="#1f2937" strokeWidth="2" />
      <text x={94} y={32} fontSize="13" fontWeight="800" fill={PURPLE}>{a}°</text>
      <text x={110} y={84} fontSize="13" fontWeight="800" fill={ORANGE}>?</text>
    </svg>
  );
}

// 7.6 — Triangle angle sum. Labels at the three corners (apex is x / orange).
function DiaTriangle({ a = 70, b = 60 }: { a?: number; b?: number }) {
  return (
    <svg width={150} height={114}>
      <polygon points="20,96 130,96 70,22" fill="#fafafa" stroke="#1f2937" strokeWidth="2.5" />
      <text x={30} y={88} fontSize="13" fontWeight="800" fill={PURPLE}>{a}°</text>
      <text x={104} y={88} fontSize="13" fontWeight="800" fill={PURPLE}>{b}°</text>
      <text x={64} y={48} fontSize="13" fontWeight="800" fill={ORANGE}>x</text>
    </svg>
  );
}

// A regular polygon with optional interior/exterior angle labels.
function PolygonLabeled({ n = 5, labels, xIndex, outside = false, size = 120 }: { n?: number; labels?: string[]; xIndex?: number; outside?: boolean; size?: number }) {
  const cx = size / 2, cy = size / 2, r = size * 0.32;
  const verts: { x: number; y: number }[] = [];
  for (let i = 0; i < n; i++) {
    const a = (-90 + (i * 360) / n) * (Math.PI / 180);
    verts.push({ x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) });
  }
  const f = outside ? 1.42 : 0.58;
  return (
    <svg width={size} height={size}>
      <polygon points={verts.map((v) => `${v.x},${v.y}`).join(" ")} fill="#fafafa" stroke="#1f2937" strokeWidth="2.5" />
      {labels && verts.map((v, i) => {
        const lx = cx + (v.x - cx) * f, ly = cy + (v.y - cy) * f;
        return <text key={i} x={lx} y={ly + 4} textAnchor="middle" fontSize="10.5" fontWeight="800" fill={i === xIndex ? ORANGE : PURPLE}>{labels[i]}</text>;
      })}
    </svg>
  );
}

// 8.6 — Multi-step: a triangle sitting on a straight line.
function DiaMultiStep() {
  return (
    <svg width={170} height={108}>
      <line x1={12} y1={86} x2={158} y2={86} stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" />
      <polygon points="52,86 130,86 96,30" fill="#fafafa" stroke="#1f2937" strokeWidth="2.5" />
      <text x={26} y={80} fontSize="12" fontWeight="800" fill={PURPLE}>a°</text>
      <text x={88} y={50} fontSize="12" fontWeight="800" fill={PURPLE}>b°</text>
      <text x={120} y={80} fontSize="12" fontWeight="800" fill={ORANGE}>x</text>
      <circle cx={52} cy={86} r={3} fill="#1f2937" />
    </svg>
  );
}

// 8.7 — Angle equation: two equal angles (x) and a known angle on a line.
function DiaEquation() {
  const cx = 85, cy = 70, L = 56;
  const r1 = { x: cx + L * Math.cos((60 * Math.PI) / 180), y: cy - L * Math.sin((60 * Math.PI) / 180) };
  const r2 = { x: cx + L * Math.cos((120 * Math.PI) / 180), y: cy - L * Math.sin((120 * Math.PI) / 180) };
  return (
    <svg width={170} height={88}>
      <line x1={14} y1={cy} x2={156} y2={cy} stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" />
      <line x1={cx} y1={cy} x2={r1.x} y2={r1.y} stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" />
      <line x1={cx} y1={cy} x2={r2.x} y2={r2.y} stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" />
      <text x={cx + 28} y={cy - 8} fontSize="12" fontWeight="800" fill={ORANGE}>x</text>
      <text x={cx - 6} y={cy - 30} fontSize="12" fontWeight="800" fill={PURPLE}>a°</text>
      <text x={cx - 34} y={cy - 8} fontSize="12" fontWeight="800" fill={ORANGE}>x</text>
      <circle cx={cx} cy={cy} r={3} fill="#1f2937" />
    </svg>
  );
}

// ── Year 7 ───────────────────────────────────────────────────────

function A71() {
  return (
    <Card>
      <Instr text="Find the missing angle on the straight line." />
      <DiaStraightLine a={130} />
      <AnswerBox label="?" />
    </Card>
  );
}

function A72() {
  return (
    <Card>
      <Instr text="Angles at a point add to 360°. Find the missing angle." />
      <DiaAtPoint parts={[120, 90]} />
      <AnswerBox label="?" />
    </Card>
  );
}

function A73() {
  return (
    <Card>
      <Instr text="Find the angle vertically opposite." />
      <DiaVertical a={125} />
      <AnswerBox label="?" />
    </Card>
  );
}

function A74() {
  return (
    <Card>
      <Instr text="These two angles add to 90°. Find the other." />
      <DiaComplementary a={35} />
      <AnswerBox label="?" />
    </Card>
  );
}

function A75() {
  return (
    <Card>
      <Instr text="Find the missing angle on the parallel lines." />
      <DiaParallel a={120} />
      <AnswerBox label="?" />
    </Card>
  );
}

function A76() {
  return (
    <Card>
      <Instr text="The angles add to 180°. Find angle x." />
      <DiaTriangle a={70} b={60} />
      <AnswerBox label="x" />
    </Card>
  );
}

function A77() {
  return (
    <Card>
      <Instr text="The angles add to 360°. Find angle x." />
      <Quad labels={["95°", "100°", "85°", "x"]} xIndex={3} />
      <AnswerBox label="x" />
    </Card>
  );
}

// ── Year 8 ───────────────────────────────────────────────────────

function A81() {
  return (
    <Card>
      <Instr text="Find the interior angle sum of this polygon." />
      <PolygonLabeled n={6} size={100} />
      <AnswerBox label="Sum" />
    </Card>
  );
}

function A82() {
  return (
    <Card>
      <Instr text="Find the missing interior angle x." />
      <PolygonLabeled n={5} labels={["110°", "100°", "120°", "x", "105°"]} xIndex={3} size={116} />
      <AnswerBox label="x" />
    </Card>
  );
}

function A83() {
  return (
    <Card>
      <Instr text="Exterior angles add to 360°. Find x." />
      <PolygonLabeled n={4} labels={["100°", "80°", "110°", "x"]} xIndex={3} outside size={124} />
      <AnswerBox label="x" />
    </Card>
  );
}

function A84() {
  return (
    <Card>
      <Instr text="Find each interior angle of this regular polygon." />
      <PolygonLabeled n={5} size={100} />
      <AnswerBox label="each" />
    </Card>
  );
}

function A85() {
  return (
    <Card>
      <Instr text="Find each exterior angle of this regular polygon." />
      <PolygonLabeled n={6} size={100} />
      <AnswerBox label="each" />
    </Card>
  );
}

function A86() {
  return (
    <Card>
      <Instr text="Find angle x." />
      <DiaMultiStep />
      <AnswerBox label="x" />
    </Card>
  );
}

function A87() {
  return (
    <Card>
      <Instr text="Two angles are equal (x). Solve for x." />
      <DiaEquation />
      <AnswerBox label="x" />
    </Card>
  );
}

// ── Map ──────────────────────────────────────────────────────────

export const ANGLE_PREVIEW_MAP: Record<string, () => React.ReactElement> = {
  "0.1": A01,
  "0.2": A02,
  "0.3": A03,
  "1.1": A11,
  "1.2": A12,
  "1.3": A13,
  "2.1": A21,
  "2.2": A22,
  "2.3": A23,
  "2.4": A24,
  "2.5": A25,
  "3.1": A31,
  "3.2": A32,
  "3.3": A33,
  "3.4": A34,
  "3.5": A35,
  "4.1": A41,
  "4.2": A42,
  "4.3": A43,
  "4.4": A44,
  "4.5": A45,
  "5.1": A51,
  "5.2": A52,
  "5.3": A53,
  "5.4": A54,
  "5.5": A55,
  "6.1": A61,
  "6.2": A62,
  "6.3": A63,
  "6.4": A64,
  "6.5": A65,
  "7.1": A71,
  "7.2": A72,
  "7.3": A73,
  "7.4": A74,
  "7.5": A75,
  "7.6": A76,
  "7.7": A77,
  "8.1": A81,
  "8.2": A82,
  "8.3": A83,
  "8.4": A84,
  "8.5": A85,
  "8.6": A86,
  "8.7": A87,
};

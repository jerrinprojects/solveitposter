// Static visual mockups of each exercise — no interactivity.
// No Check button. No 0-Streak bar. Instruction centred and readable.

import React from "react";

// ── Shared atoms ─────────────────────────────────────────────────

function Instr({ text }: { text: string }) {
  return (
    <p style={{
      fontSize: 11, color: "#6b7280", lineHeight: 1.5,
      marginBottom: 10, textAlign: "center", fontWeight: 600,
    }}>
      {text}
    </p>
  );
}

function QBox() {
  return (
    <div style={{
      border: "2px solid #e5e7eb", borderRadius: 8,
      width: 52, height: 32,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontWeight: 700, color: "#bbb", fontSize: 13,
      margin: "0 auto 0",
    }}>?</div>
  );
}

function Dot({ color }: { color: string }) {
  return (
    <div style={{ width: 12, height: 12, borderRadius: "50%", background: color, flexShrink: 0 }} />
  );
}

function SeqRow({ tokens }: { tokens: (number | null)[] }) {
  return (
    <div style={{ display: "flex", gap: 12, justifyContent: "center", alignItems: "center", margin: "6px 0 10px" }}>
      {tokens.map((t, i) =>
        t === null
          ? <div key={i} style={{ width: 44, height: 34, border: "2px solid #e5e7eb", borderRadius: 8, flexShrink: 0 }} />
          : <span key={i} style={{ fontSize: 22, fontWeight: 800, minWidth: 24, textAlign: "center" as const }}>{t}</span>
      )}
    </div>
  );
}

// Single layout — centred column, vertically centred in the card
function Card({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      flex: 1, padding: "10px 16px",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
    }}>
      {children}
    </div>
  );
}

// ── 0.1a ─────────────────────────────────────────────────────────
function P01a() {
  return (
    <Card>
      <Instr text="Count forwards up to 10: write the missing number." />
      <SeqRow tokens={[6, 7, 8, null]} />
      <QBox />
    </Card>
  );
}

// ── 0.2a ─────────────────────────────────────────────────────────
function P02a() {
  return (
    <Card>
      <Instr text="Count backwards from 10: write the missing number." />
      <SeqRow tokens={[8, 7, 6, null]} />
      <QBox />
    </Card>
  );
}

// ── 0.3a ─────────────────────────────────────────────────────────
function P03a() {
  return (
    <Card>
      <Instr text="How many giraffes? Enter the number." />
      <div style={{ textAlign: "center", fontSize: 24, letterSpacing: 6, margin: "6px 0 10px" }}>
        🦒 🦒 🦒 🦒
      </div>
      <QBox />
    </Card>
  );
}

// ── 0.4a ─────────────────────────────────────────────────────────
function P04a() {
  return (
    <Card>
      <Instr text="Write the number in words (e.g., 7 → seven)." />
      <div style={{ fontSize: 32, fontWeight: 800, textAlign: "center", margin: "4px 0 10px" }}>9</div>
      <div style={{
        border: "2px solid #e5e7eb", borderRadius: 8,
        padding: "4px 0", fontSize: 12, color: "#9ca3af",
        textAlign: "center", width: "80%",
      }}>Write in words</div>
    </Card>
  );
}

// ── 0.5a ─────────────────────────────────────────────────────────
function P05a() {
  return (
    <Card>
      <Instr text="How many are there? Enter the number and the word." />
      <div style={{ textAlign: "center", fontSize: 19, lineHeight: 1.8, margin: "4px 0 10px" }}>
        🌸 🌸 🌸 🌸 🌸<br />🌸 🌸
      </div>
      <div style={{ display: "flex", gap: 8, width: "90%" }}>
        <div style={{ flex: 1, border: "2px solid #e5e7eb", borderRadius: 8, padding: "4px 0", fontSize: 11, color: "#9ca3af", textAlign: "center" }}>Number</div>
        <div style={{ flex: 1, border: "2px solid #e5e7eb", borderRadius: 8, padding: "4px 0", fontSize: 11, color: "#9ca3af", textAlign: "center" }}>Word</div>
      </div>
    </Card>
  );
}

// ── 0.6a ─────────────────────────────────────────────────────────
function P06a() {
  return (
    <Card>
      <Instr text="Which group has more? Tap a box." />
      <div style={{ display: "flex", gap: 10, justifyContent: "center", width: "100%" }}>
        <div style={{ border: "2px solid #e5e7eb", borderRadius: 10, padding: "10px 12px", textAlign: "center", flex: 1 }}>
          <div style={{ display: "flex", gap: 5, justifyContent: "center", flexWrap: "wrap", marginBottom: 5 }}>
            <Dot color="#f97316" /><Dot color="#f97316" />
          </div>
          <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 700 }}>A</span>
        </div>
        <div style={{ border: "2px solid #e5e7eb", borderRadius: 10, padding: "10px 12px", textAlign: "center", flex: 1 }}>
          <div style={{ display: "flex", gap: 5, justifyContent: "center", flexWrap: "wrap", marginBottom: 5 }}>
            <Dot color="#22c55e" /><Dot color="#22c55e" /><Dot color="#22c55e" />
            <Dot color="#22c55e" /><Dot color="#22c55e" />
          </div>
          <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 700 }}>B</span>
        </div>
      </div>
    </Card>
  );
}

// ── 0.7a ─────────────────────────────────────────────────────────
function P07a() {
  return (
    <Card>
      <Instr text="Order from smallest to largest. Click in order." />
      <div style={{ display: "flex", gap: 10, justifyContent: "center", margin: "6px 0 8px" }}>
        {[4, 5, 7].map(n => (
          <div key={n} style={{
            border: "2px solid #e5e7eb", borderRadius: 8,
            padding: "4px 14px", fontWeight: 700, fontSize: 16,
          }}>{n}</div>
        ))}
      </div>
      <div style={{ fontSize: 11, color: "#9ca3af", textAlign: "center" }}>Your order:</div>
    </Card>
  );
}

// ── 0.8a ─────────────────────────────────────────────────────────
function P08a() {
  return (
    <Card>
      <Instr text="How many dots are there? Enter the number." />
      <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center", margin: "6px 0 10px" }}>
        <div style={{ display: "flex", gap: 6 }}>
          <Dot color="#1e293b" /><Dot color="#1e293b" /><Dot color="#1e293b" />
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <Dot color="#1e293b" /><Dot color="#1e293b" />
        </div>
      </div>
      <QBox />
    </Card>
  );
}

// ── 0.9a ─────────────────────────────────────────────────────────
function P09a() {
  return (
    <Card>
      <Instr text="Find the missing part:" />
      <div style={{ textAlign: "center", margin: "4px 0" }}>
        <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 2 }}>whole</div>
        <div style={{
          border: "2px solid #d1d5db", borderRadius: 6,
          padding: "3px 16px", fontWeight: 700, fontSize: 16,
          display: "inline-block", marginBottom: 10,
        }}>9</div>
        <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
          {[{ label: "part", val: "1" }, { label: "part", val: "?" }].map(({ label, val }, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 2 }}>{label}</div>
              <div style={{
                border: "2px solid #d1d5db", borderRadius: 6,
                padding: "3px 12px", fontWeight: 700, fontSize: 15,
                display: "inline-block",
                color: val === "?" ? "#9ca3af" : undefined,
              }}>{val}</div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

// ── Map & container ──────────────────────────────────────────────

const MAP: Record<string, () => React.ReactElement> = {
  "0.1a": P01a,
  "0.2a": P02a,
  "0.3a": P03a,
  "0.4a": P04a,
  "0.5a": P05a,
  "0.6a": P06a,
  "0.7a": P07a,
  "0.8a": P08a,
  "0.9a": P09a,
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

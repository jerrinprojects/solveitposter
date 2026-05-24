// The Tricky 12 — hardest times table facts with memory tricks

const PALETTE = {
  pink:   { accent: '#fbb6ce', dark: '#9d174d', bg: '#fff5f9' },
  indigo: { accent: '#c7d2fe', dark: '#3730a3', bg: '#f5f3ff' },
  teal:   { accent: '#99f6e4', dark: '#0f766e', bg: '#f0fdfa' },
  purple: { accent: '#e9d5ff', dark: '#6b21a8', bg: '#faf5ff' },
  orange: { accent: '#fed7aa', dark: '#9a3412', bg: '#fffbf5' },
};

const FACTS: {
  a: number; b: number; result: number;
  trick: string; hint: string; emoji: string;
  color: keyof typeof PALETTE; star?: boolean;
}[] = [
  {
    a: 6, b: 6, result: 36,
    trick: "Half of 6 is 3 — write 36",
    hint: "6 ÷ 2 = 3  →  36",
    emoji: "✂️", color: 'pink',
  },
  {
    a: 6, b: 7, result: 42,
    trick: "Double 21 to get 42",
    hint: "2 × 21 = 42",
    emoji: "🔁", color: 'pink',
  },
  {
    a: 6, b: 8, result: 48,
    trick: 'Six "ate" (8) forty-eight',
    hint: "6 ate 8 = 48",
    emoji: "😄", color: 'pink',
  },
  {
    a: 6, b: 9, result: 54,
    trick: "Count down — 5, 4 → 54",
    hint: "6, then 5 4",
    emoji: "⬇️", color: 'pink',
  },
  {
    a: 7, b: 7, result: 49,
    trick: "7² = 49 — lock it in cold!",
    hint: "7 × 7 = 49",
    emoji: "🔒", color: 'indigo',
  },
  {
    a: 7, b: 8, result: 56,
    trick: "5 · 6 · 7 · 8 in order!",
    hint: "56 = 7 × 8",
    emoji: "⭐", color: 'indigo',
    star: true,
  },
  {
    a: 7, b: 9, result: 63,
    trick: "10×7=70, take away 7",
    hint: "70 − 7 = 63",
    emoji: "➖", color: 'indigo',
  },
  {
    a: 8, b: 8, result: 64,
    trick: "Chessboard has 64 squares",
    hint: "8 × 8 = 64  ♟",
    emoji: "♟️", color: 'teal',
  },
  {
    a: 8, b: 9, result: 72,
    trick: "10×8=80, take away 8",
    hint: "80 − 8 = 72",
    emoji: "➖", color: 'teal',
  },
  {
    a: 9, b: 9, result: 81,
    trick: "10×9=90, take away 9",
    hint: "90 − 9 = 81",
    emoji: "➖", color: 'purple',
  },
  {
    a: 3, b: 7, result: 21,
    trick: "3 weeks = 21 days!",
    hint: "3 × 7 days = 21",
    emoji: "📅", color: 'orange',
  },
  {
    a: 4, b: 7, result: 28,
    trick: "28 days in February",
    hint: "4 weeks × 7 days = 28",
    emoji: "📅", color: 'orange',
  },
];

function TrickyCard({ a, b, result, trick, emoji, color, star }: typeof FACTS[0]) {
  const { accent, dark, bg } = PALETTE[color];
  return (
    <div style={{
      borderRadius: 13,
      border: `2px solid ${accent}`,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: `0 2px 10px ${accent}30`,
    }}>

      {/* ── Equation header ── */}
      <div style={{
        backgroundColor: accent,
        padding: '5px 14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <span style={{
          fontFamily: 'var(--font-fredoka), sans-serif',
          fontSize: 20, fontWeight: 700, color: dark, letterSpacing: '0.03em',
        }}>
          {a} × {b} =
        </span>
        {star && (
          <span style={{
            fontSize: 9, fontWeight: 800, color: dark,
            backgroundColor: 'rgba(0,0,0,0.08)',
            borderRadius: 20, padding: '2px 8px', letterSpacing: '0.03em',
          }}>
            ★ best trick
          </span>
        )}
      </div>

      {/* ── Result ── */}
      <div style={{
        flex: 1,
        backgroundColor: bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4px 8px',
      }}>
        <span style={{
          fontFamily: 'var(--font-fredoka), sans-serif',
          fontSize: 78, fontWeight: 700,
          color: dark, lineHeight: 1,
        }}>
          {result}
        </span>
      </div>

      {/* ── Trick ── */}
      <div style={{
        backgroundColor: `${accent}1a`,
        borderTop: `1.5px solid ${accent}55`,
        padding: '7px 12px',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        flexShrink: 0,
        minHeight: 40,
      }}>
        <span style={{ fontSize: 15, lineHeight: 1, flexShrink: 0 }}>{emoji}</span>
        <span style={{
          fontSize: 11, fontWeight: 700, color: dark, lineHeight: 1.35,
        }}>
          {trick}
        </span>
      </div>

    </div>
  );
}

export default function TrickyTwelve() {
  return (
    <div style={{ padding: '12px 20px 10px' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'repeat(3, 1fr)',
        gap: 10,
        height: 556, // fills A4 landscape content area
      }}>
        {FACTS.map((fact) => (
          <TrickyCard key={`${fact.a}x${fact.b}`} {...fact} />
        ))}
      </div>

      {/* Bottom note */}
      <p style={{ textAlign: 'center', fontSize: 10, color: '#9ca3af', fontWeight: 600, marginTop: 8 }}>
        Master these 12 facts and you know <strong style={{ color: '#374151' }}>every times table</strong> — the rest follow from easy patterns.
      </p>
    </div>
  );
}

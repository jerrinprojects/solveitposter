// The Tricky 12 — playful, brand-aligned redesign.
// Pink-accent solveit-style: chunky Poppins headlines, soft pastel cards,
// rounded chunky icons, and a Caveat handwritten accent.

import {
  IconPlus,
  IconRepeat,
  IconQuote,
  IconArrowDown,
  IconStar,
  IconStairs,
  IconMinus,
  IconChecker,
  IconCalendar,
} from "@/components/icons/TrickyIcons";

const PALETTE = {
  pink:   { ink: "#d6336c", bg: "#fff0f7", chip: "#ffd5e8", number: "#ec407a" },
  mint:   { ink: "#0d9488", bg: "#e6fbf5", chip: "#bff3e6", number: "#14b8a6" },
  sunny:  { ink: "#b8860b", bg: "#fff7d9", chip: "#ffe8a0", number: "#e8a93e" },
  grape:  { ink: "#7c3aed", bg: "#f3edff", chip: "#dccdfb", number: "#a78bda" },
} as const;

type AccentKey = keyof typeof PALETTE;
type IconFC = (props: { size?: number }) => JSX.Element;

const FACTS: {
  a: number; b: number; result: number;
  trick: string; Icon: IconFC; accent: AccentKey; star?: boolean;
}[] = [
  { a: 6, b: 6, result: 36, trick: "6 × 5 = 30, add one more 6",     Icon: IconPlus,       accent: "pink" },
  { a: 6, b: 7, result: 42, trick: "Double 21 to get 42",            Icon: IconRepeat,    accent: "mint" },
  { a: 6, b: 8, result: 48, trick: 'Six "ate" (8) forty-eight',      Icon: IconQuote,     accent: "sunny" },
  { a: 6, b: 9, result: 54, trick: "Count down — 5, 4 makes 54",     Icon: IconArrowDown, accent: "grape" },
  { a: 7, b: 7, result: 49, trick: "Seven squared — lock it in!",    Icon: IconStar,      accent: "pink" },
  { a: 7, b: 8, result: 56, trick: "5 · 6 · 7 · 8 in order!",        Icon: IconStairs,    accent: "mint", star: true },
  { a: 7, b: 9, result: 63, trick: "10 × 7 = 70, take away 7",       Icon: IconMinus,     accent: "sunny" },
  { a: 8, b: 8, result: 64, trick: "Chessboard has 64 squares",      Icon: IconChecker,   accent: "grape" },
  { a: 8, b: 9, result: 72, trick: "10 × 8 = 80, take away 8",       Icon: IconMinus,     accent: "pink" },
  { a: 9, b: 9, result: 81, trick: "10 × 9 = 90, take away 9",       Icon: IconMinus,     accent: "mint" },
  { a: 3, b: 7, result: 21, trick: "3 weeks = 21 days",              Icon: IconCalendar,  accent: "sunny" },
  { a: 4, b: 7, result: 28, trick: "28 days in February",            Icon: IconCalendar,  accent: "grape" },
];

function TrickyCard({ a, b, result, trick, Icon, accent, star }: typeof FACTS[0]) {
  const { ink, bg, chip, number } = PALETTE[accent];
  return (
    <div style={{
      borderRadius: 20,
      background: bg,
      border: `2px solid ${chip}`,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      boxShadow: "0 2px 0 rgba(0,0,0,0.04)",
      position: "relative",
    }}>
      {/* Equation header — chunky pill */}
      <div style={{
        padding: "8px 14px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexShrink: 0,
      }}>
        <span style={{
          fontFamily: "var(--font-display), sans-serif",
          fontSize: 19,
          fontWeight: 800,
          color: ink,
          letterSpacing: "-0.02em",
        }}>
          {a} × {b}
        </span>
        {star && (
          <span style={{
            fontFamily: "var(--font-body), sans-serif",
            fontSize: 8.5,
            fontWeight: 800,
            color: "#fff",
            background: ink,
            padding: "2.5px 8px",
            borderRadius: 999,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}>
            ★ Best
          </span>
        )}
      </div>

      {/* Result */}
      <div style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 8px 12px",
      }}>
        <span style={{
          fontFamily: "var(--font-display), sans-serif",
          fontSize: 78,
          fontWeight: 800,
          color: number,
          lineHeight: 1,
          letterSpacing: "-0.04em",
        }}>
          {result}
        </span>
      </div>

      {/* Trick footer — solid chip with chunky icon */}
      <div style={{
        background: chip,
        padding: "7px 12px",
        display: "flex",
        alignItems: "center",
        gap: 9,
        minHeight: 40,
        flexShrink: 0,
      }}>
        <span style={{
          color: ink,
          flexShrink: 0,
          display: "inline-flex",
          background: "#ffffff",
          borderRadius: 8,
          width: 28,
          height: 28,
          alignItems: "center",
          justifyContent: "center",
        }}>
          <Icon size={16} />
        </span>
        <span style={{
          fontFamily: "var(--font-body), sans-serif",
          fontSize: 11,
          fontWeight: 700,
          color: "#3a2a35",
          lineHeight: 1.3,
        }}>
          {trick}
        </span>
      </div>
    </div>
  );
}

export default function TrickyTwelve() {
  return (
    <div style={{ padding: "12px 22px 8px" }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gridTemplateRows: "repeat(3, 1fr)",
        gap: 10,
        height: 548,
      }}>
        {FACTS.map((f) => (
          <TrickyCard key={`${f.a}x${f.b}`} {...f} />
        ))}
      </div>

      {/* Bottom note */}
      <p style={{
        textAlign: "center",
        fontFamily: "var(--font-body), sans-serif",
        fontSize: 12,
        color: "#6b5560",
        fontWeight: 600,
        margin: "8px 0 0",
      }}>
        Master these twelve facts and you know{" "}
        <span style={{
          fontFamily: "var(--font-hand), cursive",
          fontSize: 18,
          color: "#ec407a",
          fontWeight: 700,
        }}>
          every times table!
        </span>
      </p>
    </div>
  );
}

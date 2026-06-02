// Multiplication Worksheets — 6 pages
// Pages 1–4: vertical-form practice (2×1, 2×2, 3×1, 3×2 digits)
// Pages 5–6: word problems
// Uses brand palette (pink / mint / sunny / grape) — one accent per page

const PAGE_PALETTE = {
  pink:   { ink: "#d6336c", soft: "#fff0f7", chip: "#ffd5e8", num: "#ec407a" },
  mint:   { ink: "#0d9488", soft: "#e6fbf5", chip: "#bff3e6", num: "#14b8a6" },
  sunny:  { ink: "#b8860b", soft: "#fff7d9", chip: "#ffe8a0", num: "#e8a93e" },
  grape:  { ink: "#7c3aed", soft: "#f3edff", chip: "#dccdfb", num: "#a78bda" },
} as const;

type AccentKey = keyof typeof PAGE_PALETTE;

// ── Small "page subtitle" pill that sits above each problem grid ────────
function PageBanner({ accent, label, hint }: { accent: AccentKey; label: string; hint: string }) {
  const { ink, chip } = PAGE_PALETTE[accent];
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "8px 14px", borderRadius: 14,
      background: chip, marginBottom: 12,
    }}>
      <span style={{
        fontFamily: "var(--font-display), sans-serif",
        fontSize: 16, fontWeight: 800, color: ink, letterSpacing: "-0.01em",
      }}>
        {label}
      </span>
      <span style={{
        fontFamily: "var(--font-body), sans-serif",
        fontSize: 11, fontWeight: 600, color: ink, opacity: 0.85,
      }}>
        {hint}
      </span>
    </div>
  );
}

// ── Vertical multiplication card (standard column form) ────────────────
// Shows H / T / O (Hundreds / Tens / Ones) place-value labels above digit columns.
function VerticalProblem({
  index, a, b, accent,
}: {
  index: number; a: number; b: number; accent: AccentKey;
}) {
  const { ink, chip, num } = PAGE_PALETTE[accent];
  const aStr = String(a);
  const bStr = String(b);
  const digitCols = Math.max(aStr.length, bStr.length);   // 2 or 3
  const totalCols = digitCols + 1;                         // + 1 for × column
  const PV_LABELS = ["H", "T", "O"];                       // hundreds → ones
  const pvForCol = (i: number) => PV_LABELS[3 - digitCols + i]; // align to ones at the right

  return (
    <div style={{
      borderRadius: 14,
      background: "#fffaf3",
      border: `1.5px solid ${chip}`,
      padding: "8px 10px",
      display: "flex",
      flexDirection: "column",
      minHeight: 0,
      boxSizing: "border-box",
      boxShadow: "0 1px 0 rgba(0,0,0,0.04)",
    }}>
      {/* index */}
      <div style={{
        fontFamily: "var(--font-body), sans-serif",
        fontSize: 10, fontWeight: 800, color: ink,
        letterSpacing: "0.08em", textTransform: "uppercase",
      }}>
        Q{index}
      </div>

      {/* vertical column form */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: 4,
        color: num,
        lineHeight: 1.15,
      }}>
        {/* Unified grid — labels, a, b all share the SAME column widths
           so H / T / O sit precisely above their digit. Fixed-pixel column
           widths keep alignment regardless of inner font sizes. */}
        {(() => {
          const COL_W = 18; // px per column, matches monospace 22px char width
          const cols = `repeat(${totalCols}, ${COL_W}px)`;
          const monoStyle: React.CSSProperties = {
            fontFamily: "var(--font-mono), 'Courier New', monospace",
            fontSize: 22, fontWeight: 700,
          };
          return (
            <div style={{
              display: "grid",
              gridTemplateColumns: cols,
              justifyItems: "center",
              alignItems: "center",
              rowGap: 2,
            }}>
              {/* Row 1: place-value labels (H / T / O) */}
              <span>&nbsp;</span>
              {Array.from({ length: digitCols }).map((_, i) => (
                <span key={"pv" + i} style={{
                  fontFamily: "var(--font-body), sans-serif",
                  fontSize: 9, fontWeight: 800, color: ink, opacity: 0.6,
                  letterSpacing: "0.04em",
                }}>
                  {pvForCol(i)}
                </span>
              ))}

              {/* Row 2: a (right-aligned by leading padding cells) */}
              {Array.from({ length: totalCols - aStr.length }).map((_, i) => (
                <span key={"pad-a" + i}>&nbsp;</span>
              ))}
              {aStr.split("").map((d, i) => (
                <span key={"a" + i} style={monoStyle}>{d}</span>
              ))}

              {/* Row 3: × b */}
              <span style={monoStyle}>×</span>
              {Array.from({ length: totalCols - bStr.length - 1 }).map((_, i) => (
                <span key={"pad-b" + i}>&nbsp;</span>
              ))}
              {bStr.split("").map((d, i) => (
                <span key={"b" + i} style={monoStyle}>{d}</span>
              ))}
            </div>
          );
        })()}

        {/* underline */}
        <div style={{
          width: 18 * totalCols,
          borderBottom: `2px solid ${ink}`,
          marginTop: 2, marginBottom: 4,
        }} />
        {/* answer space (filled with subtle dotted lines) */}
        <div style={{ width: "100%", flex: 1, position: "relative" }}>
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} style={{
              position: "absolute",
              left: "10%", right: "10%",
              top: `${(i + 1) * 30}%`,
              borderBottom: `1px dashed ${chip}`,
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Word problem card ──────────────────────────────────────────────────
function WordProblem({
  index, prompt, accent,
}: {
  index: number; prompt: string; accent: AccentKey;
}) {
  const { ink, chip, soft } = PAGE_PALETTE[accent];
  return (
    <div style={{
      borderRadius: 16,
      background: "#fffaf3",
      border: `1.5px solid ${chip}`,
      padding: "12px 16px 14px",
      display: "flex",
      flexDirection: "column",
      gap: 8,
      boxShadow: "0 1px 0 rgba(0,0,0,0.04)",
    }}>
      <div style={{
        display: "flex", alignItems: "baseline", gap: 8,
      }}>
        <span style={{
          fontFamily: "var(--font-display), sans-serif",
          fontSize: 16, fontWeight: 800, color: ink,
          background: chip, padding: "2px 9px", borderRadius: 999,
        }}>
          Q{index}
        </span>
      </div>
      <p style={{
        fontFamily: "var(--font-body), sans-serif",
        fontSize: 13.5, fontWeight: 500, color: "#2a2422",
        lineHeight: 1.5, margin: 0, flex: 1,
      }}>
        {prompt}
      </p>
      {/* Working space */}
      <div style={{
        background: soft, borderRadius: 10,
        padding: "8px 10px", minHeight: 50,
        display: "flex", flexDirection: "column", justifyContent: "space-around",
      }}>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} style={{
            borderBottom: `1px dashed ${chip}`,
            height: 1,
          }} />
        ))}
      </div>
      {/* Answer line */}
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <span style={{
          fontFamily: "var(--font-display), sans-serif",
          fontSize: 13, fontWeight: 700, color: ink,
        }}>
          Answer:
        </span>
        <div style={{
          flex: 1, height: 26,
          borderBottom: `2px solid ${ink}`,
        }} />
      </div>
    </div>
  );
}

// ── Page wrappers ──────────────────────────────────────────────────────

export function Worksheet2x1() {
  const problems: [number, number][] = [
    [47, 3], [56, 4], [28, 7], [39, 8], [64, 5],
    [82, 6], [53, 9], [71, 4], [86, 3], [27, 8],
    [94, 2], [35, 7], [68, 4], [19, 6], [75, 3],
    [46, 5], [83, 7], [29, 9], [57, 6], [92, 8],
  ];
  return (
    <div style={{ padding: "16px 22px 12px", display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
      <PageBanner
        accent="pink"
        label="2-digit × 1-digit"
        hint="Set up in columns, multiply each digit, carry over when needed."
      />
      <div style={{
        flex: 1, display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gridTemplateRows: "repeat(4, 1fr)",
        gap: 10, minHeight: 0,
      }}>
        {problems.map(([a, b], i) => (
          <VerticalProblem key={i} index={i + 1} a={a} b={b} accent="pink" />
        ))}
      </div>
    </div>
  );
}

export function Worksheet2x2() {
  const problems: [number, number][] = [
    [24, 13], [36, 27], [48, 19], [53, 42],
    [67, 35], [72, 48], [85, 16], [91, 24],
    [58, 31], [76, 45], [39, 62], [84, 57],
  ];
  return (
    <div style={{ padding: "16px 22px 12px", display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
      <PageBanner
        accent="mint"
        label="2-digit × 2-digit"
        hint="Multiply by the ones digit first, then the tens (shift one place left)."
      />
      <div style={{
        flex: 1, display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gridTemplateRows: "repeat(3, 1fr)",
        gap: 12, minHeight: 0,
      }}>
        {problems.map(([a, b], i) => (
          <VerticalProblem key={i} index={i + 1} a={a} b={b} accent="mint" />
        ))}
      </div>
    </div>
  );
}

export function Worksheet3x1() {
  const problems: [number, number][] = [
    [247, 3], [568, 7], [329, 4], [815, 6],
    [436, 9], [752, 5], [893, 2], [124, 8],
    [657, 3], [482, 7], [716, 4], [935, 6],
    [264, 5], [587, 9], [391, 8], [678, 2],
  ];
  return (
    <div style={{ padding: "16px 22px 12px", display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
      <PageBanner
        accent="sunny"
        label="3-digit × 1-digit"
        hint="Same idea — line up the digits, multiply right to left, carry when over 9."
      />
      <div style={{
        flex: 1, display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gridTemplateRows: "repeat(4, 1fr)",
        gap: 11, minHeight: 0,
      }}>
        {problems.map(([a, b], i) => (
          <VerticalProblem key={i} index={i + 1} a={a} b={b} accent="sunny" />
        ))}
      </div>
    </div>
  );
}

export function Worksheet3x2() {
  const problems: [number, number][] = [
    [258, 34], [467, 52], [819, 26],
    [372, 48], [645, 17], [593, 72],
    [738, 29], [426, 85], [154, 63],
  ];
  return (
    <div style={{ padding: "16px 22px 12px", display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
      <PageBanner
        accent="grape"
        label="3-digit × 2-digit"
        hint="Two partial products — multiply by the ones, then the tens (with a place-holder zero)."
      />
      <div style={{
        flex: 1, display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "repeat(3, 1fr)",
        gap: 14, minHeight: 0,
      }}>
        {problems.map(([a, b], i) => (
          <VerticalProblem key={i} index={i + 1} a={a} b={b} accent="grape" />
        ))}
      </div>
    </div>
  );
}

export function WordProblems1() {
  const accents: AccentKey[] = ["pink", "mint", "sunny", "grape"];
  const problems = [
    "Ella's class has 23 students. Each student is given 4 pens for the new term. How many pens does the teacher need in total?",
    "There are 7 netball teams at the tournament, and each team has 18 players. How many players are at the tournament altogether?",
    "Liam reads a chapter book that has 9 chapters, each with 15 pages. How many pages are in the whole book?",
    "An ice cream stall sells 28 ice creams a day for $4 each. How much money does the stall make in one day?",
  ];
  return (
    <div style={{ padding: "16px 22px 12px", display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
      <PageBanner
        accent="pink"
        label="Word Problems · Page 1"
        hint="Read carefully, show your working, then write your answer."
      />
      <div style={{
        flex: 1, display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gridTemplateRows: "repeat(2, 1fr)",
        gap: 14, minHeight: 0,
      }}>
        {problems.map((p, i) => (
          <WordProblem key={i} index={i + 1} prompt={p} accent={accents[i % 4]} />
        ))}
      </div>
    </div>
  );
}

export function WordProblems2() {
  const accents: AccentKey[] = ["mint", "grape", "sunny", "pink"];
  const problems = [
    "A school garden has 14 rows of vegetables, and each row has 25 plants. How many plants are growing in the garden?",
    "A school trip takes 38 buses to the museum. Each bus carries 52 students. How many students are on the trip in total?",
    "A bakery packs cupcakes into boxes. There are 16 boxes, and each box holds 24 cupcakes. How many cupcakes were packed?",
    "The school library has 47 shelves, and each shelf holds 36 books. About how many books does the library have on those shelves?",
  ];
  return (
    <div style={{ padding: "16px 22px 12px", display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
      <PageBanner
        accent="grape"
        label="Word Problems · Page 2"
        hint="These need a bit more thinking — set up the multiplication and solve."
      />
      <div style={{
        flex: 1, display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gridTemplateRows: "repeat(2, 1fr)",
        gap: 14, minHeight: 0,
      }}>
        {problems.map((p, i) => (
          <WordProblem key={i} index={i + 1} prompt={p} accent={accents[i % 4]} />
        ))}
      </div>
    </div>
  );
}

// Stage 2.1 word-problems worksheet — 6 problems per page, 4 pages (24 total)
// plus 4 matching answer pages. Each problem uses a context template; the
// numbers come from the same Stage 2.1 pool as the inline/column worksheets,
// so a × b is always a 2-digit × 1-digit no-carrying problem.

import type { InlineProblem } from "./MultiplicationInlineWorksheet";
import { WorksheetVersion } from "./MultiplicationInlineWorksheet";

const PAGE_PALETTE = {
  pink:   { ink: "#d6336c", soft: "#fff0f7", chip: "#ffd5e8", num: "#ec407a" },
  mint:   { ink: "#0d9488", soft: "#e6fbf5", chip: "#bff3e6", num: "#14b8a6" },
  sunny:  { ink: "#b8860b", soft: "#fff7d9", chip: "#ffe8a0", num: "#e8a93e" },
  grape:  { ink: "#7c3aed", soft: "#f3edff", chip: "#dccdfb", num: "#a78bda" },
} as const;

type AccentKey = keyof typeof PAGE_PALETTE;

// 24 context templates, each parameterised on (a, b). a×b answers the question.
// Scales across Stage 2.1–2.9: avoids currency contexts that get unrealistic
// at high numbers; uses bulk-quantity, distance, time and group contexts
// instead. Names are an NZ-flavoured mix.
const TEMPLATES: Array<(a: number, b: number) => string> = [
  (a, b) => `A box has ${a} marbles. There are ${b} boxes. How many marbles altogether?`,
  (a, b) => `A pack of stickers has ${a}. Liam buys ${b} packs. How many stickers does he have?`,
  (a, b) => `A box of crayons has ${a}. The teacher hands out ${b} boxes. How many crayons in total?`,
  (a, b) => `A pack of trading cards has ${a} cards. Noah opens ${b} packs. How many cards does he have?`,
  (a, b) => `A tray holds ${a} cupcakes. A bakery uses ${b} trays. How many cupcakes did they bake?`,
  (a, b) => `Each shelf holds ${a} books. There are ${b} shelves. How many books fit altogether?`,
  (a, b) => `A jar holds ${a} jellybeans. The shop has ${b} jars. How many jellybeans in total?`,
  (a, b) => `Ella reads ${a} pages each day for ${b} days. How many pages does she read in total?`,
  (a, b) => `Olivia practises piano for ${a} minutes each day for ${b} days. How many minutes altogether?`,
  (a, b) => `Lucas walks ${a} steps each minute for ${b} minutes. How many steps in total?`,
  (a, b) => `Ava runs ${a} laps each day for ${b} days. How many laps altogether?`,
  (a, b) => `Mia swims ${a} metres each day for ${b} days. How many metres has she swum?`,
  (a, b) => `A bus carries ${a} students. ${b} buses go on a school trip. How many students altogether?`,
  (a, b) => `A netball team has ${a} players. ${b} teams come to a tournament. How many players altogether?`,
  (a, b) => `A school van seats ${a} children. ${b} vans take children to camp. How many children altogether?`,
  (a, b) => `A garden row has ${a} flowers. There are ${b} rows. How many flowers in the garden?`,
  (a, b) => `Each kiwifruit tree gives ${a} fruit. The orchard has ${b} trees. How many kiwifruit in total?`,
  (a, b) => `Aroha collects ${a} shells each weekend for ${b} weekends. How many shells altogether?`,
  (a, b) => `Tane bakes ${a} biscuits in each batch. He makes ${b} batches. How many biscuits altogether?`,
  (a, b) => `Each pavlova needs ${a} eggs. The bakery makes ${b} pavlovas. How many eggs are needed?`,
  (a, b) => `Each row of seats has ${a} chairs. The hall has ${b} rows. How many seats altogether?`,
  (a, b) => `Kiri gives ${a} stickers to each friend. She has ${b} friends. How many stickers in total?`,
  (a, b) => `Each beehive has ${a} bees. The beekeeper has ${b} hives. How many bees altogether?`,
  (a, b) => `Sione plants ${a} seedlings in each row. He plants ${b} rows. How many seedlings in total?`,
];

const WORD_SEEDS: Record<WorksheetVersion, { problems: number; templates: number }> = {
  1: { problems: 1009, templates: 17 },
  2: { problems: 4357, templates: 53 },
  3: { problems: 9871, templates: 89 },
};

function seededShuffle<T>(arr: T[], seed: number): T[] {
  let state = seed >>> 0;
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    state = (state * 1103515245 + 12345) & 0x7fffffff;
    const j = state % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export type WordProblem = {
  prompt: string;
  answer: number;
};

// 24 word problems per version. (a,b) pairs come from the supplied pool;
// if the pool has < 24 unique pairs we cycle through with shuffling.
export function buildWordProblems(
  pool: InlineProblem[],
  version: WorksheetVersion,
): WordProblem[] {
  const seeds = WORD_SEEDS[version];
  const TOTAL = 24;
  // Shuffle once, cycle through. Spaces any duplicates by `pool.length`
  // positions (Stage 2.6's 21-item pool produces 3 duplicates across the
  // 24-problem worksheet, separated by 21 problems).
  const shuffled = seededShuffle(pool, seeds.problems);
  const pairs: InlineProblem[] = [];
  for (let i = 0; i < TOTAL; i++) {
    pairs.push(shuffled[i % shuffled.length]);
  }
  const templateOrder = seededShuffle(
    Array.from({ length: TEMPLATES.length }, (_, i) => i),
    seeds.templates,
  );
  return pairs.map(({ a, b }, i) => {
    const template = TEMPLATES[templateOrder[i % templateOrder.length]];
    return { prompt: template(a, b), answer: a * b };
  });
}

function WordProblemCell({
  index, problem, accent, showAnswer,
}: {
  index: number; problem: WordProblem; accent: AccentKey; showAnswer: boolean;
}) {
  const { ink, chip, soft } = PAGE_PALETTE[accent];
  return (
    <div style={{
      borderRadius: 16,
      background: "#fffaf3",
      border: `1.5px solid ${chip}`,
      padding: "10px 14px 12px",
      display: "flex",
      flexDirection: "column",
      gap: 6,
      minHeight: 0,
      boxSizing: "border-box",
      boxShadow: "0 1px 0 rgba(0,0,0,0.04)",
    }}>
      <div>
        <span style={{
          fontFamily: "var(--font-display), sans-serif",
          fontSize: 14, fontWeight: 800, color: ink,
          background: chip, padding: "2px 9px", borderRadius: 999,
        }}>
          Q{index}
        </span>
      </div>
      <p style={{
        fontFamily: "var(--font-body), sans-serif",
        fontSize: 12.5, fontWeight: 500, color: "#2a2422",
        lineHeight: 1.45, margin: 0, flex: 1,
      }}>
        {problem.prompt}
      </p>

      {/* Working space — same dashed-line look in both modes */}
      <div style={{
        background: soft, borderRadius: 10,
        padding: "6px 10px",
        display: "flex", flexDirection: "column", justifyContent: "space-around",
        height: 40,
      }}>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} style={{
            borderBottom: `1px dashed ${chip}`,
            height: 1,
          }} />
        ))}
      </div>

      {/* Answer line — either an empty line or the answer */}
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <span style={{
          fontFamily: "var(--font-display), sans-serif",
          fontSize: 13, fontWeight: 700, color: ink,
        }}>
          Answer:
        </span>
        {showAnswer ? (
          <span style={{
            fontFamily: "var(--font-mono), 'Courier New', monospace",
            fontSize: 18, fontWeight: 700, color: ink,
            background: soft, padding: "2px 12px", borderRadius: 8,
          }}>
            {problem.answer}
          </span>
        ) : (
          <div style={{
            flex: 1, height: 22,
            borderBottom: `2px solid ${ink}`,
          }} />
        )}
      </div>
    </div>
  );
}

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

export function WordProblemsProblemPage({
  pageNumber, problems, accent, showAnswer, stageFullId,
}: {
  pageNumber: 1 | 2 | 3 | 4;
  problems: WordProblem[];
  accent: AccentKey;
  showAnswer: boolean;
  stageFullId: string;
}) {
  const startIndex = (pageNumber - 1) * problems.length + 1;
  return (
    <div style={{ padding: "16px 22px 12px", display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
      <PageBanner
        accent={accent}
        label={`Stage ${stageFullId} · Word Problems · Page ${pageNumber}${showAnswer ? " · Answers" : ""}`}
        hint={showAnswer
          ? "Highlighted numbers are the correct answers."
          : "Read carefully, show your working, then write your answer."}
      />
      <div style={{
        flex: 1, display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "repeat(2, 1fr)",
        gap: 12, minHeight: 0,
      }}>
        {problems.map((p, i) => (
          <WordProblemCell
            key={i}
            index={startIndex + i}
            problem={p}
            accent={accent}
            showAnswer={showAnswer}
          />
        ))}
      </div>
    </div>
  );
}

// Re-export for routes that need the InlineProblem type without importing
// from the inline module.
export type { InlineProblem };

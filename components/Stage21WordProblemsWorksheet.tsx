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

// 24 integer context templates — bulk-quantity, distance, time and group
// contexts that scale across all Stage 2/3/4 integer ranges. NZ-flavoured.
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

// 24 integer addition templates — "has X, gets/adds Y more" pattern.
const ADDITION_TEMPLATES: Array<(a: number, b: number) => string> = [
  (a, b) => `Liam has ${a} marbles. He gets ${b} more. How many marbles altogether?`,
  (a, b) => `Ella reads ${a} pages on Monday and ${b} pages on Tuesday. How many pages in total?`,
  (a, b) => `A box has ${a} crayons. Another box has ${b} crayons. How many crayons in total?`,
  (a, b) => `Aroha picks ${a} shells in the morning and ${b} shells in the afternoon. How many shells altogether?`,
  (a, b) => `A bus has ${a} students. ${b} more students get on. How many students are on the bus now?`,
  (a, b) => `A library has ${a} books. ${b} more books are donated. How many books in total?`,
  (a, b) => `Mia swam ${a} metres yesterday and ${b} metres today. How many metres altogether?`,
  (a, b) => `Olivia practises piano for ${a} minutes in the morning and ${b} minutes after school. How many minutes in total?`,
  (a, b) => `Noah has ${a} stickers. His friend gives him ${b} more. How many does he have now?`,
  (a, b) => `A garden has ${a} red flowers and ${b} yellow flowers. How many flowers altogether?`,
  (a, b) => `A jar has ${a} jellybeans. The shopkeeper adds ${b} more. How many jellybeans in total?`,
  (a, b) => `An orchard has ${a} apple trees and ${b} pear trees. How many trees altogether?`,
  (a, b) => `Lucas walked ${a} steps in the park and ${b} steps on the way home. How many steps in total?`,
  (a, b) => `Tane baked ${a} biscuits in one batch and ${b} in another. How many biscuits altogether?`,
  (a, b) => `Kiri gave ${a} stickers to her best friend and ${b} to her sister. How many stickers did she give in total?`,
  (a, b) => `A beehive has ${a} bees in the morning. ${b} more bees return by evening. How many bees are in the hive?`,
  (a, b) => `A netball tournament has ${a} players on day 1 and ${b} more arrive on day 2. How many players in total?`,
  (a, b) => `A hall has ${a} chairs set out. ${b} more chairs are added. How many chairs in total?`,
  (a, b) => `Sione plants ${a} seedlings before lunch and ${b} after lunch. How many seedlings altogether?`,
  (a, b) => `A pavlova recipe uses ${a} eggs. Another recipe uses ${b} eggs. How many eggs are needed for both?`,
  (a, b) => `Ava ran ${a} laps yesterday and ${b} laps today. How many laps altogether?`,
  (a, b) => `A school van has ${a} bags. ${b} more bags are loaded on. How many bags in total?`,
  (a, b) => `A kiwifruit orchard has ${a} ripe fruit. ${b} more ripen overnight. How many ripe kiwifruit?`,
  (a, b) => `A pack has ${a} cards. Liam adds ${b} more cards from another pack. How many cards in total?`,
];

// 24 decimal addition templates — money / measurement / time contexts.
const DECIMAL_ADDITION_TEMPLATES: Array<(a: string, b: string) => string> = [
  (a, b) => `Liam has $${a}. He earns another $${b}. How much money does he have now?`,
  (a, b) => `A book costs $${a} and a pen costs $${b}. How much for both?`,
  (a, b) => `Kiri saves $${a} in week 1 and $${b} in week 2. How much has she saved altogether?`,
  (a, b) => `Noah pays $${a} for lunch and $${b} for a drink. How much did he spend in total?`,
  (a, b) => `Aroha walks ${a} km in the morning and ${b} km after school. How many km in total?`,
  (a, b) => `Mia ran ${a} km yesterday and ${b} km today. How many km altogether?`,
  (a, b) => `A piece of ribbon is ${a} m long. A second piece is ${b} m. How long when joined?`,
  (a, b) => `Tane has a plank ${a} m long. He joins it to another plank ${b} m long. How long is it now?`,
  (a, b) => `Lucas walks ${a} km in the morning and ${b} km in the evening. How many km in total?`,
  (a, b) => `An apple weighs ${a} kg and a banana weighs ${b} kg. What is the total weight?`,
  (a, b) => `A bag of rice weighs ${a} kg. A bag of flour weighs ${b} kg. Total weight?`,
  (a, b) => `Olivia carries a backpack weighing ${a} kg and a lunchbox weighing ${b} kg. Total weight?`,
  (a, b) => `A jug has ${a} L of water. Ella pours in another ${b} L. How many litres in the jug now?`,
  (a, b) => `A bottle has ${a} L of juice. Sione adds ${b} L more. How many litres in total?`,
  (a, b) => `A cup holds ${a} L. A second cup holds ${b} L. How many litres altogether?`,
  (a, b) => `A water tank has ${a} L. ${b} L more is added. How many litres now?`,
  (a, b) => `A garden bed is ${a} m long. Another bed is ${b} m long. Total length?`,
  (a, b) => `Ava jumps ${a} m on her first attempt and ${b} m on her second. Combined distance?`,
  (a, b) => `A tape measure shows ${a} m. Then ${b} m more is measured. Total length?`,
  (a, b) => `A bakery uses ${a} kg of flour on Monday and ${b} kg on Tuesday. How many kg total?`,
  (a, b) => `Noah's relay race split: he ran ${a} km then ${b} km. How far did he run in total?`,
  (a, b) => `A delivery truck travels ${a} km then ${b} km more. How many km altogether?`,
  (a, b) => `A swimmer covers ${a} km in the morning session and ${b} km in the afternoon. Total?`,
  (a, b) => `A chocolate bar weighs ${a} g. A muesli bar weighs ${b} g. Total weight in grams?`,
];

// 24 decimal multiplication templates — money, measurement, area, rate contexts.
const DECIMAL_TEMPLATES: Array<(a: string, b: string) => string> = [
  (a, b) => `Each apple costs $${a}. Liam buys ${b} apples. How much altogether?`,
  (a, b) => `Each pencil costs $${a}. Noah buys ${b} pencils. How much altogether?`,
  (a, b) => `Each sticker costs $${a}. Kiri buys ${b} stickers. How much does she pay?`,
  (a, b) => `Each book costs $${a}. ${b} books cost how much?`,
  (a, b) => `Each board game costs $${a}. The school buys ${b} games. How much altogether?`,
  (a, b) => `Each ribbon is ${a} m long. Aroha ties ${b} ribbons together. How long altogether?`,
  (a, b) => `Each plank is ${a} m long. Tane uses ${b} planks. What is the total length?`,
  (a, b) => `Each piece of string is ${a} m. Ava cuts ${b} pieces. How long altogether?`,
  (a, b) => `Each ball of yarn is ${a} m long. The knitter uses ${b} balls. How many m in total?`,
  (a, b) => `Each apple weighs ${a} kg. There are ${b} apples. What is the total weight?`,
  (a, b) => `Each bag of rice weighs ${a} kg. The shop sells ${b} bags. How many kg in total?`,
  (a, b) => `Each chocolate bar weighs ${a} g. The shop has ${b} bars. How many grams in total?`,
  (a, b) => `A bottle holds ${a} L of juice. There are ${b} bottles. How many litres in total?`,
  (a, b) => `Each cup holds ${a} ml. There are ${b} cups. How many ml altogether?`,
  (a, b) => `A jug holds ${a} L of milk. ${b} jugs hold how many litres altogether?`,
  (a, b) => `A water bottle holds ${a} L. Ella fills ${b} bottles. How many litres in total?`,
  (a, b) => `Mia runs ${a} km each day for ${b} days. How many km has she run?`,
  (a, b) => `Olivia walks ${a} km each morning for ${b} days. How many km in total?`,
  (a, b) => `Sione runs ${a} km in each lap. He runs ${b} laps. How many km in total?`,
  (a, b) => `A rectangle is ${a} m long and ${b} m wide. What is the area (in m²)?`,
  (a, b) => `A garden bed is ${a} m by ${b} m. What is its area in m²?`,
  (a, b) => `A tap pours ${a} L per minute. After ${b} minutes, how many litres have come out?`,
  (a, b) => `A printer uses ${a} ml of ink per page. After ${b} pages, how much ink is used?`,
  (a, b) => `Each cake needs ${a} cups of flour. The bakery makes ${b} cakes. How much flour altogether?`,
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
  answer: number | string;
};

// 24 word problems per version. (a,b) pairs come from the supplied pool.
// When any problem has a display string with ".", we treat the whole batch
// as decimal and use the decimal templates / displays instead.
export function buildWordProblems(
  pool: InlineProblem[],
  version: WorksheetVersion,
): WordProblem[] {
  const seeds = WORD_SEEDS[version];
  const TOTAL = 24;
  const shuffled = seededShuffle(pool, seeds.problems);
  const pairs: InlineProblem[] = [];
  for (let i = 0; i < TOTAL; i++) {
    pairs.push(shuffled[i % shuffled.length]);
  }
  const isAddition = pairs[0]?.op === "+";
  const isDecimal = pairs.some((p) =>
    (p.aDisplay && p.aDisplay.includes(".")) ||
    (p.bDisplay && p.bDisplay.includes(".")) ||
    (p.answerDisplay && p.answerDisplay.includes("."))
  );

  // Pick the right template bank
  const stringTemplates =
    isAddition && isDecimal ? DECIMAL_ADDITION_TEMPLATES :
    !isAddition && isDecimal ? DECIMAL_TEMPLATES :
    null;
  const numberTemplates =
    isAddition && !isDecimal ? ADDITION_TEMPLATES :
    !isAddition && !isDecimal ? TEMPLATES :
    null;

  const templateLen = stringTemplates?.length ?? numberTemplates?.length ?? 0;
  const templateOrder = seededShuffle(
    Array.from({ length: templateLen }, (_, i) => i),
    seeds.templates,
  );

  return pairs.map((p, i) => {
    const idx = templateOrder[i % templateOrder.length];
    if (stringTemplates) {
      const aStr = p.aDisplay ?? String(p.a);
      const bStr = p.bDisplay ?? String(p.b);
      const ansStr = p.answerDisplay ?? String(isAddition ? p.a + p.b : p.a * p.b);
      return { prompt: stringTemplates[idx](aStr, bStr), answer: ansStr };
    }
    const template = numberTemplates![idx];
    return { prompt: template(p.a, p.b), answer: isAddition ? p.a + p.b : p.a * p.b };
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

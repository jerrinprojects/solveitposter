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
  (a, b) => `Each pack of stickers has ${a}. A shop stocks ${b} packs. How many stickers altogether?`,
  (a, b) => `A box of crayons has ${a}. The teacher hands out ${b} boxes. How many crayons in total?`,
  (a, b) => `Each box of trading cards has ${a} cards. A shop receives ${b} boxes. How many cards in total?`,
  (a, b) => `A tray holds ${a} cupcakes. A bakery uses ${b} trays. How many cupcakes did they bake?`,
  (a, b) => `Each shelf holds ${a} books. There are ${b} shelves. How many books fit altogether?`,
  (a, b) => `A jar holds ${a} jellybeans. The shop has ${b} jars. How many jellybeans in total?`,
  (a, b) => `Ella reads ${a} pages each day for ${b} days. How many pages does she read in total?`,
  (a, b) => `Olivia practises piano for ${a} minutes each day for ${b} days. How many minutes altogether?`,
  (a, b) => `Lucas walks ${a} metres each minute for ${b} minutes. How many metres in total?`,
  (a, b) => `Ava runs ${a} metres in each lap. She runs ${b} laps. How many metres altogether?`,
  (a, b) => `Mia swims ${a} metres each day for ${b} days. How many metres has she swum?`,
  (a, b) => `Each crate carries ${a} bottles. A delivery van loads ${b} crates. How many bottles in total?`,
  (a, b) => `A choir has ${a} singers. ${b} choirs come to a festival. How many singers altogether?`,
  (a, b) => `Each notebook has ${a} pages. A school orders ${b} notebooks. How many pages in total?`,
  (a, b) => `A garden row has ${a} flowers. There are ${b} rows. How many flowers in the garden?`,
  (a, b) => `Each branch of an apple tree has ${a} apples. The tree has ${b} branches. How many apples in total?`,
  (a, b) => `Aroha collects ${a} shells each weekend for ${b} weekends. How many shells altogether?`,
  (a, b) => `Tane bakes ${a} biscuits in each batch. He makes ${b} batches. How many biscuits altogether?`,
  (a, b) => `Each crate holds ${a} eggs. The shop has ${b} crates. How many eggs altogether?`,
  (a, b) => `Each row of seats has ${a} chairs. The hall has ${b} rows. How many seats altogether?`,
  (a, b) => `Kiri sticks ${a} stickers onto each page of her album. The album has ${b} pages. How many stickers in total?`,
  (a, b) => `Each ant trail has ${a} ants. There are ${b} trails to the nest. How many ants altogether?`,
  (a, b) => `Sione plants ${a} seedlings in each row. He plants ${b} rows. How many seedlings in total?`,
];

// Pluralize a noun based on count (English regular plurals). Use for any
// template where a number is followed by a count-noun, so "1 crayon" /
// "2 crayons" both read correctly.
const pl = (n: number, sg: string, plural?: string) =>
  n === 1 ? sg : (plural ?? `${sg}s`);

// 24 integer addition templates — "has X, gets/adds Y more" pattern.
const ADDITION_TEMPLATES: Array<(a: number, b: number) => string> = [
  (a, b) => `Liam has ${a} marbles. He gets ${b} more. How many marbles altogether?`,
  (a, b) => `Ella reads ${a} pages on Monday and ${b} ${pl(b, "page")} on Tuesday. How many pages in total?`,
  (a, b) => `A box has ${a} crayons. Another box has ${b} ${pl(b, "crayon")}. How many crayons in total?`,
  (a, b) => `Aroha picks ${a} shells in the morning and ${b} ${pl(b, "shell")} in the afternoon. How many shells altogether?`,
  (a, b) => `A bus has ${a} students. ${b} more ${pl(b, "student gets", "students get")} on. How many students are on the bus now?`,
  (a, b) => `A library has ${a} books. ${b} more ${pl(b, "book is", "books are")} donated. How many books in total?`,
  (a, b) => `Mia swam ${a} metres yesterday and ${b} ${pl(b, "metre")} today. How many metres altogether?`,
  (a, b) => `Olivia practises piano for ${a} minutes in the morning and ${b} ${pl(b, "minute")} after school. How many minutes in total?`,
  (a, b) => `Noah has ${a} stickers. His friend gives him ${b} more. How many does he have now?`,
  (a, b) => `A garden has ${a} red flowers and ${b} yellow ${pl(b, "flower")}. How many flowers altogether?`,
  (a, b) => `A jar has ${a} jellybeans. The shopkeeper adds ${b} more. How many jellybeans in total?`,
  (a, b) => `An orchard has ${a} apple trees and ${b} pear ${pl(b, "tree")}. How many trees altogether?`,
  (a, b) => `Lucas walked ${a} steps in the park and ${b} ${pl(b, "step")} on the way home. How many steps in total?`,
  (a, b) => `Tane baked ${a} biscuits in one batch and ${b} in another. How many biscuits altogether?`,
  (a, b) => `Kiri gave ${a} stickers to her best friend and ${b} to her sister. How many stickers did she give in total?`,
  (a, b) => `A beehive has ${a} bees in the morning. ${b} more ${pl(b, "bee returns", "bees return")} by evening. How many bees are in the hive?`,
  (a, b) => `A netball tournament has ${a} players on day 1 and ${b} more arrive on day 2. How many players in total?`,
  (a, b) => `A hall has ${a} chairs set out. ${b} more ${pl(b, "chair is", "chairs are")} added. How many chairs in total?`,
  (a, b) => `Sione plants ${a} seedlings before lunch and ${b} after lunch. How many seedlings altogether?`,
  (a, b) => `A pavlova recipe uses ${a} eggs. Another recipe uses ${b} ${pl(b, "egg")}. How many eggs are needed for both?`,
  (a, b) => `Ava ran ${a} laps yesterday and ${b} ${pl(b, "lap")} today. How many laps altogether?`,
  (a, b) => `A school van has ${a} bags. ${b} more ${pl(b, "bag is", "bags are")} loaded on. How many bags in total?`,
  (a, b) => `A kiwifruit orchard has ${a} ripe fruit. ${b} more ripen overnight. How many ripe kiwifruit?`,
  (a, b) => `A pack has ${a} cards. Liam adds ${b} more ${pl(b, "card")} from another pack. How many cards in total?`,
];

// 24 integer division templates — "share X into Y groups" / "X ÷ Y per group".
// All names rotate (Liam, Noah, Ella, Olivia, Lucas, Ava, Mia, Aroha, Tane,
// Kiri, Sione). Contexts cover sharing, grouping, per-unit and rate.
const DIVISION_TEMPLATES: Array<(a: number, b: number) => string> = [
  (a, b) => `Liam has ${a} marbles. He shares them equally among ${b} friends. How many does each friend get?`,
  (a, b) => `A teacher has ${a} stickers to share equally among ${b} students. How many does each student get?`,
  (a, b) => `A bakery makes ${a} biscuits and packs them into bags of ${b}. How many bags?`,
  (a, b) => `An orchard has ${a} apples. The pickers fill boxes of ${b}. How many boxes can they fill?`,
  (a, b) => `${a} students are split evenly into ${b} groups for a project. How many in each group?`,
  (a, b) => `A library has ${a} books to put on shelves with ${b} books each. How many shelves are needed?`,
  (a, b) => `Aroha has ${a} shells and ties them into bracelets of ${b}. How many bracelets can she make?`,
  (a, b) => `A box of crayons holds ${a} crayons. The teacher splits them between ${b} tables equally. How many per table?`,
  (a, b) => `${a} eggs are packed into cartons of ${b}. How many full cartons?`,
  (a, b) => `Mia has ${a} metres of rope. She cuts it into pieces of ${b} m. How many pieces?`,
  (a, b) => `A school has ${a} chairs to set up in rows of ${b}. How many rows?`,
  (a, b) => `Tane bakes ${a} biscuits over ${b} batches of equal size. How many biscuits per batch?`,
  (a, b) => `${a} students go to camp on ${b} buses (equal numbers). How many students per bus?`,
  (a, b) => `Olivia practises piano for ${a} minutes over ${b} days. How many minutes per day on average?`,
  (a, b) => `A garden has ${a} flowers planted equally in ${b} rows. How many flowers per row?`,
  (a, b) => `Ava ran ${a} laps across ${b} training sessions of equal length. How many laps per session?`,
  (a, b) => `A tournament has ${a} players split into teams of ${b}. How many teams?`,
  (a, b) => `Ella has ${a} pages to read across ${b} days. How many pages per day if she reads equally?`,
  (a, b) => `Noah has ${a} cards and puts them in piles of ${b}. How many piles?`,
  (a, b) => `${a} cupcakes are shared equally among ${b} children. How many each?`,
  (a, b) => `An orchard has ${a} kiwifruit. They go into trays of ${b}. How many trays?`,
  (a, b) => `Lucas runs ${a} metres in ${b} laps of the field. How long is each lap (in metres)?`,
  (a, b) => `A beekeeper has ${a} bees evenly across ${b} hives. How many bees per hive?`,
  (a, b) => `Sione plants ${a} seedlings in rows of ${b}. How many rows?`,
];

// 24 remainder-division templates — Stage 2.6 specific. Every context
// frames the answer as "how many full Y" (with leftover ignored) or
// "how many in each, how many left over". This way "Q R r" answer reads
// naturally — e.g. "16 biscuits, bags of 6 → 2 bags (4 left over)".
const REMAINDER_DIVISION_TEMPLATES: Array<(a: number, b: number) => string> = [
  (a, b) => `Liam shares ${a} marbles among ${b} friends as evenly as he can. How many does each friend get and how many are left over?`,
  (a, b) => `A teacher has ${a} stickers to share among ${b} students. How many does each student get and how many are left?`,
  (a, b) => `A bakery makes ${a} biscuits and packs them into bags of ${b}. How many full bags and how many left over?`,
  (a, b) => `An orchard has ${a} apples. The pickers fill boxes of ${b}. How many full boxes and how many apples left?`,
  (a, b) => `${a} students are split into ${b} groups as evenly as possible. How many in each group and how many extra?`,
  (a, b) => `A library has ${a} books to put on shelves of ${b} books each. How many full shelves and how many left?`,
  (a, b) => `Aroha has ${a} shells and ties them into bracelets of ${b}. How many bracelets and how many shells left?`,
  (a, b) => `A teacher has ${a} crayons to split between ${b} tables as evenly as possible. How many per table and how many left over?`,
  (a, b) => `${a} eggs are packed into cartons of ${b}. How many full cartons and how many eggs left?`,
  (a, b) => `Mia has ${a} metres of rope. She cuts it into pieces of ${b} m. How many pieces and how many metres left?`,
  (a, b) => `A school has ${a} chairs to set up in rows of ${b}. How many full rows and how many chairs left?`,
  (a, b) => `Tane has ${a} biscuits to share among ${b} families. How many does each family get and how many are left?`,
  (a, b) => `${a} students go to camp on ${b} buses, as evenly as possible. How many per bus and how many extra?`,
  (a, b) => `Olivia has ${a} minutes of homework over ${b} days. How many minutes a day and how many minutes left?`,
  (a, b) => `A garden has ${a} flowers to plant in rows of ${b}. How many full rows and how many flowers left?`,
  (a, b) => `Ava swims ${a} lengths over ${b} sessions, as even as she can. How many per session and how many extra?`,
  (a, b) => `A tournament has ${a} players to split into teams of ${b}. How many teams and how many players left over?`,
  (a, b) => `Ella has ${a} pages to read over ${b} days. How many pages a day and how many pages left?`,
  (a, b) => `Noah has ${a} cards to put into piles of ${b}. How many full piles and how many cards left?`,
  (a, b) => `${a} cupcakes are shared among ${b} children. How many each and how many cupcakes left?`,
  (a, b) => `An orchard has ${a} kiwifruit. They go into trays of ${b}. How many full trays and how many kiwifruit left?`,
  (a, b) => `Lucas has ${a} metres of fencing to lay in sections of ${b} m. How many full sections and how many metres left?`,
  (a, b) => `A beekeeper has ${a} bees to split across ${b} hives, as evenly as possible. How many per hive and how many left?`,
  (a, b) => `Sione has ${a} seedlings to plant in rows of ${b}. How many full rows and how many seedlings left?`,
];

// 24 decimal division templates — for Stage 5 where divisor can be either a
// whole or a decimal. All templates treat B as a measurement / per-unit
// quantity (kg, m, L, ml, $ per item) so they still make sense whether B is
// 10 (Stage 5.1) or 0.05 (Stage 5.6). Names rotate the full NZ roster.
const DECIMAL_DIVISION_TEMPLATES: Array<(a: string, b: string) => string> = [
  // ── "Cut into Y-size pieces / pour into Y-size cups" — works at any B ──
  (a, b) => `Liam has ${a} m of ribbon. He cuts pieces of ${b} m. How many pieces?`,
  (a, b) => `A plank is ${a} m long. Sione cuts it into ${b} m sections. How many sections?`,
  (a, b) => `A garden bed is ${a} m long. Lucas divides it into ${b} m sections. How many sections?`,
  (a, b) => `Mia's jug holds ${a} L. She pours into cups of ${b} L each. How many cups?`,
  (a, b) => `A water tank has ${a} L. Empty into buckets of ${b} L. How many bucketfuls?`,
  (a, b) => `A bottle holds ${a} L of juice. Pour ${b} L into each cup. How many cups?`,
  (a, b) => `Aroha has ${a} m of string. She cuts it into ${b} m pieces. How many pieces?`,
  // ── Weight per unit (works at any B kg/g per item) ──
  (a, b) => `A bag of flour weighs ${a} kg. Each loaf uses ${b} kg. How many loaves can be made?`,
  (a, b) => `Tane has ${a} kg of flour. Each cake uses ${b} kg. How many cakes can he make?`,
  (a, b) => `A piece of cheese weighs ${a} kg. Cut into ${b} kg blocks. How many blocks?`,
  (a, b) => `${a} kg of rice are packed into bags of ${b} kg. How many bags?`,
  (a, b) => `Ava has ${a} kg of apples to pack into bags of ${b} kg each. How many bags?`,
  // ── Rate × time / total ÷ rate (B is a rate) ──
  (a, b) => `Aroha walks ${a} km in total at ${b} km per hour. How many hours did she walk?`,
  (a, b) => `Kiri walks ${a} km in ${b} hours at a steady pace. How many km per hour?`,
  (a, b) => `A tap leaks ${a} L in ${b} hours, steady rate. How many L per hour?`,
  (a, b) => `Lucas read ${a} pages at ${b} pages per minute. How many minutes?`,
  (a, b) => `A car uses ${a} L of fuel travelling ${b} km. How many L per km?`,
  (a, b) => `A delivery truck travels ${a} km at ${b} km per hour. How many hours of driving?`,
  // ── Money per unit ──
  (a, b) => `Ella spent $${a} on stickers that cost $${b} each. How many stickers?`,
  (a, b) => `Noah pays $${a} for biscuits at $${b} each. How many biscuits did he buy?`,
  (a, b) => `Kiri bought a roll of fabric for $${a}. Each metre costs $${b}. How many metres?`,
  // ── Paint / portion-per-unit ──
  (a, b) => `A jug of paint holds ${a} L. Each wall needs ${b} L. How many walls can be painted?`,
  (a, b) => `Olivia has ${a} ml of medicine. Each dose is ${b} ml. How many doses?`,
  (a, b) => `A roll of tape is ${a} m. Each package needs ${b} m. How many packages?`,
];

// 24 integer subtraction templates — "has X, gives away/loses Y → result".
const SUBTRACTION_TEMPLATES: Array<(a: number, b: number) => string> = [
  (a, b) => `Liam has ${a} marbles. He gives ${b} to a friend. How many marbles does he have left?`,
  (a, b) => `Ella has ${a} pages to read. She reads ${b} of them. How many pages are left?`,
  (a, b) => `A box has ${a} crayons. ${b} ${pl(b, "crayon goes", "crayons go")} missing. How many crayons are left?`,
  (a, b) => `Aroha collected ${a} shells. She gives ${b} to her cousin. How many shells does she have now?`,
  (a, b) => `A bus has ${a} students. ${b} ${pl(b, "gets", "get")} off at the school. How many students are still on the bus?`,
  (a, b) => `A library has ${a} books. ${b} ${pl(b, "book is", "books are")} borrowed. How many books are left in the library?`,
  (a, b) => `Mia has ${a} metres of ribbon. She uses ${b} ${pl(b, "metre")} for a craft. How many metres are left?`,
  (a, b) => `Olivia has ${a} stickers. She gives away ${b}. How many stickers does she have left?`,
  (a, b) => `Noah baked ${a} biscuits. His family eats ${b}. How many biscuits are left?`,
  (a, b) => `A garden has ${a} flowers. ${b} ${pl(b, "flower is", "flowers are")} picked for a bouquet. How many flowers remain?`,
  (a, b) => `A jar has ${a} jellybeans. ${b} ${pl(b, "jellybean is", "jellybeans are")} eaten. How many jellybeans are left?`,
  (a, b) => `An orchard has ${a} kiwifruit. ${b} kiwifruit ${pl(b, "is", "are")} picked. How many kiwifruit remain?`,
  (a, b) => `Lucas walked ${a} steps forward, then ${b} ${pl(b, "step")} back. How many steps forward is he now?`,
  (a, b) => `Tane had ${a} biscuits. He gave ${b} to his class. How many does he have left?`,
  (a, b) => `Kiri had ${a} stickers. She used ${b} on her project. How many are left?`,
  (a, b) => `A beehive had ${a} bees. ${b} flew out. How many bees are still in the hive?`,
  (a, b) => `A tournament had ${a} players. ${b} left after the first round. How many players are still in?`,
  (a, b) => `A hall has ${a} chairs. ${b} ${pl(b, "chair is", "chairs are")} taken outside. How many chairs are left in the hall?`,
  (a, b) => `Sione had ${a} seedlings. He planted ${b}. How many seedlings does he still have?`,
  (a, b) => `A bakery had ${a} eggs. They used ${b} for pavlovas. How many eggs are left?`,
  (a, b) => `Ava ran ${a} minutes in total. ${b} ${pl(b, "minute was", "minutes were")} warm-up. How many minutes were the main run?`,
  (a, b) => `A school van had ${a} bags. ${b} ${pl(b, "bag is", "bags are")} unloaded. How many bags are still on the van?`,
  (a, b) => `A box has ${a} marbles. ${b} ${pl(b, "marble is", "marbles are")} taken out. How many marbles are still in the box?`,
  (a, b) => `A pack has ${a} cards. Liam removes ${b}. How many cards are left in the pack?`,
];

// 24 decimal subtraction templates — money / measurement contexts.
const DECIMAL_SUBTRACTION_TEMPLATES: Array<(a: string, b: string) => string> = [
  (a, b) => `Liam has $${a}. He spends $${b}. How much money does he have left?`,
  (a, b) => `A book costs $${a}. Kiri gets a $${b} discount. How much does she pay?`,
  (a, b) => `Aroha has ${a} m of ribbon. She uses ${b} m for a present. How many metres are left?`,
  (a, b) => `Tane has ${a} kg of flour. He uses ${b} kg for baking. How many kg are left?`,
  (a, b) => `A bottle has ${a} L of juice. Ella drinks ${b} L. How many litres are left?`,
  (a, b) => `Mia ran ${a} km in total, with ${b} km as warm-up. How long was the main run?`,
  (a, b) => `A water tank holds ${a} L. ${b} L are drained. How many litres remain?`,
  (a, b) => `Noah weighed ${a} kg. He lost ${b} kg over a month. What's his weight now?`,
  (a, b) => `A piece of wood is ${a} m long. Lucas cuts off ${b} m. How long is the remaining piece?`,
  (a, b) => `Olivia had $${a} in savings. She spent $${b} on a gift. How much is left?`,
  (a, b) => `A rope is ${a} m. Sione cuts ${b} m off. How long is the remaining rope?`,
  (a, b) => `Ava ran ${a} km in total. ${b} km were uphill. How many km were not uphill?`,
  (a, b) => `A jug had ${a} L of milk. The chef poured out ${b} L. How many litres are left?`,
  (a, b) => `Liam had $${a}. He gave $${b} to his sister. How much does he have now?`,
  (a, b) => `A bag of sand weighs ${a} kg. ${b} kg are removed. How much is left?`,
  (a, b) => `A bottle has ${a} L of water. ${b} L spill out. How much water remains?`,
  (a, b) => `Mia had ${a} kg of fruit. She used ${b} kg to make jam. How much is left?`,
  (a, b) => `A delivery van carried ${a} kg of cargo. ${b} kg were delivered. How much remains?`,
  (a, b) => `Noah's bottle had ${a} ml. He drank ${b} ml. How many ml are left?`,
  (a, b) => `A garden hose is ${a} m long. ${b} m are coiled up. How many m are stretched out?`,
  (a, b) => `Ella saved $${a}. She spent $${b} on art supplies. How much is left?`,
  (a, b) => `A reservoir has ${a} L. ${b} L are used. How many litres remain?`,
  (a, b) => `A board game has ${a} chips. ${b} are lost. How many chips are left?`,
  (a, b) => `Tane's wood pile weighed ${a} kg. He burned ${b} kg. What's left?`,
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
// B IS A COUNT OF OBJECTS in most of these, so this bank is only safe when the
// second value is a whole number ("buys 0.3 pencils" is nonsense). See
// pickDecimalMulTemplate for the whole/decimal routing.
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

// 24 templates for when BOTH values are decimals (Stage 5.4 and up). No counts
// of objects here: every context is measurement × measurement, a per-unit rate
// times a measured amount, or an area.
const DECIMAL_MEASURE_TEMPLATES: Array<(a: string, b: string) => string> = [
  (a, b) => `A rectangle is ${a} m long and ${b} m wide. What is the area (in m²)?`,
  (a, b) => `A garden bed is ${a} m by ${b} m. What is its area in m²?`,
  (a, b) => `A room floor is ${a} m by ${b} m. What is the floor area in m²?`,
  (a, b) => `A rug measures ${a} m by ${b} m. What is its area in m²?`,
  (a, b) => `A path is ${a} m wide and ${b} m long. What area does it cover in m²?`,
  (a, b) => `A window pane is ${a} m by ${b} m. What is its area in m²?`,
  (a, b) => `Fabric costs $${a} per metre. Aroha buys ${b} m. How much does she pay?`,
  (a, b) => `Rope costs $${a} per metre. Tane buys ${b} m. What does it cost?`,
  (a, b) => `Cheese costs $${a} per kg. Mia buys ${b} kg. How much does she pay?`,
  (a, b) => `Juice costs $${a} per litre. Sione buys ${b} L. How much does he pay?`,
  (a, b) => `Sand costs $${a} per kg. The builder buys ${b} kg. What is the cost?`,
  (a, b) => `Ribbon costs $${a} per metre. Ella buys ${b} m. How much does she pay?`,
  (a, b) => `A tap pours ${a} L per minute. It runs for ${b} minutes. How many litres come out?`,
  (a, b) => `A hose fills ${a} L each second. It runs for ${b} seconds. How many litres?`,
  (a, b) => `A car uses ${a} L of petrol per km. It travels ${b} km. How much petrol is used?`,
  (a, b) => `A machine prints ${a} m of paper per minute. In ${b} minutes, how many metres?`,
  (a, b) => `Paint covers a wall using ${a} L per m². The wall is ${b} m². How many litres of paint?`,
  (a, b) => `A printer uses ${a} ml of ink per metre of banner. It prints ${b} m. How much ink?`,
  (a, b) => `Sand weighs ${a} kg per litre. There are ${b} L of sand. What is its mass in kg?`,
  (a, b) => `Soil weighs ${a} kg per litre. A pot holds ${b} L. What is the mass of the soil?`,
  (a, b) => `Mia walks ${a} km every hour. She walks for ${b} hours. How far does she walk?`,
  (a, b) => `Noah swims ${a} km each hour. He swims for ${b} hours. How many km?`,
  (a, b) => `A tank drains ${a} L per hour for ${b} hours. How many litres drain out?`,
  (a, b) => `Wire weighs ${a} g per metre. Kiri cuts ${b} m. What is its mass in grams?`,
];

// 24 templates for a WHOLE count of objects where the per-object amount is a
// small decimal (Stage 5.1: 47 × 0.001). Measurement units only — a price of
// $0.001 each would not be believable.
const DECIMAL_SMALL_UNIT_TEMPLATES: Array<(a: string, b: string) => string> = [
  (a, b) => `Each bead weighs ${a} g. There are ${b} beads. What is the total mass in g?`,
  (a, b) => `Each seed weighs ${a} g. There are ${b} seeds. What is the total mass in g?`,
  (a, b) => `Each paper clip weighs ${a} g. A box holds ${b} clips. Total mass in g?`,
  (a, b) => `Each grain of rice weighs ${a} g. There are ${b} grains. Total mass in g?`,
  (a, b) => `Each button weighs ${a} g. Aroha has ${b} buttons. What do they weigh in total?`,
  (a, b) => `Each drop holds ${a} ml. There are ${b} drops. How many ml altogether?`,
  (a, b) => `Each spoonful holds ${a} ml. Mia uses ${b} spoonfuls. How many ml in total?`,
  (a, b) => `Each syringe holds ${a} ml. The nurse fills ${b} syringes. How many ml?`,
  (a, b) => `Each sheet of paper is ${a} mm thick. ${b} sheets are stacked. How thick is the stack?`,
  (a, b) => `Each card is ${a} mm thick. A pile has ${b} cards. How tall is the pile in mm?`,
  (a, b) => `Each coin is ${a} mm thick. ${b} coins are stacked. How tall is the stack in mm?`,
  (a, b) => `Each tile is ${a} m wide. ${b} tiles are placed in a row. How wide is the row?`,
  (a, b) => `Each strip of tape is ${a} m long. Ava uses ${b} strips. How much tape in total?`,
  (a, b) => `Each wire is ${a} m long. Tane joins ${b} wires. How long is the joined wire?`,
  (a, b) => `Each straw is ${a} m long. Lucas lines up ${b} straws. What is the total length?`,
  (a, b) => `Each step is ${a} m long. Olivia takes ${b} steps. How far does she walk?`,
  (a, b) => `Each cube holds ${a} L. There are ${b} cubes. How many litres in total?`,
  (a, b) => `Each small bottle holds ${a} L. There are ${b} bottles. How many litres in total?`,
  (a, b) => `Each sachet holds ${a} kg of sugar. A box has ${b} sachets. Total mass in kg?`,
  (a, b) => `Each teabag holds ${a} g of tea. A packet has ${b} teabags. Total mass in g?`,
  (a, b) => `Each nail weighs ${a} kg. A builder uses ${b} nails. What is the total mass?`,
  (a, b) => `Each marble weighs ${a} kg. There are ${b} marbles. What is the total mass?`,
  (a, b) => `Each thread is ${a} m long. The weaver uses ${b} threads. How many m in total?`,
  (a, b) => `Each drip is ${a} L. A tap drips ${b} times. How many litres are lost?`,
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
  const op = pairs[0]?.op ?? "×";
  const isAddition = op === "+";
  const isSubtraction = op === "−";
  const isDivision = op === "÷";
  const isMul = !isAddition && !isSubtraction && !isDivision;
  const isDecimal = pairs.some((p) =>
    (p.aDisplay && p.aDisplay.includes(".")) ||
    (p.bDisplay && p.bDisplay.includes(".")) ||
    (p.answerDisplay && p.answerDisplay.includes("."))
  );

  // Pick the right template bank. Decimal multiplication is routed per problem
  // (see below) because the right bank depends on which value is a whole number.
  const isMulDecimal = isMul && isDecimal;
  const stringTemplates =
    isAddition && isDecimal ? DECIMAL_ADDITION_TEMPLATES :
    isSubtraction && isDecimal ? DECIMAL_SUBTRACTION_TEMPLATES :
    isDivision && isDecimal ? DECIMAL_DIVISION_TEMPLATES :
    null;
  // If any problem has a remainder ("R" in answerDisplay), the whole batch
  // is from a remainder-stage pool — use the remainder-friendly templates
  // so the question framing matches a "Q R r" answer.
  const isRemainder = isDivision && pairs.some((p) =>
    p.answerDisplay && / R /.test(p.answerDisplay)
  );
  const numberTemplates =
    isAddition && !isDecimal ? ADDITION_TEMPLATES :
    isSubtraction && !isDecimal ? SUBTRACTION_TEMPLATES :
    isDivision && isRemainder ? REMAINDER_DIVISION_TEMPLATES :
    isDivision && !isDecimal ? DIVISION_TEMPLATES :
    isMul && !isDecimal ? TEMPLATES :
    null;

  // All three decimal-multiplication banks are the same length, so one shuffled
  // order serves whichever bank a problem lands in.
  const templateLen = isMulDecimal
    ? DECIMAL_TEMPLATES.length
    : stringTemplates?.length ?? numberTemplates?.length ?? 0;
  const templateOrder = seededShuffle(
    Array.from({ length: templateLen }, (_, i) => i),
    seeds.templates,
  );

  return pairs.map((p, i) => {
    const idx = templateOrder[i % templateOrder.length];
    const computeNum = (x: number, y: number) =>
      isAddition ? x + y :
      isSubtraction ? x - y :
      isDivision ? x / y :
      x * y;
    if (isMulDecimal) {
      const aStr = p.aDisplay ?? String(p.a);
      const bStr = p.bDisplay ?? String(p.b);
      const ansStr = p.answerDisplay ?? String(computeNum(p.a, p.b));
      const aDec = aStr.includes(".");
      const bDec = bStr.includes(".");
      // The count sits in the second slot, so it has to be a whole number.
      if (aDec && !bDec) {
        return { prompt: DECIMAL_TEMPLATES[idx](aStr, bStr), answer: ansStr };
      }
      // Whole × decimal: swap the pair (a × b = b × a) to keep the count whole.
      if (!aDec && bDec) {
        return { prompt: DECIMAL_SMALL_UNIT_TEMPLATES[idx](bStr, aStr), answer: ansStr };
      }
      // Both decimal: measurement, rate and area contexts only.
      return { prompt: DECIMAL_MEASURE_TEMPLATES[idx](aStr, bStr), answer: ansStr };
    }
    if (stringTemplates) {
      const aStr = p.aDisplay ?? String(p.a);
      const bStr = p.bDisplay ?? String(p.b);
      const ansStr = p.answerDisplay ?? String(computeNum(p.a, p.b));
      return { prompt: stringTemplates[idx](aStr, bStr), answer: ansStr };
    }
    const template = numberTemplates![idx];
    // Prefer the problem's pre-computed answerDisplay (e.g. "2 R 4" for
    // remainder problems) over the raw numeric a/b which would float.
    const answer = p.answerDisplay ?? computeNum(p.a, p.b);
    return { prompt: template(p.a, p.b), answer };
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

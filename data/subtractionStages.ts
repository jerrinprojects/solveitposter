// Subtraction stage pool generators — mirror solveit/src/pages/FourOperations/
// SubtractionLevel.jsx. Each problem carries op:"−" so the cells render the
// correct operator and compute a−b for the answer.

import type { InlineProblem } from "@/components/MultiplicationInlineWorksheet";
import type { MultiplicationStageSpec } from "@/data/multiplicationStages";

export type SubtractionStageSpec = MultiplicationStageSpec;

function s(a: number, b: number): InlineProblem {
  return { a, b, op: "−", answerDisplay: String(a - b) };
}

function ds(a: number, aDP: number, b: number, bDP: number): InlineProblem {
  const ansDP = Math.max(aDP, bDP);
  const scale = Math.pow(10, ansDP);
  const ansScaled = Math.round(a * scale) - Math.round(b * scale);
  return {
    a, b, op: "−",
    aDisplay: a.toFixed(aDP),
    bDisplay: b.toFixed(bDP),
    answerDisplay: (ansScaled / scale).toFixed(ansDP),
  };
}

// Helpers to read place value digits
const ones = (n: number) => n % 10;
const tens = (n: number) => Math.floor(n / 10) % 10;
const huns = (n: number) => Math.floor(n / 100) % 10;
const thou = (n: number) => Math.floor(n / 1000) % 10;

// ── Stage 1: single-digit / under 20 ─────────────────────────────────────

function sub11Pool(): InlineProblem[] {
  // 1.1: a 2–5, b 1–(a-1)
  const out: InlineProblem[] = [];
  for (let a = 2; a <= 5; a++) for (let b = 1; b < a; b++) out.push(s(a, b));
  return out;
}
function sub12Pool(): InlineProblem[] {
  // 1.2: a 6–9, b 1–(a-1)
  const out: InlineProblem[] = [];
  for (let a = 6; a <= 9; a++) for (let b = 1; b < a; b++) out.push(s(a, b));
  return out;
}
function sub13Pool(): InlineProblem[] {
  // 1.3: 10 − (1–9)
  const out: InlineProblem[] = [];
  for (let b = 1; b <= 9; b++) out.push(s(10, b));
  return out;
}
function sub14Pool(): InlineProblem[] {
  // 1.4: 11 or 12 − (3–9)
  const out: InlineProblem[] = [];
  for (const a of [11, 12]) for (let b = 3; b <= 9; b++) if (b < a) out.push(s(a, b));
  return out;
}
function sub15Pool(): InlineProblem[] {
  // 1.5: 13 or 14 − (5–9)
  const out: InlineProblem[] = [];
  for (const a of [13, 14]) for (let b = 5; b <= 9; b++) if (b < a) out.push(s(a, b));
  return out;
}
function sub16Pool(): InlineProblem[] {
  // 1.6: 15 or 16 − (7–9)
  const out: InlineProblem[] = [];
  for (const a of [15, 16]) for (let b = 7; b <= 9; b++) if (b < a) out.push(s(a, b));
  return out;
}
function sub17Pool(): InlineProblem[] {
  // 1.7: 17 or 18 − (8–9)
  const out: InlineProblem[] = [];
  for (const a of [17, 18]) for (let b = 8; b <= 9; b++) out.push(s(a, b));
  return out;
}
function sub18Pool(): InlineProblem[] {
  // 1.8: 19 − (2–9)
  const out: InlineProblem[] = [];
  for (let b = 2; b <= 9; b++) out.push(s(19, b));
  return out;
}
function sub19Pool(): InlineProblem[] {
  // 1.9: 20 − (1–9)
  const out: InlineProblem[] = [];
  for (let b = 1; b <= 9; b++) out.push(s(20, b));
  return out;
}

// ── Stage 2: two-digit ────────────────────────────────────────────────────

function sub21Pool(): InlineProblem[] {
  // 2.1: a multiple of 10 (20–90), b multiple of 10 < a
  const out: InlineProblem[] = [];
  for (let aT = 2; aT <= 9; aT++) for (let bT = 1; bT < aT; bT++) out.push(s(aT * 10, bT * 10));
  return out;
}
function sub22Pool(): InlineProblem[] {
  // 2.2: 2-digit (21–99) − ones (no renaming), where ones(a) > 0
  const out: InlineProblem[] = [];
  for (let a = 21; a <= 99; a++) {
    if (ones(a) === 0) continue;
    for (let b = 1; b <= ones(a); b++) out.push(s(a, b));
  }
  return out;
}
function sub23Pool(): InlineProblem[] {
  // 2.3: teens − ones (no renaming), ones(a) > 0
  const out: InlineProblem[] = [];
  for (let a = 11; a <= 19; a++) for (let b = 1; b <= ones(a); b++) out.push(s(a, b));
  return out;
}
function sub24Pool(): InlineProblem[] {
  // 2.4: 2-digit (20–99) − ones (1–9) with renaming (ones(a) < b)
  const out: InlineProblem[] = [];
  for (let a = 20; a <= 99; a++) for (let b = 1; b <= 9; b++) {
    if (ones(a) < b) out.push(s(a, b));
  }
  return out;
}
function sub25Pool(): InlineProblem[] {
  // 2.5: 2-digit multiple of 10 − multiple of 10
  return sub21Pool();
}
function sub26Pool(): InlineProblem[] {
  // 2.6: 2-digit − 2-digit no renaming (ones(a) >= ones(b), tens(a) >= tens(b))
  const out: InlineProblem[] = [];
  for (let a = 22; a <= 99; a++) for (let b = 11; b < a; b++) {
    if (ones(a) >= ones(b) && Math.floor(a / 10) >= Math.floor(b / 10)) out.push(s(a, b));
  }
  return out;
}
function sub27Pool(): InlineProblem[] {
  // 2.7: round 2-digit (30–90) − 2-digit (11–a-1), ones(b) > 0
  const out: InlineProblem[] = [];
  for (let aT = 3; aT <= 9; aT++) {
    const a = aT * 10;
    for (let b = 11; b < a; b++) if (ones(b) > 0) out.push(s(a, b));
  }
  return out;
}
function sub28Pool(): InlineProblem[] {
  // 2.8: 2-digit − 2-digit, ones renaming only (ones(a) < ones(b), tens(a) > tens(b))
  const out: InlineProblem[] = [];
  for (let a = 22; a <= 99; a++) for (let b = 11; b < a; b++) {
    if (ones(a) < ones(b) && Math.floor(a / 10) > Math.floor(b / 10)) out.push(s(a, b));
  }
  return out;
}
function sub29Pool(): InlineProblem[] {
  // 2.9: 2-digit − 2-digit any subtraction (a > b, a 22-99, b 11-(a-1))
  const out: InlineProblem[] = [];
  for (let a = 22; a <= 99; a += 2) for (let b = 11; b < a; b += 2) out.push(s(a, b));
  return out;
}

// ── Stage 3: three-digit ──────────────────────────────────────────────────

function sub31Pool(): InlineProblem[] {
  // 3.1: hundreds only (200–900) − hundreds (100–a-100)
  const out: InlineProblem[] = [];
  for (let aH = 2; aH <= 9; aH++) for (let bH = 1; bH < aH; bH++) out.push(s(aH * 100, bH * 100));
  return out;
}
function sub32Pool(): InlineProblem[] {
  // 3.2: hundreds (200–900) − 2-digit tens (10–90)
  const out: InlineProblem[] = [];
  for (let aH = 2; aH <= 9; aH++) for (let bT = 1; bT <= 9; bT++) out.push(s(aH * 100, bT * 10));
  return out;
}
function sub33Pool(): InlineProblem[] {
  // 3.3: hundreds (200–900) − ones (1–9)
  const out: InlineProblem[] = [];
  for (let aH = 2; aH <= 9; aH++) for (let b = 1; b <= 9; b++) out.push(s(aH * 100, b));
  return out;
}
function sub34Pool(): InlineProblem[] {
  // 3.4: hundreds (200–900) − 2-digit (11–99)
  const out: InlineProblem[] = [];
  for (let aH = 2; aH <= 9; aH++) for (let b = 11; b <= 99; b += 3) out.push(s(aH * 100, b));
  return out;
}
function sub35Pool(): InlineProblem[] {
  // 3.5: hundreds (300–900) − 3-digit (100–a-1)
  const out: InlineProblem[] = [];
  for (let aH = 3; aH <= 9; aH++) {
    const a = aH * 100;
    for (let b = 100; b < a; b += 11) out.push(s(a, b));
  }
  return out;
}
function sub36Pool(): InlineProblem[] {
  // 3.6: 3-digit − 3-digit no renaming
  const out: InlineProblem[] = [];
  for (let a = 111; a <= 999; a += 3) for (let b = 100; b < a; b += 4) {
    if (ones(a) >= ones(b) && tens(a) >= tens(b) && huns(a) >= huns(b)) out.push(s(a, b));
  }
  return out;
}
function sub37Pool(): InlineProblem[] {
  // 3.7: 3-digit − 3-digit ones renaming only
  const out: InlineProblem[] = [];
  for (let a = 111; a <= 999; a += 3) for (let b = 100; b < a; b += 4) {
    if (ones(a) < ones(b) && tens(a) >= tens(b) && huns(a) >= huns(b)) out.push(s(a, b));
  }
  return out;
}
function sub38Pool(): InlineProblem[] {
  // 3.8: 3-digit − 3-digit tens renaming only
  const out: InlineProblem[] = [];
  for (let a = 111; a <= 999; a += 3) for (let b = 100; b < a; b += 4) {
    if (ones(a) >= ones(b) && tens(a) < tens(b) && huns(a) >= huns(b)) out.push(s(a, b));
  }
  return out;
}
function sub39Pool(): InlineProblem[] {
  // 3.9: 3-digit − 3-digit multiple renaming (ones < or tens <)
  const out: InlineProblem[] = [];
  for (let a = 111; a <= 999; a += 3) for (let b = 100; b < a; b += 4) {
    if (ones(a) < ones(b) || tens(a) < tens(b)) out.push(s(a, b));
  }
  return out;
}

// ── Stage 4: four-digit ──────────────────────────────────────────────────

function sub41Pool(): InlineProblem[] {
  // 4.1: thousands only (2000–9000) − thousands (1000–a-1000)
  const out: InlineProblem[] = [];
  for (let aT = 2; aT <= 9; aT++) for (let bT = 1; bT < aT; bT++) out.push(s(aT * 1000, bT * 1000));
  return out;
}
function sub42Pool(): InlineProblem[] {
  // 4.2: thousands+hundreds (no hundreds renaming): a = tA*1000+hA*100, b = hB*100, hB <= hA
  const out: InlineProblem[] = [];
  for (let tA = 2; tA <= 9; tA++) for (let hA = 1; hA <= 9; hA++)
    for (let hB = 1; hB <= hA; hB++) out.push(s(tA * 1000 + hA * 100, hB * 100));
  return out;
}
function sub43Pool(): InlineProblem[] {
  // 4.3: with hundreds renaming: hA in 0-8, hB in (hA+1)-9
  const out: InlineProblem[] = [];
  for (let tA = 2; tA <= 9; tA++) for (let hA = 0; hA <= 8; hA++)
    for (let hB = hA + 1; hB <= 9; hB++) out.push(s(tA * 1000 + hA * 100, hB * 100));
  return out;
}
function sub44Pool(): InlineProblem[] {
  // 4.4: 4-digit − 2-digit, no renaming (ones(a) >= ones(b), tens(a) >= tens(b))
  const out: InlineProblem[] = [];
  for (let a = 1000; a <= 9999; a += 41) for (let b = 10; b <= 99; b++) {
    if (ones(a) >= ones(b) && tens(a) >= tens(b)) out.push(s(a, b));
  }
  return out;
}
function sub45Pool(): InlineProblem[] {
  // 4.5: 4-digit − 3-digit, no renaming
  const out: InlineProblem[] = [];
  for (let a = 1000; a <= 9999; a += 47) for (let b = 100; b <= 999; b += 7) {
    if (a > b && ones(a) >= ones(b) && tens(a) >= tens(b) && huns(a) >= huns(b)) out.push(s(a, b));
  }
  return out;
}
function sub46Pool(): InlineProblem[] {
  // 4.6: 4-digit − 3-digit, with renaming (at least one place needs borrow)
  const out: InlineProblem[] = [];
  for (let a = 1000; a <= 9999; a += 41) for (let b = 100; b <= 999; b += 7) {
    if (a > b && (ones(a) < ones(b) || tens(a) < tens(b) || huns(a) < huns(b))) out.push(s(a, b));
  }
  return out;
}
function sub47Pool(): InlineProblem[] {
  // 4.7: 4-digit (2000–9999) − 4-digit (1000–a-1), no renaming
  const out: InlineProblem[] = [];
  for (let a = 2000; a <= 9999; a += 37) for (let b = 1000; b < a; b += 41) {
    if (ones(a) >= ones(b) && tens(a) >= tens(b) && huns(a) >= huns(b) && thou(a) >= thou(b)) out.push(s(a, b));
  }
  return out;
}
function sub48Pool(): InlineProblem[] {
  // 4.8: 4-digit − 4-digit, ones renaming only
  const out: InlineProblem[] = [];
  for (let a = 2000; a <= 9999; a += 37) for (let b = 1000; b < a; b += 41) {
    if (ones(a) < ones(b) && tens(a) >= tens(b) && huns(a) >= huns(b) && thou(a) >= thou(b)) out.push(s(a, b));
  }
  return out;
}
function sub49Pool(): InlineProblem[] {
  // 4.9: 4-digit − 4-digit, multiple renaming (ones < AND tens <)
  const out: InlineProblem[] = [];
  for (let a = 2000; a <= 9999; a += 23) for (let b = 1000; b < a; b += 29) {
    if (ones(a) < ones(b) && tens(a) < tens(b)) out.push(s(a, b));
  }
  return out;
}

// ── Stage 5: decimal subtraction ─────────────────────────────────────────

function sub51Pool(): InlineProblem[] {
  // 5.1: tenths (1.1–9.9, non-whole) − whole (1–floor(a)-1)
  const out: InlineProblem[] = [];
  for (let a10 = 11; a10 <= 99; a10++) {
    if (a10 % 10 === 0) continue;
    const a = a10 / 10;
    for (let b = 1; b <= Math.floor(a) - 1; b++) out.push(ds(a, 1, b, 0));
  }
  return out;
}
function sub52Pool(): InlineProblem[] {
  // 5.2: tenths − tenths, no renaming (tA >= tB, tA and tB both non-zero)
  const out: InlineProblem[] = [];
  for (let a10 = 11; a10 <= 99; a10++) for (let b10 = 1; b10 <= 98; b10++) {
    if (a10 <= b10) continue;
    const tA = a10 % 10, tB = b10 % 10;
    if (tA === 0 || tB === 0) continue;
    if (tA >= tB) out.push(ds(a10 / 10, 1, b10 / 10, 1));
  }
  return out;
}
function sub53Pool(): InlineProblem[] {
  // 5.3: tenths − tenths, with renaming
  const out: InlineProblem[] = [];
  for (let a10 = 11; a10 <= 99; a10++) for (let b10 = 1; b10 <= 98; b10++) {
    if (a10 <= b10) continue;
    const tA = a10 % 10, tB = b10 % 10;
    if (tA === 0 || tB === 0) continue;
    if (tA < tB) out.push(ds(a10 / 10, 1, b10 / 10, 1));
  }
  return out;
}
function sub54Pool(): InlineProblem[] {
  // 5.4: hundredths − whole (a non-integer hundredths, b < a integer)
  const out: InlineProblem[] = [];
  for (let a100 = 101; a100 <= 999; a100 += 3) {
    if (a100 % 100 === 0) continue;
    const a = a100 / 100;
    for (let b = 1; b <= Math.floor(a) - 1; b++) out.push(ds(a, 2, b, 0));
  }
  return out;
}
function sub55Pool(): InlineProblem[] {
  // 5.5: hundredths − tenths (a non-integer hundredths, b non-zero tenths)
  const out: InlineProblem[] = [];
  for (let a100 = 101; a100 <= 999; a100 += 3) {
    if (a100 % 100 === 0) continue;
    const a = a100 / 100;
    for (let b10 = 1; b10 <= 98; b10++) {
      if (b10 % 10 === 0) continue;
      const b = b10 / 10;
      if (a > b) out.push(ds(a, 2, b, 1));
    }
  }
  return out;
}
function sub56Pool(): InlineProblem[] {
  // 5.6: hundredths − hundredths, no renaming
  const out: InlineProblem[] = [];
  for (let a100 = 101; a100 <= 999; a100 += 3) for (let b100 = 1; b100 <= 998; b100 += 3) {
    if (a100 <= b100) continue;
    if (a100 % 100 === 0 || b100 % 100 === 0) continue;
    const tA = Math.floor(a100 / 10) % 10, tB = Math.floor(b100 / 10) % 10;
    const hA = a100 % 10, hB = b100 % 10;
    if (tA >= tB && hA >= hB) out.push(ds(a100 / 100, 2, b100 / 100, 2));
  }
  return out;
}
function sub57Pool(): InlineProblem[] {
  // 5.7: hundredths − hundredths, with renaming
  const out: InlineProblem[] = [];
  for (let a100 = 101; a100 <= 999; a100 += 3) for (let b100 = 1; b100 <= 998; b100 += 3) {
    if (a100 <= b100) continue;
    if (a100 % 100 === 0 || b100 % 100 === 0) continue;
    const tA = Math.floor(a100 / 10) % 10, tB = Math.floor(b100 / 10) % 10;
    const hA = a100 % 10, hB = b100 % 10;
    if (tA < tB || hA < hB) out.push(ds(a100 / 100, 2, b100 / 100, 2));
  }
  return out;
}
function sub58Pool(): InlineProblem[] {
  // 5.8: thousandths − thousandths (both non-integer, a > b)
  const out: InlineProblem[] = [];
  for (let a1k = 1001; a1k <= 9999; a1k += 23) for (let b1k = 1; b1k <= 9998; b1k += 29) {
    if (a1k <= b1k) continue;
    if (a1k % 1000 === 0 || b1k % 1000 === 0) continue;
    out.push(ds(a1k / 1000, 3, b1k / 1000, 3));
  }
  return out;
}
function sub59Pool(): InlineProblem[] {
  // 5.9: mixed decimals (varying DP), with renaming and a > b
  const out: InlineProblem[] = [];
  const combos: Array<[number, number]> = [
    [1, 1], [1, 2], [1, 3], [2, 1], [2, 2], [2, 3], [3, 1], [3, 2], [3, 3],
  ];
  for (const [dA, dB] of combos) {
    const sA = Math.pow(10, dA);
    const sB = Math.pow(10, dB);
    const stepA = dA === 1 ? 3 : dA === 2 ? 23 : 137;
    const stepB = dB === 1 ? 7 : dB === 2 ? 31 : 191;
    let count = 0;
    outer: for (let av = 3 * sA; av <= 50 * sA; av += stepA) {
      const aV = av / sA;
      const fa = Math.round((aV - Math.floor(aV)) * 10000) / 10000;
      if (fa === 0) continue;
      for (let bv = 1; bv <= 49 * sB; bv += stepB) {
        const bV = bv / sB;
        const fb = Math.round((bV - Math.floor(bV)) * 10000) / 10000;
        if (fb === 0) continue;
        if (bV >= aV) continue;
        out.push(ds(aV, dA, bV, dB));
        if (++count >= 50) break outer;
      }
    }
  }
  return out;
}

// ── Registry ─────────────────────────────────────────────────────────────

const stage1Defs: Array<{ id: string; full: string; title: string; pool: () => InlineProblem[]; tagline: string }> = [
  { id: "1-1", full: "1.1", title: "Subtract within 5", pool: sub11Pool, tagline: "a (2–5) − b, both small." },
  { id: "1-2", full: "1.2", title: "Subtract within 10", pool: sub12Pool, tagline: "a (6–9) − b." },
  { id: "1-3", full: "1.3", title: "Subtract from 10", pool: sub13Pool, tagline: "10 − (1–9)." },
  { id: "1-4", full: "1.4", title: "Take away from 11 or 12", pool: sub14Pool, tagline: "11 or 12 − (3–9)." },
  { id: "1-5", full: "1.5", title: "Take away from 13 or 14", pool: sub15Pool, tagline: "13 or 14 − (5–9)." },
  { id: "1-6", full: "1.6", title: "Take away from 15 or 16", pool: sub16Pool, tagline: "15 or 16 − (7–9)." },
  { id: "1-7", full: "1.7", title: "Take away from 17 or 18", pool: sub17Pool, tagline: "17 or 18 − (8–9)." },
  { id: "1-8", full: "1.8", title: "Take away from 19", pool: sub18Pool, tagline: "19 − (2–9)." },
  { id: "1-9", full: "1.9", title: "Take away from 20", pool: sub19Pool, tagline: "20 − (1–9)." },
];

export const SUBTRACTION_STAGES: SubtractionStageSpec[] = [
  ...stage1Defs.map((d) => ({
    id: `stage-${d.id}`, fullId: d.full, shortTitle: d.title,
    inlineTagline: d.tagline,
    columnTagline: "Subtract — line up the digits, no renaming needed.",
    pool: d.pool,
  })),
  // Stage 2
  { id: "stage-2-1", fullId: "2.1", shortTitle: "Multiples of 10", inlineTagline: "Multiples of 10 − multiples of 10.", columnTagline: "Subtract tens digit, write 0 in ones.", pool: sub21Pool },
  { id: "stage-2-2", fullId: "2.2", shortTitle: "2-digit − ones, no renaming", inlineTagline: "2-digit − ones, no renaming.", columnTagline: "Subtract ones; tens stay the same.", pool: sub22Pool },
  { id: "stage-2-3", fullId: "2.3", shortTitle: "Teens − ones, no renaming", inlineTagline: "Teens − ones, no renaming.", columnTagline: "Subtract from a teen — ones >= b.", pool: sub23Pool },
  { id: "stage-2-4", fullId: "2.4", shortTitle: "2-digit − ones, with renaming", inlineTagline: "2-digit − ones, with renaming.", columnTagline: "Borrow from the tens column.", pool: sub24Pool },
  { id: "stage-2-5", fullId: "2.5", shortTitle: "Multiples of 10 (review)", inlineTagline: "Multiples of 10 − multiples of 10 (review).", columnTagline: "Same idea as 2.1.", pool: sub25Pool },
  { id: "stage-2-6", fullId: "2.6", shortTitle: "2-digit − 2-digit, no renaming", inlineTagline: "2-digit − 2-digit, no renaming.", columnTagline: "Subtract ones, then tens — no borrows.", pool: sub26Pool },
  { id: "stage-2-7", fullId: "2.7", shortTitle: "Round 10 − 2-digit", inlineTagline: "Round 2-digit (30–90) − 2-digit.", columnTagline: "Borrow from the tens for the ones (subtract from 0).", pool: sub27Pool },
  { id: "stage-2-8", fullId: "2.8", shortTitle: "2-digit − 2-digit, ones renaming", inlineTagline: "2-digit − 2-digit, ones renaming.", columnTagline: "Borrow once — ones < ones, tens > tens.", pool: sub28Pool },
  { id: "stage-2-9", fullId: "2.9", shortTitle: "2-digit − 2-digit, any subtraction", inlineTagline: "2-digit − 2-digit, any subtraction.", columnTagline: "Borrow where needed.", pool: sub29Pool },
  // Stage 3
  { id: "stage-3-1", fullId: "3.1", shortTitle: "Hundreds − hundreds", inlineTagline: "Hundreds only (200–900 − 100s).", columnTagline: "Subtract hundreds — zeros stay zeros.", pool: sub31Pool },
  { id: "stage-3-2", fullId: "3.2", shortTitle: "Hundreds − tens", inlineTagline: "Hundreds (200–900) − multiples of 10 (10–90).", columnTagline: "Borrow once from hundreds to make tens.", pool: sub32Pool },
  { id: "stage-3-3", fullId: "3.3", shortTitle: "Hundreds − ones", inlineTagline: "Hundreds (200–900) − ones (1–9).", columnTagline: "Borrow across two columns to reach the ones.", pool: sub33Pool },
  { id: "stage-3-4", fullId: "3.4", shortTitle: "Hundreds − 2-digit", inlineTagline: "Hundreds (200–900) − 2-digit (11–99).", columnTagline: "Borrow across columns to reach ones and tens.", pool: sub34Pool },
  { id: "stage-3-5", fullId: "3.5", shortTitle: "Hundreds − 3-digit", inlineTagline: "Round 3-digit − 3-digit.", columnTagline: "Borrow through multiple zeros.", pool: sub35Pool },
  { id: "stage-3-6", fullId: "3.6", shortTitle: "3-digit − 3-digit, no renaming", inlineTagline: "3-digit − 3-digit, no renaming.", columnTagline: "Subtract place by place — no borrows.", pool: sub36Pool, inlineCols: 5, inlineRows: 5 },
  { id: "stage-3-7", fullId: "3.7", shortTitle: "3-digit − 3-digit, ones renaming", inlineTagline: "3-digit − 3-digit, ones renaming only.", columnTagline: "Borrow from tens for the ones.", pool: sub37Pool, inlineCols: 5, inlineRows: 5 },
  { id: "stage-3-8", fullId: "3.8", shortTitle: "3-digit − 3-digit, tens renaming", inlineTagline: "3-digit − 3-digit, tens renaming only.", columnTagline: "Borrow from hundreds for the tens.", pool: sub38Pool, inlineCols: 5, inlineRows: 5 },
  { id: "stage-3-9", fullId: "3.9", shortTitle: "3-digit − 3-digit, multiple renaming", inlineTagline: "3-digit − 3-digit, multiple renaming.", columnTagline: "Borrow through ones and tens (or beyond).", pool: sub39Pool, inlineCols: 5, inlineRows: 5 },
  // Stage 4
  { id: "stage-4-1", fullId: "4.1", shortTitle: "Thousands − thousands", inlineTagline: "Thousands only (2000–9000 − 1000s).", columnTagline: "Subtract thousands — zeros stay zeros.", pool: sub41Pool, inlineCols: 5, inlineRows: 5 },
  { id: "stage-4-2", fullId: "4.2", shortTitle: "Thousands+hundreds − hundreds, no renaming", inlineTagline: "Thousands+hundreds − hundreds (no renaming).", columnTagline: "Subtract hundreds without borrowing.", pool: sub42Pool, inlineCols: 5, inlineRows: 5 },
  { id: "stage-4-3", fullId: "4.3", shortTitle: "Thousands+hundreds − hundreds, with renaming", inlineTagline: "Thousands+hundreds − hundreds, with renaming.", columnTagline: "Borrow from thousands for the hundreds.", pool: sub43Pool, inlineCols: 5, inlineRows: 5 },
  { id: "stage-4-4", fullId: "4.4", shortTitle: "4-digit − 2-digit, no renaming", inlineTagline: "4-digit − 2-digit (no renaming).", columnTagline: "Subtract ones and tens — no borrows.", pool: sub44Pool, inlineCols: 4, inlineRows: 5 },
  { id: "stage-4-5", fullId: "4.5", shortTitle: "4-digit − 3-digit, no renaming", inlineTagline: "4-digit − 3-digit (no renaming).", columnTagline: "Subtract through three places — no borrows.", pool: sub45Pool, inlineCols: 4, inlineRows: 5 },
  { id: "stage-4-6", fullId: "4.6", shortTitle: "4-digit − 3-digit, with renaming", inlineTagline: "4-digit − 3-digit, with renaming.", columnTagline: "Borrow where needed across the three places.", pool: sub46Pool, inlineCols: 4, inlineRows: 5 },
  { id: "stage-4-7", fullId: "4.7", shortTitle: "4-digit − 4-digit, no renaming", inlineTagline: "4-digit − 4-digit, no renaming.", columnTagline: "Subtract each place — no borrows.", pool: sub47Pool, inlineCols: 4, inlineRows: 5 },
  { id: "stage-4-8", fullId: "4.8", shortTitle: "4-digit − 4-digit, ones renaming", inlineTagline: "4-digit − 4-digit, ones renaming only.", columnTagline: "Borrow from tens for the ones.", pool: sub48Pool, inlineCols: 4, inlineRows: 5 },
  { id: "stage-4-9", fullId: "4.9", shortTitle: "4-digit − 4-digit, multiple renaming", inlineTagline: "4-digit − 4-digit, multiple renaming.", columnTagline: "Borrow across multiple places.", pool: sub49Pool, inlineCols: 4, inlineRows: 5 },
  // Stage 5
  { id: "stage-5-1", fullId: "5.1", shortTitle: "Tenths − whole number", inlineTagline: "Tenths (1.1–9.9) − whole (1–floor(a)−1).", columnTagline: "Line up decimal points — whole has 0 in tenths column.", pool: sub51Pool, inlineCols: 5, inlineRows: 5 },
  { id: "stage-5-2", fullId: "5.2", shortTitle: "Tenths − tenths, no renaming", inlineTagline: "Tenths − tenths, no renaming.", columnTagline: "Line up decimal points — subtract tenths and ones.", pool: sub52Pool, inlineCols: 4, inlineRows: 5 },
  { id: "stage-5-3", fullId: "5.3", shortTitle: "Tenths − tenths, with renaming", inlineTagline: "Tenths − tenths, with renaming.", columnTagline: "Borrow from the ones for the tenths.", pool: sub53Pool, inlineCols: 4, inlineRows: 5 },
  { id: "stage-5-4", fullId: "5.4", shortTitle: "Hundredths − whole number", inlineTagline: "Hundredths (1.01–9.99) − whole.", columnTagline: "Line up decimals — whole has 0 in tenths and hundredths.", pool: sub54Pool, inlineCols: 4, inlineRows: 5 },
  { id: "stage-5-5", fullId: "5.5", shortTitle: "Hundredths − tenths", inlineTagline: "Hundredths − tenths.", columnTagline: "Pad the shorter one with a 0 in hundredths column.", pool: sub55Pool, inlineCols: 4, inlineRows: 5 },
  { id: "stage-5-6", fullId: "5.6", shortTitle: "Hundredths − hundredths, no renaming", inlineTagline: "Hundredths − hundredths, no renaming.", columnTagline: "Subtract each decimal place — no borrows.", pool: sub56Pool, inlineCols: 4, inlineRows: 5 },
  { id: "stage-5-7", fullId: "5.7", shortTitle: "Hundredths − hundredths, with renaming", inlineTagline: "Hundredths − hundredths, with renaming.", columnTagline: "Borrow across the decimal places.", pool: sub57Pool, inlineCols: 4, inlineRows: 5 },
  { id: "stage-5-8", fullId: "5.8", shortTitle: "Thousandths − thousandths", inlineTagline: "Thousandths − thousandths.", columnTagline: "Three decimal places — line them up carefully.", pool: sub58Pool, inlineCols: 4, inlineRows: 5 },
  { id: "stage-5-9", fullId: "5.9", shortTitle: "Mixed decimals", inlineTagline: "Mixed decimals (1–3 places), with renaming.", columnTagline: "Pad shorter operand so decimal points align.", pool: sub59Pool, inlineCols: 4, inlineRows: 5 },
];

for (const s of SUBTRACTION_STAGES) s.operation = "Subtraction";

const SUBTRACTION_BY_ID: Record<string, SubtractionStageSpec> = Object.fromEntries(
  SUBTRACTION_STAGES.map((spec) => [spec.id, spec]),
);

export function getSubtractionStage(id: string): SubtractionStageSpec | null {
  return SUBTRACTION_BY_ID[id] ?? null;
}

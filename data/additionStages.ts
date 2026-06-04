// Addition stage pool generators — mirror solveit/src/pages/FourOperations/
// AdditionLevel.jsx so worksheet questions match what students see in the app.
// Each problem carries op:"+" and an answerDisplay that's `String(a + b)` (or
// a fixed-precision decimal string for Stage 5).

import type { InlineProblem } from "@/components/MultiplicationInlineWorksheet";
import type { MultiplicationStageSpec } from "@/data/multiplicationStages";

// Re-export the spec shape under an operation-agnostic name.
export type AdditionStageSpec = MultiplicationStageSpec;

function p(a: number, b: number): InlineProblem {
  return { a, b, op: "+", answerDisplay: String(a + b) };
}

// Decimal addition: keep exact precision via integer scaling.
function dp(a: number, aDP: number, b: number, bDP: number): InlineProblem {
  const ansDP = Math.max(aDP, bDP);
  const scale = Math.pow(10, ansDP);
  const ansScaled = Math.round(a * scale) + Math.round(b * scale);
  return {
    a, b, op: "+",
    aDisplay: a.toFixed(aDP),
    bDisplay: b.toFixed(bDP),
    answerDisplay: (ansScaled / scale).toFixed(ansDP),
  };
}

// ── Stage 1: Single-Digit Addition ────────────────────────────────────────
// 1.k: fixed addend k, plus 1–9
function stage1NPool(k: number): InlineProblem[] {
  const out: InlineProblem[] = [];
  for (let b = 1; b <= 9; b++) out.push(p(k, b));
  return out;
}

// ── Stage 2: Two-Digit Addition ──────────────────────────────────────────

function stageAdd21Pool(): InlineProblem[] {
  // 2.1: 10 + (1–10)
  const out: InlineProblem[] = [];
  for (let b = 1; b <= 10; b++) out.push(p(10, b));
  return out;
}

function stageAdd22Pool(): InlineProblem[] {
  // 2.2: multiples of 10 (20–90) + (1–9)
  const out: InlineProblem[] = [];
  for (let t = 2; t <= 9; t++) for (let b = 1; b <= 9; b++) out.push(p(t * 10, b));
  return out;
}

function stageAdd23Pool(): InlineProblem[] {
  // 2.3: teens (11–19) + (1–9), ones sum < 10
  const out: InlineProblem[] = [];
  for (let a = 11; a <= 19; a++) for (let b = 1; b <= 9; b++) {
    if ((a % 10) + b < 10) out.push(p(a, b));
  }
  return out;
}

function stageAdd24Pool(): InlineProblem[] {
  // 2.4: 20–89 + 1–9, ones sum < 10, sum < 100
  const out: InlineProblem[] = [];
  for (let a = 20; a <= 89; a++) for (let b = 1; b <= 9; b++) {
    if ((a % 10) + b < 10 && a + b < 100) out.push(p(a, b));
  }
  return out;
}

function stageAdd25Pool(): InlineProblem[] {
  // 2.5: 10–89 + 1–9, ones renaming (ones sum >= 10), sum < 100
  const out: InlineProblem[] = [];
  for (let a = 10; a <= 89; a++) for (let b = 1; b <= 9; b++) {
    if ((a % 10) + b >= 10 && a + b < 100) out.push(p(a, b));
  }
  return out;
}

function stageAdd26Pool(): InlineProblem[] {
  // 2.6: multiples of 10 (10–90) + multiples of 10 (10–90)
  const out: InlineProblem[] = [];
  for (let i = 1; i <= 9; i++) for (let j = 1; j <= 9; j++) out.push(p(i * 10, j * 10));
  return out;
}

function stageAdd27Pool(): InlineProblem[] {
  // 2.7: 10–99 + 10–99, ones sum < 10 AND tens sum < 10
  const out: InlineProblem[] = [];
  for (let a = 10; a <= 99; a++) for (let b = 10; b <= 99; b++) {
    if ((a % 10) + (b % 10) < 10 && Math.floor(a / 10) + Math.floor(b / 10) < 10) {
      out.push(p(a, b));
    }
  }
  return out;
}

function stageAdd28Pool(): InlineProblem[] {
  // 2.8: 10–99 + 10–99, ones renaming only (ones sum >= 10, tens sum + 1 < 10)
  const out: InlineProblem[] = [];
  for (let a = 10; a <= 99; a += 2) for (let b = 10; b <= 99; b += 2) {
    const onesSum = (a % 10) + (b % 10);
    const tensSum = Math.floor(a / 10) + Math.floor(b / 10);
    if (onesSum >= 10 && tensSum + 1 < 10) out.push(p(a, b));
  }
  return out;
}

function stageAdd29Pool(): InlineProblem[] {
  // 2.9: 10–99 + 10–99, ones sum >= 10 (any further renaming OK)
  const out: InlineProblem[] = [];
  for (let a = 10; a <= 99; a += 2) for (let b = 10; b <= 99; b += 2) {
    if ((a % 10) + (b % 10) >= 10) out.push(p(a, b));
  }
  return out;
}

// ── Stage 3: Three-Digit Addition ────────────────────────────────────────

function stageAdd31Pool(): InlineProblem[] {
  // 3.1: hundreds only (100–900) + hundreds (100–900)
  const out: InlineProblem[] = [];
  for (let h1 = 1; h1 <= 9; h1++) for (let h2 = 1; h2 <= 9; h2++) {
    out.push(p(h1 * 100, h2 * 100));
  }
  return out;
}

function stageAdd32Pool(): InlineProblem[] {
  // 3.2: hundreds + tens, no tens renaming, sum < 1000
  const out: InlineProblem[] = [];
  for (let hA = 1; hA <= 9; hA++) for (let tA = 1; tA <= 9; tA++)
    for (let hB = 1; hB <= 9; hB++) for (let tB = 1; tB <= 9; tB++) {
      const a = hA * 100 + tA * 10;
      const b = hB * 100 + tB * 10;
      if (tA + tB < 10 && a + b < 1000) out.push(p(a, b));
    }
  return out;
}

function stageAdd33Pool(): InlineProblem[] {
  // 3.3: hundreds + tens, tens renaming (tens sum >= 10)
  const out: InlineProblem[] = [];
  for (let hA = 1; hA <= 9; hA++) for (let tA = 1; tA <= 9; tA++)
    for (let hB = 1; hB <= 9; hB++) for (let tB = 1; tB <= 9; tB++) {
      if (tA + tB >= 10) out.push(p(hA * 100 + tA * 10, hB * 100 + tB * 10));
    }
  return out;
}

function stageAdd34Pool(): InlineProblem[] {
  // 3.4: 3-digit (100–999) + 3-digit, no renaming, sum < 1000 — sample
  const out: InlineProblem[] = [];
  for (let a = 100; a <= 999; a += 4) for (let b = 100; b <= 999; b += 4) {
    const onesSum = (a % 10) + (b % 10);
    const tensSum = (Math.floor(a / 10) % 10) + (Math.floor(b / 10) % 10);
    if (onesSum < 10 && tensSum < 10 && a + b < 1000) out.push(p(a, b));
  }
  return out;
}

function stageAdd35Pool(): InlineProblem[] {
  // 3.5: ones renaming only, sum < 1000 — sample
  const out: InlineProblem[] = [];
  for (let a = 100; a <= 999; a += 4) for (let b = 100; b <= 999; b += 4) {
    const onesSum = (a % 10) + (b % 10);
    const tensSum = (Math.floor(a / 10) % 10) + (Math.floor(b / 10) % 10);
    if (onesSum >= 10 && tensSum < 10 && a + b < 1000) out.push(p(a, b));
  }
  return out;
}

function stageAdd36Pool(): InlineProblem[] {
  // 3.6: tens renaming only, sum < 1000 — sample
  const out: InlineProblem[] = [];
  for (let a = 100; a <= 999; a += 4) for (let b = 100; b <= 999; b += 4) {
    const onesSum = (a % 10) + (b % 10);
    const tensSum = (Math.floor(a / 10) % 10) + (Math.floor(b / 10) % 10);
    if (onesSum < 10 && tensSum >= 10 && a + b < 1000) out.push(p(a, b));
  }
  return out;
}

function stageAdd37Pool(): InlineProblem[] {
  // 3.7: ones + tens renaming, sum < 1000 — sample
  const out: InlineProblem[] = [];
  for (let a = 100; a <= 999; a += 4) for (let b = 100; b <= 999; b += 4) {
    const onesSum = (a % 10) + (b % 10);
    const tensSum = (Math.floor(a / 10) % 10) + (Math.floor(b / 10) % 10);
    if (onesSum >= 10 && tensSum >= 10 && a + b < 1000) out.push(p(a, b));
  }
  return out;
}

function stageAdd38Pool(): InlineProblem[] {
  // 3.8: hundreds renaming (sum >= 1000), ones < 10 and tens < 10
  const out: InlineProblem[] = [];
  for (let a = 100; a <= 999; a += 4) for (let b = 100; b <= 999; b += 4) {
    const onesSum = (a % 10) + (b % 10);
    const tensSum = (Math.floor(a / 10) % 10) + (Math.floor(b / 10) % 10);
    if (onesSum < 10 && tensSum < 10 && a + b >= 1000) out.push(p(a, b));
  }
  return out;
}

function stageAdd39Pool(): InlineProblem[] {
  // 3.9: mixed renaming (sum >= 1000 AND (ones>=10 OR tens>=10))
  const out: InlineProblem[] = [];
  for (let a = 100; a <= 999; a += 4) for (let b = 100; b <= 999; b += 4) {
    const onesSum = (a % 10) + (b % 10);
    const tensSum = (Math.floor(a / 10) % 10) + (Math.floor(b / 10) % 10);
    if (a + b >= 1000 && (onesSum >= 10 || tensSum >= 10)) out.push(p(a, b));
  }
  return out;
}

// ── Stage 4: Four-Digit Addition ─────────────────────────────────────────

function stageAdd41Pool(): InlineProblem[] {
  // 4.1: thousands only (1000–9000) + thousands
  const out: InlineProblem[] = [];
  for (let i = 1; i <= 9; i++) for (let j = 1; j <= 9; j++) out.push(p(i * 1000, j * 1000));
  return out;
}

function stageAdd42Pool(): InlineProblem[] {
  // 4.2: thousands + hundreds, no hundreds renaming, sum < 10000
  const out: InlineProblem[] = [];
  for (let tA = 1; tA <= 9; tA++) for (let hA = 1; hA <= 9; hA++)
    for (let tB = 1; tB <= 9; tB++) for (let hB = 1; hB <= 9; hB++) {
      const a = tA * 1000 + hA * 100;
      const b = tB * 1000 + hB * 100;
      if (hA + hB < 10 && a + b < 10000) out.push(p(a, b));
    }
  return out;
}

function stageAdd43Pool(): InlineProblem[] {
  // 4.3: thousands + hundreds, hundreds renaming, sum < 20000
  const out: InlineProblem[] = [];
  for (let tA = 1; tA <= 9; tA++) for (let hA = 1; hA <= 9; hA++)
    for (let tB = 1; tB <= 9; tB++) for (let hB = 1; hB <= 9; hB++) {
      if (hA + hB < 10) continue;
      const a = tA * 1000 + hA * 100;
      const b = tB * 1000 + hB * 100;
      if (a + b < 20000) out.push(p(a, b));
    }
  return out;
}

function stageAdd44Pool(): InlineProblem[] {
  // 4.4: 4-digit + 2-digit, no renaming — sample
  const out: InlineProblem[] = [];
  for (let a = 1000; a <= 9999; a += 50) for (let b = 10; b <= 99; b++) {
    const onesSum = (a % 10) + (b % 10);
    const tensSum = (Math.floor(a / 10) % 10) + (Math.floor(b / 10) % 10);
    if (onesSum < 10 && tensSum < 10 && a + b < 10000) out.push(p(a, b));
  }
  return out;
}

function stageAdd45Pool(): InlineProblem[] {
  // 4.5: 4-digit + 3-digit, no renaming — sample
  const out: InlineProblem[] = [];
  for (let a = 1000; a <= 9999; a += 50) for (let b = 100; b <= 999; b += 8) {
    const onesSum = (a % 10) + (b % 10);
    const tensSum = (Math.floor(a / 10) % 10) + (Math.floor(b / 10) % 10);
    const hSum = (Math.floor(a / 100) % 10) + (Math.floor(b / 100) % 10);
    if (onesSum < 10 && tensSum < 10 && hSum < 10 && a + b < 10000) out.push(p(a, b));
  }
  return out;
}

function stageAdd46Pool(): InlineProblem[] {
  // 4.6: 4-digit + 3-digit, with renaming (at least one place >= 10)
  const out: InlineProblem[] = [];
  for (let a = 1000; a <= 9999; a += 50) for (let b = 100; b <= 999; b += 8) {
    const onesSum = (a % 10) + (b % 10);
    const tensSum = (Math.floor(a / 10) % 10) + (Math.floor(b / 10) % 10);
    const hSum = (Math.floor(a / 100) % 10) + (Math.floor(b / 100) % 10);
    if ((onesSum >= 10 || tensSum >= 10 || hSum >= 10) && a + b < 10000) out.push(p(a, b));
  }
  return out;
}

function stageAdd47Pool(): InlineProblem[] {
  // 4.7: 4-digit + 4-digit, no renaming — sample with prime step so
  // ones / tens / hundreds digits all vary across iterations.
  const out: InlineProblem[] = [];
  for (let a = 1000; a <= 9999; a += 37) for (let b = 1000; b <= 9999; b += 41) {
    const onesSum = (a % 10) + (b % 10);
    const tensSum = (Math.floor(a / 10) % 10) + (Math.floor(b / 10) % 10);
    const hSum = (Math.floor(a / 100) % 10) + (Math.floor(b / 100) % 10);
    if (onesSum < 10 && tensSum < 10 && hSum < 10 && a + b < 10000) out.push(p(a, b));
  }
  return out;
}

function stageAdd48Pool(): InlineProblem[] {
  // 4.8: 4-digit + 4-digit, ones renaming only — prime step
  const out: InlineProblem[] = [];
  for (let a = 1000; a <= 9999; a += 37) for (let b = 1000; b <= 9999; b += 41) {
    const onesSum = (a % 10) + (b % 10);
    const tensSum = (Math.floor(a / 10) % 10) + (Math.floor(b / 10) % 10);
    const hSum = (Math.floor(a / 100) % 10) + (Math.floor(b / 100) % 10);
    if (onesSum >= 10 && tensSum < 10 && hSum < 10 && a + b < 10000) out.push(p(a, b));
  }
  return out;
}

function stageAdd49Pool(): InlineProblem[] {
  // 4.9: 4-digit + 4-digit, multiple renaming (ones AND tens both >= 10)
  const out: InlineProblem[] = [];
  for (let a = 1000; a <= 9999; a += 23) for (let b = 1000; b <= 9999; b += 29) {
    const onesSum = (a % 10) + (b % 10);
    const tensSum = (Math.floor(a / 10) % 10) + (Math.floor(b / 10) % 10);
    if (onesSum >= 10 && tensSum >= 10 && a + b < 20000) out.push(p(a, b));
  }
  return out;
}

// ── Stage 5: Decimal Addition ────────────────────────────────────────────

function stageAdd51Pool(): InlineProblem[] {
  // 5.1: tenths (0.1–9.9) + whole (1–9)
  const out: InlineProblem[] = [];
  for (let a10 = 1; a10 <= 99; a10++) for (let b = 1; b <= 9; b++) {
    out.push(dp(a10 / 10, 1, b, 0));
  }
  return out;
}

function stageAdd52Pool(): InlineProblem[] {
  // 5.2: tenths + tenths, no renaming (frac sum < 10/10) — sample
  const out: InlineProblem[] = [];
  for (let a10 = 0; a10 <= 99; a10++) for (let b10 = 0; b10 <= 99; b10++) {
    const fracSum = (a10 % 10) + (b10 % 10);
    if (fracSum < 10) out.push(dp(a10 / 10, 1, b10 / 10, 1));
  }
  return out;
}

function stageAdd53Pool(): InlineProblem[] {
  // 5.3: tenths + tenths, with renaming (frac sum >= 10)
  const out: InlineProblem[] = [];
  for (let a10 = 0; a10 <= 99; a10++) for (let b10 = 0; b10 <= 99; b10++) {
    if ((a10 % 10) + (b10 % 10) >= 10) out.push(dp(a10 / 10, 1, b10 / 10, 1));
  }
  return out;
}

function stageAdd54Pool(): InlineProblem[] {
  // 5.4: hundredths (0.01–9.99) + whole (1–9) — sample
  const out: InlineProblem[] = [];
  for (let a100 = 1; a100 <= 999; a100 += 5) for (let b = 1; b <= 9; b++) {
    out.push(dp(a100 / 100, 2, b, 0));
  }
  return out;
}

function stageAdd55Pool(): InlineProblem[] {
  // 5.5: hundredths (0.00–9.99) + tenths (0.0–9.9) — sample
  const out: InlineProblem[] = [];
  for (let a100 = 0; a100 <= 999; a100 += 10) for (let b10 = 0; b10 <= 99; b10 += 2) {
    out.push(dp(a100 / 100, 2, b10 / 10, 1));
  }
  return out;
}

function stageAdd56Pool(): InlineProblem[] {
  // 5.6: hundredths + hundredths, no renaming (fractional sum < 1) — prime step
  // so all hundredths digits appear (not just multiples of 10).
  const out: InlineProblem[] = [];
  for (let a100 = 0; a100 <= 999; a100 += 7) for (let b100 = 0; b100 <= 999; b100 += 11) {
    const fracA = a100 % 100;
    const fracB = b100 % 100;
    if (fracA + fracB < 100) out.push(dp(a100 / 100, 2, b100 / 100, 2));
  }
  return out;
}

function stageAdd57Pool(): InlineProblem[] {
  // 5.7: hundredths + hundredths, with renaming (fractional sum >= 1) — prime step
  const out: InlineProblem[] = [];
  for (let a100 = 0; a100 <= 999; a100 += 7) for (let b100 = 0; b100 <= 999; b100 += 11) {
    if ((a100 % 100) + (b100 % 100) >= 100) out.push(dp(a100 / 100, 2, b100 / 100, 2));
  }
  return out;
}

function stageAdd58Pool(): InlineProblem[] {
  // 5.8: thousandths + thousandths, frac sum >= 1 — prime step
  const out: InlineProblem[] = [];
  for (let a1k = 0; a1k <= 9999; a1k += 23) for (let b1k = 0; b1k <= 9999; b1k += 29) {
    if ((a1k % 1000) + (b1k % 1000) >= 1000) out.push(dp(a1k / 1000, 3, b1k / 1000, 3));
  }
  return out;
}

function stageAdd59Pool(): InlineProblem[] {
  // 5.9: mixed decimals (varying DP), with renaming.
  // Step must be < 10^dp so fractional digits actually vary; without that
  // every candidate lands on a whole number and fa+fb is always 0.
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
    outer: for (let a = stepA; a <= 30 * sA; a += stepA) {
      for (let b = stepB; b <= 30 * sB; b += stepB) {
        const aV = a / sA;
        const bV = b / sB;
        const fa = aV - Math.floor(aV);
        const fb = bV - Math.floor(bV);
        if (fa + fb < 1) continue;
        out.push(dp(aV, dA, bV, dB));
        if (++count >= 60) break outer;
      }
    }
  }
  return out;
}

// ── Registry ─────────────────────────────────────────────────────────────

export const ADDITION_STAGES: AdditionStageSpec[] = [
  // Stage 1
  ...[1, 2, 3, 4, 5, 6, 7, 8, 9].map((k) => ({
    id: `stage-1-${k}`,
    fullId: `1.${k}`,
    shortTitle: `Add to ${k}`,
    inlineTagline: `${k} + a single digit (1–9).`,
    columnTagline: `Add a single digit to ${k} — practise the basic facts.`,
    pool: () => stage1NPool(k),
  } satisfies AdditionStageSpec)),
  // Stage 2
  { id: "stage-2-1", fullId: "2.1", shortTitle: "10 + a number to 10",
    inlineTagline: "10 + 1–10.", columnTagline: "Add to 10 — line up the digits, no renaming.",
    pool: stageAdd21Pool },
  { id: "stage-2-2", fullId: "2.2", shortTitle: "Multiple of 10 + one-digit",
    inlineTagline: "Multiples of 10 (20–90) + 1–9.",
    columnTagline: "Add a one-digit number to a multiple of 10.",
    pool: stageAdd22Pool },
  { id: "stage-2-3", fullId: "2.3", shortTitle: "Teen + one-digit, no renaming",
    inlineTagline: "Teen (11–19) + 1–9, no renaming.",
    columnTagline: "Add a one-digit to a teen — ones sum stays under 10.",
    pool: stageAdd23Pool },
  { id: "stage-2-4", fullId: "2.4", shortTitle: "Two-digit + one-digit, no renaming",
    inlineTagline: "Two-digit (20–89) + 1–9, no renaming.",
    columnTagline: "Add a one-digit to a two-digit, no renaming needed.",
    pool: stageAdd24Pool },
  { id: "stage-2-5", fullId: "2.5", shortTitle: "Two-digit + one-digit, with renaming",
    inlineTagline: "Two-digit (10–89) + 1–9, ones renaming.",
    columnTagline: "Add a one-digit to a two-digit — ones sum ≥ 10, carry the ten.",
    pool: stageAdd25Pool },
  { id: "stage-2-6", fullId: "2.6", shortTitle: "Multiples of 10",
    inlineTagline: "Multiples of 10 (10–90) + multiples of 10.",
    columnTagline: "Add two multiples of 10 — line up zeros.",
    pool: stageAdd26Pool },
  { id: "stage-2-7", fullId: "2.7", shortTitle: "Two-digit + two-digit, no renaming",
    inlineTagline: "Two-digit + two-digit (10–99 each), no renaming.",
    columnTagline: "Add ones, add tens — no carries.",
    pool: stageAdd27Pool },
  { id: "stage-2-8", fullId: "2.8", shortTitle: "Two-digit + two-digit, ones renaming",
    inlineTagline: "Two-digit + two-digit, ones renaming only.",
    columnTagline: "Add ones (carry the ten), then add tens.",
    pool: stageAdd28Pool },
  { id: "stage-2-9", fullId: "2.9", shortTitle: "Two-digit + two-digit, any renaming",
    inlineTagline: "Two-digit + two-digit, any renaming.",
    columnTagline: "Add ones, carry. Add tens, carry to hundreds if needed.",
    pool: stageAdd29Pool, inlineCols: 5, inlineRows: 5 },
  // Stage 3
  { id: "stage-3-1", fullId: "3.1", shortTitle: "Hundreds + hundreds",
    inlineTagline: "Hundreds only (100–900 + 100–900).",
    columnTagline: "Add the hundreds — bring zeros down.",
    pool: stageAdd31Pool },
  { id: "stage-3-2", fullId: "3.2", shortTitle: "Hundreds + tens, no renaming",
    inlineTagline: "Hundreds-tens numbers, no tens renaming.",
    columnTagline: "Add ones (just 0), add tens, add hundreds — no carries.",
    pool: stageAdd32Pool },
  { id: "stage-3-3", fullId: "3.3", shortTitle: "Hundreds + tens, tens renaming",
    inlineTagline: "Hundreds-tens numbers, tens renaming.",
    columnTagline: "Tens sum ≥ 10 — carry one to the hundreds.",
    pool: stageAdd33Pool },
  { id: "stage-3-4", fullId: "3.4", shortTitle: "Three-digit, no renaming",
    inlineTagline: "Three-digit + three-digit, no renaming, sum < 1000.",
    columnTagline: "Add each place — no carries needed.",
    pool: stageAdd34Pool },
  { id: "stage-3-5", fullId: "3.5", shortTitle: "Three-digit, ones renaming",
    inlineTagline: "Three-digit + three-digit, ones renaming only.",
    columnTagline: "Carry from the ones to the tens.",
    pool: stageAdd35Pool },
  { id: "stage-3-6", fullId: "3.6", shortTitle: "Three-digit, tens renaming",
    inlineTagline: "Three-digit + three-digit, tens renaming only.",
    columnTagline: "Carry from the tens to the hundreds.",
    pool: stageAdd36Pool },
  { id: "stage-3-7", fullId: "3.7", shortTitle: "Three-digit, ones + tens renaming",
    inlineTagline: "Three-digit + three-digit, ones and tens renaming.",
    columnTagline: "Carry twice — ones to tens, tens to hundreds.",
    pool: stageAdd37Pool },
  { id: "stage-3-8", fullId: "3.8", shortTitle: "Three-digit, hundreds renaming",
    inlineTagline: "Three-digit + three-digit, hundreds renaming (sum ≥ 1000).",
    columnTagline: "Hundreds sum ≥ 10 — answer is a 4-digit number.",
    pool: stageAdd38Pool },
  { id: "stage-3-9", fullId: "3.9", shortTitle: "Three-digit, mixed renaming",
    inlineTagline: "Three-digit + three-digit, mixed renaming, sum ≥ 1000.",
    columnTagline: "Carry through multiple places — answer is 4-digit.",
    pool: stageAdd39Pool },
  // Stage 4
  { id: "stage-4-1", fullId: "4.1", shortTitle: "Thousands + thousands",
    inlineTagline: "Thousands only (1000–9000 + 1000–9000).",
    columnTagline: "Add thousands — zeros stay zeros.",
    pool: stageAdd41Pool },
  { id: "stage-4-2", fullId: "4.2", shortTitle: "Thousands + hundreds, no renaming",
    inlineTagline: "Thousands-hundreds numbers, no hundreds renaming.",
    columnTagline: "Hundreds sum < 10 — no carries.",
    pool: stageAdd42Pool },
  { id: "stage-4-3", fullId: "4.3", shortTitle: "Thousands + hundreds, with renaming",
    inlineTagline: "Thousands-hundreds numbers, hundreds renaming.",
    columnTagline: "Hundreds sum ≥ 10 — carry to thousands.",
    pool: stageAdd43Pool },
  { id: "stage-4-4", fullId: "4.4", shortTitle: "Four-digit + two-digit, no renaming",
    inlineTagline: "Four-digit + two-digit, no renaming.",
    columnTagline: "Add the small number into the larger one's ones and tens.",
    pool: stageAdd44Pool, inlineCols: 5, inlineRows: 5 },
  { id: "stage-4-5", fullId: "4.5", shortTitle: "Four-digit + three-digit, no renaming",
    inlineTagline: "Four-digit + three-digit, no renaming.",
    columnTagline: "Add through ones, tens, hundreds — no carries.",
    pool: stageAdd45Pool, inlineCols: 4, inlineRows: 5 },
  { id: "stage-4-6", fullId: "4.6", shortTitle: "Four-digit + three-digit, with renaming",
    inlineTagline: "Four-digit + three-digit, with renaming.",
    columnTagline: "Carry where needed across ones, tens, hundreds.",
    pool: stageAdd46Pool, inlineCols: 4, inlineRows: 5 },
  { id: "stage-4-7", fullId: "4.7", shortTitle: "Four-digit + four-digit, no renaming",
    inlineTagline: "Four-digit + four-digit, no renaming.",
    columnTagline: "Line up four digits each — add place by place.",
    pool: stageAdd47Pool, inlineCols: 4, inlineRows: 5 },
  { id: "stage-4-8", fullId: "4.8", shortTitle: "Four-digit + four-digit, ones renaming",
    inlineTagline: "Four-digit + four-digit, ones renaming only.",
    columnTagline: "Carry from the ones — rest of the columns stay simple.",
    pool: stageAdd48Pool, inlineCols: 4, inlineRows: 5 },
  { id: "stage-4-9", fullId: "4.9", shortTitle: "Four-digit + four-digit, multiple renaming",
    inlineTagline: "Four-digit + four-digit, multiple renaming.",
    columnTagline: "Carry through ones, tens, hundreds — careful with each column.",
    pool: stageAdd49Pool, inlineCols: 4, inlineRows: 5 },
  // Stage 5
  { id: "stage-5-1", fullId: "5.1", shortTitle: "Tenths + whole number",
    inlineTagline: "Tenths (0.1–9.9) + whole (1–9).",
    columnTagline: "Line up decimal points — the whole has 0 in the tenths column.",
    pool: stageAdd51Pool },
  { id: "stage-5-2", fullId: "5.2", shortTitle: "Tenths + tenths, no renaming",
    inlineTagline: "Tenths + tenths, no renaming.",
    columnTagline: "Line up the decimal points — tenths sum stays under 1.",
    pool: stageAdd52Pool },
  { id: "stage-5-3", fullId: "5.3", shortTitle: "Tenths + tenths, with renaming",
    inlineTagline: "Tenths + tenths, with renaming.",
    columnTagline: "Tenths sum ≥ 10 — carry into the ones column.",
    pool: stageAdd53Pool, inlineCols: 4, inlineRows: 5 },
  { id: "stage-5-4", fullId: "5.4", shortTitle: "Hundredths + whole number",
    inlineTagline: "Hundredths (0.01–9.99) + whole (1–9).",
    columnTagline: "Line up decimal points — whole has 0 in tenths and hundredths.",
    pool: stageAdd54Pool, inlineCols: 4, inlineRows: 5 },
  { id: "stage-5-5", fullId: "5.5", shortTitle: "Hundredths + tenths",
    inlineTagline: "Hundredths + tenths.",
    columnTagline: "Line up decimal points — tenths column adds a 0 for hundredths.",
    pool: stageAdd55Pool, inlineCols: 4, inlineRows: 5 },
  { id: "stage-5-6", fullId: "5.6", shortTitle: "Hundredths + hundredths, no renaming",
    inlineTagline: "Hundredths + hundredths, no renaming.",
    columnTagline: "Line up decimal points — fractional sum stays under 1.",
    pool: stageAdd56Pool, inlineCols: 4, inlineRows: 5 },
  { id: "stage-5-7", fullId: "5.7", shortTitle: "Hundredths + hundredths, with renaming",
    inlineTagline: "Hundredths + hundredths, with renaming.",
    columnTagline: "Fractional sum ≥ 1 — carry into the ones.",
    pool: stageAdd57Pool, inlineCols: 4, inlineRows: 5 },
  { id: "stage-5-8", fullId: "5.8", shortTitle: "Thousandths + thousandths",
    inlineTagline: "Thousandths + thousandths, with renaming.",
    columnTagline: "Three decimal places — line up carefully.",
    pool: stageAdd58Pool, inlineCols: 4, inlineRows: 5 },
  { id: "stage-5-9", fullId: "5.9", shortTitle: "Mixed decimals",
    inlineTagline: "Mixed decimals (1, 2, or 3 places), with renaming.",
    columnTagline: "Different decimal place counts — line up the decimal point first.",
    pool: stageAdd59Pool, inlineCols: 4, inlineRows: 5 },
];

// Stamp every stage with operation:"Addition" so the frames render the
// right banner / footer text without needing to set it on each entry above.
for (const s of ADDITION_STAGES) s.operation = "Addition";

const ADDITION_BY_ID: Record<string, AdditionStageSpec> = Object.fromEntries(
  ADDITION_STAGES.map((s) => [s.id, s]),
);

export function getAdditionStage(id: string): AdditionStageSpec | null {
  return ADDITION_BY_ID[id] ?? null;
}

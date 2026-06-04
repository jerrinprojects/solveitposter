// Division stage pool generators — mirror solveit/src/pages/FourOperations/
// DivisionLevel.jsx. Each problem carries op:"÷" and an answerDisplay that's
// either "Q" (whole-number quotient) or "Q R r" (with remainder) or a
// decimal quotient (Stage 5).

import type { InlineProblem } from "@/components/MultiplicationInlineWorksheet";
import type { MultiplicationStageSpec } from "@/data/multiplicationStages";

export type DivisionStageSpec = MultiplicationStageSpec;

// Exact division (no remainder)
function d(dividend: number, divisor: number): InlineProblem {
  return {
    a: dividend, b: divisor, op: "÷",
    answerDisplay: String(dividend / divisor),
  };
}

// Division with remainder: answer formatted as "Q R r"
function dr(dividend: number, divisor: number, quotient: number, remainder: number): InlineProblem {
  return {
    a: dividend, b: divisor, op: "÷",
    answerDisplay: `${quotient} R ${remainder}`,
  };
}

// Decimal division — answer with up to `ansDP` decimal places
function dd(dividend: number, divisor: number, ansDP: number, divDP: number = 0, dvdDP: number = 0): InlineProblem {
  const q = dividend / divisor;
  return {
    a: dividend, b: divisor, op: "÷",
    aDisplay: dvdDP > 0 ? dividend.toFixed(dvdDP) : String(dividend),
    bDisplay: divDP > 0 ? divisor.toFixed(divDP) : String(divisor),
    answerDisplay: ansDP > 0 ? q.toFixed(ansDP) : String(q),
  };
}

// ── Stage 1: single-digit division ────────────────────────────────────────

function div11Pool(): InlineProblem[] { // ÷ 2, quotient 1-9
  const out: InlineProblem[] = [];
  for (let q = 1; q <= 9; q++) out.push(d(q * 2, 2));
  return out;
}
function div12Pool(): InlineProblem[] { // ÷ 5, quotient 1-9
  const out: InlineProblem[] = [];
  for (let q = 1; q <= 9; q++) out.push(d(q * 5, 5));
  return out;
}
function div13Pool(): InlineProblem[] { // ÷ 3
  const out: InlineProblem[] = [];
  for (let q = 1; q <= 9; q++) out.push(d(q * 3, 3));
  return out;
}
function div14Pool(): InlineProblem[] { // ÷ 4
  const out: InlineProblem[] = [];
  for (let q = 1; q <= 9; q++) out.push(d(q * 4, 4));
  return out;
}
function div15Pool(): InlineProblem[] { // ÷ 6 or 7, q 2-9
  const out: InlineProblem[] = [];
  for (const div of [6, 7]) for (let q = 2; q <= 9; q++) out.push(d(q * div, div));
  return out;
}
function div16Pool(): InlineProblem[] { // ÷ 8 or 9, q 2-9
  const out: InlineProblem[] = [];
  for (const div of [8, 9]) for (let q = 2; q <= 9; q++) out.push(d(q * div, div));
  return out;
}
function div17Pool(): InlineProblem[] { // mixed ÷ 2-9, q 2-9
  const out: InlineProblem[] = [];
  for (let div = 2; div <= 9; div++) for (let q = 2; q <= 9; q++) out.push(d(q * div, div));
  return out;
}
function div18Pool(): InlineProblem[] { // remainder, ÷ 2 or 3, q 2-9
  const out: InlineProblem[] = [];
  for (const div of [2, 3]) for (let q = 2; q <= 9; q++) for (let r = 1; r < div; r++) {
    out.push(dr(q * div + r, div, q, r));
  }
  return out;
}
function div19Pool(): InlineProblem[] { // remainder, ÷ 2-9, q 2-9
  const out: InlineProblem[] = [];
  for (let div = 2; div <= 9; div++) for (let q = 2; q <= 9; q++) for (let r = 1; r < div; r++) {
    out.push(dr(q * div + r, div, q, r));
  }
  return out;
}

// ── Stage 2: two-digit ────────────────────────────────────────────────────

function div21Pool(): InlineProblem[] { // ÷ 10, q 2-9
  const out: InlineProblem[] = [];
  for (let q = 2; q <= 9; q++) out.push(d(q * 10, 10));
  return out;
}
function div22Pool(): InlineProblem[] { // multiples of 10 ÷ single
  const out: InlineProblem[] = [];
  for (let t = 2; t <= 9; t++) {
    const dividend = t * 10;
    for (let div = 2; div <= 9; div++) if (dividend % div === 0) out.push(d(dividend, div));
  }
  return out;
}
function div23Pool(): InlineProblem[] { // two-digit ÷ single, clean places
  const out: InlineProblem[] = [];
  for (let div = 2; div <= 9; div++) {
    for (let tDigit = div; tDigit <= 9; tDigit += div) {
      for (let oDigit = 0; oDigit <= 9; oDigit += div) {
        out.push(d(tDigit * 10 + oDigit, div));
      }
    }
  }
  return out;
}
function div24Pool(): InlineProblem[] { // 2d ÷ single with regrouping, q 11-24
  const out: InlineProblem[] = [];
  for (let div = 2; div <= 9; div++) {
    const maxQ = Math.floor(99 / div);
    for (let q = 11; q <= maxQ; q++) out.push(d(q * div, div));
  }
  return out;
}
function div25Pool(): InlineProblem[] { // 2d ÷ single, any
  return div24Pool();
}
function div26Pool(): InlineProblem[] { // 2d ÷ single, remainder
  const out: InlineProblem[] = [];
  for (let div = 2; div <= 8; div++) {
    const maxQ = Math.floor((100 - div) / div);
    const minQ = Math.ceil(9 / div);
    for (let q = minQ; q <= Math.min(maxQ, minQ + 8); q++) {
      for (let r = 1; r < div; r++) out.push(dr(q * div + r, div, q, r));
    }
  }
  return out;
}
function div27Pool(): InlineProblem[] { // ÷ 100, q 2-50
  const out: InlineProblem[] = [];
  for (let q = 2; q <= 50; q++) out.push(d(q * 100, 100));
  return out;
}
function div28Pool(): InlineProblem[] { // ÷ 1000, q 2-50
  const out: InlineProblem[] = [];
  for (let q = 2; q <= 50; q++) out.push(d(q * 1000, 1000));
  return out;
}
function div29Pool(): InlineProblem[] { // ÷ 10/100/1000, q 2-50
  const out: InlineProblem[] = [];
  for (const div of [10, 100, 1000]) for (let q = 2; q <= 50; q++) out.push(d(q * div, div));
  return out;
}

// ── Stage 3: three-digit ──────────────────────────────────────────────────

function div31Pool(): InlineProblem[] { // hundreds ÷ single
  const out: InlineProblem[] = [];
  for (let div = 2; div <= 9; div++) {
    for (let x = 1; x <= 9; x++) if ((x * 100) % div === 0) out.push(d(x * 100, div));
  }
  return out;
}
function div32Pool(): InlineProblem[] { // 3d ÷ single, clean places
  const out: InlineProblem[] = [];
  for (let div = 2; div <= 9; div++) {
    for (let h = div; h <= 9; h += div) for (let t = 0; t <= 9; t += div) for (let o = 0; o <= 9; o += div) {
      out.push(d(h * 100 + t * 10 + o, div));
    }
  }
  return out;
}
function div33Pool(): InlineProblem[] { // 3d ÷ single, with regrouping
  const out: InlineProblem[] = [];
  for (let div = 2; div <= 9; div++) {
    const minQ = Math.ceil(100 / div);
    const maxQ = Math.floor(999 / div);
    for (let q = minQ; q <= maxQ; q += 11) out.push(d(q * div, div));
  }
  return out;
}
function div34Pool(): InlineProblem[] { return div33Pool(); }
function div35Pool(): InlineProblem[] { // 3d ÷ multiple of 10
  const out: InlineProblem[] = [];
  for (const div of [10, 20, 30, 40, 50]) {
    const minQ = Math.ceil(100 / div);
    const maxQ = Math.floor(999 / div);
    for (let q = minQ; q <= maxQ; q++) out.push(d(q * div, div));
  }
  return out;
}
function div36Pool(): InlineProblem[] { // 3d ÷ teens (11-19)
  const out: InlineProblem[] = [];
  for (let div = 11; div <= 19; div++) {
    const minQ = Math.ceil(100 / div);
    const maxQ = Math.floor(999 / div);
    for (let q = minQ; q <= maxQ; q += 3) out.push(d(q * div, div));
  }
  return out;
}
function div37Pool(): InlineProblem[] { // 3d ÷ 2d, no remainder
  const out: InlineProblem[] = [];
  for (let div = 10; div <= 99; div += 3) {
    const minQ = Math.ceil(100 / div);
    const maxQ = Math.floor(999 / div);
    for (let q = minQ; q <= maxQ; q++) out.push(d(q * div, div));
  }
  return out;
}
function div38Pool(): InlineProblem[] { // 3d ÷ single, remainder
  const out: InlineProblem[] = [];
  for (let div = 2; div <= 9; div++) {
    const minQ = Math.ceil(100 / div);
    const maxQ = Math.floor((999 - div + 1) / div);
    for (let q = minQ; q <= maxQ; q += 13) {
      for (let r = 1; r < div; r++) out.push(dr(q * div + r, div, q, r));
    }
  }
  return out;
}
function div39Pool(): InlineProblem[] { // 3d ÷ 2d, remainder
  const out: InlineProblem[] = [];
  for (let div = 11; div <= 99; div += 3) {
    const minQ = Math.ceil(100 / div);
    const maxQ = Math.floor((1000 - div) / div);
    if (minQ > maxQ) continue;
    for (let q = minQ; q <= maxQ; q++) {
      for (let r = 1; r < div; r += Math.max(1, Math.floor(div / 3))) out.push(dr(q * div + r, div, q, r));
    }
  }
  return out;
}

// ── Stage 4: four-digit ──────────────────────────────────────────────────

function div41Pool(): InlineProblem[] { // thousands ÷ single
  const out: InlineProblem[] = [];
  for (let div = 2; div <= 9; div++) {
    const maxK = Math.floor(9 / div);
    for (let k = 1; k <= Math.max(1, maxK); k++) out.push(d(k * 1000 * div, div));
  }
  return out;
}
function div42Pool(): InlineProblem[] { // 4d ÷ single, no remainder
  const out: InlineProblem[] = [];
  for (let div = 2; div <= 9; div++) {
    const minQ = Math.ceil(1000 / div);
    const maxQ = Math.floor(9999 / div);
    for (let q = minQ; q <= maxQ; q += 23) out.push(d(q * div, div));
  }
  return out;
}
function div43Pool(): InlineProblem[] { // 4d ÷ single, remainder
  const out: InlineProblem[] = [];
  for (let div = 2; div <= 9; div++) {
    const minQ = Math.ceil(1000 / div);
    const maxQ = Math.floor((9999 - div + 1) / div);
    for (let q = minQ; q <= maxQ; q += 47) {
      for (let r = 1; r < div; r++) out.push(dr(q * div + r, div, q, r));
    }
  }
  return out;
}
function div44Pool(): InlineProblem[] { // 4d ÷ multiple of 10
  const out: InlineProblem[] = [];
  for (let div = 10; div <= 90; div += 10) {
    const minQ = Math.ceil(1000 / div);
    const maxQ = Math.floor(9999 / div);
    for (let q = minQ; q <= maxQ; q += 11) out.push(d(q * div, div));
  }
  return out;
}
function div45Pool(): InlineProblem[] { // 4d ÷ teens 11-19
  const out: InlineProblem[] = [];
  for (let div = 11; div <= 19; div++) {
    const minQ = Math.ceil(1000 / div);
    const maxQ = Math.floor(9999 / div);
    for (let q = minQ; q <= maxQ; q += 17) out.push(d(q * div, div));
  }
  return out;
}
function div46Pool(): InlineProblem[] { // 4d ÷ 2d, no remainder
  const out: InlineProblem[] = [];
  for (let div = 11; div <= 99; div += 7) {
    const minQ = Math.ceil(1000 / div);
    const maxQ = Math.floor(9999 / div);
    for (let q = minQ; q <= maxQ; q += 11) out.push(d(q * div, div));
  }
  return out;
}
function div47Pool(): InlineProblem[] { // 4d ÷ 2d, remainder
  const out: InlineProblem[] = [];
  for (let div = 11; div <= 99; div += 7) {
    const minQ = Math.ceil(1000 / div);
    const maxQ = Math.floor((9999 - div + 1) / div);
    if (minQ > maxQ) continue;
    for (let q = minQ; q <= maxQ; q += 11) {
      const r = Math.floor(div / 2);
      if (r >= 1 && r < div) out.push(dr(q * div + r, div, q, r));
    }
  }
  return out;
}
function div48Pool(): InlineProblem[] { // 4d ÷ 3d, no remainder
  const out: InlineProblem[] = [];
  for (let h = 1; h <= 9; h++) {
    const div = h * 100;
    const minQ = Math.ceil(1000 / div);
    const maxQ = Math.floor(9999 / div);
    for (let q = minQ; q <= maxQ; q++) out.push(d(q * div, div));
  }
  return out;
}
function div49Pool(): InlineProblem[] { // 4d ÷ 3d, remainder
  const out: InlineProblem[] = [];
  for (let h = 1; h <= 9; h++) {
    const div = h * 100;
    const minQ = Math.ceil(1000 / div);
    const maxQ = Math.floor((9999 - div + 1) / div);
    if (minQ > maxQ) continue;
    for (let q = minQ; q <= maxQ; q++) {
      for (let r = 10; r < div; r += Math.max(1, Math.floor(div / 4))) out.push(dr(q * div + r, div, q, r));
    }
  }
  return out;
}

// ── Stage 5: decimal division ────────────────────────────────────────────

function div51Pool(): InlineProblem[] { // whole ÷ 10/100/1000 = decimal
  const out: InlineProblem[] = [];
  for (const div of [10, 100, 1000]) {
    for (let q = 1; q <= 99; q++) {
      const dp = String(div).length - 1; // 10→1, 100→2, 1000→3
      out.push(dd(q, div, dp));
    }
  }
  return out;
}
function div52Pool(): InlineProblem[] { // tenths ÷ whole
  const out: InlineProblem[] = [];
  for (let div = 2; div <= 9; div++) {
    for (let q10 = 1; q10 <= 20; q10++) {
      const q = q10 / 10;
      const dividend = Number((q * div).toFixed(1));
      out.push(dd(dividend, div, 1, 0, 1));
    }
  }
  return out;
}
function div53Pool(): InlineProblem[] { // whole ÷ decimal tenths
  // 12 ÷ 0.3 = 40 — whole quotient, decimal divisor
  const out: InlineProblem[] = [];
  for (let d10 = 1; d10 <= 9; d10++) {
    const div = d10 / 10;
    const gcd = (x: number, y: number): number => y === 0 ? x : gcd(y, x % y);
    const denom = 10 / gcd(d10, 10);
    for (let q = 2; q <= 10; q++) {
      const quotient = q * denom;
      const dividend = Math.round(quotient * div);
      out.push(dd(dividend, div, 0, 1, 0));
    }
  }
  return out;
}
function div54Pool(): InlineProblem[] { // ÷ 0.1, 0.01, 0.001
  const out: InlineProblem[] = [];
  for (const [div, divDP] of [[0.1, 1], [0.01, 2], [0.001, 3]] as const) {
    for (let q = 5; q <= 50; q++) {
      const dividend = Number((q * div).toFixed(divDP));
      out.push(dd(dividend, div, 0, divDP, divDP));
    }
  }
  return out;
}
function div55Pool(): InlineProblem[] { // tenths ÷ tenths
  const out: InlineProblem[] = [];
  for (let d10 = 1; d10 <= 9; d10++) {
    const div = d10 / 10;
    for (let q = 2; q <= 10; q++) {
      const dividend = Number((q * div).toFixed(1));
      out.push(dd(dividend, div, 0, 1, 1));
    }
  }
  return out;
}
function div56Pool(): InlineProblem[] { // hundredths ÷ hundredths
  const out: InlineProblem[] = [];
  for (let d100 = 1; d100 <= 9; d100++) {
    const div = d100 / 100;
    for (let q = 2; q <= 50; q++) {
      const dividend = Number((q * div).toFixed(2));
      out.push(dd(dividend, div, 0, 2, 2));
    }
  }
  return out;
}
function div57Pool(): InlineProblem[] { // larger decimal ÷ tenths
  const out: InlineProblem[] = [];
  for (let d10 = 1; d10 <= 9; d10++) {
    const div = d10 / 10;
    for (let q = 10; q <= 100; q += 3) {
      const dividend = Number((q * div).toFixed(1));
      out.push(dd(dividend, div, 0, 1, 1));
    }
  }
  return out;
}
function div58Pool(): InlineProblem[] { // mixed decimal division
  const out: InlineProblem[] = [];
  for (let d10 = 1; d10 <= 99; d10 += 5) {
    const div = d10 / 10;
    for (let q = 2; q <= 50; q += 3) {
      const dividend = Number((q * div).toFixed(1));
      out.push(dd(dividend, div, 0, 1, 1));
    }
  }
  return out;
}
function div59Pool(): InlineProblem[] { // complex decimal: hundredths divisor
  const out: InlineProblem[] = [];
  for (let d100 = 1; d100 <= 99; d100 += 3) {
    const div = d100 / 100;
    for (let q = 10; q <= 100; q += 7) {
      const dividend = Number((q * div).toFixed(2));
      out.push(dd(dividend, div, 0, 2, 2));
    }
  }
  return out;
}

// ── Registry ─────────────────────────────────────────────────────────────

export const DIVISION_STAGES: DivisionStageSpec[] = [
  // Stage 1
  { id: "stage-1-1", fullId: "1.1", shortTitle: "Divide by 2", inlineTagline: "Divide by 2 (quotient 1–9).", columnTagline: "÷ 2 — find how many groups of 2.", pool: div11Pool },
  { id: "stage-1-2", fullId: "1.2", shortTitle: "Divide by 5", inlineTagline: "Divide by 5.", columnTagline: "÷ 5 — count by fives.", pool: div12Pool },
  { id: "stage-1-3", fullId: "1.3", shortTitle: "Divide by 3", inlineTagline: "Divide by 3.", columnTagline: "÷ 3 — share into 3 groups.", pool: div13Pool },
  { id: "stage-1-4", fullId: "1.4", shortTitle: "Divide by 4", inlineTagline: "Divide by 4.", columnTagline: "÷ 4 — share into 4 groups.", pool: div14Pool },
  { id: "stage-1-5", fullId: "1.5", shortTitle: "Divide by 6 or 7", inlineTagline: "Divide by 6 or 7.", columnTagline: "÷ 6 or 7 — use the times tables.", pool: div15Pool },
  { id: "stage-1-6", fullId: "1.6", shortTitle: "Divide by 8 or 9", inlineTagline: "Divide by 8 or 9.", columnTagline: "÷ 8 or 9 — use the times tables.", pool: div16Pool },
  { id: "stage-1-7", fullId: "1.7", shortTitle: "Mixed division facts", inlineTagline: "Mixed division facts (÷ 2–9).", columnTagline: "Mixed times tables.", pool: div17Pool },
  { id: "stage-1-8", fullId: "1.8", shortTitle: "Remainder, ÷ 2 or 3", inlineTagline: "÷ 2 or 3 with remainder.", columnTagline: "Find quotient and remainder.", pool: div18Pool },
  { id: "stage-1-9", fullId: "1.9", shortTitle: "Remainder, ÷ 2–9", inlineTagline: "÷ 2–9 with remainder.", columnTagline: "Find quotient and remainder.", pool: div19Pool },
  // Stage 2
  { id: "stage-2-1", fullId: "2.1", shortTitle: "Divide by 10", inlineTagline: "Divide by 10.", columnTagline: "÷ 10 — drop a zero.", pool: div21Pool },
  { id: "stage-2-2", fullId: "2.2", shortTitle: "Multiples of 10 ÷ single", inlineTagline: "Multiples of 10 ÷ single digit.", columnTagline: "Easy mental division.", pool: div22Pool },
  { id: "stage-2-3", fullId: "2.3", shortTitle: "2-digit ÷ single, clean", inlineTagline: "2-digit ÷ single digit, clean places.", columnTagline: "Each digit divides evenly.", pool: div23Pool },
  { id: "stage-2-4", fullId: "2.4", shortTitle: "2-digit ÷ single, regrouping", inlineTagline: "2-digit ÷ single, with regrouping.", columnTagline: "Bring down — long division.", pool: div24Pool, inlineCols: 4, inlineRows: 5 },
  { id: "stage-2-5", fullId: "2.5", shortTitle: "2-digit ÷ single, any", inlineTagline: "2-digit ÷ single digit, any.", columnTagline: "Long division — practise.", pool: div25Pool, inlineCols: 4, inlineRows: 5 },
  { id: "stage-2-6", fullId: "2.6", shortTitle: "2-digit ÷ single, remainder", inlineTagline: "2-digit ÷ single, remainder.", columnTagline: "Find quotient and remainder.", pool: div26Pool, inlineCols: 4, inlineRows: 5 },
  { id: "stage-2-7", fullId: "2.7", shortTitle: "Divide by 100", inlineTagline: "Divide by 100.", columnTagline: "÷ 100 — drop two zeros.", pool: div27Pool },
  { id: "stage-2-8", fullId: "2.8", shortTitle: "Divide by 1,000", inlineTagline: "Divide by 1,000.", columnTagline: "÷ 1000 — drop three zeros.", pool: div28Pool },
  { id: "stage-2-9", fullId: "2.9", shortTitle: "Divide by 10, 100, 1000", inlineTagline: "÷ 10, 100, or 1000.", columnTagline: "Just drop the matching number of zeros.", pool: div29Pool },
  // Stage 3
  { id: "stage-3-1", fullId: "3.1", shortTitle: "Hundreds ÷ single", inlineTagline: "Hundreds ÷ single digit.", columnTagline: "Easy when the hundreds divides cleanly.", pool: div31Pool },
  { id: "stage-3-2", fullId: "3.2", shortTitle: "3-digit ÷ single, clean", inlineTagline: "3-digit ÷ single, clean places.", columnTagline: "Each place divides evenly.", pool: div32Pool },
  { id: "stage-3-3", fullId: "3.3", shortTitle: "3-digit ÷ single, regrouping", inlineTagline: "3-digit ÷ single, regrouping.", columnTagline: "Long division — carry the remainder over.", pool: div33Pool, inlineCols: 4, inlineRows: 5 },
  { id: "stage-3-4", fullId: "3.4", shortTitle: "3-digit ÷ single, any", inlineTagline: "3-digit ÷ single, any.", columnTagline: "Long division — full process.", pool: div34Pool, inlineCols: 4, inlineRows: 5 },
  { id: "stage-3-5", fullId: "3.5", shortTitle: "3-digit ÷ multiple of 10", inlineTagline: "3-digit ÷ multiple of 10.", columnTagline: "Easy with the trailing zero.", pool: div35Pool, inlineCols: 4, inlineRows: 5 },
  { id: "stage-3-6", fullId: "3.6", shortTitle: "3-digit ÷ teens", inlineTagline: "3-digit ÷ teens (11–19).", columnTagline: "Estimate using closest known multiple.", pool: div36Pool, inlineCols: 4, inlineRows: 5 },
  { id: "stage-3-7", fullId: "3.7", shortTitle: "3-digit ÷ 2-digit, no remainder", inlineTagline: "3-digit ÷ 2-digit, no remainder.", columnTagline: "Long division — estimate, multiply, subtract.", pool: div37Pool, inlineCols: 4, inlineRows: 5 },
  { id: "stage-3-8", fullId: "3.8", shortTitle: "3-digit ÷ single, remainder", inlineTagline: "3-digit ÷ single, remainder.", columnTagline: "Quotient + remainder.", pool: div38Pool, inlineCols: 4, inlineRows: 5 },
  { id: "stage-3-9", fullId: "3.9", shortTitle: "3-digit ÷ 2-digit, remainder", inlineTagline: "3-digit ÷ 2-digit, remainder.", columnTagline: "Long division with a remainder.", pool: div39Pool, inlineCols: 4, inlineRows: 5 },
  // Stage 4
  { id: "stage-4-1", fullId: "4.1", shortTitle: "Thousands ÷ single", inlineTagline: "Thousands ÷ single digit.", columnTagline: "Round numbers — easy.", pool: div41Pool, inlineCols: 4, inlineRows: 5 },
  { id: "stage-4-2", fullId: "4.2", shortTitle: "4-digit ÷ single, no remainder", inlineTagline: "4-digit ÷ single, no remainder.", columnTagline: "Long division — work through all digits.", pool: div42Pool, inlineCols: 4, inlineRows: 5 },
  { id: "stage-4-3", fullId: "4.3", shortTitle: "4-digit ÷ single, remainder", inlineTagline: "4-digit ÷ single, remainder.", columnTagline: "Long division — write R for the remainder.", pool: div43Pool, inlineCols: 4, inlineRows: 5 },
  { id: "stage-4-4", fullId: "4.4", shortTitle: "4-digit ÷ multiple of 10", inlineTagline: "4-digit ÷ multiple of 10.", columnTagline: "Easy with the trailing zero.", pool: div44Pool, inlineCols: 4, inlineRows: 5 },
  { id: "stage-4-5", fullId: "4.5", shortTitle: "4-digit ÷ teens", inlineTagline: "4-digit ÷ teens (11–19).", columnTagline: "Estimate using nearby multiples.", pool: div45Pool, inlineCols: 4, inlineRows: 5 },
  { id: "stage-4-6", fullId: "4.6", shortTitle: "4-digit ÷ 2-digit, no remainder", inlineTagline: "4-digit ÷ 2-digit, no remainder.", columnTagline: "Long division — careful estimation.", pool: div46Pool, inlineCols: 4, inlineRows: 5 },
  { id: "stage-4-7", fullId: "4.7", shortTitle: "4-digit ÷ 2-digit, remainder", inlineTagline: "4-digit ÷ 2-digit, remainder.", columnTagline: "Long division with remainder.", pool: div47Pool, inlineCols: 4, inlineRows: 5 },
  { id: "stage-4-8", fullId: "4.8", shortTitle: "4-digit ÷ 3-digit, no remainder", inlineTagline: "4-digit ÷ 3-digit, no remainder.", columnTagline: "Long division — estimate big divisor.", pool: div48Pool, inlineCols: 4, inlineRows: 5 },
  { id: "stage-4-9", fullId: "4.9", shortTitle: "4-digit ÷ 3-digit, remainder", inlineTagline: "4-digit ÷ 3-digit, remainder.", columnTagline: "Long division with a 3-digit divisor.", pool: div49Pool, inlineCols: 4, inlineRows: 5 },
  // Stage 5
  { id: "stage-5-1", fullId: "5.1", shortTitle: "Whole ÷ 10/100/1000", inlineTagline: "Whole ÷ 10, 100, or 1000 (→ decimal).", columnTagline: "Move the decimal point left.", pool: div51Pool, inlineCols: 4, inlineRows: 5 },
  { id: "stage-5-2", fullId: "5.2", shortTitle: "Tenths ÷ whole", inlineTagline: "Decimal tenths ÷ whole.", columnTagline: "Divide as whole, put decimal in answer.", pool: div52Pool, inlineCols: 4, inlineRows: 5 },
  { id: "stage-5-3", fullId: "5.3", shortTitle: "Whole ÷ tenths", inlineTagline: "Whole ÷ tenths.", columnTagline: "Multiply both by 10, then divide.", pool: div53Pool, inlineCols: 4, inlineRows: 5 },
  { id: "stage-5-4", fullId: "5.4", shortTitle: "÷ 0.1, 0.01, 0.001", inlineTagline: "Divide by 0.1, 0.01, 0.001.", columnTagline: "Move the decimal right.", pool: div54Pool, inlineCols: 4, inlineRows: 5 },
  { id: "stage-5-5", fullId: "5.5", shortTitle: "Tenths ÷ tenths", inlineTagline: "Tenths ÷ tenths.", columnTagline: "Multiply both by 10 — then divide.", pool: div55Pool, inlineCols: 4, inlineRows: 5 },
  { id: "stage-5-6", fullId: "5.6", shortTitle: "Hundredths ÷ hundredths", inlineTagline: "Hundredths ÷ hundredths.", columnTagline: "Multiply both by 100 — then divide.", pool: div56Pool, inlineCols: 4, inlineRows: 5 },
  { id: "stage-5-7", fullId: "5.7", shortTitle: "Larger decimal ÷ tenths", inlineTagline: "Larger decimal ÷ tenths.", columnTagline: "Multiply by 10, then divide.", pool: div57Pool, inlineCols: 4, inlineRows: 5 },
  { id: "stage-5-8", fullId: "5.8", shortTitle: "Mixed decimal division", inlineTagline: "Mixed decimal ÷ tenths.", columnTagline: "Larger numbers — same method.", pool: div58Pool, inlineCols: 4, inlineRows: 5 },
  { id: "stage-5-9", fullId: "5.9", shortTitle: "Complex decimal division", inlineTagline: "Larger decimal ÷ hundredths.", columnTagline: "Multiply by 100, then divide.", pool: div59Pool, inlineCols: 4, inlineRows: 5 },
];

for (const s of DIVISION_STAGES) s.operation = "Division";

const DIVISION_BY_ID: Record<string, DivisionStageSpec> = Object.fromEntries(
  DIVISION_STAGES.map((s) => [s.id, s]),
);

export function getDivisionStage(id: string): DivisionStageSpec | null {
  return DIVISION_BY_ID[id] ?? null;
}

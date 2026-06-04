// Stage 2 problem pool specs — each generator mirrors the corresponding
// level in solveit/src/pages/FourOperations/MultiplicationLevel.jsx so the
// worksheets match what students see in the app.

import type { InlineProblem } from "@/components/MultiplicationInlineWorksheet";

export type MultiplicationStageSpec = {
  id: string;          // url slug, e.g. "stage-2-1"
  fullId: string;      // display id, e.g. "2.1"
  shortTitle: string;  // banner subtitle / card description
  inlineTagline: string;
  columnTagline: string;
  pool: () => InlineProblem[];
};

// ── Pool generators ───────────────────────────────────────────────────────

function stage21Pool(): InlineProblem[] {
  // 2.1: twoDigit 11–49, oneDigit 2–4, no carrying on either column.
  const out: InlineProblem[] = [];
  for (let b = 2; b <= 4; b++) {
    for (let a = 11; a <= 49; a++) {
      const tens = Math.floor(a / 10);
      const ones = a % 10;
      if (tens * b >= 10 || ones * b >= 10) continue;
      out.push({ a, b });
    }
  }
  return out;
}

function stage22Pool(): InlineProblem[] {
  // 2.2: round 2-digit (10, 20, ..., 90) × 2–9
  const out: InlineProblem[] = [];
  for (const a of [10, 20, 30, 40, 50, 60, 70, 80, 90]) {
    for (let b = 2; b <= 9; b++) {
      out.push({ a, b });
    }
  }
  return out;
}

function stage23Pool(): InlineProblem[] {
  // 2.3: 2-digit 11–90 (not multiples of 10) × 4–8
  const out: InlineProblem[] = [];
  for (let a = 11; a <= 90; a++) {
    if (a % 10 === 0) continue;
    for (let b = 4; b <= 8; b++) {
      out.push({ a, b });
    }
  }
  return out;
}

function stage24Pool(): InlineProblem[] {
  // 2.4: 2-digit 40–99 (not multiples of 10) × 6–9
  const out: InlineProblem[] = [];
  for (let a = 40; a <= 99; a++) {
    if (a % 10 === 0) continue;
    for (let b = 6; b <= 9; b++) {
      out.push({ a, b });
    }
  }
  return out;
}

function stage25Pool(): InlineProblem[] {
  // 2.5: 2-digit 11–90 × multiple of 10 (10, 20, 30, 40, 50)
  const out: InlineProblem[] = [];
  for (let a = 11; a <= 90; a++) {
    for (const b of [10, 20, 30, 40, 50]) {
      out.push({ a, b });
    }
  }
  return out;
}

function stage26Pool(): InlineProblem[] {
  // 2.6: 2-digit 11–34 with (tens + ones) < 10, × 11
  const out: InlineProblem[] = [];
  for (let a = 11; a <= 34; a++) {
    const tens = Math.floor(a / 10);
    const ones = a % 10;
    if (tens + ones >= 10) continue;
    out.push({ a, b: 11 });
  }
  return out;
}

function stage27Pool(): InlineProblem[] {
  // 2.7: 2-digit 20–89 (not multiples of 10) × teen (12–19)
  const out: InlineProblem[] = [];
  for (let a = 20; a <= 89; a++) {
    if (a % 10 === 0) continue;
    for (let b = 12; b <= 19; b++) {
      out.push({ a, b });
    }
  }
  return out;
}

function stage28Pool(): InlineProblem[] {
  // 2.8: 11–30 × 11–19
  const out: InlineProblem[] = [];
  for (let a = 11; a <= 30; a++) {
    for (let b = 11; b <= 19; b++) {
      out.push({ a, b });
    }
  }
  return out;
}

function stage29Pool(): InlineProblem[] {
  // 2.9: 40–99 × 20–60
  const out: InlineProblem[] = [];
  for (let a = 40; a <= 99; a++) {
    for (let b = 20; b <= 60; b++) {
      out.push({ a, b });
    }
  }
  return out;
}

// ── Stage registry ────────────────────────────────────────────────────────

export const MULTIPLICATION_STAGES: MultiplicationStageSpec[] = [
  {
    id: "stage-2-1",
    fullId: "2.1",
    shortTitle: "Two-digit × one-digit, no carrying",
    inlineTagline: "Two-digit × one-digit, no carrying.",
    columnTagline: "Vertical column form — work each digit, no carrying.",
    pool: stage21Pool,
  },
  {
    id: "stage-2-2",
    fullId: "2.2",
    shortTitle: "Round two-digit × one-digit",
    inlineTagline: "Round two-digit × one-digit (10, 20, … × 2–9).",
    columnTagline: "Round numbers — line up the zero, multiply the tens.",
    pool: stage22Pool,
  },
  {
    id: "stage-2-3",
    fullId: "2.3",
    shortTitle: "Two-digit × one-digit, with carrying",
    inlineTagline: "Two-digit × one-digit, with carrying.",
    columnTagline: "Vertical column form — carry when the product is 10 or more.",
    pool: stage23Pool,
  },
  {
    id: "stage-2-4",
    fullId: "2.4",
    shortTitle: "Two-digit × one-digit, larger carrying",
    inlineTagline: "Larger two-digit × one-digit, lots of carrying.",
    columnTagline: "Vertical column form — careful with multiple carries.",
    pool: stage24Pool,
  },
  {
    id: "stage-2-5",
    fullId: "2.5",
    shortTitle: "Two-digit × multiple of 10",
    inlineTagline: "Two-digit × a multiple of 10.",
    columnTagline: "Multiply by the tens digit, write a placeholder zero.",
    pool: stage25Pool,
  },
  {
    id: "stage-2-6",
    fullId: "2.6",
    shortTitle: "Two-digit × 11, no carrying",
    inlineTagline: "Two-digit × 11, no carrying.",
    columnTagline: "Two partial products — multiply by the ones, then the tens.",
    pool: stage26Pool,
  },
  {
    id: "stage-2-7",
    fullId: "2.7",
    shortTitle: "Two-digit × teens, with carrying",
    inlineTagline: "Two-digit × teens (12–19), with carrying.",
    columnTagline: "Two partial products and carries — line them up carefully.",
    pool: stage27Pool,
  },
  {
    id: "stage-2-8",
    fullId: "2.8",
    shortTitle: "Two two-digit numbers, smaller",
    inlineTagline: "Two two-digit numbers (smaller range, 11–30 × 11–19).",
    columnTagline: "Long multiplication — two partial products, then add.",
    pool: stage28Pool,
  },
  {
    id: "stage-2-9",
    fullId: "2.9",
    shortTitle: "Two two-digit numbers, larger",
    inlineTagline: "Two two-digit numbers (larger range, 40–99 × 20–60).",
    columnTagline: "Long multiplication — bigger numbers, same method.",
    pool: stage29Pool,
  },
];

export const STAGE_BY_ID: Record<string, MultiplicationStageSpec> = Object.fromEntries(
  MULTIPLICATION_STAGES.map((s) => [s.id, s]),
);

export function getStage(id: string): MultiplicationStageSpec | null {
  return STAGE_BY_ID[id] ?? null;
}

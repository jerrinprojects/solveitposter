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

// ── Stage 3 ──────────────────────────────────────────────────────────────

function stage31Pool(): InlineProblem[] {
  // 3.1: round 3-digit (100, 200, …, 900) × 2–9
  const out: InlineProblem[] = [];
  for (const a of [100, 200, 300, 400, 500, 600, 700, 800, 900]) {
    for (let b = 2; b <= 9; b++) out.push({ a, b });
  }
  return out;
}

function stage32Pool(): InlineProblem[] {
  // 3.2: tens-ending 3-digit (110, 120, …, 990 excluding multiples of 100) × 2–9
  // solveit builds threeDigit = hundreds*100 + tens*10 with hundreds 1-9, tens 1-9.
  const out: InlineProblem[] = [];
  for (let h = 1; h <= 9; h++) {
    for (let t = 1; t <= 9; t++) {
      const a = h * 100 + t * 10;
      for (let b = 2; b <= 9; b++) out.push({ a, b });
    }
  }
  return out;
}

function stage33Pool(): InlineProblem[] {
  // 3.3: 3-digit × 1-digit (×2 or ×3) with no carrying.
  // Solveit: oneDigit = 2 or 3, maxDigit = 4 if 2 else 3, then hundreds 1..maxDigit,
  // tens 0..maxDigit, ones 0..maxDigit. Each digit × oneDigit must stay < 10.
  const out: InlineProblem[] = [];
  for (const b of [2, 3]) {
    const maxDigit = b === 2 ? 4 : 3;
    for (let h = 1; h <= maxDigit; h++) {
      for (let t = 0; t <= maxDigit; t++) {
        for (let o = 0; o <= maxDigit; o++) {
          out.push({ a: h * 100 + t * 10 + o, b });
        }
      }
    }
  }
  return out;
}

function stage34Pool(): InlineProblem[] {
  // 3.4: 3-digit 100–999 NOT multiples of 100, × 2–9
  const out: InlineProblem[] = [];
  for (let a = 100; a <= 999; a++) {
    if (a % 100 === 0) continue;
    for (let b = 2; b <= 9; b++) out.push({ a, b });
  }
  return out;
}

function stage35Pool(): InlineProblem[] {
  // 3.5: 3-digit 100–500 × multiple of 10 (10, 20, 30, 40, 50)
  const out: InlineProblem[] = [];
  for (let a = 100; a <= 500; a++) {
    for (const b of [10, 20, 30, 40, 50]) out.push({ a, b });
  }
  return out;
}

function stage36Pool(): InlineProblem[] {
  // 3.6: 3-digit 100–400 × teen (11–19)
  const out: InlineProblem[] = [];
  for (let a = 100; a <= 400; a++) {
    for (let b = 11; b <= 19; b++) out.push({ a, b });
  }
  return out;
}

function stage37Pool(): InlineProblem[] {
  // 3.7: 3-digit 100–499 × 2-digit 21–49
  const out: InlineProblem[] = [];
  for (let a = 100; a <= 499; a++) {
    for (let b = 21; b <= 49; b++) out.push({ a, b });
  }
  return out;
}

function stage38Pool(): InlineProblem[] {
  // 3.8: 3-digit 300–700 × 2-digit 50–99
  const out: InlineProblem[] = [];
  for (let a = 300; a <= 700; a++) {
    for (let b = 50; b <= 99; b++) out.push({ a, b });
  }
  return out;
}

function stage39Pool(): InlineProblem[] {
  // 3.9: 3-digit 100–299 × 3-digit 100–199
  const out: InlineProblem[] = [];
  for (let a = 100; a <= 299; a++) {
    for (let b = 100; b <= 199; b++) out.push({ a, b });
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
  // ── Stage 3 ───────────────────────────────────────────────────────────
  {
    id: "stage-3-1",
    fullId: "3.1",
    shortTitle: "Round three-digit × one-digit",
    inlineTagline: "Round 3-digit (100, 200, … × 2–9).",
    columnTagline: "Round numbers — line up the zeros, multiply the hundreds.",
    pool: stage31Pool,
  },
  {
    id: "stage-3-2",
    fullId: "3.2",
    shortTitle: "Tens-ending three-digit × one-digit",
    inlineTagline: "Tens-ending 3-digit (110, 120, … × 2–9).",
    columnTagline: "Numbers ending in 0 — bring the zero down, multiply the tens.",
    pool: stage32Pool,
  },
  {
    id: "stage-3-3",
    fullId: "3.3",
    shortTitle: "Three-digit × one-digit, no carrying",
    inlineTagline: "3-digit × 1-digit, no carrying.",
    columnTagline: "Vertical column form — each digit on its own, no carries.",
    pool: stage33Pool,
  },
  {
    id: "stage-3-4",
    fullId: "3.4",
    shortTitle: "Three-digit × one-digit, with carrying",
    inlineTagline: "3-digit × 1-digit, with carrying.",
    columnTagline: "Vertical column form — carry across hundreds when needed.",
    pool: stage34Pool,
  },
  {
    id: "stage-3-5",
    fullId: "3.5",
    shortTitle: "Three-digit × multiple of 10",
    inlineTagline: "3-digit × a multiple of 10.",
    columnTagline: "Multiply by the tens digit, write a placeholder zero.",
    pool: stage35Pool,
  },
  {
    id: "stage-3-6",
    fullId: "3.6",
    shortTitle: "Three-digit × teens",
    inlineTagline: "3-digit × teens (11–19).",
    columnTagline: "Two partial products — multiply by ones, then tens.",
    pool: stage36Pool,
  },
  {
    id: "stage-3-7",
    fullId: "3.7",
    shortTitle: "Three-digit × two-digit, smaller",
    inlineTagline: "3-digit × 2-digit (smaller range, 100–499 × 21–49).",
    columnTagline: "Long multiplication — two partial products, then add.",
    pool: stage37Pool,
  },
  {
    id: "stage-3-8",
    fullId: "3.8",
    shortTitle: "Three-digit × two-digit, larger",
    inlineTagline: "3-digit × 2-digit (larger range, 300–700 × 50–99).",
    columnTagline: "Long multiplication — bigger partial products, careful with carries.",
    pool: stage38Pool,
  },
  {
    id: "stage-3-9",
    fullId: "3.9",
    shortTitle: "Two three-digit numbers",
    inlineTagline: "Two 3-digit numbers (100–299 × 100–199).",
    columnTagline: "Long multiplication — three partial products, then add them all.",
    pool: stage39Pool,
  },
];

export const STAGE_BY_ID: Record<string, MultiplicationStageSpec> = Object.fromEntries(
  MULTIPLICATION_STAGES.map((s) => [s.id, s]),
);

export function getStage(id: string): MultiplicationStageSpec | null {
  return STAGE_BY_ID[id] ?? null;
}

import type { PosterSkill, PosterMeta, FooterData } from "@/types";

export const posterMeta: PosterMeta = {
  subject: "YEAR OPERATIONS",
  phase: "Phase 3",
  year: "Year 7",
  theme: "Integers · Powers of 10 · Fractions, Decimals & %",
  brand: "Solveitmaths.com",
};

export const posterSkills: PosterSkill[] = [
  { code: "7.1",  description: "I can add a negative to a positive when the answer is positive." },
  { code: "7.2",  description: "I can add a negative to a positive when the answer is negative." },
  { code: "7.3",  description: "I can add two negative numbers." },
  { code: "7.4",  description: "I can subtract integers including negatives." },
  { code: "7.5",  description: "I can add and subtract integers mixed together." },
  { code: "7.6",  description: "I can add and subtract three integers." },
  { code: "7.7",  description: "I can add or subtract larger integers and decimals." },
  { code: "7.8",  description: "I can multiply or divide a decimal by 10, 100, or 1000." },
  { code: "7.9",  description: "I can solve problems with exponents and other operations." },
  { code: "7.10", description: "I can solve problems with brackets and exponents." },
  { code: "7.11", description: "I can use the order of operations with negative numbers." },
  { code: "7.12", description: "I can solve complex expressions following the order of operations." },
  { code: "7.13", description: "I can multiply a whole number by a fraction." },
  { code: "7.14", description: "I can multiply a decimal by a whole number." },
  { code: "7.15", description: "I can divide a whole number by a unit fraction." },
  { code: "7.16", description: "I can divide a fraction by a whole number." },
  { code: "7.17", description: "I can divide by a two-digit number." },
  { code: "7.18", description: "I can find a percentage of a whole number." },
  { code: "7.19", description: "I can find the whole when given a percentage." },
  { code: "7.20", description: "I can find a non-unit fraction of a whole number." },
  { code: "7.21", description: "I can find the whole when given a fraction." },
  { code: "7.22", description: "I can multiply integers including negatives." },
  { code: "7.23", description: "I can divide integers including negatives." },
];

// 23 skills paginated 4 + 5 + 5 + 5 + 4 — keeps the integer block, the
// BEDMAS block, the fraction-ops block, and the %-and-non-unit-fraction
// block roughly on consecutive pages.
export const pageSizes = [4, 5, 5, 5, 4];

export const footerData: FooterData = { brand: "Solveitmaths.com" };

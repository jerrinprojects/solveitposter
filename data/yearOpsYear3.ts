import type { PosterSkill, PosterMeta, FooterData } from "@/types";

export const posterMeta: PosterMeta = {
  subject: "YEAR OPERATIONS",
  phase: "Phase 1",
  year: "Year 3",
  theme: "Three-Digit Numbers & More Tables",
  brand: "Solveitmaths.com",
};

export const posterSkills: PosterSkill[] = [
  { code: "3.1",  description: "I can find number pairs that make 100." },
  { code: "3.2",  description: "I can add two whole hundreds." },
  { code: "3.3",  description: "I can add two three-digit numbers without renaming." },
  { code: "3.4",  description: "I can add two three-digit numbers, renaming the ones." },
  { code: "3.5",  description: "I can add two three-digit numbers with renaming more than once." },
  { code: "3.6",  description: "I can subtract two three-digit numbers without renaming." },
  { code: "3.7",  description: "I can subtract two three-digit numbers with renaming." },
  { code: "3.8",  description: "I can use my 3, 4, and 8 times tables." },
  { code: "3.9",  description: "I can use all my tables for 2–5, 8, and 10." },
  { code: "3.10", description: "I can multiply a two-digit number by a single digit." },
  { code: "3.11", description: "I can divide by a single digit with no remainder." },
  { code: "3.12", description: "I can add or subtract three-digit numbers in mixed problems." },
  { code: "3.13", description: "I can solve multi-step add and subtract problems within 100." },
];

// 13 skills paginated 4 + 5 + 4.
export const pageSizes = [4, 5, 4];

export const footerData: FooterData = { brand: "Solveitmaths.com" };

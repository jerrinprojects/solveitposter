import type { PosterSkill, PosterMeta, FooterData } from "@/types";

export const posterMeta: PosterMeta = {
  subject: "YEAR OPERATIONS",
  phase: "Phase 1",
  year: "Year 2",
  theme: "Two-Digit Numbers & First Tables",
  brand: "Solveitmaths.com",
};

export const posterSkills: PosterSkill[] = [
  { code: "2.1",  description: "I can double a number to 20." },
  { code: "2.2",  description: "I can add a single digit to a multiple of 10." },
  { code: "2.3",  description: "I can add two multiples of 10." },
  { code: "2.4",  description: "I can add a single digit to a two-digit number without renaming." },
  { code: "2.5",  description: "I can subtract a single digit from a two-digit number without renaming." },
  { code: "2.6",  description: "I can add a single digit to a two-digit number with renaming." },
  { code: "2.7",  description: "I can subtract a single digit from a two-digit number with renaming." },
  { code: "2.8",  description: "I can add two two-digit numbers without renaming." },
  { code: "2.9",  description: "I can subtract two two-digit numbers without renaming." },
  { code: "2.10", description: "I can add two two-digit numbers with renaming." },
  { code: "2.11", description: "I can subtract two two-digit numbers with renaming." },
  { code: "2.12", description: "I can add three single-digit numbers." },
  { code: "2.13", description: "I can use my 2, 5, and 10 times tables." },
  { code: "2.14", description: "I can use division facts for 2, 5, and 10." },
  { code: "2.15", description: "I can add a single digit to 100." },
  { code: "2.16", description: "I can find half of a number up to 20." },
  { code: "2.17", description: "I can solve multi-step add and subtract problems within 20." },
];

// 17 skills paginated 4 + 5 + 5 + 3.
export const pageSizes = [4, 5, 5, 3];

export const footerData: FooterData = { brand: "Solveitmaths.com" };

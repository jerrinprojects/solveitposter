import type { PosterSkill, PosterMeta, FooterData } from "@/types";

export const posterMeta: PosterMeta = {
  subject: "YEAR OPERATIONS",
  phase: "Phase 2",
  year: "Year 4",
  theme: "Four-Digit Operations & Decimal Tenths",
  brand: "Solveitmaths.com",
};

export const posterSkills: PosterSkill[] = [
  { code: "4.1",  description: "I can use my 6, 7, and 9 times tables." },
  { code: "4.2",  description: "I can use all my times tables for 2 to 10." },
  { code: "4.3",  description: "I can use division facts for 2 to 10." },
  { code: "4.4",  description: "I can add two four-digit numbers without renaming." },
  { code: "4.5",  description: "I can add two four-digit numbers with renaming." },
  { code: "4.6",  description: "I can subtract two four-digit numbers without renaming." },
  { code: "4.7",  description: "I can subtract two four-digit numbers with renaming." },
  { code: "4.8",  description: "I can multiply a three-digit number by a single digit." },
  { code: "4.9",  description: "I can divide a three-digit number by a single digit with no remainder." },
  { code: "4.10", description: "I can add a whole number and a number with tenths." },
  { code: "4.11", description: "I can add two numbers with tenths without renaming." },
  { code: "4.12", description: "I can add two numbers with tenths with renaming." },
  { code: "4.13", description: "I can subtract a number with tenths from another." },
  { code: "4.14", description: "I can multiply or divide a number by 0 or 1." },
];

// 14 skills paginated 4 + 5 + 5.
export const pageSizes = [4, 5, 5];

export const footerData: FooterData = { brand: "Solveitmaths.com" };

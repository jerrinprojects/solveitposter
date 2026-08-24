import type { PosterSkill, PosterMeta, FooterData } from "@/types";

export const posterMeta: PosterMeta = {
  subject: "YEAR OPERATIONS",
  phase: "Phase 2",
  year: "Year 5",
  theme: "Big Numbers & Decimal Hundredths",
  brand: "Solveitmaths.com",
};

// Codes follow solveit: 5.1–5.10, 5.12, 5.13. 5.11 retired (moved to Y6).
export const posterSkills: PosterSkill[] = [
  { code: "5.1",  description: "I can use my 11 and 12 times tables." },
  { code: "5.2",  description: "I can add five- and six-digit numbers." },
  { code: "5.3",  description: "I can subtract five- and six-digit numbers." },
  { code: "5.4",  description: "I can multiply a two-digit number by another two-digit number." },
  { code: "5.5",  description: "I can divide and write the remainder as a whole number." },
  { code: "5.6",  description: "I can add a number with hundredths to a whole number or tenths." },
  { code: "5.7",  description: "I can add two numbers with hundredths without renaming." },
  { code: "5.8",  description: "I can add two numbers with hundredths with renaming." },
  { code: "5.9",  description: "I can subtract a number with hundredths from another." },
  { code: "5.10", description: "I can add or subtract decimals with different place values." },
  { code: "5.12", description: "I can multiply a three- or four-digit number by a single digit." },
  { code: "5.13", description: "I can multiply a decimal by 10 or 100." },
];

// 12 skills paginated 4 + 4 + 4.
export const pageSizes = [4, 4, 4];

export const footerData: FooterData = { brand: "Solveitmaths.com" };

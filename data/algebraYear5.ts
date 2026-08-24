import type { PosterSkill, PosterMeta, FooterData } from "@/types";

export const posterMeta: PosterMeta = {
  subject: "ALGEBRA",
  phase: "Phase 2",
  year: "Year 5",
  theme: "Comparing Expressions & Decimal Patterns",
  brand: "Solveitmaths.com",
};

export const posterSkills: PosterSkill[] = [
  { code: "5.1", description: "I can compare two + or − expressions with >, <, or =." },
  { code: "5.2", description: "I can compare two × expressions with >, <, or =." },
  { code: "5.3", description: "I can check if a sentence with very big numbers is true or false." },
  { code: "5.4", description: "I can find a missing number with very big numbers." },
  { code: "5.5", description: "I can carry on a number pattern with decimals." },
];

// 5 skills paginated 3 + 2.
export const pageSizes = [3, 2];

export const footerData: FooterData = { brand: "Solveitmaths.com" };

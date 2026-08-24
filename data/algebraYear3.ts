import type { PosterSkill, PosterMeta, FooterData } from "@/types";

export const posterMeta: PosterMeta = {
  subject: "ALGEBRA",
  phase: "Phase 1",
  year: "Year 3",
  theme: "Bigger Numbers & Growing Patterns",
  brand: "Solveitmaths.com",
};

export const posterSkills: PosterSkill[] = [
  { code: "3.1", description: "I can compare bigger numbers with >, <, or =." },
  { code: "3.2", description: "I can find a missing number in problems with bigger numbers." },
  { code: "3.3", description: "I can check if a sentence with any operations is true or false." },
  { code: "3.4", description: "I can carry on a number pattern that grows." },
  { code: "3.5", description: "I can find the missing number in a growing pattern." },
];

// 5 skills paginated 3 + 2.
export const pageSizes = [3, 2];

export const footerData: FooterData = { brand: "Solveitmaths.com" };

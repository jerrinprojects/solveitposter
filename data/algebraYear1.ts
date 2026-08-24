import type { PosterSkill, PosterMeta, FooterData } from "@/types";

export const posterMeta: PosterMeta = {
  subject: "ALGEBRA",
  phase: "Phase 1",
  year: "Year 1",
  theme: "Patterns & Equations",
  brand: "Solveitmaths.com",
};

export const posterSkills: PosterSkill[] = [
  { code: "1.1", description: "I can carry on a pattern with three items." },
  { code: "1.2", description: "I can find the missing item in a three-item pattern." },
  { code: "1.3", description: "I can find a missing number in a + or − sentence." },
  { code: "1.4", description: "I can balance an addition sentence (both sides equal)." },
  { code: "1.5", description: "I can balance a subtraction sentence (both sides equal)." },
  { code: "1.6", description: "I can check if a + or − sentence is true or false." },
];

// 6 skills paginated 4 + 2.
export const pageSizes = [4, 2];

export const footerData: FooterData = { brand: "Solveitmaths.com" };

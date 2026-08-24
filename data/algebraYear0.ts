import type { PosterSkill, PosterMeta, FooterData } from "@/types";

export const posterMeta: PosterMeta = {
  subject: "ALGEBRA",
  phase: "Phase 1",
  year: "Year 0",
  theme: "Patterns & Position",
  brand: "Solveitmaths.com",
};

export const posterSkills: PosterSkill[] = [
  { code: "0.1", description: "I can carry on a pattern that repeats." },
  { code: "0.2", description: "I can carry on a colour pattern." },
  { code: "0.3", description: "I can find the picture that is missing." },
  { code: "0.4", description: "I can say which is 1st, 2nd, 3rd, 4th, or 5th." },
];

// 4 skills on a single page.
export const pageSizes = [4];

export const footerData: FooterData = { brand: "Solveitmaths.com" };

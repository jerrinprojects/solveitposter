import type { PosterSkill, PosterMeta, FooterData } from "@/types";

export const posterMeta: PosterMeta = {
  subject: "ALGEBRA",
  phase: "Phase 2",
  year: "Year 4",
  theme: "Large Numbers & Growing Patterns",
  brand: "Solveitmaths.com",
};

export const posterSkills: PosterSkill[] = [
  { code: "4.1", description: "I can check if a + or − sentence with bigger numbers is true or false." },
  { code: "4.2", description: "I can find a missing number in + or − sentences with bigger numbers." },
  { code: "4.3", description: "I can check if a × or ÷ sentence is true or false." },
  { code: "4.4", description: "I can find a missing number in a × or ÷ sentence." },
  { code: "4.5", description: "I can carry on a number pattern with bigger jumps." },
  { code: "4.6", description: "I can carry on a pattern that doubles or triples." },
  { code: "4.7", description: "I can find the next figure in a growing pattern." },
];

// 7 skills paginated 4 + 3.
export const pageSizes = [4, 3];

export const footerData: FooterData = { brand: "Solveitmaths.com" };

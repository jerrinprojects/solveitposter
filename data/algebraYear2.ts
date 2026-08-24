import type { PosterSkill, PosterMeta, FooterData } from "@/types";

export const posterMeta: PosterMeta = {
  subject: "ALGEBRA",
  phase: "Phase 1",
  year: "Year 2",
  theme: "Compare, Operations & Patterns",
  brand: "Solveitmaths.com",
};

export const posterSkills: PosterSkill[] = [
  { code: "2.1", description: "I can use >, <, or = to compare two numbers." },
  { code: "2.2", description: "I can check if a comparison is true or false." },
  { code: "2.3", description: "I can find a missing number in a × or ÷ sentence." },
  { code: "2.4", description: "I can find a missing number in any open sentence." },
  { code: "2.5", description: "I can check if any maths sentence is true or false." },
  { code: "2.6", description: "I can find the item at a given position in a repeating pattern." },
];

// 6 skills paginated 4 + 2.
export const pageSizes = [4, 2];

export const footerData: FooterData = { brand: "Solveitmaths.com" };

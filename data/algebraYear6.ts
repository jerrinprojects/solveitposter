import type { PosterSkill, PosterMeta, FooterData } from "@/types";

export const posterMeta: PosterMeta = {
  subject: "ALGEBRA",
  phase: "Phase 2",
  year: "Year 6",
  theme: "Order of Operations, Rules & Coordinate Plane",
  brand: "Solveitmaths.com",
};

export const posterSkills: PosterSkill[] = [
  { code: "6.1", description: "I can check a sentence using the order of operations." },
  { code: "6.2", description: "I can find a missing number using the order of operations." },
  { code: "6.3", description: "I can find the rule for a number pattern." },
  { code: "6.4", description: "I can count how many dots or shapes are in the next figure." },
  { code: "6.5", description: "I can read the coordinates of a point on a grid." },
  { code: "6.6", description: "I can plot a point on a grid using its coordinates." },
  { code: "6.7", description: "I can use a rule to make a table, then plot a point." },
];

// 7 skills paginated 4 + 3.
export const pageSizes = [4, 3];

export const footerData: FooterData = { brand: "Solveitmaths.com" };

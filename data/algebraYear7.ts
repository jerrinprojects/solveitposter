import type { PosterSkill, PosterMeta, FooterData } from "@/types";

export const posterMeta: PosterMeta = {
  subject: "ALGEBRA",
  phase: "Phase 3",
  year: "Year 7",
  theme: "Solving Equations & the Coordinate Plane",
  brand: "Solveitmaths.com",
};

export const posterSkills: PosterSkill[] = [
  { code: "7.1", description: "I can solve a one-step equation." },
  { code: "7.2", description: "I can solve a two-step equation." },
  { code: "7.3", description: "I can find the value of an expression by substituting a number for the letter." },
  { code: "7.4", description: "I can collect like terms to simplify an expression." },
  { code: "7.5", description: "I can rearrange a formula to find a different subject." },
  { code: "7.6", description: "I can plot a point in any of the four quadrants." },
  { code: "7.7", description: "I can find the linear rule for a number pattern." },
  { code: "7.8", description: "I can check sentences with operations and inequalities." },
];

// 8 skills paginated 4 + 4.
export const pageSizes = [4, 4];

export const footerData: FooterData = { brand: "Solveitmaths.com" };

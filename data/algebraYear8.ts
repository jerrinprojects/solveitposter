import type { PosterSkill, PosterMeta, FooterData } from "@/types";

export const posterMeta: PosterMeta = {
  subject: "ALGEBRA",
  phase: "Phase 3",
  year: "Year 8",
  theme: "Expressions & Equations",
  brand: "Solveitmaths.com",
};

export const posterSkills: PosterSkill[] = [
  { code: "8.1", description: "I can solve an equation when the answer is a decimal." },
  { code: "8.2", description: "I can solve an equation when the answer is a negative number." },
  { code: "8.3", description: "I can solve an inequality and show it on a number line." },
  { code: "8.4", description: "I can expand and simplify an expression with brackets." },
  { code: "8.5", description: "I can factorise an expression by taking out a common factor." },
  { code: "8.6", description: "I can substitute a negative number into an expression." },
  { code: "8.7", description: "I can carry on a square, triangular, or cube number pattern." },
  { code: "8.8", description: "I can rearrange a formula in two steps." },
];

// 8 skills paginated 4 + 4.
export const pageSizes = [4, 4];

export const footerData: FooterData = { brand: "Solveitmaths.com" };

import type { PosterSkill, PosterMeta, FooterData } from "@/types";

export const posterMeta: PosterMeta = {
  subject: "YEAR OPERATIONS",
  phase: "Phase 1",
  year: "Year 0",
  theme: "Addition & Subtraction within 5",
  brand: "Solveitmaths.com",
};

export const posterSkills: PosterSkill[] = [
  { code: "0.1", description: "I can add small numbers that make 3 or less." },
  { code: "0.2", description: "I can add small numbers that make 5 or less." },
  { code: "0.3", description: "I can take a small number away from 3 or less." },
  { code: "0.4", description: "I can take a small number away from 5 or less." },
  { code: "0.5", description: "I can add or take away within 5." },
];

// 5 skills on a single page — keeps Y0 tight and avoids stranding one
// skill alone on a second page.
export const pageSizes = [5];

export const footerData: FooterData = { brand: "Solveitmaths.com" };

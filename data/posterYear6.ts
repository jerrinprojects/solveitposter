import type { PosterSkill, PosterMeta, FooterData } from "@/types";

export const posterMeta: PosterMeta = {
  subject: "NUMBER STRUCTURE",
  phase: "Phase 2",
  year: "Year 6",
  theme: "Factors, Powers & Negatives",
  brand: "Solveitmaths.com",
};

export const posterSkills: PosterSkill[] = [
  { code: "6.1", description: "I can find a factor pair for a given number." },
  { code: "6.2", description: "I can find all the factor pairs for a given number." },
  { code: "6.3", description: "I can write a square or cube number as a multiplication." },
  { code: "6.4", description: "I can write a multiplication as a square or cube number." },
  { code: "6.5", description: "I can calculate the value of a square or cube number." },
  { code: "6.6", description: "I can identify square and cube numbers from a list." },
  { code: "6.7", description: "I can count forwards and backwards through zero." },
  { code: "6.8", description: "I can read and write negative numbers in words." },
  { code: "6.9", description: "I can find a negative number on a number line." },
];

export const footerData: FooterData = { brand: "Solveitmaths.com" };

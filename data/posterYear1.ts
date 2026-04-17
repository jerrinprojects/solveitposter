import type { PosterSkill, PosterMeta, FooterData } from "@/types";

export const posterMeta: PosterMeta = {
  subject: "NUMBER STRUCTURE",
  phase: "Phase 1",
  year: "Year 1",
  theme: "Count to 100",
  brand: "Solveitmaths.com",
};

export const posterSkills: PosterSkill[] = [
  { code: "1.1", description: "I can count forwards or backwards up to 100." },
  { code: "1.2", description: "I can skip count in 2s, 5s, or 10s up to 100 and fill the blank." },
  { code: "1.3", description: "I can use tens and ones to make a number up to 100 and write the total." },
  { code: "1.4", description: "I can write numbers up to 100 in words." },
  { code: "1.5", description: "I can write the number and the number word for a value up to 100." },
  { code: "1.6", description: "I can compare two numbers up to 100 and choose greater or less." },
  { code: "1.7", description: "I can order three numbers up to 100." },
  { code: "1.8", description: "I can solve number bonds with tens by finding the missing part." },
  { code: "1.9", description: "I can solve number bonds up to 100 by finding the missing part." },
];

export const footerData: FooterData = { brand: "Solveitmaths.com" };

import type { PosterSkill, PosterMeta, FooterData } from "@/types";

export const posterMeta: PosterMeta = {
  subject: "NUMBER STRUCTURES",
  phase: "Phase 1",
  year: "Year 2",
  theme: "Count to 120",
  brand: "Solveitmaths.com",
};

export const posterSkills: PosterSkill[] = [
  { code: "2.1", description: "I can count forwards or backwards up to 120." },
  { code: "2.2", description: "I can skip count in 2s, 5s, or 10s up to 120 and fill the blank." },
  { code: "2.3", description: "I can use tens and ones to make a number up to 120 and write the total." },
  { code: "2.4", description: "I can write numbers up to 120 in words." },
  { code: "2.5", description: "I can write the number and the number word for a value up to 120." },
  { code: "2.6", description: "I can compare two numbers up to 120 and choose greater or less." },
  { code: "2.7", description: "I can order three numbers up to 120." },
  { code: "2.8", description: "I can solve number bonds with tens by finding the missing part." },
  { code: "2.9", description: "I can solve number bonds up to 120 by finding the missing part." },
];

export const footerData: FooterData = { brand: "Solveitmaths.com" };

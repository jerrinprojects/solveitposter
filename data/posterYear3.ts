import type { PosterSkill, PosterMeta, FooterData } from "@/types";

export const posterMeta: PosterMeta = {
  subject: "NUMBER STRUCTURE",
  phase: "Phase 1",
  year: "Year 3",
  theme: "Count to 1000",
  brand: "Solveitmaths.com",
};

export const posterSkills: PosterSkill[] = [
  { code: "3.1", description: "I can count forwards or backwards up to 1,000 and write the missing number." },
  { code: "3.2", description: "I can skip count in 2s, 5s, or 10s up to 1,000 and fill the blank." },
  { code: "3.3", description: "I can use hundreds, tens, and ones to make a number up to 1,000 and write the total." },
  { code: "3.4", description: "I can write numbers up to 1,000 in words." },
  { code: "3.5", description: "I can find the digit in the ones, tens, or hundreds place." },
  { code: "3.6", description: "I can compare two numbers up to 1,000 and choose greater or less." },
  { code: "3.7", description: "I can order three numbers up to 1,000." },
  { code: "3.8", description: "I can solve number bonds with hundreds by finding the missing part." },
  { code: "3.9", description: "I can solve number bonds up to 1,000 by finding the missing part." },
];

export const footerData: FooterData = { brand: "Solveitmaths.com" };

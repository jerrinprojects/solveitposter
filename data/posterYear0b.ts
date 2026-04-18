import type { PosterSkill, PosterMeta, FooterData } from "@/types";

export const posterMeta: PosterMeta = {
  subject: "NUMBER STRUCTURES",
  phase: "Phase 1",
  year: "Year 0b",
  theme: "Count to 20",
  brand: "Solveitmaths.com",
};

export const posterSkills: PosterSkill[] = [
  { code: "0.1b", description: "I can count forwards up to 20." },
  { code: "0.2b", description: "I can count backwards from 20 and write the missing number." },
  { code: "0.3b", description: "I can count objects up to 20 and enter the correct numeral." },
  { code: "0.4b", description: "I can change a numeral up to 20 into number words." },
  { code: "0.5b", description: "I can find the total up to 20 and write the numeral and the number word." },
  { code: "0.6b", description: "I can compare two groups up to 20 and choose more or fewer." },
  { code: "0.7b", description: "I can order three numbers up to 20 in the correct order." },
  { code: "0.8b", description: "I can recognise dot patterns up to 10 and write the number." },
  { code: "0.9b", description: "I can solve number bonds up to 20 by finding the missing part." },
];

export const footerData: FooterData = { brand: "Solveitmaths.com" };

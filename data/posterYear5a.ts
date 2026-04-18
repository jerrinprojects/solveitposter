import type { PosterSkill, PosterMeta, FooterData } from "@/types";

export const posterMeta: PosterMeta = {
  subject: "NUMBER STRUCTURE",
  phase: "Phase 2",
  year: "Year 5a",
  theme: "Numbers to 100,000 (one hundred thousand)",
  brand: "Solveitmaths.com",
};

export const posterSkills: PosterSkill[] = [
  { code: "5.1a", description: "I can skip count in ten thousands and write the missing number." },
  { code: "5.2a", description: "I can identify the digit in a given place value position." },
  { code: "5.3a", description: "I can work out how many hundreds, thousands, or ten thousands are in a given number." },
  { code: "5.4a", description: "I can write a 6-digit number in expanded form." },
  { code: "5.5a", description: "I can write a 6-digit number in place value form." },
  { code: "5.6a", description: "I can write a number up to 100,000 in words." },
  { code: "5.7a", description: "I can compare two numbers up to 100,000 using greater than or less than." },
  { code: "5.8a", description: "I can order three numbers up to 100,000." },
  { code: "5.9a", description: "I can round a number to the nearest hundred, ten thousand, or hundred thousand." },
];

export const footerData: FooterData = { brand: "Solveitmaths.com" };

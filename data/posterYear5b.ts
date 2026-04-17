import type { PosterSkill, PosterMeta, FooterData } from "@/types";

export const posterMeta: PosterMeta = {
  subject: "NUMBER STRUCTURE",
  phase: "Phase 2",
  year: "Year 5b",
  theme: "Numbers to 1,000,000 (one million)",
  brand: "Solveitmaths.com",
};

export const posterSkills: PosterSkill[] = [
  { code: "5.1b", description: "I can skip count in hundred thousands and write the missing number." },
  { code: "5.2b", description: "I can identify the digit in the millions place." },
  { code: "5.3b", description: "I can work out how many hundred thousands are in a given number." },
  { code: "5.4b", description: "I can write a 6-digit number in expanded form." },
  { code: "5.5b", description: "I can write a 6-digit number in place value form." },
  { code: "5.6b", description: "I can write a number up to 1,000,000 in words." },
  { code: "5.7b", description: "I can compare two numbers up to 1,000,000 using greater than or less than." },
  { code: "5.8b", description: "I can order three numbers up to 1,000,000." },
  { code: "5.9b", description: "I can round a number to the nearest hundred thousand." },
];

export const footerData: FooterData = { brand: "Solveitmaths.com" };

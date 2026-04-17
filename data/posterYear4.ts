import type { PosterSkill, PosterMeta, FooterData } from "@/types";

export const posterMeta: PosterMeta = {
  subject: "NUMBER STRUCTURE",
  phase: "Phase 2",
  year: "Year 4",
  theme: "Numbers to 10,000",
  brand: "Solveitmaths.com",
};

export const posterSkills: PosterSkill[] = [
  { code: "4.1", description: "I can skip count in thousands and write the missing number." },
  { code: "4.2", description: "I can identify the digit in a given place value position." },
  { code: "4.3", description: "I can work out how many hundreds are in a given number." },
  { code: "4.4", description: "I can write a number up to 10,000 in expanded form." },
  { code: "4.5", description: "I can write a number up to 10,000 in place value form." },
  { code: "4.6", description: "I can write a number up to 10,000 in words." },
  { code: "4.7", description: "I can compare two numbers up to 10,000 using greater than or less than." },
  { code: "4.8", description: "I can order three numbers up to 10,000." },
  { code: "4.9", description: "I can round a number to the nearest 1,000." },
];

export const footerData: FooterData = { brand: "Solveitmaths.com" };

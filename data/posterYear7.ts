import type { PosterSkill, PosterMeta, FooterData } from "@/types";

export const posterMeta: PosterMeta = {
  subject: "NUMBER STRUCTURE",
  phase: "Phase 3",
  year: "Year 7",
  theme: "Powers, Primes & Factors",
  brand: "Solveitmaths.com",
};

export const posterSkills: PosterSkill[] = [
  { code: "7.1", description: "I can find the missing power of 10 to match a number." },
  { code: "7.2", description: "I can write a number in expanded form using powers of 10." },
  { code: "7.3", description: "I can turn an expanded form (digit × power of 10) back into a whole number." },
  { code: "7.4", description: "I can find a square root by thinking of a number that multiplies by itself." },
  { code: "7.5", description: "I can choose the prime or composite number by checking its factors." },
  { code: "7.6", description: "I can list the common factors of two numbers in order." },
  { code: "7.7", description: "I can write the first three common multiples of two numbers in order." },
  { code: "7.8", description: "I can find the highest common factor of 2 or 3 numbers." },
  { code: "7.9", description: "I can find the lowest common multiple of 2 or 3 numbers." },
];

export const footerData: FooterData = { brand: "Solveitmaths.com" };

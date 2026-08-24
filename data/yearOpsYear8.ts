import type { PosterSkill, PosterMeta, FooterData } from "@/types";

export const posterMeta: PosterMeta = {
  subject: "YEAR OPERATIONS",
  phase: "Phase 3",
  year: "Year 8",
  theme: "Decimal × Decimal · Fraction Ops · % · Ratios",
  brand: "Solveitmaths.com",
};

export const posterSkills: PosterSkill[] = [
  { code: "8.1",  description: "I can solve multi-step integer problems using the order of operations." },
  { code: "8.2",  description: "I can solve problems with brackets inside brackets." },
  { code: "8.3",  description: "I can solve problems with exponents in full expressions." },
  { code: "8.4",  description: "I can multiply a decimal by a whole number." },
  { code: "8.5",  description: "I can multiply a decimal by another decimal." },
  { code: "8.6",  description: "I can divide by a two-digit number." },
  { code: "8.7",  description: "I can find a percentage of a number." },
  { code: "8.8",  description: "I can find the whole when given a percentage." },
  { code: "8.9",  description: "I can divide a quantity into a given ratio." },
  { code: "8.10", description: "I can add or subtract fractions with the same denominator." },
  { code: "8.11", description: "I can add or subtract fractions with different denominators." },
  { code: "8.12", description: "I can solve multi-step real-world problems." },
  { code: "8.13", description: "I can multiply two fractions and simplify the answer." },
  { code: "8.14", description: "I can find the price after a percentage discount." },
  { code: "8.15", description: "I can multiply a whole number by an improper or mixed number." },
  { code: "8.16", description: "I can use percentage equivalence to make a calculation easier." },
  { code: "8.17", description: "I can write a comparison of two quantities as a simplified ratio." },
];

// 17 skills paginated 4 + 5 + 4 + 4.
export const pageSizes = [4, 5, 4, 4];

export const footerData: FooterData = { brand: "Solveitmaths.com" };

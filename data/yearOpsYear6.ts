import type { PosterSkill, PosterMeta, FooterData } from "@/types";

export const posterMeta: PosterMeta = {
  subject: "YEAR OPERATIONS",
  phase: "Phase 2",
  year: "Year 6",
  theme: "Any Numbers, Thousandths & BEDMAS",
  brand: "Solveitmaths.com",
};

export const posterSkills: PosterSkill[] = [
  { code: "6.1",  description: "I can add any whole numbers." },
  { code: "6.2",  description: "I can subtract any whole numbers." },
  { code: "6.3",  description: "I can multiply any whole number by a two-digit number." },
  { code: "6.4",  description: "I can divide and write the remainder as a fraction." },
  { code: "6.5",  description: "I can add two numbers with thousandths without renaming." },
  { code: "6.6",  description: "I can add two numbers with thousandths with renaming." },
  { code: "6.7",  description: "I can subtract a number with thousandths from another." },
  { code: "6.8",  description: "I can add or subtract decimals with up to three decimal places." },
  { code: "6.9",  description: "I can solve problems with + and × following the order of operations." },
  { code: "6.10", description: "I can solve problems with brackets following the order of operations." },
  { code: "6.11", description: "I can solve problems with + and ÷ following the order of operations." },
  { code: "6.12", description: "I can solve problems with all four operations following the order of operations." },
  { code: "6.13", description: "I can divide and write the remainder as a decimal." },
  { code: "6.14", description: "I can subtract to find an answer that is less than 0." },
  { code: "6.15", description: "I can find a common percentage of a whole number." },
];

// 15 skills paginated 4 + 4 + 4 + 3.
export const pageSizes = [4, 4, 4, 3];

export const footerData: FooterData = { brand: "Solveitmaths.com" };

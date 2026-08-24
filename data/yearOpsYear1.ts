import type { PosterSkill, PosterMeta, FooterData } from "@/types";

export const posterMeta: PosterMeta = {
  subject: "YEAR OPERATIONS",
  phase: "Phase 1",
  year: "Year 1",
  theme: "Facts to 10 & Extending to 20",
  brand: "Solveitmaths.com",
};

export const posterSkills: PosterSkill[] = [
  { code: "1.1",  description: "I can add 1, 2, 3 or 4 to a single-digit number." },
  { code: "1.2",  description: "I can add a single digit to 5." },
  { code: "1.3",  description: "I can add a single digit to 6." },
  { code: "1.4",  description: "I can add a single digit to 7." },
  { code: "1.5",  description: "I can add a single digit to 8." },
  { code: "1.6",  description: "I can add a single digit to 9." },
  { code: "1.7",  description: "I can find pairs that make 10 (number bonds)." },
  { code: "1.8",  description: "I can add a number to itself (doubles to 10)." },
  { code: "1.9",  description: "I can subtract within 10." },
  { code: "1.10", description: "I can add a single digit to 10 to make a teen number." },
  { code: "1.11", description: "I can bridge through 10 to add (sums 11–18)." },
  { code: "1.12", description: "I can add a single digit to a teen number (up to 20)." },
  { code: "1.13", description: "I can subtract from a teen number without renaming." },
  { code: "1.14", description: "I can subtract from a teen number with renaming." },
  { code: "1.15", description: "I can add or subtract within 20." },
  { code: "1.16", description: "I can find a total by making equal groups (multiplication)." },
  { code: "1.17", description: "I can share things equally to find how many each (division)." },
  { code: "1.18", description: "I can find half of a number up to 10." },
];

// 18 skills paginated 4 + 5 + 5 + 4 — keeps the title page light and
// avoids leaving any single skill stranded on a final page.
export const pageSizes = [4, 5, 5, 4];

export const footerData: FooterData = { brand: "Solveitmaths.com" };

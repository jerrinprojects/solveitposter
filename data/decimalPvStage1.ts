import type { PosterSkill, PosterMeta, FooterData } from "@/types";

export const posterMeta: PosterMeta = {
  subject: "DECIMAL PLACE VALUE",
  phase: "Stage 1",
  year: "Tenths · Year 4",
  theme: "Count · Identify · Expand · Compare · Round",
  brand: "Solveitmaths.com",
};

export const posterSkills: PosterSkill[] = [
  { code: "1.1",  description: "I can count in tenths." },
  { code: "1.2",  description: "I can find the digit in the tenths place." },
  { code: "1.3",  description: "I can work out how many tenths are in a decimal number." },
  { code: "1.4",  description: "I can write a number with tenths in expanded form." },
  { code: "1.5",  description: "I can write a number with tenths in place value form." },
  { code: "1.6",  description: "I can write a number with tenths in words." },
  { code: "1.7",  description: "I can compare ones and tenths." },
  { code: "1.8",  description: "I can order numbers with tenths." },
  { code: "1.9",  description: "I can round a tenths number to the nearest one." },
  { code: "1.10", description: "I can place a tenths number on a number line." },
];

export const footerData: FooterData = { brand: "Solveitmaths.com" };

// 10 skills → 4+3+3 (Option B) uncrowded 3-page layout.
export const pageSizes: number[] = [4, 3, 3];

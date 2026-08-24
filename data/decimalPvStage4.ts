import type { PosterSkill, PosterMeta, FooterData } from "@/types";

export const posterMeta: PosterMeta = {
  subject: "DECIMAL PLACE VALUE",
  phase: "Stage 4",
  year: "Mixed · Year 6+",
  theme: "Count · Identify · Expand · Compare · Round",
  brand: "Solveitmaths.com",
};

export const posterSkills: PosterSkill[] = [
  { code: "4.1",  description: "I can count in tenths, hundredths, and thousandths." },
  { code: "4.2",  description: "I can find the digit in any decimal place." },
  { code: "4.3",  description: "I can work out how many tenths, hundredths, or thousandths are in a number." },
  { code: "4.4",  description: "I can write any decimal number in expanded form." },
  { code: "4.5",  description: "I can write any decimal number in place value form." },
  { code: "4.6",  description: "I can write any decimal number in words." },
  { code: "4.7",  description: "I can compare decimals with mixed place values." },
  { code: "4.8",  description: "I can order decimals with mixed place values." },
  { code: "4.9",  description: "I can round a decimal to any place." },
  { code: "4.10", description: "I can place any decimal number on a number line." },
];

export const footerData: FooterData = { brand: "Solveitmaths.com" };
export const pageSizes: number[] = [4, 3, 3];

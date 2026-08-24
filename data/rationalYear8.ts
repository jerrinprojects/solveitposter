import type { PosterSkill, PosterMeta, FooterData } from "@/types";

export const posterMeta: PosterMeta = {
  subject: "RATIONAL NUMBERS",
  phase: "Phase 3",
  year: "Year 8",
  theme: "Fraction × Fraction, Decimal Ops & Equivalence",
  brand: "Solveitmaths.com",
};

export const posterSkills: PosterSkill[] = [
  { code: "8.1", description: "I can convert between fractions, decimals and percentages (advanced)." },
  { code: "8.2", description: "I can multiply and divide using powers of 10 (advanced)." },
  { code: "8.3", description: "I can convert between improper fractions and mixed numbers." },
  { code: "8.4", description: "I can multiply fractions by whole numbers." },
  { code: "8.5", description: "I can solve harder reverse percentage problems." },
  { code: "8.6", description: "I can multiply decimals by decimals." },
  { code: "8.7", description: "I can divide a decimal by a whole number." },
  { code: "8.8", description: "I can solve ratio problems with unequal parts." },
  { code: "8.9", description: "I can multiply a fraction by a fraction." },
  { code: "8.10", description: "I can use percentage equivalence (e.g. 45% of 20 = 20% of 45)." },
];

export const footerData: FooterData = { brand: "Solveitmaths.com" };

// Y8 specific page split: 4 + 3 + 3 = uncrowded 3-page layout.
export const pageSizes: number[] = [4, 3, 3];

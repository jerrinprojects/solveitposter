import type { PosterSkill, PosterMeta, FooterData } from "@/types";

export const posterMeta: PosterMeta = {
  subject: "RATIONAL NUMBERS",
  phase: "Phase 1",
  year: "Year 3",
  theme: "Unit Fractions, Number Line, Add & Subtract",
  brand: "Solveitmaths.com",
};

export const posterSkills: PosterSkill[] = [
  { code: "3.1", description: "I can write halves, thirds, quarters, fifths, sixths, and eighths as fractions." },
  { code: "3.2", description: "I can place a fraction on a number line." },
  { code: "3.3", description: "I can compare unit fractions from ½ to ⅛." },
  { code: "3.4", description: "I can spot equivalent fractions." },
  { code: "3.5", description: "I can identify a unit fraction." },
  { code: "3.6", description: "I can find a unit fraction of a whole number." },
  { code: "3.7", description: "I can find the whole when I know a fraction part." },
  { code: "3.8", description: "I can add fractions with the same denominator." },
  { code: "3.9", description: "I can subtract fractions with the same denominator." },
  { code: "3.10", description: "I can count in unit fractions up to 1." },
  { code: "3.11", description: "I can compare non-unit fractions with the same denominator (like ⅜ and ⅝)." },
];

export const footerData: FooterData = { brand: "Solveitmaths.com" };

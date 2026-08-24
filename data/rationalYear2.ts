import type { PosterSkill, PosterMeta, FooterData } from "@/types";

export const posterMeta: PosterMeta = {
  subject: "RATIONAL NUMBERS",
  phase: "Phase 1",
  year: "Year 2",
  theme: "Halves, Thirds, Quarters & Equivalents",
  brand: "Solveitmaths.com",
};

export const posterSkills: PosterSkill[] = [
  { code: "2.1", description: "I can spot halves, thirds, and quarters in shapes." },
  { code: "2.2", description: "I can write halves, thirds, and quarters as words and as fractions." },
  { code: "2.3", description: "I can compare halves, thirds, and quarters." },
  { code: "2.4", description: "I can find a half, a third, or a quarter of a group." },
  { code: "2.5", description: "I can find the whole when I know a half, a third, or a quarter." },
  { code: "2.6", description: "I can spot equivalent fractions (different ways to write the same fraction)." },
  { code: "2.7", description: "I can recognise fractions like ½, ⅔, and ¾." },
];

export const footerData: FooterData = { brand: "Solveitmaths.com" };

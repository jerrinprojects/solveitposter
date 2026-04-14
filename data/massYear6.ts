import type { PosterMeta, PosterSkill } from "@/types";

export const meta: PosterMeta = {
  subject: "MEASUREMENT · MASS",
  phase: "Phase 2",
  year: "Year 6",
  theme: "Converting g and kg",
  brand: "Solveitmaths.com",
};

export const skills: PosterSkill[] = [
  { code: "6.1", description: "I can convert grams to kilograms and kilograms to grams." },
  { code: "6.2", description: "I can convert mixed-unit masses (e.g. 2 kg 500 g) to grams." },
  { code: "6.3", description: "I can convert a mass to decimal kilograms (e.g. 3 kg 250 g = 3.25 kg)." },
  { code: "6.4", description: "I can compare masses that are written in different units." },
  { code: "6.5", description: "I can order masses written in different forms." },
];

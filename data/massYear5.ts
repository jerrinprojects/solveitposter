import type { PosterMeta, PosterSkill } from "@/types";

export const meta: PosterMeta = {
  subject: "MEASUREMENT · MASS",
  phase: "Phase 2",
  year: "Year 5",
  theme: "Scales, Mixed and Decimal Mass",
  brand: "Solveitmaths.com",
};

export const skills: PosterSkill[] = [
  { code: "5.1", description: "I can read a scale and convert between grams and kilograms." },
  { code: "5.2", description: "I can compare masses written in mixed units (e.g. 2 kg 500 g)." },
  { code: "5.3", description: "I can convert a mixed mass into decimal kilograms (e.g. 1 kg 500 g = 1.5 kg)." },
  { code: "5.4", description: "I can order masses written in mixed form from lightest to heaviest." },
  { code: "5.5", description: "I can choose a sensible mass for a real-life object." },
];

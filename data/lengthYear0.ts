import type { PosterMeta, PosterSkill } from "@/types";

export const meta: PosterMeta = {
  subject: "MEASUREMENT · LENGTH",
  phase: "Phase 1",
  year: "Year 0",
  theme: "Compare Lengths",
  brand: "Solveitmaths.com",
};

export const skills: PosterSkill[] = [
  { code: "0.1", description: "I can look at two objects and say which one is longer." },
  { code: "0.2", description: "I can look at two objects and say which one is shorter." },
  { code: "0.3", description: "I can compare three objects and find the longest one." },
  { code: "0.4", description: "I can compare three objects and find the shortest one." },
];

import type { PosterMeta, PosterSkill } from "@/types";

export const meta: PosterMeta = {
  subject: "MEASUREMENT · ANGLE",
  phase: "Phase 1",
  year: "Year 2",
  theme: "Full, Half and Quarter Turns",
  brand: "Solveitmaths.com",
  mascot: "/topics/measurement.webp",
};

export const skills: PosterSkill[] = [
  { code: "2.1", description: "I can say if a turn is a full, half, or quarter turn." },
  { code: "2.2", description: "I can say if a turn goes clockwise or anticlockwise." },
  { code: "2.3", description: "I can make a quarter turn and say where it ends up." },
  { code: "2.4", description: "I can make a half turn and say where it ends up." },
  { code: "2.5", description: "I can make a three-quarter turn and say where it ends up." },
];

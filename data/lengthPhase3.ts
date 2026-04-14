import type { PosterMeta, PosterSkill } from "@/types";

export const meta: PosterMeta = {
  subject: "MEASUREMENT · LENGTH",
  phase: "Phase 3",
  year: "Year 7–8",
  theme: "Formulas · Composite · Circles",
  brand: "Solveitmaths.com",
};

export const skills: PosterSkill[] = [
  // Year 7
  { code: "7.1", description: "I can use formulas to find the perimeter of shapes." },
  { code: "7.2", description: "I can work out a missing side length when I know the perimeter." },
  { code: "7.3", description: "I can use formulas to find the area of different shapes." },
  { code: "7.4", description: "I can find the missing base or height when I know the area." },
  { code: "7.5", description: "I can find the area of composite shapes by splitting them into parts." },
  // Year 8
  { code: "8.1", description: "I can convert between area units — mm², cm², and m²." },
  { code: "8.2", description: "I can find the area of a parallelogram." },
  { code: "8.3", description: "I can find the area of a trapezium." },
  { code: "8.4", description: "I can solve problems that use both area and perimeter." },
  { code: "8.5", description: "I can name the parts of a circle — centre, radius, diameter, and circumference." },
  { code: "8.6", description: "I can find the area of complex composite shapes." },
];

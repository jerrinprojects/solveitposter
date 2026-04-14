import type { PosterMeta, PosterSkill } from "@/types";

export const meta: PosterMeta = {
  subject: "MEASUREMENT · LENGTH",
  phase: "Phase 2",
  year: "Year 4–6",
  theme: "Units · Perimeter · Area Formulas",
  brand: "Solveitmaths.com",
};

export const skills: PosterSkill[] = [
  // Year 4
  { code: "4.1", description: "I can choose the best unit to measure length — millimetres, centimetres, or metres." },
  { code: "4.2", description: "I can find the perimeter of shapes using mm, cm, or m." },
  { code: "4.3", description: "I can use multiplication to find the area of a rectangle." },
  { code: "4.4", description: "I can find the area of a square." },
  { code: "4.5", description: "I can find the area of shapes that include half-squares." },
  // Year 5
  { code: "5.1", description: "I can convert between metres and centimetres." },
  { code: "5.2", description: "I can find the perimeter of any straight-sided shape." },
  { code: "5.3", description: "I can find the area of rectangles and squares." },
  { code: "5.4", description: "I can work out whether two shapes have the same area or the same perimeter." },
  { code: "5.5", description: "I can compare the areas of two different shapes." },
  // Year 6
  { code: "6.1", description: "I can convert between different length units including mixed units." },
  { code: "6.2", description: "I can choose the correct unit for measuring area." },
  { code: "6.3", description: "I can find the area of rectangles using the formula." },
  { code: "6.4", description: "I can find the area of right-angled triangles." },
  { code: "6.5", description: "I can tell if a shape is a rectangle or a triangle and find its area." },
];

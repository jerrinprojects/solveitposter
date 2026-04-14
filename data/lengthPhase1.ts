import type { PosterMeta, PosterSkill } from "@/types";

export const meta: PosterMeta = {
  subject: "MEASUREMENT · LENGTH",
  phase: "Phase 1",
  year: "Year 0–3",
  theme: "Compare · Ruler · Perimeter · Area",
  brand: "Solveitmaths.com",
};

export const skills: PosterSkill[] = [
  // Year 0
  { code: "0.1", description: "I can look at two objects and say which one is longer." },
  { code: "0.2", description: "I can look at two objects and say which one is shorter." },
  { code: "0.3", description: "I can compare three objects and find the longest one." },
  { code: "0.4", description: "I can compare three objects and find the shortest one." },
  // Year 1
  { code: "1.1", description: "I can use the words longer, shorter, and taller to compare objects." },
  { code: "1.2", description: "I can put objects in order from shortest to longest." },
  { code: "1.3", description: "I can put objects in order from longest to shortest." },
  { code: "1.4", description: "I can tell if two objects are the same length or different lengths." },
  // Year 2
  { code: "2.1", description: "I can read a ruler and measure in centimetres." },
  { code: "2.2", description: "I can choose the correct measurement shown on a ruler." },
  { code: "2.3", description: "I can find the perimeter of a rectangle when the side lengths are labelled." },
  { code: "2.4", description: "I can find the perimeter of a shape by counting the units around the outside." },
  // Year 3
  { code: "3.1", description: "I can choose whether to measure in centimetres or metres." },
  { code: "3.2", description: "I can find the perimeter of different polygons." },
  { code: "3.3", description: "I can find the area of a shape by counting squares." },
  { code: "3.4", description: "I can compare the areas of two shapes and say which is bigger." },
];

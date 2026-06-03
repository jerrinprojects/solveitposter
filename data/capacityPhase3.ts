import type { PosterMeta, PosterSkill } from "@/types";

export const meta: PosterMeta = {
  subject: "MEASUREMENT · CAPACITY & VOLUME",
  phase: "Phase 3",
  year: "Year 7–8",
  theme: "Formulas · Prisms · Capacity ↔ Volume",
  brand: "Solveitmaths.com",
};

export const skills: PosterSkill[] = [
  // Year 7
  { code: "7.1", description: "I can choose the correct volume formula for a shape." },
  { code: "7.2", description: "I can find the volume of a cube." },
  { code: "7.3", description: "I can find the volume of a rectangular prism." },
  { code: "7.4", description: "I can find a missing side length when I know the volume." },
  { code: "7.5", description: "I can compare two rectangular prisms and say which has the greater volume." },
  // Year 8
  { code: "8.1", description: "I can convert between cubic centimetres and cubic metres." },
  { code: "8.2", description: "I can convert between capacity (mL, L) and volume (cm³)." },
  { code: "8.3", description: "I can find the volume of a triangular prism." },
  { code: "8.4", description: "I can find the total volume of a composite shape." },
  { code: "8.5", description: "I can compare a capacity with a volume." },
  { code: "8.6", description: "I can choose a sensible capacity for a real-life object." },
];

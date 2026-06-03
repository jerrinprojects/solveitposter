import type { PosterMeta, PosterSkill } from "@/types";

export const meta: PosterMeta = {
  subject: "MEASUREMENT · CAPACITY & VOLUME",
  phase: "Phase 2",
  year: "Year 4–6",
  theme: "Conversions · Volume · cm³",
  brand: "Solveitmaths.com",
};

export const skills: PosterSkill[] = [
  // Year 4
  { code: "4.1", description: "I can choose the best unit (millilitres or litres) to measure a capacity." },
  { code: "4.2", description: "I can convert a capacity written as L and mL into millilitres only." },
  { code: "4.3", description: "I can compare two capacities written in mixed units." },
  { code: "4.4", description: "I can count unit cubes to find the volume of a shape." },
  { code: "4.5", description: "I can tell if something is talking about capacity or volume." },
  // Year 5
  { code: "5.1", description: "I can convert litres into millilitres." },
  { code: "5.2", description: "I can convert millilitres into litres." },
  { code: "5.3", description: "I can convert a capacity written in litres and millilitres into millilitres only." },
  { code: "5.4", description: "I can find the total volume of a shape by counting layers of cubes." },
  { code: "5.5", description: "I can compare two rectangular prisms and say which has the greater volume." },
  // Year 6
  { code: "6.1", description: "I can convert a capacity written as L and mL into millilitres." },
  { code: "6.2", description: "I can convert a total in millilitres into decimal litres." },
  { code: "6.3", description: "I can compare a capacity given in mL with one given in L." },
  { code: "6.4", description: "I can find the volume of a rectangular prism using its dimensions." },
  { code: "6.5", description: "I can choose the best unit (cm³ or m³) to measure a volume." },
  { code: "6.6", description: "I can convert between millilitres and cubic centimetres." },
];

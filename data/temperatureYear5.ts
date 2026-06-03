import type { PosterMeta, PosterSkill } from "@/types";

export const meta: PosterMeta = {
  subject: "MEASUREMENT · TEMPERATURE",
  phase: "Phase 2",
  year: "Year 5",
  theme: "Smaller Intervals · Temperature Change",
  brand: "Solveitmaths.com",
};

export const skills: PosterSkill[] = [
  { code: "5.1", description: "I can read a thermometer in 2°C steps." },
  { code: "5.2", description: "I can match a thermometer to the correct temperature, even when values are close." },
  { code: "5.3", description: "I can find how much a temperature has changed." },
  { code: "5.4", description: "I can tell whether a temperature change is an increase or a decrease." },
  { code: "5.5", description: "I can compare temperatures on different days and say which was warmer or cooler." },
];

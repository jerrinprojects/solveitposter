import type { PosterMeta, PosterSkill } from "@/types";

export const meta: PosterMeta = {
  subject: "MEASUREMENT · TEMPERATURE",
  phase: "Phase 1",
  year: "Year 0–3",
  theme: "Hot / Cold · Words · Thermometer",
  brand: "Solveitmaths.com",
};

export const skills: PosterSkill[] = [
  // Year 0
  { code: "0.1", description: "I can tell if something is hot or cold." },
  { code: "0.2", description: "I can pick which of two things is hotter." },
  { code: "0.3", description: "I can pick which of two things is colder." },
  // Year 1
  { code: "1.1", description: "I can use the words warmer and cooler to compare two things." },
  { code: "1.2", description: "I can order three things from coldest to hottest." },
  { code: "1.3", description: "I can match a scene to the right temperature word (freezing, cold, cool, warm, hot)." },
  // Year 2
  { code: "2.1", description: "I can choose the best temperature word for a situation." },
  { code: "2.2", description: "I can pick the coldest or hottest from three scenes." },
  { code: "2.3", description: "I can order four scenes from coldest to hottest." },
  // Year 3
  { code: "3.1", description: "I can read a thermometer in 10°C steps." },
  { code: "3.2", description: "I can match a temperature in °C to a situation." },
  { code: "3.3", description: "I can compare two temperatures in °C and say which is hotter." },
];

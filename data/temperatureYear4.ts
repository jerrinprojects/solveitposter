import type { PosterMeta, PosterSkill } from "@/types";

export const meta: PosterMeta = {
  subject: "MEASUREMENT · TEMPERATURE",
  phase: "Phase 2",
  year: "Year 4",
  theme: "Reading °C · Compare · Order · Sensible Values",
  brand: "Solveitmaths.com",
};

export const skills: PosterSkill[] = [
  { code: "4.1", description: "I can read a thermometer in 5°C steps and write the temperature." },
  { code: "4.2", description: "I can match a thermometer reading to the correct temperature." },
  { code: "4.3", description: "I can compare two temperatures and say which is hotter or colder." },
  { code: "4.4", description: "I can order four temperatures from coldest to hottest." },
  { code: "4.5", description: "I can choose a sensible temperature for a real-life situation." },
];

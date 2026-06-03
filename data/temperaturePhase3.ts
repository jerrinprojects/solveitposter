import type { PosterMeta, PosterSkill } from "@/types";

export const meta: PosterMeta = {
  subject: "MEASUREMENT · TEMPERATURE",
  phase: "Phase 3",
  year: "Year 7–8",
  theme: "Negatives · Multi-step · Tables · Charts",
  brand: "Solveitmaths.com",
};

export const skills: PosterSkill[] = [
  // Year 7
  { code: "7.1", description: "I can pick the coldest or hottest from a list of temperatures that include negatives." },
  { code: "7.2", description: "I can find a temperature change as a positive or negative number." },
  { code: "7.3", description: "I can solve a problem where the temperature rises and then falls." },
  { code: "7.4", description: "I can read a city's temperature from a table." },
  { code: "7.5", description: "I can find the temperature range over a week (highest − lowest)." },
  // Year 8
  { code: "8.1", description: "I can find a temperature change that crosses zero." },
  { code: "8.2", description: "I can solve a multi-step problem with several rises and falls." },
  { code: "8.3", description: "I can compare two cities' temperature ranges." },
  { code: "8.4", description: "I can read a temperature chart and find the highest or lowest day." },
  { code: "8.5", description: "I can solve word problems about changing temperatures." },
];

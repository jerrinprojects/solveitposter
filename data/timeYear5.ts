import type { PosterMeta, PosterSkill } from "@/types";

export const meta: PosterMeta = {
  subject: "MEASUREMENT · TIME",
  phase: "Phase 2",
  year: "Year 5",
  theme: "a.m. / p.m. · 24-hour · Durations",
  brand: "Solveitmaths.com",
};

export const skills: PosterSkill[] = [
  { code: "5.1", description: "I can decide whether a daily event happens in a.m. or p.m." },
  { code: "5.2", description: "I can convert a 12-hour time into 24-hour time." },
  { code: "5.3", description: "I can convert a 24-hour time back into 12-hour time." },
  { code: "5.4", description: "I can work out a duration within the same hour." },
  { code: "5.5", description: "I can work out a duration that crosses over an hour." },
  { code: "5.6", description: "I can find the end time when I know the start time and the duration." },
];

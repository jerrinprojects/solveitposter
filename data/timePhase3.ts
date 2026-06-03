import type { PosterMeta, PosterSkill } from "@/types";

export const meta: PosterMeta = {
  subject: "MEASUREMENT · TIME",
  phase: "Phase 3",
  year: "Year 7–8",
  theme: "Timetables · Fractions · Multi-step Timing",
  brand: "Solveitmaths.com",
};

export const skills: PosterSkill[] = [
  // Year 7
  { code: "7.1", description: "I can read a timetable and find the start or end time of an activity." },
  { code: "7.2", description: "I can read a timetable and work out how long an activity lasts." },
  { code: "7.3", description: "I can read a timetable and find the activity that lasts the longest." },
  { code: "7.4", description: "I can work out a fraction of an hour in minutes (e.g. ¾ of an hour)." },
  { code: "7.5", description: "I can work out a fraction of a day in hours (e.g. ¼ of a day)." },
  { code: "7.6", description: "I can add or subtract times written in hours and minutes." },
  // Year 8
  { code: "8.1", description: "I can convert between hours-and-minutes and total minutes." },
  { code: "8.2", description: "I can convert between minutes-and-seconds and total seconds." },
  { code: "8.3", description: "I can convert hours and minutes into seconds, and seconds back into hours." },
  { code: "8.4", description: "I can find the arrival time when I know the start time and travel time." },
  { code: "8.5", description: "I can work out the total time from the start of one activity to the end of another." },
  { code: "8.6", description: "I can read a results chart and find the fastest time." },
];

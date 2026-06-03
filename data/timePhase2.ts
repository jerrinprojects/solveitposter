import type { PosterMeta, PosterSkill } from "@/types";

export const meta: PosterMeta = {
  subject: "MEASUREMENT · TIME",
  phase: "Phase 2",
  year: "Year 4–6",
  theme: "Clocks · a.m./p.m. · Durations · Timetables",
  brand: "Solveitmaths.com",
};

export const skills: PosterSkill[] = [
  // Year 4
  { code: "4.1", description: "I can read an analogue clock and type the digital time to the minute." },
  { code: "4.2", description: "I can read a digital time and match it to its spoken description." },
  { code: "4.3", description: "I can convert between hours and minutes." },
  { code: "4.4", description: "I can convert between minutes and seconds." },
  { code: "4.5", description: "I can add two durations together (e.g. 25 min + 35 min)." },
  { code: "4.6", description: "I can tell if two time amounts are equal, or say which is longer." },
  // Year 5
  { code: "5.1", description: "I can decide whether a daily event happens in a.m. or p.m." },
  { code: "5.2", description: "I can convert a 12-hour time into 24-hour time." },
  { code: "5.3", description: "I can convert a 24-hour time back into 12-hour time." },
  { code: "5.4", description: "I can work out a duration within the same hour." },
  { code: "5.5", description: "I can work out a duration that crosses over an hour." },
  { code: "5.6", description: "I can find the end time when I know the start time and the duration." },
  // Year 6
  { code: "6.1", description: "I can find a duration that crosses over an hour boundary." },
  { code: "6.2", description: "I can find the end time of an event from its start time and duration." },
  { code: "6.3", description: "I can find the start time of an event from its end time and duration." },
  { code: "6.4", description: "I can read a timetable and find when an activity starts." },
  { code: "6.5", description: "I can read a timetable and work out how long an activity lasts." },
  { code: "6.6", description: "I can convert between hours, minutes, seconds, days, and weeks." },
];

import type { PosterMeta, PosterSkill } from "@/types";

export const meta: PosterMeta = {
  subject: "MEASUREMENT · TIME",
  phase: "Phase 1",
  year: "Year 0–3",
  theme: "Days · Months · Clocks · Conversions",
  brand: "Solveitmaths.com",
};

export const skills: PosterSkill[] = [
  // Year 0
  { code: "0.1", description: "I can say what comes before or after a part of the day." },
  { code: "0.2", description: "I can match a daily activity to the right time of day." },
  { code: "0.3", description: "I can tell whether a day is a weekday or a weekend day." },
  { code: "0.4", description: "I can say what comes next in a daily routine." },
  // Year 1
  { code: "1.1", description: "I can say the day before any day of the week." },
  { code: "1.2", description: "I can say the day after any day of the week." },
  { code: "1.3", description: "I can put days of the week in order." },
  { code: "1.4", description: "I can read a clock showing o'clock times." },
  { code: "1.5", description: "I can match a digital o'clock time to its words." },
  // Year 2
  { code: "2.1", description: "I can say the month before any month of the year." },
  { code: "2.2", description: "I can say the month after any month of the year." },
  { code: "2.3", description: "I can match a month to the right season (NZ)." },
  { code: "2.4", description: "I can read half past times on a clock." },
  { code: "2.5", description: "I can read quarter past times on a clock." },
  { code: "2.6", description: "I can read quarter to times on a clock." },
  { code: "2.7", description: "I can match an analogue clock to its digital time." },
  // Year 3
  { code: "3.1", description: "I can read an analogue clock to the nearest 5 minutes." },
  { code: "3.2", description: "I can read an analogue clock to the minute." },
  { code: "3.3", description: "I can say a time using \"past\" (e.g. five past 3)." },
  { code: "3.4", description: "I can say a time using \"to\" (e.g. quarter to 4)." },
  { code: "3.5", description: "I can answer simple time conversions (minutes, hours, days, weeks, months)." },
  { code: "3.6", description: "I can choose the best unit to measure a length of time." },
  { code: "3.7", description: "I can compare two times and say which is longer." },
];

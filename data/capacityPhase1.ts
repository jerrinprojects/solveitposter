import type { PosterMeta, PosterSkill } from "@/types";

export const meta: PosterMeta = {
  subject: "MEASUREMENT · CAPACITY & VOLUME",
  phase: "Phase 1",
  year: "Year 0–3",
  theme: "Compare · Measure · ml & L",
  brand: "Solveitmaths.com",
};

export const skills: PosterSkill[] = [
  // Year 0
  { code: "0.1", description: "I can look at two containers and pick the one that holds more." },
  { code: "0.2", description: "I can look at two containers and pick the one that holds less." },
  { code: "0.3", description: "I can tell if two containers hold the same amount or different amounts." },
  // Year 1
  { code: "1.1", description: "I can look at two containers with water and say which has more." },
  { code: "1.2", description: "I can look at two containers with water and say which has less." },
  { code: "1.3", description: "I can tell if a container is full, half-full, or empty." },
  { code: "1.4", description: "I can order three containers from least to most water." },
  // Year 2
  { code: "2.1", description: "I can read a measuring jug and say how many millilitres." },
  { code: "2.2", description: "I can choose the correct millilitre reading on a measuring jug." },
  { code: "2.3", description: "I can order three measurements in millilitres from least to most." },
  { code: "2.4", description: "I can compare two capacities in millilitres." },
  // Year 3
  { code: "3.1", description: "I can choose whether to measure capacity in millilitres or litres." },
  { code: "3.2", description: "I can read a container in millilitres or litres." },
  { code: "3.3", description: "I can compare two capacities and say which holds more." },
  { code: "3.4", description: "I can order three capacities from least to most." },
];

---
name: component-architecture-skill
description: Keep the project modular, typed, and easy to maintain with reusable React components.
---

Build the app with clean, maintainable component architecture.

Primary goal:
Make the poster website easy to extend, restyle, and maintain.

Rules:
- Use TypeScript types for all main data structures.
- Separate data from presentation.
- Prefer data-driven rendering for repeated poster sections.
- Extract reusable components for:
  - page header
  - section block
  - image card
  - print button
  - footer
- Keep props explicit and typed.
- Avoid large monolithic page components.
- Group shared class patterns where useful.
- Keep naming consistent and descriptive.

Architecture guidance:
- types should live in a dedicated types file (types/index.ts)
- poster section data should live in a data file (data/posterData.ts)
- page.tsx should mainly compose components
- repeated layout patterns should become reusable components

Do not:
- Do not duplicate section markup many times manually.
- Do not mix data definitions directly into large JSX blocks unless temporary.
- Do not use vague names like Box1, Card2, StuffSection.
- Do not create unnecessary abstraction layers for tiny components.

Preferred output:
- clear folder structure
- reusable components
- typed props
- minimal duplication

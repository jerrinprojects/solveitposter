# Solveitposter — Dev Bot

## Project overview
This is a Next.js web app for **Solveitmaths.com** that lets teachers view and print maths skill posters.
Each poster covers one topic (e.g. Number Structure) at a specific year level, and shows a grid of skill cards — each card has a skill code, "I can..." description, and an exercise preview image.

## Tech stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3
- **Fonts**: `Fredoka` (bold headings), `Nunito` (body) — from Google Fonts
- **Color scheme**: Pink-based — `pink-50` bg, `pink-200` borders, `pink-500/600` text

## Project structure
```
app/
  page.tsx              ← Landing page — list of all poster topics
  poster/page.tsx       ← Poster page (currently: Number Structure Year 0a)
  [future topics]/      ← Each new topic gets its own folder + page.tsx
components/
  PageHeader.tsx        ← Pink banner with subject title + mascot image
  SectionBlock.tsx      ← One skill row: left = code + description, right = exercise preview or image
  ExercisePreview.tsx   ← Static visual mockups per skill code (no interactivity)
  ImageCard.tsx         ← Fallback image placeholder card
  PrintButton.tsx       ← Screen-only print button
  PageFooter.tsx        ← Brand footer
data/
  posterData.ts         ← posterMeta, posterSkills[], footerData for current poster
types/
  index.ts              ← PosterSkill, PosterMeta, FooterData interfaces
.claude/commands/       ← Skill files for specialised tasks
```

## Working style
- Always check the existing files first before making changes.
- Follow the established patterns: data-driven, typed props, reusable components.
- Keep data separate from presentation — skill content goes in `data/`, not in JSX.
- Never hardcode content directly in page components.
- Run `npm run dev` in this folder to test — dev server runs on localhost:3000.
- After making changes, confirm what was changed and where.
- Ask before doing anything destructive or hard to undo.

## Key patterns

### Adding a new poster
1. Create `data/[topicSlug]Data.ts` with `posterMeta`, `posterSkills`, `footerData`
2. Create `app/[topicSlug]/page.tsx` — copy structure from `app/poster/page.tsx`
3. Add the topic to the `topics` array in `app/page.tsx`
4. Add exercise preview components in `ExercisePreview.tsx` for new skill codes (or use `imageUrl` in skill data)

### PosterSkill structure
```ts
{
  code: "0.1a",           // skill code shown in card heading
  description: "I can...", // full "I can" statement
  imageUrl?: "https://...", // optional: use image instead of static preview
}
```

### PosterMeta structure
```ts
{
  subject: "NUMBER STRUCTURE",  // ALL CAPS — shown in big header
  phase: "Phase 1",
  year: "Year 0a",
  theme: "Count to 10",
  brand: "Solveitmaths.com",
}
```

### ExercisePreview
- Static visual mockups of the exercise (no interactivity — display only)
- Each skill code maps to a component function (e.g. `P01a`)
- Add new preview components to the `MAP` object at the bottom of ExercisePreview.tsx
- If no preview exists and no imageUrl, falls back to `ImageCard` placeholder

### Pagination
- Title page: 4 skills max
- Inner pages: 5 skills each
- Handled automatically by `paginateSkills()` in `app/poster/page.tsx`

## Current content
- **Number Structure · Phase 1 · Year 0a · Count to 10**
  - Skills: 0.1a through 0.9a (9 skills)
  - All have static exercise previews in ExercisePreview.tsx

## Commands
- `/addposter` — Add a new poster topic
- `/addskill` — Add skills to an existing poster
- `/editskill` — Edit an existing skill's description or image
- `/fix` — Fix a bug or UI issue described in natural language

# Solveit Maths · Poster Design System

Brand-aligned, cute-but-poster design language used across Times Table posters.
Matches the look of the main Solveit Maths app at solveitmaths.com.

Reference implementation: **`/components/TrickyTwelve.tsx`** + **`/app/poster/times-table-tricky/page.tsx`** + **`/components/icons/TrickyIcons.tsx`**.

---

## 1. Typography

Three font families, all loaded in `app/layout.tsx` via `next/font/google` as CSS variables.

| Role | Font | CSS variable | Weights used | Use for |
|---|---|---|---|---|
| **Display** | Poppins | `--font-display` | 500, 600, 700, 800 | Headings, big result numbers, equation labels |
| **Body** | Montserrat | `--font-body` | 400, 500, 600, 700, 800 | All body text, captions, footer meta |
| **Hand** | Caveat | `--font-hand` | 600, 700 | Playful accent word in title (e.g., "Tricky"), bottom-note flourish |

Reference sizes (from Tricky 12):
- Big result number: 78px, weight 800, letterSpacing `-0.04em`
- Card equation label: 19px, weight 800, letterSpacing `-0.02em`
- Title (H1): 38px Poppins, weight 800, letterSpacing `-0.03em`
- Title accent word: 48px Caveat, weight 700, rotation `-3deg`
- Footer brand: 15px Poppins, weight 800
- Meta caps: 10px Montserrat, weight 700–800, letterSpacing `0.18em–0.32em`, uppercase
- Body caption: 11–12px Montserrat, weight 500–700
- Bottom-note hand accent: 18px Caveat, weight 700, color `#ec407a`

---

## 2. Color Palette

### Page chrome (warm cream)
| Token | Hex | Use |
|---|---|---|
| `--paper` | `#fff3e6` | Page background (warm cream) |
| `--poster-bg` | `#fffaf3` | Poster card background |
| `--header-gradient` | `linear-gradient(135deg, #fff5fa 0%, #fff0e8 100%)` | Header banner background |
| `--footer-bg` | `#fff5fa` | Footer band background |
| `--soft-pink-border` | `#ffd5e8` | 2px borders & subtle dividers |

### Brand pink (primary accent, matches main app)
| Token | Hex | Use |
|---|---|---|
| `--brand-pink` | `#ff69b4` | Logo dot, primary accent |
| `--brand-pink-dark` | `#ec407a` | Headings emphasis, links, Caveat accent text |
| `--brand-pink-halo` | `rgba(255, 105, 180, 0.18)` | Glow ring around logo dot |

### 4-color rotation (use for multi-card grids, cycle pink → mint → sunny → grape)
| Accent | ink | bg (card wash) | chip (footer chip) | number (display) |
|---|---|---|---|---|
| **Pink** | `#d6336c` | `#fff0f7` | `#ffd5e8` | `#ec407a` |
| **Mint** | `#0d9488` | `#e6fbf5` | `#bff3e6` | `#14b8a6` |
| **Sunny** | `#b8860b` | `#fff7d9` | `#ffe8a0` | `#e8a93e` |
| **Grape** | `#7c3aed` | `#f3edff` | `#dccdfb` | `#a78bda` |

### Text
| Token | Hex | Use |
|---|---|---|
| `--ink` | `#1f2937` | Headings (when not accent) |
| `--ink-card` | `#3a2a35` | Body text inside cards |
| `--ink-muted` | `#6b5560` | Muted captions |
| `--ink-meta` | `#a18791` | Footer meta caps |

---

## 3. Shape & Spacing

### Border radii
- Cards: **20px**
- Containers / poster outer: **28px**
- Inner pills / chips: **16px**
- Icon badges: **8px** (small) / **999px** (status pills)

### Borders
- Card borders: **2px solid** (use accent `chip` color)
- Container borders: **2px solid `#ffd5e8`** (soft pink)
- Subtle dividers: **1px solid** with low-opacity warm tone

### Shadows
- Cards: `0 2px 0 rgba(0,0,0,0.04)` (very subtle, no glow)
- Poster outer: `0 8px 32px rgba(236, 64, 122, 0.10)` (soft pink glow)
- Icon-badge halo: `0 0 0 4px rgba(255, 105, 180, 0.10)`

### Card structure (3 sections, stacked vertically)
1. **Equation header**: 8px 14px padding, accent ink color, Poppins 800
2. **Result area**: flex-grow, centered, padding `0 8px 12px` (pushes number visually up)
3. **Trick footer**: solid `chip` background, icon badge + body text, min-height 46px

### Icon badges
- 28x28 white box, border-radius 8px, centered
- Icon sits inside, accent ink color, 16px

---

## 4. Custom Icon System

Inline React SVG components, **2.4px stroke**, 24×24 viewBox, rounded caps & joins, `currentColor`. No emojis anywhere in the poster.

See `/components/icons/TrickyIcons.tsx` for the reference set:
- `IconScissors` — half / split
- `IconRepeat` — double / loop
- `IconQuote` — wordplay / speech
- `IconArrowDown` — count down / decrease
- `IconStar` — best / important
- `IconStairs` — sequence / ascending
- `IconMinus` — take away / subtract
- `IconChecker` — chessboard / grid count
- `IconCalendar` — date / period

When creating new posters, add new icons to a topic-specific file (`/components/icons/PatternIcons.tsx`, etc.) or extend `TrickyIcons.tsx` if shared.

**Icon style rules**
- 2.4px stroke, round caps, round joins
- Fill: `none` for outlines; `currentColor` for solid shapes (use solid only for "tile" icons like checker)
- Keep them geometric & friendly — no extra decorative flourishes

---

## 5. Poster Page Layout (header / footer)

Every poster uses the same wrapper:

```
[ no-print "← Back to Topics" link ]
┌────────────────────────────────────────────────┐
│  Header banner (cream-pink gradient, 2px border)
│  [mascot 60×60 in 3px halo circle]            
│    SMALL CAPS Solveitmaths · Times Tables      [tagline pill, white, 2px border]
│    Poppins 800 Title + Caveat accent word              
├────────────────────────────────────────────────┤
│
│  Content (specific to poster)
│
├────────────────────────────────────────────────┤
│  • Solveitmaths.com    |     Times Tables · Year 0–8 │   ← Footer band (#fff5fa)
└────────────────────────────────────────────────┘
```

### Header components
- **Mascot**: 60×60 in 3px `#ffd5e8` border circle with halo `0 0 0 4px rgba(255, 105, 180, 0.10)`
- **Eyebrow**: `Solveitmaths · [Section]` — Montserrat 10px weight 800 uppercase, letter-spacing 0.32em, color `#ec407a`
- **Title**: H1 Poppins 38px weight 800, "Plain words" `#1f2937` + **one accent word in Caveat** 48px `#ec407a` rotated `-3deg`
- **Tagline pill**: max-width 280px, white bg, 2px `#ffd5e8` border, 16px radius, body 11px weight 600, with a `<span color: #ec407a fontWeight: 800>` highlight inside

### Footer band
- 2px top border (`#ffd5e8`), bg `#fff5fa`, padding `12px 28px 14px`
- Left: pink dot (10×10 `#ff69b4` with 3px halo) + **"Solveitmaths.com"** Poppins 15px weight 800 `#ec407a`
- Right: `TIMES TABLES · YEAR 0–8` Montserrat 10px weight 700 uppercase letter-spacing 0.18em color `#a18791`

### Print rules
- `@page { size: A4 landscape; margin: 7mm; }`
- Body bg matches paper cream so margins blend
- `.no-print` class hides back-link & print button
- Poster border-radius and shadow stripped in print

---

## 6. Bottom Note Pattern

Use **once** at the bottom of the content area for a friendly closer:

```
"Master these twelve facts and you know every times table!"
```

- Montserrat 12px weight 600 `#6b5560`
- Accent phrase ("every times table") in **Caveat 18px weight 700 `#ec407a`**
- Centered, marginTop 10px

---

## 7. Quick "Cute but Poster-y" Checklist

When designing a new poster, verify:
- [ ] All emojis replaced with custom SVG icons
- [ ] Display font = Poppins (not Comfortaa, not serif)
- [ ] One Caveat accent word in the title
- [ ] Result numbers use Poppins 800, sized 70–82px, accent ink color
- [ ] Card has 3-section vertical structure: header / result / chip footer
- [ ] Card border-radius 20px, border 2px solid chip color
- [ ] 4-color accent rotation (pink → mint → sunny → grape) for grids
- [ ] Footer reads "Solveitmaths.com" with pink-dot halo + meta caps right
- [ ] Mascot in 3px `#ffd5e8` circle with halo
- [ ] Paper-cream background `#fff3e6`, poster bg `#fffaf3`
- [ ] No drop shadows — only the soft pink poster halo
- [ ] No saturated/clashing brights — pastel washes only

---

## 8. Anti-Patterns (do NOT do these)

- ❌ Emojis (🃏, 📅, etc.) — use SVG icons
- ❌ Serif body fonts (Fraunces, Recoleta, etc.) — too "editorial-adult"
- ❌ Hot saturated brights without pastel washes — too garish
- ❌ Thin monoline icons (1px stroke) — too premium-cold
- ❌ Pure-white poster background — feels generic SaaS
- ❌ Multiple distinct shadows/glows — visual noise
- ❌ Per-card random palettes — must rotate the 4 brand accents

---

*Last updated: 2026-05-24. Reference build: The Tricky 12 v4 — `/poster/times-table-tricky`.*

# Design Spec: Neev Lamba Portfolio (v2)

The source of truth for how the site looks and moves. `reference/mockup.html` is the pixel reference for desktop (1280px); this file explains the system behind it so it can be rebuilt faithfully and extended.

Direction name: **Night Session** (dark, sleek, F1 live-timing feel).

---

## 1. Color tokens

All colors are CSS custom properties on the root element. Dark is the default; `.light` on the root swaps the set.

| Token | Dark (default) | Light | Used for |
|---|---|---|---|
| `--bg` | `#0D0D0F` | `#F6F5F2` | Page background |
| `--panel` | `#121215` | `#FFFFFF` | Timing board background |
| `--card` | `#16161A` | `#FFFFFF` | Off the clock cards |
| `--hover` | `#1B1B20` | `#F0EEEA` | Board row hover |
| `--line` | `#242428` | `#E3E0DA` | Borders, hairlines |
| `--dotoff` | `#2A2A2F` | `#DAD7D0` | Lights when "off" |
| `--pill` | `#3A3A40` | `#CFCBC3` | Pill / icon-button borders |
| `--text` | `#EDEBE6` | `#16161A` | Primary text |
| `--text2` | `#C9C6BF` | `#3E3C38` | Body copy, stack text |
| `--muted` | `#A19E96` | `#5F5C56` | Secondary text, nav links |
| `--faint` | `#8C8980` | `#6F6C66` | Mono labels, dates, hints |
| `--purple` | `#B388FF` | `#7B2FBE` | P1 time, film icon, lap dot |
| `--green` | `#3DDC84` | `#1E8F52` | Music icon |
| `--yellow` | `#FFD23F` | `#A77B0C` | Cocktail icon |
| `--red2` | `#FF5A4F` | `#D0201A` | Flag icon |
| `--linkhover` | `#FF4D42` | `#D0201A` | Link hover color |
| Race red (fixed) | `#FF3B30` | `#FF3B30` | Lights, car body, live dot |

Icon badge backgrounds are the icon color at 14% opacity (dark values: `rgba(255,59,48,.14)`, `rgba(61,220,132,.14)`, `rgba(179,136,255,.14)`, `rgba(255,210,63,.14)`). Keep them in light mode too.

The purple/green/yellow come from F1 timing-screen colors. They are **decorative only**; they never mean a rating.

## 2. Typography

| Role | Font | Size / weight | Notes |
|---|---|---|---|
| Display (headline) | Manrope | 88px / 600, line-height 1, letter-spacing −3px | "Hi, I'm Neev." |
| Section heading | Manrope | 32px / 600, letter-spacing −0.8px | "Experience", "About" |
| Intro sub-line | Manrope | 24px / 400, line-height 1.5, `--text2` | |
| Body | Manrope | 19px / 400, line-height 1.7, `--text2` | About paragraphs |
| Row title | Manrope | 18px / 600 | Board role |
| Card value | Manrope | 17px / 600 | |
| Nav | Manrope | 15px; name 18px / 700 | |
| Mono labels / data | JetBrains Mono | 10–13px, letter-spacing 1.2–1.5px, uppercase | Board, card labels, lap time |

Both fonts from Google Fonts (load via `next/font`). Mono is used only for "data" (timing board, labels, times). Everything a person reads as prose is Manrope.

## 3. Layout and spacing

- Content max-width **1040px** (1280px frame with 120px side padding). Page top padding 40px.
- Section gaps: intro starts 110px below nav; Experience 160px below intro; About 140px below Experience; footer pinned at the bottom with a hairline above.
- Radii: photo 20px, board 14px, cards 14px, icon badges 8px, pills and icon buttons fully round.
- Borders are 1px `--line`. No drop shadows except the lights' glow.

## 4. Components

### 4.1 Nav
- Flex row, `space-between`, all right-side items `align-items: center`, each 40px tall.
- Links: `--muted`, hover `--linkhover`.
- "Get in touch": pill, 40px tall, 0 18px padding, 1px `--pill` border, 8px extra left margin.
- Theme toggle: 40×40 circle, 1px `--pill` border, 18px stroke icon (moon in dark, sun in light). Hover: border becomes `--text`. `aria-label` "Switch to light mode" / "Switch to dark mode".

### 4.2 Intro
- Grid `420px 1fr`, gap 80px, vertically centered.
- Photo: 420×520, `object-fit: cover`, `object-position: 50% 30%`, radius 20px. Source: `neev-portrait-4x5.jpg` (960×1200). Alt text: "Neev smiling in a Michigan CS graduation stole outside a stone campus building".
- Text column, gap 28px: lights → headline → sub-line (max-width 560px) → icon links.
- Icon links: 44×44 circles, 1px `--pill` border, 18px stroke icons (LinkedIn, GitHub, mail), gap 12px; hover border `--text`. Each has an `aria-label`.

### 4.3 Lights out
- Five 14px dots, gap 12px, off color `--dotoff`.
- On: `#FF3B30` with `box-shadow: 0 0 16px #FF3B30`.
- Timing (9s loop, `step-end`): dot 1 on at 0s, dot 2 at 0.72s, dot 3 at 1.44s, dot 4 at 2.16s, dot 5 at 2.88s; all off at 4.05s; dark until 9s; repeat.
- Reduced motion: no animation, all five lit.

### 4.4 Timing board
- Container: `--panel` background, 1px `--line` border, radius 14px, overflow hidden, mono font.
- Above it: "Experience" heading left; right side a 7px red dot + "LIVE TIMING" in mono 12px `--faint`.
- Grid columns: `76px 1fr 100px 280px 110px`, gap 20px. Header row 11px mono `--faint`, padding 14px 32px.
- Rows: padding 20px 32px, 1px top border `--line`. Row hover background `--hover` (0.15s).
- POS cell: "P1" etc. 18px / 600, wrapped so the car can slide in.
- TEAM: 14px / 600, letter-spacing 1px. STACK: 13px `--text2`. TIME: 16px / 600, right-aligned; P1 in `--purple`.
- Description: Manrope 15px, `--muted`, indented 96px to align under ROLE, hidden by default (`max-height: 0; opacity: 0`), revealed to `max-height: 60px; opacity: 1; margin-top: 12px` over 0.25s.
- Below board: "Hover a row for details" (mono 12px `--faint`) left; "Full resume ↗" right.

### 4.5 The car (position marker)
- Inline SVG, 30×14, top-down F1 car pointing right: red (`#FF3B30`) rear wing, body, front wing; grey `#6A6A72` wheels; dark cockpit dot.
- Resting: `opacity: 0; transform: translateX(-28px)`, absolutely positioned at the left of the POS cell, vertically centered.
- Active (row hovered, focused, or open): `opacity: 1; translateX(0)`; the "P1" label shifts `translateX(34px)`. Easing `cubic-bezier(.2,.8,.2,1)`, 0.45s (opacity 0.25s).
- Only one car visible at a time: when the pointer is on the board, the default-open P1 row closes unless it's the hovered one.
- Reduced motion: car and label appear instantly, no slide.

Reference SVG:
```html
<svg class="car" width="30" height="14" viewBox="0 0 30 14" aria-hidden="true">
  <rect x="0" y="0" width="3" height="14" rx="1" fill="#FF3B30"/>
  <rect x="5" y="0" width="7" height="3" rx="1" fill="#6A6A72"/>
  <rect x="5" y="11" width="7" height="3" rx="1" fill="#6A6A72"/>
  <rect x="2" y="4" width="24" height="6" rx="3" fill="#FF3B30"/>
  <rect x="18" y="0" width="6" height="3" rx="1" fill="#6A6A72"/>
  <rect x="18" y="11" width="6" height="3" rx="1" fill="#6A6A72"/>
  <rect x="26" y="1" width="3" height="12" rx="1" fill="#FF3B30"/>
  <circle cx="12" cy="7" r="1.8" fill="#121215"/>
</svg>
```

### 4.6 About + Off the clock
- Grid `1fr 460px`, gap 96px, top-aligned.
- Left: "About" heading, two paragraphs, gap 22px.
- Right: "OFF THE CLOCK" mono label (11px, `--faint`), then a 2×2 grid, gap 12px.
- Card: padding 20px, `--card` background, 1px `--line` border, radius 14px, gap 12px.
  - Top line: 28×28 icon badge (radius 8px, tinted background, icon in its color) + mono label 10px `--faint`, gap 10px.
  - Value 17px / 600; sub-line 13px `--faint`.
- Icons (24-unit viewBox, 1.8 stroke, round caps), 14px:
  - Flag: `M5 21V4` + `M5 4h12l-2.5 4.5L17 13H5`
  - Music: `M9 18V5l11-2v13`, circles (6,18,r3) and (17,16,r3)
  - Film: rect 3,4 18×16 r2 + `M8 4v16M16 4v16M3 9h5M3 15h5M16 9h5M16 15h5`
  - Cocktail: `M4 4h16l-8 9z` + `M12 13v7` + `M8 20h8`

### 4.7 Footer
- Hairline top border, 28px padding-top.
- Left: email (text color), LinkedIn and GitHub (`--muted`), gap 28px.
- Right: 8px `--purple` dot + mono 13px `--faint` lap time.

### 4.8 Projects: "In the garage" (hidden until data exists)
- Heading "In the garage" (32px / 600), then a list with hairline dividers like the board: name (18px / 600), one-liner (`--muted`), stack (mono `--faint`), "View →" link on the right.

## 5. Motion summary

| Element | Trigger | Duration / easing | Reduced motion |
|---|---|---|---|
| Lights | Continuous loop | 9s cycle, step-end | Static, all lit |
| Car + label shift | Row hover / focus / open | 0.45s `cubic-bezier(.2,.8,.2,1)` | Instant |
| Row description | Same | 0.25s | Instant |
| Row background | Hover | 0.15s | Keep |
| Theme switch | Toggle click | 0.3s background/color | Instant |

## 6. Accessibility rules

- Contrast: all text pairs above are AA in both themes; don't introduce lighter greys.
- Board rows are focusable (`tabindex="0"` or buttons); focus behaves like hover; Enter/Space toggles on touch/keyboard. Use `aria-expanded` on the row trigger.
- Icon-only controls have `aria-label`. Decorative SVGs have `aria-hidden="true"`.
- Visible focus ring: 2px `--text` outline, 2px offset.

## 7. Theming implementation notes

- Dark default regardless of OS setting (decision D-15).
- Persist choice in `localStorage("theme")`. Set the class in an inline script in `<head>` before first paint to prevent a flash.
- `body` background must switch with the theme too.

## 8. Responsive rules (not yet mocked; review on a real phone, open item O-01)

| Breakpoint | Changes |
|---|---|
| ≥ 1100px | As designed |
| 900–1099px | Side padding 48px; intro grid `340px 1fr`; headline 72px; About grid stacks (text, then cards below, cards stay 2×2) |
| 600–899px | Intro stacks: photo on top (max 360px wide, 4:5), text below; headline 56px. Board hides the STACK column. Nav: name, Get in touch, theme toggle; Work/About/Resume move into a simple menu button |
| < 600px | Side padding 20px; headline 44px; sub-line 19px. Board shows POS, ROLE (with TEAM on the line under the title), TIME. Descriptions indent 0. Cards: 2×2 above 420px, single column below. Footer stacks, lap time last |

Touch: rows toggle on tap (one open at a time); hint reads "Tap a row for details".

# PRD: Neev Lamba Personal Portfolio (v2)

| | |
|---|---|
| Owner | Neev Lamba |
| Status | Design approved, ready to build |
| Last updated | 2026-09-26 |
| Visual reference | `reference/mockup.html` (open in a browser) and the design canvas "Neev Portfolio Directions" on claude.ai, tab "Current portfolio" |
| Companion docs | `DESIGN_SPEC.md`, `CONTENT.md`, `TECH_SPEC.md`, `DECISIONS.md`, `BUILD_PLAN.md`, `CLAUDE.md` |

---

## 1. Summary

A single-page personal website for Neev Lamba, a software engineer at Citi in New York. It replaces a two-year-old React portfolio that read like a template and a copy of the resume. The new site is **captivating, simple and unique**: a calm, dark, readable page with one strong personal theme (Formula 1) and a few small, live glimpses of who Neev is outside work.

The one-line positioning: **an engineer who thinks like a product person.**

## 2. Goals

1. **Make a recruiter or hiring manager think more positively about Neev as a candidate** within the first screen.
2. **Show experience without repeating the resume.** Short, scannable, no walls of text, no bullet dumps.
3. **Feel unmistakably like Neev.** Personality comes from Formula 1, music, movies and cocktails, shown in small, tasteful ways.
4. **Stay simple.** Nothing on the page should distract from the content or feel "a bit much".
5. **Be low maintenance.** Live elements update themselves; Neev should only need to edit content files.

## 3. Non-goals (for v1)

- A projects or case-study section (Neev doesn't have projects he wants to feature yet; see §7.6 for the hidden, ready-to-enable section).
- A blog, writing section, or CMS.
- A contact form (the old site's getform.io form is dropped; email link only).
- Analytics dashboards, comments, or any login.
- Multiple pages. It's one page with anchor links.

## 4. Audience

| Audience | What they need | How the site serves it |
|---|---|---|
| Software engineering recruiters and hiring managers (primary) | Who is this, where does he work, what has he done, how do I reach him | Intro + photo, F1 timing board, icon links in the first screen, resume link |
| Product-leaning recruiters (primary) | Evidence of product thinking | Intro line about "the people on the other side", PM/analyst roles on the board, About text |
| Peers, friends, people Neev meets | A sense of who he is | Off the clock cards, F1 theme, photo |

## 5. Personality and design principles

Neev's friends would describe him as **calm and put-together, with good taste.** The site should read the same way.

1. **Calm base, one strong theme.** Dark, clean, readable. Formula 1 is the single signature theme; everything else is quiet.
2. **Nothing ranks or grades Neev.** No skill bars, no "led / contributed" labels, no bare metrics without context.
3. **Less text.** If a sentence doesn't change what a recruiter thinks, cut it. The resume holds the detail.
4. **Small touches that reward attention.** Lights out, the car on hover, the lap-time footer, the live cards.
5. **Never at the expense of readability or accessibility.** All motion respects "reduce motion"; contrast meets WCAG AA in both themes.

## 6. Page structure (top to bottom)

1. **Nav bar**
2. **Intro ("Hi, I'm Neev.")** with photo, lights-out sequence, icon links
3. **Experience: F1 timing board**
4. **About + Off the clock**
5. **Footer** with email, links, lap time

(Hidden until enabled: **Projects / "In the garage"** between Experience and About.)

## 7. Functional requirements

### 7.1 Nav bar
- Left: "neev lamba" (lowercase, bold) linking to top.
- Right: `Work` (→ Experience), `About`, `Resume` (opens PDF in a new tab), a pill button `Get in touch` (→ footer / mailto), and a round **theme toggle** button (moon in dark mode, sun in light mode).
- All nav items are vertically centered on one line and share a 40px height (text links and pill line up exactly).
- Smooth-scroll to anchors.

### 7.2 Intro
- Layout: photo on the **left** (portrait, 4:5, rounded corners), text on the **right**.
- Above the headline: the **lights-out sequence** (five red dots, see §7.7).
- Headline: **"Hi, I'm Neev."**
- Sub-line: **"I'm a product-minded engineer at Citi in New York, working on payment systems. I like owning what I build, from the first idea to the finished product. Outside of work, I'm usually watching F1, catching a new film, trying a new restaurant, or learning a new cocktail technique."**
- Below: three round **icon links**: LinkedIn, GitHub, Email. No "See my experience" or "Resume" buttons (they duplicated the nav and the section right below).

### 7.3 Experience: F1 timing board
Styled like a Formula 1 live-timing screen.
- Header row: `POS · ROLE · TEAM · STACK · TIME`, with a small red dot and "LIVE TIMING" label above the board.
- One row per role, most recent first (P1 = current role). Five rows in v1 (see `CONTENT.md`).
- Columns:
  - **POS**: P1–P5.
  - **ROLE**: title, with years underneath in small mono text.
  - **TEAM**: short company code (CITI, BORN, AMBER, MECC).
  - **STACK**: 2–3 tools or disciplines.
  - **TIME**: time in role, formatted like a lap time, e.g. `1Y 03M`. The current role's time is **computed from its start date** so it never goes stale. The P1 time is shown in the accent purple.
- **Hover (desktop):** the row highlights, a tiny top-down **red F1 car slides in beside the position label** (the label shifts right to make room), and a **one-sentence description** expands below the row.
- **Default state:** P1 is open (car and description visible) so visitors discover the interaction. When the pointer is over any other row, P1 closes.
- **Touch devices:** tapping a row toggles it open (accordion; one open at a time). Hint text changes from "Hover a row for details" to "Tap a row for details".
- Below the board: hint text on the left, "Full resume ↗" link on the right.
- Explicitly **not** included: sector bars, led/strong/contributed ratings, impact numbers (decision D-09).

### 7.4 About
- Two-column block: text on the left, **Off the clock** on the right.
- Two short paragraphs (see `CONTENT.md`).

### 7.5 Off the clock (2×2 cards)
Each card: a small colored icon on a tinted square, a mono label, a main value and a sub-line.

| Card | Icon / color | Main value | Sub-line | Source |
|---|---|---|---|---|
| NEXT RACE | Flag / red | Next Grand Prix name | Countdown, e.g. `06d 14h` | Public F1 calendar API, automatic |
| LAST BITE | Fork and knife / green | Last restaurant | "via Beli" (links to Neev's Beli profile) | Manual, `data/site.json` (Beli has no public API; D-32) |
| LAST WATCHED | Film strip / purple | Film title | "via Letterboxd" (optionally Neev's star rating) | Letterboxd RSS, automatic |
| BEHIND THE BAR | Cocktail glass / yellow | Go-to cocktail | "Currently perfecting" | Manual, `data/site.json` |

- Every live card must **fail gracefully**: if a source is down or not configured, show a sensible fallback (see `TECH_SPEC.md`), never an error or an empty box.
- Neev never has to update the race or movie cards by hand; Last bite and Behind the bar are one-line edits.

### 7.6 Projects: "In the garage" (built, hidden)
- A section between Experience and About that renders **only when `data/projects.json` has at least one entry**.
- Each project: name, one-line description, stack, link. Same visual language as the board (mono labels, hairlines).
- Ships hidden in v1 so the page never looks empty; Neev adds a project later by editing one file.

### 7.7 Lights-out sequence
- Five red dots above the headline, like an F1 start.
- Loops continuously and slowly: lights come on one at a time (~0.72s apart), hold, all go out together, stay dark, repeat. Full cycle **9 seconds**.
- Never blocks or delays content.
- With "reduce motion" on: no animation; all five dots show lit, static.

### 7.8 Footer
- Left: email address (mailto), LinkedIn, GitHub.
- Right: the **lap time**: the page's real measured load time, formatted like an F1 lap: `0.84s · fastest lap` with a small purple dot. (Label rule in `TECH_SPEC.md`.)

### 7.9 Theme (dark / light)
- **Dark is the default** for every visitor.
- The nav toggle switches to light and back; the choice is remembered on that device.
- No flash of the wrong theme on load.
- Both themes meet WCAG AA contrast. Light palette in `DESIGN_SPEC.md`.

### 7.10 Responsive
- Designed at 1280px desktop; must work from 360px up with no horizontal scroll. Rules in `DESIGN_SPEC.md` §8. Mobile has not been mocked yet (open item O-01).

## 8. Non-functional requirements

- **Performance:** Lighthouse Performance ≥ 95 on desktop and ≥ 90 on mobile. The portrait ships as optimized responsive images (the old site's 12–13 MB photos are not reused). Total JS kept minimal; live data fetched server-side and cached.
- **Accessibility:** WCAG 2.2 AA. Keyboard reachable (board rows focusable; focus opens a row like hover). Icon-only buttons have `aria-label`s. Motion respects `prefers-reduced-motion`.
- **SEO / sharing:** title "Neev Lamba · Software Engineer", meta description, Open Graph image, favicon.
- **Privacy:** no tracking cookies. No secrets are needed; any future keys live only in server environment variables.
- **Maintainability:** all copy and experience data live in `data/` files; no content hard-coded in components.

## 9. Success criteria (launch checklist)

- [ ] Page matches `reference/mockup.html` on desktop in both themes.
- [ ] All three live cards show real data in production, and a fallback when their source is unavailable.
- [ ] Current role time updates automatically each month.
- [ ] Lap time shows a real measured value.
- [ ] Works on a phone (iOS Safari, Android Chrome) with tap-to-open rows.
- [ ] Lighthouse and accessibility targets met.
- [ ] Deployed on a public URL; resume PDF, email, LinkedIn and GitHub links all work.

## 10. Open items

| ID | Item | Default if not decided |
|---|---|---|
| O-01 | Review a mobile mockup | Build to the responsive rules in `DESIGN_SPEC.md` §8, then review on a real phone |
| O-02 | Custom domain | Launch on the Vercel URL; add a domain later |
| O-03 | Neev's go-to cocktail | Placeholder text until Neev fills `data/site.json` |
| O-04 | Letterboxd username | Card shows fallback until set |
| O-05 | ~~Spotify connection~~ Replaced by the manual Last bite card (D-32) | — |
| O-06 | A more candid photo | Keep the Michigan graduation photo; swap anytime |
| O-07 | Favicon and Open Graph image design | Five red dots in a row on dark (favicon: single red dot) |
| O-08 | Final wording of About and row descriptions | Use the drafts in `CONTENT.md` |

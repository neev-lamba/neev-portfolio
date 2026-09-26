# Tech Spec: Neev Lamba Portfolio (v2)

How the site described in `PRD.md` and `DESIGN_SPEC.md` is built, run and deployed.

## 1. Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js 16** (App Router, Turbopack) + React 19 + TypeScript | Breaking changes vs older Next: see `AGENTS.md` and `node_modules/next/dist/docs/` |
| Styling | **Tailwind CSS v4** + CSS custom properties | No `tailwind.config`; tokens, breakpoints and animations live in `app/globals.css` |
| Fonts | `next/font/google`: Manrope, JetBrains Mono | Self-hosted at build time |
| Images | `next/image` | Responsive portrait |
| Hosting | **Vercel** (Hobby) | Push to `main` = production deploy |
| Runtime | Node 24 LTS locally (Next 16 needs ≥ 20.9) | npm |

No database, CMS, auth, analytics or UI/animation libraries.

## 2. Repository layout

```
/
├─ app/
│  ├─ layout.tsx            # fonts, metadata, no-flash theme script
│  ├─ page.tsx              # the single page; revalidate = 3600
│  ├─ globals.css           # tokens (dark/light), breakpoints, lights + board CSS
│  ├─ icon.svg              # favicon: "n." monogram (D-33)
│  ├─ apple-icon.tsx        # iOS home-screen icon (generated PNG)
│  ├─ opengraph-image.tsx   # link-preview image (generated PNG)
│  └─ api/
│     ├─ next-race/route.ts
│     └─ last-watched/route.ts
├─ components/
│  ├─ Nav.tsx, MobileMenu.tsx*, ThemeToggle.tsx*
│  ├─ Intro.tsx, LightsOut.tsx
│  ├─ Experience.tsx, TimingBoard.tsx*, Car.tsx
│  ├─ Garage.tsx            # projects; renders nothing while projects.json is empty
│  ├─ About.tsx, Card.tsx, NextRaceCard.tsx*
│  ├─ Footer.tsx, LapTime.tsx*
│  └─ Icons.tsx
├─ lib/
│  ├─ content.ts            # typed access to data/*.json
│  ├─ live.ts               # server fetchers: next race, Letterboxd
│  ├─ hooks.ts              # useIsLight, useCanHover, useNow
│  ├─ tenure.ts             # months → "1Y 03M"
│  └─ format.ts             # countdown "06d 14h"
├─ data/                    # all copy and content (site.json, experience.json, projects.json)
├─ public/                  # neev-portrait-4x5.jpg, Lamba_Neev_Resume.pdf
├─ docs/                    # product/design docs + reference/mockup.html
├─ next.config.ts           # security headers, turbopack root
├─ CLAUDE.md, AGENTS.md, README.md
└─ .env.example             # optional LETTERBOXD_USERNAME only
```
`*` = client component. Everything else renders on the server.

## 3. Data and logic

### 3.1 Tenure (TIME column)
`lib/tenure.ts`: months between `start` and `end` ("YYYY-MM"; `end: null` = current month) as `{Y}Y {MM}M`. The page re-renders at least hourly, so the current role ticks over each month without a deploy.

### 3.2 Next race
- Source: Jolpica F1 API, `https://api.jolpi.ca/ergast/f1/current.json` (full season), cached 1 hour. If the season is over, it falls back to the next season's schedule.
- `getNextRace()` returns up to three upcoming races `{ races: [{ name, startsAt }], seasonOver }` so the client can roll over to the next race without a refetch (D-29).
- `NextRaceCard` picks the first race whose start + 3h is still ahead, shows a countdown that updates every minute (`06d 14h`, or `14h 22m` under a day), "Racing now" for 3h after lights out, and prefixes "Season's over" when showing next season's opener. The countdown renders after hydration to avoid a server/client mismatch.
- Fallback: "Next Grand Prix" / "Schedule loading".

### 3.3 Last watched
- Source: Letterboxd RSS `https://letterboxd.com/{username}/rss/`, cached 1 hour. Username from `LETTERBOXD_USERNAME` env var, else `data/site.json → offTheClock.letterboxdUsername` (`neev03`).
- Takes the first item with `letterboxd:filmTitle` (lists are skipped). The card links to the film. Star rating is hidden unless `offTheClock.showLetterboxdRating` is `true` (D-31).
- Fallback: "Nothing logged yet" / "via Letterboxd".

### 3.4 Manual cards
- **Last bite:** `offTheClock.lastBite` (`value`, `sub`, `url` → Neev's Beli profile). Beli has no public API and its terms ban scraping (D-32).
- **Behind the bar:** `offTheClock.behindTheBar`.

### 3.5 Lap time (footer)
`LapTime` measures `loadEventEnd − startTime` from the Navigation Timing API on the tick after `load`, and shows `0.84s · fastest lap` (under 1.5s) or `· lap time`. The server renders `-.--s · lap time`.

### 3.6 Theme
- `:root` holds dark tokens; `:root.light` holds light tokens.
- An inline `<head>` script adds `.light` before paint only if `localStorage.theme === "light"`. OS preference is ignored (D-15).
- `ThemeToggle` flips the class and saves the choice. Both icons render and CSS shows the right one, so the first paint is correct.

### 3.7 Timing board
- State: `openId` (defaults to P1) and `hoverId`. Active row = `hoverId ?? openId`.
- Mouse (`pointerType === "mouse"`): hover activates; leaving the board restores P1.
- Touch: tap toggles a row (one open at a time). The hint switches to "Tap a row for details" on devices without hover.
- Keyboard: rows are `<button aria-expanded>`; keyboard focus (`:focus-visible`) activates, Enter/Space toggles.
- `data-active` drives the car, label shift and description reveal in CSS; `data-hover` drives the row background.

## 4. Environment variables
None are required. `.env.example` documents one optional server-only override, `LETTERBOXD_USERNAME`. If any key is ever added: server-only (no `NEXT_PUBLIC_`), set in Vercel → Settings → Environment Variables, never committed (`.env*` is git-ignored).

## 5. Security
- No secrets in the code, the git history or the client bundle. Browser source maps are off.
- Headers on every route (`next.config.ts`): Content-Security-Policy (same-origin only; `frame-ancestors 'none'`), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, a restrictive `Permissions-Policy`. Vercel adds HSTS.
- The browser only talks to this site: fonts are self-hosted, and external data is fetched server-side.
- Public by Neev's choice: email, phone and building address in the resume, and the photo (D-30).

## 6. Performance
- Lighthouse at launch: mobile 99 / 100 / 100 / 100, desktop 100 across the board (Performance / Accessibility / Best Practices / SEO). CLS 0.
- Portrait via `next/image` with `priority` and sizes for 420 / 340 / 360px.
- CSS-only animation. Client JS is limited to the five client components above.

## 7. Quality checks before a push
- `npm run lint` and `npm run build` pass.
- Look at 1280px in dark and light, and at 375px (no horizontal scroll).
- For board/animation changes: hover each row, tab through with the keyboard, and check reduce motion.
- For data changes: break the source (e.g. a wrong username) and confirm the fallback shows.

## 8. Deployment
- GitHub `neev-lamba/neev-portfolio` → Vercel project `neev-portfolio`. Push to `main` deploys production; other branches get preview URLs.
- Domains: `www.neevlamba.com` (primary), `neevlamba.com` → redirects to www, plus `neev-portfolio-eta.vercel.app`.
- Link previews use `VERCEL_PROJECT_PRODUCTION_URL` for absolute URLs, so they follow the primary domain automatically.

## 9. Local development notes (Neev's Windows machine)
- Node 24 is at `C:\Program Files\nodejs`. `.claude/launch.json` starts the dev server with that path.
- A stray `package-lock.json` in the home folder confused Next's root detection, so `turbopack.root` is pinned in `next.config.ts`.
- Git uses the GitHub CLI as its credential helper for github.com.

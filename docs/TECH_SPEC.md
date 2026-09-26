# Tech Spec: Neev Lamba Portfolio (v2)

How to build, run and deploy the site described in `PRD.md` and `DESIGN_SPEC.md`.

> External API endpoints below are the ones commonly used for each service as of this writing. They could not be tested from the planning environment, so **verify each one at build time** and adjust if the provider has changed.

---

## 1. Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js (App Router) + TypeScript** | Neev already knows React and Next.js; server route handlers keep API secrets off the client; static rendering with timed revalidation |
| Styling | **Tailwind CSS** + CSS custom properties for theme tokens | Neev's old site used Tailwind; tokens in `DESIGN_SPEC.md` map to CSS variables |
| Fonts | `next/font/google`: Manrope, JetBrains Mono | Self-hosted, no layout shift |
| Images | `next/image` | Responsive, compressed portrait |
| Hosting | **Vercel** (free Hobby plan) | Zero-config Next.js hosting, env vars, preview deploys per branch |
| Package manager | npm | Simple |

No database, CMS, auth or analytics in v1.

## 2. Repository layout

```
/
├─ app/
│  ├─ layout.tsx          # fonts, <head>, theme no-flash script, metadata
│  ├─ page.tsx            # the single page, composes sections
│  ├─ globals.css         # tokens (dark/light), keyframes, base styles
│  └─ api/
│     ├─ next-race/route.ts
│     ├─ now-playing/route.ts
│     └─ last-watched/route.ts
├─ components/
│  ├─ Nav.tsx
│  ├─ ThemeToggle.tsx     # client component
│  ├─ Intro.tsx
│  ├─ LightsOut.tsx
│  ├─ TimingBoard.tsx     # client component (hover/tap/keyboard state)
│  ├─ Car.tsx             # the SVG
│  ├─ Garage.tsx          # projects; renders nothing if list is empty
│  ├─ About.tsx
│  ├─ OffTheClock.tsx     # 2×2 cards, fetches the three live endpoints
│  ├─ Icons.tsx           # flag, music, film, cocktail, linkedin, github, mail, sun, moon
│  └─ Footer.tsx          # includes LapTime (client)
├─ data/
│  ├─ site.json
│  ├─ experience.json
│  └─ projects.json
├─ lib/
│  ├─ tenure.ts           # months → "1Y 03M"
│  └─ format.ts           # countdown, etc.
├─ public/
│  ├─ neev-portrait-4x5.jpg
│  ├─ Lamba_Neev_Resume.pdf
│  ├─ favicon.ico / icon.svg
│  └─ og.png
├─ docs/                  # copy of this planning kit (PRD, specs, decisions, mockup)
├─ CLAUDE.md
└─ .env.example
```

## 3. Data and logic

### 3.1 Tenure ("TIME" column)
```ts
// start/end are "YYYY-MM"; end null = current month
export function tenure(start: string, end: string | null, now = new Date()): string {
  const [sy, sm] = start.split("-").map(Number);
  const [ey, em] = end ? end.split("-").map(Number) : [now.getFullYear(), now.getMonth() + 1];
  const months = Math.max(0, (ey - sy) * 12 + (em - sm));
  return `${Math.floor(months / 12)}Y ${String(months % 12).padStart(2, "0")}M`;
}
```
Examples: 2024-05 → 2024-08 = `0Y 03M`; 2022-12 → 2023-12 = `1Y 00M`. The page revalidates at least daily so the current role ticks over each month.

### 3.2 Next race card: `GET /api/next-race`
- Source: Jolpica F1 API (the community successor to Ergast), `https://api.jolpi.ca/ergast/f1/current/next.json`. Read `MRData.RaceTable.Races[0]`: `raceName`, `date`, `time` (UTC).
- Response: `{ name: "Singapore Grand Prix", startsAt: "2026-10-04T12:00:00Z" }`.
- Cache: `revalidate = 3600` (1 hour).
- Client computes the countdown and re-renders every minute: `06d 14h` (drop days when 0: `14h 22m`). During a race weekend within 3 hours after start show "Racing now"; after the season ends show "Season's over" and the next season's first race when available.
- Fallback (API down or empty): value "Next Grand Prix", sub "Schedule loading".

### 3.3 ~~Now playing card~~ (removed, D-32)
Replaced by the manual **Last bite** card: `data/site.json → offTheClock.lastBite` (`value`, `sub`, `url`). Beli has no public API and its terms ban scraping, so it is edited by hand. The original Spotify notes are kept below for reference.

#### (Superseded) Now playing via Spotify
- Source: Spotify Web API.
  1. Exchange refresh token for an access token: `POST https://accounts.spotify.com/api/token` (`grant_type=refresh_token`, Basic auth with client id/secret).
  2. `GET https://api.spotify.com/v1/me/player/currently-playing`. If 204 / nothing playing, fall back to `GET https://api.spotify.com/v1/me/player/recently-played?limit=1` and label sub-line "Last played · {artist}".
- Scopes needed: `user-read-currently-playing user-read-recently-played`.
- One-time setup: create a Spotify developer app, authorize once to obtain a refresh token (Claude Code can walk Neev through it), store in env vars.
- Cache: `revalidate = 60`. Client refreshes every 60s while the tab is visible.
- Response: `{ track, artist, url, isPlaying }`. Card links to the track on Spotify.
- Fallback: "Not playing right now" / "Check back later".
- Alternative if Spotify setup is a hassle: Last.fm `user.getrecenttracks` (needs only an API key + username, requires Spotify→Last.fm scrobbling).

### 3.4 Last watched card: `GET /api/last-watched`
- Source: Letterboxd public RSS, `https://letterboxd.com/{username}/rss/`. Parse the first `<item>`: film title (`letterboxd:filmTitle`), year (`letterboxd:filmYear`), rating (`letterboxd:memberRating`, optional), link.
- Username from `LETTERBOXD_USERNAME` env var (or `data/site.json`).
- Cache: `revalidate = 3600`.
- Response: `{ title, year, rating, url }`. Card value = title, sub = "via Letterboxd" (optionally "★ 4.0 · via Letterboxd").
- Fallback: "Nothing logged yet" / "via Letterboxd".

### 3.5 Behind the bar card
Static from `data/site.json → offTheClock.behindTheBar`.

### 3.6 Lap time (footer)
Client component, after `load`:
```ts
const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
const ms = nav ? nav.loadEventEnd - nav.startTime : performance.now();
const s = (ms / 1000).toFixed(2);
const label = ms < 1500 ? "fastest lap" : "lap time";
// render `${s}s · ${label}`
```
Render a neutral placeholder (`-.--s · lap time`) on the server so there's no hydration mismatch.

### 3.7 Theme
- `globals.css`: `:root { dark tokens }` and `:root.light { light tokens }` (values in `DESIGN_SPEC.md` §1).
- Inline script in `<head>` (before paint): `try{ if(localStorage.theme==="light") document.documentElement.classList.add("light") }catch(e){}`.
- `ThemeToggle` flips the class and writes `localStorage.theme`. Dark is the default; OS preference is ignored.

### 3.8 Timing board interaction
- State: `openId` (defaults to the first row) and `hoverId`.
- Desktop (hover-capable, `(hover: hover)`): row is "active" if hovered, or if nothing is hovered and it's `openId`. Mouse leaving the board restores P1.
- Touch: tapping a row sets `openId` (tap again to close). One open at a time.
- Keyboard: each row is a `<button>`-like element with `aria-expanded`; focus = active; Enter/Space toggles.
- Active row: `data-active="true"` drives CSS (car slide, label shift, description reveal).

### 3.9 Lights out
Pure CSS keyframes (see `DESIGN_SPEC.md` §4.3); reference implementation is in `reference/mockup.html`. Respect `prefers-reduced-motion`.

## 4. Environment variables

`.env.example`:
```
LETTERBOXD_USERNAME=   # optional; overrides data/site.json
```
All server-only (no `NEXT_PUBLIC_` prefix). Set them in Vercel → Project → Settings → Environment Variables. The site must build and render with all of them empty (cards show fallbacks).

## 5. Performance budget

- Portrait via `next/image`, `priority`, sizes for 420px desktop / 100vw mobile.
- No client JS beyond: ThemeToggle, TimingBoard, OffTheClock (countdown + refresh), LapTime.
- No animation libraries; CSS only.
- Targets: Lighthouse Performance ≥ 95 desktop / ≥ 90 mobile, CLS < 0.05, LCP < 2.0s.

## 6. Quality checks before deploy

- `npm run lint`, `npm run build` pass.
- Visual check against `reference/mockup.html` at 1280px in both themes.
- Resize to 375px: no horizontal scroll; board and cards follow `DESIGN_SPEC.md` §8.
- Turn on reduce motion (OS setting): lights static, car appears without sliding.
- Kill network to each API (or unset env vars): each card shows its fallback.
- Keyboard: Tab through nav, links, board rows; focus is visible.
- Lighthouse run on the deployed preview.

## 7. Deployment

1. Create a new GitHub repo (suggested name `neev-portfolio`, or a `v2` branch in the existing one; see open items).
2. Push; import the repo in Vercel; framework preset Next.js; add env vars.
3. Every push to `main` deploys production; other branches get preview URLs.
4. Optional: add a custom domain in Vercel → Domains (open item O-02).

## 8. The old site

The previous site is a Create React App + Tailwind project (folder `neev-portfolio` on Neev's device, copy in project files). Nothing is reused except the LinkedIn/GitHub URLs. Its 12–13 MB images (`neevimg.jpg`, `neevimg.JPEG`) should not be carried over.

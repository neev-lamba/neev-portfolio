# Build Plan: Neev Lamba Portfolio (v2)

A step-by-step path from an empty repo to a deployed site. Each milestone ends with something Neev can look at. Check boxes as you go.

## Before you start (Neev, ~10 minutes)
- [ ] Decide: new GitHub repo (recommended, e.g. `neev-portfolio`) or a `v2` branch of the old one.
- [ ] Have handy: Letterboxd username; Spotify login (for a one-time authorization); your go-to cocktail.
- [ ] Confirm the LinkedIn and GitHub URLs in `CONTENT.md` are still correct.

## M1: Scaffold
- [ ] `npx create-next-app@latest` (TypeScript, App Router, Tailwind, ESLint).
- [ ] Copy this kit into `docs/` and `CLAUDE.md` to the repo root; copy `data/*.json` into `data/`.
- [ ] Put `neev-portrait-4x5.jpg` and the latest `Lamba_Neev_Resume.pdf` in `public/`.
- [ ] Fonts via `next/font` (Manrope, JetBrains Mono). Theme tokens + no-flash script.
- **Check:** blank dark page with correct fonts; toggle flips to light and persists on reload.

## M2: Static page, desktop
- [ ] Nav, Intro (with lights), Timing board (static, P1 open), About + Off the clock (static fallbacks), Footer.
- [ ] Content comes only from `data/`.
- [ ] Tenure computed with `lib/tenure.ts`.
- **Check:** side by side with `docs/reference/mockup.html` at 1280px in both themes.

## M3: Interactions
- [ ] Board hover / focus / tap logic, car slide, description reveal, one active row at a time.
- [ ] Lights loop; reduced-motion behavior.
- [ ] Lap time in footer.
- **Check:** hover each row; tab through with keyboard; turn on reduce motion.

## M4: Live data
- [ ] `/api/next-race` + client countdown.
- [ ] `/api/last-watched` from Letterboxd RSS.
- [ ] `/api/now-playing` from Spotify (walk Neev through the one-time refresh-token setup).
- [ ] Fallbacks when env vars are empty or a source fails.
- **Check:** real data in all three cards locally; unset each env var and confirm fallback.

## M5: Responsive + polish
- [ ] Breakpoints from `DESIGN_SPEC.md` §8; tap-to-open rows; "Tap a row for details".
- [ ] Metadata, favicon, OG image.
- [ ] Hidden "In the garage" section wired to `projects.json` (verify it renders with a dummy entry, then empty it again).
- **Check:** real phone test (open item O-01); Lighthouse ≥ targets.

## M6: Deploy
- [ ] Push to GitHub; import in Vercel; add env vars; deploy.
- [ ] Run the launch checklist in `PRD.md` §9 on the production URL.
- [ ] Optional: custom domain.

## After launch: how to update
| To change | Edit |
|---|---|
| Wording, links, cocktail | `data/site.json` |
| A new job / role details | `data/experience.json` (newest first) |
| Add a project | `data/projects.json` (section appears automatically) |
| Photo | Replace `public/neev-portrait-4x5.jpg` (keep 4:5) |
| Resume | Replace `public/Lamba_Neev_Resume.pdf` |
Push to `main` and Vercel redeploys.

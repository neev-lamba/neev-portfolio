# Build Plan: Neev Lamba Portfolio (v2)

The site was built in six milestones and launched on 2026-09-26. This file records what was done and how to ship changes now.

## Updating the site

1. Edit the file (see the table below).
2. Run `npm run dev` and check http://localhost:3000 at desktop width and on a phone-sized window, in dark and light.
3. `npm run lint` and `npm run build` must pass.
4. Commit and push to `main`. Vercel deploys to https://www.neevlamba.com in about a minute.

| To change | Edit |
|---|---|
| Intro, About, labels, links, meta description | `data/site.json` |
| Last bite restaurant, Behind the bar cocktail | `data/site.json` → `offTheClock` |
| A role on the timing board (newest first) | `data/experience.json` |
| Add a project (section appears automatically) | `data/projects.json` |
| Photo | Replace `public/neev-portrait-4x5.jpg` (keep 4:5, face in the upper third) |
| Resume | Replace `public/Lamba_Neev_Resume.pdf` (keep the file name) |

Log any new product or design decision in `DECISIONS.md` and keep `CONTENT.md` in sync with `data/`.

## Build history (complete)

- [x] **M1 Scaffold:** Next.js 16 + TypeScript + Tailwind v4, fonts via `next/font`, theme tokens, no-flash theme script.
- [x] **M2 Static page:** nav, intro with lights, timing board, About + Off the clock, footer; all copy from `data/`; tenure from `lib/tenure.ts`. Matched `reference/mockup.html` at 1280px in both themes.
- [x] **M3 Interactions:** board hover / focus / tap, car slide, description reveal, one active row; lights loop; reduced motion; lap time.
- [x] **M4 Live data:** next race (Jolpica) and last watched (Letterboxd RSS) with fallbacks. Spotify was dropped for a manual Last bite card (D-32).
- [x] **M5 Responsive + polish:** breakpoints from `DESIGN_SPEC.md` §8, metadata, favicon (D-33), Open Graph image, hidden "In the garage" section verified with a dummy entry.
- [x] **M6 Deploy:** GitHub repo, Vercel, custom domain `neevlamba.com` (D-35), security headers. Launch checklist in `PRD.md` §9 passed on production.

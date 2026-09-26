# CLAUDE.md: Neev Lamba Portfolio

Neev Lamba's personal site. It is **built and live**; your job is to maintain and extend it without breaking the approved design.

| | |
|---|---|
| Live | https://www.neevlamba.com (apex `neevlamba.com` redirects to www; old URL `neev-portfolio-eta.vercel.app` still works) |
| Repo | https://github.com/neev-lamba/neev-portfolio (public, branch `main`) |
| Hosting | Vercel (Hobby). Every push to `main` deploys production in about a minute |
| Stack | Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4 · Node 24 LTS |

Next.js 16 has breaking changes from older versions: read `AGENTS.md` and the bundled docs in `node_modules/next/dist/docs/` before writing Next-specific code.

## Where things live

| To change | Edit |
|---|---|
| Any visible text (intro, About, nav, labels, hints, footer), links, meta description | `data/site.json` |
| Last bite restaurant / Behind the bar cocktail | `data/site.json` → `offTheClock.lastBite` / `offTheClock.behindTheBar` |
| Timing board rows (newest first; TIME is computed from `start`/`end`) | `data/experience.json` |
| Projects ("In the garage" appears once this has entries) | `data/projects.json` |
| Photo / resume | `public/neev-portrait-4x5.jpg` (keep 4:5) / `public/Lamba_Neev_Resume.pdf` |
| Colors, fonts, lights and board animation | `app/globals.css` |
| Security headers (CSP etc.) | `next.config.ts` |
| Favicon / iOS icon / link-preview image | `app/icon.svg` / `app/apple-icon.tsx` / `app/opengraph-image.tsx` |
| Live data (next race, Letterboxd) | `lib/live.ts`, served by `app/api/*` |

Components are in `components/` (one per section; `TimingBoard`, `ThemeToggle`, `MobileMenu`, `NextRaceCard` and `LapTime` are the only client components).

## Docs (in `docs/`)
- `DECISIONS.md`: every design and product decision with the reason. **Check here before changing or "improving" anything**, and add a row for any new decision.
- `PRD.md`: what the site is and every section's requirements.
- `DESIGN_SPEC.md`: tokens, type, spacing, components, motion, responsive rules.
- `CONTENT.md`: the current copy in readable form (mirror of `data/`).
- `TECH_SPEC.md`: architecture, data sources, caching, security, deploy.
- `BUILD_PLAN.md`: how the site was built (complete) and the update checklist.
- `reference/mockup.html`: the original desktop design reference.

## Non-negotiables
- **Dark mode is the default** for every visitor; light only via the toggle. Ignore OS preference.
- **Nothing ranks Neev.** No skill bars, ratings, "led/contributed" labels, or impact metrics (D-09).
- **One signature theme: F1.** No new gimmicks, extra animations, or new sections without Neev asking. A tools/skills section was tried and rejected (D-36).
- **Content lives in `data/`.** No copy hard-coded in components.
- **Voice:** calm, plain, first person. Avoid buzzwords and AI-sounding phrasing ("passionate", "driven by", "leverage", "immersive", "client-centric"). Neev reviews all wording.
- **Respect `prefers-reduced-motion`** (lights static and lit; car appears without sliding).
- **Live cards never break the page.** Every source has a fallback; the site builds with no env vars.
- **No secrets.** The site needs none. Any future key must be a server-only env var (never `NEXT_PUBLIC_`), set in Vercel, and `.env*` stays git-ignored.

## Working with Neev
- Ask questions **one at a time, multiple choice**, with your recommendation marked first.
- **Ask before every push** to GitHub, and before creating repos or changing Vercel or domain settings.
- For wording changes, apply locally, show him how it looks (desktop and phone), then push once he approves.
- Check visual changes at 1280px (dark and light) and 375px before calling them done.

## Commands
- `npm run dev`: local dev server on http://localhost:3000 (also `.claude/launch.json` → "dev").
- `npm run lint` and `npm run build`: must pass before any push.
- Git pushes authenticate through the GitHub CLI (`gh auth setup-git` is configured).

## Local-only branches
- `idea/setup-strip`: the rejected SETUP tools strip (D-36). Not pushed; keep for reference.

@AGENTS.md

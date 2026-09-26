# CLAUDE.md: Neev Lamba Portfolio (v2)

You are building Neev Lamba's personal portfolio website. The design is **final and approved**. Your job is to implement it faithfully, not to redesign it.

## Read these first, in order
1. `docs/PRD.md`: what the site is, every section and requirement.
2. `docs/DESIGN_SPEC.md`: colors, type, spacing, components, motion, responsive rules.
3. `docs/reference/mockup.html`: open it in a browser. This is the desktop pixel reference (dark by default; the moon button switches to light).
4. `docs/CONTENT.md` and `data/*.json`: all copy and data.
5. `docs/TECH_SPEC.md`: stack, file layout, API integrations, env vars, deploy.
6. `docs/BUILD_PLAN.md`: milestones and checks. Work through them in order.
7. `docs/DECISIONS.md`: why things are the way they are. Check here before "improving" anything.

(If these files are at the repo root instead of `docs/`, read them there.)

## Non-negotiables
- **Match the mockup.** Same layout, tokens, fonts, sizes, and interactions. Where the mockup and spec disagree, the spec wins; flag it to Neev.
- **Dark mode is the default** for every visitor. Light mode only via the toggle. Ignore OS preference.
- **Nothing ranks Neev.** Never add skill bars, ratings, "led/contributed" labels, or impact metrics to the timing board (D-09).
- **One signature theme: F1.** Don't add new themed gimmicks, extra animations, or sections that aren't in the PRD.
- **Content lives in `data/`.** No copy hard-coded in components.
- **Respect `prefers-reduced-motion`** (lights static and lit; car appears without sliding).
- **Live cards never break the page.** Every API has a fallback; the site builds and renders with no env vars set.
- **No secrets in client code.** The site currently needs none; any future API key must be a server-only env var.
- The projects section ("In the garage") stays hidden while `data/projects.json` is empty.

## Stack
Next.js (App Router) + TypeScript + Tailwind CSS, `next/font` (Manrope, JetBrains Mono), `next/image`, deployed on Vercel. No UI or animation libraries.

## Working with Neev
- Neev prefers **questions one at a time, multiple choice**, with your recommendation marked.
- Show progress milestone by milestone (see `BUILD_PLAN.md`), each with something he can look at.
- Ask before pushing to GitHub, creating repos, connecting Vercel, or adding a domain.
- When you need something only Neev has (Letterboxd username, Spotify authorization, cocktail, domain), ask for it once, clearly.

## Commands
- `npm run dev`: local dev server.
- `npm run lint` and `npm run build`: must pass before any push.

## Definition of done
All boxes in `PRD.md` §9 are checked on the production URL.

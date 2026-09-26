# Neev Lamba Portfolio v2: Planning Kit

Everything needed to build and deploy Neev's new portfolio exactly as designed. Hand this whole folder to Claude Code (or any new Claude chat) and say:

> "Build my portfolio from this kit. Start by reading CLAUDE.md."

## What's in here

| File | What it is |
|---|---|
| `CLAUDE.md` | Instructions for Claude Code: read order, non-negotiables, how to work with Neev. Put it at the repo root. |
| `PRD.md` | The product requirements: goals, audience, every section, requirements, launch checklist, open items |
| `DESIGN_SPEC.md` | Colors (dark + light), typography, spacing, components, motion timings, responsive rules |
| `CONTENT.md` | Every word on the site, the experience table, links, placeholders to fill |
| `TECH_SPEC.md` | Stack, repo layout, API integrations (F1 calendar, Spotify, Letterboxd), lap time, theme, env vars, deploy |
| `DECISIONS.md` | All 25 design decisions with rejected alternatives and reasons |
| `BUILD_PLAN.md` | Milestones M1–M6 with checks, plus how to update the site after launch |
| `data/site.json` | Intro, about, links, meta, off-the-clock settings and fallbacks |
| `data/experience.json` | The five timing-board rows with start/end months |
| `data/projects.json` | Empty; add entries to reveal the "In the garage" section |
| `reference/mockup.html` | Standalone desktop mockup of the final design. Open in a browser; moon button toggles light mode |
| `reference/neev-portrait-4x5.jpg` | The cropped, compressed portrait (also at `../neev-portrait-4x5.jpg`) |

| `reference/Lamba_Neev_Resume.pdf` | The current resume, to go in `public/` for the Resume link |

The whole kit is also zipped as `portfolio-redesign-kit.zip` next to this folder.

## Quick start with Claude Code
1. Create an empty folder (or new GitHub repo) and open Claude Code in it.
2. Copy this kit in: `CLAUDE.md` at the root, everything else into `docs/`, and `data/` at the root.
3. Copy `neev-portrait-4x5.jpg` and `Lamba_Neev_Resume.pdf` into `public/`.
4. Tell Claude Code: "Read CLAUDE.md and start milestone M1."

## Still open
See `PRD.md` §10: mobile review, domain, cocktail, Letterboxd username, Spotify setup, a more candid photo (optional), favicon/OG image.

## Design canvas
All explored directions live on the claude.ai design canvas "Neev Portfolio Directions" (private to Neev).

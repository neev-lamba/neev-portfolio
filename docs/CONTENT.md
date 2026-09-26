# Content: Neev Lamba Portfolio (v2)

Every word on the site, in one place. The machine-readable versions live in `data/` (`site.json`, `experience.json`, `projects.json`); keep them in sync with this file. Text in [brackets] is a placeholder Neev still needs to fill.

Voice: calm, plain, confident. Short sentences. No buzzwords, no bragging numbers, no "passionate about".

---

## Nav
`neev lamba` · Work · About · Resume · **Get in touch** · (theme toggle)

## Intro
- **Headline:** Hi, I'm Neev.
- **Sub-line:** I'm a product-minded engineer at Citi in New York, working on payment systems. I like owning what I build, from the first idea to the finished product.
- **Icon links:** LinkedIn · GitHub · Email

## Experience (timing board)
Label above board: `LIVE TIMING`. Hint below: "Hover a row for details" (touch: "Tap a row for details"). Link: "Full resume ↗".

| POS | Role | Years | Team | Stack | Start → End | Description (shown on hover) |
|---|---|---|---|---|---|---|
| P1 | Software Engineer | 2025 – NOW | CITI | Java · Spring Boot · MongoDB | 2025-07 → present | Moving Citi's payment services across the US and EU onto modern tooling, without a minute of downtime. |
| P2 | Software Engineer Intern | 2024 | CITI | Kubernetes · Kafka · Java | 2024-05 → 2024-08 | Moved legacy payment services onto a container platform so they're ready for the cloud. |
| P3 | Product Management Intern | 2023 | BORN | React · Figma · Miro | 2023-05 → 2023-08 | Turned research on Nissan's internal tools into a full-stack app that cut manual work. |
| P4 | Data Analyst Intern | 2022 | AMBER | Market research · UX design | 2022-05 → 2022-08 | Studied competitors and redesigned a trading app's onboarding into four simple steps. |
| P5 | Product Manager | 2022 – 23 | MECC | React Native · Flutter · Dart | 2022-12 → 2023-12 | Led a student team building for real clients, from an AI tool for Kajabi to a Flutter app for seniors. |

TIME column = months between start and end (or the current month), shown as `{Y}Y {MM}M`, e.g. `0Y 03M`, `1Y 00M`. Formula in `TECH_SPEC.md`.

Positions are simply newest first. P1 is always the current role.

Source for all facts: `Lamba_Neev_Resume.pdf` (project files). If the resume changes, update `data/experience.json`.

## About
> I've always been curious about how things work and how people use them. It started with playing video games with my dad from a young age, and his habit of always getting the newest tech gadgets rubbed off on me. That's what led me to computer science at Michigan.
>
> Some of my favorite summers were in product and design, figuring out what people actually needed before anything got built. Semesters in Prague and Portugal pushed that curiosity further, this time toward how other people live. At Citi I write the code, but I still think about who ends up using it.

(Draft. Neev may rewrite in his own words; keep it to two short paragraphs.)

## Off the clock
| Label | Value | Sub-line | Filled by |
|---|---|---|---|
| NEXT RACE | [Grand Prix name] | [countdown, e.g. 06d 14h] | F1 calendar API (automatic) |
| LAST BITE | Sushi Yasuda | via Beli (links to app.beliapp.com/lists/neev03) | Neev, in `data/site.json` |
| LAST WATCHED | [Film] | via Letterboxd | Letterboxd RSS (automatic) |
| BEHIND THE BAR | Manhattan | Currently perfecting | Neev, in `data/site.json` |

## Footer
- lambaneev5@gmail.com · LinkedIn · GitHub
- `0.84s · fastest lap` (real measured value)

## Links
| Link | URL | Status |
|---|---|---|
| Email | mailto:lambaneev5@gmail.com | From resume |
| LinkedIn | https://www.linkedin.com/in/neev-lamba/ | From old site; confirm still correct |
| GitHub | https://github.com/neev-lamba | From old site; confirm still correct |
| Resume | `/Lamba_Neev_Resume.pdf` | Copy the latest `Lamba_Neev_Resume.pdf` from project files into `public/` |

Note: the old site used `nlamba@umich.edu`. Don't reuse it.

## Meta
- Title: Neev Lamba · Software Engineer
- Description: Neev Lamba is a software engineer at Citi in New York who builds payment systems and thinks like a product person.

## Photo
`neev-portrait-4x5.jpg` (960×1200, ~150 KB), cropped from Neev's Michigan graduation photo. Alt: "Neev smiling in a Michigan CS graduation stole outside a stone campus building". Neev may swap in a more candid photo later; keep a 4:5 crop with his face in the upper third.

## Future: "In the garage" (projects)
Empty for launch. Add entries to `data/projects.json` like:
```json
{ "name": "Project name", "description": "One plain sentence.", "stack": ["Tool", "Tool"], "url": "https://…" }
```
Candidates from the resume if Neev wants them later: Recruitment App (Flutter, onboarded 200+ members), WasteBot (Python ML, 82% sorting accuracy).

# Roadmap: Future Improvements

Findings from site audits and what to do next. Nothing here is urgent; most of it waits until Neev has projects he wants to show. Tick items off as they ship, and log any design decision in `DECISIONS.md`.

## Audit log

| Date | Audit | Result |
|---|---|---|
| 2026-09-26 | #1, at launch | Site strong; GitHub profile undercut it (student bio, public class repos, old portfolios); meta description stale; no proof of work |
| 2026-09-26 | #2, after cleanup | GitHub fixed; meta description fixed. Remaining gaps are content (projects, P1 wording, photo), plus two small GitHub touches |

## Current state (audit #2)

**Site** (https://www.neevlamba.com)
- Live, with all assets returning 200: page, resume, favicon, iOS icon, link-preview image, both data routes.
- All 6 security headers present (CSP, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy, HSTS).
- Live cards working: next race (Jolpica) and last watched (Letterboxd, *Paper Tiger*).
- Meta and Open Graph description match the intro.
- Lighthouse, mobile: Performance 94, Accessibility 100, Best Practices 100, SEO 100. LCP 2.4s, CLS 0, TBT 220ms.
- Lighthouse, desktop: Performance 99, Accessibility 100, Best Practices 100, SEO 100. LCP 0.6s.
- Both are above the PRD targets (≥ 90 mobile, ≥ 95 desktop). Mobile dipped from 99 at launch, mostly TBT and LCP; partly normal run-to-run variation.

**GitHub** (https://github.com/neev-lamba)
- Profile: "Software engineer at Citi · Michigan CS", New York, NY, website neevlamba.com.
- Exactly 1 public repo: `neev-portfolio`. Class repos, old portfolios and 2023 practice projects are private; `test` is deleted. The old Pages site (`neev-lamba.github.io/neev-lamba-portfolio`) is offline.
- Repo `neev-portfolio` website link now points to neevlamba.com.
- Still open: nothing pinned yet; no profile README.

## Done

- [x] GitHub bio, location and website updated; class, old-portfolio and practice repos made private; `test` deleted (audit #1).
- [x] Meta / Open Graph description rewritten to match the intro (audit #1).
- [x] `neev-portfolio` repo website link pointed at neevlamba.com (audit #2).

## Next up

- [ ] **Turn on "In the garage" with one or two project write-ups.** This is now the single biggest gap: with GitHub cleaned up, the profile shows one repo, so the site needs to show the building instead. Add entries to `data/projects.json` and the section appears between Experience and About. Each entry: name, one plain sentence, stack, link. The link can go to a short write-up covering the problem, what you decided and why, and what happened. Candidates:
  - A new project Neev is building now (preferred: recent, and his own).
  - The Nissan internal-tools app from BORN: researched the problem, pitched the fix, built it (JavaScript/React).
  - The MECC Flutter app for seniors, or the Kajabi AI tool.
  - This portfolio: scoped, cut features, made trade-offs.
- [ ] **Rewrite the P1 row description** (`data/experience.json`, `citi-swe`). It still reads "onto modern tooling, without a minute of downtime", which is vague. Say what the work was in plain words, without metrics (D-09). Facts from the resume: migrated 6+ payment repos from Bitbucket to GitHub across the US and EU with zero downtime; builds Java Spring Boot microservices over MongoDB and Oracle.
- [ ] **Swap in a candid photo** (`public/neev-portrait-4x5.jpg`, keep 4:5, face in the upper third). The graduation photo reads "student" more than "engineer" (O-06).
- [ ] **Mention AI once, if true.** Claude is on the resume, and AI experience is central to most forward-deployed roles. One line in the P1 description or the About section.

## Quick GitHub touches (5 minutes)

- [ ] **Pin `neev-portfolio`** now, and add new projects to the pins as they ship: profile → Customize your pins (manual only).
- [ ] **Optional profile README:** a public repo named `neev-lamba` with two lines and a link to neevlamba.com.
- [ ] **Optional:** match the GitHub display name ("Neev Singh Lamba") to the site ("Neev Lamba"), or leave it.

## Later

- [ ] **Surface recent product work for PM roles.** The PM roles are the oldest on the board; a write-up showing a recent product decision closes that gap.
- [ ] **Mobile performance headroom (low priority).** If mobile Performance drops below 90, look at LCP (portrait image priority and sizes) and TBT (client JS in `TimingBoard`, `NextRaceCard`, `LapTime`).
- [ ] **Revisit the tools strip only if needed.** Tried and rejected (D-36); the mockup lives on the local branch `idea/setup-strip`.

## How a recruiter reads the site today

**Forward-deployed engineer:** strong background (current SWE at Citi, zero-downtime migrations, "owning what I build" is close to the FDE pitch, client work at BORN and MECC). The GitHub click no longer hurts: the profile is current and links back to the site. Gaps: client-facing work is buried at P3 and P5, P1 reads as internal infrastructure, and there's still no proof of building something quickly on his own. With only one public repo, projects matter more now. Likely take: "Interesting and polished; show me something he built."

**Product manager:** credible technical-PM story (two PM roles, design and research, a user-focused About section, a sharp product-minded intro). Gaps: the PM roles are the oldest, there's no evidence of impact on the site (by design; the resume has the numbers), and no example of prioritization or trade-offs. Likely take: "Nice story, credible technical PM. Where's the recent product work?"

**For both:** everything around the site is now clean and consistent (site, GitHub, meta, resume). The one thing between "good first impression" and "strong argument for hiring him" is a project write-up.

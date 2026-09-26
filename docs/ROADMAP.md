# Roadmap: Future Improvements

From the site audit on 2026-09-26. Nothing here is urgent; these are the next steps once Neev has projects he wants to show. Tick items off as they ship, and log any design decision in `DECISIONS.md`.

## Next up

- [ ] **Turn on "In the garage" with one or two project write-ups.** The section is already built: add entries to `data/projects.json` and it appears between Experience and About. Each entry is a name, one plain sentence, a stack and a link. The link can go to a short write-up covering the problem, what you decided and why, and what happened. Candidates:
  - A new project Neev is building now (preferred: recent, and his own).
  - The Nissan internal-tools app from BORN: researched the problem, pitched the fix, built it (JavaScript/React).
  - The MECC Flutter app for seniors, or the Kajabi AI tool.
  - This portfolio: scoped, cut features, made trade-offs (a good example of product judgment).
- [ ] **Rewrite the P1 row description** (`data/experience.json`, `citi-swe`). "Onto modern tooling" is vague. Say what the work was in plain words, without metrics (D-09). Facts from the resume: migrated 6+ payment repos from Bitbucket to GitHub across the US and EU with zero downtime; builds Java Spring Boot microservices over MongoDB and Oracle.
- [ ] **Swap in a candid photo** (`public/neev-portrait-4x5.jpg`, keep 4:5, face in the upper third). The graduation photo reads "student" more than "engineer". Something from work or around New York would be better (O-06).
- [ ] **Mention AI once, if true.** Claude is on the resume, and AI experience is central to most forward-deployed roles. A line in the P1 description or the About section would help if it's accurate.

## Later

- [ ] **Pin repos on GitHub** once projects exist: `neev-portfolio` plus one or two real builds. This has to be done by hand on github.com (profile → Customize your pins).
- [ ] **GitHub profile README** (a repo named `neev-lamba` with a README.md): two lines and a link to neevlamba.com.
- [ ] **Surface product work for PM roles.** The PM roles are the oldest on the board; a write-up showing a recent product decision would close that gap.
- [ ] **Revisit the tools strip only if needed.** It was tried and rejected (D-36); the mockup lives on the local branch `idea/setup-strip`.

## How a recruiter reads the site today

**Forward-deployed engineer:** strong background (current SWE at Citi, zero-downtime migrations, "owning what I build" is close to the FDE pitch, client work at BORN and MECC). Gaps: client-facing work is buried at P3 and P5, P1 reads as internal infrastructure, and there's no proof of building something quickly on his own. Likely take: "Interesting; show me something he built."

**Product manager:** credible technical-PM story (two PM roles, design and research, a user-focused About section). Gaps: the PM roles are the oldest, there's no evidence of impact on the site (by design), and no example of prioritization or trade-offs. Likely take: "Nice story. Where's the product work?"

**For both:** the site gets Neev remembered; one strong project write-up turns it into an argument for hiring him.

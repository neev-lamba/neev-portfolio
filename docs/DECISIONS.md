# Decision Log: Neev Lamba Portfolio (v2)

Every decision made while designing the site (2026-09-25 → 2026-09-26), with what was rejected and why. If something here conflicts with another doc, this log plus `PRD.md` win. Add new decisions at the bottom.

| ID | Date | Decision | Alternatives considered | Why |
|---|---|---|---|---|
| D-01 | 09-25 | Goal: captivating, simple, unique; usable for job applications; shows Neev's personality | — | Neev's brief |
| D-02 | 09-25 | Audience: both SWE and product-leaning recruiters. Positioning: "an engineer who thinks like a product person" | SWE-only; PM-only; personal brand first | Resume shows both engineering (Citi) and product/design (BORN, Amber, MECC) |
| D-03 | 09-25 | Inspiration taken from: kvnshu.notion.site (simplicity), tbui.dev (unique but "a bit much"), ashley-glabicki.com (unique + simple, wants simpler), salnad.me (to the point but impersonal), kalifrancisco.com (unique but cluttered), courtneyfortin.com/about (simple, needs more pop) | — | Pattern: calm readable base + one memorable personal touch; several touches = clutter |
| D-04 | 09-25 | Personality: calm, put-together, good taste | Driven/competitive; curious/social; funny/laid-back | Neev's answer; drives restraint in the design |
| D-05 | 09-25 | Formula 1 is the single signature theme | Cocktails/mixology as a theme or feature; music; fashion; travel | F1 ties to speed and precision, which matches Neev's payments work; cocktails-as-feature felt forced to Neev |
| D-06 | 09-25 | Cocktails appear only as one small "Behind the bar" card | Signature cocktail recipe section; cocktail animation; cocktail-menu layout | Neev didn't want a recipe feature; animation would be hard to make tasteful |
| D-07 | 09-25 | Lights-out start sequence + footer lap time as F1 touches | 404 "spun off" page; F1 timing-style fonts only; hidden lap-timer game | Bookend the visit without cluttering the middle |
| D-08 | 09-26 | Touches were too subtle → add a prominent F1 feature: Experience as a live-timing board, plus a slim "Off the clock" area | Off-the-clock only; F1 only | Neev wanted more personality without clutter |
| D-09 | 09-26 | Timing board is **neutral**: no sector bars, no led/strong/contributed ratings, no impact numbers. Columns: POS, ROLE, TEAM, STACK, TIME (time in role) + one-sentence description on hover | Sector ratings; key metrics ("0 downtime", "+15%"); focus tags; plain sentences only | Self-grading could hurt Neev ("only contributed"); bare numbers read as bragging and lack context |
| D-10 | 09-26 | Base visual direction: **Night Session** (dark) | Paddock (light editorial serif), Pit Wall (white two-column), Grand Tour (warm single column) | Real F1 timing screens are dark; board and photo stand out most |
| D-11 | 09-26 | Include one photo of Neev | No photo; gallery | Recruiters connect faster with a face; adds personality |
| D-12 | 09-26 | Photo: Michigan graduation photo, cropped 4:5, compressed to ~150 KB | Old site photo (13 MB); placeholder | Neev supplied it; a more candid photo can replace it later |
| D-13 | 09-26 | Cut copy roughly in half; resume holds the detail | Keep resume-style bullets | Old draft read like a copy of the resume |
| D-14 | 09-26 | No projects section at launch; build a hidden "In the garage" section that appears when `projects.json` has entries | Show class projects now | Neev has no projects he wants to feature yet; avoids an empty-looking section |
| D-15 | 09-26 | Dark mode default for everyone; light mode via a nav toggle; choice remembered | Follow OS setting; dark only | Neev loves the dark look but wants visitors to have the choice |
| D-16 | 09-26 | Off the clock cards: Next race, Now playing, Last watched, Behind the bar | Tennis & gym card (replaced by Last watched) | Neev preferred a movie card |
| D-17 | 09-26 | Next race and Now playing update automatically (F1 calendar API, Spotify) | Manual weekly edits | Low maintenance |
| D-18 | 09-26 | Last watched pulls from Letterboxd automatically | Manual updates | Neev chose Letterboxd |
| D-19 | 09-26 | Off the clock shown as a **2×2 card grid** beside the About text | Hairline list; standalone full-width card row | Neev preferred cards once they were tidied into a grid; also fills the About section |
| D-20 | 09-26 | Card icons: flag (red), music note (green), film (purple), cocktail glass (yellow), each on a tinted square | Colored dots; grey icons | Grey icons got lost; color from F1 timing palette makes them pop |
| D-21 | 09-26 | Lights loop slowly in the background (~9s cycle, lights ~0.72s apart) | Play once on first visit; play on every load; replay on hover | Neev felt a single fast play was easy to miss |
| D-22 | 09-26 | Hover animation: **position marker**. A tiny top-down F1 car slides in beside the P-label of the hovered row | Car down the left edge; racing line under the row; car parks in a "pit box" by the time | Neev's pick |
| D-23 | 09-26 | Intro: **"Hi, I'm Neev."**, photo left, text right | "An engineer who thinks like a product person." (split); centered round photo "Engineering with the user in the passenger seat."; photo banner "Code that moves money. Products that feel right." | Neev's pick. Original line "I build fast, reliable software and care how it feels to use." rejected by Neev |
| D-24 | 09-26 | Nav: text links vertically aligned with the "Get in touch" pill (all 40px tall) | — | Neev noticed misalignment |
| D-25 | 09-26 | Under the intro: round icon links (LinkedIn, GitHub, email) | "See my experience" + "Resume" buttons; status line; scroll cue; nothing | Buttons duplicated the nav and the next section; contact links are what recruiters need |

## Design history
All explored directions are preserved on the design canvas "Neev Portfolio Directions" (claude.ai): tabs Current portfolio (dark and light), Intro options, Paddock, Night Session (list and card variants), Car animation options, Pit Wall, Grand Tour.
| D-26 | 09-26 | Stack: Next.js 16 (Turbopack) on Node 24 LTS | Next.js 15 | Latest stable at build time; Node upgraded from 20.1 to meet the 20.9+ minimum |
| D-27 | 09-26 | 120px gap above the footer hairline | Footer flush against About (as in mockup) | Mockup's fixed frame put the hairline directly under the cards; the gap matches the page's section rhythm |
| D-28 | 09-26 | Card values wrap to 2 lines instead of truncating | Single-line truncate | Real race names can be long ("Bahrain Grand Prix in Malaysia") |
| D-29 | 09-26 | Next-race uses Jolpica `current.json` (full season) rather than `current/next.json` | `current/next.json` | Lets the card roll over to the next race and show "Racing now" for 3h without a refetch |
| D-30 | 09-26 | Publish the current resume as-is (includes building address, no apartment number, and phone) | Trimmed copy without address/phone; hide the Resume link | Neev is comfortable sharing both; recruiters get the full resume |
| D-31 | 09-26 | Letterboxd star rating hidden by default (`offTheClock.showLetterboxdRating`) | Show rating | Keeps the card neutral; flip the flag to show it |
| D-32 | 09-26 | Replace NOW PLAYING (Spotify) with **LAST BITE**: last restaurant, "via Beli", fork-and-knife icon in green, linking to Neev's Beli profile. Updated manually in `data/site.json` | Spotify now playing; unofficial Beli API (automatic) | Friends know Neev for his Beli restaurants. Beli has no public API and its ToS ban scraping/reverse engineering; manual also avoids broadcasting his location in real time, and leaves the site with no secrets |
| D-33 | 09-26 | Favicon: lowercase "n" with a red full stop, no background; ink follows the browser's light/dark tab bar. iOS home-screen icon is the same mark on the dark background | Black rounded square with red dot (O-07 default); soft glowing light; the car; three lights | Neev found the black box harsh; the monogram matches the "neev lamba" nav and stays crisp at 16px |
| D-34 | 09-26 | Resume PDF metadata set to Author "Neev Lamba", Title "Neev Lamba · Resume" (was Author "Nikhil" from Word) | Leave as exported | Hidden author field showed someone else's name |
| D-35 | 09-26 | Custom domain neevlamba.com (bought by Neev); apex redirects to www.neevlamba.com | Stay on vercel.app | Closes O-02 |
| D-36 | 09-26 | No tools/skills section on the site; tools stay on the resume and in the board's STACK column | "SETUP" text strip under the timing board (mocked up, kept on local branch `idea/setup-strip`); logo grid | Neev felt it cluttered the page |

# neev lamba

My personal site: a calm, dark, single page with one Formula 1 theme. Experience is shown as a live-timing board, the start lights loop above the intro, and the footer reports the page's real load time as a lap.

Built with Next.js (App Router), TypeScript and Tailwind CSS. No UI or animation libraries.

## Run it

```bash
npm install
npm run dev
```

No environment variables are required. The "Off the clock" cards pull the next Grand Prix from the [Jolpica F1 API](https://github.com/jolpica/jolpica-f1) and my last film from Letterboxd RSS, and fall back gracefully if either is down.

## Editing content

All copy lives in `data/`:

| To change | Edit |
|---|---|
| Wording, links, cocktail, last restaurant | `data/site.json` |
| A role on the timing board | `data/experience.json` (newest first) |
| Projects ("In the garage" appears once this has entries) | `data/projects.json` |

Design and product docs are in [`docs/`](docs/).

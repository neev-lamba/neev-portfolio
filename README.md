# neev lamba

My personal site, live at **[neevlamba.com](https://www.neevlamba.com)**. It's a calm, dark, single page with one Formula 1 theme: my experience is a live-timing board, the start lights loop above the intro, and the footer reports the page's real load time as a lap.

Built with Next.js 16, TypeScript and Tailwind CSS. No UI or animation libraries, and no API keys.

## Run it

```bash
npm install
npm run dev
```

The "Off the clock" cards pull the next Grand Prix from the [Jolpica F1 API](https://github.com/jolpica/jolpica-f1) and my last film from Letterboxd, and fall back gracefully if either is down.

## Editing content

All copy lives in `data/`:

| To change | Edit |
|---|---|
| Intro, About, links, last restaurant, cocktail | `data/site.json` |
| A role on the timing board (newest first) | `data/experience.json` |
| Projects ("In the garage" appears once this has entries) | `data/projects.json` |

Pushing to `main` deploys automatically. Design and product docs are in [`docs/`](docs/).

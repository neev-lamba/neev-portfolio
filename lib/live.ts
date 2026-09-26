// Server-side fetchers for the "Off the clock" cards.
// Every function resolves to null on any failure so the UI can show its fallback.
import { siteData } from "@/lib/content";

const RACE_WINDOW_MS = 3 * 60 * 60 * 1000; // a race counts as "on" for 3h after lights out

// ---------- Next race (Jolpica F1 API) ----------

export type Race = { name: string; startsAt: string };
export type NextRace = { races: Race[]; seasonOver: boolean };

type JolpicaRace = { season: string; raceName: string; date: string; time?: string };

async function fetchSeason(season: string): Promise<JolpicaRace[]> {
  const res = await fetch(`https://api.jolpi.ca/ergast/f1/${season}.json?limit=40`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`Jolpica ${res.status}`);
  const json = await res.json();
  return json?.MRData?.RaceTable?.Races ?? [];
}

function toRace(r: JolpicaRace): Race {
  return { name: r.raceName, startsAt: `${r.date}T${r.time ?? "12:00:00Z"}` };
}

// Returns the next few races (so the client can roll over to the next one without a refetch).
export async function getNextRace(now = new Date()): Promise<NextRace | null> {
  try {
    const current = await fetchSeason("current");
    const upcoming = current
      .map(toRace)
      .filter((r) => new Date(r.startsAt).getTime() + RACE_WINDOW_MS > now.getTime());
    if (upcoming.length) return { races: upcoming.slice(0, 3), seasonOver: false };

    const season = Number(current[0]?.season ?? now.getUTCFullYear());
    const next = await fetchSeason(String(season + 1));
    return next.length ? { races: next.slice(0, 3).map(toRace), seasonOver: true } : null;
  } catch {
    return null;
  }
}

// ---------- Last watched (Letterboxd RSS) ----------

export type LastWatched = { title: string; year: string | null; rating: string | null; url: string };

const decode = (s: string) =>
  s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&#0?39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .trim();

const tag = (xml: string, name: string) => {
  const m = xml.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`));
  return m ? decode(m[1]) : null;
};

export async function getLastWatched(): Promise<LastWatched | null> {
  const username = process.env.LETTERBOXD_USERNAME || siteData.offTheClock.letterboxdUsername;
  if (!username) return null;
  try {
    const res = await fetch(`https://letterboxd.com/${encodeURIComponent(username)}/rss/`, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; neev-portfolio/1.0)" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const xml = await res.text();
    // Lists also appear in the feed; take the first item that is a film diary entry.
    for (const [, item] of xml.matchAll(/<item>([\s\S]*?)<\/item>/g)) {
      const title = tag(item, "letterboxd:filmTitle");
      if (!title) continue;
      return {
        title,
        year: tag(item, "letterboxd:filmYear"),
        rating: tag(item, "letterboxd:memberRating"),
        url: tag(item, "link") ?? `https://letterboxd.com/${username}/`,
      };
    }
    return null;
  } catch {
    return null;
  }
}

import Card from "@/components/Card";
import { CocktailIcon, FilmIcon, UtensilsIcon } from "@/components/Icons";
import NextRaceCard from "@/components/NextRaceCard";
import { siteData } from "@/lib/content";
import { getLastWatched, getNextRace } from "@/lib/live";

export default async function About() {
  const { about, offTheClock: otc, ui } = siteData;
  const cards = ui.cards;
  const [race, watched] = await Promise.all([getNextRace(), getLastWatched()]);

  const watchedSub =
    watched?.rating && otc.showLetterboxdRating
      ? `★ ${watched.rating} · ${cards.viaLetterboxd}`
      : cards.viaLetterboxd;

  return (
    <section
      id="about"
      className="mt-28 grid items-start gap-12 md:mt-[140px] lg:grid-cols-[1fr_460px] lg:gap-24"
    >
      <div className="flex flex-col gap-[22px]">
        <h2 className="m-0 text-[32px] font-semibold tracking-[-0.8px]">{ui.aboutHeading}</h2>
        {about.map((p) => (
          <p key={p} className="m-0 text-[17px] leading-[1.7] text-pretty text-text2 sm:text-[19px]">
            {p}
          </p>
        ))}
      </div>
      <div className="flex flex-col gap-3.5 lg:pt-2.5">
        <span className="font-mono text-[11px] tracking-[1.5px] text-faint">{ui.offTheClockLabel}</span>
        <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2">
          <NextRaceCard
            data={race}
            label={cards.nextRace}
            fallback={otc.fallbacks.nextRace}
            racingNow={cards.racingNow}
            seasonOver={cards.seasonOver}
          />
          <Card
            icon={<UtensilsIcon />}
            tone="green"
            label={cards.lastBite}
            value={otc.lastBite.value}
            sub={otc.lastBite.sub}
            href={otc.lastBite.url || undefined}
          />
          {watched ? (
            <Card icon={<FilmIcon />} tone="purple" label={cards.lastWatched} value={watched.title} sub={watchedSub} href={watched.url} />
          ) : (
            <Card icon={<FilmIcon />} tone="purple" label={cards.lastWatched} {...otc.fallbacks.lastWatched} />
          )}
          <Card icon={<CocktailIcon />} tone="yellow" label={cards.behindTheBar} {...otc.behindTheBar} />
        </div>
      </div>
    </section>
  );
}

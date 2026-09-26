"use client";

import Card from "@/components/Card";
import { FlagIcon } from "@/components/Icons";
import { countdown } from "@/lib/format";
import { useNow } from "@/lib/hooks";
import type { NextRace } from "@/lib/live";

const RACE_WINDOW_MS = 3 * 60 * 60 * 1000;

type Props = {
  data: NextRace | null;
  label: string;
  fallback: { value: string; sub: string };
  racingNow: string;
  seasonOver: string;
};

export default function NextRaceCard({ data, label, fallback, racingNow, seasonOver }: Props) {
  const now = useNow(60_000);
  const icon = <FlagIcon />;

  // Pick the first race that hasn't finished yet (the list may be up to an hour old).
  const at = now?.getTime() ?? 0;
  const race = data?.races.find((r) => new Date(r.startsAt).getTime() + RACE_WINDOW_MS > at);
  if (!race) return <Card icon={icon} tone="red" label={label} {...fallback} />;

  let sub = " "; // countdown is computed after hydration to avoid a server/client mismatch
  if (now) {
    const start = new Date(race.startsAt);
    sub = now >= start ? racingNow : countdown(start, now);
    if (data?.seasonOver && now < start) sub = `${seasonOver} · ${sub}`;
  }

  return <Card icon={icon} tone="red" label={label} value={race.name} sub={sub} />;
}

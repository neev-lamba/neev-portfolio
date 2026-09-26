const pad = (n: number) => String(n).padStart(2, "0");

// "06d 14h", or "14h 22m" when under a day
export function countdown(target: Date, now: Date): string {
  const totalMinutes = Math.max(0, Math.floor((target.getTime() - now.getTime()) / 60000));
  const d = Math.floor(totalMinutes / 1440);
  const h = Math.floor((totalMinutes % 1440) / 60);
  const m = totalMinutes % 60;
  return d > 0 ? `${pad(d)}d ${pad(h)}h` : `${pad(h)}h ${pad(m)}m`;
}

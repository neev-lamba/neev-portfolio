// start/end are "YYYY-MM"; end null = current month
export function tenure(start: string, end: string | null, now = new Date()): string {
  const [sy, sm] = start.split("-").map(Number);
  const [ey, em] = end ? end.split("-").map(Number) : [now.getFullYear(), now.getMonth() + 1];
  const months = Math.max(0, (ey - sy) * 12 + (em - sm));
  return `${Math.floor(months / 12)}Y ${String(months % 12).padStart(2, "0")}M`;
}

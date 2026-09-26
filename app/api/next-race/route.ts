import { getNextRace } from "@/lib/live";

export const revalidate = 3600;

export async function GET() {
  return Response.json(await getNextRace());
}

import TimingBoard, { type BoardRow } from "@/components/TimingBoard";
import { roles, siteData } from "@/lib/content";
import { tenure } from "@/lib/tenure";

export default function Experience() {
  const copy = siteData.ui.experience;
  const now = new Date();
  const rows: BoardRow[] = roles.map((r, i) => ({
    id: r.id,
    pos: `P${i + 1}`,
    role: r.role,
    yearsLabel: r.yearsLabel,
    team: r.team,
    stack: r.stack.join(" · "),
    time: tenure(r.start, r.end, now),
    description: r.description,
  }));

  return (
    <section id="work" className="mt-28 flex flex-col gap-6 md:mt-40">
      <div className="flex items-baseline justify-between">
        <h2 className="m-0 text-[32px] font-semibold tracking-[-0.8px]">{copy.heading}</h2>
        <span className="flex items-center gap-2 font-mono text-[12px] tracking-[1.2px] text-faint">
          <span className="size-[7px] rounded-full bg-race" aria-hidden="true" />
          {copy.liveTiming}
        </span>
      </div>
      <TimingBoard rows={rows} copy={copy} resumeHref={siteData.links.resume} />
    </section>
  );
}

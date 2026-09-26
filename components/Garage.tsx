import { projectList, siteData } from "@/lib/content";

// "In the garage": renders nothing until data/projects.json has entries (PRD §7.6).
export default function Garage() {
  if (projectList.length === 0) return null;
  const copy = siteData.ui.garage;

  return (
    <section id="garage" className="mt-28 flex flex-col gap-6 md:mt-[140px]">
      <h2 className="m-0 text-[32px] font-semibold tracking-[-0.8px]">{copy.heading}</h2>
      <ul className="m-0 list-none border-b border-line p-0">
        {projectList.map((p) => (
          <li
            key={p.name}
            className="flex flex-col gap-3 border-t border-line py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8"
          >
            <div className="flex min-w-0 flex-col gap-1">
              <span className="text-[18px] font-semibold">{p.name}</span>
              <span className="text-[15px] text-muted">{p.description}</span>
            </div>
            <div className="flex shrink-0 items-center gap-8">
              <span className="font-mono text-[12px] tracking-[1.2px] text-faint">{p.stack.join(" · ")}</span>
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="whitespace-nowrap text-[15px]">
                {copy.view}
              </a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

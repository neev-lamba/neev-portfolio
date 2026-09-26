import LapTime from "@/components/LapTime";
import { siteData } from "@/lib/content";

export default function Footer() {
  const { links, ui } = siteData;
  const t = ui.footer;

  return (
    <footer
      id="contact"
      className="mt-28 flex flex-col items-start gap-5 border-t border-line pt-7 text-[15px] md:mt-[120px] sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex flex-wrap gap-x-7 gap-y-2">
        <a href={`mailto:${links.email}`}>{links.email}</a>
        <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted">
          {t.linkedin}
        </a>
        <a href={links.github} target="_blank" rel="noopener noreferrer" className="text-muted">
          {t.github}
        </a>
      </div>
      <span className="flex items-center gap-2.5 font-mono text-[13px] text-faint">
        <span className="size-2 rounded-full bg-purple" aria-hidden="true" />
        <LapTime fastest={t.fastestLap} lap={t.lapTime} />
      </span>
    </footer>
  );
}

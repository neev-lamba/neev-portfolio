import type { ReactNode } from "react";

export type Tone = "red" | "green" | "purple" | "yellow";

// Icon color + 14% tinted badge (DESIGN_SPEC §1, §4.6).
const tones: Record<Tone, string> = {
  red: "text-red2 bg-[rgba(255,59,48,.14)]",
  green: "text-green bg-[rgba(61,220,132,.14)]",
  purple: "text-purple bg-[rgba(179,136,255,.14)]",
  yellow: "text-yellow bg-[rgba(255,210,63,.14)]",
};

type Props = {
  icon: ReactNode;
  tone: Tone;
  label: string;
  value: string;
  sub: string;
  href?: string;
};

export default function Card({ icon, tone, label, value, sub, href }: Props) {
  const body = (
    <>
      <span className="flex items-center gap-2.5 font-mono text-[10px] tracking-[1.3px] text-faint">
        <span className={`flex size-7 shrink-0 items-center justify-center rounded-lg ${tones[tone]}`}>{icon}</span>
        {label}
      </span>
      <span className="flex min-w-0 flex-col gap-1">
        <span className="line-clamp-2 text-[17px] font-semibold" title={value}>
          {value}
        </span>
        <span className="truncate text-[13px] text-faint">{sub}</span>
      </span>
    </>
  );
  const cls = "flex min-w-0 flex-col gap-3 rounded-[14px] border border-line bg-card p-5";

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {body}
    </a>
  ) : (
    <div className={cls}>{body}</div>
  );
}

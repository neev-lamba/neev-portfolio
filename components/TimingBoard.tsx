"use client";

import { useState } from "react";
import Car from "@/components/Car";
import { useCanHover } from "@/lib/hooks";

export type BoardRow = {
  id: string;
  pos: string;
  role: string;
  yearsLabel: string;
  team: string;
  stack: string;
  time: string;
  description: string;
};

type Copy = {
  columns: { pos: string; role: string; team: string; stack: string; time: string };
  hintHover: string;
  hintTap: string;
  fullResume: string;
};

// F1 live-timing board (PRD §7.3, TECH_SPEC §3.8).
// Active row = hovered/keyboard-focused row, else the open row (P1 by default).
export default function TimingBoard({ rows, copy, resumeHref }: { rows: BoardRow[]; copy: Copy; resumeHref: string }) {
  const first = rows[0]?.id ?? null;
  const [openId, setOpenId] = useState<string | null>(first);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const canHover = useCanHover();

  const activeId = hoverId ?? openId;
  const c = copy.columns;

  return (
    <>
      <div
        className="overflow-hidden rounded-[14px] border border-line bg-panel pb-3 pt-2 font-mono"
        onPointerLeave={(e) => {
          if (e.pointerType !== "mouse") return;
          setHoverId(null);
          setOpenId(first); // leaving the board restores P1
        }}
      >
        <div className="board-grid px-4 py-3.5 text-[11px] tracking-[1.5px] text-faint sm:px-8" aria-hidden="true">
          <span>{c.pos}</span>
          <span>{c.role}</span>
          <span className="hidden sm:block">{c.team}</span>
          <span className="hidden md:block">{c.stack}</span>
          <span className="text-right">{c.time}</span>
        </div>
        <ul className="m-0 list-none p-0">
          {rows.map((r, i) => {
            const active = r.id === activeId;
            return (
              <li
                key={r.id}
                className="trow border-t border-line px-4 py-5 sm:px-8"
                data-active={active}
                data-hover={r.id === hoverId}
                onPointerEnter={(e) => e.pointerType === "mouse" && setHoverId(r.id)}
                onPointerLeave={(e) => e.pointerType === "mouse" && setHoverId(null)}
              >
                <button
                  type="button"
                  aria-expanded={active}
                  aria-controls={`desc-${r.id}`}
                  onClick={(e) => {
                    if (e.detail === 0) {
                      // Enter/Space: toggle the row the keyboard is on.
                      setHoverId(null);
                      setOpenId(active ? null : r.id);
                    } else {
                      setOpenId((o) => (o === r.id ? null : r.id));
                    }
                  }}
                  onFocus={(e) => e.currentTarget.matches(":focus-visible") && setHoverId(r.id)}
                  onBlur={() => setHoverId((h) => (h === r.id ? null : h))}
                  className="board-grid w-full cursor-pointer border-0 bg-transparent p-0 text-left font-mono text-text"
                >
                  <span className="pos relative flex items-center text-[18px] font-semibold">
                    <Car />
                    <span className="lbl">{r.pos}</span>
                  </span>
                  <span className="flex min-w-0 flex-col gap-1">
                    <span className="font-sans text-[16px] font-semibold sm:text-[18px]">{r.role}</span>
                    <span className="text-[12px] text-faint">
                      <span className="sm:hidden">{r.team} · </span>
                      {r.yearsLabel}
                    </span>
                  </span>
                  <span className="hidden text-[14px] font-semibold tracking-[1px] sm:block">{r.team}</span>
                  <span className="hidden text-[13px] text-text2 md:block">{r.stack}</span>
                  <span className={`text-right text-[15px] font-semibold sm:text-[16px] ${i === 0 ? "text-purple" : ""}`}>
                    {r.time}
                  </span>
                </button>
                <p
                  id={`desc-${r.id}`}
                  className="desc mb-0 ml-0 font-sans text-[15px] leading-[1.6] text-muted sm:ml-24"
                >
                  {r.description}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex justify-between gap-4 font-mono text-[12px] text-faint">
        <span>{canHover ? copy.hintHover : copy.hintTap}</span>
        <a href={resumeHref} target="_blank" rel="noopener noreferrer" className="shrink-0 text-muted">
          {copy.fullResume}
        </a>
      </div>
    </>
  );
}

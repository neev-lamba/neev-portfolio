"use client";

import { useEffect, useRef, useState } from "react";
import { MenuIcon } from "@/components/Icons";

type Link = { href: string; label: string; external?: boolean };

// Below 900px, Work / About / Resume move into this menu (DESIGN_SPEC §8).
export default function MobileMenu({ label, links }: { label: string; links: Link[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative md:hidden">
      <button
        type="button"
        aria-label={label}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex size-10 cursor-pointer items-center justify-center rounded-full border border-pill text-text transition-colors hover:border-text"
      >
        <MenuIcon />
      </button>
      {open && (
        <ul
          id="mobile-menu"
          className="absolute right-0 top-12 z-10 flex min-w-[160px] flex-col rounded-[14px] border border-line bg-panel py-2"
        >
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="block px-5 py-2.5 text-[15px] text-muted"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

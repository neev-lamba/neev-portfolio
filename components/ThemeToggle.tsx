"use client";

import { MoonIcon, SunIcon } from "@/components/Icons";
import { useIsLight } from "@/lib/hooks";

type Props = { toLight: string; toDark: string };

export default function ThemeToggle({ toLight, toDark }: Props) {
  const isLight = useIsLight();

  function toggle() {
    const next = !document.documentElement.classList.contains("light");
    document.documentElement.classList.toggle("light", next);
    try {
      localStorage.setItem("theme", next ? "light" : "dark");
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isLight ? toDark : toLight}
      className="inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-pill text-text transition-colors hover:border-text"
    >
      {/* Both icons render; CSS picks one so the first paint is right even before hydration. */}
      <MoonIcon className="[.light_&]:hidden" />
      <SunIcon className="hidden [.light_&]:block" />
    </button>
  );
}

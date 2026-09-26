"use client";

import { useSyncExternalStore } from "react";

// True when the light theme class is on <html>. Server snapshot is dark (the default).
export function useIsLight(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const obs = new MutationObserver(onChange);
      obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
      return () => obs.disconnect();
    },
    () => document.documentElement.classList.contains("light"),
    () => false,
  );
}

// True on devices with a fine pointer that can hover. Server snapshot assumes desktop.
export function useCanHover(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(hover: hover) and (pointer: fine)").matches,
    () => true,
  );
}

// Current time rounded down to `ms`, re-rendering each tick. Null on the server and during hydration.
export function useNow(ms = 60_000): Date | null {
  const t = useSyncExternalStore(
    (onChange) => {
      const id = window.setInterval(onChange, ms);
      return () => window.clearInterval(id);
    },
    () => Math.floor(Date.now() / ms),
    () => null,
  );
  return t === null ? null : new Date(t * ms);
}

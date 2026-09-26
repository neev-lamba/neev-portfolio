"use client";

import { useEffect, useState } from "react";

// The page's real measured load time, formatted like an F1 lap (TECH_SPEC §3.6).
export default function LapTime({ fastest, lap }: { fastest: string; lap: string }) {
  const [text, setText] = useState(`-.--s · ${lap}`);

  useEffect(() => {
    const measure = () => {
      const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
      const ms = nav && nav.loadEventEnd > 0 ? nav.loadEventEnd - nav.startTime : performance.now();
      setText(`${(ms / 1000).toFixed(2)}s · ${ms < 1500 ? fastest : lap}`);
    };
    // loadEventEnd is only set once the load handler has returned, so measure on the next tick.
    const onLoad = () => window.setTimeout(measure, 0);
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });
    return () => window.removeEventListener("load", onLoad);
  }, [fastest, lap]);

  return <span>{text}</span>;
}

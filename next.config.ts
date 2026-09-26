import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

// Everything is served from this origin: fonts are self-hosted by next/font, and the
// F1 / Letterboxd data is fetched server-side, so the browser never talks to third parties.
// 'unsafe-inline' for scripts covers the no-flash theme script and Next's inline hydration data.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isProd ? "" : " 'unsafe-eval'"}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isProd ? ["upgrade-insecure-requests"] : []),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
];

const nextConfig: NextConfig = {
  // Pin the project root (a stray lockfile in the home folder otherwise confuses root detection).
  turbopack: { root: process.cwd() },
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;

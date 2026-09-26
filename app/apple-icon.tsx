import { ImageResponse } from "next/og";

// iOS home-screen icon: the "n." monogram on the site's dark background (iOS needs an opaque PNG).
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#0D0D0F" }}>
        <svg width="180" height="180" viewBox="-4 -4 40 40">
          <path d="M8 25V14.5a6.5 6.5 0 0 1 13 0V25" fill="none" stroke="#EDEBE6" strokeWidth="4.2" strokeLinecap="round" />
          <circle cx="27" cy="23.5" r="3.2" fill="#FF3B30" />
        </svg>
      </div>
    ),
    size,
  );
}

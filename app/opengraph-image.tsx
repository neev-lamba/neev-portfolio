import { ImageResponse } from "next/og";
import { siteData } from "@/lib/content";

// Link-preview image (PRD O-07): five red start lights on the dark background.
export const alt = siteData.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const [name, role] = siteData.title.split(" · ");
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 120px",
          background: "#0D0D0F",
          color: "#EDEBE6",
        }}
      >
        <div style={{ display: "flex", gap: 24, marginBottom: 56 }}>
          {Array.from({ length: 5 }, (_, i) => (
            <div
              key={i}
              style={{ width: 36, height: 36, borderRadius: 18, background: "#FF3B30", boxShadow: "0 0 32px #FF3B30" }}
            />
          ))}
        </div>
        <div style={{ fontSize: 104, fontWeight: 600, letterSpacing: -3, lineHeight: 1 }}>{name}</div>
        <div style={{ fontSize: 44, color: "#A19E96", marginTop: 28 }}>{role}</div>
      </div>
    ),
    size,
  );
}

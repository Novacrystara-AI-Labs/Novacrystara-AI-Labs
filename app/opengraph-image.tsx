import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { hero } from "@/content/hero";

// Dynamic Open Graph image (arch §12) — white background, black + #4e8f52, no gradients.
export const alt = "NovaCrystara AI Labs — AI Solutions for Speed, Scale, and ROI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#ffffff",
          color: "#000000",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 26, height: 26, borderRadius: 6, background: "#4e8f52" }} />
          <span style={{ fontSize: 30, fontWeight: 700, letterSpacing: -0.5 }}>
            <span style={{ color: "#000000" }}>Nova</span>
            <span style={{ color: "#4e8f52" }}>Crystara</span>
          </span>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 70,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: -1.5,
            maxWidth: 1000,
            color: "#000000",
          }}
        >
          {hero.headline}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", width: 90, height: 6, background: "#4e8f52" }} />
          <div style={{ display: "flex", fontSize: 26, color: "#6b776d", maxWidth: 900 }}>
            {site.brand} — the speed of a startup, the rigor of three decades.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}

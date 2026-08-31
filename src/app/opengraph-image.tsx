import { ImageResponse } from "next/og";

import { home } from "@/lib/home";

// Branded link-preview card — the default og:image (and twitter:image
// fallback) for every page that doesn't override with its own screenshots.
// Copy derives from the hero in lib/home (badge, focus areas) over the
// design tokens (globals.css: canvas, accent-tint), so the card auto-syncs
// with the site and can never drift from its voice.
export const alt = "Thayer Picart — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Satori (the OG renderer) has no Tailwind pipeline here — inline style
// objects are the only way to express these values, per the styling exception.
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#070707",
          backgroundImage:
            "radial-gradient(circle at bottom right, rgba(166, 115, 231, 0.32), transparent 55%), radial-gradient(circle at top left, rgba(124, 77, 255, 0.16), transparent 50%)",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "#d7bfff",
            letterSpacing: 8,
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          {home.hero.badge}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 88,
            fontWeight: 700,
            color: "#ffffff",
          }}
        >
          Thayer Picart
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "rgba(255, 255, 255, 0.72)",
            letterSpacing: 4,
            marginTop: 24,
          }}
        >
          {home.hero.focusAreas.join(" · ")}
        </div>
      </div>
    ),
    size
  );
}

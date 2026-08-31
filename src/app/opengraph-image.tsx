import { ImageResponse } from "next/og";

import { home } from "@/lib/home";

// Default og:image / twitter card — copy derives from lib/home so it
// stays in sync with the hero.
export const alt = "Thayer Picart — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Satori has no Tailwind pipeline — inline styles are the only option here.
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

import type { IconType } from "react-icons";
import { FaBriefcase, FaGraduationCap, FaLaptopCode, FaTools } from "react-icons/fa";

import type { HomeIconId } from "@/lib/home";

// Component refs are presentation, so they live in this map — lib/home.ts
// stays serializable (icon IDs only). Same pattern as skill-icon.tsx.
const homeIcons: Record<HomeIconId, IconType> = {
  "laptop-code": FaLaptopCode,
  briefcase: FaBriefcase,
  tools: FaTools,
  "graduation-cap": FaGraduationCap,
};

type HomeIconProps = {
  iconId: HomeIconId;
  className?: string;
};

export function HomeIcon({ iconId, className }: HomeIconProps) {
  const Icon = homeIcons[iconId];
  return <Icon className={className} />;
}
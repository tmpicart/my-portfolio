import type { IconType } from "react-icons";
import { FaAws, FaJava, FaSlack } from "react-icons/fa";
import {
  SiBootstrap,
  SiC,
  SiCline,
  SiCss,
  SiDjango,
  SiFirebase,
  SiGit,
  SiGithub,
  SiGodotengine,
  SiGooglegemini,
  SiHtml5,
  SiJavascript,
  SiJira,
  SiKotlin,
  SiMysql,
  SiNextdotjs,
  SiNotion,
  SiPython,
  SiTailwindcss,
} from "react-icons/si";

import type { SkillIconId } from "@/lib/skills";

// Icon components and brand colors live here so lib/skills.ts stays
// serializable (icon IDs only).
const skillIcons: Record<SkillIconId, { icon: IconType; className: string }> = {
  python: { icon: SiPython, className: "text-blue-500" },
  java: { icon: FaJava, className: "text-red-600" },
  c: { icon: SiC, className: "text-gray-600" },
  javascript: { icon: SiJavascript, className: "text-yellow-400" },
  gdscript: { icon: SiGodotengine, className: "text-blue-400" },
  kotlin: { icon: SiKotlin, className: "text-violet-500" },
  html: { icon: SiHtml5, className: "text-orange-500" },
  css: { icon: SiCss, className: "text-blue-400" },
  tailwind: { icon: SiTailwindcss, className: "text-teal-400" },
  bootstrap: { icon: SiBootstrap, className: "text-purple-600" },
  nextjs: { icon: SiNextdotjs, className: "text-white" },
  django: { icon: SiDjango, className: "text-green-700" },
  sql: { icon: SiMysql, className: "text-blue-600" },
  firebase: { icon: SiFirebase, className: "text-yellow-500" },
  aws: { icon: FaAws, className: "text-orange-500" },
  "gemini-api": { icon: SiGooglegemini, className: "text-indigo-400" },
  cline: { icon: SiCline, className: "text-orange-400" },
  agile: { icon: SiJira, className: "text-blue-500" },
  git: { icon: SiGit, className: "text-red-500" },
  github: { icon: SiGithub, className: "text-white" },
  slack: { icon: FaSlack, className: "text-purple-500" },
  notion: { icon: SiNotion, className: "text-white" },
};

export function SkillIcon({ iconId }: { iconId: SkillIconId }) {
  const { icon: Icon, className } = skillIcons[iconId];
  return <Icon className={className} />;
}
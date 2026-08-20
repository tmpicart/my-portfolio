export type SkillIconId =
  | "python"
  | "java"
  | "c"
  | "javascript"
  | "gdscript"
  | "html"
  | "css"
  | "tailwind"
  | "bootstrap"
  | "nextjs"
  | "fastapi"
  | "django"
  | "sql"
  | "firebase"
  | "aws"
  | "agile"
  | "git"
  | "github"
  | "slack"
  | "notion";

export type Skill = {
  name: string;
  iconId: SkillIconId;
};

export type SkillCategory = {
  title: string;
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Programming Languages",
    skills: [
      { name: "Python", iconId: "python" },
      { name: "Java", iconId: "java" },
      { name: "C", iconId: "c" },
      { name: "JavaScript", iconId: "javascript" },
      { name: "GDScript", iconId: "gdscript" },
    ],
  },
  {
    title: "Styling & Markup",
    skills: [
      { name: "HTML", iconId: "html" },
      { name: "CSS", iconId: "css" },
      { name: "Tailwind CSS", iconId: "tailwind" },
      { name: "Bootstrap", iconId: "bootstrap" },
    ],
  },
  {
    title: "Frameworks & Libraries",
    skills: [
      { name: "Next.js", iconId: "nextjs" },
      { name: "FastAPI", iconId: "fastapi" },
      { name: "Django", iconId: "django" },
    ],
  },
  {
    title: "Databases & Cloud",
    skills: [
      { name: "SQL", iconId: "sql" },
      { name: "Firebase", iconId: "firebase" },
      { name: "AWS", iconId: "aws" },
    ],
  },
  {
    title: "Tools & Collaboration",
    skills: [
      { name: "Agile", iconId: "agile" },
      { name: "Git", iconId: "git" },
      { name: "GitHub", iconId: "github" },
      { name: "Slack", iconId: "slack" },
      { name: "Notion", iconId: "notion" },
    ],
  },
];
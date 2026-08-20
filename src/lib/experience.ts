export type Experience = {
  company: string;
  role: string;
  duration: string;
  description: string[];
  tags: string[];
  logo: string;
};

export const experiences: Experience[] = [
  {
    company: "Grey-box",
    role: "Software Engineer Intern",
    duration: "Aug 2024 – Dec 2024",
    description: [
      "Developed a responsive, mobile-friendly web app for translating medication names into multiple languages.",
      "Migrated the project to Next.js, TypeScript, and Tailwind CSS, improving maintainability and scalability.",
      "Integrated AI-driven translation with Gemini API and Levenshtein fuzzy matching for accuracy.",
      "Collaborated effectively in Agile using Slack and Notion, streamlining workflows and delivery.",
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Git", "Agile"],
    logo: "/images/icons/greyboxproject_logo.png",
  },
  {
    company: "Berlin Lions Club",
    role: "Software Engineer Intern",
    duration: "Jan 2024 – May 2024",
    description: [
      "Revamped the user registration and event management system for the Berlin Fair, used by 80,000+ individuals.",
      "Modernized authentication by merging redundant SQL databases and implementing identity management.",
      "Strengthened security with SHA-256 hashing for credentials.",
      "Fixed critical bugs, improving overall system functionality and user experience.",
    ],
    tags: ["Python", "SQL", "Authentication", "Legacy System Maintenance"],
    logo: "/images/icons/berlin-logo.jpg",
  },
];
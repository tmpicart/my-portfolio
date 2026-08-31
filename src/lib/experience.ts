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
      "Built a responsive, mobile-friendly web app for translating medical terminology across multiple languages as part of a 3-person team; project won the department’s senior showcase.",
      "Designed and implemented an AI-powered fallback translation system using the Gemini API, including backend integration to handle cases with no direct database match.",
      "Migrated the application to Next.js, TypeScript, and Tailwind CSS, improving maintainability and scalability.",
      "Collaborated in an Agile environment using Slack and Notion to coordinate sprints and streamline delivery.",
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Git", "Agile"],
    logo: "/images/icons/greyboxproject-logo.jpg",
  },
  {
    company: "Berlin Lions Club",
    role: "Software Engineer Intern",
    duration: "Jan 2024 – May 2024",
    description: [
      "Unified the user and admin SQL schemas into a single table with consistent permission and field structures, creating one source of truth for user data and access control.",
      "Strengthened credential security by migrating stored passwords from MD5 to SHA-256 hashing via an incremental, zero-downtime rehash triggered on user login.",
      "Identified and resolved critical bugs, improving overall system reliability and user experience.",
    ],
    tags: ["Python", "SQL", "Authentication", "Legacy System Maintenance"],
    logo: "/images/icons/berlin-logo.jpg",
  },
];
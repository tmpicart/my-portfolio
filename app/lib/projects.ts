export type Project = {
  slug: string;
  title: string;
  description: string;
  images: string[];
  imageInfos?: string[][];
  bullets: {
    languages?: string[];
    frameworks?: string[];
    features?: string[];
  };
  github: string;
};

export const projects: Project[] = [
  {
    slug: "john-dungeon",
    title: "John Dungeon",
    description:
      "A top-down dungeon crawler inspired by classic Zelda games, featuring custom-drawn sprites, varied enemies, and an intense two-phase boss fight. Originally developed over a tight three-week deadline by a team of five, the project earned the highest rating among competing games, with 4.59 stars. I have since taken over development as a solo project to fix bugs, refactor code, enhance gameplay, and expand content.",
    images: [
      "/images/john/John_1.png",
      "/images/john/John_2.png",
      "/images/john/John_3.png",
      "/images/john/John_4.png",
      "/images/john/John_5.png",
      "/images/john/John_6.png",
    ],
    imageInfos: [
      ["Title Screen", "- Start or exit the game; includes death and restart mechanics"],
      ["NPC Interaction", "- Players can talk to NPCs with functional dialogue"],
      ["Shop System & Upgrades", "- Upgrade health and weapons with in-game currency"],
      ["Varied Enemies", "- Slimes, necromancers, skeletons, archers, and more; AI controlled with state machines"],
      ["Multi-Phase Boss", "- Sorceress at the dungeon end with varied attacks and a second phase"],
      ["Phase 2", "- Boss attacks intensify with new patterns"],
    ],
    bullets: {
      languages: ["GDScript"],
      frameworks: ["Godot Engine"],
      features: [
        "State-machine architecture for player and enemy AI",
        "Modular and reusable code for future content and easy expansion",
        "A dungeon ending in an intense boss fight",
        "Varied enemies and behaviors",
        "Player progression systems",
        "Fast-paced and dynamic combat",
      ],
    },
    github: "https://github.com/tmpicart/John-Dungeon",
  },
  {
    slug: "medical-codex",
    title: "Medical Codex Translation Tool",
    description:
      "A tool designed to bridge language barriers in medical aid by translating terms across multiple languages. Originally developed by a team of three, it went on to win the senior project showcase for that semester. The tool leverages an extensive term database and provides AI-powered fallback translations for any missing entries.",
    images: [
      "/images/codex/codex_1.png",
      "/images/codex/codex_2.png",
      "/images/codex/codex_3.png",
      "/images/codex/codex_4.png",
      "/images/codex/codex_5.png",
    ],
    imageInfos: [
      ["Home Page", "- Select language and enter a term; fuzzy matching ensures accuracy"],
      ["Translation", "- 'Tylenol' translated to Ukrainian using the backend database"],
      ["AI Translation", "- Fallback AI translation available if no database entry exists"],
      ["Mobile Viewing", "- Responsive and mobile-friendly design"],
      ["Security", "- Inputs are protected from SQL injection and other vulnerabilities"],
    ],
    bullets: {
      languages: ["JavaScript", "TypeScript", "SQL"],
      frameworks: ["Next.js", "Tailwind CSS", "FastAPI"],
      features: [
        "Responsive and mobile-friendly interface",
        "Gemini API integration",
        "Translates medical terminologies across multiple languages",
        "SQL database contains extensive translations",
        "Improved maintainability and scalability with refactoring to Next.js and Tailwind CSS",
        "Custom backend hooks for frontend integration, enabling seamless communication with the database and APIs",
      ],
    },
    github: "",
  },
  {
    slug: "ticketmaster-search",
    title: "TicketMaster Search Mobile",
    description:
      "Mobile app to search, view, and save events from TicketMaster via the TicketMaster API, with Firebase authentication and data storage allowing users to log in and save their favorite events.",
    images: [
      "/images/ticketmaster/TicketMaster_1.png",
      "/images/ticketmaster/TicketMaster_2.png",
      "/images/ticketmaster/TicketMaster_3.png",
      "/images/ticketmaster/TicketMaster_4.png",
    ],
    imageInfos: [
      ["User Authentication", "- Users sign up or log in via Google accounts"],
      ["Main Page", "- Search by city and event type; concise event data display"],
      ["Favoriting Events", "- Save important events for tracking"],
      ["Favorite List", "- Favorites stored securely; direct ticket purchase links retained"],
    ],
    bullets: {
      languages: ["Kotlin"],
      frameworks: ["Android SDK", "Retrofit", "Glide", "RecyclerView"],
      features: [
        "Firebase Authentication & Firestore integration",
        "User-based data storage and event saving",
        "Real-time event browsing and updates",
        "Filter through TicketMaster events via location and keyword",
        "Smooth image loading and rendering",
        "Mobile-first UX design",
      ],
    },
    github: "https://github.com/tmpicart/TicketMasterMobile",
  },
  {
    slug: "portfolio-website",
    title: "My Portfolio Website",
    description:
      "This is my portfolio website built to showcase my projects, skills, education, and experience. Feel free to explore or check out my GitHub, LinkedIn, or Resume found at the bottom of every page.",
    images: [
      "/images/portfolio/Portfolio_1.png",
      "/images/portfolio/Portfolio_2.png",
      "/images/icons/Avatar.png",
    ],
    imageInfos: [
      ["Vercel Deployment", "- Website is deployed and fully functional via Vercel"],
      ["Mobile Responsive", "- Mobile support and adaptive/scalable design"],
      ["Thanks for Visiting!", "- Thank you for taking the time to view my page!"],
    ],
    bullets: {
      languages: ["JavaScript", "TypeScript"],
      frameworks: ["Next.js", "Tailwind CSS", "Framer Motion"],
      features: [
        "Fully responsive and mobile-friendly design",
        "Interactive animations and page load",
        "Showcases modern web development practices, including Next.js and Tailwind",
        "Vercel deployment via GitHub, automatically updated with every push",
      ],
    },
    github: "https://github.com/tmpicart/my-portfolio",
  },
];

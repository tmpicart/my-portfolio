export type ProjectScreenshot = {
  src: string;
  title: string;
  lines: string[];
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  thumbnail: string;
  featured: boolean;
  screenshots: ProjectScreenshot[];
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
    summary: "A top-down dungeon crawler inspired by classic Zelda and old school fantasy games.",
    description:
      "A top-down dungeon crawler inspired by classic Zelda games, featuring custom-drawn sprites, varied enemies, and an intense two-phase boss fight. Originally built over a tight three-week deadline by a team of five, the project earned the highest rating among competing games at 4.59 stars. I've since taken over development as a solo project, refactoring the codebase, fixing bugs, and expanding gameplay systems.",
    thumbnail: "/images/john/john-5.png",
    featured: false,
    screenshots: [
      {
        src: "/images/john/john-1.png",
        title: "Title Screen",
        lines: ["- Start or exit the game; includes death and restart mechanics"],
      },
      {
        src: "/images/john/john-2.png",
        title: "NPC Interaction",
        lines: ["- Players can talk to NPCs with functional dialogue"],
      },
      {
        src: "/images/john/john-3.png",
        title: "Shop System & Upgrades",
        lines: ["- Upgrade health and weapons with in-game currency"],
      },
      {
        src: "/images/john/john-4.png",
        title: "Varied Enemies",
        lines: [
          "- Slimes, necromancers, skeletons, archers, and more; AI controlled with state machines",
        ],
      },
      {
        src: "/images/john/john-5.png",
        title: "Multi-Phase Boss",
        lines: ["- Sorceress at the dungeon end with varied attacks and a second phase"],
      },
      {
        src: "/images/john/john-6.png",
        title: "Phase 2",
        lines: ["- Boss attacks intensify with new patterns"],
      },
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
    summary:
      "A web-based tool designed to translate medical terminology from language to language for better accessibility.",
    description:
      "A tool designed to bridge language barriers by translating medical terms across multiple languages. Developed by a team of three, it won the senior project showcase for that semester. The tool leverages an extensive term database and provides AI-powered fallback translations for any missing entries.",
    thumbnail: "/images/codex/codex-1.png",
    featured: true,
    screenshots: [
      {
        src: "/images/codex/codex-1.png",
        title: "Home Page",
        lines: ["- Select language and enter a term; fuzzy matching ensures accuracy"],
      },
      {
        src: "/images/codex/codex-2.png",
        title: "Translation",
        lines: ["- 'Tylenol' translated to Ukrainian using the backend database"],
      },
      {
        src: "/images/codex/codex-3.png",
        title: "AI Translation",
        lines: ["- Fallback AI translation available if no database entry exists"],
      },
      {
        src: "/images/codex/codex-4.png",
        title: "Mobile Viewing",
        lines: ["- Responsive and mobile-friendly design"],
      },
      {
        src: "/images/codex/codex-5.png",
        title: "Security",
        lines: ["- Inputs are protected from SQL injection and other vulnerabilities"],
      },
    ],
    bullets: {
      languages: ["JavaScript", "TypeScript", "SQL"],
      frameworks: ["Next.js", "Tailwind CSS", "FastAPI"],
      features: [
        "Translates medical terminologies across multiple languages",
        "SQL database contains extensive translations",
        "Fuzzy-matched search for accurate term lookup",
        "Gemini API integration with a dedicated backend hook for AI-powered fallback translation",
        "Responsive and mobile-friendly interface",
        "Improved maintainability and scalability with refactoring to Next.js and Tailwind CSS",
      ],
    },
    github: "",
  },
  {
    slug: "ticketmaster-search",
    title: "TicketMaster Search Mobile",
    summary: "A mobile app built to search for events and tickets via the TicketMaster API.",
    description:
      "Mobile app to search, view, and save events from TicketMaster via the TicketMaster API, with Firebase authentication and Firestore-backed storage allowing users to log in and save their favorite events.",
    thumbnail: "/images/ticketmaster/ticketmaster-1.png",
    featured: false,
    screenshots: [
      {
        src: "/images/ticketmaster/ticketmaster-1.png",
        title: "User Authentication",
        lines: ["- Users sign up or log in via Google accounts"],
      },
      {
        src: "/images/ticketmaster/ticketmaster-2.png",
        title: "Main Page",
        lines: ["- Search by city and event type; concise event data display"],
      },
      {
        src: "/images/ticketmaster/ticketmaster-3.png",
        title: "Favoriting Events",
        lines: ["- Save important events for tracking"],
      },
      {
        src: "/images/ticketmaster/ticketmaster-4.png",
        title: "Favorite List",
        lines: ["- Favorites stored securely; direct ticket purchase links retained"],
      },
    ],
    bullets: {
      languages: ["Kotlin"],
      frameworks: ["Android SDK", "Retrofit", "Glide", "RecyclerView"],
      features: [
        "Firebase Authentication (email/password and Google sign-in)",
        "Firestore integration for user account and favorited-event data",
        "Live event browsing via the TicketMaster API",
        "Filter events by location and keyword",
        "Smooth image loading and rendering",
        "Mobile-first UX design",
      ],
    },
    github: "https://github.com/tmpicart/TicketMasterMobile",
  },
  {
    slug: "portfolio-website",
    title: "My Portfolio Website",
    summary: "Learn more about the portfolio site you are currently visiting!",
    description:
      "This is my portfolio website built to showcase my projects, skills, education, and experience. Feel free to explore! Check out my GitHub, LinkedIn, or shoot me an email with the links at the bottom of every page.",
    thumbnail: "/images/portfolio/home.png",
    featured: false,
    screenshots: [
      {
        src: "/images/portfolio/portfolio-1.png",
        title: "Vercel Deployment",
        lines: ["- Website is deployed and fully functional via Vercel"],
      },
      {
        src: "/images/portfolio/mobile.png",
        title: "Mobile Responsive",
        lines: ["- Mobile support and adaptive/scalable design"],
      },
    ],
    bullets: {
      languages: ["JavaScript", "TypeScript"],
      frameworks: ["Next.js", "Tailwind CSS", "Framer Motion"],
      features: [
        "Fully responsive and mobile-friendly design",
        "Interactive effects and load animations",
        "Showcases modern web development practices, including Next.js and Tailwind",
        "Vercel deployment via GitHub, automatically updated with every push",
      ],
    },
    github: "https://github.com/tmpicart/my-portfolio",
  },
];

// The hub's spotlight card is driven by this flag — enforce the one-true invariant
// at module load so a bad edit fails the build, not the page.
if (projects.filter((project) => project.featured).length !== 1) {
  throw new Error(
    "lib/projects.ts: exactly one project must be marked featured: true"
  );
}
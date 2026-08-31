export type ContactIconId = "linkedin" | "github" | "email" | "resume";

export type ContactLink = {
  href: string;
  iconId: ContactIconId;
  ariaLabel: string;
  opensInNewTab: boolean;
};

export const contactLinks: ContactLink[] = [
  {
    href: "https://www.linkedin.com/in/tmpicart",
    iconId: "linkedin",
    ariaLabel: "Visit my LinkedIn profile",
    opensInNewTab: true,
  },
  {
    href: "https://github.com/tmpicart",
    iconId: "github",
    ariaLabel: "Visit my GitHub profile",
    opensInNewTab: true,
  },
  {
    href: "mailto:tmpicart@gmail.com",
    iconId: "email",
    ariaLabel: "Send me an email",
    opensInNewTab: false,
  },
  {
    href: "/Thayer-Picart-Resume.pdf",
    iconId: "resume",
    ariaLabel: "View my resume (PDF)",
    opensInNewTab: true,
  },
];
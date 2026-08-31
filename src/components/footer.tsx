import type { IconType } from "react-icons";
import { FaEnvelope, FaFilePdf, FaLinkedin } from "react-icons/fa";
import { SiGithub } from "react-icons/si";

import { contactLinks, type ContactIconId } from "@/lib/contact";

// Component refs are presentation, so they live in this map — lib/contact.ts
// stays serializable (icon IDs only). Same pattern as home-icon.tsx.
const contactIcons: Record<ContactIconId, IconType> = {
  linkedin: FaLinkedin,
  github: SiGithub,
  email: FaEnvelope,
  resume: FaFilePdf,
};

export default function Footer() {
  return (
    <footer className="flex flex-col items-center bg-linear-to-t from-canvas-raised to-canvas py-6 text-center">
      <h2 className="mb-2 text-2xl md:text-3xl font-semibold">Let’s Connect</h2>

      <p className="mb-3 text-base md:text-lg text-gray-300">
        Check out my socials, reach me by email, or view my resume.
      </p>

      <div className="flex space-x-6 text-3xl md:text-4xl">
        {contactLinks.map((link) => {
          const ContactIcon = contactIcons[link.iconId];
          return (
            <a
              key={link.iconId}
              href={link.href}
              target={link.opensInNewTab ? "_blank" : undefined}
              rel={link.opensInNewTab ? "noopener noreferrer" : undefined}
              aria-label={link.ariaLabel}
              className="transition-colors duration-200 hover:text-accent"
            >
              <ContactIcon />
            </a>
          );
        })}
      </div>
    </footer>
  );
}
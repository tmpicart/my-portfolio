import Image from "next/image";

import AccentLinkButton from "@/components/accent-link-button";
import GlassCard from "@/components/glass-card";
import { HomeIcon } from "@/components/home-icon";
import PageHeader from "@/components/page-header";
import PageShell from "@/components/page-shell";
import ProjectCarousel from "@/components/project-carousel";
import TagPill from "@/components/tag-pill";
import { home } from "@/lib/home";
import { projects } from "@/lib/projects";

// Minimal slide shape — keeps descriptions, captions, and full image lists out
// of the carousel island's client payload.
const carouselSlides = projects.map(({ slug, title, thumbnail }) => ({
  slug,
  title,
  thumbnail,
}));

export default function HomePage() {
  return (
    <PageShell>
      <PageHeader eyebrow={home.hero.eyebrow} title={home.hero.title} />

      <GlassCard
        variant="hero"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(166,115,231,0.14),_transparent_45%)]" />

        <div className="relative flex-1 text-center lg:text-left">
          <div className="mb-4">
            <TagPill variant="badge">{home.hero.badge}</TagPill>
          </div>
          <p className="text-lg leading-relaxed text-gray-200 sm:text-xl">
            {home.hero.intro}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
            {home.hero.focusAreas.map((area) => (
              <TagPill key={area} variant="muted">
                {area}
              </TagPill>
            ))}
          </div>
        </div>

        <div className="relative flex-shrink-0">
          <div className="relative rounded-full border border-white/20 bg-[radial-gradient(circle_at_bottom_right,_rgba(166,115,231,0.28),_rgba(255,255,255,0.04)_55%,_transparent_70%)] p-2">
            <Image
              src="/images/icons/pfp.jpg"
              alt="Thayer profile pic"
              width={132}
              height={132}
              className="rounded-full border border-white/15 object-cover"
            />
          </div>
        </div>
      </GlassCard>

      <div className="relative flex w-full max-w-6xl flex-col gap-8 lg:flex-row">
        <GlassCard
          variant="section"
          className="flex-1"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        >
          <div className="mb-4 flex items-center">
            <div className="mr-3 rounded-full bg-accent/15 p-3">
              <HomeIcon iconId={home.projects.iconId} className="text-3xl text-accent" />
            </div>
            <h2 className="text-3xl font-semibold sm:text-4xl text-white">{home.projects.title}</h2>
          </div>
          <p className="mb-6 text-lg leading-relaxed text-gray-200">
            {home.projects.description}
          </p>

          <ProjectCarousel slides={carouselSlides} />

          <AccentLinkButton href="/projects">{home.projects.button}</AccentLinkButton>
        </GlassCard>

        <div className="flex flex-1 flex-col gap-5">
          {home.infoCards.map((card, index) => (
            <GlassCard
              key={card.title}
              variant="section"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: 0.5 + index * 0.15,
              }}
            >
              <div className="mb-2 flex items-center">
                <div className="mr-3 rounded-full bg-accent/20 p-2">
                  <HomeIcon iconId={card.iconId} className="text-2xl text-accent" />
                </div>
                <h2 className="text-2xl font-semibold sm:text-3xl">{card.title}</h2>
              </div>
              <p className="text-lg leading-relaxed text-gray-200">{card.description}</p>
              <AccentLinkButton href={card.href} className="mt-3">
                {card.button}
              </AccentLinkButton>
            </GlassCard>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
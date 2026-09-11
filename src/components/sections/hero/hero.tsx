import { Container } from "@/components/layout/container";
import { LinkButton } from "@/components/ui/link-button";
import { navigationItems } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { portfolioStats, socialProfiles } from "@/data/socials";

import { HeroVisual } from "./hero-visual";
import { RotatingRole } from "./rotating-role";

export function Hero() {
  const audienceStat = portfolioStats.find(
    (stat) => stat.id === "social-audience",
  );
  const workItem = navigationItems.find((item) => item.href === "#work");
  const contactItem = navigationItems.find((item) => item.href === "#contact");
  const audienceProfiles = socialProfiles.filter(
    (profile) => "displayFollowerCount" in profile,
  );

  return (
    <section
      className="hero-section relative isolate min-h-svh overflow-hidden"
      id="home"
    >
      <HeroVisual />

      <Container className="hero-shell relative z-10 flex min-h-[calc(100svh-var(--header-height))] flex-col pb-8 pt-[clamp(2.5rem,7vh,6.5rem)]">
        <div className="hero-eyebrow animate-hero-reveal flex items-center gap-4 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted [--reveal-delay:80ms]">
          <span className="text-copper">01</span>
          <span className="h-px w-8 bg-[var(--line-strong)]" />
          <span>Introduction / {siteConfig.location.city}</span>
        </div>

        <div className="hero-identity mt-[clamp(2rem,5vh,4.5rem)] max-w-[76rem]">
          <div className="animate-hero-reveal flex flex-wrap items-baseline gap-x-4 gap-y-1 [--reveal-delay:150ms]">
            <p className="text-[clamp(0.78rem,1.1vw,1rem)] font-semibold uppercase tracking-[0.16em] text-bone">
              {siteConfig.name}
            </p>
            <p className="font-serif text-[clamp(1rem,1.5vw,1.35rem)] italic text-muted">
              — {siteConfig.nickname}
            </p>
          </div>

          <h1 className="hero-title animate-hero-reveal mt-5 max-w-[9.5ch] text-[clamp(3.65rem,8.5vw,7.4rem)] font-semibold leading-[0.86] tracking-[-0.072em] text-bone [--reveal-delay:230ms]">
            I build software,
            <br />
            products{" "}
            <span className="font-serif font-normal italic text-bone-soft">&amp;</span>{" "}
            audiences.
          </h1>
        </div>

        <div className="hero-composition mt-[clamp(2.5rem,6vh,5.5rem)] grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.55fr)] lg:items-end">
          <div className="max-w-2xl">
            <p className="animate-hero-reveal text-pretty text-[clamp(1rem,1.3vw,1.22rem)] leading-relaxed text-bone-soft [--reveal-delay:310ms]">
              {siteConfig.professionalTitles[0]},{" "}
              {siteConfig.professionalTitles[1].toLowerCase()} and{" "}
              {siteConfig.professionalTitles[2].toLowerCase()} based in{" "}
              {siteConfig.location.label} — building digital products, backend
              systems and experiences while creating for an audience of{" "}
              {audienceStat?.value} {audienceStat?.label.toLowerCase()}.
            </p>

            <div className="hero-actions animate-hero-reveal mt-7 flex flex-col gap-3 [--reveal-delay:390ms] sm:flex-row">
              {workItem ? (
                <LinkButton className="sm:min-w-40" href={workItem.href} showArrow>
                  Explore My Work
                </LinkButton>
              ) : null}
              {contactItem ? (
                <LinkButton
                  className="sm:min-w-40"
                  href={contactItem.href}
                  showArrow
                  variant="secondary"
                >
                  Start a Project
                </LinkButton>
              ) : null}
            </div>
          </div>

          {audienceStat ? (
            <aside className="hero-proof animate-hero-reveal border-l border-[var(--line-strong)] pl-5 [--reveal-delay:470ms] lg:justify-self-end lg:pr-[clamp(0rem,4vw,4rem)]">
              <p className="text-[clamp(2.5rem,4vw,4.5rem)] font-medium leading-none tracking-[-0.055em] text-bone">
                {audienceStat.value}
              </p>
              <p className="mt-2 text-[0.68rem] uppercase tracking-[0.18em] text-muted">
                {audienceStat.label}
              </p>
              <p className="mt-4 text-xs text-muted-dark">
                {audienceProfiles.map((profile) => (
                  <span className="mr-3 whitespace-nowrap" key={profile.platform}>
                    {profile.displayFollowerCount} {profile.label}
                  </span>
                ))}
              </p>
            </aside>
          ) : null}
        </div>

        <div className="hero-footer animate-hero-reveal mt-auto grid gap-6 pt-[clamp(3rem,8vh,7rem)] [--reveal-delay:540ms] md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="mb-2 text-[0.62rem] uppercase tracking-[0.18em] text-muted-dark">
              Current perspective
            </p>
            <p className="text-xs uppercase tracking-[0.16em] text-muted">
              <RotatingRole roles={siteConfig.heroRoles} />
            </p>
          </div>

          <nav aria-label="Social profiles" className="flex flex-wrap gap-x-5 gap-y-2">
            {socialProfiles.map((profile) => (
              <a
                aria-label={`${profile.label} profile for ${profile.username} (opens in a new tab)`}
                className="group inline-flex min-h-11 items-center gap-1.5 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-muted transition-colors hover:text-bone focus-visible:text-bone"
                href={profile.url}
                key={profile.platform}
                rel="noopener noreferrer"
                target="_blank"
              >
                {profile.label}
                <span
                  aria-hidden="true"
                  className="interaction-arrow interaction-arrow--external text-copper"
                >
                  ↗
                </span>
              </a>
            ))}
          </nav>
        </div>
      </Container>

      <div aria-hidden="true" className="hero-scroll-prompt relative z-10 px-[var(--page-gutter)]">
        <div className="mx-auto flex h-20 max-w-[var(--content-width)] items-end border-t border-[var(--line)] pb-5 text-[0.6rem] uppercase tracking-[0.2em] text-muted-dark">
          <span>Scroll to explore</span>
        </div>
      </div>
    </section>
  );
}

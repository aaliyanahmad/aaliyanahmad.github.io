import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Divider } from "@/components/ui/divider";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { aboutContent } from "@/data/about";
import { education } from "@/data/education";
import { siteConfig, vectorLabs } from "@/data/site";
import { portfolioStats } from "@/data/socials";

import { AboutPortrait } from "./about-portrait";
import { IdentitySplit } from "./identity-split";

export function About() {
  const audienceStat = portfolioStats.find(
    (stat) => stat.id === "social-audience",
  );
  const computerScienceEducation = education[0];
  const facts: { value: string; label: string }[] = [
    ...(audienceStat
      ? [{ value: audienceStat.value, label: "Combined social audience" }]
      : []),
    {
      value: computerScienceEducation.years,
      label: computerScienceEducation.degree,
    },
    {
      value: siteConfig.location.city,
      label: siteConfig.location.country,
    },
    {
      value: vectorLabs.name,
      label: vectorLabs.relationship,
    },
  ];

  return (
    <Section
      className="relative scroll-mt-16 overflow-hidden bg-carbon-soft"
      id="about"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-[0.05em] top-[16%] select-none text-[clamp(8rem,26vw,30rem)] font-semibold leading-none tracking-[-0.09em] text-white/[0.015]"
      >
        BUILD
      </span>

      <Container className="relative">
        <Divider className="mb-[clamp(4rem,8vw,8rem)]" />

        <ScrollReveal>
          <SectionHeader
            description={aboutContent.introduction}
            eyebrow={aboutContent.eyebrow}
            title={
              <>
                {aboutContent.heading.lead}{" "}
                <span className="font-serif font-normal italic text-bone-soft">
                  {aboutContent.heading.emphasis}
                </span>
              </>
            }
          />
        </ScrollReveal>

        <div className="mt-[clamp(4rem,8vw,8rem)] grid gap-12 md:grid-cols-[minmax(15rem,0.8fr)_minmax(0,1.2fr)] md:items-start lg:gap-[clamp(4rem,8vw,9rem)]">
          <ScrollReveal>
            <AboutPortrait
              alt={siteConfig.portrait.alt}
              location={`${siteConfig.location.city} / ${siteConfig.location.countryCode}`}
              name={siteConfig.name}
              src={siteConfig.portrait.src}
            />
          </ScrollReveal>

          <div>
            <ScrollReveal delay={100}>
              <div className="space-y-6 text-pretty text-[clamp(1.05rem,1.5vw,1.3rem)] leading-[1.7] text-bone-soft">
                {aboutContent.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <aside className="mt-10 border-l border-copper pl-5">
                <p className="text-[0.62rem] uppercase tracking-[0.18em] text-muted">
                  {aboutContent.principle.label}
                </p>
                <p className="mt-3 max-w-xl font-serif text-[clamp(1.5rem,3vw,2.7rem)] italic leading-tight tracking-[-0.03em] text-bone">
                  {aboutContent.principle.text}
                </p>
              </aside>
            </ScrollReveal>
          </div>
        </div>

        <ScrollReveal className="mt-[clamp(5rem,10vw,9rem)]" delay={80}>
          <IdentitySplit
            identities={aboutContent.identities}
            introduction={aboutContent.identityIntroduction}
          />
        </ScrollReveal>

        <ScrollReveal className="mt-[clamp(4rem,8vw,7rem)]" delay={100}>
          <dl className="grid border-y border-[var(--line)] sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((fact, index) => (
              <div
                className={`py-6 sm:px-6 ${
                  index > 0 ? "border-t border-[var(--line)]" : ""
                } ${index % 2 !== 0 ? "sm:border-l" : ""} ${
                  index === 1 ? "sm:border-t-0" : ""
                } ${index === 2 ? "sm:border-l-0" : ""} ${
                  index > 0 ? "lg:border-l lg:border-t-0" : ""
                }`}
                key={fact.label}
              >
                <dt className="text-[0.62rem] uppercase tracking-[0.16em] text-muted">
                  {fact.label}
                </dt>
                <dd className="mt-4 text-[clamp(1.4rem,2.5vw,2.4rem)] font-medium leading-tight tracking-[-0.035em] text-bone">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </ScrollReveal>

        <ScrollReveal className="mt-[clamp(4rem,7vw,6rem)]" delay={120}>
          <div className="grid gap-7 border-t border-[var(--line)] pt-7 md:grid-cols-[0.45fr_1fr]">
            <p className="text-[0.65rem] uppercase tracking-[0.18em] text-muted">
              Currently
            </p>
            <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {aboutContent.currentFocus.map((focus, index) => (
                <li
                  className="flex items-start gap-3 text-sm leading-6 text-bone-soft"
                  key={focus}
                >
                  <span
                    aria-hidden="true"
                    className="mt-[0.6rem] size-1 shrink-0 bg-copper"
                  />
                  <span>
                    <span className="mr-2 text-[0.6rem] text-muted-dark">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {focus}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}

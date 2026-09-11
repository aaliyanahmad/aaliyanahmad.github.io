import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Divider } from "@/components/ui/divider";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { getFeaturedProjects, getSecondaryProjects } from "@/data/projects";
import { workSectionContent } from "@/data/work";

import { FeaturedProject } from "./featured-project";
import { SecondaryProject } from "./secondary-project";

export function Work() {
  const featuredProjects = getFeaturedProjects();
  const secondaryProjects = getSecondaryProjects();

  return (
    <Section
      className="relative scroll-mt-16 overflow-hidden bg-carbon-soft"
      id="work"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-[0.06em] top-[11%] select-none text-[clamp(9rem,28vw,32rem)] font-semibold leading-none tracking-[-0.09em] text-white/[0.014]"
      >
        WORK
      </span>

      <Container className="relative">
        <Divider className="mb-[clamp(4rem,8vw,8rem)]" />

        <ScrollReveal>
          <SectionHeader
            description={workSectionContent.introduction}
            eyebrow={workSectionContent.eyebrow}
            title={
              <>
                {workSectionContent.heading.lead}{" "}
                <span className="font-serif font-normal italic text-bone-soft">
                  {workSectionContent.heading.emphasis}
                </span>
              </>
            }
          />
        </ScrollReveal>

        <div className="mt-[clamp(5rem,10vw,10rem)]">
          <p className="mb-7 text-[0.62rem] uppercase tracking-[0.18em] text-muted">
            {workSectionContent.featuredLabel}
          </p>
          {featuredProjects.map((project, index) => (
            <ScrollReveal delay={Math.min(index * 70, 140)} key={project.slug}>
              <FeaturedProject index={index} project={project} />
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-[clamp(5rem,10vw,9rem)]">
          <ScrollReveal>
            <div className="flex items-center gap-5 border-b border-[var(--line)] pb-5">
              <p className="text-[0.62rem] uppercase tracking-[0.18em] text-muted">
                {workSectionContent.secondaryLabel}
              </p>
              <span aria-hidden="true" className="h-px flex-1 bg-[var(--line)]" />
              <span className="text-[0.6rem] text-muted-dark">
                {String(secondaryProjects.length).padStart(2, "0")}
              </span>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-3 lg:divide-x lg:divide-[var(--line)]">
            {secondaryProjects.map((project, index) => (
              <ScrollReveal delay={index * 60} key={project.slug}>
                <SecondaryProject
                  index={featuredProjects.length + index}
                  project={project}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>

        <div className="mt-[clamp(5rem,9vw,8rem)] flex items-center justify-between gap-5 border-t border-[var(--line)] pt-6 text-[0.62rem] uppercase tracking-[0.18em] text-muted-dark">
          <span>{workSectionContent.nextLabel}</span>
          <span aria-hidden="true" className="h-px flex-1 bg-[var(--line)]" />
          <span>05</span>
        </div>
      </Container>
    </Section>
  );
}

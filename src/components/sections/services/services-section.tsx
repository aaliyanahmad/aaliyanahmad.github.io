import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Divider } from "@/components/ui/divider";
import { Eyebrow } from "@/components/ui/eyebrow";
import { LinkButton } from "@/components/ui/link-button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { getServiceGroups, servicesSectionContent } from "@/data/services";

import { ServiceIndex } from "./service-index";

export function ServicesSection() {
  const groups = getServiceGroups();

  return (
    <Section
      className="services-section relative scroll-mt-16 overflow-clip bg-carbon"
      id="services"
    >
      <span
        aria-hidden="true"
        className="services-backdrop pointer-events-none absolute select-none"
      >
        CAPABILITY
      </span>

      <Container className="relative">
        <Divider className="mb-[clamp(4rem,8vw,8rem)]" />

        <div className="grid gap-[clamp(4rem,8vw,8rem)] lg:grid-cols-[minmax(17rem,0.7fr)_minmax(0,1.3fr)] lg:items-start">
          <ScrollReveal className="lg:sticky lg:top-28 lg:self-start">
            <header>
              <Eyebrow>{servicesSectionContent.eyebrow}</Eyebrow>
              <h2 className="mt-7 max-w-xl text-[clamp(2.8rem,6vw,6.5rem)] font-medium leading-[0.88] tracking-[-0.065em] text-bone">
                {servicesSectionContent.heading.lead}{"\u00a0"}
                <span className="font-serif font-normal italic text-bone-soft">
                  {servicesSectionContent.heading.emphasis}
                </span>
              </h2>
              <p className="mt-8 max-w-lg text-pretty text-base leading-7 text-muted">
                {servicesSectionContent.introduction}
              </p>
              <p className="mt-6 max-w-md border-l border-copper pl-5 text-sm leading-6 text-muted-dark">
                {servicesSectionContent.availability}
              </p>
              <LinkButton className="mt-9" href="#contact" showArrow>
                {servicesSectionContent.primaryCta}
              </LinkButton>
            </header>
          </ScrollReveal>

          <ScrollReveal delay={90}>
            <ServiceIndex
              groups={groups}
              label={servicesSectionContent.indexLabel}
            />
          </ScrollReveal>
        </div>

        <div className="mt-[clamp(5rem,9vw,8rem)] flex items-center justify-between gap-5 border-t border-[var(--line)] pt-6 text-[0.62rem] uppercase tracking-[0.18em] text-muted-dark">
          <span>{servicesSectionContent.nextLabel}</span>
          <span aria-hidden="true" className="h-px flex-1 bg-[var(--line)]" />
          <span>09 / Contact</span>
        </div>
      </Container>
    </Section>
  );
}

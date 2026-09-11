import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Divider } from "@/components/ui/divider";
import { LinkButton } from "@/components/ui/link-button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { siteConfig, vectorLabs } from "@/data/site";
import { vectorLabsSectionContent } from "@/data/vector-labs";

import { CapabilityGrid } from "./capability-grid";
import { VectorLabsSystem } from "./vector-labs-system";

export function VectorLabsSection() {
  return (
    <Section
      className="vector-labs-section relative scroll-mt-16 overflow-hidden bg-carbon-soft"
      id="vector-labs"
    >
      <Container className="relative">
        <Divider className="mb-[clamp(4rem,8vw,8rem)]" />

        <ScrollReveal>
          <SectionHeader
            description={vectorLabsSectionContent.introduction}
            eyebrow={vectorLabsSectionContent.eyebrow}
            title={
              <>
                {vectorLabsSectionContent.heading.lead}{" "}
                <span className="font-serif font-normal italic text-bone-soft">
                  {vectorLabsSectionContent.heading.emphasis}
                </span>
              </>
            }
          />
        </ScrollReveal>

        <div className="mt-[clamp(4rem,9vw,8rem)] grid border-y border-[var(--line)] lg:grid-cols-[minmax(0,1.05fr)_minmax(22rem,0.95fr)]">
          <ScrollReveal className="min-w-0 lg:border-r lg:border-[var(--line)]">
            <div className="relative flex min-h-full flex-col overflow-hidden py-[clamp(2.5rem,6vw,5rem)] lg:pr-[clamp(2rem,5vw,5rem)]">
              <div className="flex items-center justify-between gap-5 text-[0.58rem] uppercase tracking-[0.18em] text-muted-dark">
                <span>{vectorLabs.status}</span>
                <span>Company / Product / Systems</span>
              </div>

              <h3 className="mt-[clamp(3rem,7vw,6rem)] text-[clamp(4rem,10vw,10rem)] font-semibold uppercase leading-[0.72] tracking-[-0.085em] text-bone">
                Vector
                <br />
                <span className="text-copper">Labs</span>
              </h3>

              <div className="mt-auto flex items-end justify-between gap-6 pt-[clamp(4rem,8vw,8rem)]">
                <div>
                  <p className="text-[0.55rem] uppercase tracking-[0.16em] text-muted-dark">
                    {vectorLabs.relationship}
                  </p>
                  <p className="mt-2 text-base font-medium text-bone-soft">
                    {siteConfig.name}
                  </p>
                </div>
                <span aria-hidden="true" className="size-3 rotate-45 border border-copper" />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <div className="flex min-h-full flex-col justify-center py-[clamp(2.5rem,6vw,5rem)] lg:pl-[clamp(2rem,5vw,5rem)]">
              <p className="text-[clamp(1.2rem,2.2vw,1.75rem)] leading-[1.45] tracking-[-0.02em] text-bone-soft">
                {vectorLabs.description}
              </p>
              <p className="mt-7 text-base leading-7 text-muted">
                {vectorLabs.portfolioContext}
              </p>

              <blockquote className="mt-10 border-l border-copper pl-6 text-[clamp(1.5rem,3vw,2.7rem)] font-medium uppercase leading-[1.04] tracking-[-0.045em] text-bone">
                {vectorLabs.principle}
              </blockquote>

              <div className="mt-10 flex flex-wrap gap-3">
                {vectorLabs.url ? (
                  <LinkButton
                    aria-label={`${vectorLabsSectionContent.companyCta} (opens in a new tab)`}
                    external
                    href={vectorLabs.url}
                  >
                    {vectorLabsSectionContent.companyCta}
                  </LinkButton>
                ) : null}
                <LinkButton href="#contact" showArrow variant={vectorLabs.url ? "secondary" : "primary"}>
                  {vectorLabsSectionContent.contactCta}
                </LinkButton>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal className="mt-[clamp(4rem,8vw,7rem)]">
          <p className="mb-5 text-[0.6rem] uppercase tracking-[0.18em] text-muted-dark">
            {vectorLabsSectionContent.connectionLabel}
          </p>
          <div className="grid items-stretch border border-[var(--line)] bg-carbon/55 md:grid-cols-[1fr_minmax(12rem,0.8fr)_1fr]">
            <div className="p-6 md:p-8">
              <p className="text-[0.55rem] uppercase tracking-[0.15em] text-muted-dark">
                Individual
              </p>
              <p className="mt-3 text-xl font-medium tracking-[-0.03em] text-bone">
                {siteConfig.name}
              </p>
            </div>

            <div className="relative flex min-h-24 items-center justify-center border-y border-[var(--line)] px-6 py-7 text-center md:border-x md:border-y-0">
              <span aria-hidden="true" className="absolute top-0 bottom-0 left-1/2 w-px bg-[var(--line)] md:top-1/2 md:right-0 md:bottom-auto md:left-0 md:h-px md:w-auto" />
              <span className="relative bg-carbon px-4 text-[0.52rem] uppercase leading-5 tracking-[0.14em] text-copper">
                Engineering / Product / Creation
              </span>
            </div>

            <div className="p-6 text-right md:p-8">
              <p className="text-[0.55rem] uppercase tracking-[0.15em] text-muted-dark">
                {vectorLabs.relationship}
              </p>
              <p className="mt-3 text-xl font-medium tracking-[-0.03em] text-bone">
                {vectorLabs.name}
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="mt-[clamp(4rem,8vw,7rem)] grid gap-[clamp(3rem,6vw,6rem)] xl:grid-cols-[minmax(0,1.15fr)_minmax(25rem,0.85fr)] xl:items-center">
          <ScrollReveal>
            <div>
              <div className="mb-6 flex items-center gap-5">
                <p className="text-[0.62rem] uppercase tracking-[0.18em] text-muted">
                  {vectorLabsSectionContent.capabilitiesLabel}
                </p>
                <span aria-hidden="true" className="h-px flex-1 bg-[var(--line)]" />
                <span className="text-[0.58rem] text-muted-dark">04</span>
              </div>
              <CapabilityGrid capabilities={vectorLabs.capabilities} />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <VectorLabsSystem
              capabilities={vectorLabs.capabilities}
              companyName={vectorLabs.name}
            />
          </ScrollReveal>
        </div>

        <div className="mt-[clamp(5rem,9vw,8rem)] flex items-center justify-between gap-5 border-t border-[var(--line)] pt-6 text-[0.62rem] uppercase tracking-[0.18em] text-muted-dark">
          <span>{vectorLabsSectionContent.nextLabel}</span>
          <span aria-hidden="true" className="h-px flex-1 bg-[var(--line)]" />
          <span>07</span>
        </div>
      </Container>
    </Section>
  );
}

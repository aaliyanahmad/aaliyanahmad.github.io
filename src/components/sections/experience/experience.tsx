import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Divider } from "@/components/ui/divider";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SectionHeader } from "@/components/ui/section-header";
import {
  experienceSectionContent,
  timelineEntries,
} from "@/data/timeline";

import { ExperienceTimeline } from "./experience-timeline";
import { TimelineItem } from "./timeline-item";

export function Experience() {
  return (
    <Section className="scroll-mt-16 bg-carbon" id="experience">
      <Container>
        <Divider className="mb-[clamp(4rem,8vw,8rem)]" />

        <ScrollReveal>
          <SectionHeader
            description={experienceSectionContent.introduction}
            eyebrow={experienceSectionContent.eyebrow}
            title={
              <>
                {experienceSectionContent.heading.lead}{" "}
                <span className="font-serif font-normal italic text-bone-soft">
                  {experienceSectionContent.heading.emphasis}
                </span>
              </>
            }
          />
        </ScrollReveal>

        <div className="mt-[clamp(5rem,10vw,10rem)] grid gap-14 lg:grid-cols-[minmax(13rem,0.35fr)_minmax(0,1fr)] lg:gap-[clamp(4rem,8vw,9rem)]">
          <ScrollReveal>
            <aside className="lg:sticky lg:top-28">
              <p className="text-[0.62rem] uppercase tracking-[0.18em] text-muted-dark">
                Trajectory
              </p>
              <p className="mt-4 text-[clamp(2rem,4vw,4rem)] font-medium leading-none tracking-[-0.05em] text-bone">
                {experienceSectionContent.range}
              </p>
              <div className="mt-8 h-px w-12 bg-copper" />
              <p className="mt-8 max-w-xs text-sm leading-7 text-muted">
                {experienceSectionContent.summary.map((line) => (
                  <span className="block" key={line}>
                    {line}
                  </span>
                ))}
              </p>
            </aside>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <ExperienceTimeline>
              {timelineEntries.map((entry, index) => (
                <TimelineItem entry={entry} index={index} key={entry.id} />
              ))}
            </ExperienceTimeline>
          </ScrollReveal>
        </div>

        <div className="mt-[clamp(1rem,3vw,3rem)] flex items-center justify-between gap-5 border-t border-[var(--line)] pt-6 text-[0.62rem] uppercase tracking-[0.18em] text-muted-dark">
          <span>{experienceSectionContent.nextLabel}</span>
          <span aria-hidden="true" className="h-px flex-1 bg-[var(--line)]" />
          <span>04</span>
        </div>
      </Container>
    </Section>
  );
}

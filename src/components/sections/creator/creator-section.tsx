import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Divider } from "@/components/ui/divider";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { creatorContent } from "@/data/creator";

import { AudienceCounter } from "./audience-counter";
import { BuildCommunicate } from "./build-communicate";
import { CreatorReelCard, featuredReels } from "./creator-reel-card";
import { SocialProfileList } from "./social-profile-list";

export function CreatorSection() {
  return (
    <Section
      className="creator-section relative scroll-mt-16 overflow-hidden"
      id="creator"
    >
      <span
        aria-hidden="true"
        className="creator-backdrop pointer-events-none absolute select-none font-serif italic"
      >
        STORY
      </span>

      <Container className="relative">
        <Divider className="mb-[clamp(4rem,8vw,8rem)]" />

        <ScrollReveal>
          <SectionHeader
            eyebrow={creatorContent.eyebrow}
            title={
              <>
                {creatorContent.heading.lead}{" "}
                <span className="font-serif font-normal italic text-copper">
                  {creatorContent.heading.emphasis}
                </span>
              </>
            }
          />
        </ScrollReveal>

        <div className="mt-[clamp(4rem,8vw,8rem)] grid border-y border-[var(--line)] lg:grid-cols-[minmax(0,0.95fr)_minmax(24rem,1.05fr)]">
          <ScrollReveal className="min-w-0 lg:border-r lg:border-[var(--line)]">
            <div className="flex h-full flex-col py-[clamp(2.5rem,6vw,5rem)] lg:pr-[clamp(2rem,5vw,5rem)]">
              <p className="text-[0.58rem] uppercase tracking-[0.18em] text-copper">
                {creatorContent.category}
              </p>
              <p className="mt-8 text-[clamp(3.4rem,8vw,8.5rem)] font-semibold uppercase leading-[0.78] tracking-[-0.075em] text-bone">
                {creatorContent.identity.split(" ").map((word, index) => (
                  <span className="block" key={`${word}-${index}`}>
                    {word}
                  </span>
                ))}
              </p>
              <p className="mt-8 max-w-md border-l border-copper pl-5 text-sm leading-6 text-muted">
                {creatorContent.identityLabel}
              </p>

              <div className="mt-[clamp(3rem,6vw,6rem)] space-y-6 text-pretty text-[clamp(1rem,1.5vw,1.2rem)] leading-[1.7] text-bone-soft">
                {creatorContent.narrative.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="creator-audience flex min-h-full flex-col justify-between py-[clamp(2.5rem,6vw,5rem)] lg:pl-[clamp(2rem,5vw,5rem)]">
              <div className="flex items-center justify-between gap-5 text-[0.58rem] uppercase tracking-[0.18em] text-muted-dark">
                <span>{creatorContent.audience.label}</span>
                <span>Instagram / TikTok</span>
              </div>

              <div className="py-[clamp(3.5rem,7vw,7rem)]">
                <p className="sr-only">
                  {creatorContent.audience.displayValue}{" "}
                  {creatorContent.audience.context}
                </p>
                <AudienceCounter
                  displayValue={creatorContent.audience.displayValue}
                  marketingCount={creatorContent.audience.marketingCount}
                />
                <p className="mt-5 max-w-sm text-sm uppercase leading-6 tracking-[0.16em] text-muted">
                  {creatorContent.audience.context}
                </p>
              </div>

              <p className="max-w-lg font-serif text-[clamp(1.5rem,3vw,2.75rem)] italic leading-[1.15] text-bone-soft">
                Attention begins with clarity.
              </p>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal className="mt-[clamp(4rem,8vw,7rem)]">
          <SocialProfileList platforms={creatorContent.platforms} />
        </ScrollReveal>

        <ScrollReveal className="mt-[clamp(5rem,9vw,8rem)]">
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[var(--line)] pb-5">
              <div>
                <p className="text-[0.62rem] uppercase tracking-[0.18em] text-copper">
                  Signature Content & Themes
                </p>
                <h3 className="mt-2 text-[clamp(1.8rem,3.5vw,3rem)] font-medium tracking-tight text-bone">
                  Ideas communicated with clarity.
                </h3>
              </div>
              <p className="max-w-md text-sm text-muted">
                Selected video essays and breakdown topics from Ibn Ishfaq crossing millions of views across Instagram and TikTok.
              </p>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredReels.map((reel) => (
                <CreatorReelCard key={reel.id} reel={reel} />
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal className="mt-[clamp(4rem,8vw,7rem)]">
          <BuildCommunicate {...creatorContent.bridge} />
        </ScrollReveal>

        <div className="mt-[clamp(5rem,9vw,8rem)] flex items-center justify-between gap-5 border-t border-[var(--line)] pt-6 text-[0.62rem] uppercase tracking-[0.18em] text-muted-dark">
          <span>{creatorContent.nextLabel}</span>
          <span aria-hidden="true" className="h-px flex-1 bg-[var(--line)]" />
          <span>08</span>
        </div>
      </Container>
    </Section>
  );
}

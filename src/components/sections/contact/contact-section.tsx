import { Suspense } from "react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Divider } from "@/components/ui/divider";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { contactContent } from "@/data/contact";

import { ContactForm } from "./contact-form";

function ContactFormFallback() {
  return (
    <div
      aria-hidden="true"
      className="min-h-[42rem] border-y border-[var(--line)] bg-carbon/20"
    />
  );
}

export function ContactSection() {
  return (
    <Section
      className="contact-section relative scroll-mt-16 overflow-hidden"
      id="contact"
    >
      <span
        aria-hidden="true"
        className="contact-backdrop pointer-events-none absolute select-none font-serif italic"
      >
        BEGIN
      </span>

      <Container className="relative">
        <Divider className="mb-[clamp(4rem,8vw,8rem)]" />

        <div className="grid gap-[clamp(4rem,8vw,9rem)] xl:grid-cols-[minmax(18rem,0.8fr)_minmax(0,1.2fr)] xl:items-start">
          <ScrollReveal>
            <header>
              <Eyebrow>{contactContent.eyebrow}</Eyebrow>
              <h2 className="mt-7 max-w-2xl text-[clamp(3rem,7vw,7.5rem)] font-medium leading-[0.86] tracking-[-0.07em] text-bone">
                {contactContent.heading.lead}{" "}
                <span className="font-serif font-normal italic text-copper">
                  {contactContent.heading.emphasis}
                </span>
              </h2>
              <p className="mt-8 max-w-lg text-pretty text-[clamp(1.05rem,1.5vw,1.25rem)] leading-8 text-bone-soft">
                {contactContent.introduction}
              </p>
              <p className="mt-4 max-w-md text-sm leading-6 text-muted">
                {contactContent.context}
              </p>

              <dl className="mt-[clamp(3rem,7vw,6rem)] border-y border-[var(--line)]">
                <div className="py-5">
                  <dt className="text-[0.56rem] uppercase tracking-[0.18em] text-muted-dark">
                    {contactContent.directEmailLabel}
                  </dt>
                  <dd className="mt-2">
                    <a
                      className="group inline-flex max-w-full items-center gap-2 break-all text-base text-bone underline decoration-[var(--line-strong)] underline-offset-4 transition-colors hover:text-copper focus-visible:text-copper"
                      href={contactContent.emailHref}
                    >
                      {contactContent.email}
                      <span aria-hidden="true" className="interaction-arrow interaction-arrow--external">↗</span>
                    </a>
                  </dd>
                </div>
                <div className="grid grid-cols-2 border-t border-[var(--line)]">
                  <div className="py-5 pr-4">
                    <dt className="text-[0.56rem] uppercase tracking-[0.18em] text-muted-dark">
                      Based in
                    </dt>
                    <dd className="mt-2 text-sm text-bone-soft">{contactContent.location}</dd>
                  </div>
                  <div className="border-l border-[var(--line)] py-5 pl-4">
                    <dt className="text-[0.56rem] uppercase tracking-[0.18em] text-muted-dark">
                      Available for
                    </dt>
                    <dd className="mt-2 text-sm text-bone-soft">{contactContent.availability}</dd>
                  </div>
                </div>
              </dl>
            </header>
          </ScrollReveal>

          <ScrollReveal delay={90}>
            <Suspense fallback={<ContactFormFallback />}>
              <ContactForm
                email={contactContent.email}
                emailHref={contactContent.emailHref}
              />
            </Suspense>
          </ScrollReveal>
        </div>

        <div className="mt-[clamp(5rem,9vw,8rem)] flex items-center justify-between gap-5 border-t border-[var(--line)] pt-6 text-[0.62rem] uppercase tracking-[0.18em] text-muted-dark">
          <span>{contactContent.closingLabel}</span>
          <span aria-hidden="true" className="h-px flex-1 bg-[var(--line)]" />
          <span>Let’s build something useful.</span>
        </div>
      </Container>
    </Section>
  );
}

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Divider } from "@/components/ui/divider";
import { LinkButton } from "@/components/ui/link-button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { githubSectionContent } from "@/data/github";
import { getGitHubData } from "@/lib/github";

import { ContributionCalendar } from "./contribution-calendar";
import { RepositoryList } from "./repository-list";

export async function GitHubSection() {
  const { data } = await getGitHubData();
  const calendar = data.calendar;

  return (
    <Section
      className="relative scroll-mt-16 overflow-hidden bg-carbon"
      id="github"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-[0.04em] top-[8%] select-none text-[clamp(8rem,25vw,28rem)] font-semibold leading-none tracking-[-0.09em] text-white/[0.014]"
      >
        CODE
      </span>

      <Container className="relative">
        <Divider className="mb-[clamp(4rem,8vw,8rem)]" />

        <ScrollReveal>
          <SectionHeader
            description={githubSectionContent.introduction}
            eyebrow={githubSectionContent.eyebrow}
            title={
              <>
                {githubSectionContent.heading.lead}{" "}
                <span className="font-serif font-normal italic text-bone-soft">
                  {githubSectionContent.heading.emphasis}
                </span>
              </>
            }
          />
        </ScrollReveal>

        <ScrollReveal className="mt-[clamp(4rem,8vw,7rem)]">
          <div className="grid border-y border-[var(--line)] lg:grid-cols-[minmax(0,1fr)_minmax(19rem,0.55fr)]">
            <div className="py-8 lg:border-r lg:border-[var(--line)] lg:pr-10">
              <p className="text-[0.6rem] uppercase tracking-[0.18em] text-muted-dark">
                {githubSectionContent.sourceLabel}
              </p>
              <p className="mt-5 text-[clamp(1.8rem,4vw,3.8rem)] font-medium leading-none tracking-[-0.05em] text-bone">
                @{data.username}
              </p>
              {data.name ? (
                <p className="mt-3 text-sm text-muted">{data.name}</p>
              ) : null}

              <LinkButton
                aria-label={`${githubSectionContent.profileCta} for ${data.username} (opens in a new tab)`}
                className="mt-8"
                external
                href={data.profileUrl}
              >
                {githubSectionContent.profileCta}
              </LinkButton>
            </div>

            <dl className="grid grid-cols-2 lg:grid-cols-1 lg:pl-10">
              {calendar ? (
                <div className="col-span-2 border-b border-[var(--line)] py-8 lg:col-span-1">
                  <dt className="text-[0.58rem] uppercase tracking-[0.16em] text-muted-dark">
                    {githubSectionContent.totalLabel}
                  </dt>
                  <dd className="mt-3 break-all text-[clamp(3rem,7vw,6.5rem)] font-medium tabular-nums leading-[0.82] tracking-[-0.07em] text-bone">
                    {calendar.totalContributions.toLocaleString("en-US")}
                  </dd>
                </div>
              ) : (
                <div className="col-span-2 border-b border-[var(--line)] py-8 lg:col-span-1">
                  <dt className="text-[0.58rem] uppercase tracking-[0.16em] text-muted-dark">
                    {githubSectionContent.activityLabel}
                  </dt>
                  <dd className="mt-3 text-sm text-muted">Public activity</dd>
                </div>
              )}

              {data.publicRepositoryCount !== null ? (
                <div className="border-r border-[var(--line)] py-6 pr-4 lg:border-b lg:border-r-0 lg:pr-0">
                  <dt className="text-[0.55rem] uppercase tracking-[0.14em] text-muted-dark">
                    Public repositories
                  </dt>
                  <dd className="mt-2 text-2xl font-medium tabular-nums text-bone-soft">
                    {data.publicRepositoryCount.toLocaleString("en-US")}
                  </dd>
                </div>
              ) : null}

              {data.followers !== null ? (
                <div className="py-6 pl-4 lg:pl-0">
                  <dt className="text-[0.55rem] uppercase tracking-[0.14em] text-muted-dark">
                    Followers
                  </dt>
                  <dd className="mt-2 text-2xl font-medium tabular-nums text-bone-soft">
                    {data.followers.toLocaleString("en-US")}
                  </dd>
                </div>
              ) : null}
            </dl>
          </div>
        </ScrollReveal>

        <ScrollReveal className="mt-[clamp(3rem,6vw,5rem)]">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[0.62rem] uppercase tracking-[0.18em] text-muted">
                {githubSectionContent.activityLabel}
              </p>
              <p className="mt-2 text-xs text-muted-dark">
                Recent public GitHub activity. Scroll horizontally on smaller screens.
              </p>
            </div>
            <span className="text-[0.58rem] uppercase tracking-[0.14em] text-muted-dark">
              Six-hour refresh
            </span>
          </div>
          <ContributionCalendar
            calendar={calendar}
            fallbackMessage={githubSectionContent.unavailableMessage}
            profileUrl={data.profileUrl}
          />
        </ScrollReveal>

        <ScrollReveal className="mt-[clamp(4rem,8vw,7rem)]">
          <div className="mb-6 flex items-center gap-5">
            <p className="text-[0.62rem] uppercase tracking-[0.18em] text-muted">
              {githubSectionContent.repositoriesLabel}
            </p>
            <span aria-hidden="true" className="h-px flex-1 bg-[var(--line)]" />
            <span className="text-[0.58rem] tabular-nums text-muted-dark">
              {String(data.repositories.length).padStart(2, "0")}
            </span>
          </div>
          <RepositoryList repositories={data.repositories} />
        </ScrollReveal>

        <div className="mt-[clamp(5rem,9vw,8rem)] flex items-center justify-between gap-5 border-t border-[var(--line)] pt-6 text-[0.62rem] uppercase tracking-[0.18em] text-muted-dark">
          <span>{githubSectionContent.nextLabel}</span>
          <span aria-hidden="true" className="h-px flex-1 bg-[var(--line)]" />
          <span>06</span>
        </div>
      </Container>
    </Section>
  );
}

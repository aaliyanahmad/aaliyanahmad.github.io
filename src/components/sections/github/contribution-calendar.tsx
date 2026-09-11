import type { CSSProperties } from "react";

import type {
  ContributionCalendar as ContributionCalendarData,
  ContributionDay,
  ContributionMonth,
} from "@/types/github";

type ContributionCalendarProps = {
  calendar: ContributionCalendarData | null;
  fallbackMessage: string;
  profileUrl: string;
};

const levelClasses = [
  "contribution-level-0",
  "contribution-level-1",
  "contribution-level-2",
  "contribution-level-3",
  "contribution-level-4",
] as const;

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "long",
  timeZone: "UTC",
  year: "numeric",
});

function toDate(date: string) {
  return new Date(`${date}T00:00:00Z`);
}

function formatDate(date: string) {
  return dateFormatter.format(toDate(date));
}

function contributionTitle(day: ContributionDay) {
  const unit = day.contributionCount === 1 ? "contribution" : "contributions";
  return `${formatDate(day.date)} — ${day.contributionCount} ${unit}`;
}

function monthColumn(
  month: ContributionMonth,
  calendar: ContributionCalendarData,
) {
  const firstDate = calendar.weeks.at(0)?.contributionDays.at(0)?.date;
  if (!firstDate) return 1;

  const millisecondsPerWeek = 7 * 24 * 60 * 60 * 1_000;
  const difference = toDate(month.firstDay).getTime() - toDate(firstDate).getTime();

  return Math.max(
    1,
    Math.min(calendar.weeks.length, Math.floor(difference / millisecondsPerWeek) + 1),
  );
}

function CalendarFallback({
  fallbackMessage,
  profileUrl,
}: Pick<ContributionCalendarProps, "fallbackMessage" | "profileUrl">) {
  return (
    <div className="github-calendar-fallback relative grid min-h-52 place-items-center overflow-hidden border border-[var(--line)] bg-surface px-6 py-12 text-center">
      <div className="relative max-w-sm">
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-copper">
          Public activity
        </p>
        <p className="mt-4 text-lg text-bone-soft">{fallbackMessage}</p>
        <a
          aria-label="View Aaliyan Ahmad's GitHub profile (opens in a new tab)"
          className="group mt-5 inline-flex min-h-11 items-center gap-2 border-b border-[var(--line-strong)] text-xs font-semibold uppercase tracking-[0.12em] text-bone transition-colors hover:border-copper hover:text-copper focus-visible:border-copper focus-visible:text-copper"
          href={profileUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          View GitHub
          <span aria-hidden="true" className="interaction-arrow interaction-arrow--external">↗</span>
        </a>
      </div>
    </div>
  );
}

export function ContributionCalendar({
  calendar,
  fallbackMessage,
  profileUrl,
}: ContributionCalendarProps) {
  if (!calendar || calendar.weeks.length === 0) {
    return (
      <CalendarFallback
        fallbackMessage={fallbackMessage}
        profileUrl={profileUrl}
      />
    );
  }

  const firstDay = calendar.weeks.at(0)?.contributionDays.at(0);
  const lastDay = calendar.weeks.at(-1)?.contributionDays.at(-1);
  const summary = `${calendar.totalContributions.toLocaleString("en-US")} contributions from ${firstDay ? formatDate(firstDay.date) : "the start of the period"} through ${lastDay ? formatDate(lastDay.date) : "the end of the period"}. The visual calendar uses five intensity levels, from no contributions to the highest activity days.`;

  return (
    <figure
      aria-labelledby="github-calendar-caption"
      className="github-calendar-figure border border-[var(--line)] bg-surface"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] px-5 py-4 text-[0.58rem] uppercase tracking-[0.16em] text-muted-dark sm:px-7">
        <span>Public contribution calendar</span>
        <span>{calendar.weeks.length} weeks / cached</span>
      </div>

      <div
        aria-describedby="github-calendar-caption"
        aria-label="Scrollable GitHub contribution calendar"
        className="github-calendar-scroll overflow-x-auto px-5 py-7 sm:px-7"
        role="region"
        tabIndex={0}
      >
        <div className="w-max min-w-[44rem]">
          <div
            className="ml-8 grid grid-cols-[repeat(var(--calendar-weeks),0.68rem)] gap-[0.2rem] text-[0.54rem] uppercase tracking-[0.08em] text-muted-dark"
            style={{ "--calendar-weeks": calendar.weeks.length } as CSSProperties}
          >
            {calendar.months.map((month) => {
              const start = monthColumn(month, calendar);
              const span = Math.min(
                month.totalWeeks,
                calendar.weeks.length - start + 1,
              );

              return (
                <span
                  className="truncate"
                  key={`${month.firstDay}-${month.name}`}
                  style={{ gridColumn: `${start} / span ${Math.max(1, span)}` }}
                >
                  {month.name.slice(0, 3)}
                </span>
              );
            })}
          </div>

          <div className="mt-3 flex gap-3">
            <div
              aria-hidden="true"
              className="grid w-5 shrink-0 grid-rows-7 gap-[0.2rem] text-[0.5rem] leading-[0.68rem] text-muted-dark"
            >
              <span className="col-start-1 row-start-2">M</span>
              <span className="col-start-1 row-start-4">W</span>
              <span className="col-start-1 row-start-6">F</span>
            </div>

            <div aria-hidden="true" className="flex gap-[0.2rem]">
              {calendar.weeks.map((week, weekIndex) => (
                <div
                  className="grid grid-rows-7 gap-[0.2rem]"
                  key={week.contributionDays.at(0)?.date ?? weekIndex}
                >
                  {week.contributionDays.map((day) => (
                    <span
                      className={`size-[0.68rem] rounded-[2px] ${levelClasses[day.level]}`}
                      key={day.date}
                      style={{ gridRow: day.weekday + 1 }}
                      title={contributionTitle(day)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div
            aria-hidden="true"
            className="mt-5 flex items-center justify-end gap-2 text-[0.54rem] uppercase tracking-[0.12em] text-muted-dark"
          >
            <span>Less</span>
            {levelClasses.map((levelClass) => (
              <span
                className={`size-[0.68rem] rounded-[2px] ${levelClass}`}
                key={levelClass}
              />
            ))}
            <span>More</span>
          </div>
        </div>
      </div>

      <figcaption
        className="border-t border-[var(--line)] px-5 py-4 text-xs leading-5 text-muted sm:px-7"
        id="github-calendar-caption"
      >
        {summary}
      </figcaption>
    </figure>
  );
}

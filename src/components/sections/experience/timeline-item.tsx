import type { TimelineEntry as TimelineEntryData } from "@/types/portfolio";

type TimelineItemProps = {
  entry: TimelineEntryData;
  index: number;
};

export function TimelineItem({ entry, index }: TimelineItemProps) {
  return (
    <li
      className="timeline-entry relative grid pb-[clamp(4.5rem,9vw,8rem)] pl-9 last:pb-0 md:grid-cols-[9.5rem_2.5rem_minmax(0,1fr)] md:pl-0"
      data-active={index === 0 ? "true" : "false"}
      data-timeline-entry
    >
      <div className="mb-5 md:mb-0 md:pr-7 md:text-right">
        {entry.dateTime ? (
          <time
            className="timeline-date text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-muted"
            dateTime={entry.dateTime}
          >
            {entry.displayDate}
          </time>
        ) : (
          <p className="timeline-date text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-muted">
            {entry.displayDate}
          </p>
        )}
      </div>

      <span
        aria-hidden="true"
        className="timeline-marker absolute left-0 top-[0.15rem] grid size-[0.7rem] place-items-center border border-[var(--line-strong)] bg-carbon md:static md:mx-auto"
      >
        <span className="size-1 bg-muted-dark transition-colors duration-[var(--motion-normal)]" />
      </span>

      <article className="timeline-content border-t border-[var(--line)] pt-5 transition-[opacity,transform] duration-[var(--motion-slow)] ease-[var(--ease-emphasized)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-copper">
            {entry.type}
          </p>
          <p className="text-[0.62rem] uppercase tracking-[0.16em] text-muted-dark">
            {String(index + 1).padStart(2, "0")} / 03
          </p>
        </div>

        <h3 className="mt-8 max-w-3xl text-[clamp(1.9rem,4vw,4.25rem)] font-medium leading-[0.98] tracking-[-0.05em] text-bone">
          {entry.role}
        </h3>
        <p className="mt-3 font-serif text-[clamp(1.25rem,2.2vw,2rem)] italic leading-tight text-bone-soft">
          {entry.organization}
        </p>

        <p className="mt-7 max-w-2xl text-[clamp(1rem,1.2vw,1.12rem)] leading-7 text-muted">
          {entry.description}
        </p>

        {entry.context || entry.location ? (
          <dl className="mt-8 grid gap-5 border-t border-[var(--line)] pt-5 sm:grid-cols-2">
            {entry.context ? (
              <div>
                <dt className="text-[0.58rem] uppercase tracking-[0.16em] text-muted-dark">
                  Context
                </dt>
                <dd className="mt-2 text-sm text-bone-soft">{entry.context}</dd>
              </div>
            ) : null}
            {entry.location ? (
              <div>
                <dt className="text-[0.58rem] uppercase tracking-[0.16em] text-muted-dark">
                  Location
                </dt>
                <dd className="mt-2 text-sm text-bone-soft">{entry.location}</dd>
              </div>
            ) : null}
          </dl>
        ) : null}

        {entry.technologies && entry.technologies.length > 0 ? (
          <div className="mt-8 border-t border-[var(--line)] pt-5">
            <p className="text-[0.58rem] uppercase tracking-[0.16em] text-muted-dark">
              Stack
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-2 text-xs uppercase tracking-[0.12em] text-bone-soft">
              {entry.technologies.map((technology, technologyIndex) => (
                <li className="flex items-center gap-3" key={technology}>
                  {technologyIndex > 0 ? (
                    <span aria-hidden="true" className="text-muted-dark">
                      /
                    </span>
                  ) : null}
                  {technology}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {entry.reference ? (
          <p className="mt-8 border-t border-[var(--line)] pt-5 text-xs uppercase tracking-[0.14em] text-muted">
            <span className="text-muted-dark">{entry.reference.label}</span>
            <span aria-hidden="true" className="mx-3 text-copper">
              —
            </span>
            <span className="text-bone-soft">{entry.reference.title}</span>
          </p>
        ) : null}
      </article>
    </li>
  );
}

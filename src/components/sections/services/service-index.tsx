import type { Service, ServiceGroup } from "@/types/portfolio";

import { ServiceItem } from "./service-item";

type ResolvedServiceGroup = ServiceGroup & {
  readonly services: readonly Service[];
};

type ServiceIndexProps = {
  groups: readonly ResolvedServiceGroup[];
  label: string;
};

export function ServiceIndex({ groups, label }: ServiceIndexProps) {
  const serviceCount = groups.reduce(
    (total, group) => total + group.services.length,
    0,
  );

  return (
    <div>
      <div className="mb-5 flex items-center gap-5">
        <p className="text-[0.6rem] uppercase tracking-[0.18em] text-muted">
          {label}
        </p>
        <span aria-hidden="true" className="h-px flex-1 bg-[var(--line)]" />
        <span className="text-[0.58rem] tabular-nums text-muted-dark">
          {String(serviceCount).padStart(2, "0")}
        </span>
      </div>

      <div className="border-b border-[var(--line)]">
        {groups.map((group, groupIndex) => (
          <section
            aria-labelledby={`service-group-${group.id}`}
            className="service-group border-t border-[var(--line)]"
            key={group.id}
          >
            <header className="grid gap-3 py-5 sm:grid-cols-[3rem_1fr] sm:gap-6">
              <span className="text-[0.58rem] tabular-nums tracking-[0.16em] text-copper">
                {String(groupIndex + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                <h3
                  className="text-xs font-semibold uppercase tracking-[0.18em] text-bone-soft"
                  id={`service-group-${group.id}`}
                >
                  {group.title}
                </h3>
                <p className="max-w-md text-xs leading-5 text-muted-dark">
                  {group.description}
                </p>
              </div>
            </header>

            <ul className="border-t border-[var(--line)] sm:ml-[4.5rem]">
              {group.services.map((service) => (
                <li
                  className="border-b border-[var(--line)] last:border-b-0"
                  key={service.slug}
                >
                  <ServiceItem service={service} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

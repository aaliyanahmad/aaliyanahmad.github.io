import { getServicesBySlugs } from "@/data/services";
import type { CompanyCapability } from "@/types/portfolio";

type CapabilityGridProps = {
  capabilities: readonly CompanyCapability[];
};

export function CapabilityGrid({ capabilities }: CapabilityGridProps) {
  return (
    <ol className="grid border-t border-l border-[var(--line)] md:grid-cols-2">
      {capabilities.map((capability, index) => {
        const services = getServicesBySlugs(capability.serviceSlugs);

        return (
          <li
            className="capability-item group min-w-0 border-r border-b border-[var(--line)] bg-carbon-soft/45 p-[clamp(1.5rem,4vw,2.5rem)]"
            key={capability.id}
          >
            <article className="flex min-h-full flex-col">
              <header className="flex items-center justify-between gap-5">
                <span className="text-[0.62rem] font-semibold tracking-[0.16em] text-copper">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  aria-hidden="true"
                  className="capability-line h-px w-8 bg-[var(--line-strong)]"
                />
              </header>

              <h3 className="mt-8 text-[clamp(1.8rem,3vw,3rem)] font-medium uppercase leading-none tracking-[-0.045em] text-bone">
                {capability.label}
              </h3>
              <p className="mt-5 text-sm leading-6 text-muted">
                {capability.description}
              </p>

              <ul className="mt-auto flex flex-wrap gap-x-3 gap-y-2 pt-8 text-[0.56rem] uppercase tracking-[0.12em] text-muted-dark">
                {services.map((service) => (
                  <li className="flex items-center gap-2" key={service.slug}>
                    <span aria-hidden="true" className="size-1 bg-copper" />
                    {service.title}
                  </li>
                ))}
              </ul>
            </article>
          </li>
        );
      })}
    </ol>
  );
}

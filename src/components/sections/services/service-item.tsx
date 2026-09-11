import type { Service } from "@/types/portfolio";
import Link from "next/link";

type ServiceItemProps = {
  service: Service;
};

export function ServiceItem({ service }: ServiceItemProps) {
  const index = String(service.order ?? 0).padStart(2, "0");

  return (
    <article className="service-row relative">
      <Link
        aria-label={`Discuss ${service.title}`}
        className="service-row-link grid min-h-36 gap-y-4 py-6 md:grid-cols-[3rem_minmax(11rem,0.7fr)_minmax(15rem,1fr)_auto] md:items-start md:gap-x-6 md:py-8"
        href={`/?service=${service.slug}#contact`}
      >
        <span className="service-row-index text-[0.58rem] tabular-nums tracking-[0.16em] text-muted-dark">
          {index}
        </span>
        <h4 className="text-[clamp(1.35rem,2.5vw,2.25rem)] font-medium uppercase leading-[0.95] tracking-[-0.045em] text-bone">
          {service.title}
        </h4>
        <p className="max-w-xl text-sm leading-6 text-muted md:pr-4">
          {service.description}
        </p>
        <span
          aria-hidden="true"
          className="service-row-arrow interaction-arrow row-start-1 justify-self-end text-lg leading-none text-copper md:col-start-4"
        >
          →
        </span>
      </Link>
    </article>
  );
}

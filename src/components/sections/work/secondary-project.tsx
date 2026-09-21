import Image from "next/image";
import Link from "next/link";

import {
  getProjectCaseStudyHref,
  getProjectCategoryLabel,
} from "@/data/projects";
import { isExternalHref } from "@/lib/links";
import type { Project } from "@/types/portfolio";

type SecondaryProjectProps = {
  index: number;
  project: Project;
};

export function SecondaryProject({ index, project }: SecondaryProjectProps) {
  const caseStudyHref = getProjectCaseStudyHref(project);

  return (
    <article className="secondary-project group flex min-h-full flex-col border-t border-[var(--line)] py-6 lg:px-6">
      <header className="flex items-center justify-between gap-3 text-[0.6rem] uppercase tracking-[0.16em]">
        <span className="text-copper font-medium">{String(index + 1).padStart(2, "0")}</span>
        <span className="text-right text-muted-dark">
          {getProjectCategoryLabel(project)}
        </span>
      </header>

      {/* Visual Preview Thumbnail */}
      {project.coverImage ? (
        <Link
          aria-label={`View ${project.title} case study`}
          className="relative mt-5 block aspect-[16/10] overflow-hidden rounded border border-[var(--line)] bg-surface transition-all duration-300 group-hover:border-copper/40 group-hover:shadow-[0_8px_24px_rgba(184,121,82,0.1)]"
          href={caseStudyHref}
        >
          <Image
            alt={project.coverImageAlt ?? `${project.title} preview`}
            className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
            fill
            loading="lazy"
            sizes="(min-width: 1024px) 30vw, 100vw"
            src={project.coverImage}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-carbon/50 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-20" />
        </Link>
      ) : null}

      <div className="mt-6 flex flex-col flex-1">
        {project.role ? (
          <p className="text-[0.58rem] uppercase tracking-[0.14em] text-copper">
            {project.role}
          </p>
        ) : null}

        <h3 className="project-title mt-2 text-[clamp(1.6rem,2.4vw,2.5rem)] font-medium leading-[1.05] tracking-[-0.04em] text-bone transition-colors group-hover:text-copper">
          <Link href={caseStudyHref}>{project.title}</Link>
        </h3>
        <p className="mt-4 text-sm leading-6 text-muted">{project.description}</p>
      </div>

      <div className="mt-auto pt-7">
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <Link
            aria-label={`View the ${project.title} case study`}
            className="inline-flex min-h-11 items-center gap-2 border-b border-[var(--line-strong)] text-xs font-semibold text-bone transition-colors hover:border-copper hover:text-copper focus-visible:border-copper focus-visible:text-copper"
            href={caseStudyHref}
          >
            View Case Study
            <span aria-hidden="true" className="interaction-arrow">
              →
            </span>
          </Link>
          {project.links?.map((link) => {
            const external = isExternalHref(link.href);

            return (
              <a
                aria-label={`${link.label} for ${project.title}${external ? " (opens in a new tab)" : ""}`}
                className="inline-flex min-h-11 items-center gap-2 border-b border-[var(--line-strong)] text-xs font-semibold text-bone transition-colors hover:border-copper hover:text-copper focus-visible:border-copper focus-visible:text-copper"
                href={link.href}
                key={`${link.type}-${link.href}`}
                rel={external ? "noopener noreferrer" : undefined}
                target={external ? "_blank" : undefined}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={`interaction-arrow ${external ? "interaction-arrow--external" : ""}`}
                >
                  {external ? "↗" : "→"}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </article>
  );
}

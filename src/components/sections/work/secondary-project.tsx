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
  return (
    <article className="secondary-project group flex min-h-full flex-col border-t border-[var(--line)] py-6 lg:px-6">
      <header className="flex items-center justify-between gap-3 text-[0.6rem] uppercase tracking-[0.16em]">
        <span className="text-copper">{String(index + 1).padStart(2, "0")}</span>
        <span className="text-right text-muted-dark">
          {getProjectCategoryLabel(project)}
        </span>
      </header>

      <h3 className="project-title mt-10 text-[clamp(1.8rem,3vw,3rem)] font-medium leading-[0.98] tracking-[-0.05em] text-bone">
        {project.title}
      </h3>
      <p className="mt-5 text-sm leading-6 text-muted">{project.description}</p>

      <div className="mt-auto pt-8">
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <a
            aria-label={`View the ${project.title} case study`}
            className="inline-flex min-h-11 items-center gap-2 border-b border-[var(--line-strong)] text-xs font-semibold text-bone transition-colors hover:border-copper hover:text-copper focus-visible:border-copper focus-visible:text-copper"
            href={getProjectCaseStudyHref(project)}
          >
            View Case Study
            <span aria-hidden="true" className="interaction-arrow">
              →
            </span>
          </a>
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

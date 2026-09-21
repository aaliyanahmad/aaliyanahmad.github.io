import { LinkButton } from "@/components/ui/link-button";
import {
  getProjectCaseStudyHref,
  getProjectCategoryLabel,
} from "@/data/projects";
import { technologies } from "@/data/technologies";
import { isExternalHref } from "@/lib/links";
import type { Project } from "@/types/portfolio";

import { ProjectMedia } from "./project-media";

type FeaturedProjectProps = {
  index: number;
  project: Project;
};

export function FeaturedProject({ index, project }: FeaturedProjectProps) {
  const reversed = index % 2 !== 0;
  const hasLiveLink = project.links?.some((link) => link.type === "live") ?? false;
  const visibleStatus =
    project.status === "live" && !hasLiveLink ? undefined : project.status;
  const technologyNames = project.technologies?.flatMap((technologyId) => {
    const technology = technologies.find((item) => item.id === technologyId);
    return technology ? [technology.name] : [];
  });

  return (
    <article className="project-feature border-t border-[var(--line)] py-[clamp(3.5rem,8vw,7rem)]">
      <header className="mb-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.62rem] uppercase tracking-[0.18em]">
        <span className="project-index text-copper transition-colors duration-[var(--motion-normal)]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="text-muted">{getProjectCategoryLabel(project)}</span>
        {visibleStatus ? (
          <span className="ml-auto flex items-center gap-2 text-muted-dark">
            <span aria-hidden="true" className="size-1 bg-copper" />
            {visibleStatus}
          </span>
        ) : null}
      </header>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)] lg:items-center lg:gap-[clamp(3rem,7vw,8rem)]">
        <div className={reversed ? "lg:order-1" : "lg:order-2"}>
          <h3 className="project-title text-[clamp(2.8rem,6vw,7rem)] font-medium leading-[0.88] tracking-[-0.065em] text-bone">
            {project.title}
          </h3>
          <p className="mt-7 max-w-xl text-[clamp(1rem,1.35vw,1.2rem)] leading-7 text-muted">
            {project.description}
          </p>

          {project.role ? (
            <dl className="mt-8 border-t border-[var(--line)] pt-5">
              <dt className="text-[0.58rem] uppercase tracking-[0.16em] text-muted-dark">
                Role
              </dt>
              <dd className="mt-2 text-sm leading-6 text-bone-soft">{project.role}</dd>
            </dl>
          ) : null}

          {technologyNames && technologyNames.length > 0 ? (
            <div className="mt-7 border-t border-[var(--line)] pt-5">
              <p className="text-[0.58rem] uppercase tracking-[0.16em] text-muted-dark">
                Stack
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {technologyNames.map((name) => (
                  <span
                    className="rounded border border-[var(--line-strong)] bg-surface px-2.5 py-1 text-[0.68rem] tracking-wide text-bone-soft"
                    key={name}
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton
              aria-label={`View the ${project.title} case study`}
              href={getProjectCaseStudyHref(project)}
            >
              View Case Study
            </LinkButton>
            {project.links?.map((link) => {
              const external = isExternalHref(link.href);

              return (
                <LinkButton
                  aria-label={`${link.label} for ${project.title}${external ? " (opens in a new tab)" : ""}`}
                  external={external}
                  href={link.href}
                  key={`${link.type}-${link.href}`}
                  variant="secondary"
                >
                  {link.label}
                </LinkButton>
              );
            })}
          </div>
        </div>

        <div className={reversed ? "lg:order-2" : "lg:order-1"}>
          <ProjectMedia project={project} />
        </div>
      </div>
    </article>
  );
}

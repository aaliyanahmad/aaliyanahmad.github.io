import Image from "next/image";

import { getProjectCategoryLabel } from "@/data/projects";
import type { Project } from "@/types/portfolio";

type ProjectMediaProps = {
  project: Project;
};

function PlaceholderComposition({ project }: ProjectMediaProps) {
  const labels = project.visual?.labels ?? [];

  if (project.visual?.variant === "marketplace") {
    return (
      <div className="grid h-full grid-cols-[1fr_auto_1fr] items-center gap-3 px-[8%]">
        <div className="border border-[var(--line-strong)] bg-carbon/55 px-3 py-10 text-center text-[0.62rem] uppercase tracking-[0.18em] text-bone-soft sm:py-14">
          {labels[0]}
        </div>
        <span className="font-serif text-2xl italic text-copper">↔</span>
        <div className="border border-[var(--line-strong)] bg-carbon/55 px-3 py-10 text-center text-[0.62rem] uppercase tracking-[0.18em] text-bone-soft sm:py-14">
          {labels[1]}
        </div>
      </div>
    );
  }

  if (project.visual?.variant === "platform") {
    return (
      <div className="relative h-full">
        <span className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-copper bg-carbon" />
        {labels.map((label, index) => {
          const positions = [
            "left-[8%] top-[18%]",
            "right-[7%] top-[28%]",
            "bottom-[16%] left-[24%]",
          ];

          return (
            <div
              className={`absolute border border-[var(--line-strong)] bg-carbon/65 px-3 py-3 text-[0.55rem] uppercase tracking-[0.15em] text-bone-soft ${positions[index] ?? "bottom-[12%] right-[8%]"}`}
              key={label}
            >
              {label}
            </div>
          );
        })}
        <span className="absolute left-[12%] right-1/2 top-[22%] h-px origin-right rotate-[20deg] bg-[var(--line-strong)]" />
        <span className="absolute left-1/2 right-[11%] top-[39%] h-px origin-left -rotate-[13deg] bg-[var(--line-strong)]" />
        <span className="absolute bottom-[27%] left-[31%] right-1/2 h-px origin-right -rotate-[48deg] bg-[var(--line-strong)]" />
      </div>
    );
  }

  return (
    <div className="grid h-full place-items-center px-[12%] py-[8%]">
      <div className="relative h-full w-[58%] border border-[var(--line-strong)] bg-carbon/70 p-[10%] shadow-[1.5rem_1.5rem_0_rgba(255,255,255,0.025)]">
        <span className="block h-px w-1/3 bg-copper" />
        <span className="mt-[18%] block h-px w-full bg-[var(--line-strong)]" />
        <span className="mt-[12%] block h-px w-4/5 bg-[var(--line)]" />
        <span className="mt-[12%] block h-px w-full bg-[var(--line)]" />
        <span className="absolute bottom-[10%] right-[10%] text-[0.5rem] uppercase tracking-[0.16em] text-muted">
          {labels[0] ?? project.title}
        </span>
      </div>
    </div>
  );
}

export function ProjectMedia({ project }: ProjectMediaProps) {
  const mediaSources = [
    ...(project.coverImage ? [project.coverImage] : []),
    ...(project.screenshots ?? []),
    ...(project.mobileImages ?? []),
  ];
  const mediaSource = mediaSources[0];

  return (
    <figure className={`project-media overflow-hidden border border-[var(--line-strong)] bg-surface ${mediaSource ? "project-media--image" : "project-media--placeholder"}`}>
      <div className="flex h-9 items-center justify-between border-b border-[var(--line)] px-3 text-[0.52rem] uppercase tracking-[0.16em] text-muted-dark">
        <span className="flex items-center gap-2">
          <span className="size-1 bg-muted-dark" />
          Project preview
        </span>
        <span className="max-w-[55%] truncate">{project.title}</span>
      </div>

      <div className="project-media-stage project-media-grid relative aspect-[16/11] overflow-hidden transition-transform duration-[var(--motion-slow)] ease-[var(--ease-emphasized)]">
        {mediaSource ? (
          <Image
            alt={
              project.coverImageAlt ??
              `${project.title} project interface preview`
            }
            className="object-cover"
            fill
            loading="lazy"
            sizes="(min-width: 1280px) 52vw, (min-width: 768px) 82vw, 100vw"
            src={mediaSource}
          />
        ) : (
          <div
            aria-label={`Technical diagram representing ${project.title}`}
            className="absolute inset-0"
            role="img"
          >
            <div aria-hidden="true" className="h-full">
              <PlaceholderComposition project={project} />
            </div>
          </div>
        )}
      </div>

      <figcaption className="flex items-center justify-between gap-4 border-t border-[var(--line)] px-3 py-3 text-[0.55rem] uppercase tracking-[0.16em] text-muted">
        <span>{getProjectCategoryLabel(project)}</span>
        <span>
          Media / {mediaSources.length > 0 ? `01 of ${String(mediaSources.length).padStart(2, "0")}` : "01"}
        </span>
      </figcaption>
    </figure>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { Header } from "@/components/layout/header";
import { JsonLd } from "@/components/seo/json-ld";
import { ProjectMedia } from "@/components/sections/work/project-media";
import { LinkButton } from "@/components/ui/link-button";
import {
  getOrderedProjects,
  getProjectBySlug,
  getProjectCaseStudyHref,
  getProjectCategoryLabel,
  projects,
} from "@/data/projects";
import { siteConfig } from "@/data/site";
import { isExternalHref } from "@/lib/links";
import {
  absoluteUrl,
  getProjectSeoDescription,
  getProjectSeoTitle,
  socialImage,
  withSiteName,
} from "@/lib/seo";
import type { Project } from "@/types/portfolio";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

type TextSectionProps = {
  label: string;
  text: string;
};

type ListSectionProps = {
  items: readonly string[];
  label: string;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
      robots: { index: false, follow: false },
    };
  }

  const title = getProjectSeoTitle(project);
  const description = getProjectSeoDescription(project);
  const canonicalUrl = absoluteUrl(getProjectCaseStudyHref(project));
  const socialImageUrl = absoluteUrl(socialImage.path);

  return {
    title,
    description,
    ...(canonicalUrl ? { alternates: { canonical: canonicalUrl } } : {}),
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: "en_US",
      title: withSiteName(title),
      description,
      ...(canonicalUrl ? { url: canonicalUrl } : {}),
      ...(socialImageUrl
        ? {
            images: [
              {
                url: socialImageUrl,
                width: socialImage.width,
                height: socialImage.height,
                alt: socialImage.alt,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: withSiteName(title),
      description,
      ...(socialImageUrl ? { images: [socialImageUrl] } : {}),
    },
  };
}

function TextSection({ label, text }: TextSectionProps) {
  return (
    <section className="border-t border-[var(--line)] pt-8">
      <h2 className="text-[0.62rem] uppercase tracking-[0.18em] text-copper">
        {label}
      </h2>
      <p className="mt-5 max-w-3xl text-[clamp(1.05rem,1.4vw,1.25rem)] leading-8 text-bone-soft">
        {text}
      </p>
    </section>
  );
}

function ListSection({ items, label }: ListSectionProps) {
  if (items.length === 0) return null;

  return (
    <section className="border-t border-[var(--line)] pt-8">
      <h2 className="text-[0.62rem] uppercase tracking-[0.18em] text-copper">
        {label}
      </h2>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {items.map((item, index) => (
          <li
            className="flex items-start gap-4 border-t border-[var(--line)] pt-4 text-sm leading-6 text-bone-soft"
            key={item}
          >
            <span className="text-[0.58rem] tabular-nums tracking-[0.14em] text-muted-dark">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function getNextProject(project: Project) {
  const orderedProjects = getOrderedProjects();
  const currentIndex = orderedProjects.findIndex(
    (candidate) => candidate.slug === project.slug,
  );
  const nextProject = orderedProjects[(currentIndex + 1) % orderedProjects.length];

  if (!nextProject) {
    throw new Error("Project navigation requires at least one project.");
  }

  return nextProject;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const caseStudy = project.caseStudy;
  const overview = caseStudy?.overview ?? project.description;
  const responsibilities =
    project.responsibilities ?? caseStudy?.responsibilities ?? [];
  const nextProject = getNextProject(project);
  const canonicalUrl = absoluteUrl(getProjectCaseStudyHref(project));
  const homepageUrl = absoluteUrl("/");
  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${project.title} case study`,
    description: getProjectSeoDescription(project),
    ...(canonicalUrl ? { url: canonicalUrl, mainEntityOfPage: canonicalUrl } : {}),
    author: {
      "@type": "Person",
      name: siteConfig.name,
      ...(homepageUrl ? { url: homepageUrl } : {}),
    },
    about: {
      "@type": "Thing",
      name: project.title,
      description: project.description,
    },
    genre: getProjectCategoryLabel(project),
    inLanguage: "en",
  };

  return (
    <>
      <JsonLd data={projectSchema} />
      <Header />
      <main className="case-study-main bg-carbon">
        <article>
          <header className="border-b border-[var(--line)] py-[clamp(4rem,9vw,8rem)]">
            <Container>
              <Link
                className="group inline-flex min-h-11 items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted transition-colors hover:text-bone focus-visible:text-bone"
                href="/#work"
              >
                <span aria-hidden="true" className="interaction-arrow">←</span>
                Back to selected work
              </Link>

              <div className="mt-[clamp(3rem,7vw,6rem)] grid gap-10 xl:grid-cols-[minmax(0,1.15fr)_minmax(19rem,0.45fr)] xl:items-end">
                <div>
                  <div className="flex flex-wrap items-center gap-4 text-[0.62rem] uppercase tracking-[0.18em] text-muted">
                    <span className="text-copper">
                      {getProjectCategoryLabel(project)}
                    </span>
                    {project.status ? <span>{project.status}</span> : null}
                  </div>
                  <h1 className="mt-7 max-w-[12ch] [overflow-wrap:anywhere] text-[clamp(3.2rem,9vw,9rem)] font-medium leading-[0.84] tracking-[-0.072em] text-bone">
                    {project.title}
                  </h1>
                </div>

                <div>
                  <p className="max-w-xl text-[clamp(1.05rem,1.5vw,1.3rem)] leading-8 text-bone-soft">
                    {project.description}
                  </p>
                  {project.links && project.links.length > 0 ? (
                    <div className="mt-8 flex flex-wrap gap-3">
                      {project.links.map((link) => {
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
                  ) : null}
                </div>
              </div>
            </Container>
          </header>

          <section className="py-[var(--section-space)]">
            <Container>
              <ProjectMedia project={project} />

              <div className="mt-[clamp(4rem,8vw,8rem)] grid gap-[clamp(3rem,7vw,7rem)] lg:grid-cols-[minmax(13rem,0.35fr)_minmax(0,1fr)]">
                <aside>
                  <dl className="border-y border-[var(--line)] text-sm">
                    <div className="py-5">
                      <dt className="text-[0.58rem] uppercase tracking-[0.16em] text-muted-dark">
                        Category
                      </dt>
                      <dd className="mt-2 text-bone-soft">
                        {getProjectCategoryLabel(project)}
                      </dd>
                    </div>
                    {project.role ? (
                      <div className="border-t border-[var(--line)] py-5">
                        <dt className="text-[0.58rem] uppercase tracking-[0.16em] text-muted-dark">
                          Role
                        </dt>
                        <dd className="mt-2 leading-6 text-bone-soft">
                          {project.role}
                        </dd>
                      </div>
                    ) : null}
                    <div className="border-t border-[var(--line)] py-5">
                      <dt className="text-[0.58rem] uppercase tracking-[0.16em] text-muted-dark">
                        Case-study depth
                      </dt>
                      <dd className="mt-2 capitalize text-bone-soft">
                        {caseStudy?.depth ?? "Overview"}
                      </dd>
                    </div>
                  </dl>
                </aside>

                <div className="space-y-[clamp(3rem,6vw,5rem)]">
                  <TextSection label="Overview" text={overview} />
                  {caseStudy?.context ? (
                    <TextSection label="Context" text={caseStudy.context} />
                  ) : null}
                  {caseStudy?.challenge ? (
                    <TextSection label="Challenge" text={caseStudy.challenge} />
                  ) : null}
                  {caseStudy?.solution ? (
                    <TextSection label="Solution" text={caseStudy.solution} />
                  ) : null}
                  <ListSection label="Responsibilities" items={responsibilities} />
                  <ListSection label="Features" items={caseStudy?.features ?? []} />
                  <ListSection label="Architecture" items={caseStudy?.architecture ?? []} />
                  <ListSection label="Outcomes" items={caseStudy?.outcomes ?? project.outcomes ?? []} />
                  <ListSection label="Learnings" items={caseStudy?.learnings ?? []} />
                  <ListSection label="Public notes" items={caseStudy?.constraints ?? []} />
                </div>
              </div>
            </Container>
          </section>

          <nav aria-label="Project navigation" className="border-t border-[var(--line)] bg-carbon-soft">
            <Container>
              <Link
                className="group grid min-h-48 items-center gap-5 py-10 sm:grid-cols-[1fr_auto]"
                href={getProjectCaseStudyHref(nextProject)}
              >
                <span>
                  <span className="block text-[0.62rem] uppercase tracking-[0.18em] text-muted-dark">
                    Next project
                  </span>
                  <span className="project-title mt-4 block text-[clamp(2rem,6vw,5rem)] font-medium leading-none tracking-[-0.055em] text-bone">
                    {nextProject.title}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="interaction-arrow justify-self-start text-3xl text-copper sm:justify-self-end"
                >
                  →
                </span>
              </Link>
            </Container>
          </nav>
        </article>
      </main>
    </>
  );
}

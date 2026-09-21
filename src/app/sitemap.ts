import type { MetadataRoute } from "next";

import { getOrderedProjects, getProjectCaseStudyHref } from "@/data/projects";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const homepageUrl = absoluteUrl("/");
  if (!homepageUrl) return [];

  const now = new Date();

  return [
    {
      url: homepageUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...getOrderedProjects().map((project) => ({
      url: absoluteUrl(getProjectCaseStudyHref(project)) as string,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: project.featured ? 0.8 : 0.6,
    })),
  ];
}

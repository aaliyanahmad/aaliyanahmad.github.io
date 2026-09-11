import type { MetadataRoute } from "next";

import { getOrderedProjects, getProjectCaseStudyHref } from "@/data/projects";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const homepageUrl = absoluteUrl("/");
  if (!homepageUrl) return [];

  return [
    { url: homepageUrl },
    ...getOrderedProjects().map((project) => ({
      url: absoluteUrl(getProjectCaseStudyHref(project)) as string,
    })),
  ];
}

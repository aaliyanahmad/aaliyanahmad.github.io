import { siteConfig } from "@/data/site";
import type { Project } from "@/types/portfolio";

const LOCAL_DEVELOPMENT_URL = "http://localhost:3000";
const SOCIAL_IMAGE_PATH = "/images/aaliyan-ahmad-social.png";

function normalizeOrigin(value: string | undefined) {
  const candidate = value?.trim();
  if (!candidate) return null;

  try {
    const withProtocol = /^https?:\/\//i.test(candidate)
      ? candidate
      : `https://${candidate}`;
    const url = new URL(withProtocol);

    if (url.protocol !== "https:" && url.hostname !== "localhost") return null;

    url.pathname = "/";
    url.search = "";
    url.hash = "";
    return url;
  } catch {
    return null;
  }
}

const configuredSiteUrl =
  normalizeOrigin(process.env.NEXT_PUBLIC_SITE_URL) ??
  normalizeOrigin(siteConfig.url);

export const defaultSeoTitle = siteConfig.metadata.title;
export const defaultSeoDescription = siteConfig.metadata.description;
export const socialImage = {
  alt: "Aaliyan Ahmad, Software Engineer, Founder and Creator",
  height: 630,
  path: SOCIAL_IMAGE_PATH,
  width: 1200,
} as const;

export function getSiteUrl() {
  return configuredSiteUrl;
}

export function getMetadataBase() {
  return (
    configuredSiteUrl ??
    (process.env.NODE_ENV === "development"
      ? new URL(LOCAL_DEVELOPMENT_URL)
      : undefined)
  );
}

export function absoluteUrl(pathname = "/") {
  if (!configuredSiteUrl) return null;
  return new URL(pathname.replace(/^\/+/, ""), configuredSiteUrl).toString();
}

export function isPreviewDeployment() {
  return process.env.VERCEL_ENV === "preview";
}

export function getProjectSeoTitle(project: Project) {
  return project.seoTitle ?? `${project.title} | Project Case Study`;
}

export function getProjectSeoDescription(project: Project) {
  return (
    project.seoDescription ??
    `Case study of ${project.title}, presented by ${siteConfig.name}. ${project.description}`
  );
}

export function withSiteName(title: string) {
  return title.endsWith(siteConfig.name)
    ? title
    : `${title} | ${siteConfig.name}`;
}

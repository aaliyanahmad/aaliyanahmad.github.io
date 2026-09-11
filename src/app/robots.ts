import type { MetadataRoute } from "next";

import { absoluteUrl, isPreviewDeployment } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  if (isPreviewDeployment()) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  const sitemapUrl = absoluteUrl("/sitemap.xml");
  const siteUrl = absoluteUrl("/");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    ...(sitemapUrl ? { sitemap: sitemapUrl } : {}),
    ...(siteUrl ? { host: siteUrl } : {}),
  };
}

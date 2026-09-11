import type { Metadata } from "next";
import { Inter_Tight, Newsreader } from "next/font/google";

import { siteConfig } from "@/data/site";
import { InteractionController } from "@/components/ui/interaction-controller";
import {
  absoluteUrl,
  defaultSeoDescription,
  defaultSeoTitle,
  getMetadataBase,
  isPreviewDeployment,
  socialImage,
} from "@/lib/seo";

import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  style: ["normal", "italic"],
});

const canonicalUrl = absoluteUrl("/");
const socialImageUrl = absoluteUrl(socialImage.path);
const previewDeployment = isPreviewDeployment();

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: defaultSeoTitle,
    template: `%s — ${siteConfig.name}`,
  },
  description: defaultSeoDescription,
  applicationName: siteConfig.name,
  authors: [
    {
      name: siteConfig.name,
      ...(canonicalUrl ? { url: canonicalUrl } : {}),
    },
  ],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "technology",
  keywords: [
    "Aaliyan Ahmad",
    "Ibn Ishfaq",
    "software engineer",
    "backend developer",
    "product builder",
    "Vector Labs",
    "Lahore",
  ],
  ...(canonicalUrl ? { alternates: { canonical: canonicalUrl } } : {}),
  robots: previewDeployment
    ? { index: false, follow: false, noarchive: true }
    : {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
    title: defaultSeoTitle,
    description: defaultSeoDescription,
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
    title: defaultSeoTitle,
    description: defaultSeoDescription,
    ...(socialImageUrl ? { images: [socialImageUrl] } : {}),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${interTight.variable} ${newsreader.variable}`}>
      <body>
        <InteractionController />
        {children}
      </body>
    </html>
  );
}

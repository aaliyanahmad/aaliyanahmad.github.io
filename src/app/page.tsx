import type { Metadata } from "next";

import { Header } from "@/components/layout/header";
import { JsonLd } from "@/components/seo/json-ld";
import { About } from "@/components/sections/about/about";
import { ContactSection } from "@/components/sections/contact/contact-section";
import { CreatorSection } from "@/components/sections/creator/creator-section";
import { Experience } from "@/components/sections/experience/experience";
import { GitHubSection } from "@/components/sections/github/github-section";
import { Hero } from "@/components/sections/hero/hero";
import { ServicesSection } from "@/components/sections/services/services-section";
import { VectorLabsSection } from "@/components/sections/vector-labs/vector-labs-section";
import { Work } from "@/components/sections/work/work";
import { siteConfig } from "@/data/site";
import { socialProfiles } from "@/data/socials";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  verification: {
    google: "jPQUdEqw1eSr5LGZ-JHsezWQwwccqmbs9lInbnXEDnY",
  },
};

export default function Home() {
  const homepageUrl = absoluteUrl("/");
  const personId = homepageUrl ? `${homepageUrl}#person` : undefined;
  const websiteId = homepageUrl ? `${homepageUrl}#website` : undefined;
  const profilePageId = homepageUrl ? `${homepageUrl}#profile-page` : undefined;
  const portraitUrl = absoluteUrl(siteConfig.portrait.src);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      ...(homepageUrl && profilePageId
        ? [
            {
              "@type": "ProfilePage",
              "@id": profilePageId,
              url: homepageUrl,
              name: siteConfig.metadata.title,
              description: siteConfig.metadata.description,
              mainEntity: personId
                ? { "@id": personId }
                : { "@type": "Person", name: siteConfig.name },
              ...(websiteId ? { isPartOf: { "@id": websiteId } } : {}),
              inLanguage: "en",
            },
          ]
        : []),
      {
        "@type": "Person",
        ...(personId ? { "@id": personId } : {}),
        name: siteConfig.name,
        alternateName: siteConfig.nickname,
        ...(homepageUrl ? { url: homepageUrl } : {}),
        description: siteConfig.metadata.description,
        ...(portraitUrl ? { image: portraitUrl } : {}),
        ...(profilePageId ? { mainEntityOfPage: { "@id": profilePageId } } : {}),
        jobTitle: siteConfig.professionalTitles[0],
        knowsAbout: [
          "Backend Engineering",
          "NestJS",
          "TypeScript",
          "PostgreSQL",
          "TypeORM",
          "Distributed Systems",
          "Next.js",
          "REST APIs",
          "Content Creation",
          "Audience Building",
        ],
        worksFor: [
          {
            "@type": "Organization",
            name: "Genetics Pharmaceuticals",
          },
          {
            "@type": "Organization",
            name: "ApkaMuaalij",
          },
        ],
        founder: {
          "@type": "Organization",
          name: "Vector Labs",
        },
        sameAs: socialProfiles.map((profile) => profile.url),
        address: {
          "@type": "PostalAddress",
          addressLocality: siteConfig.location.city,
          addressCountry: siteConfig.location.countryCode,
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Who is Aaliyan Ahmad?",
            acceptedAnswer: {
              "@type": "Answer",
              "text": "Aaliyan Ahmad, also known as Ibn Ishfaq, is a Software Engineer, Founder of Vector Labs, and Digital Creator based in Lahore, Pakistan. He specializes in backend systems (NestJS, PostgreSQL, TypeORM), APIs, and digital products.",
            },
          },
          {
            "@type": "Question",
            name: "What is Vector Labs?",
            acceptedAnswer: {
              "@type": "Answer",
              "text": "Vector Labs is the software and digital products company founded by Aaliyan Ahmad, uniting backend engineering, design, and commercial execution.",
            },
          },
          {
            "@type": "Question",
            name: "Who is Ibn Ishfaq?",
            acceptedAnswer: {
              "@type": "Answer",
              "text": "Ibn Ishfaq is the creator identity of Aaliyan Ahmad, communicating ideas on systems thinking, tech careers, and storytelling to an audience of over 140,000 followers across Instagram and TikTok.",
            },
          },
          {
            "@type": "Question",
            name: "What is Aaliyan Ahmad's role at ApkaMuaalij?",
            acceptedAnswer: {
              "@type": "Answer",
              "text": "Aaliyan Ahmad contributes as a Backend Engineer at ApkaMuaalij, developing and maintaining production backend systems, REST APIs, and database architectures supporting telemedicine and clinic booking.",
            },
          },
          {
            "@type": "Question",
            name: "What are Aaliyan Ahmad's featured software projects?",
            acceptedAnswer: {
              "@type": "Answer",
              "text": "Key projects include GetProof.tech (an online agreement platform), TaskConnect (a two-sided odd-jobs marketplace), high-performance enterprise dashboards and telemetry systems, and production backend platform work for ApkaMuaalij.",
            },
          },
        ],
      },
      ...(homepageUrl
        ? [
            {
              "@type": "WebSite",
              "@id": websiteId,
              name: siteConfig.name,
              alternateName: ["Aaliyan Ahmad Portfolio", "aaliyanahmad.tech"],
              url: homepageUrl,
              author: personId
                ? { "@id": personId }
                : { "@type": "Person", name: siteConfig.name },
              inLanguage: "en",
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <Work />
        <GitHubSection />
        <VectorLabsSection />
        <CreatorSection />
        <ServicesSection />
        <ContactSection />
      </main>
    </>
  );
}

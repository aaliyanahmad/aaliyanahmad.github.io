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
        sameAs: socialProfiles.map((profile) => profile.url),
        address: {
          "@type": "PostalAddress",
          addressLocality: siteConfig.location.city,
          addressCountry: siteConfig.location.countryCode,
        },
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

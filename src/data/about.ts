import { education } from "./education";
import { experiences } from "./experience";
import { siteConfig, vectorLabs } from "./site";
import { portfolioStats } from "./socials";

const currentExperience = experiences[0];
const computerScienceEducation = education[0];
const audienceStat = portfolioStats.find(
  (stat) => stat.id === "social-audience",
);

export const aboutContent = {
  eyebrow: "02 / About",
  heading: {
    lead: "More than one medium.",
    emphasis: "The same instinct to build.",
  },
  introduction:
    "Engineering, entrepreneurship and creation are not separate tracks here. They are connected ways of understanding people, shaping ideas and making useful things.",
  paragraphs: [
    `${siteConfig.name} is a software engineer and product builder based in ${siteConfig.location.label}. At ${currentExperience.company}, he works as an ${currentExperience.title} within ${currentExperience.context}, focused on backend development, databases and APIs. His ${computerScienceEducation.degree} at ${computerScienceEducation.institution} spans ${computerScienceEducation.years}.`,
    `His work continues beyond a single role: he builds products through ${vectorLabs.name}, the startup he founded, and creates under the name ${siteConfig.nickname} for a combined social audience of ${audienceStat?.value}. Engineering, entrepreneurship and storytelling share the same process: understand people, simplify complexity, build something useful and communicate it clearly.`,
  ],
  identityIntroduction: `${siteConfig.nickname} is the creator identity of ${siteConfig.name}, another expression of the same curiosity and product-minded approach.`,
  identities: [
    {
      id: "engineering",
      number: "01",
      name: siteConfig.name,
      label: "Engineering / Products",
      description: "Backend systems, digital products and practical problem solving.",
    },
    {
      id: "creation",
      number: "02",
      name: siteConfig.nickname,
      label: "Creation / Storytelling",
      description: "Ideas communicated through a distinct creator identity and audience.",
    },
  ],
  principle: {
    label: "Principle",
    text: "Different mediums. The same instinct to build.",
  },
  currentFocus: [
    "Building backend systems and APIs",
    "Developing digital products",
    `Building through ${vectorLabs.name}`,
    `Creating as ${siteConfig.nickname}`,
  ],
} as const;

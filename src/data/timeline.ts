import type { TimelineEntry } from "@/types/portfolio";

import { education } from "./education";
import { experiences } from "./experience";
import { projects } from "./projects";
import { vectorLabs } from "./site";
import { technologies } from "./technologies";

const currentExperience = experiences[0];
const computerScienceEducation = education[0];
const taskConnect = projects.find((project) => project.slug === "taskconnect");

const technologyNames = new Map(
  technologies.map((technology) => [technology.id, technology.name]),
);

const currentExperienceTechnologies = currentExperience.technologies.flatMap(
  (technologyId) => {
    const technologyName = technologyNames.get(technologyId);
    return technologyName ? [technologyName] : [];
  },
);

const experienceStart = new Intl.DateTimeFormat("en", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
}).format(new Date(`${currentExperience.startDate}T00:00:00Z`));

export const experienceSectionContent = {
  eyebrow: "03 / Experience",
  heading: {
    lead: "From learning systems",
    emphasis: "to building them.",
  },
  introduction:
    "A progression through computer science, production backend work and product building—grounded in the systems behind useful digital experiences.",
  range: "2022 — Now",
  summary: [
    "Learn the systems.",
    "Work on real ones.",
    "Then build your own.",
  ],
  nextLabel: "Next / Selected Work",
} as const;

export const timelineEntries = [
  {
    id: currentExperience.id,
    type: "work",
    displayDate: `${experienceStart} — Present`,
    dateTime: currentExperience.startDate,
    organization: currentExperience.company,
    role: currentExperience.title,
    context: currentExperience.context,
    location: currentExperience.location,
    description:
      "Working on backend systems, APIs, databases and digital-platform infrastructure within the company's Digital Transformation function.",
    technologies: currentExperienceTechnologies,
  },
  {
    id: "vector-labs-current-venture",
    type: "venture",
    displayDate: "Current Venture",
    organization: vectorLabs.name,
    role: vectorLabs.relationship,
    description:
      "Building and shaping software, digital products and client-facing technology work through Vector Labs.",
  },
  {
    id: computerScienceEducation.id,
    type: "education",
    displayDate: computerScienceEducation.years.replace("–", " — "),
    organization: computerScienceEducation.institution,
    role: computerScienceEducation.degree,
    location: computerScienceEducation.location,
    description:
      "Computer Science degree focused on the technical foundation that led into software engineering and product development.",
    ...(taskConnect
      ? {
          reference: {
            label: "Final Year Project",
            title: taskConnect.title,
          },
        }
      : {}),
  },
] as const satisfies readonly TimelineEntry[];

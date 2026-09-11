import type { Education } from "@/types/portfolio";

export const education = [
  {
    id: "bs-computer-science-university-of-lahore",
    degree: "BS Computer Science",
    institution: "The University of Lahore",
    years: "2022–2026",
    location: "Lahore, Pakistan",
  },
] as const satisfies readonly Education[];

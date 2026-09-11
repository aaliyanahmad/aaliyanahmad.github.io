import { siteConfig } from "./site";

export const budgetOptions = [
  "Not sure yet",
  "Under $500",
  "$500 – $1,500",
  "$1,500 – $3,000",
  "$3,000 – $5,000",
  "$5,000+",
  "Prefer to discuss",
] as const;

export const contactContent = {
  eyebrow: "09 / Contact",
  heading: {
    lead: "Have something worth",
    emphasis: "building?",
  },
  introduction:
    "Tell me what you’re building, where you’re stuck, or what you need help taking from idea to execution.",
  context: "For project inquiries, technical work and selected collaborations.",
  directEmailLabel: "Prefer email?",
  email: siteConfig.contact.email,
  emailHref: siteConfig.contact.emailHref,
  location: siteConfig.location.label,
  availability: "Selected projects / consulting",
  closingLabel: "End / 09",
} as const;

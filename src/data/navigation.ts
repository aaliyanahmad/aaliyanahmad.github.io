import type { NavigationItem } from "@/types/portfolio";

export const navigationItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "GitHub", href: "#github" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
] as const satisfies readonly NavigationItem[];

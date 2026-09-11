import { navigationItems } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { socialProfiles } from "@/data/socials";

import { HeaderClient } from "./header-client";

export function Header() {
  return (
    <HeaderClient
      location={siteConfig.location.label}
      name={siteConfig.name}
      navigationItems={navigationItems}
      socialProfiles={socialProfiles}
    />
  );
}

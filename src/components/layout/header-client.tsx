"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { usePathname } from "next/navigation";

import { Container } from "@/components/layout/container";
import { LinkButton } from "@/components/ui/link-button";
import type { NavigationItem, SocialProfile } from "@/types/portfolio";

type HeaderClientProps = {
  location: string;
  name: string;
  navigationItems: readonly NavigationItem[];
  socialProfiles: readonly SocialProfile[];
};

const MOBILE_MENU_ID = "mobile-navigation";

export function HeaderClient({
  location,
  name,
  navigationItems,
  socialProfiles,
}: HeaderClientProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState<NavigationItem["href"]>("#home");
  const menuRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const shouldRestoreFocusRef = useRef(true);

  const sectionItems = navigationItems.filter((item) => item.href !== "#home");
  const homeItem = navigationItems.find((item) => item.href === "#home");
  const contactItem = navigationItems.find((item) => item.href === "#contact");
  const resolveNavigationHref = (href: NavigationItem["href"]) =>
    pathname === "/" ? href : `/${href}`;

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 32);

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    if (pathname !== "/" || !("IntersectionObserver" in window)) return;

    const observedSections = Array.from(
      document.querySelectorAll<HTMLElement>("main > section[id]"),
      (section) => ({
        href: `#${section.id}` as NavigationItem["href"],
        section,
      }),
    );
    const visibleSections = new Map<Element, IntersectionObserverEntry>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visibleSections.set(entry.target, entry);
          else visibleSections.delete(entry.target);
        });

        const current = [...visibleSections.values()].sort(
          (first, second) =>
            Math.abs(first.boundingClientRect.top - window.innerHeight * 0.26) -
            Math.abs(second.boundingClientRect.top - window.innerHeight * 0.26),
        )[0];
        const match = observedSections.find(({ section }) => section === current?.target);

        if (match) setActiveHref(match.href);
      },
      { rootMargin: "-18% 0px -68% 0px", threshold: 0 },
    );

    observedSections.forEach(({ section }) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 80rem)");
    const closeAtDesktop = () => {
      if (desktopQuery.matches) setIsMenuOpen(false);
    };

    desktopQuery.addEventListener("change", closeAtDesktop);
    return () => desktopQuery.removeEventListener("change", closeAtDesktop);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const returnFocusTo = document.activeElement as HTMLElement | null;
    const focusTimer = window.setTimeout(() => {
      firstLinkRef.current?.focus();
    }, 0);

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        shouldRestoreFocusRef.current = true;
        setIsMenuOpen(false);
        return;
      }

      if (event.key !== "Tab" || !menuRef.current) return;

      const focusableElements = Array.from(
        menuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      const firstElement = focusableElements.at(0);
      const lastElement = focusableElements.at(-1);

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      if (shouldRestoreFocusRef.current) returnFocusTo?.focus();
    };
  }, [isMenuOpen]);

  const closeMenu = (restoreFocus: boolean) => {
    shouldRestoreFocusRef.current = restoreFocus;
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`site-header fixed inset-x-0 top-0 border-b ${
        isScrolled || isMenuOpen
          ? `border-[var(--line)] bg-carbon/90 ${
              isScrolled && !isMenuOpen ? "backdrop-blur-md" : ""
            }`
          : "border-transparent bg-transparent"
      }`}
      data-raised={isScrolled || isMenuOpen}
    >
      <Container className="header-bar flex h-[var(--header-height)] items-center justify-between gap-6">
        <a
          aria-label={`${name}, home`}
          className="group inline-flex items-center gap-3 font-semibold uppercase tracking-[0.14em]"
          href={pathname === "/" ? (homeItem?.href ?? "#home") : "/"}
        >
          <span className="grid size-8 place-items-center border border-[var(--line-strong)] text-[0.65rem] text-bone transition-colors group-hover:border-copper group-focus-visible:border-copper">
            {name
              .split(" ")
              .map((part) => part[0])
              .join("")}
          </span>
          <span className="hidden text-[0.7rem] text-bone sm:inline">{name}</span>
        </a>

        <nav aria-label="Primary navigation" className="hidden items-center gap-5 xl:flex">
          {sectionItems.map((item) => (
            <a
              aria-current={activeHref === item.href ? "location" : undefined}
              className="nav-link relative py-2 text-[0.7rem] font-medium uppercase tracking-[0.13em] text-muted"
              data-active={activeHref === item.href}
              href={resolveNavigationHref(item.href)}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {contactItem ? (
            <LinkButton
              className="header-cta min-h-10 px-4 xl:min-h-11 xl:px-5"
              href={resolveNavigationHref(contactItem.href)}
              showArrow
              variant="secondary"
            >
              Start a Project
            </LinkButton>
          ) : null}

          <button
            aria-controls={MOBILE_MENU_ID}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="menu-trigger relative grid size-11 place-items-center border border-[var(--line-strong)] text-bone xl:hidden"
            onClick={() => {
              shouldRestoreFocusRef.current = true;
              setIsMenuOpen((isOpen) => !isOpen);
            }}
            type="button"
          >
            <span className="sr-only">{isMenuOpen ? "Close" : "Menu"}</span>
            <span aria-hidden="true" className="flex w-5 flex-col gap-1.5">
              <span
                className={`h-px w-full bg-current transition-transform duration-[var(--motion-normal)] ease-[var(--ease-emphasized)] ${
                  isMenuOpen ? "translate-y-[3.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px w-full bg-current transition-transform duration-[var(--motion-normal)] ease-[var(--ease-emphasized)] ${
                  isMenuOpen ? "-translate-y-[3.5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </Container>

      <div
        aria-hidden={!isMenuOpen}
        aria-label="Navigation menu"
        aria-modal={isMenuOpen ? "true" : undefined}
        className={`mobile-menu fixed inset-0 overflow-y-auto bg-carbon/98 backdrop-blur-lg xl:hidden ${
          isMenuOpen
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0"
        }`}
        id={MOBILE_MENU_ID}
        inert={!isMenuOpen}
        ref={menuRef}
        role="dialog"
      >
        <Container className="mobile-menu-content flex min-h-full flex-col">
          <div className="mobile-menu-meta mb-8 flex items-center justify-between gap-5 border-b border-[var(--line)] pb-4 text-[0.65rem] uppercase tracking-[0.18em] text-muted">
            <span>{location}</span>
            <button
              className="min-h-11 px-2 text-bone transition-colors hover:text-copper focus-visible:text-copper"
              onClick={() => closeMenu(true)}
              type="button"
            >
              Close
            </button>
          </div>

          <nav aria-label="Mobile navigation" className="mobile-menu-nav my-auto py-4">
            <ol>
              {sectionItems.map((item, index) => (
                <li
                  className="mobile-nav-item border-b border-[var(--line)]"
                  key={item.href}
                  style={{ "--menu-index": index } as CSSProperties}
                >
                  <a
                    aria-current={activeHref === item.href ? "location" : undefined}
                    className="mobile-nav-link group flex items-baseline gap-5 py-3 text-[clamp(2rem,9vw,4rem)] font-medium leading-none tracking-[-0.045em] text-bone"
                    data-active={activeHref === item.href}
                    href={resolveNavigationHref(item.href)}
                    onClick={() => closeMenu(false)}
                    ref={index === 0 ? firstLinkRef : undefined}
                  >
                    <span className="w-6 text-[0.65rem] font-medium tracking-[0.16em] text-copper">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="transition-[color,transform] duration-[var(--motion-normal)] ease-[var(--ease-emphasized)] motion-safe:group-hover:translate-x-1.5 group-data-[active=true]:text-copper">
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mobile-menu-socials mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-[var(--line)] pt-5">
            {socialProfiles.map((profile) => (
              <a
                aria-label={`${profile.label} profile for ${profile.username} (opens in a new tab)`}
                className="py-2 text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:text-bone focus-visible:text-bone"
                href={profile.url}
                key={profile.platform}
                rel="noopener noreferrer"
                target="_blank"
              >
                {profile.label} ↗
              </a>
            ))}
          </div>
        </Container>
      </div>
    </header>
  );
}

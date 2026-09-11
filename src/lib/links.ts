export function isExternalHref(href: string) {
  return href.startsWith("https://") || href.startsWith("http://");
}

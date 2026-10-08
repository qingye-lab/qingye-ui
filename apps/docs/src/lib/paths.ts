/** The URL is the locale authority; Chinese URLs retain their existing shape. */
export const DOCS_LOCALES = ["zh", "en"] as const;
export type DocsLocale = (typeof DOCS_LOCALES)[number];
export const languageTag = (locale: DocsLocale) => locale === "en" ? "en-US" : "zh-CN";

export const PATHS = {
  home: "/",
  docs: "/docs",
  components: "/docs/components",
  componentAlias: "/components",
  examples: "/examples",
  playground: "/playground",
} as const;

export function splitLocalePath(pathname: string): { locale: DocsLocale; path: string } {
  return pathname === "/en" || pathname.startsWith("/en/")
    ? { locale: "en", path: pathname.slice(3) || "/" }
    : { locale: "zh", path: pathname };
}

/** Canonical content identity, independent of language and component aliases. */
export function routeIdentity(href: string): string {
  let path = splitLocalePath(href.split(/[?#]/, 1)[0]!).path.replace(/\/$/, "") || "/";
  if (path === PATHS.componentAlias || path.startsWith(`${PATHS.componentAlias}/`)) {
    path = PATHS.components + path.slice(PATHS.componentAlias.length);
  }
  return path;
}

/** Build a page URL. Queries, fragments, assets, and external URLs stay intact. */
export function localePath(href: string, locale: DocsLocale): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  const suffixAt = href.search(/[?#]/);
  const pathname = suffixAt < 0 ? href : href.slice(0, suffixAt);
  const suffix = suffixAt < 0 ? "" : href.slice(suffixAt);
  const { path } = splitLocalePath(pathname);
  const page = path === "/" || Object.values(PATHS).some((root) => root !== "/" && (path === root || path.startsWith(`${root}/`)));
  // Example images and other downloadable files are language-neutral resources.
  if (!page || /\.[^/]+$/.test(path)) return href;
  return (locale === "en" ? `/en${path === "/" ? "" : path}` : path) + suffix;
}

export const guidePath = (name: string, locale: DocsLocale = "zh") => localePath(`${PATHS.docs}/${name}`, locale);
export const componentPath = (slug: string, locale: DocsLocale = "zh") => localePath(`${PATHS.components}/${slug}`, locale);
export const routeVisitKey = (pathname: string) => `${splitLocalePath(pathname).locale}:${routeIdentity(pathname)}`;

/** A scroll position belongs to one visit, including its language. */
export const scrollPositionKey = (key: string, pathname: string) => `${routeVisitKey(pathname)}:${key}`;

export function languageSwitchTarget(location: { pathname: string; search: string; hash: string }, locale: DocsLocale): string {
  const { path } = splitLocalePath(location.pathname);
  return (locale === "en" ? `/en${path === "/" ? "" : path}` : path) + location.search + location.hash;
}

import { localePath, routeIdentity, type DocsLocale } from "./paths";
import { SITE, siteUrl } from "./site";

export const DEFAULT_DESCRIPTION = {
  zh: "青野 UI 是基于 Base UI 与 Tailwind CSS 的 React 组件库，附设计指南。",
  en: "Qingye UI is a React component library built on Base UI and Tailwind CSS, with a design guide.",
} as const;

function upsert(selector: string, create: () => HTMLElement, attributes: Record<string, string>) {
  const element = document.head.querySelector<HTMLElement>(selector) ?? document.head.appendChild(create());
  for (const [name, value] of Object.entries(attributes)) element.setAttribute(name, value);
}
const meta = (key: "name" | "property", value: string, content: string) =>
  upsert(`meta[${key}="${value}"]`, () => { const el = document.createElement("meta"); el.setAttribute(key, value); return el; }, { content });

/**
 * Keeps the descriptive head in step with the route: description, social card text, the canonical
 * address (the alias `/components` resolves to its `/docs/components` identity) and both language
 * alternates, so a crawler that runs the page indexes each language under its own address.
 */
export function syncDocumentHead({ title, description, pathname, locale }: { title: string; description?: string | undefined; pathname: string; locale: DocsLocale }) {
  const text = description?.trim() || DEFAULT_DESCRIPTION[locale];
  const identity = routeIdentity(pathname);
  const canonical = siteUrl(identity, locale);
  meta("name", "description", text);
  meta("property", "og:site_name", SITE.name);
  meta("property", "og:type", "website");
  meta("property", "og:title", title);
  meta("property", "og:description", text);
  meta("property", "og:url", canonical);
  meta("property", "og:locale", locale === "en" ? "en_US" : "zh_CN");
  meta("name", "twitter:card", "summary");
  upsert('link[rel="canonical"]', () => document.createElement("link"), { rel: "canonical", href: canonical });
  for (const [hreflang, target] of [["zh-CN", "zh"], ["en", "en"], ["x-default", "zh"]] as const) {
    upsert(`link[rel="alternate"][hreflang="${hreflang}"]`, () => document.createElement("link"), { rel: "alternate", hreflang, href: `${SITE.base}${localePath(identity, target)}` });
  }
}

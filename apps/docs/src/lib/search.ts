import { componentPath, GUIDES, OVERVIEW } from "./nav";
import { components } from "./registry";
import { localizedMeta } from "./localized-meta";
import { localePath, routeIdentity, type DocsLocale } from "./paths";
import { componentLabel } from "./nav";

export interface SearchEntry {
  /** Language-neutral content identity; value is the navigable localized URL. */
  id: string;
  /** Navigable URL in the selected language; id remains the content identity. */
  value: string;
  /** What the input shows when the entry is chosen. */
  label: string;
  title: string;
  hint?: string;
  group: "文档" | "组件";
  meta: string;
  /** Shown beneath the title so a match through description or keywords has a visible reason. */
  description?: string;
  haystack: { strong: string[]; weak: string[] };
}

/** Both languages index every entry, so a Chinese concept finds it from /en and an English one from /zh. */
const bothLocales = (entry: Parameters<typeof localizedMeta>[0]) => (["zh", "en"] as const).map((locale) => localizedMeta(entry, locale));
const unique = (values: (string | undefined)[]) => [...new Set(values.filter((value): value is string => Boolean(value?.trim())))];

export function searchEntries(locale: DocsLocale = "zh"): SearchEntry[] {
  const guides: SearchEntry[] = [...GUIDES, { ...OVERVIEW, keywords: ["components", "全部", "列表", "overview"] }].map((page) => ({
    id: routeIdentity(page.path),
    value: localePath(page.path, locale),
    label: localizedMeta(page, locale).title,
    title: localizedMeta(page, locale).title,
    group: "文档",
    meta: "指南",
    description: localizedMeta(page, locale).description,
    haystack: { strong: unique([...bothLocales(page).map((meta) => meta.title), ...(page.keywords ?? [])]), weak: unique(bothLocales(page).map((meta) => meta.description)) },
  }));
  const items: SearchEntry[] = components.map((entry) => {
    const meta = localizedMeta(entry, locale);
    return {
      id: componentPath(entry.slug),
      value: componentPath(entry.slug, locale),
      label: meta.title,
      ...componentLabel(entry, locale),
      group: "组件",
      meta: entry.category,
      description: meta.description,
      haystack: { strong: unique([...bothLocales(entry).map((item) => item.title), entry.slug, entry.slug.replace(/-/g, " "), ...(entry.keywords ?? [])]), weak: unique([...bothLocales(entry).map((item) => item.description), ...entry.exports]) },
    };
  });
  return [...guides, ...items];
}

const norm = (value: string) => value.toLowerCase().replace(/\s+/g, " ").trim();

/** Higher is better; 0 means no match. Every whitespace-separated term must match. */
export function score(entry: SearchEntry, query: string): number {
  const terms = norm(query).split(" ").filter(Boolean);
  if (!terms.length) return 1;
  // The entry's own identity (slug / English name) outranks a keyword that merely matches.
  const identity = entry.id.split("/").pop() ?? "";
  let total = identity === norm(query).replace(/\s+/g, "-") ? 50 : identity.startsWith(terms[0]!) ? 15 : 0;
  for (const term of terms) {
    let best = 0;
    for (const text of entry.haystack.strong) {
      const value = norm(text);
      if (value === term) best = Math.max(best, 100);
      else if (value.startsWith(term)) best = Math.max(best, 60);
      else if (value.includes(term)) best = Math.max(best, 40);
    }
    if (!best) for (const text of entry.haystack.weak) if (norm(text).includes(term)) best = Math.max(best, 10);
    if (!best) return 0;
    total += best;
  }
  return total;
}

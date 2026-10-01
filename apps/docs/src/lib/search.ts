import { componentPath, GUIDES, OVERVIEW, splitTitle } from "./nav";
import { components } from "./registry";

export interface SearchEntry {
  /** Route path; also the item's identity. */
  value: string;
  /** What the input shows when the entry is chosen. */
  label: string;
  title: string;
  hint?: string;
  group: "文档" | "组件";
  meta: string;
  haystack: { strong: string[]; weak: string[] };
}

export function searchEntries(): SearchEntry[] {
  const guides: SearchEntry[] = [...GUIDES, { ...OVERVIEW, keywords: ["components", "全部", "列表", "overview"] }].map((page) => ({
    value: page.path,
    label: page.title,
    title: page.title,
    group: "文档",
    meta: "指南",
    haystack: { strong: [page.title, ...(page.keywords ?? [])], weak: [page.description] },
  }));
  const items: SearchEntry[] = components.map((entry) => {
    const { zh, en } = splitTitle(entry.title);
    return {
      value: componentPath(entry.slug),
      label: entry.title,
      title: zh,
      ...(en ? { hint: en } : {}),
      group: "组件",
      meta: entry.category,
      haystack: { strong: [entry.title, entry.slug, entry.slug.replace(/-/g, " "), ...(entry.keywords ?? [])], weak: [entry.description, ...entry.exports] },
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
  const identity = entry.value.split("/").pop() ?? "";
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

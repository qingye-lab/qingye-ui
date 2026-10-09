import type { ComponentMeta, DemoModule } from "./types";

import summaries from "virtual:component-summaries";

/** Full metadata, one chunk per component, fetched when that component's page opens. */
const metaLoaders = import.meta.glob<{ default: ComponentMeta }>("../content/*/meta.ts");
const demoLoaders = import.meta.glob<DemoModule>("../content/*/demos/*.tsx");
const sourceLoaders = import.meta.glob<string>("../content/*/demos/*.tsx", {
  query: "?raw",
  import: "default",
});

const slugOf = (path: string) => path.split("/content/")[1]!.split("/")[0]!;

export interface ComponentEntry extends ComponentMeta {
  slug: string;
}

/** What navigation, search and the index need; every component has this, loaded with the shell. */
export type ComponentSummary = Pick<ComponentEntry, "slug" | "title" | "titleEn" | "description" | "descriptionEn" | "category" | "layer" | "source" | "exports" | "keywords">;

export const components: ComponentSummary[] = [...(summaries as ComponentSummary[])].sort((a, b) => a.slug.localeCompare(b.slug));

export function findComponent(slug: string): ComponentSummary | undefined {
  return components.find((entry) => entry.slug === slug);
}

const full = new Map<string, Promise<ComponentEntry | undefined>>();

/** The complete metadata for one component (API, design guidance, notes). */
export function loadComponent(slug: string): Promise<ComponentEntry | undefined> {
  let promise = full.get(slug);
  if (!promise) {
    const summary = findComponent(slug);
    const loader = metaLoaders[`../content/${slug}/meta.ts`];
    // An entry that already carries its API is complete (and a missing file has nothing to add).
    promise = !summary ? Promise.resolve(undefined)
      : "api" in summary || !loader ? Promise.resolve(summary as ComponentEntry)
      : loader().then((module) => ({ ...summary, ...module.default }));
    full.set(slug, promise);
  }
  return promise;
}

export interface LoadedDemo extends DemoModule {
  id: string;
  source: string;
}

/** Loads every demo for one component, in file-name order. */
export async function loadDemos(slug: string): Promise<LoadedDemo[]> {
  const paths = Object.keys(demoLoaders)
    .filter((path) => slugOf(path) === slug)
    .sort();
  return Promise.all(
    paths.map(async (path) => {
      const [module, source] = await Promise.all([demoLoaders[path]!(), sourceLoaders[path]!()]);
      const id = path.split("/").pop()!.replace(/\.tsx$/, "").replace(/^\d+-/, "");
      return { ...module, id, source };
    }),
  );
}

/** How many demo files a component has, without loading them. */
export function demoCount(slug: string): number {
  return Object.keys(demoLoaders).filter((path) => slugOf(path) === slug).length;
}

/** The first live example, without importing source text or the other demos. */
export async function loadPreview(slug: string): Promise<DemoModule> {
  const path = Object.keys(demoLoaders).filter((path) => slugOf(path) === slug).sort()[0];
  if (!path) throw new Error(`No preview for ${slug}`);
  return demoLoaders[path]!();
}

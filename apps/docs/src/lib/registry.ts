import type { ComponentMeta, DemoModule } from "./types";

const metaModules = import.meta.glob<{ default: ComponentMeta }>("../content/*/meta.ts", {
  eager: true,
});
const demoLoaders = import.meta.glob<DemoModule>("../content/*/demos/*.tsx");
const sourceLoaders = import.meta.glob<string>("../content/*/demos/*.tsx", {
  query: "?raw",
  import: "default",
});

const slugOf = (path: string) => path.split("/content/")[1]!.split("/")[0]!;

export interface ComponentEntry extends ComponentMeta {
  slug: string;
}

export const components: ComponentEntry[] = Object.entries(metaModules)
  .map(([path, module]) => ({ ...module.default, slug: slugOf(path) }))
  .sort((a, b) => a.slug.localeCompare(b.slug));

export function findComponent(slug: string): ComponentEntry | undefined {
  return components.find((entry) => entry.slug === slug);
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

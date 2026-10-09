// `virtual:component-summaries`: the few fields every page needs about every component (name,
// category, one-line description, exports, search words), read from each `content/<slug>/meta.ts`.
// The full metadata (API tables, design guidance, notes) is most of the text and is only needed on
// the one component page being read, so it stays in per-component chunks loaded on demand.
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { transformWithEsbuild } from "vite";

const ID = "virtual:component-summaries";
const RESOLVED = `\0${ID}`;
const SUMMARY_KEYS = ["title", "titleEn", "description", "descriptionEn", "category", "layer", "source", "exports", "keywords"];

export default function componentSummaries(contentDir) {
  return {
    name: "component-summaries",
    resolveId: (id) => (id === ID ? RESOLVED : null),
    async load(id) {
      if (id !== RESOLVED) return null;
      const summaries = [];
      for (const slug of readdirSync(contentDir).sort()) {
        const file = join(contentDir, slug, "meta.ts");
        if (!existsSync(file)) continue;
        this.addWatchFile(file);
        // Metadata files are plain data behind a type-only import, so stripping types is enough to read them.
        const { code } = await transformWithEsbuild(readFileSync(file, "utf8"), file, { loader: "ts", format: "esm" });
        const meta = (await import(`data:text/javascript;base64,${Buffer.from(code).toString("base64")}`)).default;
        summaries.push({ slug, ...Object.fromEntries(SUMMARY_KEYS.filter((key) => meta[key] !== undefined).map((key) => [key, meta[key]])) });
      }
      return `export default ${JSON.stringify(summaries)};`;
    },
  };
}

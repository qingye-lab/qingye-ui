import test, { before, after } from "node:test";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

let server;
let search;
before(async () => {
  server = await createServer({ root: fileURLToPath(new URL("..", import.meta.url)), server: { middlewareMode: true, hmr: false, ws: false }, appType: "custom", logLevel: "error" });
  search = await server.ssrLoadModule("/src/lib/search.ts");
});
after(async () => { await server?.close(); });

const find = (locale, query) => {
  const entries = search.searchEntries(locale);
  return entries.map((entry) => ({ entry, rank: search.score(entry, query) })).filter((item) => item.rank > 0).sort((a, b) => b.rank - a.rank).map((item) => item.entry.id);
};

test("colloquial queries in either language reach the component, from either locale", () => {
  const cases = [
    ["zh", "下拉", "/docs/components/select"],
    ["zh", "下拉", "/docs/components/menu"],
    ["zh", "面包屑", "/docs/components/breadcrumb"],
    ["zh", "弹窗", "/docs/components/dialog"],
    ["en", "dropdown", "/docs/components/menu"],
    ["en", "面包屑", "/docs/components/breadcrumb"],
    ["en", "分页", "/docs/components/pagination"],
    ["zh", "pagination", "/docs/components/pagination"],
    ["zh", "tabs", "/docs/components/tabs"],
    ["en", "右键", "/docs/components/context-menu"],
  ];
  for (const [locale, query, id] of cases) assert.ok(find(locale, query).includes(id), `${locale} “${query}” should find ${id}`);
});

test("every component carries keywords for search", async () => {
  const { components } = await server.ssrLoadModule("/src/lib/registry.ts");
  assert.deepEqual(components.filter((entry) => (entry.keywords ?? []).length < 2).map((entry) => entry.slug), []);
});

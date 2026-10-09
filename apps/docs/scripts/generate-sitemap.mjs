// Writes public/sitemap.xml from the same route tables the site renders, so a new page or
// component appears here without a second list to keep. Each URL lists both languages.
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const server = await createServer({ root, server: { middlewareMode: true, hmr: false, ws: false }, appType: "custom", logLevel: "error" });
try {
  const [{ GUIDES, OVERVIEW, componentPath }, { components }, { PATHS, localePath }, { SITE }] = await Promise.all([
    server.ssrLoadModule("/src/lib/nav.ts"),
    server.ssrLoadModule("/src/lib/registry.ts"),
    server.ssrLoadModule("/src/lib/paths.ts"),
    server.ssrLoadModule("/src/lib/site.ts"),
  ]);
  const identities = [PATHS.home, ...GUIDES.map((page) => page.path), OVERVIEW.path, ...components.map((entry) => componentPath(entry.slug))];
  const unique = [...new Set(identities)];
  const url = (path, locale) => `${SITE.base}${localePath(path, locale)}`;
  const entry = (path) => [
    "  <url>",
    `    <loc>${url(path, "zh")}</loc>`,
    `    <xhtml:link rel="alternate" hreflang="zh-CN" href="${url(path, "zh")}"/>`,
    `    <xhtml:link rel="alternate" hreflang="en" href="${url(path, "en")}"/>`,
    "  </url>",
    "  <url>",
    `    <loc>${url(path, "en")}</loc>`,
    `    <xhtml:link rel="alternate" hreflang="zh-CN" href="${url(path, "zh")}"/>`,
    `    <xhtml:link rel="alternate" hreflang="en" href="${url(path, "en")}"/>`,
    "  </url>",
  ].join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${unique.map(entry).join("\n")}\n</urlset>\n`;
  writeFileSync(new URL("../public/sitemap.xml", import.meta.url), xml);
  console.log(`sitemap.xml: ${unique.length} pages × 2 languages`);
} finally {
  await server.close();
}

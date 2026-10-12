// Runs axe-core against every component playground, light and dark.
// Same page set, browser launcher and theme switch as scripts/audit.mjs.
// Requires a docs server (pnpm dev, or a built preview) at DOCS_URL.
//
//   DOCS_URL=http://localhost:5193 node scripts/axe-audit.mjs [slug…] \
//     [--only light-desktop,dark-desktop] [--report file.json] [--contrast]
//
// Status words follow the repository convention:
//   FAIL        axe reports a violation (exit code 1)
//   UNVERIFIED  axe could not decide ("incomplete"); counted, never a pass
//   NOT_RUN     a page failed to load or axe threw; counted as a problem
//   PASS        no violation and nothing undecided
//
// color-contrast is OFF by default. The library has its own contrast gate that
// measures real composited colours (scripts/lib/browser-contrast.mjs); axe's
// rule cannot resolve `color-mix()` and translucent surfaces and reports
// "incomplete" or wrong ratios for them. Pass --contrast to include it anyway.
// This audit sees each demo at rest: open popups, menus and dialogs are not
// opened, so what they contain is not covered here.
import { createRequire } from "node:module";
import { readdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { closeWithTimeout, selectVariants, withBrowser } from "./browser-runtime.mjs";

const AXE_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
const axeSource = createRequire(import.meta.url).resolve("axe-core/axe.min.js");

const args = process.argv.slice(2);
const valueFlags = new Set(["--only", "--report"]);
const boolFlags = new Set(["--contrast"]);
for (let i = 0; i < args.length; i++) {
  if (!args[i].startsWith("--")) continue;
  if (boolFlags.has(args[i])) continue;
  if (!valueFlags.has(args[i])) throw new Error(`unknown flag: ${args[i]}`);
  if (!args[i + 1] || args[i + 1].startsWith("--")) throw new Error(`missing value for ${args[i]}`);
  i++;
}
const flag = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};
const reportPath = flag("--report");
const withContrast = args.includes("--contrast");
const requested = args.filter((a, i) => !a.startsWith("--") && !valueFlags.has(args[i - 1]));

const base = process.env.DOCS_URL ?? "http://localhost:5180";
const slugs = requested.length
  ? requested
  : readdirSync(fileURLToPath(new URL("../apps/docs/src/content", import.meta.url)), { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith(".")).map((d) => d.name).sort();
const variants = selectVariants(flag("--only"));

/** Runs in the page. Returns plain data only. */
async function runAxe({ tags, contrast }) {
  const context = document.querySelector("[data-playground]") ?? document;
  const result = await window.axe.run(context, {
    runOnly: { type: "tag", values: tags },
    rules: { "color-contrast": { enabled: contrast } },
    resultTypes: ["violations", "incomplete"],
  });
  // Documented exemption (docs/browser-audit.md): an expanded treeitem contains its child items, and axe
  // counts their text as the item's visible label. WCAG 2.5.3 concerns the item's own label, so a node is
  // exempt only when its name comes from a label inside its own row and that row's text equals the name.
  const exempted = [];
  const ownLabel = (element) => {
    if (element.getAttribute("role") !== "treeitem" || element.getAttribute("aria-expanded") !== "true") return false;
    const label = document.getElementById(element.getAttribute("aria-labelledby") ?? "");
    const row = label?.closest('[data-slot="tree-row"]');
    return Boolean(row && row.parentElement === element && row.textContent.trim() === label.textContent.trim());
  };
  for (const rule of result.violations) {
    if (rule.id !== "label-content-name-mismatch") continue;
    rule.nodes = rule.nodes.filter((node) => {
      const element = document.querySelector(String(node.target[node.target.length - 1]));
      if (element && ownLabel(element)) { exempted.push(String(node.target)); return false; }
      return true;
    });
  }
  result.violations = result.violations.filter((rule) => rule.nodes.length);
  const nodes = (list) => list.map((rule) => ({
    id: rule.id, impact: rule.impact, help: rule.help, url: rule.helpUrl,
    nodes: rule.nodes.map((node) => ({
      target: node.target.map(String).join(" >> "),
      html: node.html.slice(0, 160),
      summary: (node.failureSummary ?? "").replace(/\s+/g, " ").slice(0, 200),
    })),
  }));
  return { violations: nodes(result.violations), incomplete: nodes(result.incomplete), exempted, axe: window.axe.version };
}

const violations = []; // { slug, variant, id, impact, help, target, html }
const undecided = []; // same shape
const exemptions = []; // { slug, variant, target }
const problems = [];
const pagesRun = [];
let axeVersion;
let interrupted = false;
const onInterrupt = () => { interrupted = true; };
process.on("SIGINT", onInterrupt);
process.on("SIGTERM", onInterrupt);

try {
  await withBrowser(async (browser) => {
    for (const v of variants) {
      if (interrupted) throw new Error("axe audit interrupted");
      const context = await browser.newContext({
        viewport: { width: v.width, height: v.height },
        colorScheme: v.theme, reducedMotion: "reduce",
      });
      try {
        const page = await context.newPage();
        for (const slug of slugs) {
          if (interrupted) throw new Error("axe audit interrupted");
          try {
            await page.goto(`${base}/playground/${slug}?theme=${v.theme}`, { waitUntil: "networkidle", timeout: 30000 });
            await page.waitForFunction(() =>
              document.querySelector("[data-playground] [data-demo]") ||
              document.querySelector('[data-slot="empty"][data-state="empty"]'),
            undefined, { timeout: 15000 });
            await page.waitForTimeout(250);
            await page.addScriptTag({ path: axeSource });
            const result = await page.evaluate(runAxe, { tags: AXE_TAGS, contrast: withContrast });
            axeVersion = result.axe;
            for (const target of result.exempted) exemptions.push({ slug, variant: v.name, target });
            for (const rule of result.violations) {
              for (const node of rule.nodes) violations.push({ slug, variant: v.name, id: rule.id, impact: rule.impact, help: rule.help, target: node.target, html: node.html, summary: node.summary });
            }
            for (const rule of result.incomplete) {
              for (const node of rule.nodes) undecided.push({ slug, variant: v.name, id: rule.id, help: rule.help, target: node.target, html: node.html });
            }
            pagesRun.push(`${slug} [${v.name}]`);
            console.log(`axe ${slug} [${v.name}] violations ${result.violations.reduce((n, r) => n + r.nodes.length, 0)} incomplete ${result.incomplete.reduce((n, r) => n + r.nodes.length, 0)}`);
          } catch (error) {
            problems.push(`NOT_RUN ${slug} [${v.name}] ${error.message.split("\n")[0].slice(0, 160)}`);
          }
        }
      } finally {
        try { await closeWithTimeout(context, "context"); }
        catch (error) { problems.push(`${v.name} context cleanup ${error.message}`); }
      }
    }
  });
} catch (error) {
  problems.push(`harness ${error.message}`);
}
process.off("SIGINT", onInterrupt);
process.off("SIGTERM", onInterrupt);

/** rule -> slug -> { variants, targets } */
function group(list) {
  const rules = new Map();
  for (const item of list) {
    const rule = rules.get(item.id) ?? { id: item.id, help: item.help, impact: item.impact, pages: new Map() };
    const page = rule.pages.get(item.slug) ?? { variants: new Set(), targets: new Map() };
    page.variants.add(item.variant);
    const key = item.target;
    const entry = page.targets.get(key) ?? { html: item.html, variants: new Set() };
    entry.variants.add(item.variant);
    page.targets.set(key, entry);
    rule.pages.set(item.slug, page);
    rules.set(item.id, rule);
  }
  return [...rules.values()].sort((a, b) => b.pages.size - a.pages.size);
}

const failing = group(violations);
const lines = [];
for (const rule of failing) {
  lines.push(`FAIL  ${rule.id} (${rule.impact ?? "n/a"}) ${rule.help} — ${rule.pages.size} page(s)`);
  for (const [slug, page] of [...rule.pages].sort(([a], [b]) => a.localeCompare(b))) {
    lines.push(`  ${slug} [${[...page.variants].join(", ")}]`);
    for (const [target, entry] of page.targets) lines.push(`    ${target}   ${entry.html.replace(/\s+/g, " ").slice(0, 110)}${entry.variants.size < page.variants.size ? `   (only ${[...entry.variants].join(", ")})` : ""}`);
  }
}
const open = group(undecided);
if (open.length) {
  lines.push("");
  lines.push(`UNVERIFIED  axe could not decide ${undecided.length} node(s) across ${open.length} rule(s):`);
  for (const rule of open) lines.push(`  ${rule.id}: ${[...rule.pages.keys()].length} page(s), ${[...rule.pages.values()].reduce((n, p) => n + p.targets.size, 0)} node(s)`);
}

const status = problems.length || violations.length ? "FAIL" : undecided.length ? "UNVERIFIED" : "PASS";
const report = {
  base, axe: axeVersion, tags: AXE_TAGS, colorContrast: withContrast, slugs,
  variants: variants.map((v) => v.name), pagesRun: pagesRun.length, status,
  violations, undecided, exemptions, problems,
};
if (reportPath) writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(`\naxe-core ${axeVersion ?? "?"} · tags ${AXE_TAGS.join(", ")} · color-contrast ${withContrast ? "on" : "off"}`);
console.log(`scanned ${pagesRun.length} of ${slugs.length * variants.length} page×theme runs; ${violations.length} violating node(s) in ${failing.length} rule(s)`);
if (lines.length) console.log(lines.join("\n"));
if (exemptions.length) console.log(`\nEXEMPT  ${exemptions.length} expanded treeitem node(s) named by their own row (label-content-name-mismatch; see docs/browser-audit.md)`);
if (problems.length) console.log(`\n${problems.join("\n")}`);
console.log(`\n${status}`);
process.exitCode = problems.length || violations.length ? 1 : 0;

// Sweeps every component playground and reports page errors, console errors,
// horizontal overflow, empty demos and children wider than their container.
// Requires the docs dev server (pnpm dev).
//
//   node scripts/audit.mjs [slug…] [--only light-desktop,dark-desktop] [--report file.json]
//
// Exit code is 1 when anything was reported, so it can gate a release.
import { readdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { measurePlayground } from "./audit-measure.mjs";
import { closeWithTimeout, selectVariants, withBrowser } from "./browser-runtime.mjs";

const args = process.argv.slice(2);
const valueFlags = new Set(["--only", "--report"]);
for (let i = 0; i < args.length; i++) {
  if (!args[i].startsWith("--")) continue;
  if (!valueFlags.has(args[i])) throw new Error(`unknown flag: ${args[i]}`);
  if (!args[i + 1] || args[i + 1].startsWith("--")) throw new Error(`missing value for ${args[i]}`);
  i++;
}
const flag = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};
const reportPath = flag("--report");
const requested = args.filter((a, i) => !a.startsWith("--") && !valueFlags.has(args[i - 1]));

const base = process.env.DOCS_URL ?? "http://localhost:5180";
const slugs = requested.length
  ? requested
  : readdirSync(fileURLToPath(new URL("../apps/docs/src/content", import.meta.url)), { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith(".")).map((d) => d.name).sort();

const variants = selectVariants(flag("--only"));

/** One page, measured. Page listeners are isolated per navigation. */
async function inspect(page, slug, v, measurements) {
  const found = [];
  const pageError = (e) => found.push(`pageerror ${e.message.slice(0, 140)}`);
  const consoleError = (m) => {
    if (m.type() === "error") found.push(`console ${m.text().slice(0, 140)}`);
  };
  const crash = () => found.push("renderer crashed");
  page.on("pageerror", pageError);
  page.on("console", consoleError);
  page.on("crash", crash);
  try {
    await page.goto(`${base}/playground/${slug}?theme=${v.theme}`, {
      waitUntil: "networkidle",
      timeout: 30000,
    });
    await page.waitForFunction(() =>
      document.querySelector("[data-playground] [data-demo]") ||
      document.querySelector('[data-slot="empty"][data-state="empty"]'),
    undefined, { timeout: 15000 });
    await page.waitForTimeout(250);

    // Explicit gate self-check: only the runner's fault-injection option sets
    // this environment flag. Normal docs and audit runs are unchanged.
    if (process.env.AUDIT_FIXTURE_OVERFLOW === "1") {
      await page.evaluate(() => {
        const fixture = document.createElement("div");
        fixture.style.cssText = "width:2000px;height:20px;flex-shrink:0";
        fixture.textContent = "audit overflow failure fixture";
        document.querySelector("[data-demo]").append(fixture);
      });
    }
    const result = await page.evaluate(measurePlayground);
    measurements.push({ slug, variant: v.name, ...result });

    if (result.demos === 0) found.push("no demos");
    if (result.overflow > 1) found.push(`page overflow ${result.overflow}px`);
    if (result.empty.length) found.push(`empty demos: ${result.empty.join(", ")}`);
    if (result.invalidDeclarations.length) found.push(`invalid overflow declaration: ${result.invalidDeclarations.map((d) => `${d.demo}: ${d.value}`).join("; ")}`);
    if (result.over.length) found.push(`wider than its container: ${result.over.map((item) => `${item.demo}: ${item.element} by ${item.excess}px`).join("; ")}`);
  } catch (error) {
    found.push(`load ${error.message.split("\n")[0].slice(0, 140)}`);
  } finally {
    page.off("pageerror", pageError);
    page.off("console", consoleError);
    page.off("crash", crash);
  }
  return found;
}

const problems = [];
const measurements = [];
let lifecycle;
const started = Date.now();
let interrupted = false;
const onInterrupt = () => { interrupted = true; };
process.on("SIGINT", onInterrupt);
process.on("SIGTERM", onInterrupt);
try {
  await withBrowser(async (browser, state) => {
    lifecycle = state;
    // Reuse one context and tab per emulation variant to scan serially and
    // reduce resource overhead.
    for (const v of variants) {
      if (interrupted) throw new Error("audit interrupted");
      const context = await browser.newContext({
        viewport: { width: v.width, height: v.height },
        isMobile: Boolean(v.mobile), hasTouch: Boolean(v.mobile),
        colorScheme: v.theme, reducedMotion: "reduce",
      });
      try {
        const page = await context.newPage();
        for (const slug of slugs) {
          if (interrupted) throw new Error("audit interrupted");
          if (!browser.isConnected()) throw new Error(`browser disconnected before ${slug} [${v.name}]`);
          for (const message of await inspect(page, slug, v, measurements)) {
            problems.push(`${slug} [${v.name}] ${message}`);
          }
          console.log(`inspected ${slug} [${v.name}]`);
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
const report = { base, slugs, variants: variants.map((v) => v.name), lifecycle, elapsedMs: Date.now() - started, measurements, problems };
if (reportPath) writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(`audited ${slugs.length} components × ${variants.length} variants (${measurements.length} measured)`);
console.log(problems.length ? problems.join("\n") : "no problems");
process.exitCode = problems.length ? 1 : 0;

// Visual review: screenshots one component's playground in light and dark, at
// desktop and phone widths. Requires the docs dev server (pnpm dev, port 5180).
//
//   node scripts/shot.mjs <slug> [--out /tmp/yq-shots] [--only light-desktop]
//
// Prints the PNG paths; open them with an image viewer to review.
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { closeWithTimeout, selectVariants, withBrowser } from "./browser-runtime.mjs";

const args = process.argv.slice(2);
const valueFlags = new Set(["--out", "--only"]);
for (let i = 0; i < args.length; i++) {
  if (!args[i].startsWith("--")) continue;
  if (!valueFlags.has(args[i])) throw new Error(`unknown flag: ${args[i]}`);
  if (!args[i + 1] || args[i + 1].startsWith("--")) throw new Error(`missing value for ${args[i]}`);
  i++;
}
const slug = args.find((a, i) => !a.startsWith("--") && !valueFlags.has(args[i - 1]));
if (!slug) {
  console.error("usage: node scripts/shot.mjs <slug> [--out dir] [--only light-desktop,dark-mobile]");
  process.exit(2);
}
const flag = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};
const out = flag("--out") ?? "/tmp/yq-shots";
const variants = selectVariants(flag("--only"));
const base = process.env.DOCS_URL ?? "http://localhost:5180";
mkdirSync(out, { recursive: true });

const problems = [];
await withBrowser(async (browser) => {
  for (const v of variants) {
    const context = await browser.newContext({
      viewport: { width: v.width, height: v.height },
      deviceScaleFactor: 2,
      isMobile: Boolean(v.mobile), hasTouch: Boolean(v.mobile),
      colorScheme: v.theme, reducedMotion: "reduce",
    });
    let failure;
    try {
      const page = await context.newPage();
      page.on("pageerror", (error) => problems.push(`${v.name}: ${error.message}`));
      page.on("console", (message) => {
        if (message.type() === "error") problems.push(`${v.name}: console ${message.text()}`);
      });
      await page.goto(`${base}/playground/${slug}?theme=${v.theme}`, { waitUntil: "networkidle" });
      await page.waitForFunction(() =>
        document.querySelector("[data-playground] [data-demo]") ||
        [...document.querySelectorAll("[data-playground] > p")].some((p) => p.textContent.trim() === "还没有示例。"),
      undefined, { timeout: 15000 });
      await page.waitForTimeout(300);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (overflow > 1) problems.push(`${v.name}: horizontal overflow ${overflow}px`);
      const file = join(out, `${slug}-${v.name}.png`);
      await page.screenshot({ path: file, fullPage: true });
      console.log(file);
    } catch (error) {
      failure = error;
      throw error;
    } finally {
      try { await closeWithTimeout(context, "context"); }
      catch (error) {
        if (failure) throw new AggregateError([failure, error], `${failure.message}; ${error.message}`);
        throw error;
      }
    }
  }
});
if (problems.length) {
  console.log("\nPROBLEMS");
  for (const p of problems) console.log(`- ${p}`);
  process.exitCode = 1;
}

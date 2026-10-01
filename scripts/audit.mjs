// Sweeps every component playground in light/dark at desktop and phone widths
// and reports page errors, console errors, horizontal overflow and demos that
// rendered nothing. Requires the docs dev server (pnpm dev).
//
//   node scripts/audit.mjs [slug…]
import { existsSync, readdirSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { chromium } from "playwright-core";

const base = process.env.DOCS_URL ?? "http://localhost:5180";
const slugs = process.argv.slice(2).length
  ? process.argv.slice(2)
  : readdirSync("apps/docs/src/content").filter((d) => !d.startsWith("."));
const shell = join(homedir(), "Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell");
const launch = () => chromium.launch(existsSync(shell) ? { executablePath: shell } : {});
let browser = await launch();
const variants = [
  { name: "light-desktop", theme: "light", width: 1100, height: 900 },
  { name: "dark-mobile", theme: "dark", width: 390, height: 844, mobile: true },
];

const problems = [];
for (const slug of slugs) {
  for (const v of variants) {
    if (!browser.isConnected()) browser = await launch();
    const errors = [];
    let context;
    try {
      context = await browser.newContext({ viewport: { width: v.width, height: v.height }, isMobile: !!v.mobile, hasTouch: !!v.mobile, colorScheme: v.theme, reducedMotion: "reduce" });
      const page = await context.newPage();
      page.on("pageerror", (e) => errors.push(`pageerror ${e.message.slice(0, 140)}`));
      page.on("console", (m) => { if (m.type() === "error") errors.push(`console ${m.text().slice(0, 140)}`); });
      page.on("crash", () => errors.push("renderer crashed"));
      await page.goto(`${base}/playground/${slug}?theme=${v.theme}`, { waitUntil: "networkidle", timeout: 30000 });
      await page.waitForSelector("[data-playground] section, [data-playground] p", { timeout: 15000 });
      await page.waitForTimeout(250);
      const r = await page.evaluate(() => {
        const overflow = document.documentElement.scrollWidth - window.innerWidth;
        const empty = [...document.querySelectorAll("[data-demo]")]
          .filter((s) => { const frame = s.lastElementChild; return frame && frame.getBoundingClientRect().height < 40 && !frame.textContent.trim(); })
          .map((s) => s.getAttribute("data-demo"));
        return { overflow, empty, demos: document.querySelectorAll("[data-demo]").length };
      });
      if (r.demos === 0) errors.push("no demos");
      if (r.overflow > 1) errors.push(`page overflow ${r.overflow}px`);
      if (r.empty.length) errors.push(`empty demos: ${r.empty.join(", ")}`);
    } catch (e) {
      errors.push(`load ${e.message.split("\n")[0].slice(0, 120)}`);
    } finally {
      await context?.close().catch(() => {});
    }
    for (const e of errors) problems.push(`${slug} [${v.name}] ${e}`);
  }
}
await browser.close().catch(() => {});
console.log(`audited ${slugs.length} components × ${variants.length} variants`);
console.log(problems.length ? problems.join("\n") : "no problems");
process.exitCode = problems.length ? 1 : 0;

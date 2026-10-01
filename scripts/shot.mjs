// Visual review: screenshots one component's playground in light and dark, at
// desktop and phone widths. Requires the docs dev server (pnpm dev, port 5180).
//
//   node scripts/shot.mjs <slug> [--out /tmp/yq-shots] [--only light-desktop]
//
// Prints the PNG paths; open them with an image viewer to review.
import { mkdirSync, existsSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { chromium } from "playwright-core";

const args = process.argv.slice(2);
const slug = args.find((a) => !a.startsWith("--"));
if (!slug) {
  console.error("usage: node scripts/shot.mjs <slug> [--out dir] [--only light-desktop,dark-mobile]");
  process.exit(2);
}
const flag = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};
const out = flag("--out") ?? "/tmp/yq-shots";
const only = flag("--only")?.split(",");
const base = process.env.DOCS_URL ?? "http://localhost:5180";
mkdirSync(out, { recursive: true });

const shell = join(homedir(), "Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell");
const browser = await chromium.launch(existsSync(shell) ? { executablePath: shell } : {});
const variants = [
  { name: "light-desktop", theme: "light", width: 1100, height: 900 },
  { name: "dark-desktop", theme: "dark", width: 1100, height: 900 },
  { name: "light-mobile", theme: "light", width: 390, height: 844, mobile: true },
  { name: "dark-mobile", theme: "dark", width: 390, height: 844, mobile: true },
].filter((v) => !only || only.includes(v.name));

const problems = [];
for (const v of variants) {
  const context = await browser.newContext({
    viewport: { width: v.width, height: v.height },
    deviceScaleFactor: 2,
    isMobile: Boolean(v.mobile),
    hasTouch: Boolean(v.mobile),
    colorScheme: v.theme,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  page.on("pageerror", (error) => problems.push(`${v.name}: ${error.message}`));
  page.on("console", (message) => {
    if (message.type() === "error") problems.push(`${v.name}: console ${message.text()}`);
  });
  await page.goto(`${base}/playground/${slug}?theme=${v.theme}`, { waitUntil: "networkidle" });
  await page.waitForSelector("[data-playground] section, [data-playground] .text-destructive-foreground", { timeout: 15000 });
  await page.waitForTimeout(300);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  if (overflow > 1) problems.push(`${v.name}: horizontal overflow ${overflow}px`);
  const file = join(out, `${slug}-${v.name}.png`);
  await page.screenshot({ path: file, fullPage: true });
  console.log(file);
  await context.close();
}
await browser.close();
if (problems.length) {
  console.log("\nPROBLEMS");
  for (const p of problems) console.log(`- ${p}`);
  process.exitCode = 1;
}

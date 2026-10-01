// Visual review of whole docs pages: screenshots arbitrary routes in light and
// dark, at desktop and phone widths. Requires the docs dev server (pnpm dev).
//
//   node scripts/shot-page.mjs / /docs/components/button [--out /tmp/yq-pages]
//        [--only light-desktop,dark-mobile] [--viewport] [--open-nav] [--search]
//        [--width 1440]
//
//   --viewport   capture only the first screen instead of the full page
//   --open-nav   on phone widths, open the navigation sheet before capturing
//   --search     open the ⌘K search dialog before capturing
//
// Prints the PNG paths and any page errors or horizontal overflow.
import { existsSync, mkdirSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { chromium } from "playwright-core";

const args = process.argv.slice(2);
const flag = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};
const valueFlags = new Set(["--out", "--only", "--width"]);
const routes = args.filter((a, i) => !a.startsWith("--") && !valueFlags.has(args[i - 1]));
if (!routes.length) {
  console.error("usage: node scripts/shot-page.mjs <route> [route…] [--out dir] [--only light-desktop] [--viewport] [--open-nav] [--search]");
  process.exit(2);
}
const out = flag("--out") ?? "/tmp/yq-pages";
const only = flag("--only")?.split(",");
const desktopWidth = Number(flag("--width") ?? 1440);
const viewportOnly = args.includes("--viewport");
const openNav = args.includes("--open-nav");
const openSearch = args.includes("--search");
const base = process.env.DOCS_URL ?? "http://localhost:5180";
mkdirSync(out, { recursive: true });

const shell = join(
  homedir(),
  "Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell",
);
const browser = await chromium.launch(existsSync(shell) ? { executablePath: shell } : {});
const variants = [
  { name: "light-desktop", theme: "light", width: desktopWidth, height: 900 },
  { name: "dark-desktop", theme: "dark", width: desktopWidth, height: 900 },
  { name: "light-mobile", theme: "light", width: 390, height: 844, mobile: true },
  { name: "dark-mobile", theme: "dark", width: 390, height: 844, mobile: true },
].filter((v) => !only || only.includes(v.name));

const slugify = (route) => (route === "/" ? "home" : route.replace(/^\/|\/$/g, "").replace(/[^\w-]+/g, "_"));
const problems = [];

for (const route of routes) {
  for (const v of variants) {
    const context = await browser.newContext({
      viewport: { width: v.width, height: v.height },
      deviceScaleFactor: 2,
      isMobile: Boolean(v.mobile),
      hasTouch: Boolean(v.mobile),
      colorScheme: v.theme,
      reducedMotion: "reduce",
    });
    // The site's pre-paint script reads this key, so the first frame is already themed.
    await context.addInitScript((theme) => {
      try {
        localStorage.setItem("yq-theme", theme);
      } catch {}
    }, v.theme);
    const page = await context.newPage();
    const tag = `${route} ${v.name}`;
    page.on("pageerror", (error) => problems.push(`${tag}: ${error.message}`));
    page.on("console", (message) => {
      if (message.type() === "error") problems.push(`${tag}: console ${message.text()}`);
    });
    await page.goto(`${base}${route}`, { waitUntil: "networkidle" });
    await page.waitForSelector("main h1, main [data-route-enter]", { timeout: 15000 }).catch(() => problems.push(`${tag}: no <main> heading`));
    await page.waitForTimeout(400);

    if (openNav && v.mobile) {
      await page.click('button[aria-label="打开导航"]');
      await page.waitForSelector('[data-slot="sheet-popup"]');
      await page.waitForTimeout(400);
    }
    if (openSearch) {
      await page.keyboard.press(process.platform === "darwin" ? "Meta+k" : "Control+k");
      await page.waitForSelector('[data-slot="command-dialog-popup"]', { timeout: 5000 }).catch(() => problems.push(`${tag}: search did not open`));
      await page.waitForTimeout(400);
    }

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (overflow > 1) {
      const culprits = await page.evaluate(() =>
        [...document.querySelectorAll("body *")]
          .filter((el) => el.getBoundingClientRect().right > window.innerWidth + 1)
          .slice(0, 5)
          .map((el) => `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 60)}`),
      );
      problems.push(`${tag}: horizontal overflow ${overflow}px (${culprits.join(" | ")})`);
    }
    const suffix = [openNav && v.mobile ? "nav" : "", openSearch ? "search" : ""].filter(Boolean).join("-");
    const file = join(out, `${slugify(route)}-${v.name}${suffix ? `-${suffix}` : ""}.png`);
    await page.screenshot({ path: file, fullPage: !viewportOnly && !(openNav && v.mobile) && !openSearch });
    console.log(file);
    await context.close();
  }
}
await browser.close();
if (problems.length) {
  console.log("\nPROBLEMS");
  for (const p of problems) console.log(`- ${p}`);
  process.exitCode = 1;
}

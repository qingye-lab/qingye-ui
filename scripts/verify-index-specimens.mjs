// 组件总览的样张实测。需要 docs 开发服务器（pnpm dev）。
//   [DOCS_URL=http://localhost:5180] node scripts/verify-index-specimens.mjs [slug…] [--json]
// 量的是样张里每个可见元素的外框（已按它自己祖先的裁切收窄），与台的内容盒比较；容差 1px。焦点环与阴影不计。
// 台的约定（components-index.css）：放得下的居中；放不下的大件从起始角排起，越出的部分只在底侧与结束侧淡出。
//   FAIL     未挂载、挂载失败、台里没有可见内容，或内容越出了起始侧 / 顶侧（那一侧没有淡出，是硬切）
//   cropped  内容越出底侧或结束侧：按约定淡出，不算失败，逐格列出供人看图判断是否还认得出
// 两种语言、浅色、1440×900 各量一遍；有 FAIL 时退出码为 1。本脚本不判断样张好不好看。
import { chromium } from "playwright-core";
const base = process.env.DOCS_URL ?? "http://localhost:5180";
const args = process.argv.slice(2);
const json = args.includes("--json");
const only = args.filter(arg => !arg.startsWith("--"));

const measure = () => {
  const TOLERANCE = 1;
  const clips = element => { const style = getComputedStyle(element); return style.overflowX !== "visible" || style.overflowY !== "visible"; };
  const results = [];
  for (const frame of document.querySelectorAll("[data-component-specimen]")) {
    const slug = frame.dataset.componentSpecimen;
    const style = getComputedStyle(frame);
    const outer = frame.getBoundingClientRect();
    const box = {
      left: outer.left + parseFloat(style.borderLeftWidth) + parseFloat(style.paddingLeft),
      right: outer.right - parseFloat(style.borderRightWidth) - parseFloat(style.paddingRight),
      top: outer.top + parseFloat(style.borderTopWidth) + parseFloat(style.paddingTop),
      bottom: outer.bottom - parseFloat(style.borderBottomWidth) - parseFloat(style.paddingBottom),
    };
    const extent = { left: Infinity, right: -Infinity, top: Infinity, bottom: -Infinity };
    let worst = null;
    for (const element of frame.querySelectorAll("*")) {
      const computed = getComputedStyle(element);
      if (computed.display === "none" || computed.visibility === "hidden") continue;
      const rect = element.getBoundingClientRect();
      let { left, right, top, bottom } = rect;
      for (let parent = element.parentElement; parent && parent !== frame; parent = parent.parentElement) {
        if (!clips(parent)) continue;
        const clip = parent.getBoundingClientRect();
        left = Math.max(left, clip.left); right = Math.min(right, clip.right);
        top = Math.max(top, clip.top); bottom = Math.min(bottom, clip.bottom);
      }
      if (right - left <= 1 || bottom - top <= 1) continue;
      extent.left = Math.min(extent.left, left); extent.right = Math.max(extent.right, right);
      extent.top = Math.min(extent.top, top); extent.bottom = Math.max(extent.bottom, bottom);
      const over = Math.max(box.left - left, box.top - top);
      if (over > TOLERANCE && (!worst || over > worst.over)) worst = { over: Math.round(over * 10) / 10, element: element.dataset.slot ?? element.tagName.toLowerCase() };
    }
    const cropped = Number.isFinite(extent.left) && (extent.right - box.right > TOLERANCE || extent.bottom - box.bottom > TOLERANCE);
    const empty = !Number.isFinite(extent.left);
    results.push({
      slug,
      state: frame.dataset.state,
      frame: `${Math.round(box.right - box.left)}×${Math.round(box.bottom - box.top)}`,
      content: empty ? null : `${Math.round(extent.right - extent.left)}×${Math.round(extent.bottom - extent.top)}`,
      worst,
      cropped,
    });
  }
  return results;
};

const browser = await chromium.launch();
let failed = false;
const report = {};
for (const path of ["/docs/components", "/en/docs/components"]) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
  await page.goto(base + path, { waitUntil: "load" });
  await page.waitForSelector("[data-component-specimen]");
  // 样张临近视口才挂载：一屏一屏走到底，全部挂上再量。
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y <= height; y += 600) { await page.evaluate(top => window.scrollTo(0, top), y); await page.waitForTimeout(120); }
  await page.waitForFunction(() => [...document.querySelectorAll("[data-component-specimen]")].every(frame => frame.dataset.state !== "idle" && !frame.querySelector("[data-slot='skeleton']")), null, { timeout: 30000 }).catch(() => {});
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  const results = (await page.evaluate(measure)).filter(result => !only.length || only.includes(result.slug));
  const bad = results.filter(result => result.worst || result.state !== "mounted" || !result.content);
  const cropped = results.filter(result => result.cropped && !bad.includes(result));
  report[path] = { total: results.length, failing: bad, cropped };
  if (bad.length) failed = true;
  if (!json) {
    console.log(`${bad.length ? "FAIL" : "PASS"} ${path}  ${results.length} specimens, ${bad.length} failing, ${cropped.length} cropped`);
    for (const result of bad) console.log(`  FAIL ${result.slug}: ${result.state}, stage ${result.frame}, content ${result.content ?? "none"}${result.worst ? `, past the start/top edge by ${result.worst.over}px at <${result.worst.element}>` : ""}`);
    for (const result of cropped) console.log(`  cropped ${result.slug}: stage ${result.frame}, content ${result.content}`);
  }
  await page.close();
}
await browser.close();
if (json) console.log(JSON.stringify(report, null, 2));
process.exit(failed ? 1 : 0);

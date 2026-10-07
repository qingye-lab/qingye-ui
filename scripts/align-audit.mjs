// 对齐审计（基础层 §19）。需要 docs 开发服务器（pnpm dev）。不截图，只报告实测数值。
//   node scripts/align-audit.mjs [page,page…]
// 页面为 preview.html 的标签：components,inputs,data,navigation,overlay,composition,settings,workbench,detail。
// 有任何偏差时退出码为 1。
import { chromium } from "playwright-core";
import { fileURLToPath } from "node:url";
const script = fileURLToPath(new URL("./lib/align-audit.browser.js", import.meta.url));
const pages = (process.argv[2] ?? "components,inputs,data,navigation,overlay,composition,settings,workbench,detail").split(",");
const browser = await chromium.launch();
let failed = false;
for (const name of pages) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`http://localhost:5180/preview.html#${name}`, { waitUntil: "load" });
  await page.waitForTimeout(1800);
  await page.addScriptTag({ path: script });
  const result = await page.evaluate(() => window.__align());
  const findings = Object.entries(result).filter(([key, value]) => key !== "page" && value.length);
  console.log(findings.length ? `FAIL ${name}` : `PASS ${name}`);
  for (const [key, value] of findings) { failed = true; console.log(`  ${key}: ${JSON.stringify(value)}`); }
  await page.close();
}
await browser.close();
process.exit(failed ? 1 : 0);

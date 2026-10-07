// 按选择器截取元素，浅/深两色并排成一张图，用于逐个组件比对细节。
// 用法: node scripts/shot-el.mjs <slug> <selectors.json> [outname] [--click "sel"]
// selectors.json: [{ "name": "分段控件", "selector": "[data-slot=segmented-control]" }]
import { chromium } from "playwright-core";
import { readFileSync, mkdirSync } from "node:fs";

const [, , slug, selectorFile, outName = slug, ...rest] = process.argv;
const clickIdx = rest.indexOf("--click");
const clickSel = clickIdx >= 0 ? rest[clickIdx + 1] : null;
const selectors = JSON.parse(readFileSync(selectorFile, "utf8"));
const outDir = "/tmp/yq-el";
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1100, height: 900 }, deviceScaleFactor: 2 });
await page.goto(`http://localhost:5180/playground/${slug}`, { waitUntil: "networkidle" });
await page.waitForTimeout(500);
if (clickSel) {
  await page.click(clickSel).catch(() => {});
  await page.waitForTimeout(700);
}

const shots = [];
for (const theme of ["light", "dark"]) {
  await page.evaluate(t => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(t);
  }, theme);
  await page.waitForTimeout(250);
  for (const s of selectors) {
    const els = await page.$$(s.selector);
    for (let i = 0; i < els.length; i++) {
      const box = await els[i].boundingBox();
      if (!box || box.width < 2 || box.height < 2) continue;
      const pad = 14;
      const file = `${outDir}/${outName}-${theme}-${s.name}-${i}.png`;
      await page.screenshot({
        path: file,
        clip: { x: Math.max(0, box.x - pad), y: Math.max(0, box.y - pad), width: box.width + pad * 2, height: box.height + pad * 2 },
      });
      shots.push(file);
    }
  }
}
await browser.close();
console.log(shots.join("\n"));

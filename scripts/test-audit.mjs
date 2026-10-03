// Run serially, after other task-owned browser commands have finished.
// Requires the docs server; assertions exercise the production measurement.
import assert from "node:assert/strict";
import { writeFileSync } from "node:fs";
import { measurePlayground } from "./audit-measure.mjs";
import { withBrowser } from "./browser-runtime.mjs";

const results = [];
let lifecycle;
await withBrowser(async (browser, state) => {
  lifecycle = state;
  const context = await browser.newContext({ viewport: { width: 1100, height: 900 } });
  try {
    const page = await context.newPage();
    const base = process.env.DOCS_URL ?? "http://localhost:5180";
    await page.goto(`${base}/playground/button?theme=light`, { waitUntil: "networkidle" });
    await page.waitForSelector("[data-demo]");
    await page.evaluate(() => {
      const element = document.createElement("div");
      element.setAttribute("data-slot", "audit-injected-overflow");
      element.style.cssText = "width:2000px; height:40px; flex-shrink:0; background:red";
      document.querySelector("[data-demo]").lastElementChild.append(element);
    });
    const injected = await page.evaluate(measurePlayground);
    assert(injected.overflow > 1, "2000px element must overflow the desktop page");
    assert(injected.over.some((r) => r.element === "div[audit-injected-overflow]" && r.excess > 500), "2000px element must also be detected inside its demo");
    results.push({ case: "real-playground-2000px", status: "PASS", measurement: injected });

    for (const [name, markup, expected] of [
      ["negative-margin-icon", '<button style="display:flex;width:100px;padding:12px;border:1px solid"><span style="margin-left:auto;display:inline"><svg style="display:block;width:16px;height:16px;margin-right:-4px"></svg></span></button>', false],
      ["subpixel-edge", '<div style="width:100px"><div style="width:100.4px;height:20px"></div></div>', false],
      ["rotated-separator", '<div style="width:16px"><svg style="width:16px;height:16px;transform:rotate(-12deg)"></svg></div>', false],
      ["infinite-pure-rotation", '<style>@keyframes fixtureTurn {to {transform:rotate(360deg)}}</style><div style="width:32px"><svg style="display:block;width:32px;height:32px;animation:fixtureTurn 1s linear infinite"></svg></div>', false],
      ["infinite-rotation-2000px", '<style>@keyframes fixtureTurn {to {transform:rotate(360deg)}}</style><div style="width:32px"><svg style="display:block;width:2000px;height:32px;animation:fixtureTurn 1s linear infinite"></svg></div>', true],
      ["static-translation", '<div style="width:100px"><svg style="display:block;width:100px;height:20px;transform:translateX(3px)"></svg></div>', true],
      ["static-scale", '<div style="width:100px"><svg style="display:block;width:100px;height:20px;transform:scaleX(1.1)"></svg></div>', true],
      ["mixed-translation-animation", '<style>@keyframes fixtureMixed {from {transform:translateX(20px) rotate(0deg)} to {transform:translateX(20px) rotate(360deg)}}</style><div style="width:32px"><svg style="display:block;width:32px;height:32px;animation:fixtureMixed 1s linear infinite"></svg></div>', true],
      ["three-pixel-overflow", '<div style="width:100px"><div style="width:103px;height:20px"></div></div>', true],
      ["negative-margin-real-overflow", '<div style="width:100px"><div style="width:140px;margin-right:-4px;height:20px"></div></div>', true],
      ["declared-label-fit", '<div style="width:100px"><span style="display:flex;flex-direction:column;align-items:center;width:0"><span data-audit-overflow-inline="1em" style="font-size:12px;width:24px">关闭</span></span></div>', false],
      ["declared-label-excess", '<div style="width:100px"><span style="display:flex;flex-direction:column;align-items:center;width:0"><span data-audit-overflow-inline="1em" style="font-size:12px;width:60px">关闭</span></span></div>', true],
      ["declared-label-2000px", '<div style="width:100px"><span style="display:flex;flex-direction:column;align-items:center;width:0"><span data-audit-overflow-inline="1em" style="font-size:12px;width:2000px">关闭</span></span></div>', true],
      ["invalid-declaration-value", '<div style="width:100px"><span style="display:flex;flex-direction:column;align-items:center;width:0"><span data-audit-overflow-inline="100em" style="font-size:12px;width:24px">关闭</span></span></div>', true],
      ["invalid-declaration-structure", '<div style="width:100px"><span data-audit-overflow-inline="1em">关闭</span></div>', false],
      ["border-padding-fit", '<div style="box-sizing:border-box;width:100px;border:4px solid;padding:10px"><div style="width:72px;height:20px"></div></div>', false],
      ["display-contents-fit", '<div style="width:100px"><span style="display:contents"><input style="box-sizing:border-box;width:100px"></span></div>', false],
      ["display-contents-overflow", '<div style="width:100px"><span style="display:contents"><input style="box-sizing:border-box;width:2000px"></span></div>', true],
      ["zero-size-sizer-fit", '<div style="width:100px"><div style="width:0;height:0;overflow:visible"><div style="width:100px;height:20px"></div></div></div>', false],
      ["zero-size-sizer-overflow", '<div style="width:100px"><div style="width:0;height:0;overflow:visible"><div style="width:2000px;height:20px"></div></div></div>', true],
      ["zero-width-real-container", '<div style="width:100px"><div style="width:0;height:20px;overflow:visible"><div style="width:100px;height:20px"></div></div></div>', true],
      ["intentional-scroll", '<div style="width:100px;overflow-x:auto"><div style="width:2000px;height:20px"></div></div>', false],
    ]) {
      await page.setContent(`<main data-playground><section data-demo="${name}"><div>${markup}</div></section></main>`);
      if (name.startsWith("infinite-") || name === "mixed-translation-animation") {
        await page.evaluate(() => { for (const animation of document.getAnimations()) animation.currentTime = 125; });
      }
      const measurement = await page.evaluate(measurePlayground);
      if (name.startsWith("infinite-")) {
        assert.equal(measurement.normalizedAnimations.length, 1, name);
        assert.equal(measurement.normalizedAnimations[0].transformMeasured, "matrix(1, 0, 0, 1, 0, 0)", name);
      }
      if (name === "mixed-translation-animation") assert.equal(measurement.normalizedAnimations.length, 0, name);
      assert.equal(measurement.over.length > 0, expected, name);
      if (name.startsWith("invalid-declaration")) assert.equal(measurement.invalidDeclarations.length, 1, name);
      results.push({ case: name, status: "PASS", measurement });
    }
  } finally {
    await context.close();
  }
});
if (process.env.AUDIT_TEST_REPORT) writeFileSync(process.env.AUDIT_TEST_REPORT, `${JSON.stringify({ lifecycle, results }, null, 2)}\n`);
console.log(`PASS ${results.length} audit browser cases`);

// Public-demo regressions: one browser, serial themes/viewports, no source-only fixture.
import assert from "node:assert/strict";
import { mkdirSync, writeFileSync } from "node:fs";
import { withBrowser, closeWithTimeout } from "./browser-runtime.mjs";

const base = process.env.DOCS_URL ?? "http://127.0.0.1:5180";
const out = "test-results/consumer-migration";
mkdirSync(out, { recursive: true });
const report = { base, startedAt: new Date().toISOString(), checks: [], errors: [] };
const only = process.argv.find(arg => arg.startsWith("--only="))?.slice(7).split(",");
const checks = { virtualList, dataTable, sparkline, scrollArea, menu, popupPositioning };
if (only?.some(name => !(name in checks))) throw new Error("unknown consumer regression selection");
const settle = page => page.waitForTimeout(180);
const until = async (predicate, label) => {
  for (let attempt = 0; attempt < 60; attempt++) {
    if (await predicate()) return;
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  throw new Error(`did not settle: ${label}`);
};
async function visit(page, slug, demo, theme) {
  await page.goto(`${base}/playground/${slug}?theme=${theme}#demo-${demo}`, { waitUntil: "networkidle" });
  const section = page.locator(`[data-demo="${demo}"]`);
  await section.waitFor();
  await page.evaluate(() => document.fonts.ready);
  await section.scrollIntoViewIfNeeded();
  return section;
}
const position = list => list.evaluate(el => {
  const top = el.getBoundingClientRect().top;
  const row = [...el.querySelectorAll('[data-slot="virtual-list-item"]')].find(row => row.getBoundingClientRect().bottom > top + 1);
  return { name: row?.querySelector("span")?.textContent, y: row?.getBoundingClientRect().top - top, count: el.querySelectorAll('[data-slot="virtual-list-item"]').length };
});
async function virtualList(page, theme) {
  const section = await visit(page, "virtual-list", "dynamic", theme);
  const list = section.getByRole("list", { name: "检查记录" });
  await section.getByRole("button", { name: "查看中段" }).click();
  await settle(page);
  const before = await position(list);
  await section.getByRole("button", { name: "更早记录" }).click();
  await settle(page);
  const after = await position(list);
  assert.equal(after.name, before.name, "prepend keeps reading key");
  assert.ok(Math.abs(after.y - before.y) <= 2, JSON.stringify({ before, after }));
  // Simulate delayed above-viewport content growth while the reader remains still.
  const grew = await list.evaluate(el => {
    const top = el.getBoundingClientRect().top;
    const row = [...el.querySelectorAll('[data-slot="virtual-list-item"]')].find(row => row.getBoundingClientRect().bottom <= top);
    if (!row) return false;
    row.style.paddingBottom = "80px";
    return true;
  });
  assert.ok(grew, "overscan supplies an above-viewport measured row");
  await settle(page);
  const resized = await position(list);
  assert.equal(resized.name, after.name);
  assert.ok(Math.abs(resized.y - after.y) <= 2, JSON.stringify({ after, resized }));
  await section.getByRole("button", { name: "跳到最新" }).click();
  const atEnd = () => list.evaluate(el => Math.abs(el.scrollHeight - el.clientHeight - el.scrollTop) < 2);
  await until(atEnd, "measured scrollToEnd");
  await section.getByRole("button", { name: "新增记录" }).click();
  await until(atEnd, "follow append at measured end");
  await list.evaluate(el => { el.scrollTop -= 700; });
  await settle(page);
  const history = await position(list);
  await section.getByRole("button", { name: "新增记录" }).click();
  await settle(page);
  const retained = await position(list);
  assert.equal(retained.name, history.name);
  assert.ok(Math.abs(retained.y - history.y) <= 2);
  assert.ok(retained.count < 25, "bounded mounted window");
  await list.focus();
  await list.press("End");
  await until(() => list.evaluate(el => document.activeElement?.getAttribute("aria-posinset") === document.activeElement?.getAttribute("aria-setsize") && el.contains(document.activeElement)), "End focus");
  await page.keyboard.press("Home");
  await until(() => list.evaluate(el => el.contains(document.activeElement) && document.activeElement?.getAttribute("aria-posinset") === "1"), "Home focus");
  return { before, after, resized, history, retained };
}
async function dataTable(page, theme) {
  let section = await visit(page, "data-table", "instance", theme);
  const widths = await section.locator("col").evaluateAll(cols => cols.map(col => col.getBoundingClientRect().width));
  assert.ok(Math.abs(widths[0] - 240) < 2 && Math.abs(widths[1] - 120) < 2, JSON.stringify(widths));
  const groupWidth = await section.locator('th[scope="colgroup"]').evaluate(el => el.getBoundingClientRect().width);
  assert.ok(Math.abs(groupWidth - 360) < 2);
  const ellipsis = await section.locator('[data-slot="data-table-cell-content"]').first().evaluate(el => ({ title: el.title, text: el.textContent, overflow: getComputedStyle(el).textOverflow }));
  assert.equal(ellipsis.title, ellipsis.text);
  assert.equal(ellipsis.overflow, "ellipsis");
  section = await visit(page, "data-table", "window", theme);
  const table = section.locator('[data-slot="data-table"]');
  const viewport = section.locator('[data-slot="data-table-container"]');
  assert.equal(await table.getAttribute("aria-rowcount"), "501");
  const first = section.locator('tr[data-row-id="record-1"]');
  const regularHeight = await section.locator('tr[data-row-id="record-2"]').evaluate(el => el.getBoundingClientRect().height);
  const measuredHeights = await table.locator('tbody tr[data-row-id]').evaluateAll(rows => rows.map(el => el.getBoundingClientRect().height));
  assert.ok(Math.max(...measuredHeights) > Math.min(...measuredHeights) + 10, "variable note content determines real row height");
  await section.getByRole("checkbox", { name: "选择记录 001", exact: true }).click();
  assert.equal(await first.getAttribute("data-selected"), "true");
  assert.equal(await first.getAttribute("data-active"), null);
  const checkboxPaint = await first.evaluate(el => getComputedStyle(el).backgroundColor);
  await section.getByRole("radio", { name: "行底色", exact: true }).click();
  const rowPaint = await first.evaluate(el => getComputedStyle(el).backgroundColor);
  assert.notEqual(rowPaint, checkboxPaint);
  await section.getByRole("textbox", { name: "记录 001的草稿", exact: true }).fill("保留编辑");
  assert.equal(await first.getAttribute("data-active"), null);
  await viewport.evaluate(el => { el.scrollTop = 16000; });
  await settle(page);
  assert.equal(await section.getByRole("textbox", { name: "记录 001的草稿", exact: true }).inputValue(), "保留编辑");
  assert.ok(await section.getByRole("textbox", { name: "记录 001的草稿", exact: true }).evaluate(el => document.activeElement === el));
  const indices = await table.locator("tbody tr[data-row-id]").evaluateAll(rows => rows.map(row => Number(row.dataset.index)));
  assert.ok(Math.max(...indices) > 200 && indices.length < 30, JSON.stringify(indices));
  await viewport.focus();
  await viewport.press("End");
  await until(() => table.evaluate(el => el.contains(document.activeElement) && document.activeElement?.getAttribute("data-row-id") === "record-500"), "table End");
  await page.keyboard.press("Enter");
  assert.match(await section.locator("output").textContent(), /当前：记录 500/);
  await page.keyboard.press("Home");
  await until(() => table.evaluate(el => document.activeElement?.getAttribute("data-row-id") === "record-1"), "table Home");
  await section.getByRole("button", { name: "移除记录 001", exact: true }).focus();
  await page.keyboard.press("Enter");
  assert.match(await section.locator("output").textContent(), /当前：记录 500/);
  assert.ok(await viewport.evaluate(el => document.activeElement === el), "removed focused action falls back to viewport");
  await section.getByRole("radio", { name: "紧凑", exact: true }).click();
  await settle(page);
  const compactHeight = await section.locator('tr[data-row-id="record-2"]').evaluate(el => el.getBoundingClientRect().height);
  assert.ok(compactHeight < regularHeight, JSON.stringify({ regularHeight, compactHeight }));
  const geometry = await viewport.evaluate(el => ({ width: el.clientWidth, scrollWidth: el.scrollWidth, pageWidth: document.documentElement.scrollWidth, windowWidth: innerWidth }));
  assert.ok(geometry.scrollWidth > geometry.width);
  assert.ok(geometry.pageWidth <= geometry.windowWidth + 2, JSON.stringify(geometry));
  return { widths, groupWidth, ellipsis, indices, geometry, measuredHeights, regularHeight, compactHeight };
}
async function sparkline(page, theme) {
  const section = await visit(page, "sparkline", "point-readout", theme);
  const trigger = section.locator('[data-slot="sparkline-trigger"]');
  const tooltip = page.locator('[data-slot="sparkline-tooltip"]');
  await trigger.focus();
  await trigger.press("Home");
  await trigger.press("ArrowRight");
  await trigger.press("ArrowRight");
  await tooltip.waitFor();
  assert.match(await tooltip.textContent(), /11:00.*未知/);
  await trigger.press("ArrowRight");
  await trigger.press("ArrowRight");
  assert.match(await tooltip.textContent(), /13:00.*0 次/);
  const hit = await tooltip.evaluate(el => {
    const r = el.getBoundingClientRect();
    return { hit: el.contains(document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2)), portaled: !el.closest('[data-demo="point-readout"]'), rect: { x:r.x,y:r.y,width:r.width,height:r.height } };
  });
  assert.ok(hit.hit && hit.portaled, JSON.stringify(hit));
  await trigger.blur();
  const box = await trigger.boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await tooltip.waitFor();
  const popup = await tooltip.boundingBox();
  await page.mouse.move(popup.x + popup.width / 2, popup.y + popup.height / 2, { steps: 12 });
  await settle(page);
  assert.ok(await tooltip.isVisible(), "hover remains available inside tooltip");
  await page.keyboard.press("Escape");
  await until(async () => !(await tooltip.isVisible()), "tooltip Escape");
  await page.mouse.move(1, 1);
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  // A new pointer entry is an explicit new inspection; Escape within the same entry must stay closed.
  await tooltip.waitFor();
  await page.keyboard.press("Escape");
  await page.mouse.move(box.x + box.width / 2 + 1, box.y + box.height / 2);
  await settle(page);
  assert.equal(await tooltip.isVisible(), false, "Escape suppresses hovered reopen");
  return hit;
}
async function scrollArea(page, theme) {
  const section = await visit(page, "scroll-area", "styled-scrollbars", theme);
  const root = section.getByTestId("styled-scroll-area");
  const viewport = root.locator('[data-slot="scroll-area-viewport"]');
  const bars = root.locator('[data-slot="scroll-area-scrollbar"]');
  await until(async () => await bars.count() === 2, "two tracks");
  const thumbs = root.locator('[data-slot="scroll-area-thumb"]');
  for (let axis = 0; axis < 2; axis++) {
    const thumb = thumbs.nth(axis);
    const rect = await thumb.boundingBox();
    assert.ok(rect && rect.width > 0 && rect.height > 0);
    await page.mouse.move(rect.x + rect.width / 2, rect.y + rect.height / 2);
    await page.mouse.down();
    await page.mouse.move(rect.x + rect.width / 2 + (axis ? 100 : 0), rect.y + rect.height / 2 + (axis ? 0 : 100), { steps: 10 });
    await page.mouse.up();
  }
  const scrolled = await viewport.evaluate(el => ({ top: el.scrollTop, left: el.scrollLeft }));
  assert.ok(scrolled.top > 0 && scrolled.left > 0, JSON.stringify(scrolled));
  await root.locator('[data-slot="scroll-area-content"] > div').evaluate(el => { el.style.height = "100000px"; });
  await viewport.evaluate(el => { el.scrollTop = el.scrollHeight; });
  await settle(page);
  const endpoint = await bars.first().evaluate(el => {
    const track = el.getBoundingClientRect(), thumb = el.querySelector('[data-slot="scroll-area-thumb"]').getBoundingClientRect();
    return { bottom: thumb.bottom, trackBottom: track.bottom, height: thumb.height };
  });
  assert.ok(endpoint.bottom <= endpoint.trackBottom + 1 && endpoint.height >= 16, JSON.stringify(endpoint));
  await root.locator('[data-slot="scroll-area-content"] > div').evaluate(el => { el.style.cssText = "width:1px;min-width:0;height:1px;overflow:hidden"; });
  await until(() => bars.evaluateAll(els => els.every(el => getComputedStyle(el).visibility === "hidden" && getComputedStyle(el).pointerEvents === "none")), "overflow removal hides kept tracks");
  return { scrolled, endpoint };
}
async function menu(page, theme) {
  const section = await visit(page, "menu", "leading-markers", theme);
  const results = [];
  for (const dir of ["ltr", "rtl"]) {
    await page.evaluate(dir => document.documentElement.dir = dir, dir);
    await section.getByRole("button", { name: "显示选项", exact: true }).click();
    const popup = page.locator('[data-slot="menu-popup"]');
    await popup.waitFor();
    const align = await popup.evaluate((el, dir) => {
      const names = ["检查显示", "显示说明", "显示编号", "重置显示", "内容", "当前范围"];
      return names.map(name => {
        const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
        let node;
        while ((node = walker.nextNode())) if (node.textContent === name) {
          const range = document.createRange(); range.selectNode(node);
          const r = range.getBoundingClientRect(); return dir === "rtl" ? r.right : r.left;
        }
        throw new Error(`missing ${name}`);
      });
    }, dir);
    assert.ok(Math.max(...align) - Math.min(...align) <= 1, JSON.stringify({ dir, align }));
    await page.getByRole("menuitemcheckbox", { name: "显示编号", exact: true }).click();
    assert.equal(await page.getByRole("menuitemcheckbox", { name: "显示编号", exact: true }).getAttribute("aria-checked"), "true");
    await page.keyboard.press("Escape");
    results.push({ dir, align });
  }
  await page.evaluate(() => document.documentElement.dir = "ltr");
  return results;
}
async function popupPositioning(page, theme) {
  const results = [];
  for (const [slug, demo, label, role, close] of [
    ["dialog", "field", "编辑名称", "dialog", "关闭"],
    ["alert-dialog", "confirmation", "清空输入", "alertdialog", "返回"],
  ]) {
    const section = await visit(page, slug, demo, theme);
    const trigger = section.getByRole("button", { name: label, exact: true });
    await trigger.click();
    const popup = page.getByRole(role);
    await popup.waitFor();
    await settle(page);
    const observation = await popup.evaluate(el => {
      const child = document.createElement("span");
      child.style.cssText = "position:absolute;inset:0 auto auto 0;width:1px;height:1px";
      el.append(child);
      const fixed = child.offsetParent === el;
      const original = el.style.position;
      el.style.position = "static";
      const negativeControl = child.offsetParent !== el;
      el.style.position = original;
      const restored = child.offsetParent === el;
      child.remove();
      const r = el.getBoundingClientRect();
      // The modal viewport excludes the document's reserved scrollbar gutter.
      const viewport = el.parentElement.getBoundingClientRect();
      return { fixed, negativeControl, restored, centered: Math.abs(r.x + r.width / 2 - viewport.x - viewport.width / 2) < 2 };
    });
    assert.ok(Object.values(observation).every(Boolean), JSON.stringify(observation));
    await popup.getByRole("button", { name: close, exact: true }).click();
    await popup.waitFor({ state: "hidden" });
    await until(() => trigger.evaluate(el => document.activeElement === el), "modal focus return after close");
    assert.ok(await trigger.evaluate(el => document.activeElement === el));
    results.push({ slug, ...observation });
  }
  return results;
}
try {
  await withBrowser(async (browser, lifecycle) => {
    report.lifecycle = lifecycle;
    const context = await browser.newContext({ viewport: { width: 1200, height: 900 }, reducedMotion: "reduce" });
    try {
      const page = await context.newPage();
      page.setDefaultTimeout(10000);
      page.on("pageerror", error => report.errors.push(error.message));
      page.on("console", message => { if (message.type() === "error") report.errors.push(message.text()); });
      for (const width of [1200, 390]) for (const theme of ["light", "dark"]) {
        await page.setViewportSize({ width, height: 900 });
        for (const [name, check] of Object.entries(checks)) {
          if (only && !only.includes(name)) continue;
          const entry = { name, width, theme };
          try { entry.details = await check(page, theme); entry.status = "PASS"; }
          catch (error) { entry.status = "FAIL"; entry.error = error.stack; }
          report.checks.push(entry);
          console.log(`${entry.status} ${name} ${width} ${theme}${entry.error ? `: ${entry.error}` : ""}`);
          await page.screenshot({ path: `${out}/${name}-${width}-${theme}.png` });
        }
      }
    } finally { await closeWithTimeout(context, "desktop context"); }
    if (!only || only.includes("sparkline")) {
      const touch = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, reducedMotion: "reduce" });
      let touchPage;
      try {
        const page = touchPage = await touch.newPage();
        page.setDefaultTimeout(10000);
        page.on("pageerror", error => report.errors.push(error.message));
        await page.exposeFunction("recordConsumerTouch", event => { (report.touchEvents ??= []).push(event); });
        await page.addInitScript(() => {
          for (const type of ["pointerdown", "pointerup", "pointercancel", "click"]) document.addEventListener(type, event => {
            window.recordConsumerTouch({ type, slot: event.target instanceof Element ? event.target.closest("[data-slot]")?.getAttribute("data-slot") : null, x: event.clientX, y: event.clientY, pointer: event.pointerType, scrollY });
          }, true);
        });
        const section = await visit(page, "sparkline", "point-readout", "light");
        const trigger = section.locator('[data-slot="sparkline-trigger"]');
        const snapshot = () => trigger.evaluate(el => {
          const r = el.getBoundingClientRect();
          return { rect: { x: r.x, y: r.y, width: r.width, height: r.height }, scrollY, viewport: { width: innerWidth, height: innerHeight, scale: visualViewport?.scale }, hit: el.contains(document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2)) };
        });
        report.touchBefore = await snapshot();
        const tooltip = page.locator('[data-slot="sparkline-tooltip"]');
        // Actionability checks track late hash scrolling/layout; raw stale viewport
        // coordinates cannot establish that the intended control received the tap.
        await trigger.tap();
        await tooltip.waitFor();
        report.touchOpen = await snapshot();
        await page.screenshot({ path: `${out}/sparkline-touch-open.png` });
        await trigger.tap();
        await until(async () => !(await tooltip.isVisible()), "same-point second tap dismisses");
        report.checks.push({ name: "sparkline touch toggle", status: "PASS" });
      } catch (error) {
        if (touchPage) await touchPage.screenshot({ path: `${out}/sparkline-touch-failure.png` }).catch(() => {});
        throw error;
      } finally { await closeWithTimeout(touch, "touch context"); }
    }
  });
} catch (error) { report.errors.push(error.stack); }
report.finishedAt = new Date().toISOString();
writeFileSync(`${out}/report.json`, JSON.stringify(report, null, 2) + "\n");
for (const error of report.errors) console.error(error);
if (report.errors.length || report.checks.some(check => check.status !== "PASS")) process.exitCode = 1;

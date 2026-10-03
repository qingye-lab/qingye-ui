// Focused browser regressions for loading, late results, reading and dimensions.
// Requires the docs Vite development server for the test-only TSX fixture.
// DOCS_URL=http://localhost:5180 node scripts/verify-review-regressions.mjs
import assert from "node:assert/strict";
import { mkdirSync, writeFileSync } from "node:fs";
import { withBrowser, closeWithTimeout } from "./browser-runtime.mjs";

const base = process.env.DOCS_URL ?? "http://localhost:5180";
const out = "test-results/review-regressions";
mkdirSync(out, { recursive: true });
const evidence = { base, startedAt: new Date().toISOString(), checks: [], errors: [] };
const record = (name, details) => { evidence.checks.push({ name, details }); console.log(`PASS ${name}`); };

async function visit(page, path) {
  await page.goto(`${base}${path}`, { waitUntil: "networkidle" });
  await page.locator("main").waitFor();
  await page.evaluate(() => document.fonts.ready);
}

try {
  await withBrowser(async (browser, lifecycle) => {
    evidence.lifecycle = lifecycle;
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: "reduce" });
    try {
      const page = await context.newPage();
      page.on("pageerror", (error) => evidence.errors.push(error.message));
      page.on("console", (message) => { if (message.type() === "error") evidence.errors.push(message.text()); });
      await visit(page, "/playground/button?theme=light");
      await page.evaluate(async () => {
        const { mountReviewRegressions } = await import("/test/fixtures/review-regressions.tsx");
        const host = document.createElement("section");
        host.id = "review-regressions";
        host.style.cssText = "position:fixed;inset:24px auto auto 24px;z-index:1000;background:var(--background);padding:16px";
        document.body.append(host);
        window.reviewRegressions = mountReviewRegressions(host);
      });
      const trigger = page.getByRole("button", { name: "等待中的菜单" });
      await trigger.waitFor();
      await trigger.focus();
      // Use real mouse events: locator.click deliberately refuses aria-disabled.
      const box = await trigger.boundingBox();
      assert.ok(box);
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
      assert.equal(await trigger.getAttribute("aria-expanded"), "false");
      for (const key of ["ArrowDown", "ArrowUp", "Enter", "Space"]) {
        await trigger.press(key);
        assert.equal(await trigger.getAttribute("aria-expanded"), "false", key);
      }
      assert.equal(await trigger.evaluate((element) => document.activeElement === element), true);
      await page.keyboard.press("Tab");
      assert.equal(await page.getByRole("button", { name: "下一个控件" }).evaluate((element) => document.activeElement === element), true);
      await page.evaluate(() => window.reviewRegressions.setLoading(false));
      await trigger.click();
      await page.getByRole("menuitem", { name: "菜单操作" }).waitFor();
      await page.keyboard.press("Escape");
      record("loading menu blocks pointer and keyboard activation, retains focus and recovers", {});

      for (const mode of ["string", "object"]) {
        for (const success of [true, false]) {
          await page.evaluate((mode) => window.reviewRegressions.startPromise(mode), mode);
          await page.locator('[data-slot="toast-root"][data-type="unknown"]').waitFor();
          assert.equal(await page.getByText("操作结果尚未确认", { exact: true }).count(), 1);
          await page.evaluate((success) => window.reviewRegressions.settle(success), success);
          const toast = page.locator(`[data-slot="toast-root"][data-type="${success ? "success" : "error"}"]`);
          await toast.waitFor();
          const text = await toast.textContent();
          assert.ok(text.includes(success ? "上传完成" : "上传失败"));
          assert.ok(!text.includes("操作结果尚未确认") && !text.includes("请在任务页面核对结果"));
          record(`late ${mode} promise ${success ? "success" : "failure"} clears unknown presentation`, { text });
          await page.evaluate(() => window.reviewRegressions.closeToasts());
          await page.locator('[data-slot="toast-root"]').waitFor({ state: "detached" });
        }
      }
      await page.evaluate(() => window.reviewRegressions.dispose());

      for (const width of [1280, 390]) {
        await page.setViewportSize({ width, height: 900 });
        await visit(page, "/examples/mail");
        await page.getByRole("tab", { name: "未读", exact: true }).click();
        for (const [subject, remaining] of [["山间 · 新一季品牌视觉", 1], ["FIELD 网站 · 第一轮反馈", 0]]) {
          await page.getByRole("button", { name: `阅读${subject}`, exact: true }).click();
          await page.locator(".mail-letter").waitFor();
          assert.ok((await page.locator(".mail-letter").textContent()).includes(subject));
          assert.equal(await page.locator(".mail-message-row").count(), remaining);
          if (width === 390) await page.getByRole("button", { name: "返回邮件列表" }).click();
        }
        await page.getByRole("tab", { name: "全部邮件", exact: true }).click();
        assert.equal(await page.locator(".mail-letter").count(), 0);
        record(`unread mail remains readable at ${width}px`, {});
        for (const theme of ["light", "dark"]) {
          for (const [slug, selector, expected] of [
            ["toggle", '[data-slot="toggle"]', width < 640 ? 16 : 14],
            ["tabs", '[data-slot="tabs-tab"]', width < 640 ? 16 : 14],
            ["tag-input", '[data-slot="tag-input-tag"]', width < 640 ? 14 : 12],
          ]) {
            await visit(page, `/playground/${slug}?theme=${theme}`);
            const sample = await page.locator(selector).first().evaluate((element) => ({ size: parseFloat(getComputedStyle(element).fontSize), weight: getComputedStyle(element).fontWeight }));
            assert.equal(sample.size, expected, `${slug} ${width} ${theme}`);
            assert.equal(sample.weight, "500", `${slug} preserves emphasis`);
            const role = slug === "tag-input" ? "dense" : "support";
            const override = await page.evaluate(({ selector, role }) => {
              document.documentElement.style.setProperty(`--qy-text-${role}-mobile-size`, "19px");
              document.documentElement.style.setProperty(`--qy-text-${role}-size`, "15px");
              return parseFloat(getComputedStyle(document.querySelector(selector)).fontSize);
            }, { selector, role });
            assert.equal(override, width < 640 ? 19 : 15, `${slug} consumes the responsive size role`);
            record(`${slug} responsive typography ${width}px ${theme}`, { ...sample, override });
          }
          await visit(page, `/playground/table?theme=${theme}`);
          await page.screenshot({ path: `${out}/table-${width}-${theme}.png`, fullPage: false });
          const measurements = await page.evaluate(() => {
            const containers = [...document.querySelectorAll('[data-slot="table-container"]')];
            const read = (container) => ({ density: container.dataset.density, height: container.querySelector("th").getBoundingClientRect().height });
            const natural = containers.map(read);
            // Isolate the minimum from mobile headers that legitimately wrap.
            for (const container of containers) for (const head of container.querySelectorAll("thead th")) head.textContent = "列";
            const before = containers.map(read);
            for (const container of containers) {
              container.style.setProperty("--qy-row-default", "80px");
              container.style.setProperty("--qy-row-compact", "64px");
            }
            const after = containers.map(read);
            const table = containers[0].querySelector("table");
            table.style.cssText = "table-layout:fixed;width:320px";
            table.querySelector("th").textContent = "需要完整阅读的中文列标题".repeat(12);
            const wrappedHeight = table.querySelector("th").getBoundingClientRect().height;
            return { natural, before, after, wrappedHeight };
          });
          assert.ok(measurements.before.some((sample) => sample.density === "compact"));
          for (const sample of measurements.natural) assert.ok(sample.height >= (sample.density === "compact" ? 36 : 40) - 1, JSON.stringify(measurements));
          for (const sample of measurements.before) assert.ok(Math.abs(sample.height - (sample.density === "compact" ? 36 : 40)) < 1, JSON.stringify(measurements));
          for (const sample of measurements.after) assert.ok(Math.abs(sample.height - (sample.density === "compact" ? 56 : 72)) < 1, JSON.stringify(measurements));
          assert.ok(measurements.wrappedHeight > 72, "long headings must grow beyond the token minimum");
          record(`table header density and theme overrides ${width}px ${theme}`, measurements);
        }
      }
      assert.deepEqual(evidence.errors, []);
    } finally { await closeWithTimeout(context, "review regression context"); }
  });
} catch (error) {
  evidence.errors.push(error.stack ?? error.message);
  process.exitCode = 1;
} finally {
  evidence.completedAt = new Date().toISOString();
  writeFileSync(`${out}/runtime.json`, `${JSON.stringify(evidence, null, 2)}\n`);
  console.log(`${evidence.checks.length} passed checks; ${evidence.errors.length} errors; ${out}/runtime.json`);
  if (evidence.errors.length) console.error(evidence.errors.join("\n"));
}

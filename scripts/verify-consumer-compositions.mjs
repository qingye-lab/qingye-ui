// One task-owned browser/tab, reused serially. Requires docs dev or built preview.
// DOCS_URL=http://127.0.0.1:5180 node scripts/verify-consumer-compositions.mjs
import assert from "node:assert/strict";
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { withBrowser, closeWithTimeout } from "./browser-runtime.mjs";

const base = process.env.DOCS_URL ?? "http://127.0.0.1:5180";
const out = process.env.COMPOSITIONS_OUT ?? "test-results/consumer-compositions";
mkdirSync(out, { recursive: true });
const report = { base, startedAt: new Date().toISOString(), checks: [], errors: [], screenshots: [] };
const record = (name, details = {}) => { report.checks.push({ name, details }); console.log(`PASS ${name}`); };

try {
  await withBrowser(async (browser, lifecycle) => {
    report.lifecycle = lifecycle;
    const context = await browser.newContext({ viewport: { width: 1440, height: 960 }, reducedMotion: "reduce" });
    try {
      const page = await context.newPage();
      await page.addInitScript(() => {
        const theme = new URL(location.href).searchParams.get("theme");
        if (theme === "light" || theme === "dark") localStorage.setItem("yq-theme", theme);
      });
      page.on("pageerror", error => report.errors.push(`${page.url()}: ${error.message}`));
      page.on("console", message => { if (message.type() === "error") report.errors.push(`${page.url()}: ${message.text()}`); });
      async function visit(path) {
        await page.goto(`${base}${path}`, { waitUntil: "networkidle" });
        await page.evaluate(() => document.fonts.ready);
      }
      async function shot(name) {
        const path = `${out}/${name}.png`;
        await page.screenshot({ path, fullPage: true });
        report.screenshots.push(path);
      }
      async function accessibility(name) {
        await page.addScriptTag({ path: fileURLToPath(new URL("../node_modules/axe-core/axe.min.js", import.meta.url)) });
        const violations = await page.evaluate(async () => {
          const result = await window.axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] } });
          return result.violations.map(({ id, impact, nodes }) => ({ id, impact, elements: nodes.map(node => node.target) }));
        });
        assert.deepEqual(violations, [], `${name} automated accessibility`);
        record(`${name} automated accessibility including contrast`);
      }
      for (const width of [1440, 390]) {
        await page.setViewportSize({ width, height: 960 });
        for (const theme of ["light", "dark"]) {
          await visit(`/examples/records?theme=${theme}`);
          const workspace = page.locator('[data-slot="workspace"]');
          await workspace.waitFor();
          assert.equal(await page.evaluate(theme => document.documentElement.classList.contains(theme), theme), true);
          assert.equal(await page.getByRole("table", { name: "采集记录", exact: true }).count(), 1);
          const dimensions = await workspace.evaluate(element => {
            const scroll = element.querySelector('[data-slot="workspace-content"]');
            const table = element.querySelector('[data-slot="table-container"], [data-slot="data-table-container"]');
            return { pageOverflow: document.documentElement.scrollWidth - innerWidth, documentHeight: document.documentElement.scrollHeight, viewportHeight: innerHeight, workspaceOverflow: element.scrollWidth - element.clientWidth,
              scroller: { height: scroll.clientHeight, scrollHeight: scroll.scrollHeight, overflowY: getComputedStyle(scroll).overflowY },
              table: { height: table.clientHeight, scrollHeight: table.scrollHeight, scrollWidth: table.scrollWidth, width: table.clientWidth },
              headerTop: element.querySelector('[data-slot="workspace-header"]').getBoundingClientRect().top };
          });
          assert.ok(dimensions.pageOverflow <= 1, `page overflow ${width} ${theme}: ${JSON.stringify(dimensions)}`);
          assert.ok(dimensions.documentHeight <= dimensions.viewportHeight + 1, "vertical scrolling stays inside workspace content");
          assert.ok(dimensions.workspaceOverflow <= 1, `workspace overflow ${width} ${theme}`);
          assert.equal(dimensions.scroller.overflowY, "auto");
          assert.ok(dimensions.table.scrollHeight <= dimensions.table.height + 1, "table adds no vertical scroll owner");
          const scroller = workspace.locator('[data-slot="workspace-content"]');
          if (width === 390) {
            assert.equal(await scroller.getAttribute("tabindex"), "0");
            await scroller.focus();
            await scroller.press("PageDown");
            await page.waitForFunction(() => document.querySelector('[data-slot="workspace-content"]').scrollTop > 0);
            assert.equal(await page.evaluate(() => scrollY), 0);
          }
          await scroller.evaluate(node => { node.scrollTop = node.scrollHeight; });
          const headerAfter = await workspace.locator('[data-slot="workspace-header"]').evaluate(node => node.getBoundingClientRect().top);
          assert.equal(headerAfter, dimensions.headerTop);
          await scroller.evaluate(node => { node.scrollTop = 0; });
          const recordNameWidth = await page.locator('[data-row-id="record-1"] th').evaluate(node => node.getBoundingClientRect().width);
          assert.ok(recordNameWidth >= 160, "record title keeps useful reading width; table owns horizontal overflow");
          await shot(`records-${theme}-${width}`);
          record(`workspace geometry ${width} ${theme}`, dimensions);
          await accessibility(`workspace ${width} ${theme}`);
        }
      }
      await page.setViewportSize({ width: 1440, height: 960 });
      await visit("/examples/records?theme=light");
      const all = page.getByRole("checkbox", { name: "选择本页记录", exact: true });
      await all.click();
      assert.equal(await page.locator('[data-row-id][data-selected="true"]').count(), 10);
      const next = page.getByRole("button", { name: "下一页", exact: true });
      await next.click();
      assert.equal(await all.getAttribute("aria-checked"), "false");
      await all.click();
      assert.ok((await page.getByText("已选 20 份（含其他页）", { exact: true }).textContent()).includes("20"));
      await page.getByRole("button", { name: "上一页", exact: true }).click();
      assert.equal(await all.getAttribute("aria-checked"), "true");
      record("page select-all preserves IDs on other pages");

      const note = page.getByRole("textbox", { name: "本地备注", exact: true });
      await note.fill("保留这份待核对的草稿");
      await page.getByRole("button", { name: "详情", exact: true }).click();
      assert.equal(await page.getByRole("complementary", { name: "记录详情" }).count(), 0);
      await page.getByRole("button", { name: "详情", exact: true }).click();
      assert.equal(await note.inputValue(), "保留这份待核对的草稿");
      const search = page.getByRole("searchbox", { name: "搜索采集记录" });
      await search.fill("不存在的记录");
      await page.getByText("没有匹配的记录", { exact: true }).waitFor();
      assert.equal(await page.getByRole("button", { name: "下一页", exact: true }).isDisabled(), true);
      assert.equal(await note.inputValue(), "保留这份待核对的草稿");
      assert.equal(await page.getByRole("complementary", { name: "记录详情" }).count(), 1);
      await search.fill("");
      await page.getByRole("button", { name: "紧凑", exact: true }).click();
      assert.equal(await page.locator('[data-density="compact"] [data-slot="workspace"]').count(), 1);
      record("list/detail, filtering, zero results and density retain active draft");
      await shot("records-interactions");

      await visit("/playground/async-content?theme=light");
      const retained = page.locator('[data-demo="retained"]');
      const input = retained.getByRole("textbox", { name: "本地备注" });
      await input.fill("刷新前输入");
      await input.evaluate(node => { window.retainedInput = node; });
      await retained.getByRole("button", { name: "刷新记录", exact: true }).click();
      assert.equal(await input.inputValue(), "刷新前输入");
      assert.equal(await retained.locator('[data-slot="async-content-body"]').getAttribute("aria-busy"), "true");
      await input.focus();
      // A background result changes state without the user clicking away from the input.
      await retained.getByRole("button", { name: "连接中断", exact: true }).evaluate(node => node.click());
      await retained.getByRole("alert").waitFor();
      assert.equal(await input.evaluate(node => node === window.retainedInput && node === document.activeElement), true);
      assert.equal(await input.inputValue(), "刷新前输入");
      await retained.getByRole("button", { name: "重试", exact: true }).click();
      await retained.getByRole("button", { name: "收到新结果", exact: true }).click();
      assert.equal(await input.inputValue(), "刷新前输入");
      record("refresh error and retry preserve content identity, draft and focus");
      await shot("async-content-retained");

      await visit("/playground/combobox?theme=light");
      const choice = page.locator('[data-demo="choice"]');
      const combo = choice.getByRole("combobox");
      assert.equal(await combo.inputValue(), "陈致远");
      await combo.fill("李");
      await page.getByRole("option", { name: "李一鸣", exact: true }).waitFor();
      assert.equal(await choice.locator("form").evaluate(form => new FormData(form).get("owner")), "陈致远");
      await combo.press("ArrowDown");
      await combo.press("Enter");
      assert.equal(await combo.inputValue(), "李一鸣");
      await choice.getByRole("button", { name: "清除选择", exact: true }).click();
      assert.equal(await combo.inputValue(), "");
      const states = page.locator('[data-demo="density"]');
      assert.equal(await states.getByRole("combobox", { name: "只读候选" }).getAttribute("readonly"), "");
      assert.equal(await states.getByRole("combobox", { name: "禁用候选" }).isDisabled(), true);
      record("combobox query draft, keyboard choice, clear, read-only and disabled");

      await visit("/playground/confirm?theme=light");
      const decision = page.locator('[data-demo="decision"]');
      const leave = decision.getByRole("button", { name: "离开草稿", exact: true });
      await leave.click();
      await page.getByRole("alertdialog", { name: "离开草稿？", exact: true }).waitFor();
      await page.keyboard.press("Escape");
      await page.getByRole("alertdialog").waitFor({ state: "detached" });
      assert.equal(await leave.evaluate(node => node === document.activeElement), true);
      await decision.getByText("决定：继续编辑", { exact: true }).waitFor();
      await leave.click();
      await page.getByRole("button", { name: "离开", exact: true }).click();
      await page.getByRole("alertdialog").waitFor({ state: "detached" });
      await decision.getByText("决定：离开草稿", { exact: true }).waitFor();
      const submission = page.locator('[data-demo="submission"]');
      const draft = submission.getByRole("textbox", { name: "草稿内容", exact: true });
      await draft.fill("提交失败后仍可恢复");
      const submit = submission.getByRole("button", { name: "提交草稿", exact: true });
      await submit.click();
      await page.getByRole("button", { name: "提交", exact: true }).click();
      await page.getByRole("alertdialog").waitFor({ state: "detached" });
      assert.equal(await submit.getAttribute("aria-busy"), "true");
      await submission.getByRole("button", { name: "返回失败", exact: true }).click();
      await submission.getByRole("alert").waitFor();
      assert.equal(await draft.inputValue(), "提交失败后仍可恢复");
      assert.equal(await submit.isEnabled(), true);
      record("confirm Escape restores focus, positive decision and caller-owned busy/failure");
      await shot("confirm-failure-recovery");

      // Assert page rendering and runtime health for each changed public entry.
      for (const slug of ["data-table", "pagination", "combobox", "confirm"]) {
        await visit(`/playground/${slug}?theme=dark`);
        assert.ok(await page.locator("[data-demo]").count() > 0, `${slug} examples exist`);
        assert.equal(await page.getByText("示例暂时无法显示", { exact: true }).count(), 0);
        await shot(`${slug}-dark`);
        record(`${slug} examples render`);
        await accessibility(`${slug} dark`);
      }
      assert.deepEqual(report.errors, []);
    } finally {
      await closeWithTimeout(context, "consumer compositions context");
    }
  });
} catch (error) {
  report.failure = String(error.stack ?? error);
  throw error;
} finally {
  writeFileSync(`${out}/report.json`, JSON.stringify(report, null, 2) + "\n");
}

import test, { before, after, afterEach } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";
import { act, createElement } from "react";

const requireUI = createRequire(new URL("../../../packages/ui/package.json", import.meta.url));
const { JSDOM } = requireUI("jsdom");
let server, dom, root, createRoot, DashboardDemo, MailDemo, StudioDemo, finance, mailState;
before(async () => {
  dom = new JSDOM('<div id="mount"></div>', { url: "http://localhost/", pretendToBeVisual: true });
  for (const name of ["window", "document", "navigator", "history", "sessionStorage", "HTMLElement", "HTMLInputElement", "HTMLTextAreaElement", "HTMLButtonElement", "Element", "Node", "ShadowRoot", "MutationObserver", "Event", "MouseEvent", "FocusEvent"]) {
    Object.defineProperty(globalThis, name, { value: dom.window[name], configurable: true });
  }
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  globalThis.getComputedStyle = dom.window.getComputedStyle.bind(dom.window);
  globalThis.requestAnimationFrame = dom.window.requestAnimationFrame.bind(dom.window);
  globalThis.cancelAnimationFrame = dom.window.cancelAnimationFrame.bind(dom.window);
  dom.window.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} });
  globalThis.matchMedia = dom.window.matchMedia;
  globalThis.ResizeObserver = class { observe() {} unobserve() {} disconnect() {} };
  dom.window.Element.prototype.scrollIntoView = () => {};
  dom.window.Element.prototype.getAnimations = () => [];
  ({ createRoot } = await import("react-dom/client"));
  server = await createServer({ root: fileURLToPath(new URL("..", import.meta.url)), server: { middlewareMode: true, hmr: false, ws: false }, appType: "custom", logLevel: "error" });
  ({ DashboardDemo } = await server.ssrLoadModule("/src/examples/dashboard.tsx"));
  ({ MailDemo } = await server.ssrLoadModule("/src/examples/mail.tsx"));
  ({ StudioDemo } = await server.ssrLoadModule("/src/examples/studio.tsx"));
  finance = await server.ssrLoadModule("/src/examples/dashboard-data.ts");
  mailState = await server.ssrLoadModule("/src/examples/mail-state.ts");
});
afterEach(async () => {
  if (root) await act(() => root.unmount());
  root = undefined;
  document.getElementById("mount").innerHTML = "";
  sessionStorage.clear();
});
after(async () => { await server?.close(); dom?.window.close(); });

async function mount(Component, props = {}) {
  root = createRoot(document.getElementById("mount"));
  await act(() => root.render(createElement(Component, props)));
  await act(async () => { await new Promise((resolve) => setTimeout(resolve, 40)); });
}
async function click(element) {
  assert.ok(element, "The action exists");
  await act(async () => { element.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true })); });
}
async function input(element, value) {
  assert.ok(element, "The input exists");
  const prototype = element.tagName === "TEXTAREA" ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
  await act(() => {
    Object.getOwnPropertyDescriptor(prototype, "value").set.call(element, value);
    element.dispatchEvent(new Event("input", { bubbles: true }));
    element.dispatchEvent(new Event("change", { bubbles: true }));
  });
}
const button = (text) => [...document.querySelectorAll("button")].find((element) => element.textContent.trim() === text);

test("C27: monthly and quarterly sums share one source and never rescale money", () => {
  for (const month of [7, 8, 9]) {
    const monthly = finance.revenueThroughMonth(month, "month");
    const quarters = finance.revenueThroughMonth(month, "quarter");
    assert.equal(monthly.length, month);
    assert.equal(monthly.reduce((n, row) => n + row.revenue, 0), quarters.reduce((n, row) => n + row.revenue, 0));
    assert.equal(monthly[0].revenue, 15000);
  }
  assert.deepEqual(finance.revenueThroughMonth(9, "quarter").map((row) => row.revenue), [71000, 104000, 175430]);
  assert.match(finance.revenueThroughMonth(7, "quarter")[2].label, /截至7月/);
});

test("C33: counts deduplicate active clients and derive project count/completion from objects", async () => {
  assert.deepEqual(finance.projectMetrics([{ client: "A", status: "active" }, { client: "A", status: "active" }, { client: "B", status: "complete" }]), {
    activeClients: 1, activeProjects: 2, complete: 1, completionRate: "33.3%",
  });
  assert.equal(finance.projectMetrics([]).completionRate, "—");
  await mount(DashboardDemo);
  assert.deepEqual([...document.querySelectorAll('[data-slot="stat-value"]')].map((element) => element.textContent), ["¥ 350,430", "3", "3", "25%"]);
  assert.ok(document.body.textContent.includes("已完成 1 / 全部 4 个项目"));
  assert.ok(!document.querySelector(".dashboard-metrics [data-slot=card], .revenue-panel[data-slot=card], .progress-panel[data-slot=card], .projects-panel[data-slot=card]"));
  await click(button("客户"));
  assert.equal(document.querySelectorAll(".client-card[data-slot=card]").length, 4);
});

test("C28/C34: failure and forbidden states do not report zero or success; retry recovers the local collection", async () => {
  for (const [Component, noun] of [[DashboardDemo, "项目"], [MailDemo, "邮件"], [StudioDemo, "资源"]]) {
    await mount(Component, { initialDataState: "error" });
    assert.ok(document.body.textContent.includes(`${noun}加载失败`));
    assert.equal(document.querySelectorAll('[data-slot="sidebar-menu-badge"]').length, 0);
    await click(button("重试"));
    assert.ok(!document.body.textContent.includes(`${noun}加载失败`));
    await act(() => root.unmount()); root = undefined;
    await mount(Component, { initialDataState: "forbidden" });
    assert.ok(document.body.textContent.includes(`无权查看${noun}`));
    assert.equal(button("重试"), undefined);
    assert.equal(document.querySelectorAll('[data-slot="sidebar-menu-badge"]').length, 0);
    await act(() => root.unmount()); root = undefined;
  }
});

test("empty collections report zero and retain an available next action", async () => {
  for (const [Component, noun] of [[DashboardDemo, "项目"], [MailDemo, "邮件"], [StudioDemo, "资源"]]) {
    await mount(Component, { initialDataState: "empty" });
    assert.ok(document.body.textContent.includes(`没有${noun}`));
    assert.equal(document.querySelectorAll(".mail-message-row, .studio-work, .project-table tbody tr").length, 0);
    await act(() => root.unmount()); root = undefined;
  }
});

test("C29: all three searches ignore case and unmatched searches expose 清除筛选", async () => {
  for (const [Component, selector, rowSelector, query, expected] of [
    [DashboardDemo, '[aria-label="搜索项目"]', ".project-table tbody tr", "field", 1],
    [MailDemo, '[aria-label="搜索邮件"]', ".mail-message-row", "field", 1],
    [StudioDemo, '[aria-label="搜索资源"]', ".studio-work", "JPG", 6],
  ]) {
    await mount(Component);
    await input(document.querySelector(selector), query);
    assert.equal(document.querySelectorAll(rowSelector).length, expected);
    await input(document.querySelector(selector), "no-such-object");
    assert.equal(document.querySelectorAll(rowSelector).length, 0);
    await click(button("清除筛选"));
    assert.ok(document.querySelectorAll(rowSelector).length > 0);
    await act(() => root.unmount()); root = undefined;
  }
});

test("C31/C8: replies survive close, object/folder/search switches and remount without leaving a stale reader", async () => {
  await mount(MailDemo);
  await click(button("回复"));
  await input(document.querySelector('[aria-label="回复内容"]'), "给山间的草稿");
  await click(button("保留草稿"));
  await click(document.querySelector('[aria-label="阅读FIELD 网站 · 第一轮反馈"]'));
  await click(button("回复"));
  await input(document.querySelector('[aria-label="回复内容"]'), "给 FIELD 的草稿");
  await click(button("已发送"));
  await click(button("收件箱"));
  await input(document.querySelector('[aria-label="搜索邮件"]'), "no-such-mail");
  assert.equal(document.querySelector(".mail-letter"), null);
  assert.ok(!document.querySelector(".mail-layout.is-reading"));
  await input(document.querySelector('[aria-label="搜索邮件"]'), "");
  await click(document.querySelector('[aria-label="阅读山间 · 新一季品牌视觉"]'));
  await click(button("继续回复"));
  assert.equal(document.querySelector('[aria-label="回复内容"]').value, "给山间的草稿");
  await act(() => root.unmount()); root = undefined;
  await mount(MailDemo);
  await click(button("继续回复"));
  assert.equal(document.querySelector('[aria-label="回复内容"]').value, "给山间的草稿");
  assert.equal(JSON.parse(sessionStorage.getItem(mailState.MAIL_DRAFT_KEY)).replies.m2, "给 FIELD 的草稿");
});

test("opening unread mail keeps its reader after marking it read, including the last unread message", async () => {
  await mount(MailDemo);
  await click(button("未读"));
  assert.equal(document.querySelectorAll(".mail-message-row").length, 2);

  await click(document.querySelector('[aria-label="阅读山间 · 新一季品牌视觉"]'));
  assert.equal(document.querySelectorAll(".mail-message-row").length, 1);
  assert.ok(document.querySelector(".mail-letter")?.textContent.includes("山间 · 新一季品牌视觉"));
  assert.ok(document.querySelector(".mail-layout.is-reading"));
  await click(button("回复"));
  await input(document.querySelector('[aria-label="回复内容"]'), "未读邮件的回复草稿");
  await click(document.querySelector('[aria-label="返回邮件列表"]'));
  assert.ok(!document.querySelector(".mail-layout.is-reading"));

  await click(document.querySelector('[aria-label="阅读FIELD 网站 · 第一轮反馈"]'));
  assert.equal(document.querySelectorAll(".mail-message-row").length, 0);
  assert.ok(document.querySelector(".mail-letter")?.textContent.includes("FIELD 网站 · 第一轮反馈"));
  assert.ok(document.querySelector(".mail-layout.is-reading"));

  await click(button("全部邮件"));
  assert.equal(document.querySelector(".mail-letter"), null);
  assert.ok(!document.querySelector(".mail-layout.is-reading"));
  await click(document.querySelector('[aria-label="阅读山间 · 新一季品牌视觉"]'));
  await click(button("继续回复"));
  assert.equal(document.querySelector('[aria-label="回复内容"]').value, "未读邮件的回复草稿");
  await input(document.querySelector('[aria-label="搜索邮件"]'), "no-such-mail");
  assert.equal(document.querySelector(".mail-letter"), null);
});

test("C7/C28: older dates use the message; an outgoing reply targets the original recipient even after archiving", async () => {
  assert.match(mailState.formatMessageDate("2026-09-25"), /25/);
  assert.match(mailState.formatMessageDate("2026-09-28"), /28/);
  await mount(MailDemo);
  await click(button("已发送"));
  await click(document.querySelector('[aria-label="阅读Re: FIELD 网站 · 预览链接"]'));
  assert.match(document.querySelector(".mail-reader-toolbar time").textContent, /26/);
  await click(button("回复"));
  assert.equal(document.querySelector(".mail-reply-heading").textContent, "收件人：yihe@field.photo");
  await click(document.querySelector('[aria-label="归档当前邮件"]'));
  await click(button("归档"));
  await click(document.querySelector('[aria-label="阅读Re: FIELD 网站 · 预览链接"]'));
  await click(button("回复"));
  assert.equal(document.querySelector(".mail-reply-heading").textContent, "收件人：yihe@field.photo");
});

test("C31: blocked storage is a failure and is never treated as persisted", () => {
  const blocked = { getItem() { throw new Error("Denied"); }, setItem() { throw new Error("Quota"); } };
  assert.equal(mailState.readMailDrafts(blocked).failed, true);
  assert.equal(mailState.writeMailDrafts(blocked, mailState.emptyMailDrafts), false);
});

test("C34: failed previews retain the file, expose retry, and deletion requires confirmation", async () => {
  await mount(StudioDemo);
  await act(() => document.querySelector(".studio-work img").dispatchEvent(new Event("error")));
  assert.ok(document.querySelector(".studio-heading p").textContent.includes("6 个文件 · 1 个预览失败"));
  assert.ok(document.querySelector(".studio-work").textContent.includes("图片加载失败"));
  await click(button("重试"));
  assert.ok(document.querySelector(".studio-work img"));
  await click(document.querySelector('[aria-label="删除建筑空间.jpg"]'));
  assert.equal(document.querySelectorAll(".studio-work").length, 6);
  await click(button("取消"));
  assert.equal(document.querySelectorAll(".studio-work").length, 6);
  await click(document.querySelector('[aria-label="删除建筑空间.jpg"]'));
  await click(button("删除文件"));
  assert.equal(document.querySelectorAll(".studio-work").length, 5);
});

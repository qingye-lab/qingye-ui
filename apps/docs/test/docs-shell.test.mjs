import test, { before, after, afterEach } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";
import { act } from "react";
import { createRoot } from "react-dom/client";

const requireUI = createRequire(new URL("../../../packages/ui/package.json", import.meta.url));
const { JSDOM } = requireUI("jsdom");
let server, fixture, dom, root;
before(async () => {
  dom = new JSDOM('<div id="mount"></div>', { url: "http://localhost/", pretendToBeVisual: true });
  for (const name of ["window", "document", "navigator", "history", "sessionStorage", "HTMLElement", "HTMLInputElement", "HTMLButtonElement", "Element", "Node", "ShadowRoot", "MutationObserver", "Event", "MouseEvent", "FocusEvent"]) {
    Object.defineProperty(globalThis, name, { value: dom.window[name], configurable: true });
  }
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  globalThis.getComputedStyle = dom.window.getComputedStyle.bind(dom.window);
  globalThis.requestAnimationFrame = dom.window.requestAnimationFrame.bind(dom.window);
  globalThis.cancelAnimationFrame = dom.window.cancelAnimationFrame.bind(dom.window);
  dom.window.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} });
  globalThis.matchMedia = dom.window.matchMedia;
  globalThis.ResizeObserver = class { observe() {} unobserve() {} disconnect() {} };
  dom.window.scrollTo = () => {};
  dom.window.Element.prototype.scrollIntoView = () => {};
  server = await createServer({ root: fileURLToPath(new URL("..", import.meta.url)), server: { middlewareMode: true, hmr: false, ws: false }, appType: "custom", logLevel: "error" });
  fixture = await server.ssrLoadModule("/test/fixtures/docs-shell.tsx");
});
afterEach(async () => {
  if (root) await act(() => root.unmount());
  root = undefined;
  document.getElementById("mount").innerHTML = "";
});
after(async () => { await server?.close(); dom?.window.close(); });

test("route focus enters a heading when available and the main landmark otherwise", () => {
  const host = document.getElementById("mount");
  host.innerHTML = '<main><h1>当前页面</h1></main>';
  assert.equal(fixture.focusPageHeading(), true);
  assert.equal(document.activeElement.tagName, "H1");
  host.innerHTML = '<main aria-label="工作区"><section>没有页面标题的工作区</section></main>';
  assert.equal(fixture.focusPageHeading(), true);
  assert.equal(document.activeElement.tagName, "MAIN");
  host.innerHTML = '<main><section hidden><h1>隐藏的列表标题</h1></section><section>当前阅读内容</section></main>';
  assert.equal(fixture.focusPageHeading(), true);
  assert.equal(document.activeElement.tagName, "MAIN");
  host.innerHTML = '<main aria-busy="true"><h1>正在加载</h1></main>';
  assert.equal(fixture.focusPageHeading(), false);
  assert.notEqual(document.activeElement.tagName, "H1");
  host.innerHTML = "";
  assert.equal(fixture.focusPageHeading(), false);
});

test("arriving at a #hash moves focus to that section without scrolling again",() => {
  const host = document.getElementById("mount");
  host.innerHTML = '<main><h1>设计理念</h1><h3 id="method-7">07 以材为祖</h3></main>';
  assert.equal(fixture.focusHashTarget("#method-7"), true);
  assert.equal(document.activeElement.id, "method-7");
  assert.equal(document.activeElement.getAttribute("tabindex"), "-1");
  assert.equal(fixture.focusHashTarget("#method-99"), false);
  assert.equal(fixture.focusHashTarget("#%E0%A4%A"), false);
});

test("demo headings are reachable from the TOC, including after a text-only update", async () => {
  root = createRoot(document.getElementById("mount"));
  await act(() => root.render(fixture.articleScene("旧标题")));
  const href = '#demo-long-name';
  const link = () => document.querySelector(`nav a[href="${href}"]`);
  assert.equal(link().textContent, "旧标题");
  assert.equal(document.querySelector(href).tagName, "H3");
  await act(async () => {
    root.render(fixture.articleScene("很长的中文标题 Mixed English"));
    await new Promise((resolve) => setTimeout(resolve, 50));
  });
  // MutationObserver schedules its next scan after the text commit.
  await act(() => new Promise((resolve) => setTimeout(resolve, 50)));
  assert.equal(link().textContent, "很长的中文标题 Mixed English");
  assert.equal(fixture.scrollToHash(href), true);
  assert.equal(fixture.scrollToHash("#missing-demo"), false);
  assert.equal(fixture.scrollToHash("#%E0%A4%A"), false);
});

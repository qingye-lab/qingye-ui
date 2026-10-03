import test, { before, after, afterEach } from "node:test";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
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
  dom.window.scrollTo = () => {};
  dom.window.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} });
  globalThis.matchMedia = dom.window.matchMedia;
  globalThis.ResizeObserver = class { observe() {} unobserve() {} disconnect() {} };
  dom.window.Element.prototype.scrollIntoView = () => {};
  server = await createServer({ root: fileURLToPath(new URL("..", import.meta.url)), server: { middlewareMode: true, hmr: false, ws: false }, appType: "custom", logLevel: "error" });
  fixture = await server.ssrLoadModule("/test/fixtures/site-contracts.tsx");
});
afterEach(async () => {
  if (root) await act(() => root.unmount());
  root = undefined;
  document.getElementById("mount").innerHTML = "";
});
after(async () => { await server?.close(); dom?.window.close(); });
async function mount(scene) {
  root = createRoot(document.getElementById("mount"));
  await act(() => root.render(scene));
}
async function click(element) {
  assert.ok(element);
  await act(async () => {
    element.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
    await Promise.resolve();
  });
}

test("sidebar entries are destinations and navigation focuses the surviving page heading", async () => {
  await mount(fixture.navScene());
  const destination = document.querySelector('nav a[href="/docs/installation"]');
  assert.ok(destination?.closest("li"));
  assert.equal(document.querySelectorAll("nav li button").length, 0);
  await click(destination);
  assert.equal(document.activeElement.tagName, "H1");
  assert.equal(document.activeElement.textContent, "/docs/installation");
  assert.ok(document.activeElement.isConnected);
});

test("one responsive search trigger serves the directory; there is no second query field", async () => {
  await mount(fixture.searchScene());
  const triggers = document.querySelectorAll('button[aria-label="搜索文档"]');
  assert.equal(triggers.length, 1);
  assert.equal(document.querySelectorAll('input[type="search"]').length, 0);
  assert.ok(triggers[0].querySelector("svg"));
  assert.ok(triggers[0].classList.contains("pointer-coarse:min-h-11"));
});

test("fixture controls are absent from ordinary reading and require an explicit development URL", async () => {
  await mount(fixture.fixtureScene("/docs/patterns/edit"));
  assert.equal(document.querySelector(".qy-fixture-settings"), null);
  assert.ok(!document.body.textContent.includes("INTERNAL_FIXTURE_CONTROL"));
  await act(() => root.unmount());
  root = undefined;
  await mount(fixture.fixtureScene("/docs/patterns/edit?fixtures=1"));
  assert.ok(document.querySelector(".qy-fixture-settings"));
});

test("a failed section exposes no internal exception and retries without discarding its neighbours", async () => {
  const originalError = console.error;
  console.error = () => {};
  try {
    await mount(fixture.boundaryScene(true));
    assert.ok(document.body.textContent.includes("示例暂时无法显示"));
    assert.ok(document.body.textContent.includes("仍然有效的文档"));
    assert.ok(!document.body.textContent.includes("INTERNAL_STACK_AND_FILENAME"));
    assert.ok(document.querySelector('[data-slot="empty"][role="status"]'));
    await act(() => root.render(fixture.boundaryScene(false)));
    const retry = document.querySelector('button');
    retry.focus();
    await click(retry);
    assert.ok(document.body.textContent.includes("有效示例"));
    assert.ok(!document.body.textContent.includes("示例暂时无法显示"));
    assert.equal(document.activeElement.textContent, "组件文档");
    assert.ok(document.activeElement.isConnected);
  } finally { console.error = originalError; }
});

test("page states use the library's shared anatomy and a focusable page heading without filler", async () => {
  await mount(fixture.pageStateScene());
  assert.ok(document.querySelector('[data-slot="empty"] [data-slot="empty-title"] h1[tabindex="-1"]'));
  assert.equal(document.querySelector('[data-slot="empty-description"]'), null);
});

test("the site's copy adapter uses the library's pending, success and rejected-write states", async () => {
  let finish;
  const writes = [];
  Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText(text) {
    writes.push(text);
    return new Promise((resolve) => { finish = resolve; });
  } } });
  await mount(fixture.copyScene());
  const button = document.querySelector('[data-slot="copy-button"]');
  await click(button);
  assert.equal(button.dataset.status, "copying");
  assert.equal(button.getAttribute("aria-busy"), "true");
  await act(async () => { finish(); await Promise.resolve(); });
  assert.equal(button.dataset.status, "copied");
  assert.deepEqual(writes, ["const answer = 42;"]);
  assert.ok(document.querySelector('[role="status"]').textContent.includes("已复制"));
  navigator.clipboard.writeText = () => Promise.reject(new Error("PERMISSION_DENIED_INTERNAL"));
  await click(button);
  assert.equal(button.dataset.status, "failed");
  assert.ok(button.getAttribute("aria-label").includes("复制失败"));
  assert.ok(!document.body.textContent.includes("PERMISSION_DENIED_INTERNAL"));
});

test("the registry imports only the requested component's demos, not all 414", async () => {
  const demos = await fixture.loadDemos("button");
  assert.equal(demos.length, fixture.demoCount("button"));
  assert.ok(demos.length > 0 && demos.length <= 10);
  assert.ok(demos.every((demo) => typeof demo.source === "string" && typeof demo.default === "function"));
  assert.deepEqual(await fixture.loadDemos("missing-component"), []);
});

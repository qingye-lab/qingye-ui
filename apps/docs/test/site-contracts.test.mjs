import test, { before, after, afterEach } from "node:test";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { createServer } from "vite";
import { act } from "react";
let createRoot;

const requireUI = createRequire(new URL("../../../packages/ui/package.json", import.meta.url));
const { JSDOM } = requireUI("jsdom");
let server, fixture, dom, root;
before(async () => {
  dom = new JSDOM('<div id="mount"></div>', { url: "http://localhost/", pretendToBeVisual: true });
  for (const name of ["window", "document", "navigator", "history", "sessionStorage", "HTMLElement", "HTMLInputElement", "HTMLButtonElement", "Element", "Node", "NodeFilter", "ShadowRoot", "MutationObserver", "Event", "MouseEvent", "FocusEvent", "KeyboardEvent", "HTMLIFrameElement"]) {
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
  ({ createRoot } = await import("react-dom/client"));
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
  assert.equal(destination?.dataset.slot, "sidebar-link");
  // Entries are links; the only buttons are the folds of the component categories.
  for (const fold of document.querySelectorAll("nav button")) assert.ok(fold.hasAttribute("aria-expanded"));
  await click(destination);
  assert.equal(document.activeElement.tagName, "H1");
  assert.equal(document.activeElement.textContent, "/docs/installation");
  assert.ok(document.activeElement.isConnected);
});

test("one public search trigger serves the directory; there is no second query field", async () => {
  await mount(fixture.searchScene());
  const triggers = document.querySelectorAll('button[aria-label="搜索文档"]');
  assert.equal(triggers.length, 1);
  assert.equal(document.querySelectorAll('input[type="search"]').length, 0);
  assert.ok(triggers[0].querySelector("svg"));
  assert.equal(triggers[0].dataset.slot, "button");
});

test("search navigates from a keyboard-selected current result and focuses the new page", async () => {
  await mount(fixture.dialogScene("/en/docs"));
  await click(document.querySelector("button"));
  const field = document.querySelector('input[role="combobox"]');
  assert.ok(field);
  assert.equal(document.activeElement, field);
  await act(() => {
    Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(field,"input group");
    field.dispatchEvent(new Event("input",{ bubbles:true }));
  });
  await act(() => field.dispatchEvent(new KeyboardEvent("keydown",{ key:"ArrowDown", bubbles:true, cancelable:true })));
  await act(() => field.dispatchEvent(new KeyboardEvent("keydown",{ key:"Enter", bubbles:true, cancelable:true })));
  await act(() => new Promise(resolve => setTimeout(resolve,30)));
  assert.equal(document.querySelector("main h1").textContent,"/en/docs/components/input-group");
  assert.equal(document.querySelector('[role="dialog"]'),null);
  assert.equal(document.activeElement,document.querySelector("main h1"));
});

test("an unmatched search cannot invent a destination; Escape returns focus", async () => {
  await mount(fixture.dialogScene());
  const trigger = document.querySelector("button"); trigger.focus(); await click(trigger);
  const field = document.querySelector('input[role="combobox"]');
  await act(() => {
    Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(field,"qqzz-no-matching-component");
    field.dispatchEvent(new Event("input",{ bubbles:true }));
  });
  assert.equal(document.querySelectorAll('[role="option"]').length,0);
  assert.ok(document.body.textContent.includes("没有匹配的内容"));
  await act(() => field.dispatchEvent(new KeyboardEvent("keydown",{ key:"Enter", bubbles:true, cancelable:true })));
  assert.equal(document.querySelector("main h1").textContent,"/docs");
  await act(() => field.dispatchEvent(new KeyboardEvent("keydown",{ key:"Escape", bubbles:true, cancelable:true })));
  await act(() => new Promise(resolve => setTimeout(resolve,30)));
  assert.equal(document.querySelector('[role="dialog"]'),null);
  assert.equal(document.activeElement,trigger);
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
  assert.ok(document.querySelector('[data-slot="empty"] h1[data-slot="empty-title"][tabindex="-1"]'));
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
  assert.equal(button.dataset.state, "in-progress");
  assert.equal(button.getAttribute("aria-busy"), "true");
  await act(async () => { finish(); await Promise.resolve(); });
  assert.equal(button.hasAttribute("data-copied"), true);
  assert.deepEqual(writes, ["const answer = 42;"]);
  assert.ok(document.querySelector('[role="status"]').textContent.includes("已复制"));
  navigator.clipboard.writeText = () => Promise.reject(new Error("PERMISSION_DENIED_INTERNAL"));
  await click(button);
  assert.equal(button.hasAttribute("data-copy-error"), true);
  assert.ok(document.getElementById(button.getAttribute("aria-describedby")).textContent.includes("复制失败"));
  assert.ok(!document.body.textContent.includes("PERMISSION_DENIED_INTERNAL"));
});

test("the registry imports only the requested current component's demos", async () => {
  const demos = await fixture.loadDemos("button");
  assert.equal(demos.length, fixture.demoCount("button"));
  assert.ok(demos.length > 0 && demos.length <= 10);
  assert.ok(demos.every((demo) => typeof demo.source === "string" && typeof demo.default === "function"));
  assert.deepEqual(await fixture.loadDemos("missing-component"), []);
});

test("the selected sidebar entry uses the native ScrollArea host rather than a removed viewport part", async () => {
  await mount(fixture.navScene());
  const viewport = document.querySelector('[data-slot="scroll-area"]');
  const destination = document.querySelector('nav a[href="/docs/installation"]');
  viewport.getBoundingClientRect = () => ({ top:0,bottom:200,height:200 });
  destination.getBoundingClientRect = () => ({ top:300,bottom:350,height:50 });
  await click(destination);
  assert.equal(viewport.scrollTop,150);
});

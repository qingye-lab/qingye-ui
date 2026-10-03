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
  fixture = await server.ssrLoadModule("/test/fixtures/website-contracts.tsx");
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

async function input(field,value) {
  await act(() => { Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(field,value); field.dispatchEvent(new Event("input",{bubbles:true})); });
}
const button = label => [...document.querySelectorAll("button")].find(element => element.textContent.trim() === label);
async function preview(slug) { await fixture.loadPreview(slug); await mount(fixture.previewScene(slug)); await act(() => Promise.resolve()); }
test("the actual preview keeps draft filters separate from applied results, including cancellation and empty recovery",async () => {
  await preview("filter-bar"); const field = document.querySelector("input");
  await input(field,"B"); assert.equal(document.querySelectorAll("ul li").length,3);
  await click(button("应用")); assert.equal(document.querySelectorAll("ul li").length,1); assert.equal(document.querySelector("ul li").textContent,"条目 B");
  await input(field,"no-such-item"); await click(button("取消")); assert.equal(field.value,"B"); assert.equal(document.querySelectorAll("ul li").length,1);
  await input(field,"no-such-item"); await click(button("应用")); assert.equal(document.querySelectorAll("ul li").length,0); assert.match(document.body.textContent,/没有符合已应用条件/);
  await click(button("清除")); assert.equal(field.value,""); assert.equal(document.querySelectorAll("ul li").length,3);
});
test("a tabs preview preserves the edited draft through a different view and shows zero as a value",async () => {
  await preview("tabs"); const field = document.querySelector("input"); await input(field,"保留草稿");
  await click(button("事实")); assert.ok(document.querySelector("dd")?.isConnected); assert.match(document.body.textContent,/数量0/);
  await click(button("名称")); assert.equal(document.querySelector("input").value,"保留草稿");
});
test("removed business examples show an explicit unavailable state and a localized return destination",async () => {
  await mount(fixture.missingExampleScene());
  assert.match(document.body.textContent,/Example not found/); assert.equal(document.querySelector('[data-slot="empty"]').dataset.state,"not-applicable");
  assert.equal(document.querySelector("a").getAttribute("href"),"/en/examples"); assert.equal(document.querySelectorAll("input,table").length,0);
});

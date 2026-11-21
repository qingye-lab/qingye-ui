import "@testing-library/jest-dom/vitest";
import { cleanup, configure } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => cleanup());

// findBy/waitFor 默认只等 1 秒；并行负载下浮层出现得更晚，那是等待不够而不是断言失败。
configure({ asyncUtilTimeout: 5_000 });

// jsdom lacks these browser APIs that Base UI and our providers touch.
if (!window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList;
}
globalThis.ResizeObserver ??= class {
  observe() {}
  unobserve() {}
  disconnect() {}
} as unknown as typeof ResizeObserver;
Element.prototype.scrollIntoView ??= () => {};

/*
 * ScrollArea polls Element.getAnimations to detect an in-flight scroll, and
 * jsdom has no implementation. Without this the call throws from a timer,
 * outside any test, and surfaces as an unhandled error that can mask real ones.
 */
Element.prototype.getAnimations ??= () => [];

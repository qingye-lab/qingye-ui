import { act, renderHook } from "@testing-library/react";
import { createElement, useEffect } from "react";
import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, expect, test, vi } from "vitest";
import { useMediaQuery } from "../src/hooks/use-media-query";

const originalMatchMedia = window.matchMedia;
afterEach(() => { vi.unstubAllGlobals(); window.matchMedia = originalMatchMedia; });

function mediaMock(initial = false) {
  const lists: { media: string; matches: boolean; addEventListener: ReturnType<typeof vi.fn>; removeEventListener: ReturnType<typeof vi.fn>; listeners: Set<() => void> }[] = [];
  const match = vi.fn((media: string) => {
    const listeners = new Set<() => void>();
    const list = { media, matches: initial, listeners,
      addEventListener: vi.fn((_event: string, listener: () => void) => listeners.add(listener)),
      removeEventListener: vi.fn((_event: string, listener: () => void) => listeners.delete(listener)) };
    lists.push(list);
    return list as unknown as MediaQueryList;
  });
  window.matchMedia = match;
  return { match, lists };
}

function Reader() {
  return createElement("span", null, String(useMediaQuery("(prefers-reduced-motion: reduce)")));
}

test("SSR has a deterministic false snapshot without window or matchMedia", () => {
  vi.stubGlobal("window", undefined);
  try { expect(renderToString(createElement(Reader))).toBe("<span>false</span>"); }
  finally { vi.unstubAllGlobals(); }
});

test("hydration starts with the server snapshot, then reads the real browser match without mismatch", async () => {
  mediaMock(true);
  const seen: boolean[] = [];
  function Probe() {
    const matches = useMediaQuery("md");
    useEffect(() => { seen.push(matches); }, [matches]);
    return createElement("span", null, String(matches));
  }
  const host = document.createElement("div");
  host.innerHTML = renderToString(createElement(Probe));
  expect(host.textContent).toBe("false");
  document.body.append(host);
  const recover = vi.fn();
  let root: ReturnType<typeof hydrateRoot> | undefined;
  try {
    await act(async () => { root = hydrateRoot(host, createElement(Probe), { onRecoverableError: recover }); });
    expect(seen).toEqual([false, true]);
    expect(host.textContent).toBe("true");
    expect(recover).not.toHaveBeenCalled();
  } finally {
    await act(async () => { root?.unmount(); });
    host.remove();
  }
});

test("client first frame reads an already matched media query", () => {
  mediaMock(true);
  const { result } = renderHook(() => useMediaQuery("md"));
  expect(result.current).toBe(true);
});

test("change notifications update snapshots and unmount removes the exact listener", () => {
  const { lists } = mediaMock();
  const { result, unmount } = renderHook(() => useMediaQuery("md"));
  const list = lists[0]!;
  expect(result.current).toBe(false);
  act(() => { list.matches = true; list.listeners.forEach((listener) => listener()); });
  expect(result.current).toBe(true);
  unmount();
  expect(list.listeners.size).toBe(0);
  expect(list.removeEventListener).toHaveBeenCalledWith("change", list.addEventListener.mock.calls[0]![1]);
});

test("changing the query disposes the old subscription and snapshots the new query", () => {
  const { lists } = mediaMock();
  const { rerender, result, unmount } = renderHook(({ query }) => useMediaQuery(query), { initialProps: { query: "md" } });
  rerender({ query: "lg" });
  expect(lists[0]!.listeners.size).toBe(0);
  expect(lists[1]!.media).toBe("(min-width: 1024px)");
  act(() => { lists[1]!.matches = true; lists[1]!.listeners.forEach((listener) => listener()); });
  expect(result.current).toBe(true);
  unmount();
  expect(lists[1]!.listeners.size).toBe(0);
});

test("equivalent object inputs do not recreate a subscription", () => {
  const { match, lists } = mediaMock();
  const { rerender } = renderHook(() => useMediaQuery({ min: "sm", max: "lg", pointer: "fine" }));
  rerender();
  expect(match).toHaveBeenCalledOnce();
  expect(lists[0]!.addEventListener).toHaveBeenCalledOnce();
});

test.each([
  ["sm", "(min-width: 640px)"],
  ["max-md", "(width < 768px)"],
  ["sm:max-lg", "(min-width: 640px) and (width < 1024px)"],
  ["(prefers-reduced-motion: reduce)", "(prefers-reduced-motion: reduce)"],
  [{ min: 1100, max: "2xl", pointer: "coarse" }, "(min-width: 1100px) and (width < 1536px) and (pointer: coarse)"],
  [{}, "all"],
] as const)("supports public query input %j", (input, expected) => {
  const { match } = mediaMock();
  renderHook(() => useMediaQuery(input));
  expect(match).toHaveBeenCalledWith(expected);
});

test("a browser without matchMedia falls back to false", () => {
  Object.defineProperty(window, "matchMedia", { configurable: true, writable: true, value: undefined });
  expect(renderHook(() => useMediaQuery("md")).result.current).toBe(false);
});

test("legacy MediaQueryList subscriptions are removed on unmount", () => {
  const addListener = vi.fn();
  const removeListener = vi.fn();
  window.matchMedia = vi.fn(() => ({ matches: true, addListener, removeListener }) as unknown as MediaQueryList);
  const { result, unmount } = renderHook(() => useMediaQuery("md"));
  expect(result.current).toBe(true);
  unmount();
  expect(removeListener).toHaveBeenCalledWith(addListener.mock.calls[0]![0]);
});

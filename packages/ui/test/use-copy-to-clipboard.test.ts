import { act, renderHook, waitFor } from "@testing-library/react";
import { createElement, StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { afterEach, expect, test, vi } from "vitest";
import { useCopyToClipboard } from "../src/hooks/use-copy-to-clipboard";

const originalClipboard = Object.getOwnPropertyDescriptor(navigator, "clipboard");
afterEach(() => {
  vi.unstubAllGlobals();
  if (originalClipboard) Object.defineProperty(navigator, "clipboard", originalClipboard);
  else Reflect.deleteProperty(navigator, "clipboard");
  vi.useRealTimers();
});

function clipboard(writeText?: (value: string) => Promise<void>) {
  Object.defineProperty(navigator, "clipboard", { configurable: true, value: writeText ? { writeText } : undefined });
}

function deferred() {
  let resolve!: () => void;
  let reject!: (reason: unknown) => void;
  const promise = new Promise<void>((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}

test("SSR has no clipboard access and no invented result", () => {
  vi.stubGlobal("navigator", undefined);
  function Probe() {
    const { isCopied, isCopying } = useCopyToClipboard();
    return createElement("span", null, `${isCopied}:${isCopying}`);
  }
  try { expect(renderToString(createElement(Probe))).toBe("<span>false:false</span>"); }
  finally { vi.unstubAllGlobals(); }
});

test("only a resolved write reports success, preserving the exact copied value", async () => {
  const pending = deferred();
  const write = vi.fn(() => pending.promise);
  const onCopy = vi.fn();
  const onError = vi.fn();
  clipboard(write);
  const { result } = renderHook(() => useCopyToClipboard({ onCopy, onError }));
  expect(result.current.isCopied).toBe(false);
  act(() => result.current.copyToClipboard("https://ui.xflux.cc/青野?q=1"));
  expect(write).toHaveBeenCalledWith("https://ui.xflux.cc/青野?q=1");
  expect(result.current.isCopying).toBe(true);
  expect(result.current.isCopied).toBe(false);
  expect(onCopy).not.toHaveBeenCalled();
  await act(async () => pending.resolve());
  expect(result.current.isCopying).toBe(false);
  expect(result.current.isCopied).toBe(true);
  expect(onCopy).toHaveBeenCalledOnce();
  expect(onError).not.toHaveBeenCalled();
});

test.each(["rejection", "synchronous throw"])("%s reports the real failure without success", async (mode) => {
  const error = new DOMException("Permission denied", "NotAllowedError");
  clipboard(mode === "rejection" ? vi.fn().mockRejectedValue(error) : () => { throw error; });
  const onCopy = vi.fn();
  const onError = vi.fn();
  const { result } = renderHook(() => useCopyToClipboard({ onCopy, onError }));
  await act(async () => result.current.copyToClipboard("QY-20481"));
  expect(onError).toHaveBeenCalledWith(error);
  expect(onCopy).not.toHaveBeenCalled();
  expect(result.current.isCopied).toBe(false);
  expect(result.current.isCopying).toBe(false);
});

test("unavailable Clipboard API is an explicit failure", async () => {
  clipboard();
  const onError = vi.fn();
  const onCopy = vi.fn();
  const { result } = renderHook(() => useCopyToClipboard({ onError, onCopy }));
  await act(async () => result.current.copyToClipboard("QY-20481"));
  expect(onError).toHaveBeenCalledWith(expect.any(Error));
  expect(onCopy).not.toHaveBeenCalled();
  expect(result.current.isCopied).toBe(false);
  expect(result.current.isCopying).toBe(false);
});

test("success resets at the selected timeout without rewriting its event", async () => {
  vi.useFakeTimers();
  clipboard(vi.fn().mockResolvedValue(undefined));
  const onCopy = vi.fn();
  const { result } = renderHook(() => useCopyToClipboard({ timeout: 1200, onCopy }));
  await act(async () => result.current.copyToClipboard("QY-20481"));
  expect(result.current.isCopied).toBe(true);
  act(() => vi.advanceTimersByTime(1199));
  expect(result.current.isCopied).toBe(true);
  act(() => vi.advanceTimersByTime(1));
  expect(result.current.isCopied).toBe(false);
  expect(onCopy).toHaveBeenCalledOnce();
});

test("a new failed attempt clears previous success, then allows recovery", async () => {
  const write = vi.fn().mockResolvedValueOnce(undefined).mockRejectedValueOnce(new Error("denied")).mockResolvedValueOnce(undefined);
  clipboard(write);
  const onCopy = vi.fn();
  const onError = vi.fn();
  const { result } = renderHook(() => useCopyToClipboard({ onCopy, onError }));
  await act(async () => result.current.copyToClipboard("first"));
  expect(result.current.isCopied).toBe(true);
  await act(async () => result.current.copyToClipboard("second"));
  expect(result.current.isCopied).toBe(false);
  expect(onError).toHaveBeenCalledOnce();
  await act(async () => result.current.copyToClipboard("third"));
  expect(result.current.isCopied).toBe(true);
  expect(onCopy).toHaveBeenCalledTimes(2);
});

test("an older completion cannot overwrite the latest pending or failed attempt", async () => {
  const first = deferred();
  const second = deferred();
  clipboard(vi.fn().mockReturnValueOnce(first.promise).mockReturnValueOnce(second.promise));
  const onCopy = vi.fn();
  const onError = vi.fn();
  const { result } = renderHook(() => useCopyToClipboard({ onCopy, onError }));
  act(() => { result.current.copyToClipboard("first"); result.current.copyToClipboard("second"); });
  await act(async () => first.resolve());
  expect(result.current.isCopying).toBe(true);
  expect(result.current.isCopied).toBe(false);
  expect(onCopy).not.toHaveBeenCalled();
  const error = new Error("second denied");
  await act(async () => second.reject(error));
  expect(result.current.isCopied).toBe(false);
  expect(result.current.isCopying).toBe(false);
  expect(onError).toHaveBeenCalledWith(error);
});

test("starting a new attempt cancels the earlier success reset timer", async () => {
  vi.useFakeTimers();
  clipboard(vi.fn().mockResolvedValue(undefined));
  const { result } = renderHook(() => useCopyToClipboard({ timeout: 2000 }));
  await act(async () => result.current.copyToClipboard("first"));
  act(() => vi.advanceTimersByTime(1500));
  await act(async () => result.current.copyToClipboard("second"));
  act(() => vi.advanceTimersByTime(500));
  expect(result.current.isCopied).toBe(true);
  act(() => vi.advanceTimersByTime(1500));
  expect(result.current.isCopied).toBe(false);
});

test.each(["resolve", "reject"] as const)("unmount ignores a pending %s and does not create a new reset timer", async (outcome) => {
  vi.useFakeTimers();
  const pending = deferred();
  clipboard(() => pending.promise);
  const onCopy = vi.fn();
  const onError = vi.fn();
  const { result, unmount } = renderHook(() => useCopyToClipboard({ onCopy, onError }));
  act(() => result.current.copyToClipboard("QY-20481"));
  unmount();
  await act(async () => outcome === "resolve" ? pending.resolve() : pending.reject(new Error("denied")));
  expect(onCopy).not.toHaveBeenCalled();
  expect(onError).not.toHaveBeenCalled();
  expect(vi.getTimerCount()).toBe(0);
});

test("unmount clears an existing success timer", async () => {
  vi.useFakeTimers();
  clipboard(vi.fn().mockResolvedValue(undefined));
  const { result, unmount } = renderHook(() => useCopyToClipboard());
  await act(async () => result.current.copyToClipboard("QY-20481"));
  expect(vi.getTimerCount()).toBe(1);
  unmount();
  expect(vi.getTimerCount()).toBe(0);
});

test("StrictMode effect replay leaves the live hook able to copy", async () => {
  const onCopy = vi.fn();
  clipboard(vi.fn().mockResolvedValue(undefined));
  const { result } = renderHook(() => useCopyToClipboard({ onCopy }), { wrapper: StrictMode });
  act(() => result.current.copyToClipboard("QY-20481"));
  await waitFor(() => expect(result.current.isCopied).toBe(true));
  expect(onCopy).toHaveBeenCalledOnce();
});

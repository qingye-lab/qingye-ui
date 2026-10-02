import { act, fireEvent, render, renderHook, screen } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";
import { CopyButton } from "../src/components/copy-button";
import { useCopyToClipboard } from "../src/hooks/use-copy-to-clipboard";
import { UILocaleProvider } from "../src/locale";
import { enUS } from "../src/locales/en-US";

function mockClipboard(writeText: ((text: string) => Promise<void>) | undefined) {
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: writeText ? { writeText: vi.fn(writeText) } : undefined,
  });
  return navigator.clipboard?.writeText as ReturnType<typeof vi.fn> | undefined;
}

afterEach(() => {
  vi.useRealTimers();
  Object.defineProperty(navigator, "clipboard", { configurable: true, value: undefined });
});

test("copies, confirms with a check, announces politely and resets after the timeout", async () => {
  vi.useFakeTimers();
  const writeText = mockClipboard(() => Promise.resolve());
  const onCopy = vi.fn();
  render(<CopyButton onCopy={onCopy} timeout={1000} value="SO-0042" />);
  const button = screen.getByRole("button", { name: "复制" });

  await act(async () => {
    fireEvent.click(button);
  });
  expect(writeText).toHaveBeenCalledWith("SO-0042");
  expect(onCopy).toHaveBeenCalledOnce();
  expect(button).toHaveAttribute("data-status", "copied");
  // The visible label keeps its width; the confirmation is announced instead.
  expect(button).toHaveAccessibleName("复制");
  expect(screen.getByRole("status")).toHaveTextContent("已复制");

  await act(async () => {
    vi.advanceTimersByTime(1000);
  });
  expect(button).toHaveAttribute("data-status", "idle");
  expect(screen.getByRole("status")).toHaveTextContent("");
});

test("reads a function value at click time and keeps icon-only buttons labelled", async () => {
  const writeText = mockClipboard(() => Promise.resolve());
  let current = "first";
  render(<CopyButton copyLabel="复制订单号" size="icon" value={() => current} />);
  current = "second";
  await act(async () => {
    fireEvent.click(screen.getByRole("button", { name: "复制订单号" }));
  });
  expect(writeText).toHaveBeenCalledWith("second");
});

test("shows and announces the failure when the browser rejects the write", async () => {
  mockClipboard(() => Promise.reject(new Error("denied")));
  const onCopyError = vi.fn();
  render(<CopyButton onCopyError={onCopyError} value="https://qingye.example" />);
  const button = screen.getByRole("button");

  await act(async () => {
    fireEvent.click(button);
  });
  expect(onCopyError).toHaveBeenCalledWith(expect.any(Error));
  expect(button).toHaveAttribute("data-status", "failed");
  expect(button).toHaveTextContent("复制失败");
  expect(screen.getByRole("status")).toHaveTextContent("复制失败");
});

test("treats a missing Clipboard API as a failure", async () => {
  mockClipboard(undefined);
  const onCopyError = vi.fn();
  render(<CopyButton onCopyError={onCopyError} value="x" />);
  await act(async () => {
    fireEvent.click(screen.getByRole("button"));
  });
  expect(onCopyError).toHaveBeenCalledOnce();
  expect(screen.getByRole("button")).toHaveAttribute("data-status", "failed");
});

test("respects onClick preventDefault and uses locale defaults", async () => {
  const writeText = mockClipboard(() => Promise.resolve());
  render(
    <UILocaleProvider locale={enUS}>
      <CopyButton onClick={(event) => event.preventDefault()} value="x" />
    </UILocaleProvider>,
  );
  const button = screen.getByRole("button", { name: "Copy" });
  await act(async () => {
    fireEvent.click(button);
  });
  expect(writeText).not.toHaveBeenCalled();
});

test("useCopyToClipboard reports rejected writes through onError", async () => {
  mockClipboard(() => Promise.reject(new Error("denied")));
  const onError = vi.fn();
  const onCopy = vi.fn();
  const { result } = renderHook(() => useCopyToClipboard({ onCopy, onError }));
  await act(async () => {
    result.current.copyToClipboard("secret");
  });
  expect(onError).toHaveBeenCalledWith(expect.any(Error));
  expect(onCopy).not.toHaveBeenCalled();
  expect(result.current.isCopied).toBe(false);
});

test("useCopyToClipboard reports an unavailable Clipboard API through onError", () => {
  mockClipboard(undefined);
  const onError = vi.fn();
  const { result } = renderHook(() => useCopyToClipboard({ onError }));
  act(() => result.current.copyToClipboard("secret"));
  expect(onError).toHaveBeenCalledOnce();
});

test("keeps the copy action busy until its own write settles", async () => {
  let resolve!: () => void;
  const writeText = mockClipboard(() => new Promise<void>((done) => { resolve = done; }));
  render(<CopyButton value="draft" />);
  const button = screen.getByRole("button", { name: "复制" });
  fireEvent.click(button);
  expect(button).toHaveAttribute("aria-busy", "true");
  expect(button).toHaveAttribute("data-status", "copying");
  fireEvent.click(button);
  expect(writeText).toHaveBeenCalledOnce();
  await act(async () => resolve());
  expect(button).not.toHaveAttribute("aria-busy", "true");
  expect(button).toHaveAttribute("data-status", "copied");
});

test("latest hook request owns feedback even when an older write rejects later", async () => {
  let rejectFirst!: (error: Error) => void;
  let resolveSecond!: () => void;
  mockClipboard((value) => value === "first"
    ? new Promise<void>((_resolve, reject) => { rejectFirst = reject; })
    : new Promise<void>((resolve) => { resolveSecond = resolve; }));
  const onError = vi.fn();
  const onCopy = vi.fn();
  const { result } = renderHook(() => useCopyToClipboard({ onError, onCopy }));
  act(() => { result.current.copyToClipboard("first"); result.current.copyToClipboard("second"); });
  await act(async () => resolveSecond());
  await act(async () => rejectFirst(new Error("old failure")));
  expect(result.current.isCopied).toBe(true);
  expect(onCopy).toHaveBeenCalledOnce();
  expect(onError).not.toHaveBeenCalled();
});

test("does not report a late copy result after its owner unmounts", async () => {
  let resolve!: () => void;
  mockClipboard(() => new Promise<void>((done) => { resolve = done; }));
  const onCopy = vi.fn();
  const { result, unmount } = renderHook(() => useCopyToClipboard({ onCopy }));
  act(() => result.current.copyToClipboard("draft"));
  unmount();
  await act(async () => resolve());
  expect(onCopy).not.toHaveBeenCalled();
});

test("copies an empty string as the exact requested value", async () => {
  const writeText = mockClipboard(() => Promise.resolve());
  render(<CopyButton value="" />);
  await act(async () => fireEvent.click(screen.getByRole("button")));
  expect(writeText).toHaveBeenCalledWith("");
  expect(screen.getByRole("button")).toHaveAttribute("data-status", "copied");
});

test("a throwing value reader reports failure and remains retryable", async () => {
  const writeText = mockClipboard(() => Promise.resolve());
  const onCopyError = vi.fn();
  let fail = true;
  render(<CopyButton onCopyError={onCopyError} value={() => {
    if (fail) throw new Error("value unavailable");
    return "ready";
  }} />);
  await act(async () => fireEvent.click(screen.getByRole("button")));
  expect(onCopyError).toHaveBeenCalledWith(expect.any(Error));
  expect(screen.getByRole("button")).toHaveAttribute("data-status", "failed");
  fail = false;
  await act(async () => fireEvent.click(screen.getByRole("button")));
  expect(writeText).toHaveBeenCalledWith("ready");
  expect(screen.getByRole("button")).toHaveAttribute("data-status", "copied");
});

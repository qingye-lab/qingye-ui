import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createRef } from "react";
import { afterEach, expect, test, vi } from "vitest";
import { CopyButton } from "../src/components/copy-button";

afterEach(() => vi.unstubAllGlobals());

test("native copy/error events remain separate from the clipboard result callbacks", () => {
  const nativeCopy = vi.fn();
  const nativeError = vi.fn();
  const success = vi.fn();
  const failure = vi.fn();
  const { container } = render(<CopyButton value="青叶" onCopy={nativeCopy} onError={nativeError} onCopySuccess={success} onCopyError={failure}><img alt="" /></CopyButton>);
  const button = screen.getByRole("button", { name: "复制" });
  fireEvent.copy(button);
  fireEvent.error(container.querySelector("img")!);
  expect(nativeCopy).toHaveBeenCalledOnce();
  expect(nativeError).toHaveBeenCalledOnce();
  expect(success).not.toHaveBeenCalled();
  expect(failure).not.toHaveBeenCalled();
});

test("success follows the real clipboard promise, with pending activation blocked and ref/render preserved", async () => {
  let resolve!: () => void;
  const writeText = vi.fn(() => new Promise<void>(done => { resolve = done; }));
  vi.stubGlobal("navigator", { clipboard: { writeText } });
  const onCopy = vi.fn();
  const ref = createRef<HTMLButtonElement>();
  const { rerender } = render(<CopyButton value="青叶" onCopySuccess={onCopy} ref={ref} render={<button data-custom="yes" />} />);
  const button = screen.getByRole("button", { name: "复制" });
  expect(ref.current).toBe(button);
  expect(button).toHaveAttribute("data-custom", "yes");
  fireEvent.click(button);
  expect(writeText).toHaveBeenCalledWith("青叶");
  expect(button).toHaveAttribute("aria-busy", "true");
  expect(button).not.toHaveAttribute("data-copied");
  fireEvent.click(button);
  expect(writeText).toHaveBeenCalledOnce();
  await act(async () => resolve());
  expect(button).toHaveAttribute("data-copied");
  expect(onCopy).toHaveBeenCalledOnce();
  rerender(<CopyButton value="新文本" />);
  expect(screen.getByRole("button", { name: "复制" })).not.toHaveAttribute("data-copied");
});

test.each(["reject", "unavailable"])("%s clipboard path reports failure and permits a later retry", async mode => {
  const error = new Error("denied");
  const writeText = vi.fn().mockRejectedValueOnce(error).mockResolvedValue(undefined);
  vi.stubGlobal("navigator", mode === "reject" ? { clipboard: { writeText } } : {});
  const onCopy = vi.fn();
  const onError = vi.fn();
  render(<CopyButton value="青叶" onCopySuccess={onCopy} onCopyError={onError} />);
  fireEvent.click(screen.getByRole("button", { name: "复制" }));
  await waitFor(() => expect(onError).toHaveBeenCalledOnce());
  expect(screen.getByRole("status")).toHaveTextContent("复制失败，请手动复制");
  expect(onCopy).not.toHaveBeenCalled();
  expect(screen.getByRole("button", { name: "复制" })).not.toHaveAttribute("data-copied");
  vi.stubGlobal("navigator", { clipboard: { writeText: vi.fn().mockResolvedValue(undefined) } });
  fireEvent.click(screen.getByRole("button", { name: "复制" }));
  await waitFor(() => expect(onCopy).toHaveBeenCalledOnce());
  expect(screen.getByRole("button", { name: "复制" })).toHaveAttribute("data-copied");
});

test("disabled and caller cancellation do not request a write", () => {
  const writeText = vi.fn();
  vi.stubGlobal("navigator", { clipboard: { writeText } });
  const { rerender } = render(<CopyButton value="青叶" disabled />);
  fireEvent.click(screen.getByRole("button", { name: "复制" }));
  rerender(<CopyButton value="青叶" onClick={event => event.preventBaseUIHandler()} />);
  fireEvent.click(screen.getByRole("button", { name: "复制" }));
  expect(writeText).not.toHaveBeenCalled();
});

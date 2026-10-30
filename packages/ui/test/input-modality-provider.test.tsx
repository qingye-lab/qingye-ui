import { fireEvent, render } from "@testing-library/react";
import { beforeEach, expect, test } from "vitest";
import { InputModalityProvider, MotionProvider } from "../src/components/input-modality-provider";

const root = document.documentElement;

beforeEach(() => root.removeAttribute("data-ui-input"));

test("tracks the last input modality on the document root", () => {
  render(
    <InputModalityProvider>
      <button type="button">保存</button>
    </InputModalityProvider>,
  );
  expect(root).toHaveAttribute("data-ui-input", "pointer");

  fireEvent.keyDown(document.body, { key: "Tab" });
  expect(root).toHaveAttribute("data-ui-input", "keyboard");

  fireEvent.pointerDown(document.body);
  expect(root).toHaveAttribute("data-ui-input", "pointer");

  fireEvent.keyDown(document.body, { key: "ArrowDown" });
  fireEvent.pointerMove(document.body);
  expect(root).toHaveAttribute("data-ui-input", "pointer");
});

test("removes the attribute on unmount, or restores a previous value", () => {
  const { unmount } = render(<InputModalityProvider>内容</InputModalityProvider>);
  unmount();
  expect(root).not.toHaveAttribute("data-ui-input");

  root.setAttribute("data-ui-input", "keyboard");
  const second = render(<InputModalityProvider>内容</InputModalityProvider>);
  expect(root).toHaveAttribute("data-ui-input", "pointer");
  second.unmount();
  expect(root).toHaveAttribute("data-ui-input", "keyboard");
});

test("B8 removed modality listeners do not change the restored document state", () => {
  root.setAttribute("data-ui-input", "keyboard");
  const { unmount } = render(<InputModalityProvider>内容</InputModalityProvider>);
  unmount();
  fireEvent.pointerDown(document.body);
  fireEvent.pointerMove(document.body);
  expect(root).toHaveAttribute("data-ui-input", "keyboard");
});

test("the deprecated MotionProvider name is the same component", () => {
  expect(MotionProvider).toBe(InputModalityProvider);
  const { unmount } = render(<MotionProvider>内容</MotionProvider>);
  expect(root).toHaveAttribute("data-ui-input", "pointer");
  fireEvent.keyDown(document.body, { key: "Tab" });
  expect(root).toHaveAttribute("data-ui-input", "keyboard");
  unmount();
  expect(root).not.toHaveAttribute("data-ui-input");
});

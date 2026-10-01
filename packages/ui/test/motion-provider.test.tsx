import { fireEvent, render } from "@testing-library/react";
import { beforeEach, expect, test } from "vitest";
import { MotionProvider } from "../src/components/motion-provider";

const root = document.documentElement;

beforeEach(() => root.removeAttribute("data-ui-input"));

test("tracks the last input modality on the document root", () => {
  render(
    <MotionProvider>
      <button type="button">保存</button>
    </MotionProvider>,
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
  const { unmount } = render(<MotionProvider>内容</MotionProvider>);
  unmount();
  expect(root).not.toHaveAttribute("data-ui-input");

  root.setAttribute("data-ui-input", "keyboard");
  const second = render(<MotionProvider>内容</MotionProvider>);
  expect(root).toHaveAttribute("data-ui-input", "pointer");
  second.unmount();
  expect(root).toHaveAttribute("data-ui-input", "keyboard");
});

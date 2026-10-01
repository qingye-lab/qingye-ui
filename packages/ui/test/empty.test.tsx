import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { EmptyMedia, EmptyTitle } from "../src/components/empty";

test("EmptyMedia applies its props to the wrapper only", () => {
  const onClick = vi.fn();
  render(
    <EmptyMedia aria-label="空收件箱" className="mb-4" id="inbox-media" onClick={onClick} variant="icon">
      <svg data-testid="icon" />
    </EmptyMedia>,
  );
  expect(document.querySelectorAll("#inbox-media")).toHaveLength(1);
  expect(screen.getAllByLabelText("空收件箱")).toHaveLength(1);
  const wrapper = document.getElementById("inbox-media")!;
  expect(wrapper).toHaveAttribute("data-slot", "empty-media");
  expect(wrapper).toHaveClass("mb-4");
  expect(screen.getAllByTestId("icon")).toHaveLength(1);
  expect(wrapper.querySelector("[data-slot=empty-media-content]")).toContainElement(screen.getByTestId("icon"));
  screen.getByTestId("icon").dispatchEvent(new MouseEvent("click", { bubbles: true }));
  expect(onClick).toHaveBeenCalledOnce();
});

test("EmptyTitle steps down to body size for nested containers", () => {
  const { rerender } = render(<EmptyTitle>还没有项目</EmptyTitle>);
  const title = screen.getByText("还没有项目");
  expect(title).toHaveAttribute("data-size", "default");
  expect(title).toHaveClass("text-title");

  rerender(<EmptyTitle size="sm">还没有项目</EmptyTitle>);
  expect(screen.getByText("还没有项目")).toHaveClass("text-base");
});

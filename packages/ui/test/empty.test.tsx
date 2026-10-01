import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { EmptyMedia } from "../src/components/empty";

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

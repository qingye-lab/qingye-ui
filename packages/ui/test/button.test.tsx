import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import { Button } from "../src/components/button";

test("fires onClick and exposes loading as busy and disabled", async () => {
  const onClick = vi.fn();
  const { rerender } = render(<Button onClick={onClick}>保存</Button>);
  await userEvent.click(screen.getByRole("button", { name: "保存" }));
  expect(onClick).toHaveBeenCalledOnce();

  rerender(<Button loading onClick={onClick}>保存</Button>);
  const button = screen.getByRole("button", { name: /保存/ });
  expect(button).toHaveAttribute("aria-busy", "true");
  expect(button).toBeDisabled();
});

test("renders a link with button semantics when nativeButton is false", () => {
  render(
    <Button nativeButton={false} render={<a href="/docs" />}>
      文档
    </Button>,
  );
  expect(screen.getByRole("button", { name: "文档" }).tagName).toBe("A");
});

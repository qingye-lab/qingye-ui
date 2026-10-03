import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { expect, test, vi } from "vitest";
import { Group } from "../src/components/group";

test("layout alone adds no group role or member state", () => {
  const { container } = render(<Group><button>一</button><button>二</button></Group>);
  expect(screen.queryByRole("group")).toBeNull();
  expect(container.querySelector("[data-slot=group]")).toHaveAttribute("data-orientation", "horizontal");
  expect(screen.getByRole("button", { name: "一" })).not.toHaveAttribute("aria-pressed");
});

test("vertical layout retains reading order and caller native semantics", () => {
  const ref = createRef<HTMLDivElement>();
  render(<Group orientation="vertical" gap="fields" render={<ul />} ref={ref}><li>一</li><li>二</li></Group>);
  expect(screen.getByRole("list")).toBe(ref.current);
  expect(ref.current).toHaveClass("flex-col", "gap-(--qy-field-group-gap)");
  expect(screen.getAllByRole("listitem").map(item => item.textContent)).toEqual(["一", "二"]);
});

test("events and refs reach a rendered group while independent disabled members stay disabled", async () => {
  const ref = createRef<HTMLDivElement>();
  const click = vi.fn();
  render(<Group ref={ref} role="group" aria-label="操作" wrap={false} className="gap-0" onClick={click} render={<section />}><button disabled>一</button><button>二</button></Group>);
  expect(ref.current).toBe(screen.getByRole("group", { name: "操作" }));
  expect(ref.current?.tagName).toBe("SECTION");
  expect(ref.current).toHaveClass("flex-nowrap", "gap-0");
  expect(ref.current).not.toHaveClass("gap-(--qy-panel-gap)");
  await userEvent.click(screen.getByRole("button", { name: "一" }));
  expect(click).not.toHaveBeenCalled();
  await userEvent.click(screen.getByRole("button", { name: "二" }));
  expect(click).toHaveBeenCalledOnce();
});

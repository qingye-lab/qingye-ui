import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { expect, test, vi } from "vitest";
import { Input } from "../src/components/input";
import { Label } from "../src/components/label";

test("htmlFor names and activates the actual input", async () => {
  render(<><Label htmlFor="name">名称</Label><Input id="name" /></>);
  const input = screen.getByRole("textbox", { name: "名称" });
  await userEvent.click(screen.getByText("名称"));
  expect(input).toHaveFocus();
});

test("nested native labels retain checkbox activation and disabled behavior", async () => {
  render(<><Label><input type="checkbox" />选项一</Label><Label><input type="checkbox" disabled />选项二</Label></>);
  await userEvent.click(screen.getByText("选项一"));
  await userEvent.click(screen.getByText("选项二"));
  expect(screen.getByRole("checkbox", { name: "选项一" })).toBeChecked();
  expect(screen.getByRole("checkbox", { name: "选项二" })).not.toBeChecked();
});

test("native props, render refs and caller events compose without changing the target", async () => {
  const ref = createRef<HTMLLabelElement>();
  const caller = vi.fn();
  const rendered = vi.fn();
  render(<><Label ref={ref} id="title-label" htmlFor="title-input" data-owner="caller" className="text-body" onClick={caller} render={<label onClick={rendered} />}>标题</Label><input id="title-input" /></>);
  await userEvent.click(screen.getByText("标题"));
  expect(ref.current?.tagName).toBe("LABEL");
  expect(ref.current).toHaveAttribute("data-owner", "caller");
  expect(ref.current).toHaveClass("text-body");
  expect(ref.current).not.toHaveClass("text-label");
  expect(caller).toHaveBeenCalledOnce();
  expect(rendered).toHaveBeenCalledOnce();
  expect(screen.getByRole("textbox")).toHaveFocus();
});

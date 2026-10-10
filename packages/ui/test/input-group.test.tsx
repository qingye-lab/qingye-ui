import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { expect, test, vi } from "vitest";
import { Button } from "../src/components/button";
import { Field, FieldControl, FieldDescription, FieldError, FieldLabel } from "../src/components/field";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "../src/components/input-group";

test("long static addons retain the real input name, description and form value without becoming submitted fields", async () => {
  const attachment = "VeryLongContinuousAttachmentNameWithoutBreaks";
  const { container } = render(<form><Field name="amount"><FieldLabel>数值</FieldLabel><InputGroup><InputGroupAddon>{attachment}</InputGroupAddon><InputGroupInput defaultValue="1" /><InputGroupAddon>{attachment}</InputGroupAddon></InputGroup><FieldDescription>单位为像素</FieldDescription></Field></form>);
  const input = screen.getByRole("textbox", { name: "数值" });
  expect(input).toHaveAccessibleDescription("单位为像素");
  await userEvent.type(input, "2");
  expect(Array.from(new FormData(container.querySelector("form")!).entries())).toEqual([["amount", "12"]]);
  expect(screen.getAllByText(attachment)).toHaveLength(2);
  expect(container.querySelector("[data-slot=input-group]")).toHaveClass("border", "border-input");
  expect(container.querySelector("[data-slot=input-control]")).not.toHaveClass("border");
});

test("static addons do not enter the tab order or redirect focus, explicit actions keep their own focus", async () => {
  const user = userEvent.setup();
  const action = vi.fn();
  render(<InputGroup><InputGroupAddon>px</InputGroupAddon><InputGroupInput aria-label="数值" /><InputGroupAddon><Button variant="quiet" onClick={action}>应用</Button></InputGroupAddon></InputGroup>);
  await user.tab();
  expect(screen.getByRole("textbox")).toHaveFocus();
  await user.click(screen.getByText("px"));
  expect(screen.getByText("px")).not.toHaveAttribute("tabindex");
  expect(screen.getByRole("textbox")).not.toHaveFocus();
  await user.click(screen.getByRole("button", { name: "应用" }));
  expect(screen.getByRole("button")).toHaveFocus();
  expect(action).toHaveBeenCalledOnce();
});

test("Field disabled and readonly values remain real native states", async () => {
  const { container } = render(<form><Field disabled name="disabled"><FieldLabel>禁用</FieldLabel><InputGroup><InputGroupInput defaultValue="omit" /><InputGroupAddon>px</InputGroupAddon></InputGroup></Field><Field name="readonly"><FieldLabel>只读值</FieldLabel><InputGroup><InputGroupInput readOnly defaultValue="keep" /></InputGroup></Field></form>);
  expect(screen.getByRole("textbox", { name: "禁用" })).toBeDisabled();
  await userEvent.type(screen.getByRole("textbox", { name: "只读值" }), "edit");
  expect(screen.getByRole("textbox", { name: "只读值" })).toHaveValue("keep");
  const data = new FormData(container.querySelector("form")!);
  expect(data.has("disabled")).toBe(false);
  expect(data.get("readonly")).toBe("keep");
});

test("FieldControl can register the native outlet once while the common boundary retains declared invalid", () => {
  const { container } = render(<Field invalid><FieldLabel>数值</FieldLabel><InputGroup><FieldControl render={<InputGroupInput nativeInput defaultValue="draft" />} /><InputGroupAddon>px</InputGroupAddon></InputGroup><FieldError>不可用</FieldError></Field>);
  expect(screen.getByRole("textbox", { name: "数值" })).toHaveAttribute("aria-invalid", "true");
  expect(screen.getByRole("textbox")).toHaveAccessibleDescription("不可用");
  expect(screen.getByRole("textbox")).toHaveValue("draft");
  expect(container.querySelector("[data-slot=input-group]")).toHaveClass("has-[input[aria-invalid=true]:focus-visible]:border-destructive-foreground");
});

test("root and addon render, refs, native props and caller classes compose independently of the input", async () => {
  const root = createRef<HTMLDivElement>();
  const input = createRef<HTMLInputElement>();
  const addon = createRef<HTMLSpanElement>();
  const changed = vi.fn();
  render(<InputGroup ref={root} data-owner="caller" className="w-auto" render={<section />}><InputGroupInput ref={input} aria-label="数值" id="number" onChange={changed} render={<input data-rendered="yes" />} /><InputGroupAddon ref={addon} className="px-0" render={<span id="unit" />}>px</InputGroupAddon></InputGroup>);
  expect(root.current?.tagName).toBe("SECTION");
  expect(root.current).toHaveAttribute("data-owner", "caller");
  expect(root.current).toHaveClass("w-auto");
  expect(input.current).toBe(screen.getByRole("textbox"));
  // 用户裁决 2026-10-05：边界与内部输入共用一套几何，值文字始终是正文尺寸。
  expect(input.current).toHaveClass("text-control-md-mobile", "sm:text-control-md");
  expect(root.current).toHaveClass("min-h-(--qy-fill-height-narrow)");
  expect(addon.current).toHaveAttribute("id", "unit");
  expect(addon.current).toHaveClass("px-0");
  await userEvent.type(input.current!, "1");
  expect(changed).toHaveBeenCalledOnce();
});

test("InputGroupButton is a named action inside the boundary: frameless, inner-height square for icons, label padding kept for text", async () => {
  const user = userEvent.setup();
  const clear = vi.fn();
  render(<InputGroup><InputGroupInput aria-label="标题" defaultValue="季度复盘" /><InputGroupButton shape="icon" aria-label="清空标题" onClick={clear}><svg aria-hidden="true" /></InputGroupButton><InputGroupButton>应用</InputGroupButton></InputGroup>);
  const icon = screen.getByRole("button", { name: "清空标题" });
  const label = screen.getByRole("button", { name: "应用" });
  for (const button of [icon, label]) {
    expect(button).toHaveAttribute("data-slot", "input-group-button");
    expect(button).toHaveAttribute("data-variant", "quiet");
    expect(button).toHaveClass("self-stretch", "min-h-0");
  }
  // 图标形的宽取边界内高（外高 − 2px 边框），不取按钮自己的外高，否则把边界撑高 2px。
  expect(icon).toHaveClass("w-[calc(var(--qy-fill-height-narrow)-2px)]", "sm:w-[calc(var(--qy-fill-height)-2px)]");
  expect(icon.className).not.toMatch(/(^|\s)(sm:)?w-\(--qy-control-md/);
  expect(label.className).not.toContain("w-[calc(");
  await user.click(icon);
  expect(clear).toHaveBeenCalledOnce();
  expect(icon).toHaveFocus();
});

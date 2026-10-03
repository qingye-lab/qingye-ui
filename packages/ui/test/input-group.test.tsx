import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { expect, test, vi } from "vitest";
import { Button } from "../src/components/button";
import { Field, FieldControl, FieldDescription, FieldError, FieldLabel } from "../src/components/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../src/components/input-group";

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
  const { container } = render(<form><Field disabled name="disabled"><FieldLabel>禁用</FieldLabel><InputGroup><InputGroupInput defaultValue="omit" clearable /><InputGroupAddon>px</InputGroupAddon></InputGroup></Field><Field name="readonly"><FieldLabel>只读值</FieldLabel><InputGroup><InputGroupInput readOnly defaultValue="keep" /></InputGroup></Field></form>);
  expect(screen.getByRole("textbox", { name: "禁用" })).toBeDisabled();
  await userEvent.type(screen.getByRole("textbox", { name: "只读值" }), "edit");
  expect(screen.getByRole("textbox", { name: "只读值" })).toHaveValue("keep");
  expect(screen.queryByRole("button", { name: "清空输入" })).toBeNull();
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
  render(<InputGroup ref={root} size="xl" data-owner="caller" className="w-auto" render={<section />}><InputGroupInput ref={input} aria-label="数值" id="number" onChange={changed} render={<input data-rendered="yes" />} /><InputGroupAddon ref={addon} className="px-0" render={<span id="unit" />}>px</InputGroupAddon></InputGroup>);
  expect(root.current?.tagName).toBe("SECTION");
  expect(root.current).toHaveAttribute("data-owner", "caller");
  expect(root.current).toHaveClass("w-auto");
  expect(input.current).toBe(screen.getByRole("textbox"));
  expect(input.current).toHaveClass("text-control-xl-mobile");
  expect(addon.current).toHaveAttribute("id", "unit");
  expect(addon.current).toHaveClass("px-0");
  await userEvent.type(input.current!, "1");
  expect(changed).toHaveBeenCalledOnce();
});

import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { expect, test, vi } from "vitest";
import { Checkbox } from "../src/components/checkbox";
import { Field, FieldError, FieldItem, FieldLabel, FieldTitle } from "../src/components/field";
import { Form, focusFirstInvalid } from "../src/components/form";
import { Input } from "../src/components/input";
import { NativeSelect } from "../src/components/native-select";
import { Radio, RadioGroup } from "../src/components/radio-group";
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "../src/components/select";

test("native submission provides actual field and native select values without declaring an outcome", async () => {
  const submitted = vi.fn();
  render(<Form onSubmit={event => { event.preventDefault(); submitted(new FormData(event.currentTarget)); }}><Field name="title"><FieldLabel>标题</FieldLabel><Input /></Field><NativeSelect name="choice" aria-label="选项" multiple size={2} defaultValue={["a", "b"]}><option value="a">一</option><option value="b">二</option></NativeSelect><button type="submit">提交</button></Form>);
  await userEvent.type(screen.getByRole("textbox", { name: "标题" }), "draft");
  await userEvent.click(screen.getByRole("button", { name: "提交" }));
  expect(submitted).toHaveBeenCalledOnce();
  const data = submitted.mock.calls[0][0] as FormData;
  expect(data.get("title")).toBe("draft");
  expect(data.getAll("choice")).toEqual(["a", "b"]);
  expect(screen.getByRole("textbox")).toHaveValue("draft");
  expect(screen.queryByRole("status")).toBeNull();
});

test("application-declared invalid and local errors can change while the draft survives", async () => {
  const fixture = (invalid: boolean) => <Form><Field name="title" invalid={invalid}><FieldLabel>标题</FieldLabel><Input defaultValue="initial" /><FieldError errors={invalid ? [{ message: "不可用" }] : []} /></Field></Form>;
  const { rerender } = render(fixture(false));
  const input = screen.getByRole("textbox", { name: "标题" });
  await userEvent.clear(input);
  await userEvent.type(input, "draft");
  rerender(fixture(true));
  expect(input).toHaveAttribute("aria-invalid", "true");
  expect(input).toHaveAccessibleDescription("不可用");
  expect(input).toHaveValue("draft");
  rerender(fixture(false));
  await waitFor(() => expect(input).not.toHaveAttribute("aria-invalid", "true"));
  expect(screen.queryByText("不可用")).toBeNull();
  expect(input).toHaveValue("draft");
});

test("platform invalid values block submission without assigning Field invalid or inventing errors", async () => {
  const submit = vi.fn(event => event.preventDefault());
  render(<Form onSubmit={submit}><Field name="email"><FieldLabel>邮箱</FieldLabel><Input type="email" required defaultValue="draft@" /><FieldError /></Field><button type="submit">提交</button></Form>);
  await userEvent.click(screen.getByRole("button", { name: "提交" }));
  expect(submit).not.toHaveBeenCalled();
  expect(screen.getByRole("textbox")).toHaveValue("draft@");
  expect(screen.getByRole("textbox")).not.toHaveAttribute("aria-invalid", "true");
  expect(document.querySelector("[data-slot=field-error]")).toBeNull();
});

test("noValidate is an explicit platform choice, and cancellation preserves the current value", async () => {
  const submit = vi.fn(event => event.preventDefault());
  render(<Form noValidate onSubmit={submit}><Field name="email"><FieldLabel>邮箱</FieldLabel><Input required type="email" defaultValue="draft@" /></Field><button type="submit">提交</button></Form>);
  await userEvent.click(screen.getByRole("button", { name: "提交" }));
  expect(submit).toHaveBeenCalledOnce();
  expect(submit.mock.calls[0][0].defaultPrevented).toBe(true);
  expect(screen.getByRole("textbox")).toHaveValue("draft@");
  expect(screen.getByRole("textbox")).not.toHaveAttribute("aria-invalid", "true");
});

test("native reset restores defaults; caller cancellation preserves editing", async () => {
  const ref = createRef<HTMLFormElement>();
  const reset = vi.fn((event) => event.preventDefault());
  const fixture = (cancel: boolean) => <Form ref={ref} onReset={cancel ? reset : undefined}><Field><FieldLabel>标题</FieldLabel><Input nativeInput defaultValue="initial" /></Field></Form>;
  const { rerender } = render(fixture(true));
  const input = screen.getByRole("textbox");
  fireEvent.change(input, { target: { value: "draft" } });
  await act(async () => { ref.current!.reset(); });
  expect(reset).toHaveBeenCalledOnce();
  expect(input).toHaveValue("draft");
  rerender(fixture(false));
  await act(async () => { ref.current!.reset(); });
  expect(input).toHaveValue("initial");
});

test("native attributes, render events, ref and caller class reach the actual form", async () => {
  const ref = createRef<HTMLFormElement>();
  const rendered = vi.fn(event => event.preventDefault());
  const caller = vi.fn();
  render(<Form aria-label="字段" ref={ref} action="/submit" method="post" data-owner="caller" className="consumer-form" render={<form data-rendered="yes" onSubmit={rendered} />} onSubmit={caller}><button type="submit">提交</button></Form>);
  expect(ref.current).toBe(screen.getByRole("form", { name: "字段" }));
  expect(ref.current).toHaveAttribute("data-rendered", "yes");
  expect(ref.current).toHaveAttribute("action", "/submit");
  expect(ref.current).toHaveAttribute("method", "post");
  expect(ref.current).toHaveAttribute("data-owner", "caller");
  expect(ref.current).toHaveClass("consumer-form");
  expect(ref.current).not.toHaveAttribute("novalidate");
  await userEvent.click(screen.getByRole("button", { name: "提交" }));
  expect(rendered).toHaveBeenCalledOnce();
  expect(caller).toHaveBeenCalledOnce();
});

test("focusFirstInvalid lands on the visible, keyboard-reachable part of the first invalid field, in document order", () => {
  const scroll = vi.fn();
  Element.prototype.scrollIntoView = scroll;
  const { container } = render(<Form>
    <Field name="ok"><FieldLabel>正常</FieldLabel><Input /></Field>
    <Field name="agree" invalid orientation="horizontal"><Checkbox /><FieldLabel>同意</FieldLabel></Field>
    <Field name="role" invalid><FieldLabel>角色</FieldLabel><Select items={[{ value: "a", label: "甲" }]}><SelectTrigger><SelectValue /></SelectTrigger><SelectPopup><SelectItem value="a">甲</SelectItem></SelectPopup></Select></Field>
    <Field name="later" invalid><FieldLabel>之后</FieldLabel><Input /></Field>
  </Form>);
  const form = container.querySelector("form")!;
  expect(focusFirstInvalid(form)).toBe(true);
  // Checkbox 的原生副本是 aria-hidden + tabindex=-1；落点是它的 role=checkbox 部件，而不是更后面的 Input。
  expect(screen.getByRole("checkbox")).toHaveFocus();
  expect(scroll).toHaveBeenCalledWith({ block: "nearest" });
});

test("focusFirstInvalid skips disabled and hidden fields, resolves a RadioGroup to its tabbable radio, and reports false when nothing qualifies", () => {
  const { container, rerender } = render(<Form>
    <Field name="off" invalid disabled><FieldLabel>停用</FieldLabel><Input /></Field>
    <Field name="gone" invalid><FieldLabel>隐藏</FieldLabel><div hidden><Input /></div></Field>
    <Field name="pick" invalid><FieldTitle id="pick-title">选择</FieldTitle><RadioGroup aria-labelledby="pick-title" defaultValue="b"><FieldItem><Radio value="a" /><FieldLabel>甲</FieldLabel></FieldItem><FieldItem><Radio value="b" /><FieldLabel>乙</FieldLabel></FieldItem></RadioGroup></Field>
  </Form>);
  const form = container.querySelector("form")!;
  expect(focusFirstInvalid(form)).toBe(true);
  expect(screen.getByRole("radio", { name: "乙" })).toHaveFocus();
  rerender(<Form><Field name="off" invalid disabled><FieldLabel>停用</FieldLabel><Input /></Field><Field name="fine"><FieldLabel>正常</FieldLabel><Input /></Field></Form>);
  expect(focusFirstInvalid(container.querySelector("form")!)).toBe(false);
});

test("focusFirstInvalid includes controls attached with the form attribute, in document order", () => {
  const { container } = render(<>
    <Input form="signup" aria-label="之前" aria-invalid="true" />
    <Form id="signup"><Field name="inside" invalid><FieldLabel>里面</FieldLabel><Input /></Field></Form>
  </>);
  expect(focusFirstInvalid(container.querySelector("form")!)).toBe(true);
  expect(screen.getByRole("textbox", { name: "之前" })).toHaveFocus();
});

test("focusFirstInvalid also finds a native :invalid control whose visible part carries no aria-invalid", () => {
  const { container } = render(<Form><Field name="agree" orientation="horizontal"><Checkbox required /><FieldLabel>同意</FieldLabel></Field></Form>);
  expect(focusFirstInvalid(container.querySelector("form")!)).toBe(true);
  expect(screen.getByRole("checkbox")).toHaveFocus();
});

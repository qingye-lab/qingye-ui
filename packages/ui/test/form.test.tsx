import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { expect, test, vi } from "vitest";
import { Field, FieldError, FieldLabel } from "../src/components/field";
import { Form } from "../src/components/form";
import { Input } from "../src/components/input";
import { NativeSelect } from "../src/components/native-select";

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

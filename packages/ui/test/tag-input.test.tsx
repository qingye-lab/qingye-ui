import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef, useState } from "react";
import { expect, test, vi } from "vitest";
import { Field, FieldDescription, FieldError, FieldLabel } from "../src/components/field";
import { TagInput } from "../src/components/tag-input";
import { UILocaleProvider } from "../src/locale";
import { enUS } from "../src/locales/en-US";

test("a named Field submits confirmed tags without its unconfirmed draft", () => {
  const { container } = render(<form><Field name="tags"><FieldLabel>标签</FieldLabel><TagInput name="tags" defaultValue={["已确认"]} defaultDraft="未确认" /></Field></form>);
  expect(screen.getByRole("textbox", { name: "标签" })).toHaveValue("未确认");
  expect(new FormData(container.querySelector("form")!).getAll("tags")).toEqual(["已确认"]);
});

test("confirmed tags alone submit; Enter adds trimmed text without submitting a form", async () => {
  const submit = vi.fn(event => event.preventDefault());
  const { container } = render(<form onSubmit={submit}><TagInput name="tags" defaultValue={["青叶"]} inputProps={{ "aria-label": "标签" }} /></form>);
  await userEvent.type(screen.getByRole("textbox"), "  界面  {Enter}");
  expect(screen.getByRole("textbox")).toHaveValue("");
  expect(new FormData(container.querySelector("form")!).getAll("tags")).toEqual(["青叶", "界面"]);
  await userEvent.type(screen.getByRole("textbox"), "草稿");
  expect(new FormData(container.querySelector("form")!).getAll("tags")).toEqual(["青叶", "界面"]);
  expect(submit).not.toHaveBeenCalled();
});

test("empty and duplicate confirmation preserve drafts and explain the precise reason", async () => {
  render(<TagInput defaultValue={["Qingye"]} inputProps={{ "aria-label": "标签" }} />);
  const input = screen.getByRole("textbox");
  await userEvent.type(input, "  {Enter}");
  expect(input).toHaveValue("  ");
  expect(screen.getByRole("status")).toHaveTextContent("请输入非空标签");
  await userEvent.clear(input);
  await userEvent.type(input, "Qingye{Enter}");
  expect(input).toHaveValue("Qingye");
  expect(screen.getByRole("status")).toHaveTextContent("“Qingye”已添加");
  await userEvent.clear(input);
  await userEvent.type(input, "qingye{Enter}");
  expect(screen.getAllByRole("listitem")).toHaveLength(2);
});

test("IME Enter does not confirm; the completed draft remains until an explicit later Enter", () => {
  const change = vi.fn();
  render(<TagInput onValueChange={change} inputProps={{ "aria-label": "标签" }} />);
  const input = screen.getByRole("textbox");
  fireEvent.compositionStart(input);
  fireEvent.change(input, { target: { value: "青叶" } });
  fireEvent.keyDown(input, { key: "Enter", keyCode: 229, isComposing: true });
  fireEvent.compositionEnd(input);
  expect(input).toHaveValue("青叶");
  expect(change).not.toHaveBeenCalled();
  fireEvent.keyDown(input, { key: "Enter" });
  expect(change).toHaveBeenCalledOnce();
  expect(input).toHaveValue("");
});

test("controlled rejection and canceled acceptance both retain the draft", async () => {
  const change = vi.fn();
  const { rerender } = render(<TagInput value={[]} onValueChange={change} defaultDraft="青叶" inputProps={{ "aria-label": "标签" }} />);
  await userEvent.click(screen.getByRole("button", { name: "添加标签" }));
  expect(screen.getByRole("textbox")).toHaveValue("青叶");
  expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  rerender(<TagInput value={["远程项"]} onValueChange={change} defaultDraft="青叶" inputProps={{ "aria-label": "标签" }} />);
  expect(screen.getByRole("textbox")).toHaveValue("青叶");
  rerender(<TagInput value={["远程项", "青叶"]} onValueChange={change} defaultDraft="青叶" inputProps={{ "aria-label": "标签" }} />);
  expect(screen.getByRole("textbox")).toHaveValue("");
  rerender(<TagInput defaultDraft="青叶" onValueChange={(_, details) => details.cancel()} inputProps={{ "aria-label": "标签" }} />);
  await userEvent.type(screen.getByRole("textbox"), "界面{Enter}");
  expect(screen.getByRole("textbox")).toHaveValue("界面");
});

test("controlled collection and draft can be accepted independently", async () => {
  function Example() {
    const [tags, setTags] = useState<string[]>([]);
    const [draft, setDraft] = useState("");
    return <TagInput value={tags} onValueChange={setTags} draft={draft} onDraftChange={setDraft} inputProps={{ "aria-label": "标签" }} />;
  }
  render(<Example />);
  await userEvent.type(screen.getByRole("textbox"), "青叶{Enter}");
  expect(screen.getByRole("listitem")).toHaveTextContent("青叶");
  expect(screen.getByRole("textbox")).toHaveValue("");
});

test("empty-draft Backspace first focuses a confirmed tag; Delete removes it and restores focus", async () => {
  render(<TagInput defaultValue={["青叶", "界面"]} inputProps={{ "aria-label": "标签" }} />);
  await userEvent.click(screen.getByRole("textbox"));
  await userEvent.keyboard("{Backspace}");
  expect(screen.getByRole("button", { name: "移除 界面" })).toHaveFocus();
  expect(screen.getAllByRole("listitem")).toHaveLength(2);
  await userEvent.keyboard("{Delete}");
  expect(screen.getAllByRole("listitem")).toHaveLength(1);
  expect(screen.getByRole("button", { name: "移除 青叶" })).toHaveFocus();
  await userEvent.keyboard("{ArrowRight}");
  expect(screen.getByRole("textbox")).toHaveFocus();
});

test.each(["disabled", "readOnly"] as const)("%s also blocks confirmed-item actions and has correct form participation", async state => {
  const change = vi.fn();
  const { container } = render(<UILocaleProvider locale={enUS}><form><TagInput name="tags" defaultValue={["Qingye"]} defaultDraft="draft" {...{ [state]: true }} onValueChange={change} inputProps={{ "aria-label": "Tags" }} /></form></UILocaleProvider>);
  await userEvent.type(screen.getByRole("textbox"), "9{Enter}");
  expect(screen.getByRole("textbox")).toHaveValue("draft");
  expect(change).not.toHaveBeenCalled();
  expect(new FormData(container.querySelector("form")!).getAll("tags")).toEqual(state === "disabled" ? [] : ["Qingye"]);
  if (state === "readOnly") expect(screen.queryByRole("button", { name: "Remove Qingye" })).not.toBeInTheDocument();
  else expect(screen.getByRole("button", { name: "Remove Qingye" })).toBeDisabled();
});

test("Field name and error and input/root render/ref/event forwarding remain reachable", async () => {
  const inputRef = createRef<HTMLInputElement>();
  const rootRef = createRef<HTMLDivElement>();
  const focus = vi.fn();
  const { container, rerender } = render(<Field invalid disabled><FieldLabel>标签</FieldLabel><TagInput name="tags" defaultValue={["青叶"]} ref={rootRef} render={<div data-root="yes" />} inputProps={{ ref: inputRef, render: <input data-input="yes" />, onFocus: focus }} /><FieldDescription>页面分类</FieldDescription><FieldError>分类待确认</FieldError></Field>);
  const input = screen.getByRole("textbox", { name: "标签" });
  expect(inputRef.current).toBe(input);
  expect(rootRef.current).toHaveAttribute("data-root", "yes");
  expect(input).toHaveAttribute("data-input", "yes");
  expect(input).toBeDisabled();
  expect(screen.getByRole("button", { name: "移除 青叶" })).toBeDisabled();
  expect(container.querySelector('input[type="hidden"]')).toBeDisabled();
  rerender(<Field invalid><FieldLabel>标签</FieldLabel><TagInput defaultValue={["青叶"]} inputProps={{ ref: inputRef, onFocus: focus }} /><FieldDescription>页面分类</FieldDescription><FieldError>分类待确认</FieldError></Field>);
  expect(input).toHaveAccessibleDescription("页面分类 分类待确认");
  await userEvent.click(input);
  expect(focus).toHaveBeenCalledOnce();
});

test("reset restores uncontrolled collection and draft; canceled reset preserves editing", async () => {
  const { container, rerender } = render(<form><TagInput defaultValue={["青叶"]} defaultDraft="初稿" inputProps={{ "aria-label": "标签" }} /></form>);
  await userEvent.clear(screen.getByRole("textbox"));
  await userEvent.type(screen.getByRole("textbox"), "新稿{Enter}");
  await act(async () => container.querySelector("form")!.reset());
  expect(screen.getByRole("textbox")).toHaveValue("初稿");
  expect(screen.getAllByRole("listitem")).toHaveLength(1);
  rerender(<form onReset={event => event.preventDefault()}><TagInput defaultValue={["青叶"]} defaultDraft="初稿" inputProps={{ "aria-label": "标签" }} /></form>);
  await userEvent.type(screen.getByRole("textbox"), "保留");
  await act(async () => container.querySelector("form")!.reset());
  expect(screen.getByRole("textbox")).toHaveValue("初稿保留");
});

test("caller keyboard cancellation retains the draft without confirming a collection item", async () => {
  const change = vi.fn();
  render(<TagInput defaultDraft="青叶" onValueChange={change} inputProps={{ "aria-label": "标签", onKeyDown: event => event.preventBaseUIHandler() }} />);
  await userEvent.click(screen.getByRole("textbox"));
  await userEvent.keyboard("{Enter}");
  expect(screen.getByRole("textbox")).toHaveValue("青叶");
  expect(change).not.toHaveBeenCalled();
});

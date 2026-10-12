import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef, useState } from "react";
import { expect, test, vi } from "vitest";
import { Field, FieldDescription, FieldError, FieldLabel } from "../src/components/field";
import { TagInput } from "../src/components/tag-input";
import { UILocaleProvider } from "../src/locale";
import { enUS } from "../src/locales/en-US";

test("form data read outside a submission holds confirmed tags only; the draft is taken in by the submit itself", () => {
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

// —— required、提交时的草稿 ——

test("required means at least one tag: the draft input carries the native flag only while there is none", async () => {
  const { container } = render(<form><TagInput required inputProps={{ "aria-label": "标签" }} /></form>);
  const form = container.querySelector("form")!;
  const input = screen.getByRole("textbox");
  expect(input).toHaveAttribute("required");
  expect(form.checkValidity()).toBe(false);
  await userEvent.type(input, "界面{Enter}");
  expect(input).not.toHaveAttribute("required");
  expect(input).toHaveAttribute("aria-required", "true");
  expect(form.checkValidity()).toBe(true);
  await userEvent.click(screen.getByRole("button", { name: "移除 界面" }));
  expect(input).toHaveAttribute("required");
});

test("a required field with tags is valid when the draft is empty; inputProps.required is ignored with a development warning", () => {
  const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
  const { container } = render(<form><TagInput defaultValue={["已有"]} required inputProps={{ "aria-label": "标签", ...{ required: true } }} /></form>);
  expect(container.querySelector("form")!.checkValidity()).toBe(true);
  expect(warn).toHaveBeenCalledWith(expect.stringContaining("inputProps.required"));
  warn.mockRestore();
});

test("submitting with an unconfirmed draft takes the draft in by the Enter rule, before the form data is read", async () => {
  const seen: string[][] = [];
  const submit = vi.fn((event: React.FormEvent<HTMLFormElement>) => { event.preventDefault(); seen.push(new FormData(event.currentTarget).getAll("tags") as string[]); });
  render(<form onSubmit={submit}><TagInput name="tags" defaultValue={["青叶"]} inputProps={{ "aria-label": "标签" }} /><button>提交</button></form>);
  await userEvent.type(screen.getByRole("textbox"), "界面");
  await userEvent.click(screen.getByRole("button", { name: "提交" }));
  expect(submit).toHaveBeenCalledOnce();
  expect(seen).toEqual([["青叶", "界面"]]);
  expect(screen.getByRole("textbox")).toHaveValue("");
});

test.each([
  ["a duplicate", { defaultValue: ["青叶"] }, "青叶", "已添加"],
  ["a rule failure", { validate: (tag: string) => tag.includes("@") ? undefined : "需要邮箱" }, "青叶", "需要邮箱"],
])("submitting is stopped, with the reason beside the field, when the draft is %s", async (_label, props, draft, reason) => {
  const submit = vi.fn(event => event.preventDefault());
  render(<form onSubmit={submit}><TagInput name="tags" {...props} inputProps={{ "aria-label": "标签" }} /><button>提交</button></form>);
  await userEvent.type(screen.getByRole("textbox"), draft);
  await userEvent.click(screen.getByRole("button", { name: "提交" }));
  expect(submit).not.toHaveBeenCalled();
  expect(screen.getByRole("status")).toHaveTextContent(reason);
  expect(screen.getByRole("textbox")).toHaveValue(draft);
  expect(screen.getByRole("textbox")).toHaveFocus();
});

test("a controlled caller that does not accept the tag also stops the submit and keeps the draft", async () => {
  const submit = vi.fn(event => event.preventDefault());
  render(<form onSubmit={submit}><TagInput value={[]} onValueChange={() => {}} inputProps={{ "aria-label": "标签" }} /><button>提交</button></form>);
  await userEvent.type(screen.getByRole("textbox"), "青叶");
  await userEvent.click(screen.getByRole("button", { name: "提交" }));
  expect(submit).not.toHaveBeenCalled();
  expect(screen.getByRole("status")).toHaveTextContent("“青叶”尚未添加");
  expect(screen.getByRole("textbox")).toHaveValue("青叶");
});

test("a form with an empty draft submits untouched", async () => {
  const submit = vi.fn(event => event.preventDefault());
  render(<form onSubmit={submit}><TagInput defaultValue={["青叶"]} inputProps={{ "aria-label": "标签" }} /><button>提交</button></form>);
  await userEvent.click(screen.getByRole("button", { name: "提交" }));
  expect(submit).toHaveBeenCalledOnce();
  expect(screen.queryByRole("status")).not.toBeInTheDocument();
});

// —— splitOn、max、addOnBlur、validate ——

test("splitOn: a typed separator takes in what precedes it; pasting a list takes in every part", async () => {
  const user = userEvent.setup();
  render(<TagInput splitOn={/\s*[,，]\s*/} inputProps={{ "aria-label": "标签" }} />);
  const input = screen.getByRole("textbox");
  await user.type(input, "a,b");
  expect(screen.getAllByRole("listitem").map(item => item.textContent)).toEqual(["a"]);
  expect(input).toHaveValue("b");
  await user.clear(input);
  await user.paste("c@x.com, d@x.com，e@x.com");
  expect(screen.getAllByRole("listitem").map(item => item.textContent)).toEqual(["a", "c@x.com", "d@x.com", "e@x.com"]);
  expect(input).toHaveValue("");
});

test("without splitOn a pasted list stays whole in the draft", async () => {
  render(<TagInput inputProps={{ "aria-label": "标签" }} />);
  await userEvent.click(screen.getByRole("textbox"));
  await userEvent.paste("a, b");
  expect(screen.getByRole("textbox")).toHaveValue("a, b");
  expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
});

test("splitOn keeps a rejected part in the draft with the reason, and takes in the rest", async () => {
  render(<TagInput splitOn="," defaultValue={["a"]} validate={tag => tag === "bad" ? "不允许 bad" : undefined} inputProps={{ "aria-label": "标签" }} />);
  await userEvent.click(screen.getByRole("textbox"));
  await userEvent.paste("a,bad,c");
  expect(screen.getAllByRole("listitem").map(item => item.textContent)).toEqual(["a", "c"]);
  expect(screen.getByRole("textbox")).toHaveValue("a,bad");
  expect(screen.getByRole("status")).toHaveTextContent("“a”已添加");
});

test("splitOn waits for composition to end before reading a separator", () => {
  render(<TagInput splitOn="," inputProps={{ "aria-label": "标签" }} />);
  const input = screen.getByRole("textbox");
  fireEvent.compositionStart(input);
  fireEvent.change(input, { target: { value: "青叶," } });
  expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  fireEvent.compositionEnd(input);
  expect(screen.getByRole("listitem")).toHaveTextContent("青叶");
  expect(input).toHaveValue("");
});

test("max: reaching it disables the draft and the add action with the reason, but not the tags or their form fields", async () => {
  const { container } = render(<form><TagInput name="tags" max={2} defaultValue={["a"]} inputProps={{ "aria-label": "标签" }} /></form>);
  const input = screen.getByRole("textbox");
  expect(screen.getByRole("button", { name: "添加标签（最多 2 个）" })).toBeEnabled();
  expect(input).toHaveAccessibleDescription("最多 2 个标签");
  await userEvent.type(input, "b{Enter}");
  expect(input).toBeDisabled();
  expect(screen.getByRole("button", { name: "添加标签（最多 2 个）" })).toBeDisabled();
  expect(screen.getByRole("status")).toHaveTextContent("最多 2 个标签");
  expect(input).toHaveAccessibleDescription("最多 2 个标签");
  expect(screen.getByRole("button", { name: "移除 b" })).toHaveFocus();
  expect(new FormData(container.querySelector("form")!).getAll("tags")).toEqual(["a", "b"]);
  await userEvent.click(screen.getByRole("button", { name: "移除 b" }));
  expect(input).toBeEnabled();
  expect(screen.queryByRole("status")).not.toBeInTheDocument();
});

test("max does not truncate an existing collection and rejects a pasted overflow with the reason", async () => {
  const first = render(<TagInput max={2} defaultValue={["a", "b", "c"]} inputProps={{ "aria-label": "标签" }} />);
  expect(screen.getAllByRole("listitem")).toHaveLength(3);
  expect(screen.getByRole("textbox")).toBeDisabled();
  first.unmount();
  render(<TagInput max={2} splitOn="," defaultValue={["a"]} inputProps={{ "aria-label": "标签" }} />);
  await userEvent.click(screen.getByRole("textbox"));
  await userEvent.paste("b,c,d");
  expect(screen.getAllByRole("listitem").map(item => item.textContent)).toEqual(["a", "b"]);
  expect(screen.getByRole("status")).toHaveTextContent("最多 2 个标签");
  // 溢出的草稿仍可编辑：清空之后才因到上限而停用，不会留下一段挡住提交、又改不了的字。
  const input = screen.getByRole("textbox");
  expect(input).toHaveValue("c,d");
  expect(input).toBeEnabled();
  await userEvent.clear(input);
  expect(input).toBeDisabled();
});

test("max must be a positive integer", () => {
  const spy = vi.spyOn(console, "error").mockImplementation(() => {});
  expect(() => render(<TagInput max={0} />)).toThrow(RangeError);
  spy.mockRestore();
});

test("addOnBlur takes the draft in when focus leaves, but not when it only moves to the add action", async () => {
  const change = vi.fn();
  render(<div><TagInput addOnBlur onValueChange={change} inputProps={{ "aria-label": "标签" }} /><button>别处</button></div>);
  await userEvent.type(screen.getByRole("textbox"), "青叶");
  await userEvent.click(screen.getByRole("button", { name: "添加标签" }));
  expect(change).toHaveBeenCalledOnce();
  expect(screen.getByRole("textbox")).toHaveFocus();
  await userEvent.type(screen.getByRole("textbox"), "界面");
  await userEvent.click(screen.getByRole("button", { name: "别处" }));
  expect(screen.getAllByRole("listitem").map(item => item.textContent)).toEqual(["青叶", "界面"]);
});

test("addOnBlur is off by default and an empty or invalid draft on blur makes no noise", async () => {
  render(<div><TagInput defaultValue={["a"]} inputProps={{ "aria-label": "标签" }} /><TagInput addOnBlur defaultValue={["a"]} inputProps={{ "aria-label": "二" }} /><button>别处</button></div>);
  await userEvent.type(screen.getByRole("textbox", { name: "标签" }), "b");
  await userEvent.click(screen.getByRole("button", { name: "别处" }));
  expect(screen.getByRole("textbox", { name: "标签" })).toHaveValue("b");
  await userEvent.click(screen.getByRole("textbox", { name: "二" }));
  await userEvent.click(screen.getByRole("button", { name: "别处" }));
  expect(screen.queryByRole("status")).not.toBeInTheDocument();
  await userEvent.type(screen.getByRole("textbox", { name: "二" }), "a");
  await userEvent.click(screen.getByRole("button", { name: "别处" }));
  expect(screen.getByRole("status")).toHaveTextContent("“a”已添加");
});

test("validate receives the tag and the confirmed tags; its message is shown and described, and the draft is kept", async () => {
  const validate = vi.fn((tag: string) => tag.includes("@") ? undefined : "需要邮箱");
  render(<TagInput defaultValue={["a@x.com"]} validate={validate} inputProps={{ "aria-label": "邮箱" }} />);
  const input = screen.getByRole("textbox");
  await userEvent.type(input, "青叶{Enter}");
  expect(validate).toHaveBeenCalledWith("青叶", ["a@x.com"]);
  expect(input).toHaveValue("青叶");
  expect(screen.getByRole("status")).toHaveTextContent("需要邮箱");
  expect(input).toHaveAccessibleDescription("需要邮箱");
  await userEvent.clear(input);
  await userEvent.type(input, "b@x.com{Enter}");
  expect(screen.getAllByRole("listitem")).toHaveLength(2);
  expect(screen.queryByRole("status")).not.toBeInTheDocument();
});

test("under rtl layout the arrow keys follow it: toward the tags is ArrowRight", async () => {
  // jsdom does not inherit `direction`; the real-browser check is in the report. Here only the key logic is exercised.
  const real = window.getComputedStyle.bind(window);
  const spy = vi.spyOn(window, "getComputedStyle").mockImplementation((element, pseudo) => Object.assign(Object.create(real(element, pseudo)), { direction: "rtl" }));
  render(<div dir="rtl"><TagInput defaultValue={["青叶", "界面"]} inputProps={{ "aria-label": "标签" }} /></div>);
  const input = screen.getByRole("textbox");
  await userEvent.click(input);
  await userEvent.keyboard("{ArrowLeft}");
  expect(input).toHaveFocus();
  await userEvent.keyboard("{ArrowRight}");
  expect(screen.getByRole("button", { name: "移除 界面" })).toHaveFocus();
  await userEvent.keyboard("{ArrowRight}");
  expect(screen.getByRole("button", { name: "移除 青叶" })).toHaveFocus();
  await userEvent.keyboard("{ArrowLeft}{ArrowLeft}");
  expect(input).toHaveFocus();
  spy.mockRestore();
});

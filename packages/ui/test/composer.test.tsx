import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { expect, test, vi } from "vitest";
import {
  Composer, ComposerInput, ComposerSubmit, ComposerToolbar, composerValueFromText, composerValueToText, isComposerValueEmpty,
  parseComposerValue, type ComposerItem, type ComposerSegment, type ComposerTrigger,
} from "../src/components/composer";
import { offsetToPoint, parseEditor, pointToOffset, writeSelection } from "../src/composer/dom";
import { findComposerTrigger } from "../src/composer/model";
import { UILocaleProvider } from "../src/locale";
import { enUS } from "../src/locales/en-US";

const people: ComposerItem[] = [
  { id: "u1", label: "林青", group: "成员" },
  { id: "u2", label: "苏野", group: "成员" },
  { id: "t1", label: "设计组", group: "团队" },
];
const mention: ComposerTrigger = { char: "@", getItems: (query) => people.filter((item) => item.label.includes(query)) };

const editorOf = () => screen.getByRole("textbox");
const type = async (text: string) => { editorOf().focus(); await userEvent.keyboard(text); };
const textOf = (value: readonly ComposerSegment[]) => composerValueToText(value);

test("value helpers: serialize, restore, and tell empty from whitespace", () => {
  const value: ComposerSegment[] = [{ type: "text", text: "你好 " }, { type: "token", trigger: "@", id: "u1", label: "林青" }, { type: "text", text: "\n谢谢" }];
  expect(composerValueToText(value)).toBe("你好 @林青\n谢谢");
  expect(composerValueFromText("你好 @林青\n谢谢", [{ type: "token", trigger: "@", id: "u1", label: "林青" }])).toEqual(value);
  expect(composerValueFromText("a")).toEqual([{ type: "text", text: "a" }]);
  const ann = { type: "token", trigger: "@", id: "u2", label: "Ann" } as const;
  expect(composerValueFromText("mail a@Ann.com", [ann])).toEqual([{ type: "text", text: "mail a@Ann.com" }]);
  expect(composerValueFromText("@Anna", [ann])).toEqual([{ type: "text", text: "@Anna" }]);
  expect(composerValueFromText("@Ann, hi", [ann])).toEqual([ann, { type: "text", text: ", hi" }]);
  const bob = { type: "token", trigger: "@", id: "u3", label: "Bob" } as const;
  expect(composerValueFromText(composerValueToText([ann, bob]), [ann, bob])).toEqual([ann, bob]);
  expect(parseComposerValue("a")).toEqual([{ type: "text", text: "a" }]);
  expect(parseComposerValue(value)).toEqual(value);
  expect(isComposerValueEmpty([{ type: "text", text: " \n " }])).toBe(true);
  expect(isComposerValueEmpty([{ type: "token", trigger: "@", id: "u1", label: "林青" }])).toBe(false);
});

test("offsets count the newline that a browser-made block adds, the same way the value does", () => {
  const root = document.createElement("div");
  root.innerHTML = "ab<div>cd</div><div>ef</div>";
  expect(composerValueToText(parseEditor(root))).toBe("ab\ncd\nef");
  const [, first, second] = Array.from(root.childNodes);
  expect(pointToOffset(root, first!.firstChild!, 1)).toBe(4);
  expect(pointToOffset(root, second!.firstChild!, 2)).toBe(8);
  expect(pointToOffset(root, root, 3)).toBe(8);
  expect(offsetToPoint(root, 8)).toEqual({ node: root, offset: 3 });
  const leading = document.createElement("div");
  leading.innerHTML = "<div>cd</div>";
  expect(pointToOffset(leading, leading.firstChild!.firstChild!, 2)).toBe(2);
});

test("trigger detection ignores mid-word characters and respects startOnly", () => {
  const rules = [{ char: "@" }, { char: "/", startOnly: true }];
  const at = (text: string, caret = text.length) => findComposerTrigger([{ type: "text", text }], caret, rules);
  expect(at("你好 @li")).toMatchObject({ index: 0, query: "li", start: 3 });
  expect(at("a@b")).toBeNull();
  expect(at("@a b")).toBeNull();
  expect(at("/cl")).toMatchObject({ index: 1, query: "cl" });
  expect(at("x /cl")).toBeNull();
});

test("the editor is a named multiline textbox; a name is required", () => {
  render(<Composer><ComposerInput aria-label="消息" placeholder="写点什么" /></Composer>);
  const editor = editorOf();
  expect(editor).toHaveAccessibleName("消息");
  expect(editor).toHaveAttribute("aria-multiline", "true");
  expect(editor).toHaveAttribute("data-placeholder", "写点什么");
  const error = vi.spyOn(console, "error").mockImplementation(() => {});
  // @ts-expect-error 缺少名称
  expect(() => render(<Composer><ComposerInput /></Composer>)).toThrow(/aria-label/);
  error.mockRestore();
});

test("uncontrolled typing reports segments; Enter submits and Shift+Enter inserts a newline", async () => {
  const onValueChange = vi.fn();
  const onSubmit = vi.fn();
  render(<Composer onValueChange={onValueChange} onSubmit={onSubmit}><ComposerInput aria-label="消息" /></Composer>);
  await type("你好");
  expect(onValueChange).toHaveBeenLastCalledWith([{ type: "text", text: "你好" }], expect.objectContaining({ reason: "input" }));
  await userEvent.keyboard("{Shift>}{Enter}{/Shift}世界");
  expect(textOf(onValueChange.mock.lastCall![0])).toBe("你好\n世界");
  expect(onSubmit).not.toHaveBeenCalled();
  await userEvent.keyboard("{Enter}");
  expect(onSubmit).toHaveBeenCalledTimes(1);
  expect(textOf(onSubmit.mock.lastCall![0])).toBe("你好\n世界");
});

test("an empty or whitespace-only value is never submitted", async () => {
  const onSubmit = vi.fn();
  render(<Composer onSubmit={onSubmit}><ComposerInput aria-label="消息" /></Composer>);
  await type("{Enter}");
  expect(onSubmit).not.toHaveBeenCalled();
});

test("submitOn mod-enter: plain Enter breaks the line, Ctrl+Enter submits", async () => {
  const onSubmit = vi.fn();
  render(<Composer submitOn="mod-enter" onSubmit={onSubmit}><ComposerInput aria-label="消息" /></Composer>);
  await type("甲{Enter}乙");
  expect(onSubmit).not.toHaveBeenCalled();
  await userEvent.keyboard("{Control>}{Enter}{/Control}");
  expect(onSubmit).toHaveBeenCalledTimes(1);
  expect(textOf(onSubmit.mock.lastCall![0])).toBe("甲\n乙");
});

test("Enter during IME composition neither submits nor breaks the line", () => {
  const onSubmit = vi.fn();
  render(<Composer defaultValue={[{ type: "text", text: "ni" }]} onSubmit={onSubmit}><ComposerInput aria-label="消息" /></Composer>);
  const editor = editorOf();
  editor.focus();
  fireEvent.compositionStart(editor);
  fireEvent.keyDown(editor, { key: "Enter", isComposing: true, keyCode: 229 });
  fireEvent.compositionEnd(editor);
  fireEvent.keyDown(editor, { key: "Enter", keyCode: 229 });
  expect(onSubmit).not.toHaveBeenCalled();
  fireEvent.keyDown(editor, { key: "Enter", keyCode: 13 });
  expect(onSubmit).toHaveBeenCalledTimes(1);
});

test("the submit button follows the value and root state, and submits then clears through the callback", async () => {
  const onSubmit = vi.fn((_value, { clear }) => clear());
  render(<Composer onSubmit={onSubmit}><ComposerInput aria-label="消息" /><ComposerToolbar><ComposerSubmit /></ComposerToolbar></Composer>);
  const button = screen.getByRole("button", { name: "发送" });
  expect(button).toBeDisabled();
  await type("好");
  expect(button).toBeEnabled();
  await userEvent.click(button);
  expect(onSubmit).toHaveBeenCalledTimes(1);
  expect(editorOf()).toHaveTextContent("");
  expect(screen.getByRole("button", { name: "发送" })).toBeDisabled();
});

test("built-in strings come from the locale", () => {
  render(<UILocaleProvider locale={enUS}><Composer defaultValue={[{ type: "text", text: "x" }]}><ComposerInput aria-label="Message" /><ComposerSubmit /></Composer></UILocaleProvider>);
  expect(screen.getByRole("button", { name: "Send" })).toBeInTheDocument();
});

test("controlled value is rendered, and a rejected change is restored", async () => {
  function Controlled() {
    const [value, setValue] = useState<readonly ComposerSegment[]>([{ type: "text", text: "起" }]);
    return <Composer value={value} onValueChange={(next, details) => { if (textOf(next).includes("x")) details.cancel(); else setValue(next); }}><ComposerInput aria-label="消息" /></Composer>;
  }
  render(<Controlled />);
  expect(editorOf()).toHaveTextContent("起");
  editorOf().focus();
  writeSelection(editorOf(), 1, 1);
  await userEvent.keyboard("a");
  expect(editorOf()).toHaveTextContent("起a");
  await userEvent.keyboard("x");
  expect(editorOf()).toHaveTextContent("起a");
  expect(editorOf()).not.toHaveTextContent("x");
});

test("tokens render as named atoms and Backspace removes one as a whole", async () => {
  const onValueChange = vi.fn();
  render(<Composer defaultValue={[{ type: "text", text: "请 " }, { type: "token", trigger: "@", id: "u1", label: "林青" }, { type: "text", text: " 看" }]} onValueChange={onValueChange}><ComposerInput aria-label="消息" /></Composer>);
  const token = screen.getByRole("img", { name: "@林青" });
  expect(token).toHaveAttribute("contenteditable", "false");
  editorOf().focus();
  writeSelection(editorOf(), 3, 3);
  await userEvent.keyboard("{Backspace}");
  expect(screen.queryByRole("img", { name: "@林青" })).not.toBeInTheDocument();
  expect(onValueChange).toHaveBeenLastCalledWith([{ type: "text", text: "请  看" }], expect.objectContaining({ reason: "delete-token" }));
});

test("Delete removes the token after the caret as a whole", async () => {
  render(<Composer defaultValue={[{ type: "token", trigger: "@", id: "u1", label: "林青" }, { type: "text", text: "你" }]}><ComposerInput aria-label="消息" /></Composer>);
  editorOf().focus();
  writeSelection(editorOf(), 0, 0);
  await userEvent.keyboard("{Delete}");
  expect(screen.queryByRole("img")).not.toBeInTheDocument();
  expect(editorOf()).toHaveTextContent("你");
});

test("typing a trigger opens a combobox-wired listbox; arrows move, Enter inserts a token", async () => {
  const onValueChange = vi.fn();
  render(<Composer onValueChange={onValueChange}><ComposerInput aria-label="消息" triggers={[mention]} /></Composer>);
  await type("看 @");
  const editor = editorOf();
  const listbox = await screen.findByRole("listbox");
  expect(editor).toHaveAttribute("aria-controls", listbox.id);
  expect(editor).toHaveAttribute("aria-autocomplete", "list");
  const options = screen.getAllByRole("option");
  expect(options.map((o) => o.textContent)).toEqual(["林青", "苏野", "设计组"]);
  expect(editor).toHaveAttribute("aria-activedescendant", options[0]!.id);
  expect(options[0]).toHaveAttribute("aria-selected", "true");
  expect(screen.getAllByRole("group").map((g) => g.textContent?.slice(0, 2))).toEqual(["成员", "团队"]);
  await userEvent.keyboard("{ArrowDown}");
  expect(editor).toHaveAttribute("aria-activedescendant", options[1]!.id);
  await userEvent.keyboard("{ArrowUp}{ArrowUp}");
  expect(editor).toHaveAttribute("aria-activedescendant", options[2]!.id);
  await userEvent.keyboard("{ArrowDown}{Enter}");
  expect(screen.getByRole("img", { name: "@林青" })).toBeInTheDocument();
  await waitFor(() => expect(screen.queryByRole("listbox")).not.toBeInTheDocument());
  expect(editor).not.toHaveAttribute("aria-controls");
  expect(onValueChange.mock.lastCall![0]).toEqual([
    { type: "text", text: "看 " }, { type: "token", trigger: "@", id: "u1", label: "林青" }, { type: "text", text: " " },
  ]);
  expect(onValueChange.mock.lastCall![1]).toMatchObject({ reason: "token" });
});

test("the query filters candidates and Tab selects the highlighted one", async () => {
  render(<Composer><ComposerInput aria-label="消息" triggers={[mention]} /></Composer>);
  await type("@苏");
  await waitFor(() => expect(screen.getAllByRole("option")).toHaveLength(1));
  await userEvent.keyboard("{Tab}");
  expect(screen.getByRole("img", { name: "@苏野" })).toBeInTheDocument();
});

test("Escape closes the candidates without losing the typed text", async () => {
  render(<Composer><ComposerInput aria-label="消息" triggers={[mention]} /></Composer>);
  await type("@林");
  await screen.findByRole("listbox");
  await userEvent.keyboard("{Escape}");
  await waitFor(() => expect(screen.queryByRole("listbox")).not.toBeInTheDocument());
  expect(editorOf()).toHaveTextContent("@林");
});

test("a mid-word trigger character does not open candidates", async () => {
  render(<Composer><ComposerInput aria-label="消息" triggers={[mention]} /></Composer>);
  await type("a@b");
  expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
});

test("no trigger or candidate opens during composition, and the trigger is recognized once it ends", async () => {
  render(<Composer><ComposerInput aria-label="消息" triggers={[mention]} /></Composer>);
  const editor = editorOf();
  editor.focus();
  fireEvent.compositionStart(editor);
  editor.textContent = "@";
  writeSelection(editor, 1, 1);
  fireEvent.input(editor);
  fireEvent.keyDown(editor, { key: "ArrowDown", keyCode: 229 });
  expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  fireEvent.compositionEnd(editor);
  expect(await screen.findByRole("listbox")).toBeInTheDocument();
});

test("async candidates show loading, then results, then an empty state; stale results are discarded", async () => {
  const pending = new Map<string, (items: ComposerItem[]) => void>();
  const asyncTrigger: ComposerTrigger = { char: "@", getItems: (query) => new Promise((resolve) => { pending.set(query, resolve); }) };
  render(<Composer><ComposerInput aria-label="消息" triggers={[asyncTrigger]} /></Composer>);
  await type("@");
  expect(await screen.findByRole("listbox")).toHaveAttribute("aria-busy", "true");
  expect(screen.getByRole("status")).toHaveTextContent(/加载|Loading/);
  await userEvent.keyboard("林");
  await waitFor(() => expect(pending.has("林")).toBe(true));
  await act(async () => { pending.get("")!([{ id: "old", label: "过期" }]); });
  expect(screen.queryByRole("option")).not.toBeInTheDocument();
  await act(async () => { pending.get("林")!([{ id: "u1", label: "林青" }]); });
  expect(screen.getAllByRole("option").map((o) => o.textContent)).toEqual(["林青"]);
  await userEvent.keyboard("没");
  await waitFor(() => expect(pending.has("林没")).toBe(true));
  await act(async () => { pending.get("林没")!([]); });
  expect(screen.queryByRole("option")).not.toBeInTheDocument();
  expect(screen.getByRole("status")).toHaveTextContent("没有可选项");
});

test("a rejected candidate source is treated as an empty result", async () => {
  const failing: ComposerTrigger = { char: "@", getItems: () => Promise.reject(new Error("offline")) };
  render(<Composer><ComposerInput aria-label="消息" triggers={[failing]} /></Composer>);
  await type("@");
  await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("没有可选项"));
});

test("an action command runs the callback and removes the trigger text without leaving a token", async () => {
  const onSelect = vi.fn();
  const onValueChange = vi.fn();
  const commands: ComposerTrigger = {
    char: "/", startOnly: true, select: "action", onSelect,
    getItems: () => [{ id: "clear", label: "清空" }, { id: "topic", label: "话题", select: "token" }],
  };
  render(<Composer onValueChange={onValueChange}><ComposerInput aria-label="消息" triggers={[commands]} /></Composer>);
  await type("/");
  await screen.findByRole("listbox");
  await userEvent.keyboard("{Enter}");
  expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ id: "clear" }), { mode: "action" });
  expect(screen.queryByRole("img")).not.toBeInTheDocument();
  expect(editorOf()).toHaveTextContent("");
  expect(onValueChange.mock.lastCall![1]).toMatchObject({ reason: "action" });
  await userEvent.keyboard("/");
  await screen.findByRole("listbox");
  await userEvent.keyboard("{ArrowDown}{Enter}");
  expect(onSelect).toHaveBeenLastCalledWith(expect.objectContaining({ id: "topic" }), { mode: "token" });
  expect(screen.getByRole("img", { name: "/话题" })).toBeInTheDocument();
});

test("clicking an option selects it", async () => {
  render(<Composer><ComposerInput aria-label="消息" triggers={[mention]} /></Composer>);
  await type("@");
  await userEvent.click(await screen.findByRole("option", { name: "苏野" }));
  expect(screen.getByRole("img", { name: "@苏野" })).toBeInTheDocument();
});

test("paste is always plain text", () => {
  const onValueChange = vi.fn();
  render(<Composer onValueChange={onValueChange}><ComposerInput aria-label="消息" /></Composer>);
  const editor = editorOf();
  editor.focus();
  const data = { getData: (type: string) => (type === "text/plain" ? "第一行\r\n第二行" : "<b>粗</b>") };
  fireEvent.paste(editor, { clipboardData: data });
  expect(onValueChange.mock.lastCall![0]).toEqual([{ type: "text", text: "第一行\n第二行" }]);
  expect(onValueChange.mock.lastCall![1]).toMatchObject({ reason: "paste" });
  expect(editor.querySelector("b")).toBeNull();
});

test("copy writes the selection as plain text, tokens included by name", () => {
  render(<Composer defaultValue={[{ type: "text", text: "请" }, { type: "token", trigger: "@", id: "u1", label: "林青" }]}><ComposerInput aria-label="消息" /></Composer>);
  const editor = editorOf();
  editor.focus();
  writeSelection(editor, 0, 2);
  const setData = vi.fn();
  fireEvent.copy(editor, { clipboardData: { setData } });
  expect(setData).toHaveBeenCalledWith("text/plain", "请@林青");
});

test("disabled and read-only editors do not edit or submit", async () => {
  const onSubmit = vi.fn();
  const onValueChange = vi.fn();
  const { rerender } = render(<Composer disabled defaultValue={[{ type: "text", text: "甲" }]} onSubmit={onSubmit} onValueChange={onValueChange}><ComposerInput aria-label="消息" /><ComposerSubmit /></Composer>);
  expect(editorOf()).toHaveAttribute("contenteditable", "false");
  expect(editorOf()).toHaveAttribute("aria-disabled", "true");
  expect(screen.getByRole("button", { name: "发送" })).toBeDisabled();
  rerender(<Composer readOnly defaultValue={[{ type: "text", text: "甲" }]} onSubmit={onSubmit} onValueChange={onValueChange}><ComposerInput aria-label="消息" triggers={[mention]} /><ComposerSubmit /></Composer>);
  expect(editorOf()).toHaveAttribute("aria-readonly", "true");
  expect(editorOf()).toHaveAttribute("contenteditable", "false");
  fireEvent.keyDown(editorOf(), { key: "Enter", keyCode: 13 });
  fireEvent.paste(editorOf(), { clipboardData: { getData: () => "x" } });
  expect(onSubmit).not.toHaveBeenCalled();
  expect(onValueChange).not.toHaveBeenCalled();
});

test("undo and redo restore the previous values", async () => {
  render(<Composer defaultValue={[{ type: "text", text: "" }]}><ComposerInput aria-label="消息" triggers={[mention]} /></Composer>);
  await type("看 @");
  await screen.findByRole("listbox");
  await userEvent.keyboard("{Enter}");
  expect(screen.getByRole("img", { name: "@林青" })).toBeInTheDocument();
  await userEvent.keyboard("{Control>}z{/Control}");
  expect(screen.queryByRole("img")).not.toBeInTheDocument();
  await userEvent.keyboard("{Control>}{Shift>}z{/Shift}{/Control}");
  expect(screen.getByRole("img", { name: "@林青" })).toBeInTheDocument();
});

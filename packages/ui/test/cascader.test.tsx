import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { expect, test, vi } from "vitest";
import { Cascader, type CascaderOption } from "../src/components/cascader";
import { Field, FieldLabel } from "../src/components/field";
import { UILocaleProvider } from "../src/locale";
import { enUS } from "../src/locales/en-US";

const regions: CascaderOption[] = [
  { value: "zj", label: "浙江", children: [
    { value: "hz", label: "杭州", children: [{ value: "xh", label: "西湖区" }, { value: "bj", label: "滨江区", disabled: true }, { value: "yh", label: "余杭区" }] },
    { value: "nb", label: "宁波", children: [{ value: "hs", label: "海曙区" }] },
  ] },
  { value: "js", label: "江苏", children: [{ value: "nj", label: "南京", children: [{ value: "gl", label: "鼓楼区" }] }] },
  { value: "bj", label: "北京", disabled: true, children: [{ value: "dc", label: "东城区" }] },
  { value: "xz", label: "西藏" },
];

const trigger = () => screen.getByRole("combobox", { name: "地区" });
const option = (name: string) => screen.getByRole("option", { name });

test("the trigger is a combobox with a listbox popup, shows the placeholder, and opens a named first column", async () => {
  render(<Cascader aria-label="地区" options={regions} />);
  expect(trigger()).toHaveAttribute("aria-haspopup", "listbox");
  expect(trigger()).toHaveAttribute("aria-expanded", "false");
  expect(trigger()).toHaveTextContent("请选择");
  await userEvent.click(trigger());
  expect(trigger()).toHaveAttribute("aria-expanded", "true");
  const first = screen.getByRole("listbox", { name: "地区" });
  expect(within(first).getAllByRole("option").map(node => node.textContent)).toEqual(["浙江", "江苏", "北京", "西藏"]);
  expect(option("浙江")).toHaveAccessibleDescription("有下级");
  expect(option("西藏")).not.toHaveAccessibleDescription();
  expect(screen.getAllByRole("listbox")).toHaveLength(1);
});

test("keyboard walks the columns, commits a leaf and returns focus to the trigger", async () => {
  const onValueChange = vi.fn();
  render(<Cascader aria-label="地区" options={regions} onValueChange={onValueChange} />);
  await userEvent.tab();
  expect(trigger()).toHaveFocus();
  await userEvent.keyboard("{Enter}");
  await waitFor(() => expect(option("浙江")).toHaveFocus());
  await userEvent.keyboard("{ArrowDown}");
  expect(option("江苏")).toHaveFocus();
  await userEvent.keyboard("{ArrowUp}{ArrowRight}");
  expect(screen.getByRole("listbox", { name: "浙江" })).toBeInTheDocument();
  expect(option("杭州")).toHaveFocus();
  await userEvent.keyboard("{ArrowRight}");
  expect(option("西湖区")).toHaveFocus();
  await userEvent.keyboard("{Enter}");
  expect(onValueChange).toHaveBeenCalledTimes(1);
  expect(onValueChange.mock.calls[0]![0]).toEqual(["zj", "hz", "xh"]);
  expect(onValueChange.mock.calls[0]![1].map((item: CascaderOption) => item.label)).toEqual(["浙江", "杭州", "西湖区"]);
  await waitFor(() => expect(trigger()).toHaveAttribute("aria-expanded", "false"));
  await waitFor(() => expect(trigger()).toHaveFocus());
  expect(trigger()).toHaveTextContent("浙江 / 杭州 / 西湖区");
});

test("left returns to the parent and collapses; Home, End and typeahead move within a column", async () => {
  render(<Cascader aria-label="地区" options={regions} />);
  await userEvent.click(trigger());
  await userEvent.keyboard("{ArrowDown}{ArrowDown}");
  option("浙江").focus();
  await userEvent.keyboard("{ArrowRight}{ArrowRight}");
  expect(option("西湖区")).toHaveFocus();
  await userEvent.keyboard("{End}");
  expect(option("余杭区")).toHaveFocus();
  await userEvent.keyboard("{Home}");
  expect(option("西湖区")).toHaveFocus();
  await userEvent.keyboard("{ArrowLeft}");
  expect(option("杭州")).toHaveFocus();
  expect(screen.queryByRole("option", { name: "西湖区" })).not.toBeInTheDocument();
  await userEvent.keyboard("{ArrowLeft}");
  expect(option("浙江")).toHaveFocus();
  expect(screen.queryByRole("listbox", { name: "浙江" })).not.toBeInTheDocument();
  await userEvent.keyboard("西");
  expect(option("西藏")).toHaveFocus();
  await userEvent.keyboard("{Escape}");
  await waitFor(() => expect(trigger()).toHaveAttribute("aria-expanded", "false"));
  await waitFor(() => expect(trigger()).toHaveFocus());
});

test("Enter on a branch that cannot be submitted enters the next column; a leaf in the first column submits", async () => {
  const onValueChange = vi.fn();
  render(<Cascader aria-label="地区" options={regions} onValueChange={onValueChange} />);
  await userEvent.click(trigger());
  option("浙江").focus();
  await userEvent.keyboard("{Enter}");
  expect(option("杭州")).toHaveFocus();
  expect(onValueChange).not.toHaveBeenCalled();
  await userEvent.keyboard("{ArrowLeft}{ArrowDown}{ArrowDown}{ArrowDown}");
  expect(option("西藏")).toHaveFocus();
  await userEvent.keyboard(" ");
  expect(onValueChange).toHaveBeenCalledWith(["xz"], [expect.objectContaining({ value: "xz" })]);
});

test("a disabled option is identifiable but cannot be chosen or entered", async () => {
  const onValueChange = vi.fn();
  render(<Cascader aria-label="地区" options={regions} onValueChange={onValueChange} />);
  await userEvent.click(trigger());
  expect(option("北京")).toHaveAttribute("aria-disabled", "true");
  await userEvent.click(option("北京"));
  expect(screen.queryByRole("option", { name: "东城区" })).not.toBeInTheDocument();
  option("北京").focus();
  await userEvent.keyboard("{ArrowRight}{Enter}");
  expect(screen.queryByRole("option", { name: "东城区" })).not.toBeInTheDocument();
  await userEvent.click(option("浙江"));
  await userEvent.click(option("杭州"));
  await userEvent.click(option("滨江区"));
  expect(onValueChange).not.toHaveBeenCalled();
  expect(trigger()).toHaveAttribute("aria-expanded", "true");
  await userEvent.click(option("余杭区"));
  expect(onValueChange).toHaveBeenCalledWith(["zj", "hz", "yh"], expect.any(Array));
});

test("by default only leaves submit; selectParent lets any level submit", async () => {
  const onValueChange = vi.fn();
  const { rerender } = render(<Cascader aria-label="地区" options={regions} onValueChange={onValueChange} />);
  await userEvent.click(trigger());
  await userEvent.click(option("浙江"));
  expect(onValueChange).not.toHaveBeenCalled();
  expect(trigger()).toHaveAttribute("aria-expanded", "true");
  await userEvent.keyboard("{Escape}");
  await waitFor(() => expect(trigger()).toHaveAttribute("aria-expanded", "false"));

  rerender(<Cascader aria-label="地区" options={regions} selectParent onValueChange={onValueChange} />);
  await userEvent.click(trigger());
  // 鼠标点父项：成为值，弹层保持打开，可继续往下。
  await userEvent.click(option("浙江"));
  expect(onValueChange).toHaveBeenLastCalledWith(["zj"], [expect.objectContaining({ value: "zj" })]);
  expect(trigger()).toHaveAttribute("aria-expanded", "true");
  expect(option("杭州")).toBeInTheDocument();
  // 键盘 Enter 在可提交的父项上提交并关闭。
  option("杭州").focus();
  await userEvent.keyboard("{Enter}");
  expect(onValueChange).toHaveBeenLastCalledWith(["zj", "hz"], expect.any(Array));
  await waitFor(() => expect(trigger()).toHaveAttribute("aria-expanded", "false"));
});

test("the current path is aria-selected and reopens expanded", async () => {
  render(<Cascader aria-label="地区" options={regions} defaultValue={["zj", "hz", "xh"]} />);
  expect(trigger()).toHaveTextContent("浙江 / 杭州 / 西湖区");
  await userEvent.click(trigger());
  await waitFor(() => expect(option("西湖区")).toHaveFocus());
  expect(option("浙江")).toHaveAttribute("aria-selected", "true");
  expect(option("杭州")).toHaveAttribute("aria-selected", "true");
  expect(option("西湖区")).toHaveAttribute("aria-selected", "true");
  expect(option("江苏")).toHaveAttribute("aria-selected", "false");
  expect(option("余杭区")).toHaveAttribute("aria-selected", "false");
  expect(screen.getByRole("listbox", { name: "杭州" })).toBeInTheDocument();
});

test("a controlled value changes only when the parent says so", async () => {
  const seen: Array<string[] | null> = [];
  function Controlled() {
    const [value, setValue] = useState<string[] | null>(["js", "nj", "gl"]);
    return <><Cascader aria-label="地区" options={regions} value={value} onValueChange={next => { seen.push(next); }} /><button type="button" onClick={() => setValue(["xz"])}>改</button></>;
  }
  render(<Controlled />);
  expect(trigger()).toHaveTextContent("江苏 / 南京 / 鼓楼区");
  await userEvent.click(trigger());
  await userEvent.click(option("浙江"));
  await userEvent.click(option("宁波"));
  await userEvent.click(option("海曙区"));
  expect(seen).toEqual([["zj", "nb", "hs"]]);
  expect(trigger()).toHaveTextContent("江苏 / 南京 / 鼓楼区");
  await userEvent.click(screen.getByRole("button", { name: "改" }));
  expect(trigger()).toHaveTextContent("西藏");
});

test("the full path stays in the trigger text, and the separator follows the locale", () => {
  const { rerender } = render(<Cascader aria-label="地区" options={regions} value={["zj", "hz", "xh"]} />);
  expect(trigger()).toHaveTextContent("浙江 / 杭州 / 西湖区");
  rerender(<UILocaleProvider locale={enUS} messages={{ cascaderSeparator: " > " }}><Cascader aria-label="地区" options={regions} value={["zj", "hz", "xh"]} /></UILocaleProvider>);
  expect(trigger()).toHaveTextContent("浙江 > 杭州 > 西湖区");
});

test("the form value is the path joined by slashes, empty when nothing is selected", () => {
  const { container, rerender } = render(<form><Cascader aria-label="地区" name="area" options={regions} defaultValue={["zj", "hz", "xh"]} /></form>);
  const form = container.querySelector("form")!;
  expect(new FormData(form).get("area")).toBe("zj/hz/xh");
  rerender(<form><Cascader key="empty" aria-label="地区" name="area" options={regions} /></form>);
  expect(new FormData(form).get("area")).toBe("");
  rerender(<form><Cascader key="off" aria-label="地区" name="area" options={regions} defaultValue={["xz"]} disabled /></form>);
  expect(new FormData(form).has("area")).toBe(false);
});

test("required is exposed on the trigger and checked natively", () => {
  const { container } = render(<form><Cascader aria-label="地区" name="area" options={regions} required /></form>);
  expect(trigger()).toHaveAttribute("aria-required", "true");
  expect(container.querySelector("form")!.checkValidity()).toBe(false);
});

test("read-only keeps the value and focus but never opens; disabled blocks the trigger", async () => {
  const { rerender } = render(<Cascader aria-label="地区" options={regions} defaultValue={["xz"]} readOnly />);
  await userEvent.click(trigger());
  expect(trigger()).toHaveAttribute("aria-expanded", "false");
  expect(trigger()).toHaveAttribute("aria-readonly", "true");
  expect(trigger()).toHaveTextContent("西藏");
  rerender(<Cascader aria-label="地区" options={regions} defaultValue={["xz"]} disabled />);
  expect(trigger()).toBeDisabled();
});

test("a name is required: aria-label, aria-labelledby, or a FieldLabel", () => {
  const error = vi.spyOn(console, "error").mockImplementation(() => {});
  expect(() => render(<Cascader options={regions} />)).toThrow(/accessible name/);
  expect(() => render(<Field><Cascader options={regions} /></Field>)).toThrow(/FieldLabel/);
  error.mockRestore();
  render(<><span id="outer-name">外部名称</span><Cascader aria-labelledby="outer-name" options={regions} /></>);
  expect(screen.getByRole("combobox", { name: "外部名称" })).toBeInTheDocument();
});

test("FieldLabel names the trigger and the first column; Field carries invalid and the description", async () => {
  render(<Field invalid><FieldLabel>所在地区</FieldLabel><Cascader options={regions} /></Field>);
  const box = screen.getByRole("combobox", { name: "所在地区" });
  expect(box).toHaveAttribute("aria-invalid", "true");
  await userEvent.click(box);
  expect(screen.getByRole("listbox", { name: "所在地区" })).toBeInTheDocument();
});

test("async children: loading is shown, the result fills the next column and focus enters it", async () => {
  let resolve!: (kids: CascaderOption[]) => void;
  const loadChildren = vi.fn(() => new Promise<CascaderOption[]>(done => { resolve = done; }));
  const onValueChange = vi.fn();
  render(<Cascader aria-label="地区" options={[{ value: "a", label: "甲" }, { value: "b", label: "乙", isLeaf: true }]} loadChildren={loadChildren} onValueChange={onValueChange} />);
  await userEvent.click(trigger());
  option("甲").focus();
  await userEvent.keyboard("{ArrowRight}");
  expect(loadChildren).toHaveBeenCalledWith(expect.objectContaining({ value: "a" }));
  expect(screen.getByRole("status")).toHaveTextContent("正在加载");
  resolve([{ value: "a1", label: "甲一", isLeaf: true }]);
  await waitFor(() => expect(option("甲一")).toHaveFocus());
  expect(screen.getByRole("listbox", { name: "甲" })).toBeInTheDocument();
  await userEvent.keyboard("{Enter}");
  expect(onValueChange).toHaveBeenCalledWith(["a", "a1"], expect.any(Array));
  expect(trigger()).toHaveTextContent("甲 / 甲一");
  // isLeaf 声明没有子项：不会触发加载。
  await userEvent.click(trigger());
  await userEvent.click(option("乙"));
  expect(loadChildren).toHaveBeenCalledTimes(1);
});

test("async failure shows a retryable error and a retry can succeed", async () => {
  const loadChildren = vi.fn<(option: CascaderOption) => Promise<CascaderOption[]>>()
    .mockRejectedValueOnce(new Error("offline"))
    .mockResolvedValueOnce([{ value: "a1", label: "甲一" }]);
  render(<Cascader aria-label="地区" options={[{ value: "a", label: "甲" }]} loadChildren={loadChildren} />);
  await userEvent.click(trigger());
  await userEvent.click(option("甲"));
  const alert = await screen.findByRole("alert");
  expect(alert).toHaveTextContent("加载失败");
  await userEvent.click(within(alert).getByRole("button", { name: "重试" }));
  expect(await screen.findByRole("option", { name: "甲一" })).toBeInTheDocument();
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  expect(loadChildren).toHaveBeenCalledTimes(2);
});

test("a loaded empty result makes the node a leaf", async () => {
  const onValueChange = vi.fn();
  render(<Cascader aria-label="地区" options={[{ value: "a", label: "甲" }]} loadChildren={async () => []} onValueChange={onValueChange} />);
  await userEvent.click(trigger());
  await userEvent.click(option("甲"));
  await waitFor(() => expect(screen.queryByRole("status")).not.toBeInTheDocument());
  await userEvent.click(option("甲"));
  expect(onValueChange).toHaveBeenCalledWith(["a"], expect.any(Array));
});

test("search lists matching full paths in one column and submits with Enter", async () => {
  const onValueChange = vi.fn();
  render(<Cascader aria-label="地区" options={regions} searchable onValueChange={onValueChange} />);
  await userEvent.click(trigger());
  const search = await screen.findByRole("combobox", { name: "搜索" });
  await waitFor(() => expect(search).toHaveFocus());
  expect(search).toHaveAttribute("aria-expanded", "false");
  await userEvent.keyboard("区");
  const list = screen.getByRole("listbox", { name: "地区" });
  expect(within(list).getAllByRole("option").map(node => node.textContent)).toEqual([
    "浙江 / 杭州 / 西湖区", "浙江 / 杭州 / 滨江区", "浙江 / 杭州 / 余杭区", "浙江 / 宁波 / 海曙区", "江苏 / 南京 / 鼓楼区", "北京 / 东城区",
  ]);
  expect(screen.getByRole("status")).toHaveTextContent("找到 6 项");
  await userEvent.keyboard("{ArrowDown}");
  expect(search).toHaveAttribute("aria-activedescendant", screen.getByRole("option", { name: "浙江 / 杭州 / 滨江区" }).id);
  await userEvent.keyboard("{Enter}");
  expect(onValueChange).not.toHaveBeenCalled(); // 滨江区被禁用
  await userEvent.keyboard("{ArrowDown}{Enter}");
  expect(onValueChange).toHaveBeenCalledWith(["zj", "hz", "yh"], expect.any(Array));
  await waitFor(() => expect(trigger()).toHaveAttribute("aria-expanded", "false"));
  expect(trigger()).toHaveTextContent("浙江 / 杭州 / 余杭区");
});

test("search has a clear empty state, a mouse pick works, and an empty query returns to the columns", async () => {
  const onValueChange = vi.fn();
  render(<Cascader aria-label="地区" options={regions} searchable onValueChange={onValueChange} />);
  await userEvent.click(trigger());
  const search = await screen.findByRole("combobox", { name: "搜索" });
  await userEvent.type(search, "火星");
  expect(screen.queryAllByRole("option")).toHaveLength(0);
  expect(screen.getByText("没有可选项")).toBeInTheDocument();
  await userEvent.clear(search);
  expect(option("浙江")).toBeInTheDocument();
  await userEvent.type(search, "鼓楼");
  await userEvent.click(option("江苏 / 南京 / 鼓楼区"));
  expect(onValueChange).toHaveBeenCalledWith(["js", "nj", "gl"], expect.any(Array));
});

test("ArrowDown from an empty search moves into the columns", async () => {
  render(<Cascader aria-label="地区" options={regions} searchable defaultValue={["xz"]} />);
  await userEvent.click(trigger());
  const search = await screen.findByRole("combobox", { name: "搜索" });
  await waitFor(() => expect(search).toHaveFocus());
  await userEvent.keyboard("{ArrowDown}");
  expect(option("西藏")).toHaveFocus();
});

test("in a right-to-left locale the horizontal arrows swap", async () => {
  render(<UILocaleProvider dir="rtl"><Cascader aria-label="地区" options={regions} /></UILocaleProvider>);
  await userEvent.click(trigger());
  option("浙江").focus();
  await userEvent.keyboard("{ArrowRight}");
  expect(option("浙江")).toHaveFocus();
  await userEvent.keyboard("{ArrowLeft}");
  expect(option("杭州")).toHaveFocus();
  await userEvent.keyboard("{ArrowRight}");
  expect(option("浙江")).toHaveFocus();
});

test("ArrowDown on the closed trigger opens the popup", async () => {
  render(<Cascader aria-label="地区" options={regions} />);
  trigger().focus();
  await userEvent.keyboard("{ArrowDown}");
  expect(trigger()).toHaveAttribute("aria-expanded", "true");
});

test("multiple: every level shows its checked state, parents derive from leaves, toggling a parent sets all enabled leaves", async () => {
  const onValueChange = vi.fn();
  render(<Cascader aria-label="地区" multiple options={regions} defaultValue={[["zj", "hz", "xh"]]} onValueChange={onValueChange} />);
  expect(trigger()).toHaveTextContent("浙江 / 杭州 / 西湖区");
  await userEvent.click(trigger());
  expect(screen.getByRole("listbox", { name: "地区" })).toHaveAttribute("aria-multiselectable", "true");
  expect(option("浙江")).toHaveAttribute("aria-selected", "false");
  expect(option("浙江")).toHaveAccessibleDescription(/部分已选/);
  await userEvent.click(option("浙江"));
  await userEvent.click(option("杭州"));
  // 杭州下：西湖区已勾，滨江区禁用，余杭区未勾 → 杭州是部分
  expect(option("杭州")).toHaveAccessibleDescription(/部分已选/);
  expect(option("西湖区")).toHaveAttribute("aria-selected", "true");
  await userEvent.click(option("杭州").querySelector("span[aria-hidden]")!);
  expect(onValueChange).toHaveBeenLastCalledWith([["zj", "hz", "xh"], ["zj", "hz", "yh"]], expect.any(Array));
  expect(option("杭州")).toHaveAttribute("aria-selected", "true"); // 启用的叶子都勾了
  expect(option("滨江区")).toHaveAttribute("aria-selected", "false"); // 禁用叶子不被带动
  await userEvent.click(option("杭州").querySelector("span[aria-hidden]")!);
  expect(onValueChange).toHaveBeenLastCalledWith([], expect.any(Array));
  expect(trigger()).toHaveAttribute("aria-expanded", "true"); // 多选不关闭弹层
});

test("multiple: a leaf toggles by row click and by Space/Enter; the value follows tree order and the trigger summarizes like TreeSelect", async () => {
  const onValueChange = vi.fn();
  render(<Cascader aria-label="地区" multiple options={regions} onValueChange={onValueChange} />);
  await userEvent.click(trigger());
  await userEvent.click(option("西藏"));
  await userEvent.click(option("浙江"));
  await userEvent.click(option("宁波"));
  await userEvent.click(option("海曙区"));
  expect(onValueChange).toHaveBeenLastCalledWith([["zj", "nb", "hs"], ["xz"]], expect.any(Array));
  await userEvent.keyboard("{Enter}");
  expect(onValueChange).toHaveBeenLastCalledWith([["xz"]], expect.any(Array));
  await userEvent.keyboard("{ }");
  expect(onValueChange).toHaveBeenLastCalledWith([["zj", "nb", "hs"], ["xz"]], expect.any(Array));
  await userEvent.click(option("江苏"));
  await userEvent.click(option("南京"));
  await userEvent.click(option("鼓楼区"));
  expect(trigger()).toHaveTextContent("浙江 / 宁波 / 海曙区 及其余 2 项");
});

test("multiple: controlled value, form submits one entry per path, disabled parents do not change", async () => {
  const { container, rerender } = render(<form><Cascader aria-label="地区" name="area" multiple options={regions} value={[["xz"], ["zj", "nb", "hs"]]} /></form>);
  const form = container.querySelector("form")!;
  expect(new FormData(form).getAll("area")).toEqual(["zj/nb/hs", "xz"]);
  rerender(<form><Cascader aria-label="地区" name="area" multiple options={regions} value={[]} /></form>);
  expect(new FormData(form).has("area")).toBe(false);
  const onValueChange = vi.fn();
  rerender(<form><Cascader aria-label="地区" name="area" multiple options={regions} value={[]} onValueChange={onValueChange} /></form>);
  await userEvent.click(trigger());
  await userEvent.click(option("北京").querySelector("span[aria-hidden]")!);
  expect(onValueChange).not.toHaveBeenCalled();
});

test("multiple: lazily loaded branches check only after loading; checking the unloaded parent expands it", async () => {
  const onValueChange = vi.fn();
  render(<Cascader aria-label="地区" multiple options={[{ value: "a", label: "甲" }]} loadChildren={async () => [{ value: "x", label: "子一", isLeaf: true }, { value: "y", label: "子二", isLeaf: true }]} onValueChange={onValueChange} />);
  await userEvent.click(trigger());
  await userEvent.click(option("甲").querySelector("span[aria-hidden]")!);
  expect(onValueChange).not.toHaveBeenCalled();
  await screen.findByRole("option", { name: "子一" });
  await userEvent.click(option("甲").querySelector("span[aria-hidden]")!);
  expect(onValueChange).toHaveBeenLastCalledWith([["a", "x"], ["a", "y"]], expect.any(Array));
  expect(option("甲")).toHaveAttribute("aria-selected", "true");
});

test("multiple search: lists leaf paths with markers, marks the match, toggles without closing and keeps focus in the input", async () => {
  const onValueChange = vi.fn();
  render(<Cascader aria-label="地区" multiple options={regions} searchable onValueChange={onValueChange} />);
  await userEvent.click(trigger());
  const search = await screen.findByRole("combobox", { name: "搜索" });
  await userEvent.type(search, "海曙");
  const result = screen.getByRole("option", { name: "浙江 / 宁波 / 海曙区" });
  expect(result.querySelector("mark")).toHaveTextContent("海曙");
  await userEvent.keyboard("{Enter}");
  expect(onValueChange).toHaveBeenLastCalledWith([["zj", "nb", "hs"]], expect.any(Array));
  expect(result).toHaveAttribute("aria-selected", "true");
  expect(search).toHaveFocus();
  expect(trigger()).toHaveAttribute("aria-expanded", "true");
  await userEvent.click(result);
  expect(onValueChange).toHaveBeenLastCalledWith([], expect.any(Array));
});

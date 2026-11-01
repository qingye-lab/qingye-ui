import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { expect, test, vi } from "vitest";
import { Field, FieldLabel } from "../src/components/field";
import { TreeSelect } from "../src/components/tree-select";
import type { TreeNode } from "../src/components/tree";
import { UILocaleProvider } from "../src/locale";
import { enUS } from "../src/locales/en-US";

const nodes: TreeNode[] = [
  { id: "rd", label: "研发", children: [
    { id: "rd.web", label: "前端" },
    { id: "rd.server", label: "服务端", children: [{ id: "rd.server.api", label: "接口" }, { id: "rd.server.db", label: "数据库" }] },
    { id: "rd.off", label: "停用组", disabled: true },
  ] },
  { id: "ops", label: "运营", children: [{ id: "ops.growth", label: "增长" }, { id: "ops.support", label: "客服" }] },
  { id: "hr", label: "人事" },
];

const trigger = () => screen.getByRole("combobox", { name: "部门" });
const item = (name: string) => screen.getByRole("treeitem", { name });
const expandedState = (name: string) => item(name).getAttribute("aria-expanded");

test("the trigger is a combobox that pops a named tree; ArrowDown opens it and Escape closes it, keeping the value", async () => {
  render(<TreeSelect aria-label="部门" nodes={nodes} defaultValue="hr" />);
  expect(trigger()).toHaveAttribute("aria-haspopup", "tree");
  expect(trigger()).toHaveAttribute("aria-expanded", "false");
  expect(trigger()).toHaveTextContent("人事");
  await userEvent.tab();
  expect(trigger()).toHaveFocus();
  await userEvent.keyboard("{ArrowDown}");
  expect(trigger()).toHaveAttribute("aria-expanded", "true");
  expect(screen.getByRole("tree", { name: "部门" })).toBeInTheDocument();
  await userEvent.keyboard("{Escape}");
  await waitFor(() => expect(trigger()).toHaveAttribute("aria-expanded", "false"));
  await waitFor(() => expect(trigger()).toHaveFocus());
  expect(trigger()).toHaveTextContent("人事");
});

test("opening puts focus on the selected node and expands its ancestors; without a selection it enters at the first node", async () => {
  const { unmount } = render(<TreeSelect aria-label="部门" nodes={nodes} defaultValue="rd.server.db" />);
  await userEvent.click(trigger());
  await waitFor(() => expect(item("数据库")).toHaveFocus());
  expect(expandedState("研发")).toBe("true");
  expect(expandedState("服务端")).toBe("true");
  expect(expandedState("运营")).toBe("false");
  expect(item("数据库")).toHaveAttribute("aria-selected", "true");
  unmount();

  render(<TreeSelect aria-label="部门" nodes={nodes} placeholder="选部门" />);
  expect(trigger()).toHaveTextContent("选部门");
  await userEvent.click(trigger());
  await waitFor(() => expect(item("研发")).toHaveFocus());
  expect(expandedState("研发")).toBe("false");
});

test("single: choosing a node commits, closes the popup and returns focus to the trigger", async () => {
  const onValueChange = vi.fn();
  render(<TreeSelect aria-label="部门" nodes={nodes} onValueChange={onValueChange} />);
  await userEvent.tab();
  await userEvent.keyboard("{Enter}");
  await waitFor(() => expect(item("研发")).toHaveFocus());
  await userEvent.keyboard("{ArrowRight}{ArrowDown}{Enter}");
  expect(onValueChange).toHaveBeenCalledTimes(1);
  expect(onValueChange).toHaveBeenCalledWith("rd.web", expect.objectContaining({ reason: "keyboard" }));
  await waitFor(() => expect(trigger()).toHaveAttribute("aria-expanded", "false"));
  await waitFor(() => expect(trigger()).toHaveFocus());
  expect(trigger()).toHaveTextContent("前端");

  // 重选同一个节点只关闭，不再通知。
  await userEvent.click(trigger());
  await userEvent.click(await screen.findByRole("treeitem", { name: "前端" }));
  await waitFor(() => expect(trigger()).toHaveAttribute("aria-expanded", "false"));
  expect(onValueChange).toHaveBeenCalledTimes(1);
});

test("single: a disabled node cannot be chosen, and cancel() keeps the popup open and the value unchanged", async () => {
  const onValueChange = vi.fn((_id: string | null, details: { cancel(): void }) => details.cancel());
  render(<TreeSelect aria-label="部门" nodes={nodes} defaultValue="hr" onValueChange={onValueChange} />);
  await userEvent.click(trigger());
  await waitFor(() => expect(item("人事")).toHaveFocus());
  item("研发").focus();
  await userEvent.keyboard("{ArrowRight}");
  await userEvent.click(item("停用组"));
  expect(onValueChange).not.toHaveBeenCalled();
  await userEvent.click(item("前端"));
  expect(onValueChange).toHaveBeenCalledTimes(1);
  expect(onValueChange.mock.calls[0]![0]).toBe("rd.web");
  expect(trigger()).toHaveAttribute("aria-expanded", "true");
  expect(trigger()).toHaveTextContent("人事");
});

test("single: the controlled value drives the trigger and only the parent changes it", async () => {
  function Controlled() {
    const [value, setValue] = useState<string | null>("ops.growth");
    return <><TreeSelect aria-label="部门" nodes={nodes} value={value} onValueChange={setValue} /><button type="button" onClick={() => setValue(null)}>清空</button></>;
  }
  const { unmount } = render(<Controlled />);
  expect(trigger()).toHaveTextContent("增长");
  await userEvent.click(screen.getByRole("button", { name: "清空" }));
  expect(trigger()).toHaveTextContent("请选择");
  unmount();

  const onValueChange = vi.fn();
  render(<TreeSelect aria-label="部门" nodes={nodes} value="hr" onValueChange={onValueChange} />);
  await userEvent.click(trigger());
  await waitFor(() => expect(item("人事")).toHaveFocus());
  item("运营").focus();
  await userEvent.keyboard("{ArrowRight}");
  await userEvent.click(item("客服"));
  expect(onValueChange).toHaveBeenCalledWith("ops.support", expect.anything());
  await waitFor(() => expect(trigger()).toHaveAttribute("aria-expanded", "false"));
  expect(trigger()).toHaveTextContent("人事");
});

test("multiple: checking keeps the popup open, values follow tree order, and the trigger names the selection", async () => {
  const onValueChange = vi.fn();
  render(<TreeSelect multiple aria-label="部门" nodes={nodes} onValueChange={onValueChange} />);
  await userEvent.click(trigger());
  await waitFor(() => expect(item("研发")).toHaveFocus());
  expect(screen.getByRole("tree", { name: "部门" })).toHaveAttribute("aria-multiselectable", "true");
  await userEvent.keyboard("{ArrowRight}");
  item("运营").focus();
  await userEvent.keyboard("{ArrowRight}");
  // 先勾运营，再勾前端：值按树的顺序，而不是点击的先后。
  await userEvent.click(item("运营"));
  await userEvent.click(item("前端"));
  expect(trigger()).toHaveAttribute("aria-expanded", "true");
  expect(onValueChange).toHaveBeenLastCalledWith(["rd.web", "ops.growth", "ops.support"], expect.objectContaining({ reason: "pointer" }));
  expect(item("运营")).toHaveAttribute("aria-checked", "true");
  expect(trigger()).toHaveTextContent("前端 及其余 2 项");
  await userEvent.click(item("增长"));
  expect(onValueChange).toHaveBeenLastCalledWith(["rd.web", "ops.support"], expect.anything());
  expect(trigger()).toHaveTextContent("前端、客服");
  expect(item("运营")).toHaveAttribute("aria-checked", "mixed");
});

test("multiple: opening focuses the first checked leaf with its ancestors expanded; the list separator and summary come from the locale", async () => {
  const { rerender } = render(<TreeSelect multiple aria-label="部门" nodes={nodes} defaultValue={["ops.support", "rd.server.api"]} />);
  expect(trigger()).toHaveTextContent("接口、客服");
  await userEvent.click(trigger());
  await waitFor(() => expect(item("接口")).toHaveFocus());
  expect(expandedState("服务端")).toBe("true");
  expect(expandedState("运营")).toBe("true");
  await userEvent.keyboard(" ");
  expect(trigger()).toHaveTextContent("客服");
  await userEvent.keyboard("{Escape}");
  await waitFor(() => expect(trigger()).toHaveAttribute("aria-expanded", "false"));

  rerender(<UILocaleProvider locale={enUS}><TreeSelect multiple aria-label="部门" nodes={nodes} value={["rd.web", "ops.growth"]} /></UILocaleProvider>);
  expect(trigger()).toHaveTextContent("前端, 增长");
  rerender(<UILocaleProvider locale={enUS}><TreeSelect multiple aria-label="部门" nodes={nodes} value={["rd.web", "ops.growth", "hr"]} /></UILocaleProvider>);
  expect(trigger()).toHaveTextContent("前端 and 2 more");
});

test("form values: single submits the id, multiple submits one value per leaf, required blocks an empty form", () => {
  const { container, rerender } = render(<form><TreeSelect aria-label="部门" name="dept" nodes={nodes} defaultValue="hr" /></form>);
  const form = () => new FormData(container.querySelector("form")!);
  expect(form().getAll("dept")).toEqual(["hr"]);
  rerender(<form><TreeSelect key="empty" aria-label="部门" name="dept" nodes={nodes} /></form>);
  expect(form().getAll("dept")).toEqual([""]);
  rerender(<form><TreeSelect key="multi" multiple aria-label="部门" name="dept" nodes={nodes} defaultValue={["ops.support", "rd.web"]} /></form>);
  expect(form().getAll("dept")).toEqual(["rd.web", "ops.support"]);
  rerender(<form><TreeSelect key="multi-empty" multiple aria-label="部门" name="dept" nodes={nodes} /></form>);
  expect(form().getAll("dept")).toEqual([]);
  rerender(<form><TreeSelect key="off" aria-label="部门" name="dept" nodes={nodes} defaultValue="hr" disabled /></form>);
  expect(form().getAll("dept")).toEqual([]);

  rerender(<form><TreeSelect key="req" aria-label="部门" name="dept" nodes={nodes} required /></form>);
  expect(trigger()).toHaveAttribute("aria-required", "true");
  expect(container.querySelector("form")!.checkValidity()).toBe(false);
  rerender(<form><TreeSelect key="req-multi" multiple aria-label="部门" name="dept" nodes={nodes} required /></form>);
  expect(container.querySelector("form")!.checkValidity()).toBe(false);
  rerender(<form><TreeSelect key="req-filled" multiple aria-label="部门" name="dept" nodes={nodes} required defaultValue={["hr"]} /></form>);
  expect(container.querySelector("form")!.checkValidity()).toBe(true);
});

test("read-only keeps the value and focus but never opens; disabled blocks the trigger", async () => {
  const { rerender } = render(<TreeSelect aria-label="部门" nodes={nodes} defaultValue="hr" readOnly />);
  expect(trigger()).toHaveAttribute("aria-readonly", "true");
  await userEvent.click(trigger());
  await userEvent.tab();
  await userEvent.keyboard("{ArrowDown}");
  expect(trigger()).toHaveAttribute("aria-expanded", "false");
  expect(screen.queryByRole("tree")).not.toBeInTheDocument();
  expect(trigger()).toHaveTextContent("人事");
  rerender(<TreeSelect aria-label="部门" nodes={nodes} defaultValue="hr" disabled />);
  expect(trigger()).toBeDisabled();
});

test("a name is required: aria-label, aria-labelledby, or a FieldLabel", () => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  expect(() => render(<TreeSelect nodes={nodes} />)).toThrow(/accessible name/);
  expect(() => render(<Field><TreeSelect nodes={nodes} /></Field>)).toThrow(/FieldLabel/);
  vi.restoreAllMocks();
  render(<><span id="outer-name">外部名称</span><TreeSelect aria-labelledby="outer-name" nodes={nodes} /></>);
  expect(screen.getByRole("combobox", { name: "外部名称" })).toBeInTheDocument();
});

test("FieldLabel names the trigger and the tree; Field carries invalid", async () => {
  render(<Field invalid><FieldLabel>所属部门</FieldLabel><TreeSelect nodes={nodes} /></Field>);
  const box = screen.getByRole("combobox", { name: "所属部门" });
  expect(box).toHaveAttribute("aria-invalid", "true");
  await userEvent.click(box);
  expect(screen.getByRole("tree", { name: "所属部门" })).toBeInTheDocument();
});

test("searchable: typing filters by name, keeps ancestors, opens branches and marks the match", async () => {
  render(<TreeSelect aria-label="部门" nodes={nodes} searchable />);
  await userEvent.click(trigger());
  const search = screen.getByRole("textbox", { name: "搜索" });
  await userEvent.type(search, "数据");
  expect(item("研发")).toHaveAttribute("aria-expanded", "true");
  expect(item("服务端")).toHaveAttribute("aria-expanded", "true");
  expect(item("数据库").querySelector("mark")).toHaveTextContent("数据");
  expect(screen.queryByRole("treeitem", { name: "运营" })).toBeNull();
  expect(screen.queryByRole("treeitem", { name: "前端" })).toBeNull();
  await userEvent.clear(search);
  expect(screen.getByRole("treeitem", { name: "运营" })).toBeInTheDocument();
});

test("searchable: the empty state is the localized one, and the query is cleared when reopened", async () => {
  render(<UILocaleProvider locale={enUS}><TreeSelect aria-label="Dept" nodes={nodes} searchable /></UILocaleProvider>);
  await userEvent.click(screen.getByRole("combobox", { name: "Dept" }));
  await userEvent.type(screen.getByRole("textbox", { name: "Search" }), "zzz");
  expect(screen.getByText("No options")).toBeInTheDocument();
  await userEvent.keyboard("{Escape}");
  await waitFor(() => expect(screen.getByRole("combobox", { name: "Dept" })).toHaveAttribute("aria-expanded", "false"));
  await userEvent.click(screen.getByRole("combobox", { name: "Dept" }));
  expect(screen.getByRole("textbox", { name: "Search" })).toHaveValue("");
});

test("searchable single: ArrowDown enters the filtered tree and Enter picks a node", async () => {
  const onValueChange = vi.fn();
  render(<TreeSelect aria-label="部门" nodes={nodes} searchable onValueChange={onValueChange} />);
  await userEvent.click(trigger());
  await userEvent.type(screen.getByRole("textbox", { name: "搜索" }), "客服");
  await userEvent.keyboard("{ArrowDown}");
  expect(item("运营")).toHaveFocus();
  await userEvent.keyboard("{ArrowDown}{Enter}");
  expect(onValueChange).toHaveBeenCalledWith("ops.support", expect.anything());
  await waitFor(() => expect(trigger()).toHaveAttribute("aria-expanded", "false"));
});

test("searchable multiple: checking a filtered leaf adds it to the value and keeps the popup open", async () => {
  const onValueChange = vi.fn();
  render(<TreeSelect aria-label="部门" nodes={nodes} multiple searchable defaultValue={["hr"]} onValueChange={onValueChange} />);
  await userEvent.click(trigger());
  await userEvent.type(screen.getByRole("textbox", { name: "搜索" }), "增长");
  await userEvent.click(item("增长"));
  expect(onValueChange).toHaveBeenCalledWith(["ops.growth", "hr"], expect.anything());
  expect(trigger()).toHaveAttribute("aria-expanded", "true");
  expect(trigger()).toHaveTextContent("增长、人事");
});

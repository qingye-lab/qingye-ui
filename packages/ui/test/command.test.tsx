import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { expect, test, vi } from "vitest";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "../src/components/command";

function Palette({ onSelect = vi.fn(), filter }: { onSelect?: (value: string) => void; filter?: React.ComponentProps<typeof Command>["filter"] }) {
  return <Command filter={filter}>
    <CommandInput aria-label="搜索命令" />
    <CommandList aria-label="命令">
      <CommandGroup heading="页面">
        <CommandItem value="概览" onSelect={onSelect}>概览</CommandItem>
        <CommandItem value="设备" keywords={["devices", "硬件"]} onSelect={onSelect}>设备</CommandItem>
        <CommandItem value="告警" disabled onSelect={onSelect}>告警</CommandItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="操作">
        <CommandItem value="导出报表" shortcut={["⌘", "E"]} onSelect={onSelect}>导出报表</CommandItem>
      </CommandGroup>
      <CommandEmpty>没有这个命令</CommandEmpty>
    </CommandList>
  </Command>;
}

test("exposes a combobox with a named listbox of options; groups carry their heading as name", () => {
  render(<Palette />);
  expect(screen.getByRole("combobox", { name: "搜索命令" })).toBeInTheDocument();
  expect(screen.getByRole("listbox", { name: "命令" })).toBeInTheDocument();
  expect(screen.getAllByRole("option")).toHaveLength(4);
  expect(screen.getByRole("group", { name: "页面" })).toBeInTheDocument();
  expect(screen.getByRole("group", { name: "操作" })).toBeInTheDocument();
});

test("typing filters by value, case-insensitively, and hides groups with no match", async () => {
  render(<Palette />);
  await userEvent.type(screen.getByRole("combobox"), "导出");
  expect(screen.getAllByRole("option").map(option => option.textContent)).toEqual(["导出报表⌘E"]);
  expect(screen.queryByRole("group", { name: "页面" })).not.toBeInTheDocument();
  expect(screen.getByRole("group", { name: "操作" })).toBeInTheDocument();
});

test("keywords match without being displayed", async () => {
  render(<Palette />);
  await userEvent.type(screen.getByRole("combobox"), "DEVICES");
  expect(screen.getAllByRole("option").map(option => option.textContent)).toEqual(["设备"]);
});

test("a custom filter replaces the default", async () => {
  render(<Palette filter={(entry, query) => entry.value.startsWith(query)} />);
  await userEvent.type(screen.getByRole("combobox"), "出");
  expect(screen.getByRole("status")).toHaveTextContent("没有这个命令");
  expect(screen.queryAllByRole("option")).toHaveLength(0);
});

test("shows the empty text only when nothing matches, and falls back to the locale text", async () => {
  const { unmount } = render(<Palette />);
  expect(screen.getByRole("status")).toBeEmptyDOMElement();
  await userEvent.type(screen.getByRole("combobox"), "不存在的");
  expect(screen.getByRole("status")).toHaveTextContent("没有这个命令");
  unmount();
  render(<Command><CommandInput aria-label="搜索" /><CommandList><CommandItem value="a">a</CommandItem><CommandEmpty /></CommandList></Command>);
  await userEvent.type(screen.getByRole("combobox"), "zzz");
  expect(screen.getByRole("status")).toHaveTextContent("没有匹配项");
});

test("arrow keys move the highlight, Enter selects it, and the query stays", async () => {
  const onSelect = vi.fn();
  render(<Palette onSelect={onSelect} />);
  const input = screen.getByRole("combobox");
  await userEvent.type(input, "报");
  expect(input).toHaveValue("报");
  await userEvent.keyboard("{Enter}");
  expect(onSelect).toHaveBeenCalledWith("导出报表");
  expect(input).toHaveValue("报");

  await userEvent.clear(input);
  await userEvent.keyboard("{ArrowDown}");
  const active = input.getAttribute("aria-activedescendant");
  expect(active).toBeTruthy();
  expect(document.getElementById(active!)).toHaveAttribute("role", "option");
  await userEvent.keyboard("{Enter}");
  expect(onSelect).toHaveBeenCalledTimes(2);
});

test("the first item is highlighted so Enter works right after typing", async () => {
  const onSelect = vi.fn();
  render(<Palette onSelect={onSelect} />);
  await userEvent.type(screen.getByRole("combobox"), "设");
  await userEvent.keyboard("{Enter}");
  expect(onSelect).toHaveBeenCalledWith("设备");
});

test("the first item is highlighted on mount, before anything is typed", () => {
  render(<Palette />);
  const input = screen.getByRole("combobox");
  expect(document.getElementById(input.getAttribute("aria-activedescendant")!)).toHaveTextContent("概览");
});

test("disabled items are skipped by the arrow keys and never selected", async () => {
  const onSelect = vi.fn();
  render(<Palette onSelect={onSelect} />);
  // 概览 → 设备 → (告警 禁用，跳过) → 导出报表
  await userEvent.keyboard("{Tab}{ArrowDown}");
  await userEvent.keyboard("{Enter}");
  expect(onSelect).toHaveBeenLastCalledWith("设备");
  await userEvent.keyboard("{ArrowDown}{Enter}");
  expect(onSelect).toHaveBeenLastCalledWith("导出报表");
  await userEvent.click(screen.getByRole("option", { name: "告警" }));
  expect(onSelect).not.toHaveBeenCalledWith("告警");
  expect(screen.getByRole("option", { name: "告警" })).toHaveAttribute("aria-disabled", "true");
});

test("clicking an item selects it", async () => {
  const onSelect = vi.fn();
  render(<Palette onSelect={onSelect} />);
  await userEvent.click(screen.getByRole("option", { name: "概览" }));
  expect(onSelect).toHaveBeenCalledWith("概览");
});

test("the query can be controlled", async () => {
  function Controlled() {
    const [query, setQuery] = useState("设");
    return <Command query={query} onQueryChange={setQuery}><CommandInput aria-label="搜索" /><CommandList><CommandItem value="设备">设备</CommandItem><CommandItem value="概览">概览</CommandItem></CommandList></Command>;
  }
  render(<Controlled />);
  expect(screen.getAllByRole("option")).toHaveLength(1);
  await userEvent.clear(screen.getByRole("combobox"));
  expect(screen.getAllByRole("option")).toHaveLength(2);
});

test("CommandInput without a name throws", () => {
  const error = vi.spyOn(console, "error").mockImplementation(() => {});
  expect(() => render(<Command><CommandInput /></Command>)).toThrow(/CommandInput requires/);
  error.mockRestore();
});

test("CommandDialog without a name throws", () => {
  const error = vi.spyOn(console, "error").mockImplementation(() => {});
  expect(() => render(<CommandDialog open><CommandInput aria-label="搜索" /></CommandDialog>)).toThrow(/CommandDialog requires/);
  error.mockRestore();
});

function DialogExample({ closeOnSelect, onSelect }: { closeOnSelect?: boolean; onSelect?: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  return <>
    <button type="button" onClick={() => setOpen(true)}>打开</button>
    <CommandDialog open={open} onOpenChange={setOpen} aria-label="命令面板" closeOnSelect={closeOnSelect}>
      <CommandInput aria-label="搜索命令" />
      <CommandList><CommandItem value="概览" onSelect={onSelect}>概览</CommandItem></CommandList>
    </CommandDialog>
  </>;
}

test("CommandDialog is a named dialog, focuses the input, and closes after a selection", async () => {
  const onSelect = vi.fn();
  render(<DialogExample onSelect={onSelect} />);
  await userEvent.click(screen.getByRole("button", { name: "打开" }));
  const dialog = await screen.findByRole("dialog", { name: "命令面板" });
  expect(within(dialog).getByRole("combobox")).toHaveFocus();
  await userEvent.keyboard("{Enter}");
  expect(onSelect).toHaveBeenCalledWith("概览");
  await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
});

test("closeOnSelect={false} keeps the dialog open; Escape closes it; reopening starts with an empty query", async () => {
  render(<DialogExample closeOnSelect={false} />);
  await userEvent.click(screen.getByRole("button", { name: "打开" }));
  await userEvent.type(await screen.findByRole("combobox"), "概");
  await userEvent.click(screen.getByRole("option", { name: "概览" }));
  expect(screen.getByRole("dialog")).toBeInTheDocument();
  await userEvent.keyboard("{Escape}");
  await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  await userEvent.click(screen.getByRole("button", { name: "打开" }));
  expect(await screen.findByRole("combobox")).toHaveValue("");
});

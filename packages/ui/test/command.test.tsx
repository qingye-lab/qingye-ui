import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import { useState } from "react";
import {
  Command,
  CommandDialog,
  CommandDialogPopup,
  CommandDialogTrigger,
  CommandEmpty,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList,
  CommandPanel,
} from "../src/components/command";

const pages = [
  { value: "dashboard", label: "数据看板" },
  { value: "devices", label: "设备列表" },
  { value: "tickets", label: "工单中心" },
];

function Inline({ onRun }: { onRun?: (value: string) => void } = {}) {
  return (
    <Command items={pages}>
      <CommandInput aria-label="搜索页面" autoFocus={false} placeholder="搜索页面…" />
      <CommandPanel>
        <CommandEmpty />
        <CommandList>
          {(page: (typeof pages)[number]) => (
            <CommandItem key={page.value} onClick={() => onRun?.(page.value)} value={page}>
              {page.label}
            </CommandItem>
          )}
        </CommandList>
      </CommandPanel>
    </Command>
  );
}

test("an inline command lists every item", () => {
  render(<Inline />);
  for (const page of pages) {
    expect(screen.getByText(page.label)).toBeInTheDocument();
  }
});

test("typing filters the list down to matching items", async () => {
  const user = userEvent.setup();
  render(<Inline />);
  await user.type(screen.getByRole("combobox"), "设备");
  await waitFor(() => expect(screen.queryByText("数据看板")).not.toBeInTheDocument());
  expect(screen.getByText("设备列表")).toBeInTheDocument();
  expect(screen.queryByText("工单中心")).not.toBeInTheDocument();
});

test("the built-in empty state shows when nothing matches", async () => {
  const user = userEvent.setup();
  render(<Inline />);
  await user.type(screen.getByRole("combobox"), "投影仪");
  expect(await screen.findByText("没有匹配的结果")).toBeInTheDocument();
  expect(screen.queryByText("数据看板")).not.toBeInTheDocument();
});

test("clicking an item runs it", async () => {
  const user = userEvent.setup();
  const onRun = vi.fn();
  render(<Inline onRun={onRun} />);
  await user.click(screen.getByText("设备列表"));
  expect(onRun).toHaveBeenCalledWith("devices");
});

test("ArrowDown moves the highlight and Enter runs the highlighted item", async () => {
  const user = userEvent.setup();
  const onRun = vi.fn();
  render(<Inline onRun={onRun} />);
  const input = screen.getByRole("combobox");
  await user.click(input);
  await user.keyboard("{ArrowDown}");
  await user.keyboard("{Enter}");
  await waitFor(() => expect(onRun).toHaveBeenCalled());
});

test("the dialog opens from its trigger, and Escape closes it and returns focus", async () => {
  const user = userEvent.setup();

  function Harness() {
    const [open, setOpen] = useState(false);
    return (
      <CommandDialog onOpenChange={setOpen} open={open}>
        <CommandDialogTrigger>快速跳转</CommandDialogTrigger>
        <CommandDialogPopup aria-label="命令面板">
          <Command items={pages}>
            <CommandInput />
            <CommandPanel>
              <CommandEmpty />
              <CommandList>
                {(page: (typeof pages)[number]) => (
                  <CommandItem key={page.value} value={page}>
                    {page.label}
                  </CommandItem>
                )}
              </CommandList>
            </CommandPanel>
          </Command>
        </CommandDialogPopup>
      </CommandDialog>
    );
  }

  render(<Harness />);
  const trigger = screen.getByRole("button", { name: "快速跳转" });
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

  await user.click(trigger);
  const dialog = await screen.findByRole("dialog", { name: "命令面板" });
  expect(dialog).toBeInTheDocument();
  expect(await screen.findByText("设备列表")).toBeInTheDocument();

  await user.keyboard("{Escape}");
  await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  // Focus returns to the trigger that opened the palette.
  await waitFor(() => expect(trigger).toHaveFocus());
});

test("groups render their label alongside the items", () => {
  render(
    <Command items={[{ value: "跳转", items: pages }]}>
      <CommandInput aria-label="搜索" autoFocus={false} />
      <CommandPanel>
        <CommandList>
          {(group: { value: string; items: typeof pages }) => (
            <CommandGroup key={group.value} items={group.items}>
              <CommandGroupLabel>{group.value}</CommandGroupLabel>
              {group.items.map((page) => (
                <CommandItem key={page.value} value={page}>
                  {page.label}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandPanel>
    </Command>
  );
  expect(screen.getByText("跳转")).toBeInTheDocument();
  expect(screen.getByText("数据看板")).toBeInTheDocument();
});

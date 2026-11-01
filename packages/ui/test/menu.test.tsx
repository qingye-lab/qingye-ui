import * as React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { AlertDialog, AlertDialogClose, AlertDialogDescription, AlertDialogPopup, AlertDialogTitle } from "../src/components/alert-dialog";
import { Menu, MenuCheckboxItem, MenuItem, MenuPopup, MenuPortal, MenuPositioner, MenuRadioGroup, MenuRadioItem, MenuSwitchItem, MenuTrigger } from "../src/components/menu";
describe("Menu", () => {
  it("opens by keyboard, keeps disabled commands inert and returns focus on Escape", async () => {
    const user = userEvent.setup(); const action = vi.fn(); const ref = React.createRef<HTMLDivElement>();
    render(<Menu><MenuTrigger>操作</MenuTrigger><MenuPortal><MenuPositioner><MenuPopup ref={ref}><MenuItem>A</MenuItem><MenuItem disabled onClick={action}>禁用</MenuItem><MenuItem onClick={action}>B</MenuItem></MenuPopup></MenuPositioner></MenuPortal></Menu>);
    await user.tab(); await user.keyboard("{Enter}"); await waitFor(() => expect(screen.getByRole("menuitem", { name: "A" })).toHaveFocus()); expect(ref.current).toBe(screen.getByRole("menu")); await user.keyboard("{ArrowDown}"); expect(screen.getByRole("menuitem", { name: "禁用" })).toHaveFocus(); await user.keyboard("{Enter}"); expect(action).not.toHaveBeenCalled(); expect(screen.getByRole("menu")).toBeInTheDocument(); await user.keyboard("{ArrowDown}"); expect(screen.getByRole("menuitem", { name: "B" })).toHaveFocus(); await user.keyboard("{Escape}"); await waitFor(() => expect(screen.queryByRole("menu")).toBeNull()); expect(screen.getByRole("button", { name: "操作" })).toHaveFocus(); expect(action).not.toHaveBeenCalled();
  });
  it("honors canceled checkbox and closing intents", async () => {
    const user = userEvent.setup(); render(<Menu defaultOpen onOpenChange={(open, details) => { if (!open) details.cancel(); }}><MenuTrigger>操作</MenuTrigger><MenuPortal><MenuPositioner><MenuPopup><MenuCheckboxItem onCheckedChange={(_, details) => details.cancel()}>选项</MenuCheckboxItem></MenuPopup></MenuPositioner></MenuPortal></Menu>);
    await user.click(screen.getByRole("menuitemcheckbox")); expect(screen.getByRole("menuitemcheckbox")).toHaveAttribute("aria-checked", "false"); await user.keyboard("{Escape}"); expect(screen.getByRole("menu")).toBeInTheDocument();
  });
  it("leading choice marks retain names, checked state and cancellation independently from inset commands", async () => {
    const user = userEvent.setup();
    const command = vi.fn();
    render(<Menu defaultOpen><MenuTrigger>操作</MenuTrigger><MenuPortal><MenuPositioner><MenuPopup>
      <MenuCheckboxItem size="sm" markerPosition="start" defaultChecked closeOnClick={false}>显示说明</MenuCheckboxItem>
      <MenuCheckboxItem markerPosition="end" closeOnClick={false} onCheckedChange={(_, details) => details.cancel()}>固定列</MenuCheckboxItem>
      <MenuItem size="sm" inset onClick={command}>检查</MenuItem>
      <MenuRadioGroup defaultValue="a"><MenuRadioItem value="a" markerPosition="start">选项甲</MenuRadioItem><MenuRadioItem value="b" markerPosition="start">选项乙</MenuRadioItem></MenuRadioGroup>
    </MenuPopup></MenuPositioner></MenuPortal></Menu>);
    const first = screen.getByRole("menuitemcheckbox", { name: "显示说明" });
    expect(first).toHaveAttribute("aria-checked", "true");
    expect(first.firstElementChild).toHaveAttribute("data-slot", "menu-checkbox-marker");
    await user.click(first);
    expect(first).toHaveAttribute("aria-checked", "false");
    const canceled = screen.getByRole("menuitemcheckbox", { name: "固定列" });
    expect(canceled.lastElementChild).toHaveAttribute("data-slot", "menu-checkbox-marker");
    await user.click(canceled);
    expect(canceled).toHaveAttribute("aria-checked", "false");
    const radio = screen.getByRole("menuitemradio", { name: "选项乙" });
    radio.focus();
    await user.keyboard("{Enter}");
    expect(radio).toHaveAttribute("aria-checked", "true");
    expect(command).not.toHaveBeenCalled();
  });
});
describe("Menu danger commands", () => {
  it("a danger item stays a named, keyboard-reachable command and declares its tone", async () => {
    const user = userEvent.setup(); const remove = vi.fn();
    render(<Menu defaultOpen><MenuTrigger>操作</MenuTrigger><MenuPortal><MenuPositioner><MenuPopup>
      <MenuItem>重命名</MenuItem>
      <MenuItem tone="danger" onClick={remove}>删除</MenuItem>
    </MenuPopup></MenuPositioner></MenuPortal></Menu>);
    expect(screen.getByRole("menuitem", { name: "删除" })).toHaveAttribute("data-tone", "danger");
    expect(screen.getByRole("menuitem", { name: "重命名" })).toHaveAttribute("data-tone", "neutral");
    screen.getByRole("menuitem", { name: "重命名" }).focus();
    await user.keyboard("{ArrowDown}");
    await waitFor(() => expect(screen.getByRole("menuitem", { name: "删除" })).toHaveFocus());
    await user.keyboard("{Enter}");
    expect(remove).toHaveBeenCalledTimes(1);
  });
  it("a danger item hands the decision to a confirmation dialog rather than carrying the consequence itself", async () => {
    const user = userEvent.setup();
    function Example() {
      const [open, setOpen] = React.useState(false);
      return <>
        <Menu defaultOpen><MenuTrigger>操作</MenuTrigger><MenuPortal><MenuPositioner><MenuPopup>
          <MenuItem tone="danger" onClick={() => setOpen(true)}>删除</MenuItem>
        </MenuPopup></MenuPositioner></MenuPortal></Menu>
        <AlertDialog open={open} onOpenChange={setOpen}><AlertDialogPopup><AlertDialogTitle>删除这个项目？</AlertDialogTitle><AlertDialogDescription>删除后无法恢复。</AlertDialogDescription><AlertDialogClose>保留</AlertDialogClose></AlertDialogPopup></AlertDialog>
      </>;
    }
    render(<Example />);
    await user.click(screen.getByRole("menuitem", { name: "删除" }));
    expect(await screen.findByRole("alertdialog", { name: "删除这个项目？" })).toHaveAccessibleDescription("删除后无法恢复。");
  });
});
describe("MenuSwitchItem", () => {
  it("is a menuitemcheckbox with a decorative track, toggles by keyboard and reports the change", async () => {
    const user = userEvent.setup(); const change = vi.fn();
    render(<Menu defaultOpen><MenuTrigger>操作</MenuTrigger><MenuPortal><MenuPositioner><MenuPopup>
      <MenuSwitchItem closeOnClick={false} onCheckedChange={change}>静音</MenuSwitchItem>
    </MenuPopup></MenuPositioner></MenuPortal></Menu>);
    const item = screen.getByRole("menuitemcheckbox", { name: "静音" });
    expect(item).toHaveAttribute("aria-checked", "false");
    expect(item).toHaveAttribute("data-slot", "menu-switch-item");
    expect(item.querySelector("[data-slot=menu-switch-track]")).toHaveAttribute("aria-hidden", "true");
    item.focus(); await user.keyboard("{Enter}");
    expect(item).toHaveAttribute("aria-checked", "true");
    expect(change).toHaveBeenLastCalledWith(true, expect.anything());
    await user.keyboard(" ");
    expect(item).toHaveAttribute("aria-checked", "false");
  });
  it("honors the canceled-change protocol and stays inert when disabled", async () => {
    const user = userEvent.setup(); const change = vi.fn();
    render(<Menu defaultOpen><MenuTrigger>操作</MenuTrigger><MenuPortal><MenuPositioner><MenuPopup>
      <MenuSwitchItem closeOnClick={false} onCheckedChange={(_, details) => details.cancel()}>固定</MenuSwitchItem>
      <MenuSwitchItem disabled defaultChecked onCheckedChange={change}>锁定</MenuSwitchItem>
    </MenuPopup></MenuPositioner></MenuPortal></Menu>);
    await user.click(screen.getByRole("menuitemcheckbox", { name: "固定" }));
    expect(screen.getByRole("menuitemcheckbox", { name: "固定" })).toHaveAttribute("aria-checked", "false");
    await user.click(screen.getByRole("menuitemcheckbox", { name: "锁定" }));
    expect(screen.getByRole("menuitemcheckbox", { name: "锁定" })).toHaveAttribute("aria-checked", "true");
    expect(change).not.toHaveBeenCalled();
  });
});

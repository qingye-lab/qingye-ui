import * as React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Menu, MenuCheckboxItem, MenuItem, MenuPopup, MenuPortal, MenuPositioner, MenuTrigger } from "../src/components/menu";
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
});

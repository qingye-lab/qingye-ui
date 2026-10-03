import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ContextMenu, ContextMenuItem, ContextMenuPopup, ContextMenuPortal, ContextMenuPositioner, ContextMenuTrigger } from "../src/components/context-menu";
describe("ContextMenu", () => {
  it("opens actual context commands and permits Escape recovery", async () => {
    const user = userEvent.setup(); const action = vi.fn(); render(<ContextMenu><ContextMenuTrigger>区域</ContextMenuTrigger><ContextMenuPortal><ContextMenuPositioner><ContextMenuPopup><ContextMenuItem onClick={action}>操作</ContextMenuItem></ContextMenuPopup></ContextMenuPositioner></ContextMenuPortal></ContextMenu>);
    screen.getByText("区域").focus(); fireEvent.contextMenu(screen.getByText("区域"), { button: 2, clientX: 20, clientY: 20 }); await screen.findByRole("menu"); expect(screen.getByRole("menuitem")).toHaveAttribute("data-slot", "context-menu-item"); await user.keyboard("{Escape}"); await waitFor(() => expect(screen.queryByRole("menu")).toBeNull()); expect(action).not.toHaveBeenCalled();
  });
  it("does not open a disabled context or execute its command", () => {
    const action = vi.fn(); render(<ContextMenu disabled><ContextMenuTrigger>区域</ContextMenuTrigger><ContextMenuPortal><ContextMenuPositioner><ContextMenuPopup><ContextMenuItem onClick={action}>操作</ContextMenuItem></ContextMenuPopup></ContextMenuPositioner></ContextMenuPortal></ContextMenu>); fireEvent.contextMenu(screen.getByText("区域")); expect(screen.queryByRole("menu")).toBeNull(); expect(action).not.toHaveBeenCalled();
  });
});
